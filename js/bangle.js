/* The hero: a pair of twisted gold bangles drawn live with WebGL. No library.
   If WebGL is not available the page shows a still of the same two bangles instead. */
(function () {
  'use strict';
  var canvas = document.getElementById('bangle');
  if (!canvas) return;
  var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function fallback() {
    canvas.hidden = true;
    var f = document.querySelector('.hero-fallback'); if (f) f.hidden = false;
  }

  var gl = null;
  try { gl = canvas.getContext('webgl', { antialias: true, alpha: true, premultipliedAlpha: true }) || canvas.getContext('experimental-webgl', { antialias: true, alpha: true, premultipliedAlpha: true }); } catch (e) {}
  if (!gl) { fallback(); return; }

  /* ----- shaders: polished gold reflecting a small studio of soft lights ----- */
  var VS = 'attribute vec3 aP,aN;uniform mat4 uM,uVP;varying vec3 vN,vW;' +
    'void main(){vec4 w=uM*vec4(aP,1.);vW=w.xyz;vN=(uM*vec4(aN,0.)).xyz;gl_Position=uVP*w;}';
  var FS = [
    'precision highp float;varying vec3 vN,vW;uniform vec3 uCam;',
    'const vec3 DARK=vec3(.2,.012,.012);',            // what the gold reflects from the maroon room
    'const vec3 MID=vec3(.86,.42,.2);',
    'vec3 env(vec3 d){',
    ' float y=d.y;',
    ' vec3 c=mix(DARK,MID,smoothstep(-.95,.25,y));',
    ' c=mix(c,DARK*.55,smoothstep(.3,.7,y)*.75);',
    ' c+=vec3(1.,.94,.82)*smoothstep(.62,.08,distance(d,normalize(vec3(.5,.78,.55))))*6.;',      // key light
    ' c+=vec3(1.,.88,.7)*smoothstep(.13,0.,abs(d.x+.8))*smoothstep(-.55,-.05,y)*smoothstep(.95,.45,y)*4.2;', // strip, left
    ' c+=vec3(1.,.82,.62)*smoothstep(.42,0.,distance(d,normalize(vec3(-.25,.3,-.92))))*2.6;',    // rim, behind
    ' c+=vec3(1.,.9,.76)*smoothstep(.2,0.,abs(d.x-.86))*smoothstep(-.3,.1,y)*smoothstep(.7,.3,y)*2.;', // strip, right
    ' return c;}',
    'void main(){',
    ' vec3 N=normalize(vN),V=normalize(uCam-vW),R=reflect(-V,N);',
    ' float nv=clamp(dot(N,V),0.,1.);',
    ' vec3 F0=vec3(1.,.77,.34);',                     // the colour of gold
    ' vec3 F=F0+(1.-F0)*pow(1.-nv,5.);',
    ' vec3 c=env(R)*F+env(N)*F0*.12;',
    ' c*=1.02;c=c*(2.51*c+.03)/(c*(2.43*c+.59)+.14);', // film-style tone curve
    ' gl_FragColor=vec4(pow(clamp(c,0.,1.),vec3(1./2.2)),1.);}'
  ].join('\n');

  function shader(type, src) {
    var s = gl.createShader(type); gl.shaderSource(s, src); gl.compileShader(s);
    return gl.getShaderParameter(s, gl.COMPILE_STATUS) ? s : null;
  }
  var vs = shader(gl.VERTEX_SHADER, VS), fs = shader(gl.FRAGMENT_SHADER, FS);
  if (!fs) fs = shader(gl.FRAGMENT_SHADER, FS.replace('precision highp float', 'precision mediump float'));   // older phones without high precision
  if (!vs || !fs) { fallback(); return; }
  var prog = gl.createProgram(); gl.attachShader(prog, vs); gl.attachShader(prog, fs); gl.linkProgram(prog);
  if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) { fallback(); return; }
  gl.useProgram(prog);

  /* ----- the bangle: a ring whose cross-section has four strands that twist 28 times round ----- */
  var U = 448, V = 44, R = 1, TUBE = 0.108, STRANDS = 4, TWISTS = 28, DEPTH = 0.17;
  function point(u, v) {
    var r = TUBE * (1 + DEPTH * Math.cos(STRANDS * v + TWISTS * u)), c = R + r * Math.cos(v);
    return [c * Math.cos(u), r * Math.sin(v), c * Math.sin(u)];
  }
  var count = (U + 1) * (V + 1);
  var pos = new Float32Array(count * 3), nor = new Float32Array(count * 3), idx = new Uint16Array(U * V * 6);
  var e = 1e-3, n = 0, q = 0, i, j;
  for (i = 0; i <= U; i++) {
    var u = i / U * Math.PI * 2;
    for (j = 0; j <= V; j++) {
      var v = j / V * Math.PI * 2, p = point(u, v);
      var a = point(u + e, v), b = point(u - e, v), c = point(u, v + e), d = point(u, v - e);
      var du = [a[0] - b[0], a[1] - b[1], a[2] - b[2]], dv = [c[0] - d[0], c[1] - d[1], c[2] - d[2]];
      var nx = dv[1] * du[2] - dv[2] * du[1], ny = dv[2] * du[0] - dv[0] * du[2], nz = dv[0] * du[1] - dv[1] * du[0];
      var ox = p[0] - R * Math.cos(u), oy = p[1], oz = p[2] - R * Math.sin(u);
      if (nx * ox + ny * oy + nz * oz < 0) { nx = -nx; ny = -ny; nz = -nz; }   // normals point outward
      var len = Math.sqrt(nx * nx + ny * ny + nz * nz) || 1;
      pos[n] = p[0]; pos[n + 1] = p[1]; pos[n + 2] = p[2];
      nor[n] = nx / len; nor[n + 1] = ny / len; nor[n + 2] = nz / len; n += 3;
    }
  }
  for (i = 0; i < U; i++) for (j = 0; j < V; j++) {
    var k = i * (V + 1) + j;
    idx[q++] = k; idx[q++] = k + V + 1; idx[q++] = k + 1;
    idx[q++] = k + 1; idx[q++] = k + V + 1; idx[q++] = k + V + 2;
  }
  function attribute(data, name) {
    var buf = gl.createBuffer(); gl.bindBuffer(gl.ARRAY_BUFFER, buf); gl.bufferData(gl.ARRAY_BUFFER, data, gl.STATIC_DRAW);
    var loc = gl.getAttribLocation(prog, name); gl.enableVertexAttribArray(loc); gl.vertexAttribPointer(loc, 3, gl.FLOAT, false, 0, 0);
  }
  attribute(pos, 'aP'); attribute(nor, 'aN');
  var ib = gl.createBuffer(); gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, ib); gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, idx, gl.STATIC_DRAW);

  /* ----- small 4x4 matrix helpers (column-major, as WebGL expects) ----- */
  function mul(a, b) {
    var o = new Float32Array(16);
    for (var c = 0; c < 4; c++) for (var r = 0; r < 4; r++)
      o[c * 4 + r] = a[r] * b[c * 4] + a[4 + r] * b[c * 4 + 1] + a[8 + r] * b[c * 4 + 2] + a[12 + r] * b[c * 4 + 3];
    return o;
  }
  function rx(t) { var c = Math.cos(t), s = Math.sin(t); return new Float32Array([1, 0, 0, 0, 0, c, s, 0, 0, -s, c, 0, 0, 0, 0, 1]); }
  function ry(t) { var c = Math.cos(t), s = Math.sin(t); return new Float32Array([c, 0, -s, 0, 0, 1, 0, 0, s, 0, c, 0, 0, 0, 0, 1]); }
  function rz(t) { var c = Math.cos(t), s = Math.sin(t); return new Float32Array([c, s, 0, 0, -s, c, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1]); }
  function place(x, y, z, s) { return new Float32Array([s, 0, 0, 0, 0, s, 0, 0, 0, 0, s, 0, x, y, z, 1]); }
  function perspective(fov, aspect, near, far) {
    var t = 1 / Math.tan(fov / 2);
    return new Float32Array([t / aspect, 0, 0, 0, 0, t, 0, 0, 0, 0, (far + near) / (near - far), -1, 0, 0, 2 * far * near / (near - far), 0]);
  }

  var uM = gl.getUniformLocation(prog, 'uM'), EYE = 6.4;
  gl.uniformMatrix4fv(gl.getUniformLocation(prog, 'uVP'), false, mul(perspective(28 * Math.PI / 180, 1, 0.1, 30), place(0, 0, -EYE, 1)));
  gl.uniform3f(gl.getUniformLocation(prog, 'uCam'), 0, 0, EYE);
  gl.enable(gl.DEPTH_TEST); gl.clearColor(0, 0, 0, 0);

  /* ----- draw: each bangle spins on its own axis; the pair leans toward the pointer ----- */
  var size = 0, start = performance.now(), px = 0, py = 0, tx = 0, ty = 0, visible = true, running = false;
  function resize() {
    var w = Math.round(canvas.clientWidth * Math.min(window.devicePixelRatio || 1, 2));
    if (w && w !== size) { size = w; canvas.width = canvas.height = w; gl.viewport(0, 0, w, w); }
  }
  function draw() {
    resize(); if (!size) return;
    var t = reduce ? 4 : (performance.now() - start) / 1000, scroll = (window.scrollY || 0) * 0.0016;
    px += (tx - px) * 0.05; py += (ty - py) * 0.05;
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
    var group = mul(ry(px * 0.55 + Math.sin(t * 0.35) * 0.12), rx(py * 0.4));
    var one = mul(group, mul(place(-0.47, 0.07, 0.16, 0.94), mul(rz(0.16), mul(rx(1.2 + scroll * 0.4), ry(t * 0.22 + scroll)))));
    gl.uniformMatrix4fv(uM, false, one); gl.drawElements(gl.TRIANGLES, idx.length, gl.UNSIGNED_SHORT, 0);
    var two = mul(group, mul(place(0.47, -0.07, -0.2, 0.94), mul(rz(-0.2), mul(rx(1.36 - scroll * 0.3), ry(-t * 0.18 - scroll + 1)))));
    gl.uniformMatrix4fv(uM, false, two); gl.drawElements(gl.TRIANGLES, idx.length, gl.UNSIGNED_SHORT, 0);
  }
  function loop() {
    if (!visible || document.hidden) { running = false; return; }   // rest while off screen
    draw();
    if (reduce) { running = false; return; }                         // one still frame is enough
    requestAnimationFrame(loop);
  }
  function wake() { if (!running) { running = true; requestAnimationFrame(loop); } }

  window.addEventListener('pointermove', function (ev) {
    tx = ev.clientX / window.innerWidth - 0.5; ty = ev.clientY / window.innerHeight - 0.5;
  }, { passive: true });
  window.addEventListener('resize', function () { if (reduce) wake(); });
  document.addEventListener('visibilitychange', wake);
  if ('IntersectionObserver' in window) {
    new IntersectionObserver(function (es) { es.forEach(function (en) { visible = en.isIntersecting; wake(); }); }).observe(canvas);
  }
  canvas.addEventListener('webglcontextlost', function (ev) { ev.preventDefault(); fallback(); });
  wake();
})();
