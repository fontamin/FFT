/* Fontamin Font Tester — embed loader
   Put this where FFT is hosted (next to index.html), then on any website:

   <div data-fft data-font="/fonts/MyFont-Regular.woff2 | /fonts/MyFont-Bold.woff2"
        data-label="Regular | Bold" data-tabs="font,layout,test" data-height="520"></div>
   <script src="https://YOUR-HOST/fft/embed.js" async></script>

   Fonts are downloaded by THIS page (so fonts on your own site need no CORS setup; relative addresses work)
   and handed to the tester with postMessage. A font can also be put right in the page:
   <template data-fft-font data-name="MyFont.woff2" data-label="My Font">…base64…</template>
   (<template data-fft-font data-url="…"> adds a URL font at that place in the list, to mix files and URLs in order.)
   Your own tests: <template data-fft-text data-name="My test">…</template> (as many as you like), and the order of the
   Test tab with data-tests="My test | Farsi | English" (only the listed tests are shown; the first one opens).
   Size: data-height (px or any CSS length), data-width (empty = the parent's width, or px / any CSS length)
   and data-position (start / center / end, for a frame narrower than its parent).
   Every other data-* attribute (except data-title) is an option of the tester; see EMBED.md.
   From JavaScript: FFT.embed(element, { fonts: [{ url | file | buf, name, label }], tabs: 'font,test' }) returns the iframe. */
(function () {
  'use strict';
  var me = document.currentScript;
  var BASE = (me && me.src ? me.src : location.href).replace(/[^\/]*([?#].*)?$/, '');   // folder of embed.js
  var FRAME = 'embed-frame.html?v=1.0-8623a217';   // the version is written by build-embed.mjs (a new one = not taken from the cache)
  var SKIP = { fft: 1, fftdone: 1, height: 1, width: 1, position: 1, title: 1, font: 1, fonts: 1, label: 1, texts: 1, tests: 1 };

  function split(v) { return v == null ? [] : (Array.isArray(v) ? v : String(v).split('|')).map(function (s) { return String(s).trim(); }); }
  function fileName(u) { try { return decodeURIComponent(u.split(/[?#]/)[0].split('/').pop()) || 'Font'; } catch (e) { return 'Font'; } }
  function b64(s) {
    var bin = atob(s.replace(/\s+/g, '').replace(/^data:[^,]*,/, '')), a = new Uint8Array(bin.length);
    for (var i = 0; i < bin.length; i++) a[i] = bin.charCodeAt(i);
    return a.buffer;
  }

  // every font becomes { buf, name, label }; a URL this page can't read is passed on, the tester then tries it itself
  function prepare(list) {
    return Promise.all(list.map(function (f) {
      var label = f.label || '';
      if (f.buf instanceof ArrayBuffer) return { buf: f.buf, name: f.name || 'Font', label: label };
      if (f.file && f.file.arrayBuffer) return f.file.arrayBuffer().then(function (b) { return { buf: b, name: f.file.name, label: label }; });
      if (f.base64) return { buf: b64(f.base64), name: f.name || 'Font', label: label };
      var url = new URL(f.url, location.href).href;
      return fetch(url).then(function (r) { if (!r.ok) throw 0; return r.arrayBuffer(); })
        .then(function (b) { return { buf: b, name: f.name || fileName(url), label: label }; })
        .catch(function () { return { url: url, label: label }; });
    }));
  }

  function hashFor(opt, hasFonts) {
    var p = new URLSearchParams();
    p.append('embed', '1');
    if (hasFonts) p.append('pf', '1');
    // tests: [{ name, text }] and the order of the Test tab (names; built-in or the owner's own)
    (opt.texts || []).forEach(function (t) { p.append('text', t.text); p.append('textname', t.name || ''); });
    split(opt.tests).forEach(function (n) { if (n) p.append('test', n); });
    Object.keys(opt).forEach(function (k) {
      var v = opt[k];
      if (v == null || v === '' || SKIP[k] || typeof v === 'object' && !Array.isArray(v)) return;
      p.append(k, Array.isArray(v) ? v.join(',') : String(v));
    });
    return p.toString();
  }

  function embed(el, opt) {
    opt = opt || {};
    var list = (opt.fonts || []).slice();
    var urls = split(opt.font), labels = split(opt.label);
    urls.forEach(function (u, i) { if (u) list.push({ url: u, label: labels[i] || '' }); });
    var ready = prepare(list);

    var f = document.createElement('iframe');
    f.src = BASE + FRAME + '#' + hashFor(opt, list.length > 0);
    f.title = opt.title || 'Font tester';
    f.loading = 'lazy';
    f.allow = 'clipboard-write';
    var len = function (v) { v = String(v); return /^\d+(\.\d+)?$/.test(v) ? v + 'px' : v; };
    // width: empty / "auto" / "100%" = the width of the parent element; a number (px) or any CSS length = that width,
    // never wider than the parent. position (start / center / end) places a narrower frame inside the parent.
    // (align is the text alignment of the tester; older codes used align="start" / "end" for the frame)
    var w = opt.width && !/^(auto|100%)$/i.test(String(opt.width)) ? len(opt.width) : '100%';
    var pos = String(opt.position || (/^(start|end)$/i.test(opt.align || '') ? opt.align : '')).toLowerCase();
    if (/^(start|end)$/i.test(opt.align || '')) delete opt.align;
    var m = { center: 'margin-inline:auto', end: 'margin-inline-start:auto' }[pos] || '';
    f.style.cssText = 'display:block;border:0;border-radius:12px;max-width:100%;width:' + w + ';height:' + len(opt.height || 560) + ';' + m;
    // the tester says hello when it has started (again after a reload): it gets the fonts then
    window.addEventListener('message', function (e) {
      if (e.source !== f.contentWindow || !e.data || e.data.fft !== 'hello' || !list.length) return;
      ready.then(function (fonts) {
        var copy = fonts.map(function (x) { return x.buf ? { buf: x.buf.slice(0), name: x.name, label: x.label } : x; });
        f.contentWindow.postMessage({ fft: 'fonts', fonts: copy }, '*', copy.filter(function (x) { return x.buf; }).map(function (x) { return x.buf; }));
      });
    });
    el.textContent = '';
    el.appendChild(f);
    return f;
  }

  function scan() {
    var els = document.querySelectorAll('[data-fft]:not([data-fft-done])');
    Array.prototype.forEach.call(els, function (el) {
      el.setAttribute('data-fft-done', '');
      var opt = { fonts: [] };
      Object.keys(el.dataset).forEach(function (k) { opt[k.toLowerCase()] = el.dataset[k]; });
      Array.prototype.forEach.call(el.querySelectorAll('template[data-fft-font]'), function (t) {
        var u = t.getAttribute('data-url'), lb = t.getAttribute('data-label') || '';
        opt.fonts.push(u ? { url: u, label: lb } : { base64: t.content.textContent, name: t.getAttribute('data-name') || 'Font', label: lb });
      });
      opt.texts = [];
      Array.prototype.forEach.call(el.querySelectorAll('template[data-fft-text]'), function (t) {
        opt.texts.push({ name: t.getAttribute('data-name') || '', text: t.content.textContent.replace(/^\n+|\s+$/g, '') });
      });
      embed(el, opt);
    });
  }

  window.FFT = window.FFT || {};
  window.FFT.embed = embed;
  window.FFT.scan = scan;
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', scan);
  else scan();
})();
