/* Sri Krishna Jewellery Works: shared page behaviour.
   No library. Each block below is independent, so you can delete one without breaking the others. */
(function () {
  'use strict';

  var root = document.documentElement;
  var $ = function (sel, ctx) { return (ctx || document).querySelector(sel); };
  var $$ = function (sel, ctx) { return Array.prototype.slice.call((ctx || document).querySelectorAll(sel)); };
  var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------- 1. Arrival: lift the curtain (first visit) or the wipe (every other load) ---------- */
  function ready() {
    root.classList.add('is-ready');
    setTimeout(function () { root.classList.add('intro-done'); }, 1500);
  }
  if (reduce) {
    ready();
  } else {
    var started = Date.now(), gone = false;
    var minimum = root.classList.contains('intro') ? 1150 : 120;   // let the crest be seen
    var go = function () {
      if (gone) return; gone = true;
      setTimeout(ready, Math.max(0, minimum - (Date.now() - started)));
    };
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(go, go); else go();
    setTimeout(go, 2600);                                          // never wait longer than this
  }

  /* ---------- 2. Menu bar: solid after a little scroll, hides on the way down ---------- */
  var nav = $('.nav'), menu = $('#menu'), menuBtn = $('.menu-btn'), lastY = 0;
  function setMenu(open) {
    menu.classList.toggle('open', open);
    nav.classList.toggle('menu-open', open);
    menuBtn.setAttribute('aria-expanded', String(open));
    menuBtn.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
    $('use', menuBtn).setAttribute('href', open ? '#i-close' : '#i-menu');
    if (open) nav.classList.remove('is-hidden');
  }
  menuBtn.addEventListener('click', function () { setMenu(!menu.classList.contains('open')); });
  $$('a', menu).forEach(function (a) { a.addEventListener('click', function () { setMenu(false); }); });
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape') setMenu(false); });

  /* ---------- 3. Reveals: photos wipe open and text rises as it scrolls into view ---------- */
  var io = null;
  if (!reduce && 'IntersectionObserver' in window) {
    io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (!e.isIntersecting) return;
        var el = e.target, wait = parseInt(el.getAttribute('data-wait') || '0', 10);   // data-wait staggers a row
        io.unobserve(el);
        setTimeout(function () { el.classList.remove('rv-wait'); }, wait);
      });
    }, { rootMargin: '0px 0px -12% 0px', threshold: 0.08 });
  }
  /* Only things below the first screen are hidden, so the page is complete even if this never runs. */
  function arm(scope) {
    if (!io) return;
    var vh = window.innerHeight;
    $$('[data-rv]', scope).forEach(function (el) {
      if (el.getBoundingClientRect().top > vh * 0.92) { el.classList.add('rv-wait'); io.observe(el); }
    });
  }
  arm();

  /* ---------- 4. Parallax: large photos drift a little slower than the page ---------- */
  var pars = $$('[data-par]').map(function (el) {
    return { el: el, k: parseFloat(el.getAttribute('data-par')), y: 0 };
  });
  function frame() {
    var y = window.scrollY || 0, vh = window.innerHeight;
    if (Math.abs(y - lastY) > 4) {
      nav.classList.toggle('is-hidden', y > lastY && y > 260 && !menu.classList.contains('open'));
      lastY = y;
    }
    nav.classList.toggle('is-solid', y > 40);
    if (!reduce) {
      for (var i = 0; i < pars.length; i++) {
        var p = pars[i], r = p.el.parentNode.getBoundingClientRect();
        if (r.bottom < -200 || r.top > vh + 200) continue;
        var target = ((r.top + r.height / 2) - vh / 2) * -p.k;
        p.y += (target - p.y) * 0.09;                       // ease toward the target
        p.el.style.translate = '0 ' + p.y.toFixed(2) + 'px';
      }
    }
    requestAnimationFrame(frame);
  }
  requestAnimationFrame(frame);

  /* ---------- 5. Tray: arrows glide it one screen of tiles; drag and swipe also work ---------- */
  var rail = $('.rail');
  if (rail) {
    var bar = $('.rail-bar i'), prev = $('.rail-btn[data-dir="-1"]'), next = $('.rail-btn[data-dir="1"]');
    var tiles = $$('.tile', rail);
    var pics = tiles.map(function (t) { return $('.tile-img img, .tile-img video', t); });
    var gliding = 0, down = false, startX = 0, startLeft = 0, moved = 0;

    var maxLeft = function () { return rail.scrollWidth - rail.clientWidth; };
    var step = function () { return tiles.length > 1 ? tiles[1].offsetLeft - tiles[0].offsetLeft : rail.clientWidth; };
    var perView = function () { return Math.max(1, Math.round(rail.clientWidth / step())); };
    var nearest = function () { return Math.round(rail.scrollLeft / step()); };

    /* slide to a position with a slow start and a slow finish */
    function glide(to) {
      to = Math.max(0, Math.min(maxLeft(), to));
      cancelAnimationFrame(gliding);
      if (reduce) { rail.scrollLeft = to; return; }
      var from = rail.scrollLeft, t0 = performance.now(), time = 950;
      rail.classList.add('gliding');
      (function tick(now) {
        var k = Math.min(1, (now - t0) / time);
        var e = k < 0.5 ? 16 * k * k * k * k * k : 1 - Math.pow(-2 * k + 2, 5) / 2;
        rail.scrollLeft = from + (to - from) * e;
        if (k < 1) gliding = requestAnimationFrame(tick); else rail.classList.remove('gliding');
      })(t0);
    }

    /* progress line, arrow states, and each picture drifting inside its frame */
    function update() {
      var m = maxLeft(), f = m > 0 ? rail.scrollLeft / m : 0, share = rail.clientWidth / rail.scrollWidth;
      if (bar) { bar.style.width = (share * 100) + '%'; bar.style.transform = 'translateX(' + (f * (1 / share - 1) * 100).toFixed(1) + '%)'; }
      if (prev) prev.disabled = rail.scrollLeft < 2;
      if (next) next.disabled = rail.scrollLeft > m - 2;
      if (reduce) return;
      var centre = rail.scrollLeft + rail.clientWidth / 2;
      for (var i = 0; i < tiles.length; i++) {
        var rel = ((tiles[i].offsetLeft + tiles[i].offsetWidth / 2) - centre) / rail.clientWidth;
        rel = Math.max(-0.6, Math.min(0.6, rel));
        if (pics[i]) pics[i].style.translate = (rel * -10).toFixed(2) + '% 0';
      }
    }
    rail.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);
    update();

    if (prev) prev.addEventListener('click', function () { glide((nearest() - perView()) * step()); });
    if (next) next.addEventListener('click', function () { glide((nearest() + perView()) * step()); });

    /* drag with a mouse */
    rail.addEventListener('pointerdown', function (e) {
      if (e.pointerType === 'touch') return;                // touch already scrolls natively
      down = true; startX = e.clientX; startLeft = rail.scrollLeft; moved = 0;
      cancelAnimationFrame(gliding); rail.classList.remove('gliding');
    });
    window.addEventListener('pointermove', function (e) {
      if (!down) return;
      var dx = e.clientX - startX; moved = Math.abs(dx);
      if (moved > 4) rail.classList.add('dragging');
      rail.scrollLeft = startLeft - dx;
    });
    window.addEventListener('pointerup', function () {
      if (!down) return; down = false;
      if (moved > 4) { rail.classList.remove('dragging'); glide(nearest() * step()); }   // settle on a whole tile
    });
    rail.addEventListener('click', function (e) { if (moved > 6) e.preventDefault(); }, true);  // a drag is not a click
    rail.addEventListener('dragstart', function (e) { e.preventDefault(); });
  }

  /* ---------- 6. Films: play only while on screen; the hero velvet loads on wide screens only ---------- */
  function play(v) { var p = v.play(); if (p && p.catch) p.catch(function () {}); }
  $$('video[data-auto]').forEach(function (v) {
    var wanted = !reduce;
    var btn = v.closest('figure') && $('.film-btn', v.closest('figure'));
    function label() {
      if (!btn) return;
      var on = !v.paused;
      btn.setAttribute('aria-pressed', String(on));
      $('span', btn).textContent = on ? 'Pause' : 'Play';
      $('use', btn).setAttribute('href', on ? '#i-pause' : '#i-play');
    }
    if (btn) btn.addEventListener('click', function () { wanted = v.paused; if (v.paused) play(v); else v.pause(); });
    v.addEventListener('play', label); v.addEventListener('pause', label);
    if ('IntersectionObserver' in window) {
      new IntersectionObserver(function (es) {
        es.forEach(function (e) { if (e.isIntersecting && wanted) play(v); else if (!e.isIntersecting) v.pause(); });
      }, { threshold: 0.2 }).observe(v);
    } else if (wanted) play(v);
    label();
  });
  var heroBg = $('.hero-bg');
  if (heroBg && !reduce && window.matchMedia('(min-width: 62rem)').matches) {
    var hv = document.createElement('video');
    hv.muted = true; hv.loop = true; hv.playsInline = true; hv.setAttribute('playsinline', '');
    hv.src = heroBg.getAttribute('data-film');
    hv.addEventListener('canplay', function () { heroBg.appendChild(hv); play(hv); }, { once: true });
    if ('IntersectionObserver' in window) {
      new IntersectionObserver(function (es) {
        es.forEach(function (e) { if (e.isIntersecting) play(hv); else hv.pause(); });
      }).observe(heroBg);
    }
  }

  /* ---------- 7. Copy buttons beside the phone numbers and email ---------- */
  $$('[data-copy]').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var src = document.getElementById(btn.getAttribute('data-copy')), lab = $('span', btn), old = lab.textContent;
      var done = function () {
        lab.textContent = 'Copied'; $('use', btn).setAttribute('href', '#i-check');
        setTimeout(function () { lab.textContent = old; $('use', btn).setAttribute('href', '#i-copy'); }, 1600);
      };
      var select = function () {
        var r = document.createRange(); r.selectNodeContents(src);
        var s = getSelection(); s.removeAllRanges(); s.addRange(r); lab.textContent = 'Selected';
      };
      if (navigator.clipboard && navigator.clipboard.writeText) navigator.clipboard.writeText(src.textContent.trim()).then(done, select);
      else select();
    });
  });

  /* ---------- 8. "Open now", worked out on Barpeta Road time whatever the visitor's clock says ---------- */
  try {
    var parts = new Intl.DateTimeFormat('en-GB', { timeZone: 'Asia/Kolkata', weekday: 'short', hour: '2-digit', minute: '2-digit', hour12: false }).formatToParts(new Date()), t = {};
    parts.forEach(function (p) { t[p.type] = p.value; });
    var day = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].indexOf(t.weekday);
    var mins = (parseInt(t.hour, 10) % 24) * 60 + parseInt(t.minute, 10);
    if (day >= 0 && !isNaN(mins)) {
      var closes = day === 0 ? 14 * 60 : 21 * 60;           // Sunday 2 pm, other days 9 pm
      var open = mins >= 9 * 60 && mins < closes;
      $$('.open-now').forEach(function (el) {
        var mine = el.getAttribute('data-days') === '0' ? day === 0 : day >= 1;
        if (!mine) return;
        el.textContent = open ? 'Open now' : 'Closed now';
        el.classList.toggle('shut', !open);
        el.hidden = false;
      });
    }
  } catch (e) { /* no time zone support: the hours are still listed */ }

  /* ---------- 9. Page change: the dark wipe closes, then the next page opens with it ---------- */
  var wipe = $('.wipe');
  if (wipe && !reduce) {
    document.addEventListener('click', function (e) {
      var a = e.target.closest && e.target.closest('a[href]');
      if (!a || e.defaultPrevented || a.target === '_blank' || e.metaKey || e.ctrlKey || e.shiftKey || e.button) return;
      var url; try { url = new URL(a.href, location.href); } catch (err) { return; }
      if (url.origin !== location.origin || url.pathname === location.pathname) return;   // other sites and same-page links behave normally
      e.preventDefault();
      wipe.classList.add('leaving');
      setTimeout(function () { location.href = url.href; }, 520);
    });
    window.addEventListener('pageshow', function (e) { if (e.persisted) wipe.classList.remove('leaving'); });
  }

  /* the Collections page calls this after it draws its cards */
  window.SKJWSite = { arm: arm, reduce: reduce };
})();
