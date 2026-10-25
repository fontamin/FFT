(() => {
  'use strict';

  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];

  /* =================== Material icons (inline SVG paths, 24px) =================== */
  const MI = {
  "close": "M19 6.41 17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z",
  "edit": "M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z",
  "add": "M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z",
  "refresh": "M17.65 6.35C16.2 4.9 14.21 4 12 4c-4.42 0-7.99 3.58-7.99 8s3.57 8 7.99 8c3.73 0 6.84-2.55 7.73-6h-2.08c-.82 2.33-3.04 4-5.65 4-3.31 0-6-2.69-6-6s2.69-6 6-6c1.66 0 3.14.69 4.22 1.78L13 11h7V4l-2.35 2.35z",
  "autorenew_off": "M 12 1 L 12 4 C 10.110532 4 8.3742676 4.6538475 7.0058594 5.7480469 L 4.3046875 3.1210938 L 2.9101562 4.5566406 L 19.695312 20.878906 L 21.089844 19.443359 L 18.388672 16.816406 C 19.399953 15.476516 20 13.808776 20 12 C 20 10.43 19.539766 8.9702344 18.759766 7.7402344 L 17.300781 9.1992188 C 17.740781 10.039219 18 10.99 18 12 C 18 13.264277 17.607243 14.438464 16.9375 15.40625 L 8.4570312 7.1582031 C 9.4501807 6.4295278 10.675372 6 12 6 L 12 9 L 16 5 L 12 1 z M 4.5957031 8.9667969 C 4.2122722 9.9022929 4 10.926005 4 12 C 4 13.57 4.4602344 15.029766 5.2402344 16.259766 L 6.6992188 14.800781 C 6.2492187 13.970781 6 13.01 6 12 C 6 11.487051 6.0640471 10.989138 6.1855469 10.513672 L 4.5957031 8.9667969 z M 12 15 L 8 19 L 12 23 L 12 20 C 13.153315 20 14.249979 19.757171 15.240234 19.318359 L 13.648438 17.769531 L 13.646484 17.769531 C 13.123132 17.918933 12.570852 18 12 18 L 12 15 z",
  "autorenew": "M12 6v3l4-4-4-4v3c-4.42 0-8 3.58-8 8 0 1.57.46 3.03 1.24 4.26L6.7 14.8c-.45-.83-.7-1.79-.7-2.8 0-3.31 2.69-6 6-6zm6.76 1.74L17.3 9.2c.44.84.7 1.79.7 2.8 0 3.31-2.69 6-6 6v-3l-4 4 4 4v-3c4.42 0 8-3.58 8-8 0-1.57-.46-3.03-1.24-4.26z",
  "download": "M5 20h14v-2H5v2zM19 9h-4V3H9v6H5l7 7 7-7z",
  "delete": "M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z",
  "folder_open": "M20 6h-8l-2-2H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2zm0 12H4V8h16v10z",
  "casino": "M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zM7.5 18c-.83 0-1.5-.67-1.5-1.5S6.67 15 7.5 15s1.5.67 1.5 1.5S8.33 18 7.5 18zm0-9C6.67 9 6 8.33 6 7.5S6.67 6 7.5 6 9 6.67 9 7.5 8.33 9 7.5 9zm4.5 4.5c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zm4.5 4.5c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zm0-9c-.83 0-1.5-.67-1.5-1.5S15.67 6 16.5 6s1.5.67 1.5 1.5S17.33 9 16.5 9z",
  "restart_alt": "M12 5V2L8 6l4 4V7c3.31 0 6 2.69 6 6 0 2.97-2.17 5.43-5 5.91v2.02c3.95-.49 7-3.85 7-7.93 0-4.42-3.58-8-8-8zm-6 8c0-1.65.67-3.15 1.76-4.24L6.34 7.34C4.9 8.79 4 10.79 4 13c0 4.08 3.05 7.44 7 7.93v-2.02c-2.83-.48-5-2.94-5-5.91z",
  "expand_more": "M16.59 8.59 12 13.17 7.41 8.59 6 10l6 6 6-6z",
  "expand_less": "M12 8l-6 6 1.41 1.41L12 10.83l4.59 4.58L18 14z",
  "dark_mode": "M12 3c-4.97 0-9 4.03-9 9s4.03 9 9 9 9-4.03 9-9c0-.46-.04-.92-.1-1.36-.98 1.37-2.58 2.26-4.4 2.26-2.98 0-5.4-2.42-5.4-5.4 0-1.81.89-3.42 2.26-4.4-.44-.06-.9-.1-1.36-.1z",
  "light_mode": "M12 7c-2.76 0-5 2.24-5 5s2.24 5 5 5 5-2.24 5-5-2.24-5-5-5zM2 13h2c.55 0 1-.45 1-1s-.45-1-1-1H2c-.55 0-1 .45-1 1s.45 1 1 1zm18 0h2c.55 0 1-.45 1-1s-.45-1-1-1h-2c-.55 0-1 .45-1 1s.45 1 1 1zM11 2v2c0 .55.45 1 1 1s1-.45 1-1V2c0-.55-.45-1-1-1s-1 .45-1 1zm0 18v2c0 .55.45 1 1 1s1-.45 1-1v-2c0-.55-.45-1-1-1s-1 .45-1 1zM5.99 4.58c-.39-.39-1.03-.39-1.41 0-.39.39-.39 1.03 0 1.41l1.06 1.06c.39.39 1.03.39 1.41 0s.39-1.03 0-1.41L5.99 4.58zm12.37 12.37c-.39-.39-1.03-.39-1.41 0-.39.39-.39 1.03 0 1.41l1.06 1.06c.39.39 1.03.39 1.41 0 .39-.39.39-1.03 0-1.41l-1.06-1.06zm1.06-10.96c.39-.39.39-1.03 0-1.41-.39-.39-1.03-.39-1.41 0l-1.06 1.06c-.39.39-.39 1.03 0 1.41s1.03.39 1.41 0l1.06-1.06zM7.05 18.36c.39-.39.39-1.03 0-1.41-.39-.39-1.03-.39-1.41 0l-1.06 1.06c-.39.39-.39 1.03 0 1.41s1.03.39 1.41 0l1.06-1.06z"
};
  // icons drawn on a 960 grid (viewBox 0 -960 960 960): inner markup
  const MIX = {
    rk_justify: '<path d="m 120,-120 v -80 h 254.57701 v 80 z m 0,-160 v -80 h 254.57701 v 80 z m 0,-160 v -80 h 254.57701 v 80 z m 0,-160 v -80 h 720 v 80 z m 0,-160 v -80 h 720 v 80 z"/><path d="m 538.69884,-99.607086 h 64.16171 V -221.30884 h 32.65169 q 50.00504,0.22833 78.09006,-28.08502 28.08502,-28.31336 28.08502,-77.6334 0,-50.23337 -28.08502,-77.63339 -27.85669,-27.40002 -78.09006,-27.40002 h -96.8134 z m 64.16171,-178.785134 v -96.58507 h 31.05336 q 23.97501,0 33.56502,12.78668 9.81834,12.55834 9.81834,35.62002 0,23.06169 -9.81834,35.62003 -9.59001,12.55834 -33.56502,12.55834 z m 82.20006,178.785134 h 71.24005 l -66.44504,-149.786774 -69.41339,-0.685 z m 111.19841,0 h 64.16171 V -215.82884 l 162.34517,-216.23183 h -73.9801 l -88.13674,128.32343 v -128.32343 h -64.39004 z m 157.77845,0 h 71.92503 L 899.69409,-306.93391 863.16073,-258.5272 Z" transform="scale(0.83005909,1.2047335)"/>',
    rk_settings: '<path d="m 120,-120 v -80 h 273.31888 v 80 z m 0,-160 v -80 h 273.31888 v 80 z m 0,-160 v -80 h 273.31888 v 80 z m 0,-160 v -80 h 720 v 80 z m 0,-160 v -80 h 720 v 80 z"/><path d="m 606,-120 -12,-60 c -8,-3.33333 -15.5,-6.83333 -22.5,-10.5 -7,-3.66667 -14.16667,-8.16667 -21.5,-13.5 l -58,18 -40,-68 46,-40 c -1.33333,-8.66667 -2,-17.33333 -2,-26 0,-8.66667 0.66667,-17.33333 2,-26 l -46,-40 40,-68 58,18 c 7.33333,-5.33333 14.5,-9.83333 21.5,-13.5 7,-3.66667 14.5,-7.16667 22.5,-10.5 l 12,-60 h 80 l 12,60 c 8,3.33333 15.5,6.83333 22.5,10.5 7,3.66667 14.16667,8.16667 21.5,13.5 l 58,-18 40,68 -46,40 c 1.33333,8.66667 2,17.33333 2,26 0,8.66667 -0.66667,17.33333 -2,26 l 46,40 -40,68 -58,-18 c -7.33333,5.33333 -14.5,9.83333 -21.5,13.5 -7,3.66667 -14.5,7.16667 -22.5,10.5 l -12,60 z m 96.5,-143.5 c 15.66667,-15.66667 23.5,-34.5 23.5,-56.5 0,-22 -7.83333,-40.83333 -23.5,-56.5 C 686.83333,-392.16667 668,-400 646,-400 c -22,0 -40.83333,7.83333 -56.5,23.5 -15.66667,15.66667 -23.5,34.5 -23.5,56.5 0,22 7.83333,40.83333 23.5,56.5 15.66667,15.66667 34.5,23.5 56.5,23.5 22,0 40.83333,-7.83333 56.5,-23.5 z"/>'
  };
  const icn = n => MIX[n]
    ? '<svg class="mi" viewBox="0 -960 960 960" fill="currentColor" aria-hidden="true">' + MIX[n] + '</svg>'
    : '<svg class="mi" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="' + MI[n] + '"/></svg>';
  // button = text + icon (static markup)
  const setBtn = (b, label, name) => { b.textContent = label; b.insertAdjacentHTML('beforeend', icn(name)); };

  /* =================== Elements =================== */
  const target   = $('.dynamic');
  const sizeIn   = $('#fontsizeinput');
  const heightIn = $('#fontheightinput');
  const axesBox  = $('#axes');
  const featBox  = $('#features');
  const listEl   = $('#fontlist');
  const diceBtn  = $('#randbutton');
  const showAll  = $('#showall');
  const longNames = $('#longnames');   // off = only the 4-letter tag, on = full name + tag
  const NAMES_KEY = 'fft-featnames';
  try { longNames.checked = localStorage.getItem(NAMES_KEY) === '1'; } catch (e) {}
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
  let justOn = false, jTimer = 0;   // kashida justification (see "Justify" section)
  let counter = 0;
  let colorLine = '';     // 'color: …; background-color: …;' (shown instead of font-size / line-height while Layout Colors is open)
  let colorCss = '';      // text/background colors chosen in the Layout tab (shown in the CSS preview)

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
  const tab1Row = $('.pc-tab section .tab1');
  const setText = (el, s) => { if (el.textContent !== s) el.textContent = s; };
  let lastLay = '', lastVar = null, lastFeat = null, applyRaf = 0;

  function updateT3() {
    const colorMode = tab1Row.classList.contains('colormode'), justMode = tab1Row.classList.contains('justmode');
    setText(t3, colorMode ? colorLine : justMode ? justLine() : `font-size: ${+sizeIn.value}px; line-height: ${+heightIn.value}em;`);
  }

  // slider events: at most one update per frame
  function queueApply() {
    if (applyRaf) return;
    applyRaf = requestAnimationFrame(() => { applyRaf = 0; applyStyles(); syncInstances(); });
  }

  function applyStyles() {
    const fs = +sizeIn.value, fh = +heightIn.value;
    const lay = fs + '|' + fh, layoutChanged = lay !== lastLay;
    if (layoutChanged) {
      lastLay = lay;
      target.style.fontSize = fs + 'px';
      target.style.lineHeight = fh + 'em';
    }

    let chg = layoutChanged;
    const v = info.axes.map(a => `"${a.tag}" ${axisVals[a.tag]}`).join(', ');
    if (v !== lastVar) {
      chg = true;
      lastVar = v;
      target.style.fontVariationSettings = v || 'normal';
      setText(t1, `font-variation-settings: ${v || 'normal'};`);
    }

    const f = [];
    Object.keys(featOn).forEach(tag => {
      if (featOn[tag] !== DEFAULT_ON.has(tag)) f.push(`"${tag}" ${featOn[tag] ? 1 : 0}`);
    });
    const fset = f.join(', ');
    if (fset !== lastFeat) {
      chg = true;
      lastFeat = fset;
      target.style.fontFeatureSettings = fset || 'normal';
      setText(t2, `font-feature-settings: ${fset || 'normal'};`);
    }

    updateT3();
    if (justOn && chg) scheduleJust();
    if (glyphOn && layoutChanged) updateGlyphSize();   // glyph size only depends on Size / Height
    scheduleGuides();
  }

  /* =================== Slider bubble =================== */
  function attachBubble(slider, fmt) {
    const b = document.createElement('span');
    b.className = 'slider-value';
    slider.parentElement.style.position = 'relative';
    slider.parentElement.appendChild(b);
    let w = 0;
    const upd = remeasure => {
      const min = parseFloat(slider.min) || 0, max = parseFloat(slider.max) || 100;
      const val = parseFloat(slider.value);
      const half = 15;
      if (remeasure === true || !w) w = slider.offsetWidth;   // no layout read while dragging
      b.textContent = fmt ? fmt(val) : String(+val.toFixed(2));
      if (!w) return;
      let px = ((val - min) / ((max - min) || 1)) * (w - 30) + half;
      b.style.left = Math.min(w - half, Math.max(half, px)) + 'px';
    };
    slider.addEventListener('input', () => upd());
    bubbles.push({ slider, upd });
    upd(true);
  }
  function updateBubbles() {
    bubbles = bubbles.filter(x => x.slider.isConnected);
    bubbles.forEach(x => x.upd(true));
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

  /* --- remember the scroll position of the footer row for every menu / sub-menu (so coming back lands where you left) --- */
  const scrollMem = {};
  const secEl = () => $('.pc-tab > section');
  // pos = scrollLeft read BEFORE the menu classes changed (the browser clamps it once the layout changes)
  function swapScroll(from, to, pos) {
    scrollMem[from] = pos;
    secEl().scrollLeft = scrollMem[to] || 0;
    // multi-row: the row is re-packed (and its width changes) right after this, so packRows applies the position again once it is done
    if (frows > 1) { wantScroll = scrollMem[to] || 0; setTimeout(() => { wantScroll = null; }, 400); }
  }

  /* =================== Build UI from font info =================== */
  // Variation values are remembered by axis tag and shared by all fonts (clamped to each font's range)
  const axisGlobal = {};

  function buildAxes() {
    axesBox.textContent = '';
    Object.keys(axisVals).forEach(k => delete axisVals[k]);
    diceBtn.style.display = info.axes.length ? '' : 'none';
    if (!info.axes.length) { hint(axesBox, 'No variable axes in this font'); updateBubbles(); return; }
    info.axes.forEach(a => {
      const step = (a.max - a.min) > 10 ? 1 : 0.01;
      const g = axisGlobal[a.tag];
      const start = g != null ? Math.min(a.max, Math.max(a.min, g)) : a.def;
      axisVals[a.tag] = start;
      const { p, inp } = makeSlider({
        id: 'ax_' + cleanId(a.tag), label: axisLabel(a) + ':',
        min: a.min, max: a.max, step, value: start,
        onInput: v => { axisVals[a.tag] = axisGlobal[a.tag] = v; queueApply(); }
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

  // add (or update) one custom feature
  function putCustom(tag, on) {
    const ex = customFeats.find(f => f.tag === tag);
    if (ex) ex.on = on; else customFeats.push({ tag, on });
    featOn[tag] = on;
    saveFeats();
  }

  function removeCustom(tag) {
    customFeats = customFeats.filter(f => f.tag !== tag);
    delete featOn[tag];
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
    // features you changed in another font that this font doesn't have: kept (and applied), shown dimmed
    const have = new Set(pool);
    const carried = Object.keys(featOn).filter(t => featOn[t] !== DEFAULT_ON.has(t) && !have.has(t) && !mine.includes(t)).sort();
    const tags = [...list.filter(t => !mine.includes(t)), ...carried, ...mine];   // your own features at the end
    if (!tags.length) { hint(featBox, 'No OpenType features'); return; }
    tags.forEach(tag => {
      const cf = customFeats.find(f => f.tag === tag);
      if (!(tag in featOn)) featOn[tag] = cf ? cf.on : DEFAULT_ON.has(tag);
      const p = document.createElement('p'); p.className = 'font-slider' + (carried.includes(tag) ? ' carried' : '');
      if (carried.includes(tag)) p.title = 'Not in this font: kept from another font';
      const cb = document.createElement('input');
      cb.type = 'checkbox'; cb.className = 'hidden'; cb.id = 'f_' + cleanId(tag);
      cb.autocomplete = 'off'; cb.checked = featOn[tag];
      cb.addEventListener('change', () => { featOn[tag] = cb.checked; applyStyles(); });
      const lb = document.createElement('label');
      const full = featName(tag) === tag ? tag : `${featName(tag)} · ${tag}`;
      lb.htmlFor = cb.id;
      lb.textContent = longNames.checked ? full : tag;
      lb.title = full;   // the full name is always in the tooltip
      p.append(cb, lb);
      if (cf) {
        const xb = document.createElement('button');
        xb.type = 'button'; xb.className = 'otx'; xb.innerHTML = icn('close'); xb.title = 'Remove this feature';
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
    revealAfterPack('label[for="f_' + cleanId(tag) + '"]');
  }
  $('#otadd').addEventListener('click', addCustom);
  [otTag, otVal].forEach(el => el.addEventListener('keydown', e => { if (e.key === 'Enter') addCustom(); }));

  /* --- Named instances (Variation tab): buttons, like the OpenType features --- */
  const instBox = $('#instances'), instToggle = $('#insttoggle'), tab2Row = $('.pc-tab section .tab2');

  // slide-up animation when a sub-menu opens; when going back (backing = true) the sub-menu has just slid down,
  // so the normal row only fades in. The class is removed and re-added so the animation restarts every time.
  let backing = false;
  // The elements that really have a box in the current layout. In multi-row mode the groups (#colorgroup, #instgroup, #wikigroup...)
  // are display: contents, i.e. they have NO box, so an animation on the group itself is never drawn: animate their items instead.
  function animTargets(g) {
    if (frows < 2) return [g];
    const t = [];
    leafItems(g, t);
    return t.length ? t : [g];
  }
  function slideIn(el) {
    if (!el) return;
    const cls = backing ? 'fadein' : 'slidein';
    const targets = animTargets(el);
    targets.forEach(t => t.classList.remove('slidein', 'fadein'));
    void el.offsetWidth;
    targets.forEach(t => t.classList.add(cls));
    // remove the class when the animation ends: otherwise it restarts every time the tab is shown again (display none -> shown)
    const done = () => targets.forEach(t => t.classList.remove(cls));
    targets[0].addEventListener('animationend', done, { once: true });
    setTimeout(done, 400);
  }
  const syncInstBtn = () => {
    const n = (info.instances || []).length, on = tab2Row.classList.contains('instmode');
    setBtn(instToggle, on ? 'Back' : n ? 'Instances · ' + n : 'Instances', on ? 'expand_more' : 'expand_less');
  };

  // an instance button is lit while the sliders are on that instance's values
  function syncInstances() {
    (info.instances || []).forEach((ins, i) => {
      const cb = document.getElementById('inst_' + i);
      if (!cb) return;
      cb.checked = info.axes.every(a => !(a.tag in ins.coords) ||
        Math.abs(axisVals[a.tag] - ins.coords[a.tag]) <= ((a.max - a.min) > 10 ? 0.5001 : 0.0051));
    });
  }

  function applyInstance(ins) {
    info.axes.forEach(a => {
      if (!(a.tag in ins.coords)) return;
      const inp = $('#ax_' + cleanId(a.tag));
      if (!inp) return;
      inp.value = Math.min(a.max, Math.max(a.min, ins.coords[a.tag]));
      inp.dispatchEvent(new Event('input'));
    });
    syncInstances();
  }

  function buildInstances() {
    instBox.textContent = '';
    const list = info.instances || [];
    syncInstBtn();
    if (!list.length) { hint(instBox, 'No named instances in this font'); return; }
    list.forEach((ins, i) => {
      const p = document.createElement('p'); p.className = 'font-slider';
      const cb = document.createElement('input');
      cb.type = 'checkbox'; cb.className = 'hidden'; cb.id = 'inst_' + i; cb.autocomplete = 'off';
      cb.addEventListener('change', () => applyInstance(ins));
      const lb = document.createElement('label');
      lb.htmlFor = cb.id; lb.textContent = ins.name;
      lb.title = Object.keys(ins.coords).map(t => t + ' ' + +ins.coords[t].toFixed(2)).join(', ');
      p.append(cb, lb);
      instBox.appendChild(p);
    });
    syncInstances();
  }

  instToggle.addEventListener('click', () => {
    const before = secEl().scrollLeft;
    const on = tab2Row.classList.toggle('instmode');
    instToggle.classList.toggle('on', on);
    syncInstBtn();
    slideIn($(on ? '#instgroup' : '#axesgroup'));
    on ? swapScroll('tab2', 'inst', before) : swapScroll('inst', 'tab2', before);
    requestAnimationFrame(updateBubbles);   // sliders were hidden (width 0) while the value changed: place the numbers again
  });

  function setInfo(i) {
    info = i;
    // OpenType choices (featOn) and variation values (axisGlobal) are global: they are kept when the font changes
    buildAxes();
    buildInstances();
    buildFeatures();
    applyStyles();
  }

  showAll.addEventListener('change', () => { buildFeatures(); applyStyles(); });
  longNames.addEventListener('change', () => {
    try { localStorage.setItem(NAMES_KEY, longNames.checked ? '1' : '0'); } catch (e) {}
    buildFeatures(); applyStyles();
  });

  diceBtn.addEventListener('click', () => {
    info.axes.forEach(a => {
      const inp = $('#ax_' + cleanId(a.tag));
      if (!inp) return;
      inp.value = a.min + Math.random() * (a.max - a.min);
      inp.dispatchEvent(new Event('input'));
    });
  });

  /* =================== Font file parser (fvar / GSUB / GPOS / name) =================== */
  const WANT = ['name', 'fvar', 'GSUB', 'GPOS', 'head', 'hhea', 'OS/2', 'cmap', 'maxp', 'post', 'CFF '];
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

  // every Unicode code point the font maps to a real glyph (cmap formats 4 and 12), without control / space / format characters
  const SKIP_CH = /[\p{Cc}\p{Cs}\p{Z}\p{Cf}\p{Cn}]/u;
  function cmapChars(d) {
    const set = new Set(), n = d.getUint16(2), seen = new Set(), map = new Map();   // map: code point -> glyph id
    const add = (c, g) => {
      if (c <= 0x10FFFF && g) map.set(c, g);
      if (c < 32 || (c > 126 && c < 160) || (c >= 0xD800 && c <= 0xDFFF) || c > 0x10FFFF || (c & 0xFFFE) === 0xFFFE) return;
      set.add(c);
    };
    for (let i = 0; i < n; i++) {
      const pid = d.getUint16(4 + i * 8), eid = d.getUint16(6 + i * 8), off = d.getUint32(8 + i * 8);
      if (!(pid === 0 || (pid === 3 && (eid === 1 || eid === 10))) || seen.has(off)) continue;
      seen.add(off);
      const fmt = d.getUint16(off);
      if (fmt === 4) {
        const sc = d.getUint16(off + 6) / 2, endO = off + 14, stO = endO + sc * 2 + 2, dlO = stO + sc * 2, roO = dlO + sc * 2;
        for (let k = 0; k < sc; k++) {
          const end = d.getUint16(endO + k * 2), st = d.getUint16(stO + k * 2);
          const delta = d.getInt16(dlO + k * 2), ro = d.getUint16(roO + k * 2);
          for (let c = st; c <= end && c < 0xFFFF; c++) {
            let g;
            if (ro === 0) g = (c + delta) & 0xFFFF;
            else {
              const p = roO + k * 2 + ro + (c - st) * 2;
              if (p + 2 > d.byteLength) break;
              g = d.getUint16(p); if (g) g = (g + delta) & 0xFFFF;
            }
            if (g) add(c, g);
          }
        }
      } else if (fmt === 12) {
        const ng = d.getUint32(off + 12);
        for (let g = 0; g < ng; g++) {
          const o = off + 16 + g * 12, st = d.getUint32(o), end = Math.min(d.getUint32(o + 4), 0x10FFFF), gid = d.getUint32(o + 8);
          for (let c = st; c <= end; c++) if (gid + (c - st)) add(c, gid + (c - st));
        }
      }
    }
    return { chars: [...set].sort((a, b) => a - b).filter(c => !SKIP_CH.test(String.fromCodePoint(c))), map };
  }

  // Glyphs that have no Unicode value are found through GSUB (single, alternate and ligature substitutions).
  // Each one is described by a "recipe": a text + an OpenType feature that makes the browser draw exactly that glyph.
  function gsubExtra(d, cmap, numGlyphs) {
    const covered = new Set(cmap.values()), rev = new Map();
    cmap.forEach((g, cp) => { if (!rev.has(g) || cp < rev.get(g)) rev.set(g, cp); });
    const fl = d.getUint16(6), ll = d.getUint16(8), nf = d.getUint16(fl);
    const POS = { init: 1, medi: 1, fina: 1, isol: 1 };   // Arabic joining forms: the context makes them appear
    const reach = new Map(), subCache = {};
    const cov = off => {
      const f = d.getUint16(off), n = d.getUint16(off + 2), out = [];
      if (f === 1) for (let i = 0; i < n; i++) out.push(d.getUint16(off + 4 + i * 2));
      else for (let i = 0; i < n; i++) {
        const o = off + 4 + i * 6, a = d.getUint16(o), b = d.getUint16(o + 2), si = d.getUint16(o + 4);
        for (let g = a; g <= b; g++) out[si + g - a] = g;
      }
      return out;
    };
    const subsOf = i => {
      if (subCache[i]) return subCache[i];
      const lo = ll + d.getUint16(ll + 2 + i * 2), type = d.getUint16(lo), n = d.getUint16(lo + 4), out = [];
      for (let k = 0; k < n; k++) {
        let so = lo + d.getUint16(lo + 6 + k * 2), t = type;
        if (type === 7) { t = d.getUint16(so + 2); so += d.getUint32(so + 4); }
        out.push({ t, so });
      }
      return (subCache[i] = out);
    };
    const baseOf = g => rev.has(g) ? { s: String.fromCodePoint(rev.get(g)), f: {}, ctx: null } : (reach.get(g) || null);
    const ok = g => g > 0 && !covered.has(g) && !reach.has(g) && (!numGlyphs || g < numGlyphs);
    const make = (b, tag, v) => POS[tag] ? (b.ctx ? null : { s: b.s, f: b.f, ctx: tag })
      : { s: b.s, f: Object.assign({}, b.f, { [tag]: v }), ctx: b.ctx };
    const put = (g, b, tag, v) => { if (!ok(g) || !b) return; const r = make(b, tag, v); if (r) reach.set(g, r); };
    for (let pass = 0; pass < 2; pass++) {
      for (let fi = 0; fi < nf; fi++) {
        const ro = fl + 2 + fi * 6, tag = tag4(d, ro), fo = fl + d.getUint16(ro + 4), nl = d.getUint16(fo + 2);
        for (let li = 0; li < nl; li++) {
          for (const { t, so } of subsOf(d.getUint16(fo + 4 + li * 2))) {
            try {
              if (t === 1) {
                const f = d.getUint16(so), cv = cov(so + d.getUint16(so + 2));
                if (f === 1) { const dl = d.getInt16(so + 4); cv.forEach(g => put((g + dl) & 0xFFFF, baseOf(g), tag, 1)); }
                else { const n = d.getUint16(so + 4); for (let i = 0; i < n && i < cv.length; i++) put(d.getUint16(so + 6 + i * 2), baseOf(cv[i]), tag, 1); }
              } else if (t === 3) {
                const cv = cov(so + d.getUint16(so + 2)), n = d.getUint16(so + 4);
                for (let i = 0; i < n; i++) {
                  const st = so + d.getUint16(so + 6 + i * 2), cnt = d.getUint16(st), b = baseOf(cv[i]);
                  for (let j = 0; j < cnt; j++) put(d.getUint16(st + 2 + j * 2), b, tag, j + 1);   // value = index of the alternate
                }
              } else if (t === 4 && pass === 0) {
                const cv = cov(so + d.getUint16(so + 2)), n = d.getUint16(so + 4);
                for (let i = 0; i < n; i++) {
                  const st = so + d.getUint16(so + 6 + i * 2), lc = d.getUint16(st), first = rev.get(cv[i]);
                  if (first == null) continue;
                  for (let j = 0; j < lc; j++) {
                    const lo2 = st + d.getUint16(st + 2 + j * 2), out = d.getUint16(lo2);
                    if (!ok(out)) continue;
                    const cc = d.getUint16(lo2 + 2);
                    let str = String.fromCodePoint(first), good = true;
                    for (let k = 0; k < cc - 1; k++) {
                      const c = rev.get(d.getUint16(lo2 + 4 + k * 2));
                      if (c == null) { good = false; break; }
                      str += String.fromCodePoint(c);
                    }
                    if (good) put(out, { s: str, f: {}, ctx: null }, tag, 1);
                  }
                }
              }
            } catch (e) {}
          }
        }
      }
    }
    const list = [...reach].sort((a, b) => a[0] - b[0]).slice(0, 4000).map(([g, r]) => ({ g, s: r.s, f: r.f, ctx: r.ctx }));
    return { list, total: numGlyphs ? Math.max(list.length, numGlyphs - covered.size) : list.length };
  }

  // Standard Macintosh glyph order (used by 'post' tables)
  const MAC = ('.notdef .null nonmarkingreturn space exclam quotedbl numbersign dollar percent ampersand quotesingle parenleft parenright asterisk plus comma hyphen period slash ' +
    'zero one two three four five six seven eight nine colon semicolon less equal greater question at ' +
    'A B C D E F G H I J K L M N O P Q R S T U V W X Y Z bracketleft backslash bracketright asciicircum underscore grave ' +
    'a b c d e f g h i j k l m n o p q r s t u v w x y z braceleft bar braceright asciitilde ' +
    'Adieresis Aring Ccedilla Eacute Ntilde Odieresis Udieresis aacute agrave acircumflex adieresis atilde aring ccedilla eacute egrave ecircumflex edieresis iacute igrave icircumflex idieresis ntilde oacute ograve ocircumflex odieresis otilde uacute ugrave ucircumflex udieresis ' +
    'dagger degree cent sterling section bullet paragraph germandbls registered copyright trademark acute dieresis notequal AE Oslash infinity plusminus lessequal greaterequal yen mu partialdiff summation product pi integral ordfeminine ordmasculine Omega ae oslash ' +
    'questiondown exclamdown logicalnot radical florin approxequal Delta guillemotleft guillemotright ellipsis nonbreakingspace Agrave Atilde Otilde OE oe endash emdash quotedblleft quotedblright quoteleft quoteright divide lozenge ydieresis Ydieresis fraction currency guilsinglleft guilsinglright fi fl daggerdbl periodcentered quotesinglbase quotedblbase perthousand ' +
    'Acircumflex Ecircumflex Aacute Edieresis Egrave Iacute Icircumflex Idieresis Igrave Oacute Ocircumflex apple Ograve Uacute Ucircumflex Ugrave dotlessi circumflex tilde macron breve dotaccent ring cedilla hungarumlaut ogonek caron Lslash lslash Scaron scaron Zcaron zcaron brokenbar Eth eth Yacute yacute Thorn thorn minus multiply onesuperior twosuperior threesuperior onehalf onequarter threequarters franc Gbreve gbreve Idotaccent Scedilla scedilla Cacute cacute Ccaron ccaron dcroat').split(' ');

  // glyph names from the 'post' table (format 1 and 2); null when the font has none (format 3)
  function postNames(d) {
    const ver = d.getUint32(0), out = [];
    if (ver === 0x00010000) { MAC.forEach((n, i) => { out[i] = n; }); return out; }
    if (ver !== 0x00020000) return null;
    const n = d.getUint16(32), idx = [], strs = [];
    for (let i = 0; i < n; i++) idx.push(d.getUint16(34 + i * 2));
    let p = 34 + n * 2;
    while (p < d.byteLength) {
      const l = d.getUint8(p++); let t = '';
      for (let k = 0; k < l && p < d.byteLength; k++) t += String.fromCharCode(d.getUint8(p++));
      strs.push(t);
    }
    idx.forEach((v, g) => { out[g] = v < 258 ? MAC[v] : (strs[v - 258] || ''); });
    return out;
  }

  // glyph names from a CFF table (name-keyed fonts). Standard strings are only known for SID 1-95 (ASCII).
  function cffNames(d) {
    const index = p => {
      const n = d.getUint16(p);
      if (!n) return { it: [], end: p + 2 };
      const os = d.getUint8(p + 2), base = p + 3 + (n + 1) * os - 1;
      const off = i => { let v = 0; for (let k = 0; k < os; k++) v = v * 256 + d.getUint8(p + 3 + i * os + k); return v; };
      const it = [];
      for (let i = 0; i < n; i++) it.push([base + off(i), base + off(i + 1)]);
      return { it, end: base + off(n) };
    };
    const nm = index(d.getUint8(2)), top = index(nm.end), st = index(top.end);
    const dict = {}; let stack = [], p = top.it[0][0];
    const e = top.it[0][1];
    while (p < e) {
      const b = d.getUint8(p++);
      if (b <= 21) { dict[b === 12 ? 1200 + d.getUint8(p++) : b] = stack; stack = []; }
      else if (b === 28) { stack.push(d.getInt16(p)); p += 2; }
      else if (b === 29) { stack.push(d.getInt32(p)); p += 4; }
      else if (b === 30) { while (p < e) { const v = d.getUint8(p++); if ((v & 15) === 15 || (v >> 4) === 15) break; } stack.push(0); }
      else if (b >= 32 && b <= 246) stack.push(b - 139);
      else if (b >= 247 && b <= 250) stack.push((b - 247) * 256 + d.getUint8(p++) + 108);
      else if (b >= 251 && b <= 254) stack.push(-(b - 251) * 256 - d.getUint8(p++) - 108);
    }
    if (dict[1230] || !dict[17]) return null;   // CID-keyed fonts have no glyph names
    const ng = d.getUint16(dict[17][0]), co = dict[15] ? dict[15][0] : 0, sids = [0];
    if (co <= 2) { for (let g = 1; g < ng; g++) sids[g] = g; }
    else {
      const f = d.getUint8(co); let q = co + 1;
      if (f === 0) { for (let g = 1; g < ng; g++) { sids[g] = d.getUint16(q); q += 2; } }
      else {
        let g = 1;
        while (g < ng) {
          const first = d.getUint16(q); q += 2;
          let left; if (f === 1) left = d.getUint8(q++); else { left = d.getUint16(q); q += 2; }
          for (let k = 0; k <= left && g < ng; k++) sids[g++] = first + k;
        }
      }
    }
    const nameOf = sid => {
      if (sid === 0) return '.notdef';
      if (sid < 391) return sid <= 95 ? (sid === 8 ? 'quoteright' : sid === 65 ? 'quoteleft' : MAC[sid + 2]) : '';
      const it = st.it[sid - 391]; if (!it) return '';
      let t = ''; for (let i = it[0]; i < it[1]; i++) t += String.fromCharCode(d.getUint8(i));
      return t;
    };
    return sids.map(nameOf);
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
      const allTags = [];   // all axes (also hidden ones): instance coordinates follow this order
      for (let i = 0; i < cnt; i++) {
        const o = off + i * sz;
        allTags.push(tag4(d, o));
        if (d.getUint16(o + 16) & 1) continue; // hidden axis
        out.axes.push({
          tag: tag4(d, o),
          min: d.getInt32(o + 4) / 65536,
          def: d.getInt32(o + 8) / 65536,
          max: d.getInt32(o + 12) / 65536,
          name: names(d.getUint16(o + 18))
        });
      }
      // named instances
      out.instances = [];
      try {
        const ic = d.getUint16(12), isz = d.getUint16(14), io = off + cnt * sz;
        for (let i = 0; i < ic; i++) {
          const o = io + i * isz;
          if (o + 4 + cnt * 4 > d.byteLength) break;
          const coords = {};
          allTags.forEach((tg, k) => { coords[tg] = d.getInt32(o + 4 + k * 4) / 65536; });
          out.instances.push({ name: names(d.getUint16(o)) || 'Instance ' + (i + 1), coords });
        }
      } catch (e) {}
    }
    const set = new Set();
    ['GSUB', 'GPOS'].forEach(t => { try { if (T[t]) featureTags(T[t]).forEach(x => set.add(x)); } catch (e) {} });
    out.features = [...set].sort();
    if (T.cmap) {
      try {
        const cm = cmapChars(T.cmap);
        out.chars = cm.chars;
        out.gids = Uint16Array.from(cm.chars, c => cm.map.get(c));
        out.bases = [0x25CC, 0x640, 0xA0, 0x20, 0x627].filter(c => cm.map.has(c));
        if (T.GSUB) out.extra = gsubExtra(T.GSUB, cm.map, T.maxp ? T.maxp.getUint16(4) : 0);
      } catch (e) {}
    }
    try { out.names = (T.post && postNames(T.post)) || (T['CFF '] && cffNames(T['CFF '])) || null; } catch (e) {}
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
    $('.tab5').classList.toggle('nofonts', fonts.filter(r => !r.system).length < 2);
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
        rb.type = 'button'; rb.className = 'chipr'; rb.innerHTML = icn('refresh'); rb.title = 'Reload';
        rb.addEventListener('click', () => reloadFont(r));
        chip.appendChild(rb);
      }
      if (!r.system) {
        const xb = document.createElement('button');
        xb.type = 'button'; xb.className = 'chipx'; xb.innerHTML = icn('close'); xb.title = 'Remove';
        xb.addEventListener('click', () => removeFont(r));
        chip.appendChild(xb);
      } else nb.classList.add('nox');
      listEl.appendChild(chip);
    });
    revealAfterPack('#fontlist .chip.active');
  }

  function activate(rec) {
    active = rec;
    target.style.fontFamily = rec.css;
    nameEl.textContent = titleOf(rec);
    document.title = rec.system ? 'Fontamin Font Tester' : titleOf(rec) + ' – FFT';
    setInfo(rec.info);
    setStatus(rec.status);
    renderList();
    if (glyphOn) renderGlyphs();
    if (justOn) scheduleJust();
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
    if (glyphOn) renderGlyphs();
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
        ? { axes: parsed.axes, instances: parsed.instances, features: parsed.features, chars: parsed.chars, extra: parsed.extra, bases: parsed.bases, gids: parsed.gids, names: parsed.names }
        : { generic: true, axes: [], features: COMMON },
      status: parsed
        ? `${name}${version ? ' v' + version : ''}: ${parsed.axes.length} axes, ${parsed.features.length} features`
        : `${name}${note}`
    };
  }

  async function addFont(buf, fileName, src) {
    const m = await makeFace(buf, fileName);
    const rec = { id: ++counter, src, ...m };
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
      if (!fonts.includes(rec)) { try { document.fonts.delete(m.face); } catch (e) {} return false; }   // removed meanwhile
      const old = rec.face;
      Object.assign(rec, m);
      if (old) { try { document.fonts.delete(old); } catch (e) {} }
      if (rec === active) activate(rec); else renderList();
      setStatus(m.status + (auto ? ' (auto-reloaded)' : ' (reloaded)'));
      sigOf(rec).then(x => { rec.sig = x; });
      return true;
    } catch (e) {
      setStatus('Reload failed: ' + rec.file + (rec.src.file && !rec.src.handle ? ' — add the file again' : ''));
      return false;
    } finally { rec.reloading = false; }
  }

  // every font except the fallback font, one after the other
  async function reloadAll() {
    const list = fonts.filter(r => !r.system && !r.reloading);
    if (!list.length) return;
    const bad = [];
    for (const r of list) { if (fonts.includes(r) && !(await reloadFont(r))) bad.push(r.file); }
    setStatus('Reloaded ' + (list.length - bad.length) + ' of ' + list.length + ' fonts' + (bad.length ? ' — failed: ' + bad.join(', ') : ''));
  }

  function removeAllFonts() {
    fonts.filter(r => !r.system).forEach(r => { if (r.face) { try { document.fonts.delete(r.face); } catch (e) {} } });
    const keep = fonts.filter(r => r.system);
    fonts.length = 0; fonts.push(...keep);
    if (active && fonts.includes(active)) { renderList(); return; }
    active = null;
    if (fonts[0]) activate(fonts[0]); else renderList();
    setStatus('');
  }
  $('#reloadall').addEventListener('click', reloadAll);
  $('#removeall').addEventListener('click', removeAllFonts);

  /* =================== Auto reload (watches the font files) =================== */
  // Local files (picked / dropped in Chrome or Edge, via file handles) and fonts loaded by URL are checked
  // every second; a font is reloaded once its file stops changing. Plain files from Firefox / Safari can't be watched.
  const AUTO_KEY = 'fft-auto';
  let autoOn = true;
  try { autoOn = localStorage.getItem(AUTO_KEY) !== '0'; } catch (e) {}
  // fixed round button next to the dark-mode button (always visible, whatever the tab or the number of fonts)
  const oldAuto = $('#autobtn'); if (oldAuto) oldAuto.remove();   // leftover from the previous version of index.html
  const autoBtn = document.createElement('button');
  autoBtn.id = 'autobtn'; autoBtn.type = 'button'; autoBtn.innerHTML = icn('autorenew');
  document.body.appendChild(autoBtn);
  const syncAuto = () => {
    autoBtn.classList.toggle('on', autoOn);
    autoBtn.innerHTML = icn(autoOn ? 'autorenew' : 'autorenew_off');
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

  let sliderDrag = false;
  document.addEventListener('pointerdown', e => { if (e.target.type === 'range') sliderDrag = true; }, true);
  ['pointerup', 'pointercancel'].forEach(t => window.addEventListener(t, () => { sliderDrag = false; }));
  let watchBusy = false;
  async function watchTick() {
    if (!autoOn || watchBusy || document.hidden || sliderDrag) return;
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
      version: '', src: null,
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
  sizeIn.addEventListener('input', queueApply);
  heightIn.addEventListener('input', queueApply);
  attachBubble(sizeIn);
  attachBubble(heightIn);

  /* =================== Dark mode / outline =================== */
  const neg = $('#negative');
  // smooth theme switch: a temporary class turns the color transitions on, and is removed when the animation is over
  let fadeTimer = 0;
  function fadeTheme() {
    const root = document.documentElement;
    root.classList.add('themefade');
    void root.offsetWidth;   // transitions are active first, then the colors change
    clearTimeout(fadeTimer);
    fadeTimer = setTimeout(() => root.classList.remove('themefade'), 700);
  }
  try { if (localStorage.getItem('fft-dark') === '1') { neg.checked = true; document.body.classList.add('darkmode'); } } catch (e) {}
  // must be registered before the listeners that change the colors; not for a color preset that flips the mode itself (flipping)
  neg.addEventListener('change', () => { if (!flipping) fadeTheme(); });
  neg.addEventListener('change', () => {
    document.body.classList.toggle('darkmode', neg.checked);
    try { localStorage.setItem('fft-dark', neg.checked ? '1' : '0'); } catch (e) {}
  });
  $('#outline').addEventListener('change', e => document.body.classList.toggle('outline', e.target.checked));

  /* =================== Colors: a color set (text, background, accent, footer, button, box) per preset =================== */
  // Every color of the interface comes from a set of 6 colors. Presets (like the default tests) are kept in this list and copied into
  // localStorage on the first visit; items can be added, removed, exported and imported. Every item belongs to the "light" or the
  // "dark" group; the list is always sorted: light group first, then dark, each A→Z.
  // Not stored, but derived from these 6: --accent-bg (accent at 13%), the text colors on the footer / buttons / boxes / accent,
  // the lines, the slider track, the hover colors and the selection color.
  const COLOR_KEY = 'fft-colors';
  const FIELDS = ['text', 'bg', 'accent', 'footer', 'chip', 'box'];
  const FIELD_LABEL = { text: 'Text color', bg: 'Background color', accent: 'Accent color', footer: 'Footer color', chip: 'Button color', box: 'Box color' };
  // The built-in colors of each mode (equal to the defaults in style.css)
  const DEFAULT_THEME = {
    light: { text: '#222222', bg: '#f6f6f6', accent: '#ff4242', footer: '#ffffff', chip: '#ececee', box: '#f0f0f0' },
    dark:  { text: '#f5f5f5', bg: '#222222', accent: '#ff4242', footer: '#000000', chip: '#111111', box: '#2e2e2e' }
  };
  const PRESET_COLORS = [
    { name: 'Light',    mode: 'light', ...DEFAULT_THEME.light },
    { name: 'Material', mode: 'light', text: '#1d1b20', bg: '#fef7ff', accent: '#6750a4', footer: '#f3edf7', chip: '#e8def8', box: '#ece6f0' },
    { name: 'Yellow',   mode: 'light', text: '#000000', bg: '#ede8e2', accent: '#000000', footer: '#efb11e', chip: '#efb11e', box: '#ede8e2' },
    { name: 'Mint',     mode: 'light', text: '#1f3d2b', bg: '#e8f5ec', accent: '#2f9e5b', footer: '#dcefe2', chip: '#cfe7d8', box: '#d8ecdf' },
    { name: 'Dark',     mode: 'dark',  ...DEFAULT_THEME.dark },
    { name: 'Night',    mode: 'dark',  text: '#e6e6e6', bg: '#000000', accent: '#ffffff', footer: '#0a0a0a', chip: '#161616', box: '#1a1a1a' },
    { name: 'Ocean',    mode: 'dark',  text: '#d6e6ff', bg: '#10233f', accent: '#4dabf7', footer: '#0b1a30', chip: '#17325a', box: '#173055' },
    { name: 'Terminal', mode: 'dark',  text: '#33ff66', bg: '#0b0b0b', accent: '#33ff66', footer: '#000000', chip: '#0f1f12', box: '#0f1a11' }
  ];
  // The main colors of the page: one set for light mode, one for dark mode. The dark-mode button switches between them.
  // "Set to light/dark mode" replaces them (saved in localStorage and in the backup file).
  const THEME_KEY = 'fft-themecolors';

  const hexOk = v => typeof v === 'string' && /^#[0-9a-f]{6}$/i.test(v.trim());
  const isDarkHex = h => {
    const n = parseInt(h.slice(1), 16);
    return (0.299 * (n >> 16 & 255) + 0.587 * (n >> 8 & 255) + 0.114 * (n & 255)) / 255 < 0.5;
  };
  // text color for something painted in color h (slider numbers on the thumb, hovered buttons...): black or white,
  // whichever has the higher WCAG contrast. This is better than a plain light/dark threshold: on a mid-tone like the
  // default red (#ff4242) white looks "right" but black is clearly easier to read.
  const relLum = h => {
    const f = v => { v /= 255; return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4); };
    const n = parseInt(h.slice(1), 16);
    return 0.2126 * f(n >> 16 & 255) + 0.7152 * f(n >> 8 & 255) + 0.0722 * f(n & 255);
  };
  const onColor = h => { const L = relLum(h); return 1.05 / (L + 0.05) > (L + 0.05) / 0.05 ? '#ffffff' : '#000000'; };
  const normHex = v => {
    v = (v || '').trim().toLowerCase().replace(/^#/, '');
    if (/^[0-9a-f]{3}$/.test(v)) v = v.replace(/./g, '$&$&');
    return /^[0-9a-f]{6}$/.test(v) ? '#' + v : '';
  };
  const hx2 = n => Math.round(Math.max(0, Math.min(255, n))).toString(16).padStart(2, '0');
  const mixHex = (a, b, t) => {
    const p = h => [1, 3, 5].map(i => parseInt(h.slice(i, i + 2), 16)), A = p(a), B = p(b);
    return '#' + A.map((v, i) => hx2(v + (B[i] - v) * t)).join('');
  };
  // the 6 colors of c (a missing or invalid one takes the built-in value of the mode); null when text or background are unusable
  const fillColors = (c, mode) => {
    if (!c || !hexOk(c.text) || !hexOk(c.bg)) return null;
    const o = {};
    FIELDS.forEach(k => { o[k] = hexOk(c[k]) ? c[k].trim().toLowerCase() : DEFAULT_THEME[mode][k]; });
    return o;
  };
  const validColor = c => c && typeof c.name === 'string' && c.name.trim() && hexOk(c.text) && hexOk(c.bg);
  // an item without a (valid) mode goes to the group that fits its background
  const cleanColor = c => {
    const mode = c.mode === 'light' || c.mode === 'dark' ? c.mode : (isDarkHex(c.bg.trim()) ? 'dark' : 'light');
    return { name: c.name.trim().slice(0, 40), mode, ...fillColors(c, mode) };
  };
  const colorEq = (a, b) => FIELDS.every(k => a[k] === b[k]);
  const sortColors = () => colors.sort((a, b) =>
    (a.mode === b.mode ? 0 : a.mode === 'light' ? -1 : 1) ||
    a.name.localeCompare(b.name, undefined, { sensitivity: 'base', numeric: true }));
  let colors = [];
  let colorStored = null;
  try { colorStored = JSON.parse(localStorage.getItem(COLOR_KEY)); } catch (e) {}
  const saveColors = () => { try { localStorage.setItem(COLOR_KEY, JSON.stringify(colors)); } catch (e) {} };
  if (Array.isArray(colorStored)) {
    // a list saved by an older version has only text + background: built-in presets are refreshed with their full 6-color
    // set (otherwise they would keep default accent / footer / button / box colors); your own items keep what they have
    colors = colorStored.filter(validColor).map(c => {
      const old = !FIELDS.every(k => hexOk(c[k]));
      return cleanColor((old && PRESET_COLORS.find(p => p.name === c.name)) || c);
    });
  }
  else { colors = PRESET_COLORS.map(cleanColor); saveColors(); }
  // One-time repair: version 1.9 saved old 2-color presets with the 4 new colors filled in by the defaults, so they looked "complete".
  // Built-in presets whose accent / footer / button / box are still exactly those defaults get their real colors back (once).
  const COLOR_VER_KEY = 'fft-colors-ver';
  let colorVer = '';
  try { colorVer = localStorage.getItem(COLOR_VER_KEY) || ''; } catch (e) {}
  if (colorVer !== '2') {
    const NEW = ['accent', 'footer', 'chip', 'box'];
    colors.forEach(c => {
      const p = PRESET_COLORS.find(x => x.name === c.name && x.mode === c.mode);
      if (p && NEW.every(k => c[k] === DEFAULT_THEME[c.mode][k])) NEW.forEach(k => { c[k] = p[k]; });
    });
    try { localStorage.setItem(COLOR_VER_KEY, '2'); } catch (e) {}
  }
  // "Light" and "Dark" can't be removed: if a stored list lacks them they are added back
  const isCoreColor = c => (c.name === 'Light' && c.mode === 'light') || (c.name === 'Dark' && c.mode === 'dark');
  PRESET_COLORS.filter(isCoreColor).forEach(p => { if (!colors.some(x => x.name === p.name && x.mode === p.mode)) colors.push(cleanColor(p)); });
  saveColors();

  const themeColors = { light: { ...DEFAULT_THEME.light }, dark: { ...DEFAULT_THEME.dark } };
  try {
    const t = JSON.parse(localStorage.getItem(THEME_KEY));
    if (t) ['light', 'dark'].forEach(k => { const f = fillColors(t[k], k); if (f) themeColors[k] = f; });
  } catch (e) {}
  const saveTheme = () => { try { localStorage.setItem(THEME_KEY, JSON.stringify(themeColors)); } catch (e) {} };

  const INP = { text: $('#txtcolor'), bg: $('#bgcolor'), accent: $('#acccolor'), footer: $('#footcolor'), chip: $('#chipcolor'), box: $('#boxcolor') };
  const colorListEl = $('#colorlist');
  const readInputs = () => { const o = {}; FIELDS.forEach(k => { o[k] = INP[k].value.toLowerCase(); }); return o; };
  const curMode = () => document.body.classList.contains('darkmode') ? 'dark' : 'light';
  let flipping = false;   // true while a color change itself switches dark mode (the main colors must not be re-applied then)

  // Applies a color set: the 6 colors and everything derived from them become CSS variables on <body> (style.css uses only these).
  function paint(c) {
    FIELDS.forEach(k => { INP[k].value = c[k]; });
    const ffg = isDarkHex(c.footer) ? '#f5f5f5' : '#222222';
    const cfg = isDarkHex(c.chip) ? '#aaaaaa' : '#222222';
    const vars = {
      '--text': c.text, '--bg': c.bg,
      '--accent': c.accent, '--accent-bg': c.accent + '22', '--on-accent': onColor(c.accent),
      '--selection': mixHex(c.accent, '#ffffff', 0.33),
      '--footer': c.footer, '--footer-fg': ffg, '--nav-fg': ffg + '77',
      '--line': mixHex(c.footer, ffg, 0.35), '--track': mixHex(c.footer, ffg, 0.2),
      '--chip': c.chip, '--chip-fg': cfg, '--chip-hover': mixHex(c.chip, cfg, 0.12),
      '--box': c.box, '--box-fg': isDarkHex(c.box) ? '#f5f5f5' : '#222222'
    };
    Object.keys(vars).forEach(k => document.body.style.setProperty(k, vars[k]));
    document.documentElement.style.backgroundColor = c.bg;
    colorLine = 'color: ' + c.text + '; background-color: ' + c.bg + ';';
    const d = DEFAULT_THEME[curMode()];
    colorCss = c.text !== d.text || c.bg !== d.bg ? 'color: ' + c.text + '; background-color: ' + c.bg + ';' : '';
    applyStyles();
    renderColors();
  }
  // switch the whole UI to dark / light mode without re-applying the main colors
  function forceDark(dark) {
    if (neg.checked === dark) return;
    flipping = true; neg.checked = dark; neg.dispatchEvent(new Event('change')); flipping = false;
  }
  // a chosen color set: a dark background switches the UI to dark mode, a light one to light mode
  function setColors(c) { forceDark(isDarkHex(c.bg)); paint(c); }
  const applyThemeColors = () => paint(themeColors[curMode()]);
  FIELDS.forEach(k => INP[k].addEventListener('input', () => setColors(readInputs())));
  // the dark-mode button: back to the main colors of the mode it switches to
  neg.addEventListener('change', () => { if (!flipping) applyThemeColors(); });

  const ICON = { light: icn('light_mode'), dark: icn('dark_mode') };

  function renderColors() {
    sortColors();
    colorListEl.textContent = '';
    const cur = readInputs();
    ['light', 'dark'].forEach(mode => {
      const box = document.createElement('span');
      box.className = 'cgroupbox ' + mode;
      box.title = (mode === 'light' ? 'Light' : 'Dark') + ' mode colors';
      const ic = document.createElement('span');
      ic.className = 'cgicon'; ic.innerHTML = ICON[mode];   // static markup
      box.appendChild(ic);
      colors.filter(c => c.mode === mode).forEach(c => {
        const chip = document.createElement('span');
        chip.className = 'chip cchip' + (colorEq(c, cur) ? ' active' : '');
        // the chip shows the text + background colors of the preset
        chip.style.background = c.bg; chip.style.color = c.text;
        const nb = document.createElement('button');
        nb.type = 'button'; nb.className = 'chipname';
        nb.textContent = shorten(c.name, CHIP_MAX);
        nb.title = c.name + ' (' + mode + ' mode)\n' + FIELDS.map(k => FIELD_LABEL[k].replace(' color', '') + ' ' + c[k]).join(' · ');
        nb.addEventListener('click', () => { fadeTheme(); setColors(c); });   // chosen from the list: smooth change
        chip.appendChild(nb);
        const eb = document.createElement('button');
        eb.type = 'button'; eb.className = 'chipe' + (isCoreColor(c) ? ' last' : '');
        eb.innerHTML = icn('edit'); eb.title = 'Edit';
        eb.addEventListener('click', () => openColorModal(c));
        chip.appendChild(eb);
        if (!isCoreColor(c)) {   // Light / Dark: no remove button
          const xb = document.createElement('button');
          xb.type = 'button'; xb.className = 'chipx'; xb.innerHTML = icn('close'); xb.title = 'Remove';
          xb.addEventListener('click', () => { colors.splice(colors.indexOf(c), 1); saveColors(); renderColors(); });
          chip.appendChild(xb);
        }
        box.appendChild(chip);
      });
      colorListEl.appendChild(box);
    });
  }

  // Set to light / dark mode: the colors on screen (the selected preset) become the main colors of that mode
  function setThemeMode(mode) {
    themeColors[mode] = readInputs();
    saveTheme();
    if (curMode() === mode) applyThemeColors();
    flash(mode === 'dark' ? 'Dark set' : 'Light set');
  }
  $('#colorlight').addEventListener('click', () => setThemeMode('light'));
  $('#colordark').addEventListener('click', () => setThemeMode('dark'));

  // restore: missing built-in colors come back and the list is sorted again (light group, then dark, A→Z)
  $('#colorreset').addEventListener('click', () => {
    const miss = PRESET_COLORS.filter(p => !colors.some(c => c.name === p.name && c.mode === p.mode));
    if (!miss.length) { flash('Nothing missing'); return; }
    colors.push(...miss.map(cleanColor));
    saveColors(); renderColors();
    flash(miss.length + ' restored');
  });

  // import: same name + same mode → updated if different, otherwise skipped; new ones are added. Returns how many changed.
  function mergeColors(list) {
    let n = 0;
    list.filter(validColor).map(cleanColor).forEach(c => {
      const ex = colors.find(x => x.name === c.name && x.mode === c.mode);
      if (ex) {
        if (colorEq(ex, c)) return;
        FIELDS.forEach(k => { ex[k] = c[k]; });
      } else colors.push(c);
      n++;
    });
    if (n) { saveColors(); renderColors(); }
    return n;
  }

  /* --- "add color" dialog (name + the 6 colors, each with hex code and color picker) --- */
  const cmodal = document.createElement('div');
  cmodal.id = 'colormodal';
  cmodal.innerHTML =
    '<div class="tm-card">' +
      '<label for="cmname">Name</label>' +
      '<input id="cmname" type="text" dir="auto" autocomplete="off" maxlength="40">' +
      FIELDS.map(k =>
        '<label for="cm_' + k + '">' + FIELD_LABEL[k] + '</label>' +
        '<div class="tm-color"><input id="cm_' + k + '" type="text" dir="ltr" maxlength="7" autocomplete="off" autocapitalize="off" spellcheck="false" placeholder="#rrggbb">' +
        '<input id="cm_' + k + 'pick" type="color"></div>').join('') +
      '<div id="cmprev">Aa — sample text نمونه</div>' +
      '<label for="cmmode">Group</label>' +
      '<select id="cmmode"><option value="light">Light mode</option><option value="dark">Dark mode</option></select>' +
      '<div class="tm-actions">' +
        '<button type="button" class="btn" id="cmcancel">Cancel</button>' +
        '<button type="button" class="btn primary" id="cmsave">Save</button>' +
      '</div>' +
    '</div>';
  document.body.appendChild(cmodal);
  const cmName = $('#cmname'), cmPrev = $('#cmprev'), cmMode = $('#cmmode');
  const CM = {};
  FIELDS.forEach(k => { CM[k] = { t: $('#cm_' + k), p: $('#cm_' + k + 'pick') }; });
  let cmPrevState = null, cmModeTouched = false, cmEditing = null;   // cmEditing: the color item being edited (null = adding a new one)

  // every change here is applied to the page at once, so you see the colors you are adding
  function cmLive() {
    const c = {};
    FIELDS.forEach(k => { c[k] = normHex(CM[k].t.value) || INP[k].value.toLowerCase(); });
    setColors(c);
    cmPrev.style.color = c.text; cmPrev.style.background = c.bg; cmPrev.style.borderBottom = '4px solid ' + c.accent;
    if (!cmModeTouched) cmMode.value = isDarkHex(c.bg) ? 'dark' : 'light';
  }
  FIELDS.forEach(k => {
    CM[k].t.addEventListener('input', () => { const h = normHex(CM[k].t.value); if (h) CM[k].p.value = h; cmLive(); });
    CM[k].p.addEventListener('input', () => { CM[k].t.value = CM[k].p.value; cmLive(); });
  });
  cmMode.addEventListener('change', () => { cmModeTouched = true; });

  function openColorModal(edit) {
    const c = readInputs();
    cmPrevState = { colors: c, dark: neg.checked };   // what comes back on Cancel
    cmEditing = edit || null;
    if (edit) {
      cmName.value = edit.name;
      FIELDS.forEach(k => { CM[k].t.value = CM[k].p.value = edit[k]; });
      cmMode.value = edit.mode;
      cmModeTouched = true;
      // Light / Dark are built in: their name and group stay fixed
      cmName.disabled = cmMode.disabled = isCoreColor(edit);
      setColors(edit);   // show the colors being edited right away
    } else {
      cmName.value = '';
      FIELDS.forEach(k => { CM[k].t.value = CM[k].p.value = c[k]; });
      cmModeTouched = false;
      cmMode.value = isDarkHex(c.bg) ? 'dark' : 'light';
      cmName.disabled = cmMode.disabled = false;
    }
    const s = edit || c;
    cmPrev.style.fontFamily = target.style.fontFamily || 'inherit';
    cmPrev.style.color = s.text; cmPrev.style.background = s.bg; cmPrev.style.borderBottom = '4px solid ' + s.accent;
    cmodal.classList.add('open');
    if (!cmName.disabled) cmName.focus();
  }
  // cancel: the colors (and mode) from before the dialog come back
  function cancelColorModal() {
    if (!cmodal.classList.contains('open')) return;
    cmodal.classList.remove('open');
    cmEditing = null;
    if (cmPrevState) { fadeTheme(); forceDark(cmPrevState.dark); paint(cmPrevState.colors); }   // back to the old colors: smooth change
  }
  function saveColorModal() {
    const c = {};
    for (const k of FIELDS) {
      c[k] = normHex(CM[k].t.value);
      if (!c[k]) { flashErr(CM[k].t); return; }
    }
    const mode = cmMode.value;
    const name = cmName.value.trim() || c.text + ' on ' + c.bg;
    if (cmEditing) {
      // another item with the same name in the same group would be ambiguous
      if (colors.some(x => x !== cmEditing && x.name === name && x.mode === mode)) { flashErr(cmName); return; }
      if (!isCoreColor(cmEditing)) { cmEditing.name = name.slice(0, 40); cmEditing.mode = mode; }
      FIELDS.forEach(k => { cmEditing[k] = c[k]; });
      cmEditing = null;
    } else {
      const ex = colors.find(x => x.name === name && x.mode === mode);
      if (ex) FIELDS.forEach(k => { ex[k] = c[k]; }); else colors.push(cleanColor({ name, mode, ...c }));
    }
    saveColors();
    cmodal.classList.remove('open');
    paint(c);
  }
  $('#coloradd').addEventListener('click', () => openColorModal());
  $('#cmcancel').addEventListener('click', cancelColorModal);
  $('#cmsave').addEventListener('click', saveColorModal);
  cmodal.addEventListener('mousedown', e => { if (e.target === cmodal) cancelColorModal(); });
  cmName.addEventListener('keydown', e => { if (e.key === 'Enter') { e.preventDefault(); CM.text.t.focus(); } });
  document.addEventListener('keydown', e => { if (e.key === 'Escape') cancelColorModal(); });
  // Layout Colors button: swaps the normal Layout controls for the color settings
  const colorToggle = $('#colortoggle');
  colorToggle.addEventListener('click', () => {
    const before = secEl().scrollLeft;
    const on = $('.pc-tab section .tab1').classList.toggle('colormode');
    colorToggle.classList.toggle('on', on);
    setBtn(colorToggle, on ? 'Back' : 'Layout Settings', on ? 'expand_more' : 'expand_less');
    slideIn($(on ? '#colorgroup' : '#layoutbasic'));
    updateT3();
    on ? swapScroll('tab1', 'colors', before) : swapScroll('colors', 'tab1', before);
    requestAnimationFrame(updateBubbles);
  });
  renderColors();

  /* --- global UI scale (0.2x - 5x), saved in localStorage ---
     The - / + buttons move one logarithmic step (about 3.3%) at a time: 100 steps cover 0.2x - 5x and step 50 is exactly 1x.
     While the scale is far from 1x a "reset" badge is shown. It is counter-zoomed (zoom = 1 / scale), so it keeps its normal size
     and position and can always be reached, even when the zoomed footer is too big to use. */
  const SCALE_KEY = 'fft-scale';
  const SCALE_STEPS = 100, SCALE_MIN = 0.2;
  const scaleVal = $('#scaleval'), scaleMinus = $('#scaleminus'), scalePlus = $('#scaleplus');
  let uiScale = 1, scalePos = 50;
  const posToScale = t => Math.round(SCALE_MIN * Math.pow(25, t / SCALE_STEPS) * 1000) / 1000;
  const scaleToPos = v => Math.round(SCALE_STEPS * Math.log(v / SCALE_MIN) / Math.log(25));
  const rescue = document.createElement('button');
  rescue.id = 'scalerescue'; rescue.type = 'button';
  document.body.appendChild(rescue);
  rescue.addEventListener('click', () => setScale(1));
  function setScale(v, save, pos) {
    v = Math.min(5, Math.max(0.2, +v || 1));
    uiScale = v;
    scalePos = pos != null ? pos : scaleToPos(v);
    document.documentElement.style.zoom = v === 1 ? '' : v;
    const shown = +v.toFixed(2) + 'x';
    scaleVal.textContent = shown;
    scaleMinus.disabled = scalePos <= 0;
    scalePlus.disabled = scalePos >= SCALE_STEPS;
    const far = v > 1.25 || v < 0.8;
    rescue.classList.toggle('on', far);
    rescue.style.zoom = far ? 1 / v : '';
    rescue.textContent = 'Reset scale · ' + shown;
    if (save !== false) { try { localStorage.setItem(SCALE_KEY, String(v)); } catch (e) {} }
    requestAnimationFrame(() => { updateBubbles(); scheduleGuides(); if (glyphOn) updateGlyphSize(); });
  }
  const stepScale = d => {
    const p = Math.min(SCALE_STEPS, Math.max(0, scalePos + d));
    if (p !== scalePos) setScale(posToScale(p), true, p);
  };
  scaleMinus.addEventListener('click', () => stepScale(-1));
  scalePlus.addEventListener('click', () => stepScale(1));
  $('#scalereset').addEventListener('click', () => setScale(1));
  {
    let s = 1;
    try { s = parseFloat(localStorage.getItem(SCALE_KEY)) || 1; } catch (e) {}
    setScale(s, false);
  }

  /* --- footer rows (1 - 6), saved in localStorage ---
     1 = the normal single row. With more rows, packRows() fills row 1 first and moves to row 2 only when row 1 is full.
     When the items do not fit in the page width even with all rows, they run left to right through the rows with (about)
     equal row widths, so every row overflows the page by the same amount and the whole tab scrolls horizontally. */
  const ROWS_KEY = 'fft-rows', ROWS_MAX = 6, ROW_GAP = 8;
  const rowsVal = $('#rowsval'), rowsMinus = $('#rowsminus'), rowsPlus = $('#rowsplus');
  let frows = 1;
  const ROW_TABS = ['tab1', 'tab2', 'tab3', 'tab5', 'tab6'];
  // containers whose children are laid out as if they were direct children of the tab (display: contents in multirow mode)
  const FLAT = new Set(['layoutbasic', 'colorgroup', 'axesgroup', 'instgroup', 'testgroup', 'wikigroup', 'glyphgroup',
    'axes', 'features', 'instances', 'fontlist', 'testlist', 'wikilangs', 'colorlist', 'justgroup', 'justsets']);

  let wantScroll = null, pendingReveal = null;   // see swapScroll / revealAfterPack
  const REORDER = true;   // false = never move items to fill gaps (original order only)
  const isSep = el => el.classList.contains('vsep');
  // width of an item including its horizontal margins (the vertical separators have 6px each side)
  const outerW = el => {
    const cs = getComputedStyle(el);
    return el.offsetWidth + (parseFloat(cs.marginLeft) || 0) + (parseFloat(cs.marginRight) || 0);
  };

  function unpackRows() {
    $$('.rowbrk').forEach(x => x.remove());
    $$('[data-rb]').forEach(x => { x.style.marginInlineStart = ''; x.removeAttribute('data-rb'); });
    $$('[data-ord]').forEach(x => { x.style.order = ''; x.removeAttribute('data-ord'); });
    $$('.sepoff').forEach(x => x.classList.remove('sepoff'));
    ROW_TABS.forEach(id => { const c = $('.pc-tab section .' + id); if (c) c.style.width = ''; });
  }
  function leafItems(el, out) {
    for (const c of el.children) {
      if (c.classList.contains('rowbrk') || c.classList.contains('hidden')) continue;
      const cs = getComputedStyle(c);
      if (cs.display === 'none') continue;
      if (FLAT.has(c.id)) { leafItems(c, out); continue; }
      if (cs.position === 'fixed' || cs.position === 'absolute') continue;   // status / css-preview lines
      if (c.offsetWidth > 0) out.push(c);
    }
  }
  function packRowsInner() {
    unpackRows();
    if (frows < 2) return;
    const id = ROW_TABS.find(t => document.getElementById(t).checked);
    const box = id && $('.pc-tab section .' + id);
    if (!box) return;
    const cg = parseFloat(getComputedStyle(box).columnGap);
    const gap = isNaN(cg) ? ROW_GAP : cg;   // the real gap of this tab's row (CSS --rgap)
    const W = secEl().clientWidth;
    if (!W) return;
    const items = [];
    leafItems(box, items);
    if (!items.length) return;
    const ww = new Map(items.map(it => [it, outerW(it)]));
    const w = it => ww.get(it);
    let rows = [[]], widths = [0];
    const total = items.reduce((s, it) => s + w(it), 0) + gap * Math.max(0, items.length - 1);
    const LIM = W - 8;   // a little slack: widths are rounded, and a row that is 1px too wide would wrap by itself

    if (total / frows <= LIM) {
      // Everything fits inside the page width. Items are split into groups by the vertical separators. Rows are filled
      // from the top; when the next member of a group does not fit in the rest of the row, the first later member of the
      // SAME group that fits is moved up, so rows keep as little empty space as possible. Groups keep their order.
      const groups = [];
      let sep = null, cur = [];
      const flush = () => { if (cur.length) groups.push({ sep: groups.length ? sep : null, list: cur }); cur = []; };
      items.forEach(it => { if (isSep(it)) { flush(); sep = it; } else cur.push(it); });
      flush();
      const put = it => {
        const r = rows.length - 1;
        widths[r] = rows[r].length ? widths[r] + gap + w(it) : w(it);
        rows[r].push(it);
      };
      const fits = it => { const r = rows.length - 1; return !rows[r].length || widths[r] + gap + w(it) <= LIM; };
      groups.forEach(g => {
        if (g.sep && fits(g.sep)) put(g.sep);          // if it ends a row it is hidden afterwards
        const pend = g.list.slice();
        while (pend.length) {
          let i = REORDER ? pend.findIndex(fits) : (fits(pend[0]) ? 0 : -1);
          if (i < 0) {
            if (rows.length < frows) { rows.push([]); widths.push(0); continue; }
            i = 0;                                      // last row: the rest overflows and scrolls
          }
          put(pend.splice(i, 1)[0]);
        }
      });
    } else {
      // Too much for the page: items go left to right through the rows, split so that all rows get (about) the same width
      // (minimum sum of squared row widths), so every row overflows the page by the same amount and they scroll together
      const m = items.length, nr = Math.min(frows, m), P = [0];
      items.forEach((it, i) => P.push(P[i] + w(it) + gap));
      const rw = (j, i) => P[i] - P[j] - gap;
      const dp = [], from = [];
      for (let r = 0; r <= nr; r++) { dp.push(new Array(m + 1).fill(Infinity)); from.push(new Array(m + 1).fill(0)); }
      dp[0][0] = 0;
      for (let r = 1; r <= nr; r++) for (let i = r; i <= m; i++) for (let k = r - 1; k < i; k++) {
        const c = dp[r - 1][k] + rw(k, i) * rw(k, i);
        if (c < dp[r][i]) { dp[r][i] = c; from[r][i] = k; }
      }
      const cuts = [];
      for (let r = nr, i = m; r > 0; r--) { cuts.unshift(from[r][i]); i = from[r][i]; }
      rows = cuts.map((start, r) => items.slice(start, r + 1 < cuts.length ? cuts[r + 1] : m));
      widths = [];
    }

    // a separator at the start or the end of a row (or one that was not placed at all) is hidden
    rows.forEach(row => {
      while (row.length && isSep(row[0])) row.shift().classList.add('sepoff');
      while (row.length && isSep(row[row.length - 1])) row.pop().classList.add('sepoff');
    });
    rows = rows.filter(r => r.length);
    widths = rows.map(row => row.reduce((s, it, i) => s + w(it) + (i ? gap : 0), 0));
    const placed = new Set(rows.flat());
    items.forEach(it => { if (isSep(it) && !placed.has(it)) it.classList.add('sepoff'); });

    // visual order (CSS order, the DOM is not touched), a line break before every row after the first, and the centering offset
    let k = 0;
    rows.forEach((row, r) => {
      row.forEach(it => { it.setAttribute('data-ord', ''); it.style.order = (++k) * 2; });
      const first = row[0];
      first.setAttribute('data-rb', '');
      first.style.marginInlineStart = Math.max(0, Math.floor((W - widths[r]) / 2)) + 'px';
      if (r > 0) {
        const brk = document.createElement('i');
        brk.className = 'rowbrk';
        brk.style.order = String(+first.style.order - 1);
        first.parentNode.insertBefore(brk, first);
      }
    });
    box.style.width = Math.max(W, Math.max(...widths) + 8) + 'px';
  }
  // Packing resets the width of the row for a moment (so the items can be measured), and the browser clamps the horizontal scroll
  // position while it is narrow: without this the position jumped back whenever something in the footer changed.
  function packRows() {
    const sec = secEl();
    const keep = wantScroll != null ? wantScroll : sec.scrollLeft;
    wantScroll = null;
    packRowsInner();
    if (sec.scrollLeft !== keep) sec.scrollLeft = keep;
    if (sec.scrollTop) sec.scrollTop = 0;   // (hidden overflow can still be scrolled by scrollIntoView in the unpacked layout)
    if (pendingReveal) { const sel = pendingReveal; pendingReveal = null; revealNow(sel); }
  }
  function revealNow(sel) {
    const el = [...secEl().querySelectorAll(sel)].find(e => e.offsetWidth > 0);
    if (el) (el.closest('.font-slider') || el).scrollIntoView({ block: 'nearest', inline: 'nearest' });
  }
  function revealAfterPack(sel) {
    if (frows < 2) { revealNow(sel); return; }
    pendingReveal = sel;
    setTimeout(() => { if (pendingReveal === sel) pendingReveal = null; }, 400);
  }
  let packRaf = 0;
  const schedulePack = () => { if (packRaf) return; packRaf = requestAnimationFrame(() => { packRaf = 0; packRows(); }); };
  // repack when the content of the footer changes (not for our own line breaks)
  const outOfFlow = n => { const el = n.nodeType === 1 ? n : n.parentElement; return !!(el && el.closest('.status, .right-side-header, .slider-value')); };
  new MutationObserver(recs => {
    if (recs.every(r => outOfFlow(r.target) ||
        (r.type === 'childList' && [...r.addedNodes, ...r.removedNodes].every(n => n.classList && n.classList.contains('rowbrk'))))) return;
    schedulePack();
  }).observe($('.pc-tab section'), { childList: true, subtree: true, characterData: true });
  ROW_TABS.forEach(id => new MutationObserver(schedulePack).observe($('.pc-tab section .' + id), { attributes: true, attributeFilter: ['class'] }));
  if (window.ResizeObserver) new ResizeObserver(schedulePack).observe($('.pc-tab section'));
  window.addEventListener('resize', schedulePack);
  ['tab1', 'tab2', 'tab3', 'tab4', 'tab5', 'tab6'].forEach(id => document.getElementById(id).addEventListener('change', schedulePack));

  function setRows(n, save) {
    n = Math.min(ROWS_MAX, Math.max(1, Math.round(+n) || 1));
    frows = n;
    document.body.style.setProperty('--frows', n);
    document.body.classList.toggle('multirow', n > 1);
    rowsVal.textContent = n;
    rowsMinus.disabled = n <= 1;
    rowsPlus.disabled = n >= ROWS_MAX;
    if (save !== false) { try { localStorage.setItem(ROWS_KEY, String(n)); } catch (e) {} }
    schedulePack();
    requestAnimationFrame(() => { updateBubbles(); scheduleGuides(); if (glyphOn) updateGlyphSize(); });
  }
  rowsMinus.addEventListener('click', () => setRows(frows - 1));
  rowsPlus.addEventListener('click', () => setRows(frows + 1));
  try { setRows(parseInt(localStorage.getItem(ROWS_KEY), 10) || 1, false); } catch (e) { setRows(1, false); }

  /* =================== Text box helpers =================== */
  // Two separate text boxes: #Test (tests) and #Wiki (Wikipedia article). They never mix.
  const testBox = $('#Test');
  const tab6El  = $('.tab6');
  const boxP = box => box && box.querySelector('p[contenteditable]');

  const WIKI_HINT = 'Fetch an article (you need an internet connection)';
  const wikiBox = document.createElement('div');
  wikiBox.id = 'Wiki'; wikiBox.className = 'tabcontent'; wikiBox.style.display = 'none';
  testBox.after(wikiBox);
  const glyphBox = document.createElement('div');
  glyphBox.id = 'Glyphs'; glyphBox.className = 'tabcontent'; glyphBox.style.display = 'none';
  wikiBox.after(glyphBox);

  let viewWiki = false, viewGlyph = false;   // which box is on screen
  let wikiOn = false, glyphOn = false;       // Wiki / Whole characters buttons in the Test tab (never both on)
  const wikiToggle = $('#wikitoggle'), glyphToggle = $('#glyphtoggle');
  let modeNow = 'test';
  function setMode(m) {
    const before = secEl().scrollLeft;
    const changed = m !== modeNow, prevMode = modeNow;
    modeNow = m;
    wikiOn = viewWiki = m === 'wiki';
    glyphOn = viewGlyph = m === 'glyph';
    tab6El.classList.toggle('wikimode', wikiOn);
    tab6El.classList.toggle('glyphmode', glyphOn);
    wikiToggle.classList.toggle('on', wikiOn);
    glyphToggle.classList.toggle('on', glyphOn);
    setBtn(wikiToggle, wikiOn ? 'Back' : 'Wiki', wikiOn ? 'expand_more' : 'expand_less');
    setBtn(glyphToggle, glyphOn ? 'Back' : 'Glyph List', glyphOn ? 'expand_more' : 'expand_less');
    if (glyphOn) renderGlyphs();
    syncView();
    if (changed) {
      slideIn($(wikiOn ? '#wikigroup' : glyphOn ? '#glyphgroup' : '#testgroup'));
      swapScroll(prevMode === 'test' ? 'tab6' : prevMode, m === 'test' ? 'tab6' : m, before);
    }
  }
  const setWikiMode = on => setMode(on ? 'wiki' : 'test');
  wikiToggle.addEventListener('click', () => { setWikiMode(!wikiOn); updateAbout(); });
  glyphToggle.addEventListener('click', () => { setMode(glyphOn ? 'test' : 'glyph'); updateAbout(); });
  // captions under each glyph: Unicode value / glyph name (remembered)
  const capUni = $('#gshowuni'), capName = $('#gshownames'), CAP_KEY = 'fft-gcaps';
  try { const j = JSON.parse(localStorage.getItem(CAP_KEY)); if (j) { capUni.checked = !!j.u; capName.checked = !!j.n; } } catch (e) {}
  const syncCaps = () => {
    glyphBox.classList.toggle('cap-u', capUni.checked);
    glyphBox.classList.toggle('cap-n', capName.checked);
    try { localStorage.setItem(CAP_KEY, JSON.stringify({ u: capUni.checked, n: capName.checked })); } catch (e) {}
  };
  [capUni, capName].forEach(el => el.addEventListener('change', () => { syncCaps(); updateGlyphSize(); }));
  syncCaps();
  $('#glyphcopy').addEventListener('click', () => {
    const ch = active && active.info && active.info.chars;
    if (ch && ch.length) { copyText(ch.map(c => String.fromCodePoint(c)).join('')); flash('Copied'); }
  });
  function syncView() {
    testBox.style.display = (viewWiki || viewGlyph) ? 'none' : 'block';
    wikiBox.style.display = viewWiki ? 'block' : 'none';
    glyphBox.style.display = viewGlyph ? 'block' : 'none';
    if (viewGlyph) updateGlyphSize();
    scheduleGuides();
    if (justOn) scheduleJust();
  }

  // "Whole characters": every character of the active font (from its cmap), shown in batches
  const GLYPH_STEP = 2500, GAP = 6, FILL = 0.9;
  // the text shown in a cell: combining marks get a dotted circle to sit on
  // The base character is taken from the font itself: if the font has no dotted circle (◌), the mark would be
  // drawn after a fallback-font base and the browser would also take the mark from that other font.
  function withBase(str) {
    if (!/^\p{M}/u.test(str)) return str;
    const arab = /^\p{scx=Arabic}/u.test(str);
    const have = active && active.info && active.info.bases;
    const order = arab ? [0x25CC, 0x640, 0xA0, 0x20, 0x627] : [0x25CC, 0xA0, 0x20];   // dotted circle, tatweel, no-break space, space, alef
    const cp = have ? order.find(c => have.includes(c)) : 0x25CC;
    return cp ? String.fromCodePoint(cp) + str : str;
  }
  const shownStr = cp => withBase(String.fromCodePoint(cp));
  const recipeStr = r => {
    const t = withBase(r.s);
    return r.ctx === 'init' ? t + '\u200D' : r.ctx === 'medi' ? '\u200D' + t + '\u200D' : r.ctx === 'fina' ? '\u200D' + t : t;
  };
  const recipeCss = r => Object.keys(r.f).map(t => '"' + t + '" ' + r.f[t]).join(', ');

  // Ink extents of every character (em units, measured on a canvas at 100px) and the reference extents:
  // a high percentile, so a few huge glyphs (like ﷽) don't shrink all the others. Bigger glyphs take several cells.
  function glyphExtents(chars) {
    const g = active.gext;
    if (g && g.family === active.family && g.n === chars.length) return g;
    const cx = glyphExtents.cx || (glyphExtents.cx = document.createElement('canvas').getContext('2d'));
    cx.font = '100px ' + active.css;
    const n = chars.length, half = new Float32Array(n), asc = new Float32Array(n), desc = new Float32Array(n);
    for (let i = 0; i < n; i++) {
      const m = cx.measureText(shownStr(chars[i]));
      half[i] = Math.max(0, m.actualBoundingBoxLeft + m.width / 2, m.actualBoundingBoxRight - m.width / 2) / 100;
      asc[i] = Math.max(0, m.actualBoundingBoxAscent) / 100;
      desc[i] = Math.max(0, m.actualBoundingBoxDescent) / 100;
    }
    const pct = (a, p, pos) => { const b = (pos ? a.filter(x => x > 0) : a).slice().sort(); return b.length ? b[Math.min(b.length - 1, Math.floor(b.length * p))] : 0; };
    const ref = { half: pct(half, .95, true) || .5, asc: pct(asc, .98, true) || .5, desc: pct(desc, .98, false) };
    return (active.gext = { family: active.family, n, half, asc, desc, ref });
  }

  // half-widths (em) of the glyphs without Unicode, measured in the DOM because canvas can't apply OpenType features
  function extraHalves(list) {
    const box = document.createElement('div');
    box.style.cssText = 'position:absolute;left:-99999px;top:0;visibility:hidden;white-space:nowrap;font-size:100px;line-height:1;font-family:' + active.css;
    list.forEach(r => {
      const sp = document.createElement('span');
      sp.style.cssText = 'display:inline-block;font-feature-settings:' + (recipeCss(r) || 'normal');
      sp.textContent = recipeStr(r);
      box.appendChild(sp);
    });
    document.body.appendChild(box);
    const w = [...box.children].map(sp => sp.getBoundingClientRect().width / 200);
    box.remove();
    return Float32Array.from(w);
  }

  // where the browser puts the baseline inside a line box (r = top -> baseline, h = content height; both in em)
  const probeCache = {};
  function probeFont(ff) {
    if (probeCache[ff]) return probeCache[ff];
    const d = document.createElement('div');
    d.style.cssText = 'position:absolute;left:-9999px;top:0;visibility:hidden;white-space:nowrap;font-size:1000px;line-height:normal;font-family:' + ff;
    d.innerHTML = '<span>x</span><span style="display:inline-block;width:0;height:0"></span>';
    document.body.appendChild(d);
    const a = d.firstChild.getBoundingClientRect(), b = d.lastChild.getBoundingClientRect();
    d.remove();
    return (probeCache[ff] = { r: (b.bottom - a.top) / 1000, h: a.height / 1000 });
  }

  // One glyph size for the whole table: the largest at which a typical (reference) glyph fits in one cell.
  // Glyphs that are wider (or taller) than that take as many cells as they need, so nothing is clipped and
  // one huge glyph doesn't shrink the rest. The Size slider only changes the cell width; the Height slider changes the row height.
  function updateGlyphSize() {
    const grid = glyphBox.querySelector('.glyphgrid');
    if (!grid || !grid.__ext) return;
    const capU = capUni.checked, capN = capName.checked, lines = (capU ? 1 : 0) + (capN ? 1 : 0);
    const capH = lines ? lines * 13 + 7 : 0;   // caption strip at the bottom of each cell
    $$('.glyphgrid', glyphBox).forEach(g => g.style.setProperty('--minc', capN ? '84px' : capU ? '64px' : '0px'));
    const cols = getComputedStyle(grid).gridTemplateColumns.split(' ').filter(Boolean);
    const cw = parseFloat(cols[0]), nc = cols.length;
    if (!cw) return;   // box not on screen
    const R = grid.__ext.ref;
    const S = Math.max(1, Math.min(FILL * cw / (2 * R.half), FILL * cw / (R.asc + R.desc)));
    // the Height slider (line-height, in em of the glyph size) sets the height of every row: HA = glyph area, RH = row (+ caption)
    const HA = S * (+heightIn.value || 1.5), RH = HA + capH;
    const p = probeFont(target.style.fontFamily || 'sans-serif');
    const k = 0.5 + p.r - p.h / 2;                                       // baseline inside a 1em line box
    const ybRef = (HA - (R.asc + R.desc) * S) / 2 + R.asc * S;           // common baseline, from the top of a cell
    $$('.glyphgrid', glyphBox).forEach(g => {
      g.style.gridAutoRows = RH + 'px';
      g.style.setProperty('--caph', capH + 'px');
      g.style.setProperty('--gs', S.toFixed(2) + 'px');
      g.style.setProperty('--gt', (ybRef - k * S).toFixed(2) + 'px');
      const x = g.__ext, cells = g.children;
      for (let i = 0; i < cells.length; i++) {
        const c = cells[i];
        const need = 2 * x.half[i] * S;
        let n = 1;
        while (n < nc && need > FILL * (n * cw + (n - 1) * GAP)) n++;
        const own = x.asc[i] > R.asc || x.desc[i] > R.desc;              // taller than the reference: own baseline
        let r = 1;
        if (own) { const nh = (x.asc[i] + x.desc[i]) * S; while (r < 8 && nh > FILL * (r * RH + (r - 1) * GAP - capH)) r++; }
        const H = r * RH + (r - 1) * GAP - capH;   // height of the glyph area (without the caption)
        const gt = own ? ((H - (x.asc[i] + x.desc[i]) * S) / 2 + x.asc[i] * S - k * S).toFixed(1) : '';
        const key = n + ',' + r + ',' + gt;
        if (c.__k !== key) {
          c.__k = key;
          c.style.gridColumn = n > 1 ? 'span ' + n : '';
          c.style.gridRow = r > 1 ? 'span ' + r : '';
          if (gt) c.style.setProperty('--gt', gt + 'px'); else c.style.removeProperty('--gt');
        }
      }
    });
    scheduleGuides();   // glyph size/position are set via styles, so redraw the guides afterwards
  }

  // caption strip of a cell: Unicode value and glyph name (which lines are visible depends on the two checkboxes)
  function mkCap(uni, gid, names) {
    const c = document.createElement('div'), u = document.createElement('div'), n = document.createElement('div');
    c.className = 'cap'; u.className = 'cu'; n.className = 'cn';
    u.textContent = uni;
    const nm = names && names[gid];
    n.textContent = nm || '#' + gid;
    if (!nm) n.classList.add('dim');   // the font has no name for this glyph: its number is shown instead
    c.append(u, n);
    return c;
  }

  function renderGlyphs() {
    glyphBox.textContent = '';
    const info = active && active.info, chars = info && info.chars, ex = info && info.extra, names = info && info.names;
    const mkLab = () => { const l = document.createElement('p'); l.className = 'sizelabel'; l.dir = 'ltr'; return l; };
    const lab = mkLab();
    glyphBox.appendChild(lab);
    if (!chars || !chars.length) {
      lab.textContent = 'No character list: the fallback font, and fonts whose tables can\'t be read, have none';
      return;
    }
    lab.textContent = titleOf(active) + ' — ' + chars.length + ' characters' +
      (ex && ex.total ? ' + ' + ex.total + ' glyphs without a Unicode value' : '') + ' (click one to copy it)';
    const grid = document.createElement('div');
    grid.className = 'glyphgrid'; grid.dir = 'ltr';
    grid.__ext = glyphExtents(chars);
    const more = document.createElement('button');
    more.type = 'button'; more.className = 'btn outline glyphmore';
    let shown = 0;
    const add = () => {
      const end = Math.min(chars.length, shown + GLYPH_STEP), frag = document.createDocumentFragment();
      for (; shown < end; shown++) {
        const cp = chars[shown];
        const d = document.createElement('div');
        d.className = 'glyph'; d.dataset.cp = cp;
        const hex = 'U+' + cp.toString(16).toUpperCase().padStart(4, '0');
        const gid = info.gids ? info.gids[shown] : 0;
        d.title = hex + (names && names[gid] ? ' — ' + names[gid] : '') + (gid ? ' (glyph #' + gid + ')' : '');
        const sp = document.createElement('span');   // size and position come from updateGlyphSize
        sp.textContent = shownStr(cp);
        d.appendChild(sp);
        d.appendChild(mkCap(hex, gid, names));
        frag.appendChild(d);
      }
      grid.appendChild(frag);
      more.hidden = shown >= chars.length;
      more.textContent = 'Show more (' + (chars.length - shown) + ' left)';
      updateGlyphSize();
    };
    grid.addEventListener('click', e => {
      const c = e.target.closest('.glyph');
      if (c) { copyText(String.fromCodePoint(+c.dataset.cp)); flash('Copied'); }
    });
    more.addEventListener('click', add);
    glyphBox.append(grid, more);
    add();

    // glyphs without a Unicode value (alternates, ligatures, joining forms…)
    if (ex && ex.total) {
      const list = ex.list, lab2 = mkLab();
      const miss = Math.max(0, ex.total - list.length);
      lab2.textContent = 'Glyphs without a Unicode value: ' + list.length + ' shown' +
        (miss ? ', ' + miss + ' can\'t be drawn from text (only used inside contextual rules, as components, or unused)' : '') +
        (list.length ? ' (click one to copy its text)' : '');
      glyphBox.appendChild(lab2);
      if (list.length) {
        const g2 = document.createElement('div');
        g2.className = 'glyphgrid'; g2.dir = 'ltr';
        g2.__ext = { half: extraHalves(list), asc: new Float32Array(list.length), desc: new Float32Array(list.length), ref: grid.__ext.ref };
        list.forEach(r => {
          const d = document.createElement('div');
          d.className = 'glyph'; d.__txt = recipeStr(r);
          d.title = 'glyph #' + r.g + ' — ' + (r.ctx ? 'joining form: ' + r.ctx : 'feature: ' + recipeCss(r));
          const sp = document.createElement('span');
          sp.style.fontFeatureSettings = recipeCss(r) || 'normal';
          sp.textContent = d.__txt;
          d.appendChild(sp);
          d.appendChild(mkCap('—', r.g, names));
          g2.appendChild(d);
        });
        g2.addEventListener('click', e => {
          const c = e.target.closest('.glyph');
          if (c) { copyText(c.__txt); flash('Copied'); }
        });
        glyphBox.appendChild(g2);
      }
    }
    updateGlyphSize();
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
    const box = [testBox, wikiBox, glyphBox].find(b => b.style.display !== 'none');
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
      const cell = n.parentElement.closest('.glyph');
      const cr = cell ? cell.getBoundingClientRect() : null;   // Glyph List: lines span the whole cell
      for (const g of lines.values()) {
        const yb = (g.t - dyn.top) / uiScale + ratio * cs.fs;
        const x1 = ((cr ? cr.left : g.l) - dyn.left) / uiScale, x2 = ((cr ? cr.right : g.r) - dyn.left) / uiScale;
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
  if (window.ResizeObserver) { let jW = 0; new ResizeObserver(() => { scheduleGuides(); if (viewGlyph) updateGlyphSize(); if (justOn && target.clientWidth !== jW) { jW = target.clientWidth; scheduleJust(); } }).observe(target); }
  window.addEventListener('resize', scheduleGuides);
  if (document.fonts && document.fonts.addEventListener) document.fonts.addEventListener('loadingdone', scheduleGuides);

  /* =================== Text alignment: Right / Left / Justify (radio buttons; none selected = the text's own alignment) =================== */
  let curAlign = '';
  $$('input[name="align"]').forEach(r => r.addEventListener('click', () => {
    if (justOn) setJustify(false);   // a picked alignment and kashida justification exclude each other
    if (curAlign === r.value) { r.checked = false; curAlign = ''; }   // click the active one again to go back to the default
    else curAlign = r.value;
    target.classList.remove('al-right', 'al-center', 'al-left', 'al-justify');
    if (curAlign) target.classList.add('al-' + curAlign);
    scheduleGuides();
  }));

  /* =================== Justify with kashida (Raqim Kashida, MIT: https://github.com/aliftype/raqim-kashida) ===================
     Layout tab: "Justify" turns it on, "Justify Settings" opens the settings.
     How it works: the library (WebAssembly, loaded the first time Justify is turned on) tells where in a word a kashida (tatweel, U+0640)
     may be inserted and how good each place is (priority 1 = best ... 9 = worst). For every line of every paragraph the free space left at
     the end of the line is measured; the lines are then filled with as many tatweels as fit (best places first). What is left over
     (less than one tatweel, plus the part kept back by "Fill") is spread by the browser's own text-align: justify.
     The text stays editable: the inserted tatweels are remembered, so an edit is merged back into the original text and the text is justified again.
     Turning Justify off gives the (edited) original text back. */
  const JUST_KEY = 'fft-just', JPAT_KEY = 'fft-justpat';
  const JNAMES = [['arabic-naskh', 'Naskh'], ['arabic-nastaliq', 'Nastaliq'], ['arabic-simple', 'Simple'], ['syriac', 'Syriac']];
  const JUST_DEF = { set: 'arabic-naskh', fill: 100, prio: 7, word: 3, point: 2, last: false, clean: true };
  const cleanJust = o => {
    const d = { ...JUST_DEF };
    if (!o || typeof o !== 'object') return d;
    const num = (v, lo, hi, def) => typeof v === 'number' && isFinite(v) ? Math.min(hi, Math.max(lo, Math.round(v))) : def;
    if (typeof o.set === 'string' && o.set.length < 80) d.set = o.set;
    d.fill = num(o.fill, 0, 100, d.fill); d.prio = num(o.prio, 1, 9, d.prio);
    d.word = num(o.word, 1, 12, d.word); d.point = num(o.point, 1, 6, d.point);
    if (typeof o.last === 'boolean') d.last = o.last;
    if (typeof o.clean === 'boolean') d.clean = o.clean;
    return d;
  };
  let jset = { ...JUST_DEF };
  try { jset = cleanJust(JSON.parse(localStorage.getItem(JUST_KEY))); } catch (e) {}
  let customPat = null;   // { name, text }: a .pat file loaded by the user
  try {
    const j = JSON.parse(localStorage.getItem(JPAT_KEY));
    if (j && typeof j.name === 'string' && typeof j.text === 'string' && j.text.length < 2e6) customPat = j;
  } catch (e) {}
  if (jset.set === 'custom' && !customPat) jset.set = JUST_DEF.set;
  const saveJust = () => { try { localStorage.setItem(JUST_KEY, JSON.stringify(jset)); } catch (e) {} };

  const justChk = $('#justifytoggle'), justToggle = $('#justtoggle'), justGroup = $('#justgroup');
  let kash = null, kashP = null;          // the library module (loaded on first use)
  const jSets = {};                       // compiled pattern sets by name
  const jWord = new Map();                // word -> { cl: cleaned word, pts: [{ i, p }] }
  const jOrig = new Map();                // text node -> its original text
  const jShown = new Map();               // text node -> { s: the text last written to it, ins: 1 for every inserted tatweel }
  let jProbe = null;

  // kashida.bundle.js is a classic script (the wasm is embedded in it): import() / fetch() are blocked on file://, a <script> is not
  function loadKashida() {
    if (!kashP) {
      kashP = new Promise((res, rej) => {
        if (window.Kashida) return res(window.Kashida);
        const sc = document.createElement('script');
        sc.src = 'kashida.bundle.js?v=1';
        sc.onload = () => window.Kashida ? res(window.Kashida) : rej(new Error('kashida.bundle.js loaded but empty'));
        sc.onerror = () => rej(new Error('kashida.bundle.js not found next to index.html'));
        document.head.appendChild(sc);
      }).then(async K => { await K.init(); return K; }).catch(e => { kashP = null; throw e; });
    }
    return kashP;
  }
  function justLine() { return '/* kashida: ' + (jset.set === 'custom' && customPat ? customPat.name : jset.set) + ', priority <= ' + jset.prio + ', fill ' + jset.fill + '% */ text-align: justify;'; }

  function getJSet() {
    let name = jset.set;
    if (name === 'custom' && customPat) {
      if (!jSets.custom) {
        try { jSets.custom = kash.compilePatternText(customPat.text); }
        catch (e) { flash('Bad .pat'); name = JUST_DEF.set; }
      }
      if (jSets.custom) return jSets.custom;
    }
    if (name === 'custom') name = JUST_DEF.set;
    if (!jSets[name]) jSets[name] = kash.builtinPatternSet(name) || kash.builtinPatternSet(JUST_DEF.set);
    return jSets[name];
  }
  function jWordInfo(w) {
    const k = jset.set + (jset.clean ? '1' : '0') + '|' + w;
    let r = jWord.get(k);
    if (r) return r;
    try {
      const res = kash.findKashidaPoints(w, getJSet(), jset.clean);
      r = { cl: res[0], pts: (res[1] || []).map(p => ({ i: p.index, p: p.priority })) };
    } catch (e) { r = { cl: w, pts: [] }; }
    jWord.set(k, r);
    return r;
  }

  const RE_JW = /(?:[\p{Script=Arabic}\p{Script=Syriac}]|\p{Mn}|\u0640)+/gu;   // a run of Arabic / Syriac letters + marks
  const RE_JA = /[\p{Script=Arabic}\p{Script=Syriac}]/u;
  const RE_PRES = /[\uFB50-\uFDFF\uFE70-\uFEFF]/;                               // presentation forms: already shaped, left alone
  const TATWEEL = '\u0640';

  // put the original text back (also used before reading the text on screen)
  function jRestoreText() {
    jOrig.forEach((o, n) => {
      if (!n.isConnected) { jOrig.delete(n); jShown.delete(n); return; }
      jSyncNode(n);                       // the user may have typed into it
      o = jOrig.get(n);
      if (n.nodeValue !== o) n.nodeValue = o;
      jShown.delete(n);
    });
  }
  // The text of a node was edited since we wrote it: find out what the user changed (common start / end of the old and new text;
  // the inserted tatweels outside the changed part are still ours) and make the original text follow. Returns the "ins" flags.
  function jSyncNode(n) {
    const sh = jShown.get(n), cur = n.nodeValue;
    if (!sh || cur === sh.s) return sh ? sh.ins : null;
    const a = sh.s, mx = Math.min(a.length, cur.length);
    let p = 0, q = 0;
    while (p < mx && a[p] === cur[p]) p++;
    while (q < mx - p && a[a.length - 1 - q] === cur[cur.length - 1 - q]) q++;
    const ins = new Array(cur.length).fill(0);
    for (let i = 0; i < p; i++) ins[i] = sh.ins[i] || 0;
    for (let i = 0; i < q; i++) ins[cur.length - 1 - i] = sh.ins[a.length - 1 - i] || 0;
    let o = '';
    for (let i = 0; i < cur.length; i++) if (!ins[i]) o += cur[i];
    jOrig.set(n, o);
    jShown.set(n, { s: cur, ins });
    return ins;
  }
  // a text node -> parts: plain strings and word objects (the word without kashida + the places where a tatweel may go)
  function jBuild(n) {
    const s = jOrig.get(n), nd = { node: n, parts: [], words: [], plain: '' };
    let last = 0, out = '';
    RE_JW.lastIndex = 0;
    for (let m; (m = RE_JW.exec(s));) {
      const w = m[0];
      if (m.index > last) { const t = s.slice(last, m.index); nd.parts.push(t); out += t; }
      if (RE_PRES.test(w) || !RE_JA.test(w)) { nd.parts.push(w); out += w; }
      else {
        const inf = jWordInfo(w), wo = { cl: inf.cl, pts: inf.pts, start: out.length, add: null, tot: 0 };
        nd.parts.push(wo); nd.words.push(wo); out += inf.cl;
      }
      last = m.index + w.length;
    }
    if (last < s.length) { const t = s.slice(last); nd.parts.push(t); out += t; }
    nd.plain = out;
    n.nodeValue = out;
    jShown.set(n, { s: out, ins: [] });
    return nd;
  }

  // does a forced line break (<br>) follow this text node?
  function jHard(n) {
    let x = n.nextSibling;
    while (x && x.nodeType === 3 && !/\S/.test(x.nodeValue)) x = x.nextSibling;
    return !!x && x.nodeName === 'BR';
  }

  // the width of one tatweel between two letters, measured in this block's font (same units as getBoundingClientRect)
  function jTatweel(blk) {
    const p = jProbe || (jProbe = document.createElement('span'));
    p.style.cssText = 'position:absolute;left:0;top:0;visibility:hidden;white-space:pre;';
    blk.appendChild(p);
    p.textContent = '\u0628\u0628';
    const a = p.getBoundingClientRect().width;
    p.textContent = '\u0628' + TATWEEL + '\u0628';
    const b = p.getBoundingClientRect().width;
    p.remove();
    return b - a;
  }

  // available line width of a block (columns: the width of one column) + where the columns are, in getBoundingClientRect units
  function jGeo(blk) {
    const box = (el, k) => {
      const cs = getComputedStyle(el), r = el.getBoundingClientRect();
      const f = k == null ? (el.offsetWidth ? r.width / el.offsetWidth : 1) : k;
      const pl = (parseFloat(cs.paddingLeft) || 0) + (parseFloat(cs.borderLeftWidth) || 0);
      const pr = (parseFloat(cs.paddingRight) || 0) + (parseFloat(cs.borderRightWidth) || 0);
      return { cs, r, f, pl, pr, w: r.width - (pl + pr) * f };
    };
    let el = blk.parentElement, colEl = null;
    for (; el && el !== target; el = el.parentElement) {
      const c = getComputedStyle(el).columnCount;
      if (c !== 'auto' && +c > 1) { colEl = el; break; }
    }
    if (colEl) {
      const b = box(colEl), n = +b.cs.columnCount;
      const gap = parseFloat(b.cs.columnGap) || parseFloat(b.cs.fontSize) || 0;
      const colW = (b.w / b.f - (n - 1) * gap) / n * b.f;
      return { avail: colW, step: (colW + gap * b.f), x0: b.r.left + b.pl * b.f };
    }
    return { avail: box(blk).w, step: 0, x0: 0 };
  }

  // one box per measurable piece of text: a word-like token (non-space run), with its position
  function jBoxes(nds) {
    const range = document.createRange(), out = [];
    nds.forEach(nd => {
      const s = nd.node.nodeValue, hard = jHard(nd.node), endAt = s.trimEnd().length;
      for (const m of s.matchAll(/\S+/g)) {
        range.setStart(nd.node, m.index); range.setEnd(nd.node, m.index + m[0].length);
        const rs = [...range.getClientRects()].filter(r => r.width > 0.01 && r.height > 0.01);
        if (!rs.length) continue;
        const tok = { nd, start: m.index, end: m.index + m[0].length, hard: hard && m.index + m[0].length === endAt };
        const cy0 = (rs[0].top + rs[0].bottom) / 2, broken = rs.some(r => Math.abs((r.top + r.bottom) / 2 - cy0) > r.height * 0.6);
        if (broken) {   // a token that wraps by itself (very long word / url): its pieces count for the lines but never get kashida
          rs.forEach(r => out.push({ tok, l: r.left, r: r.right, cy: (r.top + r.bottom) / 2, h: r.height, elig: false }));
        } else {
          out.push({
            tok, l: Math.min(...rs.map(r => r.left)), r: Math.max(...rs.map(r => r.right)),
            cy: cy0, h: rs[0].height, elig: true
          });
        }
      }
    });
    return out;
  }
  function jCluster(boxes, geo) {
    const items = boxes.map(b => ({ ...b, col: geo.step ? Math.floor(((b.l + b.r) / 2 - geo.x0) / geo.step) : 0 }));
    items.sort((a, b) => a.col - b.col || a.cy - b.cy);
    const cl = [];
    items.forEach(it => {
      const c = cl[cl.length - 1];
      if (c && c.col === it.col && Math.abs(it.cy - c.cy) < it.h * 0.6) {
        c.items.push(it); c.l = Math.min(c.l, it.l); c.r = Math.max(c.r, it.r);
      } else cl.push({ col: it.col, cy: it.cy, items: [it], l: it.l, r: it.r });
    });
    return cl;
  }

  // look at the block as it is (plain text, no kashida) and note the free space of every line
  function jAnalyse(blk, nds) {
    const boxes = jBoxes(nds);
    if (!boxes.length) return null;
    const tw = jTatweel(blk);
    if (!(tw > 0.5)) return null;
    const geo = jGeo(blk), clusters = jCluster(boxes, geo);
    const lastTok = boxes[boxes.length - 1].tok;
    const margin = Math.max(1.5, tw * 0.03);   // safety: a line filled to the last pixel could wrap because of rounding
    clusters.forEach(c => {
      c.slack = geo.avail - (c.r - c.l) - margin;
      const last = c.items.some(i => i.tok === lastTok), hard = c.items.some(i => i.tok.hard);
      c.skip = ((last || hard) && !jset.last) || c.items.some(i => !i.elig);
      c.words = [];
      c.items.forEach(i => {
        if (!i.elig) return;
        i.tok.nd.words.forEach(w => { if (w.start >= i.tok.start && w.start < i.tok.end) c.words.push(w); });
      });
    });
    return { clusters, tw, count: clusters.length };
  }

  // give n tatweels to the places of these words: best priority first, then the next one; at most "per point" at one place and
  // "per word" in one word
  function jAlloc(words, n) {
    const cand = [];
    words.forEach((w, wi) => w.pts.forEach(p => {
      if (p.p <= jset.prio) cand.push({ w, i: p.i, p: p.p, o: (wi * 7919 + p.i * 104729) % 997, cnt: 0 });
    }));
    if (!cand.length) return;
    cand.sort((a, b) => a.p - b.p || a.o - b.o);   // "o" spreads equal priorities over the line
    const tiers = [...new Set(cand.map(c => c.p))];
    for (const tier of tiers) {
      for (let r = 1; r <= jset.point && n > 0; r++) {
        for (const c of cand) {
          if (n <= 0) break;
          if (c.p !== tier || c.cnt >= r || c.w.tot >= jset.word) continue;
          c.cnt++; c.w.tot++; n--;
          (c.w.add || (c.w.add = {}))[c.i] = c.cnt;
        }
      }
    }
  }
  // the text of a node with its tatweels, and which characters are inserted ones
  function jNodeText(nd) {
    let s = '';
    const ins = [];
    nd.parts.forEach(p => {
      if (typeof p === 'string') { s += p; for (let i = 0; i < p.length; i++) ins.push(0); return; }
      for (let i = 0; i < p.cl.length; i++) {
        s += p.cl[i]; ins.push(0);
        const k = p.add && p.add[i];
        for (let j = 0; j < (k || 0); j++) { s += TATWEEL; ins.push(1); }
      }
    });
    return { s, ins };
  }
  function jApply(nds, base, fac) {
    nds.forEach(nd => nd.words.forEach(w => { w.add = null; w.tot = 0; }));
    const fill = jset.fill / 100 * fac;
    base.clusters.forEach(c => {
      if (c.skip || !c.words.length) return;
      const n = Math.floor(c.slack * fill / base.tw);
      if (n > 0) jAlloc(c.words, n);
    });
    nds.forEach(nd => {
      if (!nd.words.length) return;
      const t = jNodeText(nd);
      nd.node.nodeValue = t.s;
      jShown.set(nd.node, t);
    });
  }

  function jBlock(blk, nds) {
    const base = jAnalyse(blk, nds);
    if (!base) return;
    let fac = 1;
    for (let a = 0; a < 4; a++) {
      jApply(nds, base, fac);
      // the tatweels must never make a line wrap: if the block got more lines, use fewer tatweels and try again
      if (jCluster(jBoxes(nds), jGeo(blk)).length <= base.count) return;
      fac *= 0.7;
    }
    nds.forEach(jPlain);
  }
  function jPlain(nd) { nd.node.nodeValue = nd.plain; jShown.set(nd.node, { s: nd.plain, ins: [] }); }

  function runJustify() {
    jTimer = 0;
    if (!justOn || !kash) return;
    const box = [testBox, wikiBox].find(b => b.style.display !== 'none');
    // the caret: remembered as "n-th real character of its text node" (inserted tatweels don't count), put back afterwards
    let caret = null;
    const sel = window.getSelection();
    if (box && sel && sel.rangeCount && sel.isCollapsed && sel.anchorNode && sel.anchorNode.nodeType === 3 && box.contains(sel.anchorNode)) {
      const ins = jSyncNode(sel.anchorNode);
      let L = sel.anchorOffset;
      if (ins) for (let i = 0; i < sel.anchorOffset; i++) if (ins[i]) L--;
      caret = { n: sel.anchorNode, L };
    }
    jRestoreText();
    if (!box || viewGlyph) return;
    target.classList.remove('kjust');   // measure the lines as they are, not already stretched
    try {
      const ch = active && active.info && active.info.chars;
      if (ch && !ch.includes(0x640)) {
        if (active.noTat !== true) { active.noTat = true; flash('No tatweel'); }   // without U+0640 in the font the kashida would come from another font
        return;
      }
      const blocks = new Map(), tw = document.createTreeWalker(box, NodeFilter.SHOW_TEXT);
      for (let n; (n = tw.nextNode());) {
        const pe = n.parentElement;
        if (!pe || !/\S/.test(n.nodeValue) || pe.closest('.sizelabel, #guidesvg, .wikihint, .slider-value')) continue;
        if (!jOrig.has(n)) jOrig.set(n, n.nodeValue);
        const blk = pe.closest('p, li, div') || pe;
        if (!blocks.has(blk)) blocks.set(blk, []);
        blocks.get(blk).push(jBuild(n));
      }
      blocks.forEach((nds, blk) => { try { jBlock(blk, nds); } catch (e) { console.error(e); nds.forEach(jPlain); } });
    } finally {
      target.classList.add('kjust');
      if (caret && caret.n.isConnected) {
        const sh = jShown.get(caret.n);
        let off = 0, k = 0;
        if (sh) { while (off < sh.s.length && k < caret.L) { if (!sh.ins[off]) k++; off++; } }
        else off = Math.min(caret.L, caret.n.nodeValue.length);
        try { window.getSelection().collapse(caret.n, off); } catch (e) {}
      }
      scheduleGuides();
    }
  }
  function scheduleJust() {
    if (!justOn) return;
    clearTimeout(jTimer);
    jTimer = setTimeout(runJustify, 120);
  }

  async function setJustify(on) {
    justChk.checked = on;
    if (on) {
      if (curAlign) {   // a picked alignment would fight with the justification
        $$('input[name="align"]').forEach(r => { r.checked = false; });
        curAlign = '';
        target.classList.remove('al-right', 'al-center', 'al-left', 'al-justify');
      }
      try { kash = await loadKashida(); }
      catch (e) { console.error(e); justChk.checked = false; flash('Load failed'); return; }
      if (!justChk.checked) return;   // turned off while the library was loading
      justOn = true;
      runJustify();
    } else {
      justOn = false;
      clearTimeout(jTimer); jTimer = 0;
      jRestoreText(); jOrig.clear(); jShown.clear();
      target.classList.remove('kjust');
      scheduleGuides();
    }
  }
  justChk.addEventListener('change', () => setJustify(justChk.checked));
  // typing: merge the edit and justify again (not in the middle of an IME composition)
  target.addEventListener('input', e => { if (justOn && !e.isComposing) scheduleJust(); });
  target.addEventListener('compositionend', () => scheduleJust());

  /* --- Justify Settings (sub-menu of the Layout tab) --- */
  justToggle.addEventListener('click', () => {
    const before = secEl().scrollLeft;
    const on = tab1Row.classList.toggle('justmode');
    justToggle.classList.toggle('on', on);
    slideIn($(on ? '#justgroup' : '#layoutbasic'));
    updateT3();
    on ? swapScroll('tab1', 'just', before) : swapScroll('just', 'tab1', before);
    requestAnimationFrame(updateBubbles);
  });

  const justChanged = () => { saveJust(); jWord.clear(); updateT3(); scheduleJust(); };
  const justSetsEl = document.createElement('div');
  justSetsEl.id = 'justsets';
  const jSliders = {}, jChecks = {};

  function renderJustSets() {
    justSetsEl.textContent = '';
    const mk = (code, label, title, removable) => {
      const chip = document.createElement('span');
      chip.className = 'chip outline' + (jset.set === code ? ' active' : '');
      const nb = document.createElement('button');
      nb.type = 'button'; nb.className = 'chipname' + (removable ? '' : ' nox');
      nb.textContent = shorten(label, CHIP_MAX); nb.title = title;
      nb.addEventListener('click', () => { jset.set = code; renderJustSets(); justChanged(); });
      chip.appendChild(nb);
      if (removable) {
        const xb = document.createElement('button');
        xb.type = 'button'; xb.className = 'chipx'; xb.innerHTML = icn('close'); xb.title = 'Remove this pattern file';
        xb.addEventListener('click', () => {
          customPat = null; delete jSets.custom;
          try { localStorage.removeItem(JPAT_KEY); } catch (e) {}
          if (jset.set === 'custom') jset.set = JUST_DEF.set;
          renderJustSets(); justChanged();
        });
        chip.appendChild(xb);
      }
      justSetsEl.appendChild(chip);
    };
    JNAMES.forEach(([code, label]) => mk(code, label, 'Raqim Kashida pattern set: ' + code, false));
    if (customPat) mk('custom', customPat.name, 'Your pattern file: ' + customPat.name, true);
  }

  function buildJustUI() {
    justGroup.textContent = '';
    renderJustSets();
    justGroup.appendChild(justSetsEl);

    // own .pat file
    const patBtn = document.createElement('button');
    patBtn.type = 'button'; patBtn.className = 'btn';
    setBtn(patBtn, 'Pattern', 'folder_open');
    patBtn.title = 'Load your own pattern file (.pat, the Raqim Kashida pattern format)';
    const patIn = document.createElement('input');
    patIn.type = 'file'; patIn.accept = '.pat,.txt,text/plain'; patIn.hidden = true;
    patBtn.addEventListener('click', () => patIn.click());
    patIn.addEventListener('change', async () => {
      const f = patIn.files[0]; patIn.value = '';
      if (!f) return;
      try {
        const text = await f.text();
        kash = await loadKashida();
        const set = kash.compilePatternText(text);   // throws when the file is not a valid pattern file
        customPat = { name: f.name, text };
        jSets.custom = set; jset.set = 'custom';
        try { localStorage.setItem(JPAT_KEY, JSON.stringify(customPat)); } catch (e) {}
        renderJustSets(); justChanged();
        flash('Loaded');
      } catch (e) { console.error(e); flash('Bad .pat'); }
    });
    justGroup.append(patBtn, patIn);

    const slider = (key, label, min, max, fmt, title) => {
      const { p, inp } = makeSlider({
        id: 'just_' + key, label: label + ':', min, max, step: 1, value: jset[key],
        onInput: v => { jset[key] = v; justChanged(); }
      });
      p.title = title;
      justGroup.appendChild(p);
      attachBubble(inp, fmt);
      jSliders[key] = inp;
    };
    slider('fill', 'Fill', 0, 100, v => v + '%', 'How much of the free space of a line is filled with kashida. The rest (and whatever is smaller than one kashida) is spread between the words.');
    slider('prio', 'Quality', 1, 9, null, 'Worst kashida place that may be used (1 = only the best places ... 9 = every place the pattern knows). Lines that cannot be filled with the allowed places keep more word spacing.');
    slider('word', 'Per word', 1, 12, null, 'At most this many kashidas in one word');
    slider('point', 'Per point', 1, 6, null, 'At most this many kashidas at one place (the elongation of one joint)');

    const chk = (key, label, title) => {
      const p = document.createElement('p'); p.className = 'font-slider';
      const cb = document.createElement('input');
      cb.type = 'checkbox'; cb.className = 'hidden'; cb.id = 'just_' + key; cb.autocomplete = 'off'; cb.checked = jset[key];
      cb.addEventListener('change', () => { jset[key] = cb.checked; justChanged(); });
      const lb = document.createElement('label'); lb.htmlFor = cb.id; lb.textContent = label; lb.title = title;
      p.append(cb, lb);
      justGroup.appendChild(p);
      jChecks[key] = cb;
    };
    chk('last', 'Last lines', 'Also fill the last line of a paragraph and the lines that end with a line break (with kashida only)');
    chk('clean', 'Replace kashida', 'Remove the kashidas that are already in the text before adding new ones (otherwise they stay where they are)');

    const rst = document.createElement('button');
    rst.type = 'button'; rst.className = 'btn';
    rst.innerHTML = icn('restart_alt'); rst.title = 'Reset the justification settings to their defaults';
    rst.addEventListener('click', () => { setJustSettings(JUST_DEF); flash('Reset'); });
    justGroup.appendChild(rst);

    const a = document.createElement('a');
    a.className = 'jcredit'; a.href = 'https://github.com/aliftype/raqim-kashida'; a.target = '_blank'; a.rel = 'noopener';
    a.textContent = 'Raqim Kashida · MIT';
    justGroup.appendChild(a);
  }
  // used by Reset and by the backup import: apply a whole settings object to the controls
  function setJustSettings(o) {
    jset = cleanJust(o);
    if (jset.set === 'custom' && !customPat) jset.set = JUST_DEF.set;
    Object.keys(jSliders).forEach(k => { jSliders[k].value = jset[k]; jSliders[k].dispatchEvent(new Event('input')); });
    Object.keys(jChecks).forEach(k => { jChecks[k].checked = jset[k]; });
    renderJustSets(); justChanged();
  }
  buildJustUI();

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
    if (justOn) scheduleJust();
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
    if (!tests.length) hint(testListEl, 'No tests — add one or restore the built-in ones');
    tests.forEach(t => {
      const chip = document.createElement('span');
      chip.className = 'chip' + (t === activeTest ? ' active' : '');
      const nb = document.createElement('button');
      nb.type = 'button'; nb.className = 'chipname';
      nb.textContent = shorten(t.name, CHIP_MAX); nb.title = t.name;
      nb.addEventListener('click', () => showTest(t));
      const xb = document.createElement('button');
      xb.type = 'button'; xb.className = 'chipx'; xb.innerHTML = icn('close'); xb.title = 'Remove';
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
    b.type = 'button'; b.className = 'btn'; b.innerHTML = icn(txt); b.title = title;
    (parent || $('#testgroup')).insertBefore(b, parent ? null : dangerZone);
    return b;
  };
  const importBtn  = mkBtn('folder_open', 'Import a backup file (tests, features and colors are added, settings are applied)');
  const exportBtn  = mkBtn('download', 'Export a backup file: tests, colors, your OpenType features and settings (fft-backup.json)');
  // danger zone (separate, at the end of the row): restore built-in tests, purge local storage
  const restoreBtn = mkBtn('restart_alt', 'Danger zone: add back the built-in tests that are missing', dangerZone);
  const purgeBtn   = mkBtn('delete', 'Danger zone: purge local storage (delete everything FFT saved in this browser)', dangerZone);
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
    const settings = { dark: neg.checked, autoReload: autoOn, wikiLang: wikiLangIn.value.trim().toLowerCase(), themeColors, scale: uiScale, rows: frows, hoverTabs: hoverTabs.checked, justify: jset };
    const data = JSON.stringify({ app: 'FFT', version: 1, settings, tests: out, features: feats, colors: colors.map(cleanColor) }, null, 2);
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
    if (st.themeColors && typeof st.themeColors === 'object') {
      ['light', 'dark'].forEach(k => {
        const t = st.themeColors[k];
        const f = fillColors(t, k);
        if (f) { themeColors[k] = f; n++; }
      });
      saveTheme();
    }
    if (typeof st.dark === 'boolean' || st.themeColors) applyThemeColors();
    if (typeof st.scale === 'number' && st.scale >= 0.2 && st.scale <= 5) { setScale(st.scale); n++; }
    if (typeof st.rows === 'number') { setRows(st.rows); n++; }
    if (typeof st.hoverTabs === 'boolean') {
      hoverTabs.checked = st.hoverTabs; syncHoverTabs();
      try { localStorage.setItem(HOVER_KEY, st.hoverTabs ? '1' : '0'); } catch (e) {}
      n++;
    }
    if (st.justify && typeof st.justify === 'object') { setJustSettings(st.justify); n++; }
    return n;
  }

  // Merge: add new tests, skip duplicates (same name + same text). Only "name", "text", "about", "author" and "link" are read.
  async function importTests(file) {
    let list, feats = [], cols = [], settings = null;
    try {
      const j = JSON.parse(await file.text());
      if (Array.isArray(j)) list = j;                       // older files: just an array of tests
      else if (j && typeof j === 'object') {
        list = Array.isArray(j.tests) ? j.tests : [];
        feats = Array.isArray(j.features) ? j.features : [];
        cols = Array.isArray(j.colors) ? j.colors : [];
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
    const cAdded = mergeColors(cols);
    if (added) saveTests();
    if (fAdded) { buildFeatures(); applyStyles(); }
    const sApplied = settings ? applySettings(settings) : 0;
    renderTests();
    updateAbout();
    flash(added + ' added' + (skipped ? ', ' + skipped + ' skipped' : '') + (fAdded ? ', ' + fAdded + ' features' : '') + (cAdded ? ', ' + cAdded + ' colors' : '') + (sApplied ? ', settings' : ''));
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
    if (justOn) { jRestoreText(); scheduleJust(); }   // the text on screen carries kashidas: take the original
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
    revealAfterPack('#testlist .chip.active');
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
    const has = viewGlyph ? !!(active && active.info && active.info.chars) : wm ? !!wikiInfo : !!(activeTest && (activeTest.about || activeTest.author || activeTest.link));
    aboutBtn.classList.toggle('off', !has);
    if (aboutPop.classList.contains('open')) fillAbout();
  }

  function fillAbout() {
    aboutPop.textContent = '';
    aboutPop.classList.remove('empty');
    if (viewGlyph) {
      const ch = active && active.info && active.info.chars;
      if (ch) {
        const b = document.createElement('b');
        b.textContent = titleOf(active); b.dir = 'auto';
        const d = document.createElement('div');
        d.textContent = ch.length + ' characters from the font\'s cmap table, plus the glyphs without a Unicode value that can be reached through GSUB features (alternates, ligatures, joining forms).';
        aboutPop.append(b, d);
      } else {
        aboutPop.textContent = 'No character list for this font';
        aboutPop.classList.add('empty');
      }
      return;
    }
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
      chip.className = 'chip outline' + (code === cur ? ' active' : '');
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
  [t1, t2, t3, statusEl, wikiStatus].forEach(el => el.addEventListener('click', () => { copyText(el.textContent); flash(); }));

  /* =================== Tabs: bubbles refresh =================== */
  const section = $('.pc-tab > section');
  ['tab1', 'tab2', 'tab3', 'tab4', 'tab5', 'tab6'].forEach(id => {
    const tab = document.getElementById(id);
    tab.addEventListener('change', () => {
      section.scrollLeft = 0;
      if (!tab.checked) return;
      const lb = $('.pc-tab nav .' + id + ' label');
      if (lb) lb.scrollIntoView({ block: 'nearest', inline: 'nearest' });   // tab bar scrolls when the UI scale is big
      // Test tab -> test text, or the article when the Wiki button is on. Other tabs keep whatever is on screen.
      if (id === 'tab6') { viewWiki = wikiOn; viewGlyph = glyphOn; syncView(); }
      updateAbout();
      requestAnimationFrame(updateBubbles);
      if (id === 'tab5') requestAnimationFrame(renderList);
      if (id === 'tab6') requestAnimationFrame(renderTests);
    });
  });
  window.addEventListener('resize', updateBubbles);
  // the sticky "↻ all / × all" group gets its shadow once the row has been scrolled
  section.addEventListener('scroll', () => $('.tab5').classList.toggle('scrolled', section.scrollLeft > 0), { passive: true });

  /* =================== Switch tabs by hover (mouse) / touch-drag (touch), optional: Layout Settings =================== */
  // Off by default: a tab only opens with a click (a mouse that brushes the tab names must not change the tab).
  // On: a mouse opens a tab after resting on its name for a moment; a finger that touches the tab names and slides
  // along them moves between the tabs (the tab names row does not scroll while this is on).
  const HOVER_KEY = 'fft-hovertabs';
  const hoverTabs = $('#hovertabs'), tabNav = $('.pc-tab nav');
  try { hoverTabs.checked = localStorage.getItem(HOVER_KEY) === '1'; } catch (e) {}
  const syncHoverTabs = () => document.body.classList.toggle('tabdrag', hoverTabs.checked);
  syncHoverTabs();
  hoverTabs.addEventListener('change', () => {
    syncHoverTabs();
    try { localStorage.setItem(HOVER_KEY, hoverTabs.checked ? '1' : '0'); } catch (e) {}
  });
  const goTab = id => { const r = id && document.getElementById(id); if (r && !r.checked) r.click(); };
  const navLabelId = el => { const lb = el && el.closest && el.closest('.pc-tab nav label'); return lb ? lb.htmlFor : ''; };
  let tabDragging = false;
  // mouse: the tab opens as soon as the mouse is over its name
  tabNav.addEventListener('pointerover', e => {
    if (!hoverTabs.checked || e.pointerType !== 'mouse') return;
    goTab(navLabelId(e.target));
  });
  // touch / pen: press on the tab names and slide; the tab whose name is nearest to the finger (horizontally) opens
  tabNav.addEventListener('pointerdown', e => { tabDragging = hoverTabs.checked && e.pointerType !== 'mouse'; });
  tabNav.addEventListener('pointermove', e => {
    if (!tabDragging) return;
    let best = '', dist = Infinity;
    $$('label', tabNav).forEach(lb => {
      const r = lb.getBoundingClientRect();
      if (!r.width) return;
      const d = e.clientX >= r.left && e.clientX <= r.right ? 0 : Math.abs(e.clientX - (r.left + r.right) / 2);
      if (d < dist) { dist = d; best = lb.htmlFor; }
    });
    goTab(best);
  });
  ['pointerup', 'pointercancel'].forEach(t => window.addEventListener(t, () => { tabDragging = false; }));

  /* Tabs open with a click. While the mouse is over the footer, the Left / Right arrow keys move between the tabs
     (in the order they are shown: Font, Layout, Test, Variation, OpenType, About). */
  const footerEl = $('footer');
  let overFooter = false;
  footerEl.addEventListener('mouseenter', () => { overFooter = true; });
  footerEl.addEventListener('mouseleave', () => { overFooter = false; });
  const TAB_ORDER = ['tab5', 'tab1', 'tab6', 'tab2', 'tab3', 'tab4'];
  // next / previous tab; after the last one it starts again from the first (and the other way round)
  function stepTab(dir) {
    const cur = TAB_ORDER.findIndex(id => document.getElementById(id).checked);
    const next = (cur + dir + TAB_ORDER.length) % TAB_ORDER.length;
    if (next !== cur) document.getElementById(TAB_ORDER[next]).click();
  }
  // deeper (+1) / back (-1) in the sub-menus of the current tab. Returns true when something changed.
  function stepMenu(dir) {
    const id = checkedTab();
    if (dir > 0) {
      if (id === 'tab1' && !tab1Row.classList.contains('colormode') && !tab1Row.classList.contains('justmode')) { colorToggle.click(); return true; }
      if (id === 'tab2' && !tab2Row.classList.contains('instmode')) { instToggle.click(); return true; }
      if (id === 'tab6') {
        if (!wikiOn && !glyphOn) { wikiToggle.click(); return true; }       // Test -> Wiki
        if (wikiOn) { setMode('glyph'); updateAbout(); return true; }        // Wiki -> Glyph List
      }
      return false;
    }
    if (id === 'tab6' && glyphOn) {                                          // Glyph List -> Wiki
      backing = true; setMode('wiki'); updateAbout();
      setTimeout(() => { backing = false; }, 60);
      return true;
    }
    if (footBar.classList.contains('submenu')) { backBar.click(); return true; }   // slide the open sub-menu away
    return false;
  }
  document.addEventListener('keydown', e => {
    if (!/^Arrow(Left|Right|Up|Down)$/.test(e.key) || !overFooter || e.ctrlKey || e.metaKey || e.altKey || e.shiftKey) return;
    const t = e.target;
    // never while typing: text fields, the editable text box, dialogs
    if (t && (t.isContentEditable || /^(INPUT|TEXTAREA|SELECT)$/.test(t.tagName) && t.type !== 'range' && t.type !== 'radio' && t.type !== 'checkbox' && t.type !== 'color')) return;
    if (document.querySelector('#testmodal.open, #colormodal.open')) return;
    if (e.key === 'ArrowUp' || e.key === 'ArrowDown') {
      // Up opens the sub-menu of the tab (Layout Settings, Instances; in Test: Wiki first, then Glyph List), Down closes it
      // in the same order, one step at a time. Tabs without a sub-menu leave the keys alone.
      if (stepMenu(e.key === 'ArrowUp' ? 1 : -1)) e.preventDefault();
      return;
    }
    e.preventDefault();   // also stops a focused slider / radio from reacting to the arrow
    stepTab(e.key === 'ArrowRight' ? 1 : -1);
  });

  // 3) mouse wheel over the footer: same as the arrow keys (wheel down = next tab, wheel up = previous tab).
  // Deltas are summed, so one notch of a mouse wheel = one tab, and a short pause after each switch keeps a
  // trackpad's inertia from spinning through all the tabs. Horizontal scrolling (deltaX) is left alone: it scrolls the row.
  let wheelAcc = 0, wheelLast = 0, wheelLock = 0;
  footerEl.addEventListener('wheel', e => {
    if (e.ctrlKey || e.metaKey || e.shiftKey || !e.deltaY || Math.abs(e.deltaX) > Math.abs(e.deltaY)) return;   // ctrl + wheel = browser zoom; shift + wheel = scrolls the row sideways
    if (document.querySelector('#testmodal.open, #colormodal.open')) return;
    e.preventDefault();
    const now = performance.now();
    if (now < wheelLock) return;
    if (now - wheelLast > 200) wheelAcc = 0;
    wheelLast = now;
    wheelAcc += e.deltaY;
    if (Math.abs(wheelAcc) < 40) return;
    stepTab(wheelAcc > 0 ? 1 : -1);
    wheelAcc = 0;
    wheelLock = now + 150;
  }, { passive: false });

  /* Shift + wheel = font size, Shift + Alt + wheel = line height (wheel up = larger).
     Works anywhere on the page except over the footer (there Shift + wheel keeps scrolling the row sideways).
     Browsers turn Shift + wheel into a horizontal delta, so whichever delta is bigger is used. */
  let kwAcc = 0, kwLast = 0;
  document.addEventListener('wheel', e => {
    if (!e.shiftKey || e.ctrlKey || e.metaKey) return;
    if (footerEl.contains(e.target)) return;
    if (document.querySelector('#testmodal.open, #colormodal.open')) return;
    const d = Math.abs(e.deltaY) >= Math.abs(e.deltaX) ? e.deltaY : e.deltaX;
    if (!d) return;
    e.preventDefault();
    const now = performance.now();
    if (now - kwLast > 200) kwAcc = 0;
    kwLast = now;
    kwAcc += d;
    const n = Math.trunc(kwAcc / 50);   // one notch of a mouse wheel = 2 steps
    if (!n) return;
    kwAcc -= n * 50;
    const sl = e.altKey ? heightIn : sizeIn;
    const unit = e.altKey ? 0.02 : 1;
    const min = parseFloat(sl.min), max = parseFloat(sl.max);
    const v = Math.min(max, Math.max(min, Math.round((+sl.value - n * unit) * 100) / 100));
    if (v === +sl.value) return;
    sl.value = v;
    sl.dispatchEvent(new Event('input'));
  }, { passive: false });

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
      // the click that follows a drag is swallowed; if it never comes (mouse released outside the row) the flag must not stay set
      setTimeout(() => { moved = false; }, 50);
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

  /* =================== Global back bar (top of the footer) =================== */
  // In a sub-menu (Layout Colors, Instances, Wiki, Glyph List) a thin full-width bar with a down arrow appears at the top
  // of the footer; one click goes back to the normal row of that tab.
  const footBar = $('footer');
  const backBar = document.createElement('button');
  backBar.id = 'backbar'; backBar.type = 'button'; backBar.innerHTML = icn('expand_more'); backBar.title = 'Back';
  footBar.appendChild(backBar);
  const tabRowIn = (id) => {
    if (id === 'tab1') return tab1Row.classList.contains('colormode') ? colorToggle : tab1Row.classList.contains('justmode') ? justToggle : null;
    if (id === 'tab2') return tab2Row.classList.contains('instmode') ? instToggle : null;
    if (id === 'tab6') return wikiOn ? wikiToggle : glyphOn ? glyphToggle : null;
    return null;
  };
  const checkedTab = () => ['tab1', 'tab2', 'tab3', 'tab4', 'tab5', 'tab6'].find(id => document.getElementById(id).checked);
  const syncBack = () => footBar.classList.toggle('submenu', !!tabRowIn(checkedTab()));
  const subGroup = id => id === 'tab1' ? (tab1Row.classList.contains('justmode') ? $('#justgroup') : $('#colorgroup')) : id === 'tab2' ? $('#instgroup') : wikiOn ? $('#wikigroup') : $('#glyphgroup');
  // back: the open sub-menu slides down and away, then the normal row of the tab comes back
  let finishBack = null;   // finishes the running "back" animation at once
  backBar.addEventListener('click', () => {
    // a second tap while the menu is still sliding out finishes the exit now, instead of being ignored
    if (backing) { if (finishBack) finishBack(); return; }
    const id = checkedTab(), b = tabRowIn(id), g = subGroup(id);
    if (!b) return;
    backing = true;
    let done = false;
    const targets = animTargets(g);
    const go = () => {
      if (done) return;
      done = true; finishBack = null;
      targets.forEach(t => t.classList.remove('slideout'));
      b.click();
      setTimeout(() => { backing = false; }, 60);
    };
    finishBack = go;
    targets.forEach(t => t.classList.add('slideout'));
    setTimeout(go, 240);   // the slide-out animation lasts .22s
  });
  ['tab1', 'tab2', 'tab3', 'tab4', 'tab5', 'tab6'].forEach(id => document.getElementById(id).addEventListener('change', syncBack));
  // touch: dragging down on the footer inside a sub-menu goes back (same as tapping the bar)
  {
    let tracking = false, sx = 0, sy = 0;
    footBar.addEventListener('touchstart', e => {
      tracking = false;
      if (!footBar.classList.contains('submenu') || e.touches.length !== 1) return;
      if (e.target.closest('input[type=range]')) return;
      tracking = true; sx = e.touches[0].clientX; sy = e.touches[0].clientY;
    }, { passive: true });
    footBar.addEventListener('touchmove', e => {
      if (!tracking) return;
      const dy = e.touches[0].clientY - sy, dx = e.touches[0].clientX - sx;
      if (dy > 22 && dy > Math.abs(dx) * 1.5) { tracking = false; backBar.click(); }
    }, { passive: true });
    ['touchend', 'touchcancel'].forEach(t => footBar.addEventListener(t, () => { tracking = false; }, { passive: true }));
  }
  const modeObs = new MutationObserver(syncBack);
  ['.tab1', '.tab2', '.tab6'].forEach(q => modeObs.observe($('.pc-tab section ' + q), { attributes: true, attributeFilter: ['class'] }));
  syncBack();

  /* =================== Init =================== */
  // Always start on the Font tab (browsers may restore the old radio state on refresh)
  $('#tab5').checked = true;
  section.scrollLeft = 0;

  addSystemFont();
  // Raqim Kashida: right after the page starts it is loaded and compiled in the background, so Justify is ready when the button is pressed.
  // If loading fails (e.g. the file is not next to index.html) this is silent; pressing the button tries again and shows the error.
  loadKashida().then(K => {
    kash = K;
    try { if (jset.set !== 'custom' && !jSets[jset.set]) jSets[jset.set] = K.builtinPatternSet(jset.set); } catch (e) {}
  }).catch(() => {});
  applyThemeColors();
  renderTests();
  {
    let last = '';
    try { last = localStorage.getItem(LAST_KEY) || ''; } catch (e) {}
    const start = tests.find(t => t.name === last) || tests.find(t => t.name === DEFAULT_TEST) || tests[0];
    if (start) showTest(start);   // last selected test (kept on refresh); first run: Farsi
    else updateAbout();
  }
})();
