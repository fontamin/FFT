(() => {
  'use strict';

  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];

  /* =================== Elements =================== */
  const target   = $('.dynamic');
  const sizeIn   = $('#fontsizeinput');
  const heightIn = $('#fontheightinput');
  const axesBox  = $('#axes');
  const featBox  = $('#features');
  const listEl   = $('#fontlist');
  const diceBtn  = $('#randbutton');
  const showAll  = $('#showall');
  const t1 = $('#text1'), t2 = $('#text2'), t3 = $('#text3');
  const statusEl = $('#fontstatus');
  const nameEl   = $('#fontname');

  /* =================== Data tables =================== */
  const AXIS_NAMES = {
    wght: 'Weight', wdth: 'Width', ital: 'Italic', slnt: 'Slant',
    opsz: 'Optical size', GRAD: 'Grade'
  };

  const FEATURE_NAMES = {
    aalt: 'All Alternates', afrc: 'Alt Fractions', c2pc: 'Petite Caps from Caps',
    c2sc: 'Small Caps from Caps', calt: 'Contextual Alternates', case: 'Case-Sensitive Forms',
    clig: 'Contextual Ligatures', cpsp: 'Capital Spacing', cswh: 'Contextual Swash',
    curs: 'Cursive Positioning', dlig: 'Discretionary Ligatures', dnom: 'Denominators',
    expt: 'Expert Forms', falt: 'Final Alternates', fin2: 'Terminal Forms 2', fin3: 'Terminal Forms 3',
    fina: 'Final Forms', frac: 'Fractions', hist: 'Historical Forms', hlig: 'Historical Ligatures',
    hwid: 'Half Widths', init: 'Initial Forms', isol: 'Isolated Forms', ital: 'Italics',
    kern: 'Kerning', liga: 'Standard Ligatures', lnum: 'Lining Figures', locl: 'Localized Forms',
    mark: 'Mark Positioning', med2: 'Medial Forms 2', medi: 'Medial Forms', mkmk: 'Mark-to-Mark',
    nalt: 'Alternate Annotation', numr: 'Numerators', onum: 'Oldstyle Figures', ordn: 'Ordinals',
    ornm: 'Ornaments', palt: 'Proportional Alt Widths', pcap: 'Petite Capitals',
    pnum: 'Proportional Figures', pwid: 'Proportional Widths', rclt: 'Required Contextual Alt',
    rlig: 'Required Ligatures', rvrn: 'Required Variation Alt', salt: 'Stylistic Alternates',
    sinf: 'Scientific Inferiors', smcp: 'Small Capitals', subs: 'Subscript', sups: 'Superscript',
    swsh: 'Swash', titl: 'Titling', tnum: 'Tabular Figures', unic: 'Unicase',
    zero: 'Slashed Zero', dist: 'Distances', ccmp: 'Composition/Decomposition',
    vert: 'Vertical Alternates', vrt2: 'Vertical Rotation', trad: 'Traditional Forms',
    smpl: 'Simplified Forms', ruby: 'Ruby Notation', ltra: 'Left-to-Right Alt', rtla: 'Right-to-Left Alt',
    ltrm: 'Left-to-Right Mirrored', rtlm: 'Right-to-Left Mirrored', stch: 'Stretching Glyph'
  };

  // Required shaping features (hidden by default, toggle with "All")
  const HIDDEN = new Set(['ccmp','locl','rlig','rvrn','abvm','blwm','abvs','blws','init','medi','fina',
    'isol','fin2','fin3','med2','half','nukt','akhn','rphf','pref','blwf','pstf','pres','psts','haln',
    'cjct','vatu','abvf','rkrf','ljmo','vjmo','tjmo','dtls','ltra','ltrm','rtla','rtlm','stch','rand']);
  // Features that browsers enable by default
  const DEFAULT_ON = new Set([...HIDDEN, 'kern','liga','clig','calt','rclt','mark','mkmk','curs','dist']);

  // Brotli is needed to read woff2 tables; not every browser supports it in DecompressionStream
  const BROTLI = (() => { try { new DecompressionStream('brotli'); return true; } catch (e) { return false; } })();
  const COMMON = ['kern','liga','calt','clig','dlig','smcp','c2sc','onum','lnum','pnum','tnum',
    'frac','zero','sups','subs','ss01','ss02','ss03'];

  // Max characters of the file name shown on a chip
  const CHIP_MAX = 30;

  /* =================== State =================== */
  let info = { axes: [], features: [] };
  const axisVals = {};   // tag -> number
  const featOn = {};     // tag -> boolean
  let bubbles = [];
  const fonts = [];      // {id, family, css, face, file, name, version, info, system, st, status, src}
  let active = null;
  let guidesOn = false;   // ascender / descender / x-height / cap-height lines
  let gRaf = 0;
  let counter = 0;

  const cleanId = s => s.replace(/\W/g, '_');
  const featName = tag => {
    if (FEATURE_NAMES[tag]) return FEATURE_NAMES[tag];
    let m = /^ss(\d\d)$/.exec(tag); if (m) return 'Style Set ' + +m[1];
    m = /^cv(\d\d)$/.exec(tag);     if (m) return 'Char Variant ' + +m[1];
    return tag;
  };
  const axisLabel = a => AXIS_NAMES[a.tag] || a.name || a.tag;
  const setStatus = s => { statusEl.textContent = s || ''; };
  const titleOf = r => r.name + (r.version ? ' v' + r.version : '');
  const chipLabel = r => r.system ? 'Fallback font' : shorten(r.file, CHIP_MAX);
  const shorten = (s, n) => {
    const a = [...s];
    return a.length > n ? a.slice(0, n - 1).join('') + '…' : s;
  };
  const baseName = n => n.replace(/\.[^.]+$/, '');

  /* =================== Apply styles =================== */
  function applyStyles() {
    const fs = +sizeIn.value, fh = +heightIn.value;
    target.style.fontSize = fs + 'px';
    target.style.lineHeight = fh + 'em';

    const v = info.axes.map(a => `"${a.tag}" ${axisVals[a.tag]}`).join(', ');
    target.style.fontVariationSettings = v || 'normal';

    const f = [];
    Object.keys(featOn).forEach(tag => {
      if (featOn[tag] !== DEFAULT_ON.has(tag)) f.push(`"${tag}" ${featOn[tag] ? 1 : 0}`);
    });
    const fset = f.join(', ');
    target.style.fontFeatureSettings = fset || 'normal';

    t1.textContent = `font-variation-settings: ${v || 'normal'};`;
    t2.textContent = `font-feature-settings: ${fset || 'normal'};`;
    t3.textContent = `font-size: ${fs}px; line-height: ${fh}em;`;
    scheduleGuides();
  }

  /* =================== Slider bubble =================== */
  function attachBubble(slider) {
    const b = document.createElement('span');
    b.className = 'slider-value';
    slider.parentElement.style.position = 'relative';
    slider.parentElement.appendChild(b);
    const upd = () => {
      const min = parseFloat(slider.min) || 0, max = parseFloat(slider.max) || 100;
      const val = parseFloat(slider.value);
      const half = 15, w = slider.offsetWidth;
      b.textContent = String(+val.toFixed(2));
      if (!w) return;
      let px = ((val - min) / ((max - min) || 1)) * (w - 30) + half;
      b.style.left = Math.min(w - half, Math.max(half, px)) + 'px';
    };
    slider.addEventListener('input', upd);
    bubbles.push({ slider, upd });
    upd();
  }
  function updateBubbles() {
    bubbles = bubbles.filter(x => x.slider.isConnected);
    bubbles.forEach(x => x.upd());
  }

  function makeSlider({ id, label, min, max, step, value, onInput }) {
    const p = document.createElement('p'); p.className = 'font-slider';
    const l = document.createElement('label'); l.textContent = label;
    const span = document.createElement('span');
    const inp = document.createElement('input');
    inp.type = 'range'; inp.className = 'slider'; inp.id = id; inp.autocomplete = 'off';
    inp.min = min; inp.max = max; inp.step = step; inp.value = value;
    inp.style.height = '4px';
    inp.addEventListener('input', () => onInput(+inp.value));
    span.appendChild(inp); p.append(l, span);
    return { p, inp };
  }

  const hint = (box, text) => {
    const s = document.createElement('span'); s.className = 'nohint'; s.textContent = text;
    box.appendChild(s);
  };

  /* =================== Build UI from font info =================== */
  let savedAxes = {};

  function buildAxes() {
    axesBox.textContent = '';
    Object.keys(axisVals).forEach(k => delete axisVals[k]);
    diceBtn.style.display = info.axes.length ? '' : 'none';
    if (!info.axes.length) { hint(axesBox, 'No variable axes in this font'); updateBubbles(); return; }
    info.axes.forEach(a => {
      const step = (a.max - a.min) > 10 ? 1 : 0.01;
      const start = savedAxes[a.tag] != null ? savedAxes[a.tag] : a.def;
      axisVals[a.tag] = start;
      const { p, inp } = makeSlider({
        id: 'ax_' + cleanId(a.tag), label: axisLabel(a) + ':',
        min: a.min, max: a.max, step, value: start,
        onInput: v => { axisVals[a.tag] = v; applyStyles(); }
      });
      axesBox.appendChild(p);
      attachBubble(inp);
    });
    requestAnimationFrame(updateBubbles);
  }

  /* --- custom OpenType features (typed in by the user, saved in localStorage and in the backup file) --- */
  const FEAT_KEY = 'fft-features';
  const tagOk = t => typeof t === 'string' && /^[A-Za-z0-9]{4}$/.test(t);
  let customFeats = [];   // [{ tag, on }]
  try {
    const j = JSON.parse(localStorage.getItem(FEAT_KEY));
    if (Array.isArray(j)) customFeats = j.filter(f => f && tagOk(f.tag)).map(f => ({ tag: f.tag, on: f.on !== false }));
  } catch (e) {}
  const saveFeats = () => { try { localStorage.setItem(FEAT_KEY, JSON.stringify(customFeats)); } catch (e) {} };

  // add (or update) one custom feature; fonts other than the active one pick up the new default when activated
  function putCustom(tag, on) {
    const ex = customFeats.find(f => f.tag === tag);
    if (ex) ex.on = on; else customFeats.push({ tag, on });
    featOn[tag] = on;
    fonts.forEach(r => { if (r !== active && r.st && r.st.feats) delete r.st.feats[tag]; });
    saveFeats();
  }

  function removeCustom(tag) {
    customFeats = customFeats.filter(f => f.tag !== tag);
    delete featOn[tag];
    fonts.forEach(r => { if (r.st && r.st.feats) delete r.st.feats[tag]; });
    saveFeats();
    buildFeatures(); applyStyles();
  }

  function buildFeatures() {
    featBox.textContent = '';
    // a generic list isn't read from the font: with All on, offer the shaping features too (applying an absent one is harmless)
    const pool = showAll.checked && info.generic ? [...new Set([...info.features, ...HIDDEN])].sort() : info.features;
    const list = pool.filter(t => showAll.checked || !HIDDEN.has(t));
    const nHidden = info.generic ? HIDDEN.size : info.features.filter(t => HIDDEN.has(t)).length;
    const allLb = $('label[for="showall"]');
    allLb.textContent = nHidden ? 'All +' + nHidden : 'All';
    allLb.classList.toggle('zero', !nHidden);
    allLb.title = !nHidden ? 'This font has no hidden shaping features, so All has nothing more to show'
      : info.generic ? 'Font tables unreadable: showing a generic list of shaping features'
      : 'Also show the ' + nHidden + ' shaping features hidden by default (init, medi, fina, ccmp, locl…)';
    const mine = customFeats.map(f => f.tag);
    const tags = [...list.filter(t => !mine.includes(t)), ...mine];   // your own features at the end
    if (!tags.length) { hint(featBox, 'No OpenType features'); return; }
    tags.forEach(tag => {
      const cf = customFeats.find(f => f.tag === tag);
      if (!(tag in featOn)) featOn[tag] = cf ? cf.on : DEFAULT_ON.has(tag);
      const p = document.createElement('p'); p.className = 'font-slider';
      const cb = document.createElement('input');
      cb.type = 'checkbox'; cb.className = 'hidden'; cb.id = 'f_' + cleanId(tag);
      cb.autocomplete = 'off'; cb.checked = featOn[tag];
      cb.addEventListener('change', () => { featOn[tag] = cb.checked; applyStyles(); });
      const lb = document.createElement('label');
      lb.htmlFor = cb.id; lb.textContent = featName(tag) === tag ? tag : `${featName(tag)} · ${tag}`;
      p.append(cb, lb);
      if (cf) {
        const xb = document.createElement('button');
        xb.type = 'button'; xb.className = 'otx'; xb.textContent = '×'; xb.title = 'Remove this feature';
        xb.addEventListener('click', () => removeCustom(tag));
        p.appendChild(xb);
      }
      featBox.appendChild(p);
    });
  }

  // "Add" row: tag + default value (1 / 0 / on / off)
  const otTag = $('#ottag'), otVal = $('#otval');
  const flashErr = el => { el.classList.add('err'); setTimeout(() => el.classList.remove('err'), 1200); el.focus(); };
  function addCustom() {
    const tag = otTag.value.trim();
    const v = otVal.value.trim().toLowerCase() || '1';
    const on = (v === '1' || v === 'on') ? true : (v === '0' || v === 'off') ? false : null;
    if (!tagOk(tag)) { flashErr(otTag); return; }
    if (on === null) { flashErr(otVal); return; }
    putCustom(tag, on);
    otTag.value = ''; otVal.value = '';
    buildFeatures(); applyStyles();
    const cb = $('#f_' + cleanId(tag));
    if (cb) cb.closest('p').scrollIntoView({ block: 'nearest', inline: 'nearest' });
  }
  $('#otadd').addEventListener('click', addCustom);
  [otTag, otVal].forEach(el => el.addEventListener('keydown', e => { if (e.key === 'Enter') addCustom(); }));

  function setInfo(i, st) {
    info = i;
    savedAxes = (st && st.axes) || {};
    Object.keys(featOn).forEach(k => delete featOn[k]);
    if (st && st.feats) Object.assign(featOn, st.feats);
    buildAxes();
    buildFeatures();
    applyStyles();
  }

  showAll.addEventListener('change', () => { buildFeatures(); applyStyles(); });

  diceBtn.addEventListener('click', () => {
    info.axes.forEach(a => {
      const inp = $('#ax_' + cleanId(a.tag));
      if (!inp) return;
      inp.value = a.min + Math.random() * (a.max - a.min);
      inp.dispatchEvent(new Event('input'));
    });
  });

  /* =================== Font file parser (fvar / GSUB / GPOS / name) =================== */
  const WANT = ['name', 'fvar', 'GSUB', 'GPOS', 'head', 'hhea', 'OS/2'];
  const W2TAGS = ['cmap','head','hhea','hmtx','maxp','name','OS/2','post','cvt ','fpgm','glyf','loca','prep',
    'CFF ','VORG','EBDT','EBLC','gasp','hdmx','kern','LTSH','PCLT','VDMX','vhea','vmtx','BASE','GDEF','GPOS',
    'GSUB','EBSC','JSTF','MATH','CBDT','CBLC','COLR','CPAL','SVG ','sbix','acnt','avar','bdat','bloc','bsln',
    'cvar','fdsc','feat','fmtx','fvar','gvar','hsty','just','lcar','mort','morx','opbd','prop','trak','Zapf',
    'Silf','Glat','Gloc','Feat','Sill'];

  const tag4 = (dv, o) => String.fromCharCode(dv.getUint8(o), dv.getUint8(o + 1), dv.getUint8(o + 2), dv.getUint8(o + 3));

  async function inflate(u8, fmt) {
    const s = new Blob([u8]).stream().pipeThrough(new DecompressionStream(fmt));
    return new Uint8Array(await new Response(s).arrayBuffer());
  }
  const view = u8 => new DataView(u8.buffer, u8.byteOffset, u8.byteLength);

  async function readTables(buf) {
    const dv = new DataView(buf), sig = tag4(dv, 0), T = {};

    if (sig === 'wOFF') {
      const n = dv.getUint16(12);
      for (let i = 0; i < n; i++) {
        const o = 44 + i * 20, t = tag4(dv, o);
        if (!WANT.includes(t)) continue;
        const off = dv.getUint32(o + 4), cl = dv.getUint32(o + 8), ol = dv.getUint32(o + 12);
        let u8 = new Uint8Array(buf, off, cl);
        if (cl < ol) u8 = await inflate(u8, 'deflate');
        T[t] = view(u8);
      }
    } else if (sig === 'wOF2') {
      const n = dv.getUint16(12), compSize = dv.getUint32(20);
      let p = 48;
      const b128 = () => {
        let v = 0;
        for (let i = 0; i < 5; i++) { const b = dv.getUint8(p++); v = v * 128 + (b & 127); if (!(b & 128)) break; }
        return v;
      };
      const dir = [];
      for (let i = 0; i < n; i++) {
        const fl = dv.getUint8(p++), idx = fl & 63, ver = fl >> 6;
        let tg;
        if (idx === 63) { tg = tag4(dv, p); p += 4; } else tg = W2TAGS[idx];
        const ol = b128(); let len = ol;
        const gl = tg === 'glyf' || tg === 'loca';
        if (gl ? ver === 0 : ver !== 0) len = b128();
        dir.push({ tg, len });
      }
      const data = await inflate(new Uint8Array(buf, p, compSize), 'brotli');
      let pos = 0;
      dir.forEach(d => {
        if (WANT.includes(d.tg)) T[d.tg] = new DataView(data.buffer, data.byteOffset + pos, d.len);
        pos += d.len;
      });
    } else {
      const base = sig === 'ttcf' ? dv.getUint32(12) : 0;
      const n = dv.getUint16(base + 4);
      for (let i = 0; i < n; i++) {
        const o = base + 12 + i * 16, t = tag4(dv, o);
        if (WANT.includes(t)) T[t] = new DataView(buf, dv.getUint32(o + 8), dv.getUint32(o + 12));
      }
    }
    return T;
  }

  function nameReader(d) {
    const cnt = d.getUint16(2), so = d.getUint16(4), recs = [];
    for (let i = 0; i < cnt; i++) {
      const o = 6 + i * 12;
      recs.push({ p: d.getUint16(o), id: d.getUint16(o + 6), len: d.getUint16(o + 8), off: d.getUint16(o + 10) });
    }
    return id => {
      const r = recs.find(x => x.id === id && x.p === 3) || recs.find(x => x.id === id && x.p === 1) || recs.find(x => x.id === id);
      if (!r) return '';
      let s = '';
      if (r.p === 1) for (let i = 0; i < r.len; i++) s += String.fromCharCode(d.getUint8(so + r.off + i));
      else for (let i = 0; i < r.len; i += 2) s += String.fromCharCode(d.getUint16(so + r.off + i));
      return s;
    };
  }

  function featureTags(d) {
    const fl = d.getUint16(6), n = d.getUint16(fl), out = [];
    for (let i = 0; i < n; i++) out.push(tag4(d, fl + 2 + i * 6));
    return out;
  }

  // "Version 1.200;UKWN;Font-1.200" -> "1.200"
  function cleanVersion(s) {
    return (s || '').replace(/^\s*version\s*/i, '').split(';')[0].trim();
  }

  async function parseFont(buf) {
    const T = await readTables(buf);
    const out = { name: '', version: '', axes: [], features: [] };
    const names = T.name ? nameReader(T.name) : () => '';
    // 4 = Full font name, 16 = Typographic family, 1 = Family
    out.name = (names(4) || names(16) || names(1) || '').trim();
    out.version = cleanVersion(names(5));

    if (T.fvar) {
      const d = T.fvar, off = d.getUint16(4), cnt = d.getUint16(8), sz = d.getUint16(10);
      for (let i = 0; i < cnt; i++) {
        const o = off + i * sz;
        if (d.getUint16(o + 16) & 1) continue; // hidden axis
        out.axes.push({
          tag: tag4(d, o),
          min: d.getInt32(o + 4) / 65536,
          def: d.getInt32(o + 8) / 65536,
          max: d.getInt32(o + 12) / 65536,
          name: names(d.getUint16(o + 18))
        });
      }
    }
    const set = new Set();
    ['GSUB', 'GPOS'].forEach(t => { try { if (T[t]) featureTags(T[t]).forEach(x => set.add(x)); } catch (e) {} });
    out.features = [...set].sort();
    // metrics stored in the file (font units), used when the glyphs can't be measured
    try {
      const tab = {};
      if (T.head) tab.upm = T.head.getUint16(18);
      if (T.hhea) { tab.hAsc = T.hhea.getInt16(4); tab.hDesc = T.hhea.getInt16(6); }
      const os = T['OS/2'];
      if (os && os.byteLength >= 90 && os.getUint16(0) >= 2) { tab.xh = os.getInt16(86); tab.cap = os.getInt16(88); }
      out.tab = tab;
    } catch (e) {}
    return out;
  }

  /* =================== Font list (select / reload / remove) =================== */
  function renderList() {
    listEl.textContent = '';
    if (!fonts.length) { hint(listEl, 'No fonts — drop files here'); return; }
    fonts.forEach(r => {
      const chip = document.createElement('span');
      chip.className = 'chip' + (r === active ? ' active' : '');
      const nb = document.createElement('button');
      nb.type = 'button'; nb.className = 'chipname';
      nb.textContent = chipLabel(r);
      nb.title = r.system ? 'Fallback font: the browser\'s default font' : r.file + ' — ' + titleOf(r);
      nb.addEventListener('click', () => { if (r !== active) activate(r); });
      chip.appendChild(nb);
      // the fallback font has no file: no reload button and it can't be removed
      if (!r.system) {
        const rb = document.createElement('button');
        rb.type = 'button'; rb.className = 'chipr'; rb.textContent = '↻'; rb.title = 'Reload';
        rb.addEventListener('click', () => reloadFont(r));
        chip.appendChild(rb);
      }
      if (!r.system) {
        const xb = document.createElement('button');
        xb.type = 'button'; xb.className = 'chipx'; xb.textContent = '×'; xb.title = 'Remove';
        xb.addEventListener('click', () => removeFont(r));
        chip.appendChild(xb);
      } else nb.classList.add('nox');
      listEl.appendChild(chip);
    });
    const a = listEl.querySelector('.active');
    if (a) a.scrollIntoView({ block: 'nearest', inline: 'nearest' });
  }

  function activate(rec) {
    if (active) active.st = { axes: { ...axisVals }, feats: { ...featOn } };
    active = rec;
    target.style.fontFamily = rec.css;
    nameEl.textContent = titleOf(rec);
    document.title = rec.system ? 'Fontamin Font Tester' : titleOf(rec) + ' – FFT';
    setInfo(rec.info, rec.st);
    setStatus(rec.status);
    renderList();
  }

  function removeFont(rec) {
    const i = fonts.indexOf(rec);
    if (i < 0) return;
    fonts.splice(i, 1);
    if (rec.face) { try { document.fonts.delete(rec.face); } catch (e) {} }
    if (rec !== active) { renderList(); return; }
    active = null;
    const next = fonts[i] || fonts[i - 1];
    if (next) { activate(next); return; }
    target.style.fontFamily = 'sans-serif';
    nameEl.textContent = '';
    document.title = 'Fontamin Font Tester';
    setInfo({ axes: [], features: [] });
    setStatus('');
    renderList();
  }

  /* =================== Font loading =================== */
  // src: { url } | { file, handle? }
  async function getBuf(src, fresh) {
    if (src.url) {
      const r = await fetch(src.url, fresh ? { cache: 'reload' } : undefined);
      if (!r.ok) throw new Error(r.status);
      return r.arrayBuffer();
    }
    if (src.handle) {
      if (src.handle.requestPermission) {
        const p = await src.handle.requestPermission({ mode: 'read' });
        if (p !== 'granted') throw new Error('permission');
      }
      src.file = await src.handle.getFile();
    }
    return src.file.arrayBuffer();
  }

  // Guide metrics in em: the real glyph heights of l/d/b… (ascender), g/p/q… (descender), x and H, measured on a canvas.
  // If the font has no Latin letters (pure Arabic fonts) the canvas would measure a fallback font, so the values stored
  // in the file (hhea / OS/2) are used instead.
  function measureMetrics(cssFamily, tab) {
    const SZ = 1000;
    const cx = measureMetrics.cx || (measureMetrics.cx = document.createElement('canvas').getContext('2d'));
    const mt = (ch, fb) => { cx.font = `${SZ}px ${cssFamily}, ${fb}`; return cx.measureText(ch); };
    const asc = chars => Math.max(...[...chars].map(c => mt(c, 'monospace').actualBoundingBoxAscent)) / SZ;
    const desc = chars => Math.max(...[...chars].map(c => mt(c, 'monospace').actualBoundingBoxDescent)) / SZ;
    let latin = false;
    try {
      latin = [...'lxHgp'].every(c => {
        const a = mt(c, 'monospace'), b = mt(c, 'serif');
        return a.width === b.width && a.actualBoundingBoxAscent === b.actualBoundingBoxAscent;
      });
    } catch (e) {}
    const u = tab && tab.upm;
    if (latin) {
      return {
        asc: asc('bdfhklt'), desc: desc('gjpqy'),
        xh: asc('x') || (u && tab.xh ? tab.xh / u : 0), cap: asc('H') || (u && tab.cap ? tab.cap / u : 0)
      };
    }
    if (u && tab.hAsc != null) {
      return { asc: tab.hAsc / u, desc: -tab.hDesc / u, xh: tab.xh ? tab.xh / u : 0, cap: tab.cap ? tab.cap / u : 0 };
    }
    return null;
  }

  // fileName: original file name (with extension), used for the chip and as a fallback font name
  async function makeFace(buf, fileName) {
    const family = 'TestFont' + (++counter);
    const face = new FontFace(family, buf.slice(0));
    await face.load(); // throws on invalid font

    let parsed = null, note = '';
    try { parsed = await parseFont(buf); }
    catch (e) {
      const woff2 = tag4(new DataView(buf), 0) === 'wOF2';
      note = woff2 && !BROTLI
        ? ' — this browser can\'t decode woff2 (no Brotli): generic features shown, use ttf/otf/woff for the real list'
        : ' — could not read font tables, showing generic features';
    }

    document.fonts.add(face);
    const name = (parsed && parsed.name) || baseName(fileName);
    const version = (parsed && parsed.version) || '';
    return {
      family, css: `"${family}", sans-serif`, face, file: fileName, name, version,
      metrics: measureMetrics(`"${family}"`, parsed && parsed.tab),
      info: parsed
        ? { axes: parsed.axes, features: parsed.features }
        : { generic: true, axes: [], features: COMMON },
      status: parsed
        ? `${name}${version ? ' v' + version : ''}: ${parsed.axes.length} axes, ${parsed.features.length} features`
        : `${name}${note}`
    };
  }

  async function addFont(buf, fileName, src) {
    const m = await makeFace(buf, fileName);
    const rec = { id: ++counter, src, st: { axes: {}, feats: {} }, ...m };
    fonts.push(rec);
    activate(rec);
    sigOf(rec).then(x => { rec.sig = x; });
  }

  async function reloadFont(rec, auto) {
    setStatus((auto ? 'Auto-reloading ' : 'Reloading ') + rec.file + '…');
    rec.reloading = true;
    try {
      const buf = await getBuf(rec.src, true);
      const m = await makeFace(buf, rec.file);
      if (!fonts.includes(rec)) { try { document.fonts.delete(m.face); } catch (e) {} return; }   // removed meanwhile
      const old = rec.face;
      Object.assign(rec, m);
      if (old) { try { document.fonts.delete(old); } catch (e) {} }
      if (rec === active) activate(rec); else renderList();
      setStatus(m.status + (auto ? ' (auto-reloaded)' : ' (reloaded)'));
      sigOf(rec).then(x => { rec.sig = x; });
    } catch (e) {
      setStatus('Reload failed: ' + rec.file + (rec.src.file && !rec.src.handle ? ' — add the file again' : ''));
    } finally { rec.reloading = false; }
  }

  /* =================== Auto reload (watches the font files) =================== */
  // Local files (picked / dropped in Chrome or Edge, via file handles) and fonts loaded by URL are checked
  // every second; a font is reloaded once its file stops changing. Plain files from Firefox / Safari can't be watched.
  const AUTO_KEY = 'fft-auto';
  let autoOn = true;
  try { autoOn = localStorage.getItem(AUTO_KEY) !== '0'; } catch (e) {}
  // fixed round button next to the dark-mode button (always visible, whatever the tab or the number of fonts)
  const oldAuto = $('#autobtn'); if (oldAuto) oldAuto.remove();   // leftover from the previous version of index.html
  const autoBtn = document.createElement('button');
  autoBtn.id = 'autobtn'; autoBtn.type = 'button'; autoBtn.textContent = '↻';
  document.body.appendChild(autoBtn);
  const syncAuto = () => {
    autoBtn.classList.toggle('on', autoOn);
    autoBtn.title = 'Auto-reload fonts when their files change: ' + (autoOn ? 'ON' : 'OFF') + ' (click to toggle)';
  };
  syncAuto();

  // a string that changes whenever the file changes (null = can't tell)
  async function sigOf(rec) {
    const s = rec.src;
    try {
      if (s.handle) {
        if (s.handle.queryPermission && (await s.handle.queryPermission({ mode: 'read' })) !== 'granted') return null;
        const f = await s.handle.getFile();
        return f.lastModified + ':' + f.size;
      }
      if (s.url) {
        const r = await fetch(s.url, { method: 'HEAD', cache: 'no-store' });
        if (!r.ok) return null;
        const v = [r.headers.get('etag'), r.headers.get('last-modified'), r.headers.get('content-length')];
        return v.some(Boolean) ? v.join('|') : null;
      }
    } catch (e) {}
    return null;
  }

  let watchBusy = false;
  async function watchTick() {
    if (!autoOn || watchBusy || document.hidden) return;
    watchBusy = true;
    try {
      for (const rec of fonts.slice()) {
        if (rec.system || rec.reloading) continue;
        const now = Date.now();
        if (rec.src.url && now - (rec.checked || 0) < 3000) continue;   // be gentle with servers
        rec.checked = now;
        const x = await sigOf(rec);
        if (x == null) continue;
        if (rec.sig == null || x === rec.sig) { rec.sig = x; rec.pending = null; continue; }
        if (rec.pending !== x) { rec.pending = x; continue; }            // wait until the file stops changing
        rec.pending = null; rec.sig = x;
        await reloadFont(rec, true);
      }
    } finally { watchBusy = false; }
  }
  setInterval(watchTick, 1000);
  document.addEventListener('visibilitychange', () => { if (!document.hidden) watchTick(); });

  autoBtn.addEventListener('click', () => {
    autoOn = !autoOn;
    syncAuto();
    try { localStorage.setItem(AUTO_KEY, autoOn ? '1' : '0'); } catch (e) {}
    flash(autoOn ? 'Auto on' : 'Auto off');
  });

  // items: [{ file, handle }]   (a .json file is treated as a tests file)
  async function loadItems(items) {
    for (const it of items) {
      if (/\.json$/i.test(it.file.name)) { await importTests(it.file); continue; }
      setStatus('Loading ' + it.file.name + '…');
      try { await addFont(await it.file.arrayBuffer(), it.file.name, { file: it.file, handle: it.handle || null }); }
      catch (e) { setStatus('Not a valid font file: ' + it.file.name); }
    }
  }

  async function loadURL(url) {
    if (!url) return;
    setStatus('Fetching…');
    const src = { url };
    let buf;
    try { buf = await getBuf(src, false); }
    catch (e) { setStatus('Fetch failed (CORS or wrong URL)'); return; }
    try {
      let nm = 'Font';
      try { nm = decodeURIComponent(url.split('?')[0].split('#')[0].split('/').pop() || 'Font'); }
      catch (e) { nm = url.split('?')[0].split('/').pop() || 'Font'; }
      await addFont(buf, nm, src);
    } catch (e) { setStatus('Not a valid font file'); }
  }

  // The built-in font: whatever the browser uses for system-ui / sans-serif (no file, so no font information to read).
  function addSystemFont() {
    const css = 'system-ui, sans-serif';
    const rec = {
      id: ++counter, system: true, family: 'system-ui', css, face: null, file: 'Fallback font', name: 'Fallback font',
      version: '', src: null, st: { axes: {}, feats: {} },
      info: { generic: true, axes: [], features: COMMON },
      status: '',
      metrics: measureMetrics(css, null)
    };
    fonts.unshift(rec);
    activate(rec);
  }

  /* --- file picker (File System Access API when available) / URL input --- */
  const fileIn = $('#fontfile'), urlIn = $('#fonturl');
  $('#pickbtn').addEventListener('click', async () => {
    if (window.showOpenFilePicker) {
      try {
        const hs = await window.showOpenFilePicker({
          multiple: true,
          types: [{ description: 'Fonts', accept: { 'font/*': ['.ttf', '.otf', '.woff', '.woff2'] } }]
        });
        const items = [];
        for (const h of hs) items.push({ file: await h.getFile(), handle: h });
        loadItems(items);
        return;
      } catch (e) {
        if (e && e.name === 'AbortError') return;
      }
    }
    fileIn.click();
  });
  fileIn.addEventListener('change', () => {
    const files = [...fileIn.files];
    fileIn.value = '';
    if (files.length) loadItems(files.map(file => ({ file })));
  });
  $('#urlbtn').addEventListener('click', () => loadURL(urlIn.value.trim()));
  urlIn.addEventListener('keydown', e => { if (e.key === 'Enter') loadURL(urlIn.value.trim()); });

  /* --- drag & drop (capture phase so contenteditable can't swallow it) --- */
  const dz = $('#dropzone');
  const showDZ = on => dz.classList.toggle('active', on);
  const isFileDrag = e => {
    const t = e.dataTransfer && e.dataTransfer.types;
    if (!t) return false;
    return Array.prototype.some.call(t, x => x === 'Files' || x === 'application/x-moz-file' || x === 'text/uri-list');
  };

  document.addEventListener('dragenter', e => {
    if (!isFileDrag(e)) return;
    e.preventDefault();
    showDZ(true);
  }, true);

  document.addEventListener('dragover', e => {
    if (!isFileDrag(e)) return;
    e.preventDefault();
    e.dataTransfer.dropEffect = 'copy';
    showDZ(true);
  }, true);

  document.addEventListener('dragleave', e => {
    if (!e.relatedTarget) showDZ(false);
  }, true);

  document.addEventListener('dragend', () => showDZ(false), true);

  document.addEventListener('drop', e => {
    if (!isFileDrag(e)) return;
    e.preventDefault();
    e.stopPropagation();
    showDZ(false);
    const dt = e.dataTransfer;

    // must be collected synchronously during the event
    let entries = [];
    if (dt.items && dt.items.length) {
      entries = [...dt.items].filter(i => i.kind === 'file').map(i => ({
        file: i.getAsFile(),
        hp: i.getAsFileSystemHandle ? i.getAsFileSystemHandle() : null
      })).filter(x => x.file);
    }
    if (!entries.length && dt.files) entries = [...dt.files].map(file => ({ file, hp: null }));

    if (entries.length) {
      (async () => {
        const items = [];
        for (const en of entries) {
          let h = null;
          try { h = en.hp ? await en.hp : null; } catch (err) {}
          if (h && h.kind !== 'file') h = null;
          items.push({ file: en.file, handle: h });
        }
        loadItems(items);
      })();
      return;
    }
    const u = (dt.getData('text/uri-list') || '').split('\n').find(l => l && !l.startsWith('#'));
    if (u) { urlIn.value = u.trim(); loadURL(u.trim()); }
  }, true);

  /* =================== Layout controls =================== */
  sizeIn.addEventListener('input', applyStyles);
  heightIn.addEventListener('input', applyStyles);
  attachBubble(sizeIn);
  attachBubble(heightIn);

  /* =================== Dark mode / outline =================== */
  const neg = $('#negative');
  try { if (localStorage.getItem('fft-dark') === '1') { neg.checked = true; document.body.classList.add('darkmode'); } } catch (e) {}
  neg.addEventListener('change', () => {
    document.body.classList.toggle('darkmode', neg.checked);
    try { localStorage.setItem('fft-dark', neg.checked ? '1' : '0'); } catch (e) {}
  });
  $('#outline').addEventListener('change', e => document.body.classList.toggle('outline', e.target.checked));

  /* =================== Text box helpers =================== */
  // Two separate text boxes: #Test (tests) and #Wiki (Wikipedia article). They never mix.
  const testBox = $('#Test');
  const tab6El  = $('.tab6');
  const boxP = box => box && box.querySelector('p[contenteditable]');

  const WIKI_HINT = 'Fetch an article (you need an internet connection)';
  const wikiBox = document.createElement('div');
  wikiBox.id = 'Wiki'; wikiBox.className = 'tabcontent'; wikiBox.style.display = 'none';
  testBox.after(wikiBox);

  let viewWiki = false;   // which box is on screen
  let wikiOn = false;     // Wiki button in the Test tab (on = Wikipedia menu + article, off = tests)
  const wikiToggle = $('#wikitoggle');
  function setWikiMode(on) {
    wikiOn = on; viewWiki = on;
    tab6El.classList.toggle('wikimode', on);
    wikiToggle.classList.toggle('on', on);
    syncView();
  }
  wikiToggle.addEventListener('click', () => { setWikiMode(!wikiOn); updateAbout(); });
  function syncView() {
    testBox.style.display = viewWiki ? 'none' : 'block';
    wikiBox.style.display = viewWiki ? 'block' : 'none';
  }

  function setBoxText(p, text) {
    p.textContent = '';
    text.split('\n').forEach((line, i) => {
      if (i) p.appendChild(document.createElement('br'));
      p.appendChild(document.createTextNode(line));
    });
  }

  function showPlain(box, text) {
    box.innerHTML = '<p contenteditable="true" dir="auto" style="text-align:start;"></p>';
    setBoxText(boxP(box), text);
  }

  function showWikiHint() {
    wikiBox.innerHTML = '<p class="wikihint" dir="ltr"></p>';
    wikiBox.firstChild.textContent = WIKI_HINT;
  }
  showWikiHint();

  /* =================== Guides: ascender / descender (solid), x-height / cap-height (dotted) =================== */
  const SVGNS = 'http://www.w3.org/2000/svg';
  const guideSvg = document.createElementNS(SVGNS, 'svg');
  guideSvg.id = 'guidesvg'; guideSvg.setAttribute('aria-hidden', 'true'); guideSvg.style.display = 'none';
  const gSolid = document.createElementNS(SVGNS, 'path'), gDash = document.createElementNS(SVGNS, 'path');
  gDash.id = 'guidedash';
  guideSvg.append(gSolid, gDash);
  target.appendChild(guideSvg);   // only the "d" attributes change later, so the MutationObserver below never sees our own drawing

  // distance from the top of a text fragment to its baseline, as a fraction of the font size (what the browser really uses)
  const baseCache = {};
  function baseRatio(ff) {
    if (baseCache[ff] != null) return baseCache[ff];
    const d = document.createElement('div');
    d.style.cssText = 'position:absolute;left:-9999px;top:0;visibility:hidden;white-space:nowrap;font-size:1000px;line-height:normal;font-family:' + ff;
    d.innerHTML = '<span>x</span><span style="display:inline-block;width:0;height:0"></span>';
    document.body.appendChild(d);
    const a = d.firstChild.getBoundingClientRect(), b = d.lastChild.getBoundingClientRect();
    d.remove();
    return (baseCache[ff] = (b.bottom - a.top) / 1000);
  }

  function clearGuides() { gSolid.setAttribute('d', ''); gDash.setAttribute('d', ''); }

  function drawGuides() {
    if (!guidesOn) return;
    const m = active && active.metrics;
    const box = [testBox, wikiBox].find(b => b.style.display !== 'none');
    if (!m || !box) { clearGuides(); return; }
    const dyn = target.getBoundingClientRect();
    const styles = new Map();
    const line = (x1, x2, y) => 'M' + x1.toFixed(1) + ' ' + (Math.round(y) + 0.5) + 'H' + x2.toFixed(1);
    let solid = '', dash = '';
    const walker = document.createTreeWalker(box, NodeFilter.SHOW_TEXT);
    const range = document.createRange();
    for (let n; (n = walker.nextNode());) {
      if (!/\S/.test(n.nodeValue) || !n.parentElement) continue;
      let cs = styles.get(n.parentElement);
      if (!cs) {
        const c = getComputedStyle(n.parentElement);
        cs = { fs: parseFloat(c.fontSize), ff: c.fontFamily, ok: c.fontFamily.includes(active.family) };
        styles.set(n.parentElement, cs);
      }
      if (!cs.ok) continue;   // text in another font (size labels, hints) gets no lines
      const ratio = baseRatio(cs.ff);
      range.selectNodeContents(n);
      const lines = new Map();   // one entry per visual line of this text node
      for (const r of range.getClientRects()) {
        if (!r.width) continue;
        const k = Math.round(r.top * 2) + ':' + Math.round(r.height * 2);
        const g = lines.get(k);
        if (g) { g.l = Math.min(g.l, r.left); g.r = Math.max(g.r, r.right); } else lines.set(k, { t: r.top, l: r.left, r: r.right });
      }
      for (const g of lines.values()) {
        const yb = g.t - dyn.top + ratio * cs.fs, x1 = g.l - dyn.left, x2 = g.r - dyn.left;
        if (m.asc)  solid += line(x1, x2, yb - m.asc * cs.fs);
        if (m.desc) solid += line(x1, x2, yb + m.desc * cs.fs);
        if (m.xh)   dash  += line(x1, x2, yb - m.xh * cs.fs);
        if (m.cap)  dash  += line(x1, x2, yb - m.cap * cs.fs);
      }
    }
    gSolid.setAttribute('d', solid);
    gDash.setAttribute('d', dash);
  }

  function scheduleGuides() {
    if (!guidesOn || gRaf) return;
    gRaf = requestAnimationFrame(() => { gRaf = 0; drawGuides(); });
  }

  const guideChk = $('#guidetoggle');
  guideChk.addEventListener('change', () => {
    guidesOn = guideChk.checked;
    guideSvg.style.display = guidesOn ? '' : 'none';
    if (guidesOn) drawGuides(); else clearGuides();
  });
  // redraw when the text, the layout or the font changes
  new MutationObserver(scheduleGuides).observe(target, { childList: true, subtree: true, characterData: true });
  if (window.ResizeObserver) new ResizeObserver(scheduleGuides).observe(target);
  window.addEventListener('resize', scheduleGuides);
  if (document.fonts && document.fonts.addEventListener) document.fonts.addEventListener('loadingdone', scheduleGuides);

  /* =================== Text alignment: Right / Left / Justify (radio buttons; none selected = the text's own alignment) =================== */
  let curAlign = '';
  $$('input[name="align"]').forEach(r => r.addEventListener('click', () => {
    if (curAlign === r.value) { r.checked = false; curAlign = ''; }   // click the active one again to go back to the default
    else curAlign = r.value;
    target.classList.remove('al-right', 'al-left', 'al-justify');
    if (curAlign) target.classList.add('al-' + curAlign);
    scheduleGuides();
  }));

  /* =================== Toast =================== */
  const toast = $('#div2');
  function flash(msg) {
    toast.textContent = msg || 'Copied';
    toast.className = 'show';
    setTimeout(() => { toast.className = 'hide'; }, 2000);
  }

  /* =================== Test tab =================== */
  const Z = '\u200c'; // ZWNJ (نیم‌فاصله)

  const TXT_FA = 'فرهنگ نوشتاری هر جامعه، بازتابی از شیوه‌ی اندیشیدن(thinking)، احساسات(emotions) و تعاملات اجتماعی(Social interactions) آن است. نوشتن(writing) فقط ثبت کلمات لازم روی کاغذ یا صفحه‌ی نمایش نیست؛ بلکه نوعی ارتباط (communication) عمیق میان نویسنده و خواننده است. در جوامع گوناگون، این ارتباط می‌تواند رسمی، شاعرانه، انتقادی یا حتی طنزآمیز باشد. برای مثال، در فرهنگ ایرانی نوشتار اغلب با نوعی احساس بالا همراه است؛ چه در نامه‌های قدیمی، چه در پیام‌های امروزی در شبکه‌های اجتماعی. این احساس‌گرایی سبب می‌شود نوشته‌ها نه تنها معنا بلکه «روح» نیز داشته باشند. در مقابل، در فرهنگ‌های غربی، به‌ویژه در academic writing، دقت منطقی و استدلالی اهمیت بیشتری دارد. هدف انتقال داده‌ها و مفاهیم با وضوح و ساختار بدون آلایش است، نه لزوماً با احساس. این تفاوت باعث می‌شود که وقتی متنی ترجمه یا بین فرهنگی جابه‌جا می‌شود، بخشی از بار فرهنگی و احساسی آن گم شود. امروزه با گسترش ارتباطات دیجیتال، مرز میان سبک‌های نوشتاری در حال تغییر است. ایموجی‌ها، لحن غیررسمی و اختصارها نوعی زبان جهانی جدید ساخته‌اند. با این حال، ریشه‌ی هر نوشتار در فرهنگ همان جامعه باقی می‌ماند؛ جایی که واژه‌ها نه فقط معنی، بلکه هویت دارند.';

  const TXT_AR = [
    'الفولاذ الدمشقي أو الفولاذ المدمشق هو نوع من الفولاذ المستخدم لصناعة نصل السيوف، والذي اشتهرت به مدينة دمشق وإليها ينسب. كانت السيوف الدمشقية تصنع من الفولاذ الهندواني (فولاذ بلاد الهند)؛ وكانت تتميّز بنقوشها الفريدة المبرقشة والمحزّمة؛ كما أنّها اشتهرت بصرامتها ومقاومتها للاهتراء، وبقابلية الشحذ والسَّنّ إلى حدّ مطواع شديد القطع. نال السيف الدمشقي شهرةً واسعةً عبر التاريخ، وأحاطت به العديد من القصص والروايات، كالقدرة على قطع شعرةٍ ساقطةٍ على نصله.',
    'سمّي هذا النوع من الفولاذ بالدمشقي نسبة إلى العاصمة السورية دمشق، والتي كانت هذه السيوف تصنع وتباع فيها، كما أنّ النموذج النمطي المميّز لها أصبح مشهوراً بشكل أصبح يطلق تسميته أيضاً على أيّ فولاذٍ يحمل تلك المواصفات، مثلما هو الحال مع زخارف البروكار الدمشقي.كانت صناعة السيوف الدمشقية حرفةً يحوطها الكثير من السرّية، وكان المهرة من الحرفيين يتناقلونها من جيلٍ إلى جيل، إلى أن اندثرت، ولا يوجد تدوينات للطريقة الأصلية التي كانت تستخدم في الماضي.',
    'رغم اختلاف المواد الأولية المستخدمة وطرق وتقنيات التصنيع إلّا أنّه جرت محاولات حديثة لكشف سر التركيب وطريقة التحضير؛ إذ بيّنت الأبحاث باستخدام وسائل تقنية حديثة وجود أسلاك وأنابيب نانوية كربونية في تركيب سيفٍ مصنوعٍ من الفولاذ الدمشقي. وخلصت الدراسات أنّه خلال عملية الصهر لتشكيل صبّات الفولاذ الهندواني المستخدم في صناعة السيوف الدمشقية كانت أجزاء نباتية معروفة من الأوراق والأغصان الخشبية تضاف بمقدارٍ محدّدٍ إلى الخلطة، وذلك كمصدر كربوني، بالإضافة إلى استخدام أنواع من الخامات الغنيّة بالحديد والمشوبة بعناصر كيميائية أخرى؛ وفي مرحلة لاحقة كانت الصبّات تخضع للتطريق وتشكّل على هيئة أنصال. على الرغم من أنّه توجد حالياً أنواع تفوق الفولاذ الدمشقي القديم في أدائها، إلّا أنّ التفاعلات الكيميائية المرافقة لعملية التصنيع آنذاك جعلت السيوف الدمشقية مميّزة عن أقرانها في عصرها، إذ كان الفولاذ الدمشقي فائق اللدونة وفائق الصلابة في نفس الوقت.'
  ].join('\n');

  const TXT_QURAN = 'بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيمِ\n' + [
    'وَالْفَجْرِ ﴿۱﴾', 'وَلَيَالٍ عَشْرٍ ﴿۲﴾', 'وَالشَّفْعِ وَالْوَتْرِ ﴿۳﴾', 'وَاللَّيْلِ إِذَا يَسْرِ ﴿۴﴾',
    'هَلْ فِي ذَلِكَ قَسَمٌ لِذِي حِجْرٍ ﴿۵﴾', 'أَلَمْ تَرَ كَيْفَ فَعَلَ رَبُّكَ بِعَادٍ ﴿۶﴾',
    'إِرَمَ ذَاتِ الْعِمَادِ ﴿۷﴾', 'الَّتِي لَمْ يُخْلَقْ مِثْلُهَا فِي الْبِلَادِ ﴿۸﴾',
    'وَثَمُودَ الَّذِينَ جَابُوا الصَّخْرَ بِالْوَادِ ﴿۹﴾', 'وَفِرْعَوْنَ ذِي الْأَوْتَادِ ﴿۱۰﴾',
    'الَّذِينَ طَغَوْا فِي الْبِلَادِ ﴿۱۱﴾', 'فَأَكْثَرُوا فِيهَا الْفَسَادَ ﴿۱۲﴾',
    'فَصَبَّ عَلَيْهِمْ رَبُّكَ سَوْطَ عَذَابٍ ﴿۱۳﴾', 'إِنَّ رَبَّكَ لَبِالْمِرْصَادِ ﴿۱۴﴾',
    'فَأَمَّا الْإِنْسَانُ إِذَا مَا ابْتَلَاهُ رَبُّهُ فَأَكْرَمَهُ وَنَعَّمَهُ فَيَقُولُ رَبِّي أَكْرَمَنِ ﴿۱۵﴾',
    'وَأَمَّا إِذَا مَا ابْتَلَاهُ فَقَدَرَ عَلَيْهِ رِزْقَهُ فَيَقُولُ رَبِّي أَهَانَنِ ﴿۱۶﴾',
    'كَلَّا بَلْ لَا تُكْرِمُونَ الْيَتِيمَ ﴿۱۷﴾', 'وَلَا تَحَاضُّونَ عَلَى طَعَامِ الْمِسْكِينِ ﴿۱۸﴾',
    'وَتَأْكُلُونَ التُّرَاثَ أَكْلًا لَمًّا ﴿۱۹﴾', 'وَتُحِبُّونَ الْمَالَ حُبًّا جَمًّا ﴿۲۰﴾',
    'كَلَّا إِذَا دُكَّتِ الْأَرْضُ دَكًّا دَكًّا ﴿۲۱﴾', 'وَجَاءَ رَبُّكَ وَالْمَلَكُ صَفًّا صَفًّا ﴿۲۲﴾',
    'وَجِيءَ يَوْمَئِذٍ بِجَهَنَّمَ يَوْمَئِذٍ يَتَذَكَّرُ الْإِنْسَانُ وَأَنَّى لَهُ الذِّكْرَى ﴿۲۳﴾',
    'يَقُولُ يَا لَيْتَنِي قَدَّمْتُ لِحَيَاتِي ﴿۲۴﴾', 'فَيَوْمَئِذٍ لَا يُعَذِّبُ عَذَابَهُ أَحَدٌ ﴿۲۵﴾',
    'وَلَا يُوثِقُ وَثَاقَهُ أَحَدٌ ﴿۲۶﴾', 'يَا أَيَّتُهَا النَّفْسُ الْمُطْمَئِنَّةُ ﴿۲۷﴾',
    'ارْجِعِي إِلَى رَبِّكِ رَاضِيَةً مَرْضِيَّةً ﴿۲۸﴾', 'فَادْخُلِي فِي عِبَادِي ﴿۲۹﴾',
    'وَادْخُلِي جَنَّتِي ﴿۳۰﴾'
  ].join(' ');

  const TXT_EN = `Although typically applied to printed, published, broadcast, and reproduced materials in contemporary times, all words, letters, symbols, and numbers written alongside the earliest naturalistic drawings by humans may be called typography. The uneven spacing of the impressions on brick stamps found in the Mesopotamian cities of Uruk and Larsa, dating from the second millennium B.C., may be evidence of type, wherein the reuse of identical characters was applied to create cuneiform text. Babylonian cylinder seals were used to create an impression on a surface by rolling the seal on wet clay. Typography also was implemented in the Phaistos Disc, an enigmatic Minoan printed item from Crete, which dates to between 1850 and 1600 B.C. It has been proposed that Roman lead pipe inscriptions were created with movable type printing, but German typographer Herbert Brekle recently dismissed this view.(from Wikipedia)
0123456789!@#$%^&*()_+-={}[]:"'?/<>,.`;

  const ZWNJ_test = `آتش‌رنگ - آب‌انار - آبادی‌نشین - آب‌بها - آب‌تبلور - آبله‌رو - آبگینه‌خانه - آبمیوه‌فروشی - آبی‌زنگاری - آپارات‌چی - آب‌و‌نان‌دار - آب‌و‌هوا - آپارتمان‌نشین - آب‌هراسی - آت‌آشغال - پاره‌آتشین - آجودان‌کشوری - آجیده‌دوزی - چهارشنبه‌سوری - آتشین‌مزاج - آتل‌بندی - آجر‌سه‌سانتی - آجیل‌شور - لعاب‌دار - آجان‌کشی - آج‌دار - آج‌گاه - آدم‌حسابی - آخرت‌شناس - آداب‌دانی - آدامس‌بادکنکی - آدم‌ربایی - آذری‌زبان - آذین‌بخش - آرام‌بخش - آدمی‌گری - آرامش‌بخش - دندان‌پزشکی - آرمان‌پرست - آرایش‌کرده - آرش‌وار - کتاب‌داری - آرایش‌گری - آرایه‌گر - آر‌پی‌جی‌زن - آرک‌آماس - آرمان‌گرایانه - آرتیست‌بازی - آرنج‌بند - آرد‌بیزی - آرواره‌داران - آریایی‌نژاد - آزرده‌جان - بخت‌آزمایی - آسان‌شکن - آس‌باز - آستان‌بوس - آستین‌بارانی - آسمان‌غُرنبه - آسیای‌بادی - آسفالت‌ریزی - آسیب‌پذیر - آسوده‌حال - آب‌رسان - آسیب‌رسیده - سبب‌زا - آسیاب‌بادی - آسیاب‌گردان - آرام‌ناپذیر - آسیمه‌سر - آشغال‌گیر - آشفته‌بازار - آشتی‌پذیر - آشوب‌طلبانه - آش‌خور - آشیانه‌دوست - آشنا‌بازی - آشنایی‌زدایی - آصف‌جاه - آفتاب‌آسا - آفت‌پذیر- آکروبات‌باز - آفرینش‌گر - آکنده‌گوش - آگاه‌دل - آقا‌بالاسر - آگاهی‌رسانی - آگهی‌گشت‌ - آلودگی‌اقتصادی - آلاخون‌والاخون - آلوده‌دامان - آلونک‌نشین - آل‌برده - آلبومین‌دار - آمپول‌زن - آمین‌گو‌ی - آماده‌باش - آمرزش‌خواهی - آماده‌کننده - آماس‌کش - آموزش‌دیده - آمپلی‌فایر - آمونیاک‌سازی - آهک‌پزی - آهن‌تراش - آه‌و‌اسف - آیش‌بندی - آهنگ‌دار - آیفون‌تصویری - آهن‌یاب - آهنین‌بازو - آیات‌عظام - آیت‌الله‌العظمی - آینه‌بازی - آیینه‌خانه - آیین‌بندی - اباحه‌گرایی - ابداع‌شدنی - ابری‌ساز - ابریشم‌باف - ابزار‌فروشی - ابنای‌بشر - ابطال‌پذیر - ابقاه‌الله - ابلاغ‌نامه - ابو‌القاسم - ابناء‌الزمان - اتاق‌دار - ابهام‌زا - اتحادیه‌گرایی - اتم‌شکافی - اتومبیل‌رانی - اتوبان‌سازی - اجاره‌بندی - اتوبوس‌رانی - اثاث‌کشی - اثبات‌گرا - اجاره‌نشینی - اجازه‌نامه - اجاق‌برقی - دانش‌آموز - دست‌نوشته - دست‌کم - ریسک‌پذیر - دانش‌آموز - میدان‌دار - واژه‌ها - کلاس‌ها - اتاق‌ها - دوستانه‌ - کتاب‌دوست - کتاب‌خوان - کتاب‌خانه‌ای - ایرانی‌ها - پیش‌نویس - به‌زودی - بی‌اختیار - بی‌وفا - بی‌ادب - بی‌قرار - بی‌شک - بی‌نظیر - بی‌پرده - بی‌شمار - بی‌معرفتی - بی‌غايت - بی‌تفاوت - بی‌شرمانه - بی‌اشتها - بی‌بار - بی‌پول - بی‌سرپرست - بی‌قاعده - بی‌یاور - یک‌مرتبه - یدک‌کش - یک‌دست - خودبزرگ‌بین - برون‌گرایی - نیم‌کره - نیم‌سال - نیمه‌شب - نیم‌نگاهی - شب‌هنگام - شبانه‌روز - شب‌بیدار - شب‌پره - صبح‌خیز - صبح‌گاه - روزنامه‌نگار - سپیده‌دم - کهنه‌شده - کهنه‌کار - تازه‌شده - تازه‌کار - دانش‌آموخته - جدیت‌ورز - جوان‌دل - کودک‌محور - زندگی‌بخش - زندگی‌نامه‌نویس - جان‌بخش - روح‌بخش - پشتی‌بان - پیش‌کسوت - پیشا‌نمونه - پیش‌پرده - پیش‌کار - پیش‌گو - پیش‌پرداخت - پیش‌رو - پیش‌کار - پیش‌فرض - پیش‌داوری - پس‌نویس - پس‌زمینه - پس‌انداز - پس‌اندازها - پس‌زمینه‌ای - خواب‌آلوده - خوابیده‌ها - خواب‌آور - یادداشت‌ها - یادداشت‌کننده - کاربری‌ها - کارخانه‌دار - کارشناسی‌ها - کتابخانه‌ها - کتاب‌باز - زبان‌شناسی - کتاب‌ها - مکتب‌خانه - مکتوب‌شده - نامه‌رسان - نامه‌ها - پیک‌آور - پیغام‌آور - گزارش‌گر - گزارشگرانه‌تر - پرسش‌نامه - پرسشنامه‌ها - پاسخ‌نامه‌ها - جواب‌گو - حل‌شونده - مسئله‌جو - مسائل‌نگاری - صورت‌مساله - روی‌کرد - راه‌کار - چاره‌یابی - چاره‌برانداز - تلاش‌جو - موفقیت‌آمیز - نیمه‌صادق - نیمه‌راستگو - کارشناس‌ها - پژوهش‌ها - پژوهشگرانه‌تر - مطالعه‌گر - تجربه‌شده - تجربه‌آموز - دوستی‌ها - هم‌دلی - همدلانه‌تر - هم‌زبانان - همراه‌شونده - همین‌جا - همین‌حالا - همه‌کس - همه‌جاها - همه‌کس‌ها - همه‌چیزدان`;
  const LAYOUT_FA = `<div class="layout" dir="rtl">
<p class="sizelabel">Heading 60px, Subhead 24px, Body 16px</p>
<p class="lh" contenteditable="true">تفاوت خوشنویسی و حروف‌چینی:</p>
<p class="ls" contenteditable="true">پیش از آن‌که به تعریف حروف‌چینی بپردازیم، لازم است مقدمه‌ای دربارۀ خوشنویسی (خطاطی) و تفاوت آن با حروف‌چینی ارائه شود. شباهت و یکی دانستن حروف‌چینی و خوشنویسی بر دریافت و آشنایی ما از نوشتن با ماشین حروف‌چینی بی‌اثر نیست. خوشنویسی ظرف مدت کوتاهی پس از پیدایش خط، تولد یافته و حیات آن با پیدایش ماشین حروف‌چینی پایان نپذیرفته و نمیپذیرد. خط دست‌نویس، مسیر غیرقابل پیشبینی و حسی را طی میکند تا به تکامل برسد، هنگام نوشتن با دست، خطاط از همه حالات نو و بدیع در گردشهای قلم و نقطه‌گذاری‌ها، به‌صورت ناخودآگاه در ترکیب‌بندی نوشته استفاده میکند که شکل تکامل‌یافته‌ی آن در ترکیبات و سیاه‌مشق‌های خوشنویسی کاملاً مشهود است.</p>
<div class="multicolumn3" contenteditable="true">
<p>در حروف‌چینی نوشتن واژه‌ها به گونۀ دیگری صورت می‌گیرد.<br>-حروف‌چینی بر خلاف خطاطی، ماهیت خود را به نظام یکپارچه و یکنواخت فرم و اندازۀ حروف یک شکل متصل می‌یابد. چنان‌که، قبل از تولد حروف چاپی توسط گوتنبرگ در قرن پانزدهم میلادی، حروف‌چینی معنا نداشت. <br>-هنگام حروف‌چینی از الگوی ثابت و از پیش طراحی شده‌ای برای فرم حروف و فاصله‌های آن‌ها با یکدیگر استفاده می‌کنیم. <br>-شکل حروف و موقعیت نقطه‌های حروف و اسکلت اصلی حروف دچار تغییر نمی‌شود. <br>-حضور یک کاربر حرف‌های به‌خصوص یک طراح، برای تعیین اندازۀ قلم، فاصلۀ بین سطرها، اندازۀ سطرها و شکل تراز بندی متن، روند حروف‌چینی را تکامل می‌بخشد. <br>-در خوشنویسی رسیدن به ترکیب‌بندی زیبا در عین زیبایی تک‌تک مفردات حروف، هدف نهایی طراح است حال آن‌که استفاده از یک قلم مناسب در حروف‌چینی در نهایت باهدف ایجاد خوانایی صورت می‌گیرد. <br>-خوانایی، کیفیتی است که در امتداد رعایت اصول و قواعد طراحی قلم و سپس رعایت اصول حروف‌چینی توسط کاربر (اعم از حروف‌چین حرف‌های یا طراح) و در نهایت تسلط به خواندن یعنی سواد از سوی مخاطب پدید می‌آید. <br>-نقش طراح به‌عنوان یک ناظر در کنار حروف‌چین بسیار ضروری و تعیین کننده است. <br>- رفتار نامناسب با قلم در روند حروف‌چینی، لطمۀ بزرگی به انتقال دانش و اطلاعات وارد می‌سازد که با نمونه‌های فراوان آن در سطح شهر، معابر عمومی، نشریات و به‌ویژه کتاب‌ها بیگانه نیستیم. <br>-حروف‌چینی غیراصولی و بی‌قاعده تأثیرات ناهنجاری در نظام خواندن ایجاد می‌کند و سبب ایجاد آشفتگی، اضطراب و سردرگمی در مخاطبان می‌شود. در واقع حروف‌چینی عبارت است از عمل نوشتن به کمک ماشین (اعم از دستی، مکانیکی، الکترونیکی یا دیجیتال) با انجام دادن همۀ اقداماتی که برای خوانا کردن متن صورت می‌گیرد این اعمال می‌تواند شامل انتخاب تک‌تک مشخصات مربوط به قلم از قبیل: اندازه، سبک، نقطه‌گذاری، فاصله‌گذاری درست، و نیز انتخاب کاغذ، مرکب چاپ، حتی روش چاپ و به‌طور کلی شامل فعالیت‌ها و توجهاتی باشد که منجر به تصمیم‌گیری دربارۀ ظاهر هر صفحه چاپ شده می‌شود.</p>
</div>
<p class="ls" contenteditable="true">فاصله‌گذاری مناسب بین کلمات</p>
<div class="multicolumn3" contenteditable="true">
<p>توجه به فاصله‌گذاری هنگام حروف‌چینی اهمیت بسزایی در آسان خوانده شدن مطلب دارد. برای جدا کردن کلمات از هم از کلید فاصله استفاده میشود که عبارت است از فاصله استانداردی که مقدار(space) آن هنگام طراحی قلم مشخص شده است. برای جدا کردن کلمات از یک‌دیگر، مجاز به یک‌بار استفاده از این کلید هستیم. چنان‌چه بعد از واژهای از علامتهای «» ():؛،؟! استفاده کنیم این فاصله حذف میشود و بعد از علامت قرار میگیرد.
در کلمات مرکب مانند: نام‌گذاری، می‌شود، رفته‌اند و … برای جلوگیری از دوباره شدن واژه، می‌توان هنگام حروف‌چینی از اندازۀ مناسب‌تری به‌عنوان نیم‌فاصله که معمولاً نصف اندازه فاصله است استفاده کرد. چنین عملی مانع از جدا افتادن دوباره کلمه در دو سطر مختلف میشود.
به مثال‌های زیر توجه کنید. در یک متن طولانی مثل یک مقاله، یا متن یک کتاب، کنترل تمام کلمات مرکب برای جلوگیری از دوباره‌کاری سخت و غیرحرفه‌ای است. اگر در طراحی قلم نیم‌فاصله در نظر گرفته شده باشد، از پدید آمدن چنین عملی جلوگیری میشود.
نقش یک طراح در کنترل فاصله‌ها در همین حوزه تعریف می‌شود و طراح یا حروف‌چین مجاز فاصله‌گذاری کاذب بین واژه‌های متن نیستند. جمع یا فشردن غیر معمول کلمات به یک‌دیگر (از سوی کاربران غیرحرفه‌ای)، تعادل سطح خاکستری (سیاهی و سفیدی) متن را برهم میزند و خوانده شدن متن را دشوار و گاه غیرممکن میکند.
افزودن عرض حروف و کشیدن حروف همچنین، تناسبات افقی و عمودی فرم حروف را دگرگون میکند و به خوانده شدن ستون متن لطمه قابل‌توجهی وارد میکند. در قلم‌های متنوع لاتین، سبک‌های گوناگونی مانند: به‌هم فشرده-Condenced و از هم بازشده-Extend در خانوادۀ بسیاری از قلم‌ها گنجانده که اولاً از پیش طراحی شده‌اند و با یک دستور اتوماتیک برای همۀ حروف پدید نیامده‌اند و دوم آن‌که موارد استفاده آن شامل متمایز کردن بخشی از متن و یا در بعضی موارد برای عنوان‌های کوتاه می‌باشد.
برای تنظیم فاصله در حروف عنوان طراحان آزادی عمل بیشتری دارند.
فاصله طبیعی بین کلمات در برخی عنوان‌های کوتاه به‌دلیل درشت تر شدن از حد معمول، نیاز به اصلاح دارند.</p>
<p class="lh3">انتخاب اندازۀ قلم</p>
<p>انتخاب اندازۀ قلم
اندازۀ قلم رابطۀ معقول و مناسبی با کاربرد مطلب دارد. اندازۀ قلم را عواملی مثل: نوع موضوع، خواننده و شرایط خواندن و در نهایت نگاه طراح تعیین می‌کند. مهم‌ترین نکته برای تعیین اندازه‌ی قلم، کادر و محدوده‌ی بصری، نوع و کاربرد مطلب مورد نظر می‌باشد. از آنجا که حروف، واحدهای سازندۀ اسکلت‌بندی ستون نوشته هستند و اساس ساختار متن فارسی را سطرها تشکیل می‌دهند، اندازه‌ی حروف یک قلم ارتباط مستقیمی با طول سطرها و فاصلۀ آن‌ها از یکدیگر دارد.<br>
طولانی شدن سطرها باعث خستگی چشم و نیز گم کردن ابتدای سطرها توسط چشم خواننده می‌شود. بهتر است برای تعیین طول سطرها تعداد معینی از کلمه‌ها را استفاده کنیم تا به سطری با طول متناسب برسیم. برای حجم معینی از مطالب مثلاً در یک اعلان و یا نامه‌های کوتاه اداری مشکل چندانی برای تعیین طول سطرها به چشم نمی‌خورد. وقتی حجم مطلب افزایش می‌یابد (مثل صفحه‌ی کتاب یا مجله و ….) انتخاب طول سطر از حساسیت بیشتری برخوردار است. در این موارد انتخاب سطرهای مناسب کوتاه‌تر کمک به خوانایی بیشتر متن می‌کند.</p>
<p class="lh3">تعیین فاصلۀ بین سطرها</p>
<p>فاصلۀ بین خط کرسی هر سطر تا خط کرسی سطر بعدی در هر متن را فاصلۀ بین سطر (Leading) یا پایه حروف می‌گویند. دلیل آن که کلمۀ متن را بکار می‌بریم این است که مقدار این فاصله را می‌توان هنگام حروف‌چینی متن متناسب با نوع قلم آن تغییر داد.<br>
این فاصله نقش مهمی را هنگام خواندن ایفا می‌کند. برای چیدن ستون‌های متن با عرض‌های مختلف، لزوم تغییر پایه حروف را می‌توان کاملاً لمس کرد. هر چه طول سطرهای یک ستون متن کوتاه‌تر شود پایهٔ حروف به‌تناسب باید کاسته شود تا چشم دچار پرش هنگام خواندن نشود و برعکس برای حروف‌چینی سطرهای طولانی، برای جلوگیری از خستگی چشم و گم کردن ابتدای سطرها لازم است پایه حروف را از حالت عادی افزایش دهیم. هرچه اندازۀ قلمی که برای متن استفاده می‌کنیم ریزتر باشد، لازم است پایۀ کار را نسبت به‌اندازه حروف افزایش دهیم. وجود فاصلۀ کم و فشرده بین سطرهایی با اندازه قلم ریز، سبب خستگی و فشار چشم‌های خواننده و گاه خطای دید می‌شود. همچنین فاصلۀ زیاد بین سطرهایی با سایز درشت، تعادل فضای منفی و مثبت حروف‌چینی را برهم میزند و در نتیجه سطح خاکستری ناهمواری به وجود می‌آورد. انتخاب پایۀ حروف مناسب کمک می‌کند که سطح خاکستری یکنواخت و مناسبی از نوشته‌ها به وجود آید.<br>
نکتۀ مهم برای انتخاب فاصلۀ سطر این است که در متن یک کتاب یا یک مطلب متوالی اندازۀ پایۀ کار باید یکنواخت باشد. متأسفانه بر اثر بی‌توجهی به مسائل گوناگون حروف‌چینی، گاهی شاهد فواصل متفاوت در صفحه‌های مختلف یک کتاب هستیم. تعیین فاصله سطرها از مهارت‌های یک طراح است که هنگام تعیین قالب و شکل اصلی صفحات در مورد آن تصمیم‌گیری می‌کند.
توجه به فرم و ساختار اصلی قلم می‌تواند طراح را برای رسیدن به مناسب‌ترین فاصله بین سطرها راهنمایی کند.</p>
</div>
</div>`;

  const LAYOUT_EN = `<div class="layout" dir="ltr">
<p class="sizelabel">Heading 60px, Subhead 24px, Body 16px</p>
<p class="lh" contenteditable="true">Doubts over insect-bite treatment</p>
<p class="ls" contenteditable="true">People should consider using a cold, wet cloth to treat insect bites instead of turning to over-the-counter remedies, experts say. Prof Michael Siva-Jothy, from Sheffield University's Department of Animal and Plant Sciences, recruited 29 brave volunteers to test the theory further, watching the bedbugs as they found a place to feed and removing them only as they were about to bite.</p>
<div class="multicolumn3" contenteditable="true">
<p>An investigation has concluded that there is little evidence that creams, painkillers and anti-inflammatories often used for bites actually work. In any case, said Drug and Therapeutics Bulletin researchers, the reactions got better by themselves in most cases. Midges, mosquitoes, flies, fleas and bed-bugs account for most bites. A variety of remedies are sold over the counter in pharmacies to relieve the itching, pain and swelling.
Other scientists have suggested that swapping thicker fur for clothes was a way of making insect bites and parasitic infestations less likely.
Prof Mark Pagel, an evolutionary biologist at the University of Reading, said that biting parasites remain a major cause of disease and death worldwide, making them a potentially enormous evolutionary pressure on early man.</p>
</div>
<p class="ls" contenteditable="true">Cold flannel ‘best’</p>
<div class="multicolumn3" contenteditable="true">
<p>Researchers from the journal reviewed a host of data and evidence published on insect-bite treatments. It concluded in many cases treatments for insect bites had not actually been tested for such purposes. It said medical help should clearly be sought if serious symptoms, such as infections or anaphylactic shock, developed. But it said for simple bites a flannel or cloth soaked in cold water often worked best - despite advice from official bodies, such as NHS Choices, suggesting treatments should be used. David Phizackerley, the deputy editor of the journal, said: “People are using these treatments so they should know there is no evidence they work. [Most] bites will get better on their own.”
Hungry bugs placed on shaved arms were more likely to try to feed compared with those on unshaved arms, the journal Biology Letters reported. Researchers say the hair slows down the bed bugs and warns the victim. Pest controllers say the UK is currently experiencing a steep rise in the number of bed bug infestations. Prof Michael Siva-Jothy, from Sheffield University's Department of Animal and Plant Sciences, recruited 29 brave volunteers to test the theory further, watching the bedbugs as they found a place to feed and removing them only as they were about to bite.
This tallies with other studies which look at how humans came to be relatively less hairy than apes.</p>
<ol>
<li>Preface</li>
<li>Pre-Hot 100 era</li>
<li>Hot 100 era</li>
<li>Sources</li>
<li>See also</li>
</ol>
<p>He found that more layers of both longer visible hairs and finer, “vellus” hairs near the surface appeared to work as a deterrent to the insects, with the finer hairs also acting as an early warning system.
Continue reading the main story
“Start Quote
If you have a heavy coat of long thick hairs it is easier for parasites to hide”
Professor Siva-Jothy Sheffield University
Prof Siva-Jothy said: “Our findings show that more body hairs mean better detection of parasites - the hairs have nerves attached to them and provide us with the ability to detect displacement.”
He said they also slowed down the insect as it searched for a tasty spot to bite.
“The results have implications for understanding why we look the way we do, what selective forces might have driven us to look the way we do, and may even provide insight for better understanding of how to reduce biting insects’ impact on humans.”
However, even though men are naturally hairier than women, they do not appear to be bitten less often.
Professor Siva-Jothy suggested this pointed to an evolutionary battle between bed bugs and their prey, with the insects adapting to automatically head for relatively hairless bits of the body, such as wrists and ankles.
He added that extreme hairiness might also be more of a disadvantage than an advantage.
If you have a heavy coat of long thick hairs it is easier for parasites to hide, even if you can detect them. “Our proposal is that we retain the fine covering because it aids detection and if we lost all hair, even the relatively invisible fine hair, our detection ability goes right down.”</p>
</div>
</div>`;

  // Built-in tests. They are copied into the user's list on the first visit (localStorage) and can be removed like any other.
  // "about", "author" and "link" are optional (plain text; link must be http/https).
  const PRESETS = [
    { name: 'Farsi', text: TXT_FA,
      author: 'AI',
      about: 'Persian specimen: a paragraph about writing culture with mixed Persian and Latin words and parentheses, to check Latin/Persian mixing and running text.' },
    { name: 'Farsi Pairwords', text: ' آب اداب ارج داداش ده اراذل ارم اردن اردو ری ارگ رزاق دف دروغ فرط ارض درنا بنّا جایزه نجات ترسا انتشار صابون فضا طاهر تطابق عادت معاد قابل تقارن کاغذ نکات لازم سیلاب ماما نما رها مهارت تب نخ ندا دانش فرائض شرایط نصرت بطری نفت شریف قایق ریگ تلوزیون دائم بن مشابه بها بی‌بی صنایع بیغ تعداد طبیعت ترتیب سیخ بیخواب سند شیر میش فیض بیضی بلیط متظاهر حیف میقات عمیق شیک نیکان مثل نیلوفر حتماً شبنم بتن مینو شبیه تپه آبتنی راحت محب حج ثامن‌الحجج حجت هاجر تجزیه مجد حدید حس نجس جسارت خجسته حضیر محصور خط حظور حقیر محقّر نجف گرباچف حق حک محک حل محل سانچی مراحم منجم حمایت محموله جن لحن مجتبی جویا شاخه باغچه جهل مجهول کراچی مرجع مرتجع جعفر مجعول شب نسخ راسخ سحر مسجد سد حسد نشر شش نشست نشستن شصت مسطور تأسف کشف سفر مشقّت قاشق مشق سگ مشک شکر مرسل نسل سلیم مسلمان قاسم قسم مسمار سمنان مونس جنس سواد حسود کاسه فرانسه شهود مشهد کاشی عیسی وسط قسط واسع سعید مسعود غاصب ناصح فصخ فصحا صحبت قاصد مقصد ضرر صف منصف صفر تصفیه واصل متخاصم صمصام تخصص اظطراب مظطرب خصم تصمیم خلاصه قصه صهیون متصل تصلی وصلت صورت مرصع صعود تصعید رطب مطب طبیعت مطبوعات سطح ظرف عاطفه عطف مظفر منطق طهران مطهر خاطی عطسه قاطع طعمه راغب غبار معجزه عج اعراب تغزیه عسل مغشوش عصر معطوف واعظ غفار مغفور شعف شاغل فعل علت معلول غم طعم مغموم طعنه لعن عواقب معوقه عهد تعهد مراغه داعی فخر مفخّم قداست نقد قس‌علی‌هذا نفس فساد مفسد نقص ناقص فطرت فقط قطار تقطیر واقف سقف قفقاز غافل نقل قله تقلید قم قمار لقمه فن قو مقوا کلافه منطقه قهرمان مقهور تلافی نفی‌سلطه مدافع نفع فعال مفعول راگبی گچ مرکب کجاوه تکخور گدا لگد نرگس مگس گسل گفتار مکفی کک گنجشککان گل گلدان تکل تراکم گمراه تکمیل واگن لگن گواه درشکه ناگه ناگهان نگهبان سنگی خاکی سنگک کک راکع گعده قالب صالح فلج لذت بلد مولر طلسم لشکر خالص مخلص لطف تلطیف لطافت خلط الف خلف لفظ خلفا خالق خلق لک‌لک فلک لگد ملکان مجلل تألم ظلم عالمیان سالن لؤلؤ سلسله لهیب سومالی خلع لعاب ملامت بمب مخ لمحه مدت نمد مراکش تمبر مس لمس تمساح مصطفی رمق عمق نمک اُمگا تمکین کامل نمل ملت تملق ممتاز ترکمن سراسیمه شامی آنمی لامع معده طمع شمعدانی ابا ببب پپپ تتت ثثث ججج چچچ ححح خخخ دبد ذبذ ربر زبز ژبژ سسس ششش صصص ضضض ططط ظظظ ععع غغغ ففف ققق ککک گگگ للل ممم ننن ووو ههه ییی ',
      author: 'Amin Abedi', link: 'https://github.com/fontamin',
      about: 'A comprehensive wordlist covering all adjacent Persian letter pairs' },
    { name: 'Arabic', text: TXT_AR,
      author: 'from Wikipedia', link: 'https://wikipedia.com',
      about: 'Arabic specimen: three paragraphs about Damascus steel, taken from Wikipedia. Contains many diacritics (tashkeel), good for checking mark positioning.' },
    { name: 'Quran', text: TXT_QURAN,
      author: 'Muhammad the prophet',
      about: 'Quranic text: Surah Al-Fajr with full diacritics and verse-end markers, to check stacked marks and ayah numbers.' },
    { name: 'English', text: TXT_EN,
      author: 'from Wikipedia', link: 'https://wikipedia.com',
      about: 'English specimen about the origins of typography (from Wikipedia), followed by digits and common symbols.' },
    {
      author: 'Saleh Souzanchi', link: 'https://github.com/zoghal',
      name: 'Layout Fa', html: LAYOUT_FA,
      about: 'Persian layout test: heading (60px), subhead (24px) and three-column body text (16px) to check line height, spacing and rhythm in running text. Source text: an article about the difference between calligraphy and typesetting.'
    },
    {
      author: 'Pablo Impallari', link: 'https://github.com/impallari',
      name: 'Layout En', html: LAYOUT_EN,
      about: 'English layout test: heading, subhead, three-column body text and a numbered list. Based on the Impallari Font Testing Project (Pablo Impallari), using a news article as sample text.'
    },
    {
      author: 'AmirMahdi Moslehi', link: 'http://www.amirmahdimoslehi.com/',
      name: 'ZWNJ', text: ZWNJ_test,
      about: 'a set of Persian words that require a zero-width non-joiner (ZWNJ) between the parts, to check proper shaping and joining behavior.',
    },
    {
      author: 'Amin Abedi', link: 'https://github.com/fontamin',
      name: 'Numbers-ar/fa',
      about: 'all possible combination of Arabic/Farsi numbers with themselves, Arabic Decimal Separator and Arabic Thousands Separator',
      html: `<p class="sizelabel">Farsi Numbers:</p>
<p contenteditable="true" style="text-align: start;">
۰۱۰۲۰۳۰۴۰۵۰۶۰۷۰۸۰۹۰۰<br>
۱۰۱۲۱۳۱۴۱۵۱۶۱۷۱۸۱۹۱۱<br>
۲۰۲۱۲۳۲۴۲۵۲۶۲۷۲۸۲۹۲۲<br>
۳۰۳۱۳۲۳۴۳۵۳۶۳۷۳۸۳۹۳۳<br>
۴۰۴۱۴۲۴۳۴۵۴۶۴۷۴۸۴۹۴۴<br>
۵۰۵۱۵۲۵۳۵۴۵۶۵۷۵۸۵۹۵۵<br>
۶۰۶۱۶۲۶۳۶۴۶۵۶۷۶۸۶۹۶۶<br>
۷۰۷۱۷۲۷۳۷۴۷۵۷۶۷۸۷۹۷۷<br>
۸۰۸۱۸۲۸۳۸۴۸۵۸۶۸۷۸۹۸۸<br>
۹۰۹۱۹۲۹۳۹۴۹۵۹۶۹۷۹۸۹۹<br>
</p>
<p class="sizelabel">Farsi Numbers with Arabic Decimal seperator:</p>
<p contenteditable="true" style="text-align: start;">
۰٫۱٫۰٫۲٫۰٫۳٫۰٫۴٫۰٫۵٫۰٫۶٫۰٫۷٫۰٫۸٫۰٫۹٫۰٫۰<br>
۱٫۰٫۱٫۲٫۱٫۳٫۱٫۴٫۱٫۵٫۱٫۶٫۱٫۷٫۱٫۸٫۱٫۹٫۱٫۱<br>
۲٫۰٫۲٫۱٫۲٫۳٫۲٫۴٫۲٫۵٫۲٫۶٫۲٫۷٫۲٫۸٫۲٫۹٫۲٫۲<br>
۳٫۰٫۳٫۱٫۳٫۲٫۳٫۴٫۳٫۵٫۳٫۶٫۳٫۷٫۳٫۸٫۳٫۹٫۳٫۳<br>
۴٫۰٫۴٫۱٫۴٫۲٫۴٫۳٫۴٫۵٫۴٫۶٫۴٫۷٫۴٫۸٫۴٫۹٫۴٫۴<br>
۵٫۰٫۵٫۱٫۵٫۲٫۵٫۳٫۵٫۴٫۵٫۶٫۵٫۷٫۵٫۸٫۵٫۹٫۵٫۵<br>
۶٫۰٫۶٫۱٫۶٫۲٫۶٫۳٫۶٫۴٫۶٫۵٫۶٫۷٫۶٫۸٫۶٫۹٫۶٫۶<br>
۷٫۰٫۷٫۱٫۷٫۲٫۷٫۳٫۷٫۴٫۷٫۵٫۷٫۶٫۷٫۸٫۷٫۹٫۷٫۷<br>
۸٫۰٫۸٫۱٫۸٫۲٫۸٫۳٫۸٫۴٫۸٫۵٫۸٫۶٫۸٫۷٫۸٫۹٫۸٫۸<br>
۹٫۰٫۹٫۱٫۹٫۲٫۹٫۳٫۹٫۴٫۹٫۵٫۹٫۶٫۹٫۷٫۹٫۸٫۹٫۹<br>
<p class="sizelabel">Farsi Numbers with Arabic Thousands Separator:</p>
<p contenteditable="true" style="text-align: start;">
۰٬۱٬۰٬۲٬۰٬۳٬۰٬۴٬۰٬۵٬۰٬۶٬۰٬۷٬۰٬۸٬۰٬۹٬۰٬۰<br>
۱٬۰٬۱٬۲٬۱٬۳٬۱٬۴٬۱٬۵٬۱٬۶٬۱٬۷٬۱٬۸٬۱٬۹٬۱٬۱<br>
۲٬۰٬۲٬۱٬۲٬۳٬۲٬۴٬۲٬۵٬۲٬۶٬۲٬۷٬۲٬۸٬۲٬۹٬۲٬۲<br>
۳٬۰٬۳٬۱٬۳٬۲٬۳٬۴٬۳٬۵٬۳٬۶٬۳٬۷٬۳٬۸٬۳٬۹٬۳٬۳<br>
۴٬۰٬۴٬۱٬۴٬۲٬۴٬۳٬۴٬۵٬۴٬۶٬۴٬۷٬۴٬۸٬۴٬۹٬۴٬۴<br>
۵٬۰٬۵٬۱٬۵٬۲٬۵٬۳٬۵٬۴٬۵٬۶٬۵٬۷٬۵٬۸٬۵٬۹٬۵٬۵<br>
۶٬۰٬۶٬۱٬۶٬۲٬۶٬۳٬۶٬۴٬۶٬۵٬۶٬۷٬۶٬۸٬۶٬۹٬۶٬۶<br>
۷٬۰٬۷٬۱٬۷٬۲٬۷٬۳٬۷٬۴٬۷٬۵٬۷٬۶٬۷٬۸٬۷٬۹٬۷٬۷<br>
۸٬۰٬۸٬۱٬۸٬۲٬۸٬۳٬۸٬۴٬۸٬۵٬۸٬۶٬۸٬۷٬۸٬۹٬۸٬۸<br>
۹٬۰٬۹٬۱٬۹٬۲٬۹٬۳٬۹٬۴٬۹٬۵٬۹٬۶٬۹٬۷٬۹٬۸٬۹٬۹<br>
</p>
<p class="sizelabel">Arabic Numbers:</p>
<p contenteditable="true" style="text-align: start;">
٠١٠٢٠٣٠٤٠٥٠٦٠٧٠٨٠٩٠٠<br>
١٠١٢١٣١٤١٥١٦١٧١٨١٩١١<br>
٢٠٢١٢٣٢٤٢٥٢٦٢٧٢٨٢٩٢٢<br>
٣٠٣١٣٢٣٤٣٥٣٦٣٧٣٨٣٩٣٣<br>
٤٠٤١٤٢٤٣٤٥٤٦٤٧٤٨٤٩٤٤<br>
٥٠٥١٥٢٥٣٥٤٥٦٥٧٥٨٥٩٥٥<br>
٦٠٦١٦٢٦٣٦٤٦٥٦٧٦٨٦٩٦٦<br>
٧٠٧١٧٢٧٣٧٤٧٥٧٦٧٨٧٩٧٧<br>
٨٠٨١٨٢٨٣٨٤٨٥٨٦٨٧٨٩٨٨<br>
٩٠٩١٩٢٩٣٩٤٩٥٩٦٩٧٩٨٩٩<br>
</p>
<p class="sizelabel">Arabic Numbers with Arabic Decimal seperator:</p>
<p contenteditable="true" style="text-align: start;">
٠٫١٫٠٫٢٫٠٫٣٫٠٫٤٫٠٫٥٫٠٫٦٫٠٫٧٫٠٫٨٫٠٫٩٫٠٫٠<br>
١٫٠٫١٫٢٫١٫٣٫١٫٤٫١٫٥٫١٫٦٫١٫٧٫١٫٨٫١٫٩٫١٫١<br>
٢٫٠٫٢٫١٫٢٫٣٫٢٫٤٫٢٫٥٫٢٫٦٫٢٫٧٫٢٫٨٫٢٫٩٫٢٫٢<br>
٣٫٠٫٣٫١٫٣٫٢٫٣٫٤٫٣٫٥٫٣٫٦٫٣٫٧٫٣٫٨٫٣٫٩٫٣٫٣<br>
٤٫٠٫٤٫١٫٤٫٢٫٤٫٣٫٤٫٥٫٤٫٦٫٤٫٧٫٤٫٨٫٤٫٩٫٤٫٤<br>
٥٫٠٫٥٫١٫٥٫٢٫٥٫٣٫٥٫٤٫٥٫٦٫٥٫٧٫٥٫٨٫٥٫٩٫٥٫٥<br>
٦٫٠٫٦٫١٫٦٫٢٫٦٫٣٫٦٫٤٫٦٫٥٫٦٫٧٫٦٫٨٫٦٫٩٫٦٫٦<br>
٧٫٠٫٧٫١٫٧٫٢٫٧٫٣٫٧٫٤٫٧٫٥٫٧٫٦٫٧٫٨٫٧٫٩٫٧٫٧<br>
٨٫٠٫٨٫١٫٨٫٢٫٨٫٣٫٨٫٤٫٨٫٥٫٨٫٦٫٨٫٧٫٨٫٩٫٨٫٨<br>
٩٫٠٫٩٫١٫٩٫٢٫٩٫٣٫٩٫٤٫٩٫٥٫٩٫٦٫٩٫٧٫٩٫٨٫٩٫٩<br>
</p>
<p class="sizelabel">Arabic Numbers with Arabic Thousands Separator:</p>
<p contenteditable="true" style="text-align: start;">
٠٬١٬٠٬٢٬٠٬٣٬٠٬٤٬٠٬٥٬٠٬٦٬٠٬٧٬٠٬٨٬٠٬٩٬٠٬٠<br>
١٬٠٬١٬٢٬١٬٣٬١٬٤٬١٬٥٬١٬٦٬١٬٧٬١٬٨٬١٬٩٬١٬١<br>
٢٬٠٬٢٬١٬٢٬٣٬٢٬٤٬٢٬٥٬٢٬٦٬٢٬٧٬٢٬٨٬٢٬٩٬٢٬٢<br>
٣٬٠٬٣٬١٬٣٬٢٬٣٬٤٬٣٬٥٬٣٬٦٬٣٬٧٬٣٬٨٬٣٬٩٬٣٬٣<br>
٤٬٠٬٤٬١٬٤٬٢٬٤٬٣٬٤٬٥٬٤٬٦٬٤٬٧٬٤٬٨٬٤٬٩٬٤٬٤<br>
٥٬٠٬٥٬١٬٥٬٢٬٥٬٣٬٥٬٤٬٥٬٦٬٥٬٧٬٥٬٨٬٥٬٩٬٥٬٥<br>
٦٬٠٬٦٬١٬٦٬٢٬٦٬٣٬٦٬٤٬٦٬٥٬٦٬٧٬٦٬٨٬٦٬٩٬٦٬٦<br>
٧٬٠٬٧٬١٬٧٬٢٬٧٬٣٬٧٬٤٬٧٬٥٬٧٬٦٬٧٬٨٬٧٬٩٬٧٬٧<br>
٨٬٠٬٨٬١٬٨٬٢٬٨٬٣٬٨٬٤٬٨٬٥٬٨٬٦٬٨٬٧٬٨٬٩٬٨٬٨<br>
٩٬٠٬٩٬١٬٩٬٢٬٩٬٣٬٩٬٤٬٩٬٥٬٩٬٦٬٩٬٧٬٩٬٨٬٩٬٩<br>
</p>`
},
{
  author: 'Pablo Impallari', link: 'https://github.com/impallari',
  name: 'Numbers-en',
  about: 'all possible combination of Latin numbers with themselves, space, dot, comma and colon',
  html: `<p contenteditable="true" dir="ltr" style="text-align: start;">
010203040506070809000<br>
111213141516171819101<br>
212223242526272829202<br>
313233343536373839303<br>
414243444546474849404<br>
515253545556575859505<br>
616263646566676869606<br>
717273747576777879707<br>
818283848586878889808<br>
919293949596979899909
</p>

<p class="sizelabel">Number Number Number:</p>
<p contenteditable="true" dir="ltr" style="text-align: start;">
000 010 020 030 040 050 060 070 080 090<br>
101 101 121 131 141 151 161 171 181 191<br>
202 212 222 232 242 252 262 272 282 292<br>
303 313 323 333 343 353 363 373 383 393<br>
404 414 424 434 444 454 464 474 484 494<br>
505 515 525 535 545 555 565 575 585 595<br>
606 616 626 636 646 656 666 676 686 696<br>
707 717 727 737 747 757 767 777 787 797<br>
808 818 828 838 848 858 868 878 888 898<br>
909 919 929 939 949 959 969 979 989 999
</p>

<p class="sizelabel">Number Dot Number:</p>
<p contenteditable="true" dir="ltr" style="text-align: start;">
0.00 0.10 0.20 0.30 0.40 0.50 0.60 0.70 0.80 0.90<br>
1.01 1.11 1.21 1.31 1.41 1.51 1.61 1.71 1.81 1.91<br>
2.02 2.12 2.22 2.32 2.42 2.52 2.62 2.72 2.82 2.92<br>
3.03 3.13 3.23 3.33 3.43 3.53 3.63 3.73 3.83 3.93<br>
4.04 4.14 4.24 4.34 4.44 4.54 4.64 4.74 4.84 4.94<br>
5.05 5.15 5.25 5.35 5.45 5.55 5.65 5.75 5.85 5.95<br>
6.06 6.16 6.26 6.36 6.46 6.56 6.66 6.76 6.86 6.96<br>
7.07 7.17 7.27 7.37 7.47 7.57 7.67 7.77 7.87 7.97<br>
8.08 8.18 8.28 8.38 8.48 8.58 8.68 8.78 8.88 8.98<br>
9.09 9.19 9.29 9.39 9.49 9.59 9.69 9.79 9.89 9.99
</p>

<p class="sizelabel">Number Comma Number:</p>
<p contenteditable="true" dir="ltr" style="text-align: start;">
0,00 0,10 0,20 0,30 0,40 0,50 0,60 0,70 0,80 0,90<br>
1,01 1,11 1,21 1,31 1,41 1,51 1,61 1,71 1,81 1,91<br>
2,02 2,12 2,22 2,32 2,42 2,52 2,62 2,72 2,82 2,92<br>
3,03 3,13 3,23 3,33 3,43 3,53 3,63 3,73 3,83 3,93<br>
4,04 4,14 4,24 4,34 4,44 4,54 4.64 4,74 4,84 4,94<br>
5,05 5,15 5,25 5,35 5,45 5,55 5,65 5,75 5,85 5,95<br>
6,06 6,16 6,26 6,36 6,46 6,56 6,66 6,76 6,86 6,96<br>
7,07 7,17 7.27 7,37 7,47 7,57 7,67 7,77 7,87 7,97<br>
8,08 8,18 8,28 8,38 8,48 8,58 8,68 8,78 8,88 8,98<br>
9,09 9,19 9,29 9,39 9,49 9,59 9,69 9,79 9,89 9,99
</p>

<p class="sizelabel">Number Colon Number:</p>
<p contenteditable="true" dir="ltr" style="text-align: start;">
0:00 0:10 0:20 0:30 0:40 0:50 0:60 0:70 0:80 0:90<br>
1:01 1:11 1:21 1:31 1:41 1:51 1:61 1:71 1:81 1:91<br>
2:02 2:12 2:22 2:32 2:42 2:52 2:62 2:72 2:82 2:92<br>
3:03 3:13 3:23 3:33 3:43 3:53 3:63 3:73 3:83 3:93<br>
4:04 4:14 4:24 4:34 4:44 4:54 4:64 4:74 4:84 4:94<br>
5:05 5:15 5:25 5:35 5:45 5:55 5:65 5:75 5:85 5:95<br>
6:06 6:16 6:26 6:36 6:46 6:56 6:66 6:76 6:86 6:96<br>
7:07 7:17 7:27 7:37 7:47 7:57 7:67 7:77 7:87 7:97<br>
8:08 8:18 8:28 8:38 8:48 8:58 8:68 8:78 8:88 8:98<br>
9:09 9:19 9:29 9:39 9:49 9:59 9:69 9:79 9:89 9:99
</p>`
},
{
  author: 'Amin Abedi', link: 'https://github.com/fontamin',
  name: 'Arabic Marks',
  about: 'all possible combination of Latin numbers with themselves, space, dot, comma and colon',
  html: `<p contenteditable="true" style="text-align: center, line-height: 1.5;">
ءَءُءِءّءًءٌءٍءؕءْءٓءٕءٖءٗءٚءٰ<br>
اَ اُ اِ اّ اً اٌ اٍ<br>
ﺎَ ﺎُ ﺎِ ﺎّ ﺎً ﺎٌ ﺎٍ<br>
أَ أُ أِ أّ أً أٌ أٍ<br>
ﺄَ ﺄُ ﺄِ ﺄّ ﺄً ﺄٌ ﺄٍ<br>
إَ إُ إِ إّ إً إٌ إٍ<br>
ﺈَ ﺈُ ﺈِ ﺈّ ﺈً ﺈٌ ﺈٍ<br>
بَ بُ بِ بّ بً بٌ بٍ<br>
بَبَبَ بُبُبُ بِبِبِ بّبّبّ بًبًبً بٌبٌبٌ بٍبٍبٍ<br>
پَ پُ پِ پّ پً پٌ پٍ<br>
پَپَپَ پُپُپُ پِپِپِ پّپّپّ پًپًپً پٌپٌپٌ پٍپٍپٍ<br>
تَ تُ تِ تّ تً تٌ تٍ<br>
تَتَتَ تُتُتُ تِتِتِ تّتّتّ تًتًتً تٌتٌتٌ تٍتٍتٍ<br>
ثَ ثُ ثِ ثّ ثً ثٌ ثٍ<br>
ثَثَثَ ثُثُثُ ثِثِثِ ثّثّثّ ثًثًثً ثٌثٌثٌ ثٍثٍثٍ<br>
جَ جُ جِ جّ جً جٌ جٍ<br>
جَجَجَ جُجُجُ جِجِجِ جّجّجّ جًجًجً جٌجٌجٌ جٍجٍجٍ<br>
چَ چُ چِ چّ چً چٌ چٍ<br>
چَچَچَ چُچُچُ چِچِچِ چّچّچّ چًچًچً چٌچٌچٌ چٍچٍچٍ<br>
 حَ حُ حِ حّ حً حٌ حٍ<br>
حَحَحَ حُحُحُ حِحِحِ حّحّحّ حًحًحً حٌحٌحٌ حٍحٍحٍ<br>
خَ خُ خِ خّ خً خٌ خٍ<br>
خَخَخَ خُخُخُ خِخِخِ خّخّخّ خًخًخً خٌخٌخٌ خٍخٍخٍ<br>
دَﺪَ دُﺪُ دِﺪِ دّﺪّ دًﺪً دٌﺪٌ دٍﺪٍ<br>
ذَﺬَ ذُﺬُ ذِﺬِ ذّﺬّ ذًﺬً ذٌﺬٌ ذٍﺬٍ<br>
رَﺮَ رُﺮُ رِﺮِ رّﺮّ رًﺮً رٌﺮٌ رٍﺮٍ<br>
زَﺰَ زُﺰُ زِﺰِ زّﺰّ زًﺰً زٌﺰٌ زٍﺰٍ<br>
ژَﮋَ ژُﮋُ ژِﮋِ ژّﮋّ ژًﮋً ژٌﮋٌ ژٍﮋٍ <br>
سَ سُ سِ سّ سً سٌ سٍ<br>
سَسَسَ سُسُسُ سِسِسِ سّسّسّ سًسًسً سٌسٌسٌ سٍسٍسٍ<br>
شَ شُ شِ شّ شً شٌ شٍ<br>
شَشَشَ شُشُشُ شِشِشِ شّشّشّ شًشًشً شٌشٌشٌ شٍشٍشٍ<br>
صَ صُ صِ صّ صً صٌ صٍ<br>
صَصَصَ صُصُصُ صِصِصِ صّصّصّ صًصًصً صٌصٌصٌ صٍصٍصٍ<br>
ضَ ضُ ضِ ضّ ضً ضٌ ضٍ<br>
ضَضَضَ ضُضُضُ ضِضِضِ ضّضّضّ ضًضًضً ضٌضٌضٌ ضٍضٍضٍ<br>
طَ طُ طِ طّ طً طٌ طٍ<br>
طَطَطَ طُطُطُ طِطِطِ طّطّطّ طًطًطً طٌطٌطٌ طٍطٍطٍ<br>
ظَ ظُ ظِ ظّ ظً ظٌ ظٍ<br>
ظَظَظَ ظُظُظُ ظِظِظِ ظّظّظّ ظًظًظً ظٌظٌظٌ ظٍظٍظٍ<br>
عَ عُ عِ عّ عً عٌ عٍ<br>
عَعَعَ عُعُعُ عِعِعِ عّعّعّ عًعًعً عٌعٌعٌ عٍعٍعٍ<br>
غَ غُ غِ غّ غً غٌ غٍ<br>
غَغَغَ غُغُغُ غِغِغِ غّغّغّ غًغًغً غٌغٌغٌ غٍغٍغٍ<br>
فَ فُ فِ فّ فً فٌ فٍ<br>
فَفَفَ فُفُفُ فِفِفِ فّفّفّ فًفًفً فٌفٌفٌ فٍفٍفٍ<br>
قَ قُ قِ قّ قً قٌ قٍ<br>
قَقَقَ قُقُقُ قِقِقِ قّقّقّ قًقًقً قٌقٌقٌ قٍقٍقٍ<br>
كَ كُ كِ كّ كً كٌ كٍ<br>
كَكَكَ كُكُكُ كِكِكِ كّكّكّ كًكًكً كٌكٌكٌ كٍكٍكٍ<br>
کَ کُ کِ کّ کً کٌ کٍ<br>
کَکَکَ کُکُکُ کِکِکِ کّکّکّ کًکًکً کٌکٌکٌ کٍکٍکٍ<br>
گَ گُ گِ گّ گً گٌ گٍ<br>
گَگَگَ گُگُگُ گِگِگِ گّگّگّ گًگًگً گٌگٌگٌ گٍگٍگٍ<br>
لِ لُ لِ لّ لً لٌ لٍ<br>
لَلَلَ لُلُلُ لِلِلِ لّلّلّ لًلًلً لٌلٌلٌ لٍلٍلٍ<br>
مَ مُ مِ مّ مً مٌ مٍ<br>
مَمَمَ مُمُمُ مِمِمِ مّمّمّ مًمًمً مٌمٌمٌ مٍمٍمٍ<br>
نَ نُ نِ نّ نً نٌ نٍ<br>
نَنَنَ نُنُنُ نِنِنِ نّنّنّ نًنًنً نٌنٌنٌ نٍنٍنٍ<br>
وَﻮَ وُﻮُ وِﻮِ وّﻮّ وًﻮً وٌﻮٌ وٍﻮٍ<br>
ؤَﺆَ ؤُﺆُ ؤِﺆِ ؤّﺆّ ؤًﺆً ؤٌﺆٌ ؤٍﺆٍ<br>
هَ هُ هِ هّ هً هٌ هٍ<br>
هَهَهَ هُهُهُ هِهِهِ هّهّهّ هًهًهً هٌهٌهٌ هٍهٍهٍ<br>
ةَﺔَ ةُﺔُ ةِﺔِ ةّﺔّ ةًﺔً ةٌﺔٌ ةٍﺔٍ<br>
يَ يُ يِ يّ يً يٌ يٍ<br>
يَيَيَ يُيُيُ يِيِيِ يّيّيّ يًيًيً يٌيٌيٌ يٍيٍيٍ<br>
ئَ ئُ ئِ ئّ ئً ئٌ ئٍ<br>
ئَئَئَ ئُئُئُ ئِئِئِ ئّئّئّ ئًئًئً ئٌئٌئٌ ئٍئٍئٍ <br>
</p>`
},
{
  author: 'Saleh Souzanchi', link: 'https://github.com/zoghal',
  name: 'Companionship',
  about: 'set of Arabic and Latin letters to see how they look together in multi-script fonts',
  html: `<p contenteditable="true" dir="rtl" style="text-align: center, line-height: 1.5;">
فونتfont<br>
ااااااااااااHHHHHHآاآاآاآاآاآاIIIII<br>
٠0١1٢2٣3٤4٥5٦6٧7٨8٩9<br>
للللللللWظطWککگکMnMOگکگ<br>
٠0١1٢2٣3۴4۵5۶6٧7٨8٩9<br>
کرجgggننننyyyyجج<br>
</p>`
},
{
  author: 'Saleh Souzanchi', link: 'https://github.com/zoghal',
  name: 'simple kerning-ar',
  about: 'set of Arabic letter combinations to check spacing/kerning',
  text: ` آأآ - آإآ - آاآ - آؤآ - آوآ - آئآ - آیآ - آبآ - آتآ - آثآ - آ‍آ - آپآ - آجآ - آحآ - آخآ - آچآ - آدآ - آذآ - آرآ - آزآ - آژآ - آسآ - آشآ - آصآ - آضآ - آطآ - آ‬آ - آظآ - آعآ - آغآ - آفآ - آقآ - آكآ - آکآ - آگآ - آمآ - آنآ - أآأ - أإأ - أاأ - أؤأ - أوأ - أئأ - أیأ - أبأ - أتأ - أثأ - أ‍أ - أپأ - أجأ - أحأ - أخأ - أچأ - أدأ - أذأ - أرأ - أزأ - أژأ - أسأ - أشأ - أصأ - أضأ - أطأ - أ‬أ - أظأ - أعأ - أغأ - أفأ - أقأ - أكأ - أکأ - أگأ - أمأ - أنأ - إآإ - إأإ - إاإ - إؤإ - إوإ - إئإ - إیإ - إبإ - إتإ - إثإ - إ‍إ - إپإ - إجإ - إحإ - إخإ - إچإ - إدإ - إذإ - إرإ - إزإ - إژإ - إسإ - إشإ - إصإ - إضإ - إطإ - إ‬إ - إظإ - إعإ - إغإ - إفإ - إقإ - إكإ - إکإ - إگإ - إمإ - إنإ - اآا - اأا - اإا - ااا - اؤا - اوا - ائا - ایا - ابا - اتا - اثا - ا‍ا - اپا - اجا - احا - اخا - اچا - ادا - اذا - ارا - ازا - اژا - اسا - اشا - اصا - اضا - اطا - ا‬ا - اظا - اعا - اغا - افا - اقا - اكا - اکا - اگا - اما - انا - ؤآؤ - ؤأؤ - ؤإؤ - ؤاؤ - ؤؤؤ - ؤوؤ - ؤئؤ - ؤیؤ - ؤبؤ - ؤتؤ - ؤثؤ - ؤ‍ؤ - ؤپؤ - ؤجؤ - ؤحؤ - ؤخؤ - ؤچؤ - ؤدؤ - ؤذؤ - ؤرؤ - ؤزؤ - ؤژؤ - ؤسؤ - ؤشؤ - ؤصؤ - ؤضؤ - ؤطؤ - ؤ‬ؤ - ؤظؤ - ؤعؤ - ؤغؤ - ؤفؤ - ؤقؤ - ؤكؤ - ؤکؤ - ؤگؤ - ؤمؤ - ؤنؤ - وآو - وأو - وإو - واو - وؤو - ووو - وئو - ویو - وبو - وتو - وثو - و‍و - وپو - وجو - وحو - وخو - وچو - ودو - وذو - ورو - وزو - وژو - وسو - وشو - وصو - وضو - وطو - و‬و - وظو - وعو - وغو - وفو - وقو - وكو - وکو - وگو - ومو - ونو - ئآئ - ئأئ - ئإئ - ئائ - ئؤئ - ئوئ - ئدئ - ئذئ - ئرئ - ئزئ - ئژئ - یآی - یأی - یإی - یای - یؤی - یوی - یدی - یذی - یری - یزی - یژی - بآب - بأب - بإب - باب - بؤب - بوب - بدب - بذب - برب - بزب - بژب - تآت - تأت - تإت - تات - تؤت - توت - تدت - تذت - ترت - تزت - تژت - ثآث - ثأث - ثإث - ثاث - ثؤث - ثوث - ثدث - ثذث - ثرث - ثزث - ثژث - پآپ - پأپ - پإپ - پاپ - پؤپ - پوپ - پدپ - پذپ - پرپ - پزپ - پژپ - جآج - جأج - جإج - جاج - جؤج - جوج - جدج - جذج - جرج - جزج - جژج - حآح - حأح - حإح - حاح - حؤح - حوح - حدح - حذح - حرح - حزح - حژح - خآخ - خأخ - خإخ - خاخ - خؤخ - خوخ - خدخ - خذخ - خرخ - خزخ - خژخ - چآچ - چأچ - چإچ - چاچ - چؤچ - چوچ - چدچ - چذچ - چرچ - چزچ - چژچ - دآد - دأد - دإد - داد - دؤد - دود - دئد - دید - دبد - دتد - دثد - د‍د - دپد - دجد - دحد - دخد - دچد - ددد - دذد - درد - دزد - دژد - دسد - دشد - دصد - دضد - دطد - د‬د - دظد - دعد - دغد - دفد - دقد - دكد - دکد - دگد - دمد - دند - ذءذ - ذآذ - ذأذ - ذإذ - ذاذ - ذؤذ - ذوذ - ذئذ - ذیذ - ذبذ - ذتذ - ذثذ - ذ‍ذ - ذپذ - ذجذ - ذحذ - ذخذ - ذچذ - ذدذ - ذذذ - ذرذ - ذزذ - ذژذ - ذسذ - ذشذ - ذصذ - ذضذ - ذطذ - ذ‬ذ - ذظذ - ذعذ - ذغذ - ذفذ - ذقذ - ذكذ - ذکذ - ذگذ - ذمذ - ذنذ - رءر - رآر - رأر - رإر - رار - رؤر - رور - رئر - ریر - ربر - رتر - رثر - ر‍ر - رپر - رجر - رحر - رخر - رچر - ردر - رذر - ررر - رزر - رژر - رسر - رشر - رصر - رضر - رطر - ر‬ر - رظر - رعر - رغر - رفر - رقر - ركر - رکر - رگر - رمر - رنر - زءز - زآز - زأز - زإز - زاز - زؤز - زوز - زئز - زیز - زبز - زتز - زثز - ز‍ز - زپز - زجز - زحز - زخز - زچز - زدز - زذز - زرز - ززز - زژز - زسز - زشز - زصز - زضز - زطز - ز‬ز - زظز - زعز - زغز - زفز - زقز - زكز - زکز - زگز - زمز - زنز - ژءژ - ژآژ - ژأژ - ژإژ - ژاژ - ژؤژ - ژوژ - ژئژ - ژیژ - ژبژ - ژتژ - ژثژ - ژ‍ژ - ژپژ - ژجژ - ژحژ - ژخژ - ژچژ - ژدژ - ژذژ - ژرژ - ژزژ - ژژژ - ژسژ - ژشژ - ژصژ - ژضژ - ژطژ - ژ‬ژ - ژظژ - ژعژ - ژغژ - ژفژ - ژقژ - ژكژ - ژکژ - ژگژ - ژمژ - ژنژ - سآس - سأس - سإس - ساس - سؤس - سوس - سدس - سذس - سرس - سزس - سژس - شآش - شأش - شإش - شاش - شؤش - شوش - شدش - شذش - شرش - شزش - شژش - صآص - صأص - صإص - صاص - صؤص - صوص - صدص - صذص - صرص - صزص - صژص - ضآض - ضأض - ضإض - ضاض - ضؤض - ضوض - ضدض - ضذض - ضرض - ضزض - ضژض - طآط - طأط - طإط - طاط - طؤط - طوط - طدط - طذط - طرط - طزط - طژط - ظآظ - ظأظ - ظإظ - ظاظ - ظؤظ - ظوظ - ظدظ - ظذظ - ظرظ - ظزظ - ظژظ - عآع - عأع - عإع - عاع - عؤع - عوع - عدع - عذع - عرع - عزع - عژع - غآغ - غأغ - غإغ - غاغ - غؤغ - غوغ - غدغ - غذغ - غرغ - غزغ - غژغ - فآف - فأف - فإف - فاف - فؤف - فوف - فدف - فذف - فرف - فزف - فژف - قآق - قأق - قإق - قاق - قؤق - قوق - قدق - قذق - قرق - قزق - قژق - كآك - كأك - كإك - كاك - كؤك - كوك - كدك - كذك - كرك - كزك - كژك - کآک - کأک - کإک - کاک - کؤک - کوک - کدک - کذک - کرک - کزک - کژک - گآگ - گأگ - گإگ - گاگ - گؤگ - گوگ - گدگ - گذگ - گرگ - گزگ - گژگ - مآم - مأم - مإم - مام - مؤم - موم - مدم - مذم - مرم - مزم - مژم - نآن - نأن - نإن - نان - نؤن - نون - ندن - نذن - نرن - نزن - نژن
`
},
  ];

  // All tests (built-in + yours) are saved automatically in this browser (localStorage)
  const TEST_KEY = 'fft-tests';
  let tests = [];
  let stored = null;
  try { stored = JSON.parse(localStorage.getItem(TEST_KEY)); } catch (e) {}
  const validTest = t => t && typeof t.name === 'string' &&
    ((typeof t.text === 'string' && t.text.trim()) || (typeof t.html === 'string' && t.html.trim()));
  // "fontamin.com" -> "https://fontamin.com"; anything that isn't http(s) is dropped (no javascript: links)
  const normLink = v => {
    v = typeof v === 'string' ? v.trim() : '';
    if (!v) return '';
    if (!/^[a-z][a-z0-9+.-]*:/i.test(v)) v = 'https://' + v;
    return /^https?:\/\/\S+$/i.test(v) ? v : '';
  };
  const cleanTest = t => {
    const o = { name: t.name };
    if (t.html) o.html = t.html; else o.text = t.text;
    if (typeof t.about === 'string' && t.about.trim()) o.about = t.about.trim();
    if (typeof t.author === 'string' && t.author.trim()) o.author = t.author.trim();
    const l = normLink(t.link); if (l) o.link = l;
    return o;
  };
  const saveTests = () => {
    try { localStorage.setItem(TEST_KEY, JSON.stringify(tests.map(cleanTest))); } catch (e) {}
  };

  if (Array.isArray(stored)) {
    tests = stored.filter(validTest).map(cleanTest);
  } else {
    tests = PRESETS.map(cleanTest);
    saveTests();
  }

  const testListEl = $('#testlist');
  let activeTest = null;
  let wikiInfo = null;     // {title, url} of the article in the Wiki box

  const LAST_KEY = 'fft-lasttest';
  const DEFAULT_TEST = 'Farsi';
  function showTest(t) {
    activeTest = t;
    try { localStorage.setItem(LAST_KEY, t.name); } catch (e) {}
    setWikiMode(false);
    if (t.html) testBox.innerHTML = t.html;
    else showPlain(testBox, t.text);
    renderTests();
    updateAbout();
  }

  // Always alphabetical: Latin names first (A→Z), then Arabic-script names (Arabic/Persian alphabet)
  const RTL_START = /^[^\p{L}\p{N}]*[\u0600-\u06FF\u0750-\u077F\uFB50-\uFDFF\uFE70-\uFEFF]/u;
  const sortTests = () => {
    const grp = n => RTL_START.test(n) ? 1 : 0;
    tests.sort((a, b) => {
      const ga = grp(a.name), gb = grp(b.name);
      if (ga !== gb) return ga - gb;
      return a.name.localeCompare(b.name, ga ? 'fa' : 'en', { sensitivity: 'base', numeric: true });
    });
  };

  function renderTests() {
    sortTests();
    testListEl.textContent = '';
    if (!tests.length) hint(testListEl, 'No tests — press + or ↺');
    tests.forEach(t => {
      const chip = document.createElement('span');
      chip.className = 'chip' + (t === activeTest ? ' active' : '');
      const nb = document.createElement('button');
      nb.type = 'button'; nb.className = 'chipname';
      nb.textContent = shorten(t.name, CHIP_MAX); nb.title = t.name;
      nb.addEventListener('click', () => showTest(t));
      const xb = document.createElement('button');
      xb.type = 'button'; xb.className = 'chipx'; xb.textContent = '×'; xb.title = 'Remove';
      xb.addEventListener('click', () => {
        tests.splice(tests.indexOf(t), 1);
        if (activeTest === t) { activeTest = null; updateAbout(); }
        saveTests(); renderTests();
      });
      chip.append(nb, xb);
      testListEl.appendChild(chip);
    });
  }

  /* --- export / import (share tests as a .json file) --- */
  const dangerZone = $('#dangerzone');
  const mkBtn = (txt, title, parent) => {
    const b = document.createElement('button');
    b.type = 'button'; b.className = 'btn'; b.textContent = txt; b.title = title;
    (parent || $('#testgroup')).insertBefore(b, parent ? null : dangerZone);
    return b;
  };
  const importBtn  = mkBtn('📂', 'Import a backup file (tests and features are added, settings are applied)');
  const exportBtn  = mkBtn('⬇', 'Export a backup file: tests, your OpenType features and settings (fft-backup.json)');
  // danger zone (separate, at the end of the row): restore built-in tests, purge local storage
  const restoreBtn = mkBtn('↺', 'Danger zone: add back the built-in tests that are missing', dangerZone);
  const purgeBtn   = mkBtn('🗑', 'Danger zone: purge local storage (delete everything FFT saved in this browser)', dangerZone);
  restoreBtn.classList.add('danger'); purgeBtn.classList.add('danger');

  exportBtn.addEventListener('click', () => {
    // "html" is not exported: shared files only carry plain text (name, text, about)
    const out = tests.filter(t => t.text).map(t => {
      const o = { name: t.name, text: t.text };
      if (t.about) o.about = t.about;
      if (t.author) o.author = t.author;
      if (t.link) o.link = t.link;
      return o;
    });
    const feats = customFeats.map(f => ({ tag: f.tag, on: f.on }));
    const settings = { dark: neg.checked, autoReload: autoOn, wikiLang: wikiLangIn.value.trim().toLowerCase() };
    const data = JSON.stringify({ app: 'FFT', version: 1, settings, tests: out, features: feats }, null, 2);
    const url = URL.createObjectURL(new Blob([data], { type: 'application/json' }));
    const a = document.createElement('a');
    a.href = url; a.download = 'fft-backup.json';
    document.body.appendChild(a); a.click(); a.remove();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  });

  restoreBtn.addEventListener('click', () => {
    const missing = PRESETS.filter(p => !tests.some(t => t.name === p.name));
    if (!missing.length) { flash('Nothing missing'); return; }
    tests.unshift(...missing.map(cleanTest));
    saveTests(); renderTests();
    flash(missing.length + ' restored');
  });

  purgeBtn.addEventListener('click', () => {
    if (!confirm('Delete everything FFT saved in this browser (your tests, theme, Wiki language)?\nThe built-in tests will be restored.')) return;
    try { Object.keys(localStorage).filter(k => k.startsWith('fft-')).forEach(k => localStorage.removeItem(k)); } catch (e) {}
    try { indexedDB.deleteDatabase('fft'); } catch (e) {}
    location.reload();
  });

  // Settings from a backup file replace the current ones. Returns how many were applied.
  function applySettings(st) {
    let n = 0;
    if (typeof st.dark === 'boolean') {
      neg.checked = st.dark;
      document.body.classList.toggle('darkmode', st.dark);
      try { localStorage.setItem('fft-dark', st.dark ? '1' : '0'); } catch (e) {}
      n++;
    }
    if (typeof st.autoReload === 'boolean') {
      autoOn = st.autoReload; syncAuto();
      try { localStorage.setItem(AUTO_KEY, autoOn ? '1' : '0'); } catch (e) {}
      n++;
    }
    if (typeof st.wikiLang === 'string' && langOk(st.wikiLang.trim().toLowerCase())) {
      wikiLangIn.value = st.wikiLang.trim().toLowerCase();
      try { localStorage.setItem(WIKI_LANG_KEY, wikiLangIn.value); } catch (e) {}
      renderWikiLangs();
      n++;
    }
    return n;
  }

  // Merge: add new tests, skip duplicates (same name + same text). Only "name", "text", "about", "author" and "link" are read.
  async function importTests(file) {
    let list, feats = [], settings = null;
    try {
      const j = JSON.parse(await file.text());
      if (Array.isArray(j)) list = j;                       // older files: just an array of tests
      else if (j && typeof j === 'object') {
        list = Array.isArray(j.tests) ? j.tests : [];
        feats = Array.isArray(j.features) ? j.features : [];
        if (j.settings && typeof j.settings === 'object') settings = j.settings;
      } else throw new Error('bad shape');
    } catch (e) { flash('Bad file'); return; }
    let added = 0, skipped = 0, fAdded = 0;
    list.filter(t => t && typeof t.name === 'string' && typeof t.text === 'string' && t.text.trim()).forEach(t => {
      const about = typeof t.about === 'string' ? t.about.trim() : '';
      const author = typeof t.author === 'string' ? t.author.trim() : '';
      const link = normLink(t.link);
      const dup = tests.find(c => c.name === t.name && c.text === t.text);
      if (dup) {
        // an existing test only receives what it is missing
        let filled = false;
        if (about && !dup.about)   { dup.about = about;   filled = true; }
        if (author && !dup.author) { dup.author = author; filled = true; }
        if (link && !dup.link)     { dup.link = link;     filled = true; }
        if (filled) added++; else skipped++;
        return;
      }
      tests.push(cleanTest({ name: t.name, text: t.text, about, author, link }));
      added++;
    });
    feats.filter(f => f && tagOk(f.tag)).forEach(f => {
      if (customFeats.some(c => c.tag === f.tag)) return;
      putCustom(f.tag, f.on !== false); fAdded++;
    });
    if (added) saveTests();
    if (fAdded) { buildFeatures(); applyStyles(); }
    const sApplied = settings ? applySettings(settings) : 0;
    renderTests();
    updateAbout();
    flash(added + ' added' + (skipped ? ', ' + skipped + ' skipped' : '') + (fAdded ? ', ' + fAdded + ' features' : '') + (sApplied ? ', settings' : ''));
  }

  const testFileIn = document.createElement('input');
  testFileIn.type = 'file'; testFileIn.accept = '.json,application/json'; testFileIn.multiple = true; testFileIn.hidden = true;
  document.body.appendChild(testFileIn);
  testFileIn.addEventListener('change', async () => {
    const files = [...testFileIn.files];
    testFileIn.value = '';
    for (const f of files) await importTests(f);
  });
  importBtn.addEventListener('click', () => testFileIn.click());

  /* --- "add test" dialog (name + text + about) --- */
  const modal = document.createElement('div');
  modal.id = 'testmodal';
  modal.innerHTML =
    '<div class="tm-card">' +
      '<label for="tmname">Name</label>' +
      '<input id="tmname" type="text" autocomplete="off" maxlength="60">' +
      '<label for="tmtext">Text</label>' +
      '<textarea id="tmtext" dir="auto" spellcheck="false"></textarea>' +
      '<label for="tmabout">About (optional): idea, author, source…</label>' +
      '<textarea id="tmabout" dir="auto" spellcheck="false"></textarea>' +
      '<label for="tmauthor">Author (optional)</label>' +
      '<input id="tmauthor" type="text" dir="auto" autocomplete="off" maxlength="80">' +
      '<label for="tmlink">Link (optional)</label>' +
      '<input id="tmlink" type="text" dir="ltr" autocomplete="off" autocapitalize="off" spellcheck="false" placeholder="https://…">' +
      '<div class="tm-actions">' +
        '<button type="button" class="btn" id="tmcancel">Cancel</button>' +
        '<button type="button" class="btn primary" id="tmsave">Save</button>' +
      '</div>' +
    '</div>';
  document.body.appendChild(modal);
  const tmName = $('#tmname'), tmText = $('#tmtext'), tmAbout = $('#tmabout'), tmAuthor = $('#tmauthor'), tmLink = $('#tmlink');

  const closeModal = () => modal.classList.remove('open');

  function currentText() {
    const raw = testBox.querySelector('.layout') ? testBox.innerText : (boxP(testBox) ? boxP(testBox).innerText : '');
    return raw.replace(/\u00a0/g, ' ').trim();
  }

  function openModal() {
    tmName.value = '';
    tmAbout.value = ''; tmAuthor.value = ''; tmLink.value = '';
    tmText.value = currentText();   // prefilled with the test text on screen; edit or replace it
    tmText.style.fontFamily = target.style.fontFamily || 'inherit';
    modal.classList.add('open');
    tmName.focus();
  }

  function saveModal() {
    const text = tmText.value.replace(/\u00a0/g, ' ').trim();
    if (!text) { tmText.focus(); return; }
    const name = tmName.value.trim() || shorten(text.replace(/\s+/g, ' '), 20);
    if (tmLink.value.trim() && !normLink(tmLink.value)) { flashErr(tmLink); return; }   // only http(s) links
    const t = cleanTest({ name, text, about: tmAbout.value, author: tmAuthor.value, link: tmLink.value });
    tests.push(t);
    saveTests();
    closeModal();
    showTest(t);
    const a = testListEl.querySelector('.active');
    if (a) a.scrollIntoView({ block: 'nearest', inline: 'nearest' });
  }

  $('#testadd').addEventListener('click', openModal);
  $('#tmcancel').addEventListener('click', closeModal);
  $('#tmsave').addEventListener('click', saveModal);
  modal.addEventListener('mousedown', e => { if (e.target === modal) closeModal(); });
  tmName.addEventListener('keydown', e => { if (e.key === 'Enter') { e.preventDefault(); tmText.focus(); } });
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && modal.classList.contains('open')) closeModal();
  });

  /* =================== Info button (i) + popup =================== */
  // Test About text normally; when the Wiki box is on screen, the article link.
  const aboutBtn = document.createElement('button');
  aboutBtn.id = 'aboutbtn'; aboutBtn.type = 'button';
  aboutBtn.textContent = 'i';
  document.body.appendChild(aboutBtn);

  const aboutPop = document.createElement('div');
  aboutPop.id = 'aboutpop';
  document.body.appendChild(aboutPop);

  const wikiMode = () => viewWiki;

  function updateAbout() {
    const wm = wikiMode();
    const has = wm ? !!wikiInfo : !!(activeTest && (activeTest.about || activeTest.author || activeTest.link));
    aboutBtn.classList.toggle('off', !has);
    if (aboutPop.classList.contains('open')) fillAbout();
  }

  function fillAbout() {
    aboutPop.textContent = '';
    aboutPop.classList.remove('empty');
    if (wikiMode()) {
      if (wikiInfo) {
        const b = document.createElement('b');
        b.textContent = wikiInfo.title; b.dir = 'auto';
        const a = document.createElement('a');
        a.href = wikiInfo.url; a.target = '_blank'; a.rel = 'noopener'; a.dir = 'ltr';
        let shown = wikiInfo.url;
        try { shown = decodeURIComponent(wikiInfo.url); } catch (e) {}
        a.textContent = shown;
        aboutPop.append(b, a);
      } else {
        aboutPop.textContent = 'No Wikipedia article loaded yet';
        aboutPop.classList.add('empty');
      }
      return;
    }
    const t = activeTest;
    if (t && (t.about || t.author || t.link)) {
      if (t.about) {
        const d = document.createElement('div');
        d.textContent = t.about;
        aboutPop.appendChild(d);
      }
      if (t.author || t.link) {
        const by = document.createElement('div');
        by.className = 'aboutby'; by.dir = 'auto';
        by.append(t.author ? 'Author: ' : 'Link: ');
        if (t.link) {
          const a = document.createElement('a');
          a.href = t.link; a.target = '_blank'; a.rel = 'noopener';
          a.textContent = t.author || t.link.replace(/^https?:\/\//i, '').replace(/\/$/, '');
          by.appendChild(a);
        } else by.append(t.author);
        aboutPop.appendChild(by);
      }
      return;
    }
    aboutPop.textContent = 'No About for this test';
    aboutPop.classList.add('empty');
  }

  let aboutTimer = 0, touchLike = true;
  const openAbout = () => { clearTimeout(aboutTimer); fillAbout(); aboutPop.classList.add('open'); };
  const closeAbout = () => { clearTimeout(aboutTimer); aboutTimer = setTimeout(() => aboutPop.classList.remove('open'), 150); };

  // mouse: hover (the popup stays open while the mouse is over it, so the link can be clicked)
  [aboutBtn, aboutPop].forEach(el => {
    el.addEventListener('pointerenter', e => { if (e.pointerType === 'mouse') openAbout(); });
    el.addEventListener('pointerleave', e => { if (e.pointerType === 'mouse') closeAbout(); });
  });
  // touch / keyboard: tap toggles
  aboutBtn.addEventListener('pointerdown', e => { touchLike = e.pointerType !== 'mouse'; });
  aboutBtn.addEventListener('click', () => {
    if (!touchLike) return;
    if (aboutPop.classList.contains('open')) aboutPop.classList.remove('open'); else openAbout();
  });
  document.addEventListener('pointerdown', e => {
    if (!aboutBtn.contains(e.target) && !aboutPop.contains(e.target)) aboutPop.classList.remove('open');
  });

  /* =================== Wikipedia (Wiki tab) =================== */
  const WIKI_MAX = 12000;
  const WIKI_LANGS = [['fa', 'فارسی'], ['ar', 'عربی'], ['en', 'English']];
  const WIKI_LANG_KEY = 'fft-wikilang';
  const wikiPool = {};
  const wikiBtn     = $('#wikibtn');
  const wikiLangIn  = $('#wikilang');
  const wikiLangsEl = $('#wikilangs');
  const wikiStatus  = $('#wikistatus');
  const setWikiStatus = s => { wikiStatus.textContent = s || ''; };
  const langOk = l => /^[a-z][a-z-]{1,11}$/.test(l);

  try {
    const l = (localStorage.getItem(WIKI_LANG_KEY) || '').toLowerCase();
    wikiLangIn.value = langOk(l) ? l : 'fa';
  } catch (e) { wikiLangIn.value = 'fa'; }

  function renderWikiLangs() {
    wikiLangsEl.textContent = '';
    const cur = wikiLangIn.value.trim().toLowerCase();
    WIKI_LANGS.forEach(([code, label]) => {
      const chip = document.createElement('span');
      chip.className = 'chip' + (code === cur ? ' active' : '');
      const nb = document.createElement('button');
      nb.type = 'button'; nb.className = 'chipname nox';
      nb.textContent = label; nb.title = code;
      nb.addEventListener('click', () => {
        wikiLangIn.value = code;
        try { localStorage.setItem(WIKI_LANG_KEY, code); } catch (e) {}
        renderWikiLangs();
      });
      chip.appendChild(nb);
      wikiLangsEl.appendChild(chip);
    });
  }
  wikiLangIn.addEventListener('input', () => {
    const l = wikiLangIn.value.trim().toLowerCase();
    if (langOk(l)) { try { localStorage.setItem(WIKI_LANG_KEY, l); } catch (e) {} }
    renderWikiLangs();
  });
  wikiLangIn.addEventListener('keydown', e => { if (e.key === 'Enter') fetchWiki(); });
  renderWikiLangs();

  async function wikiApi(lang, params) {
    const u = new URL(`https://${lang}.wikipedia.org/w/api.php`);
    Object.entries({ format: 'json', origin: '*', ...params }).forEach(([k, v]) => u.searchParams.set(k, v));
    const r = await fetch(u);
    if (!r.ok) throw new Error(r.status);
    return r.json();
  }

  async function wikiLongTitles(lang) {
    if (wikiPool[lang]) return wikiPool[lang];
    try {
      const j = await wikiApi(lang, { action: 'query', list: 'querypage', qppage: 'Longpages', qplimit: 100 });
      const t = ((j.query.querypage || {}).results || []).filter(x => x.ns === 0).map(x => x.title);
      if (t.length) return (wikiPool[lang] = t);
    } catch (e) {}
    return [];
  }

  async function wikiExtract(lang, title) {
    const j = await wikiApi(lang, {
      action: 'query', prop: 'extracts', explaintext: 1, exsectionformat: 'plain',
      redirects: 1, titles: title
    });
    const p = Object.values(j.query.pages)[0];
    return { title: (p && p.title) || title, text: (p && p.extract) || '' };
  }

  async function wikiRandomTitle(lang) {
    const j = await wikiApi(lang, { action: 'query', list: 'random', rnnamespace: 0, rnlimit: 1 });
    return j.query.random[0].title;
  }

  function trimText(t) {
    t = t.replace(/\n{2,}/g, '\n').trim();
    if (t.length <= WIKI_MAX) return t;
    const cut = t.lastIndexOf('\n', WIKI_MAX);
    return t.slice(0, cut > WIKI_MAX / 2 ? cut : WIKI_MAX);
  }

  function showArticle(lang, art) {
    showPlain(wikiBox, trimText(art.text));
    wikiInfo = {
      title: art.title,
      url: `https://${lang}.wikipedia.org/wiki/${encodeURIComponent(art.title.replace(/ /g, '_'))}`
    };
    setWikiMode(true);
    updateAbout();
    const p = boxP(wikiBox);
    if (p) p.scrollIntoView({ block: 'start' });
    setWikiStatus(art.title);
  }

  function flashBtn(cls) {
    wikiBtn.classList.add(cls);
    setTimeout(() => wikiBtn.classList.remove(cls), 1200);
  }

  async function fetchWiki() {
    if (wikiBtn.classList.contains('busy')) return;
    const lang = wikiLangIn.value.trim().toLowerCase();
    if (!langOk(lang)) { flashBtn('err'); setWikiStatus('Invalid language code'); return; }
    wikiBtn.classList.add('busy');
    setWikiStatus('Fetching…');
    try {
      let art = null;
      const pool = await wikiLongTitles(lang);
      for (let i = 0; i < 5 && !(art && art.text.length >= 3000); i++) {
        const title = pool.length ? pool[Math.floor(Math.random() * pool.length)] : await wikiRandomTitle(lang);
        art = await wikiExtract(lang, title);
      }
      if (!art || !art.text) throw new Error('empty');
      showArticle(lang, art);
    } catch (e) {
      flashBtn('err');
      setWikiStatus('Fetch failed (offline or unknown language)');
    }
    wikiBtn.classList.remove('busy');
  }
  wikiBtn.addEventListener('click', fetchWiki);

  /* =================== Copy code =================== */
  function copyText(text) {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text).catch(() => legacyCopy(text));
    } else legacyCopy(text);
  }
  function legacyCopy(text) {
    const el = document.createElement('textarea');
    el.value = text; document.body.appendChild(el); el.select();
    document.execCommand('copy'); el.remove();
  }
  [t1, t2, t3].forEach(el => el.addEventListener('click', () => { copyText(el.textContent); flash(); }));

  /* =================== Tabs: bubbles refresh + one-time auto scroll =================== */
  const section = $('.pc-tab > section');
  function autoScrollSection() {
    const max = section.scrollWidth - section.clientWidth;
    if (max <= 0) return;
    section.scrollTo({ left: max, behavior: 'smooth' });
    setTimeout(() => section.scrollTo({ left: 0, behavior: 'smooth' }), 1000 + max / 2);
  }
  ['tab1', 'tab2', 'tab3', 'tab4', 'tab5', 'tab6'].forEach(id => {
    const tab = document.getElementById(id);
    tab.addEventListener('change', () => {
      section.scrollLeft = 0;
      if (!tab.checked) return;
      // Test tab -> test text, or the article when the Wiki button is on. Other tabs keep whatever is on screen.
      if (id === 'tab6') { viewWiki = wikiOn; syncView(); }
      updateAbout();
      requestAnimationFrame(updateBubbles);
      if (id === 'tab5') requestAnimationFrame(renderList);
      if (id === 'tab6') requestAnimationFrame(renderTests);
      if ((id === 'tab2' || id === 'tab3') && !tab.dataset.scrolled) {
        tab.dataset.scrolled = '1';
        requestAnimationFrame(autoScrollSection);
      }
    });
  });
  window.addEventListener('resize', updateBubbles);

  /* Hover on a tab title acts like a click (mouse devices only) */
  if (window.matchMedia('(hover: hover)').matches) {
    document.querySelectorAll('.pc-tab nav label').forEach(lb => {
      lb.addEventListener('mouseenter', () => {
        const tab = document.getElementById(lb.htmlFor);
        if (tab && !tab.checked) tab.click();
      });
    });
  }

  /* =================== Mouse drag-to-scroll (footer section) =================== */
  (() => {
    let down = false, moved = false, startX = 0, startLeft = 0;

    section.addEventListener('mousedown', e => {
      if (e.button !== 0) return;
      if (e.target.closest('input[type=range], input[type=url], input[type=text], .right-side-header, .status')) return;
      down = true; moved = false;
      startX = e.clientX; startLeft = section.scrollLeft;
    });

    window.addEventListener('mousemove', e => {
      if (!down) return;
      const dx = e.clientX - startX;
      if (!moved && Math.abs(dx) > 5) {
        moved = true;
        section.classList.add('dragging');
      }
      if (moved) {
        section.scrollLeft = startLeft - dx;
        e.preventDefault();
      }
    });

    const end = () => {
      if (!down) return;
      down = false;
      section.classList.remove('dragging');
    };
    window.addEventListener('mouseup', end);
    window.addEventListener('blur', end);

    // swallow the click that follows a drag
    section.addEventListener('click', e => {
      if (moved) { e.preventDefault(); e.stopPropagation(); moved = false; }
    }, true);

    // stop native dragging of links/images inside the section
    section.addEventListener('dragstart', e => e.preventDefault());
  })();

  /* =================== Init =================== */
  // Always start on the Font tab (browsers may restore the old radio state on refresh)
  $('#tab5').checked = true;
  section.scrollLeft = 0;

  addSystemFont();
  renderTests();
  {
    let last = '';
    try { last = localStorage.getItem(LAST_KEY) || ''; } catch (e) {}
    const start = tests.find(t => t.name === last) || tests.find(t => t.name === DEFAULT_TEST) || tests[0];
    if (start) showTest(start);   // last selected test (kept on refresh); first run: Farsi
    else updateAbout();
  }
})();