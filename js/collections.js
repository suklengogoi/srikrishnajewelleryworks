/* The Collections page: draws the filter buttons, the cards and the detail view
   from the list in pieces.js. Nothing here needs editing when you add a piece. */
(function () {
  'use strict';
  var data = window.SKJW, grid = document.getElementById('grid'), filters = document.getElementById('filters'), detail = document.getElementById('detail');
  if (!data || !grid) return;

  var $ = function (sel, ctx) { return (ctx || document).querySelector(sel); };
  var site = window.SKJWSite || {};
  var current = 'all';

  function el(tag, attrs, html) {
    var n = document.createElement(tag);
    for (var k in attrs) n.setAttribute(k, attrs[k]);
    if (html != null) n.innerHTML = html;
    return n;
  }
  function esc(s) { return String(s).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); }
  function byId(id) { return data.pieces.filter(function (p) { return p.id === id; })[0]; }
  function category(id) { return data.categories.filter(function (c) { return c.id === id; })[0]; }
  function whatsapp(piece) {
    return 'https://wa.me/' + data.whatsapp + '?text=' + encodeURIComponent('Hello, I would like to ask about the ' + piece.name + ' on your website.');
  }
  function setHash(token) { try { history.replaceState(null, '', token ? '#' + token : location.pathname); } catch (e) {} }

  /* ---------- filter buttons ---------- */
  var list = [{ id: 'all', name: 'All' }].concat(data.categories.filter(function (c) {
    return data.pieces.some(function (p) { return p.category === c.id; });   // skip empty categories
  }));
  list.forEach(function (c) {
    var b = el('button', { type: 'button', 'class': 'filter', 'data-cat': c.id, 'aria-pressed': 'false' }, esc(c.name));
    b.addEventListener('click', function () { show(c.id, true); });
    filters.appendChild(b);
  });

  /* ---------- cards ---------- */
  function card(p) {
    var first = p.media[0], hasFilm = p.media.some(function (m) { return m.film; });
    var b = el('button', { type: 'button', 'class': 'card', 'data-id': p.id, 'aria-haspopup': 'dialog' },
      '<span class="card-img" data-rv="img"><img src="' + esc(first.img) + '" alt="' + esc(first.alt) + '" loading="lazy" width="720" height="960">' +
      (hasFilm ? '<span class="card-film"><svg viewBox="0 0 256 256" aria-hidden="true"><use href="#i-play"/></svg>Film</span>' : '') + '</span>' +
      '<span class="card-txt"><span class="card-name">' + esc(p.name) + '</span><span class="card-desc">' + esc(p.text) + '</span></span>');
    b.style.viewTransitionName = 'card-' + p.id;
    b.addEventListener('click', function () { open(p.id); });
    return b;
  }
  function draw() {
    grid.textContent = '';
    var shown = data.pieces.filter(function (p) { return current === 'all' || p.category === current; });
    shown.forEach(function (p) { grid.appendChild(card(p)); });
    if (!shown.length) grid.appendChild(el('p', { 'class': 'empty' }, 'Nothing here yet. Ask us on WhatsApp what is in the showroom.'));
    Array.prototype.forEach.call(filters.children, function (b) { b.setAttribute('aria-pressed', String(b.getAttribute('data-cat') === current)); });
  }
  function show(cat, animate) {
    current = category(cat) ? cat : 'all';
    setHash(current === 'all' ? '' : current);
    if (animate && document.startViewTransition && !site.reduce) document.startViewTransition(draw);
    else draw();
  }

  /* ---------- detail view ---------- */
  var stage = $('.detail-stage', detail), thumbs = $('.thumbs', detail), lastFocus = null;
  function setMedia(piece, i) {
    var m = piece.media[i];
    stage.textContent = '';
    if (m.film) {
      var v = el('video', { src: m.film, poster: m.img, 'aria-label': m.alt, playsinline: '', loop: '' });
      v.muted = true; stage.appendChild(v);
      var pl = v.play(); if (pl && pl.catch) pl.catch(function () {});
    } else {
      stage.appendChild(el('img', { src: m.img, alt: m.alt }));
    }
    Array.prototype.forEach.call(thumbs.children, function (t, n) { t.setAttribute('aria-pressed', String(n === i)); });
  }
  function open(id) {
    var p = byId(id); if (!p) return;
    lastFocus = document.activeElement;
    $('#detail-title', detail).textContent = p.name;
    $('.detail-cat', detail).textContent = category(p.category).name;
    $('.detail-text', detail).textContent = p.text;
    $('.detail-gold', detail).hidden = !p.gold;
    $('.detail-ask', detail).href = whatsapp(p);
    thumbs.textContent = '';
    if (p.media.length > 1) p.media.forEach(function (m, i) {
      var t = el('button', { type: 'button', 'class': 'thumb', 'aria-pressed': 'false', 'aria-label': (m.film ? 'Film: ' : 'Photo: ') + m.alt },
        '<img src="' + esc(m.img) + '" alt="">' + (m.film ? '<svg viewBox="0 0 256 256" aria-hidden="true"><use href="#i-play"/></svg>' : ''));
      t.addEventListener('click', function () { setMedia(p, i); });
      thumbs.appendChild(t);
    });
    setMedia(p, 0);
    if (detail.showModal) detail.showModal(); else detail.setAttribute('open', '');
    detail.scrollTop = 0;
    setHash(p.id);
  }
  function close() {
    if (detail.close) detail.close(); else detail.removeAttribute('open');
  }
  detail.addEventListener('close', function () {
    stage.textContent = '';                                   // stops any film
    setHash(current === 'all' ? '' : current);
    if (lastFocus && lastFocus.focus) lastFocus.focus();
  });
  $('.detail-close', detail).addEventListener('click', close);

  /* ---------- start: the link can name a category (#rings) or a piece (#bridal-set) ---------- */
  var token = (location.hash || '').replace('#', '');
  var piece = byId(token);
  current = category(token) ? token : 'all';
  draw();
  if (site.arm) site.arm(grid);
  if (piece) open(piece.id);
  window.addEventListener('hashchange', function () {
    var t = (location.hash || '').replace('#', '');
    if (byId(t)) open(t); else if (category(t) || !t) show(t || 'all', true);
  });
})();
