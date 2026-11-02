#!/usr/bin/env node
/* Builds the light embed version of FFT from index.html, style.css and script.js:
   embed-frame.html, embed-frame.css and embed-frame.js, next to the full app (embed.js loads embed-frame.html).
   It also writes the version of the frame page into embed.js and embed-builder.html (cache busting).
   Run it after changing the full app:   node embed/build-embed.mjs   (from the root of the FFT repository)
   No dependencies (Node 16+).

   Markers in the source (the full app ignores them, they are comments):
     JS    //#if full … //#endif          block that exists only in the full app
           //#if full … //#else //= code … //#endif   the //= lines are the embed's version of that block
           code   //#full                 one line that exists only in the full app
           //#embed code                  one line that exists only in the embed
     HTML  <!--#if full--> … <!--#endif-->,   …   <!--#full-->   at the end of a line,   <!--#embed html-->   a line only the embed has
   CSS needs no markers: every rule whose selectors all point at something the embed doesn't have
   (REMOVED below) is dropped. Then comments and indentation are stripped (strings, templates and regexes are kept as they are). */
import { readFileSync, writeFileSync, existsSync } from 'node:fs';
import { createHash } from 'node:crypto';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

// The version of FFT-Embed itself: raise it when the embed changes (builder, loader, embed-only features).
// The version of FFT is read from the About tab of index.html.
const EMBED_VERSION = '1.0';

// Where things are: this script sits in embed/, next to embed.js and embed-builder.html; the full app is in ../FFT/
// (the FFT repository's layout). If ../FFT/ isn't there, the full app is looked for next to this script.
const ROOT = dirname(fileURLToPath(import.meta.url));
const SRC = existsSync(join(ROOT, '..', 'FFT', 'script.js')) ? join(ROOT, '..', 'FFT') : ROOT;
const OUT = ROOT;   // embed-frame.html / .css / .js are written here, ready to copy to FFT-Embed
const read = f => readFileSync(join(SRC, f), 'utf8');        // the full app
const readHere = f => readFileSync(join(ROOT, f), 'utf8');   // embed.js, embed-builder.html

/* ---------- markers ---------- */
function directives(src, kind) {
  const M = kind === 'html'
    ? { ifFull: /^<!--#if full-->$/, els: /^<!--#else-->$/, end: /^<!--#endif-->$/, line: /<!--#full-->\s*$/, emb: /^<!--#embed (.*)-->$/, eq: null }
    : { ifFull: /^\/\/#if full$/, els: /^\/\/#else$/, end: /^\/\/#endif$/, line: /\/\/#full\s*$/, emb: /^\/\/#embed (.*)$/, eq: /^\/\/= ?(.*)$/ };
  const out = [];
  let state = 0;   // 0 = normal, 1 = inside a full-only block, 2 = inside its embed (#else) part
  src.split('\n').forEach((line, i) => {
    const t = line.trim(), ind = line.slice(0, line.length - line.trimStart().length);
    if (M.ifFull.test(t)) { if (state) throw new Error('nested #if at line ' + (i + 1)); state = 1; return; }
    if (M.els.test(t)) { if (state !== 1) throw new Error('#else without #if at line ' + (i + 1)); state = 2; return; }
    if (M.end.test(t)) { if (!state) throw new Error('#endif without #if at line ' + (i + 1)); state = 0; return; }
    if (state === 1) return;
    if (state === 2) { const m = M.eq && t.match(M.eq); out.push(m ? ind + m[1] : line); return; }
    if (M.line.test(line)) return;
    const e = M.emb && t.match(M.emb);
    out.push(e ? ind + e[1] : line);
  });
  if (state) throw new Error('#if full without #endif');
  return out.join('\n');
}

/* ---------- JS: drop comments and indentation, keep every string / template / regex as it is ---------- */
function minJs(src) {
  let out = '', i = 0, lineStart = true, last = '';   // last significant character outside comments
  const n = src.length;
  const KW = /(?:^|[^\w$])(return|typeof|instanceof|in|of|new|delete|void|throw|case|do|else|yield|await)$/;
  const regexAllowed = () => !last || /[(,=:[!&|?{};+\-*%<>~^]/.test(last) || KW.test(out.slice(-12));
  const emit = s => { out += s; const t = s.trim(); if (t) last = t[t.length - 1]; lineStart = false; };
  while (i < n) {
    const c = src[i], d = src[i + 1];
    if (c === '\n') { if (!lineStart) out += '\n'; lineStart = true; i++; continue; }
    if (lineStart && (c === ' ' || c === '\t' || c === '\r')) { i++; continue; }
    if (c === '/' && d === '/') {
      while (i < n && src[i] !== '\n') i++;
      let k = out.length; while (k && (out[k - 1] === ' ' || out[k - 1] === '\t')) k--;
      out = out.slice(0, k);
      continue;
    }
    if (c === '/' && d === '*') { const e = src.indexOf('*/', i + 2); i = e < 0 ? n : e + 2; continue; }
    if (c === '"' || c === "'") {
      let j = i + 1;
      while (j < n && src[j] !== c) { if (src[j] === '\\') j++; j++; }
      emit(src.slice(i, j + 1)); i = j + 1; continue;
    }
    if (c === '`') { const j = skipTemplate(src, i); emit(src.slice(i, j)); i = j; continue; }
    if (c === '/' && regexAllowed()) {
      let j = i + 1, cls = false;
      while (j < n) {
        const ch = src[j];
        if (ch === '\\') { j += 2; continue; }
        if (ch === '[') cls = true; else if (ch === ']') cls = false;
        else if (ch === '/' && !cls) break;
        else if (ch === '\n') break;
        j++;
      }
      j++;
      while (j < n && /[a-z]/i.test(src[j])) j++;
      emit(src.slice(i, j)); i = j; continue;
    }
    emit(c); i++;
  }
  return out.replace(/[ \t]+\n/g, '\n');
}
// a template literal with ${…} parts (which can hold strings, templates and braces); returns the index after the closing `
function skipTemplate(src, i) {
  let j = i + 1;
  while (j < src.length) {
    const ch = src[j];
    if (ch === '\\') { j += 2; continue; }
    if (ch === '`') return j + 1;
    if (ch === '$' && src[j + 1] === '{') {
      j += 2; let depth = 1;
      while (j < src.length && depth) {
        const k = src[j];
        if (k === '"' || k === "'") { let m = j + 1; while (m < src.length && src[m] !== k) { if (src[m] === '\\') m++; m++; } j = m + 1; continue; }
        if (k === '`') { j = skipTemplate(src, j); continue; }
        if (k === '{') depth++; else if (k === '}') depth--;
        j++;
      }
      continue;
    }
    j++;
  }
  return j;
}

/* ---------- CSS: drop the rules of removed features, comments and whitespace ---------- */
const REMOVED = [
  '#dropzone', '.dz-card', '.dz-icon', '#fontbulk', '#reloadall', '#removeall', '#pickbtn', '#fonturl', '#urlbtn', '.chipr', '.chipx', '.chipe',
  '#autobtn', '#rkgroup', '#justifytoggle', '#justtoggle', '#justgroup', '#justsets', '.justmode', '.juston', '.jcredit',
  '#colorgroup', '#colortoggle', '.colormode', '.colorpick', '#colorlist', '#coloradd', '#colorreset', '#colorlight', '#colordark',
  '.cchip', '.cgroupbox', '.cgicon', '#colormodal', '#cmprev', '.tm-color', '#testmodal', '.tm-card', '.tm-actions',
  '.ugroup', '.stepper', '#scaleminus', '#scaleplus', '#scaleval', '#scalereset', '#scalerescue', '#rowsminus', '#rowsplus', '#rowsval',
  '.multirow', '.rowbrk', '.sepoff', '#hovertabs', '.tabdrag',
  '#testadd', '#dangerzone', '.dzlabel', '#wikigroup', '#wikilangs', '#wikilang', '#wikibtn', '#wikistatus', '#wikitoggle', '.wikimode', '#Wiki', '.wikihint',
  '#glyphgroup', '#glyphtoggle', '#glyphcopy', '#gshowuni', '#gshownames', '.glyphmode', '#Glyphs', '.glyphgrid', '.glyph', '.glyphmore', '.cap-u', '.cap-n',
  '.tab5.scrolled', '.nofonts', '.kjust', '#aboutbtn', '#aboutpop', '.aboutby', '.layout', '.otadd', '#ottag', '#otval', '#otadd', '.otx'
];
const esc = s => s.replace(/[.*+?^${}()|[\]\\#]/g, '\\$&');
const REMOVED_RE = new RegExp('(' + REMOVED.map(esc).join('|') + ')(?![\\w-])');
// selector list -> selectors (commas inside :is(…) / :not(…) don't split)
function splitSel(head) {
  const out = []; let depth = 0, cur = '';
  for (const ch of head) {
    if (ch === '(') depth++; else if (ch === ')') depth--;
    if (ch === ',' && !depth) { out.push(cur.trim()); cur = ''; } else cur += ch;
  }
  out.push(cur.trim());
  return out.filter(Boolean).map(x => x.replace(/\s+/g, ' '));
}
function pruneCss(css) {
  css = css.replace(/\/\*[\s\S]*?\*\//g, '');
  const dropped = [];
  // returns the kept text of a list of rules (recursion for @media / @supports)
  function rules(s) {
    let out = '', i = 0;
    while (i < s.length) {
      const open = s.indexOf('{', i);
      if (open < 0) { out += s.slice(i).trim() ? s.slice(i).trim() + '\n' : ''; break; }
      const head = s.slice(i, open).trim();
      let depth = 1, j = open + 1;
      while (j < s.length && depth) { if (s[j] === '{') depth++; else if (s[j] === '}') depth--; j++; }
      const body = s.slice(open + 1, j - 1);
      i = j;
      if (/^@(media|supports|layer|container)/.test(head)) {
        const inner = rules(body);
        if (inner.trim()) out += head + '{\n' + inner + '}\n';
      } else if (head.startsWith('@')) {
        out += head + '{' + body.replace(/\s+/g, ' ').trim() + '}\n';
      } else {
        const sels = splitSel(head);
        const keep = sels.filter(x => !REMOVED_RE.test(x));
        if (keep.length !== sels.length) dropped.push(...sels.filter(x => REMOVED_RE.test(x)));
        if (keep.length) out += keep.join(',') + '{' + body.split('\n').map(x => x.trim()).filter(Boolean).join('') + '}\n';
      }
    }
    return out;
  }
  return { css: rules(css), dropped };
}

/* ---------- HTML ---------- */
function minHtml(html) {
  return html.split('\n').map(l => l.trim()).filter(Boolean).join('\n')
    .replace(/<!--(?!\[)[\s\S]*?-->/g, '')
    .replace(/href="style\.css(\?[^"]*)?"/, 'href="embed-frame.css"').replace(/src="script\.js(\?[^"]*)?"/, 'src="embed-frame.js"');
}

/* ---------- build ---------- */
const full = read('index.html');
const fftVersion = (full.match(/class="about-ver">v([^<]+)</) || [])[1];
if (!fftVersion) throw new Error('index.html: the FFT version (class="about-ver") was not found');
// brotli.js (Google's Brotli decoder, MIT): loaded by the frame only in browsers without Brotli; its license header stays
const brotliSrc = read('brotli.js');
const brotliHead = brotliSrc.slice(0, brotliSrc.indexOf('(() => {'));
const brotliLic = (brotliSrc.match(/\/\* Copyright[\s\S]*?\*\//) || [''])[0];
const brotli = brotliHead + brotliLic + '\n' + minJs(brotliSrc.slice(brotliHead.length));
const ver0 = s => EMBED_VERSION + '-' + createHash('sha256').update(s).digest('hex').slice(0, 8);
const js = minJs(directives(read('script.js'), 'js')).replace('{{BROTLI_VERSION}}', ver0(brotli));
const { css, dropped } = pruneCss(read('style.css'));
// every file gets ?v=<FFT-Embed version>-<content hash>: a changed file has a new address, so no browser uses an old copy
const ver = s => EMBED_VERSION + '-' + createHash('sha256').update(s).digest('hex').slice(0, 8);
let html = minHtml(directives(full, 'html'))
  .replace(/\{\{EMBED_VERSION\}\}/g, EMBED_VERSION).replace(/\{\{FFT_VERSION\}\}/g, fftVersion)
  .replace('href="embed-frame.css"', 'href="embed-frame.css?v=' + ver(css) + '"')
  .replace('src="embed-frame.js"', 'src="embed-frame.js?v=' + ver(js) + '"');
if (!/embed-frame\.css\?v=/.test(html) || !/embed-frame\.js\?v=/.test(html)) throw new Error('index.html: style.css / script.js link not found');
// the loader and the builder open the frame page with its version
const frameVer = ver(html);
['embed.js', 'embed-builder.html'].forEach(f => {
  const src = readHere(f), out = src.replace(/'embed-frame\.html\?v=[^']*'/, "'embed-frame.html?v=" + frameVer + "'");
  if (out === src && !src.includes("'embed-frame.html?v=" + frameVer + "'")) throw new Error(f + ': the FRAME line was not found');
  writeFileSync(join(ROOT, f), out);
});
writeFileSync(join(OUT, 'embed-frame.js'), js);
if (OUT !== SRC) writeFileSync(join(OUT, 'brotli.js'), brotli);   // (in a single folder, the full app's brotli.js is used as it is)
writeFileSync(join(OUT, 'embed-frame.css'), css);
writeFileSync(join(OUT, 'embed-frame.html'), html);
const kb = s => (Buffer.byteLength(s) / 1024).toFixed(1) + ' KB';
console.log('FFT-Embed v' + EMBED_VERSION + ', built on FFT v' + fftVersion + ' (frame ' + frameVer + ')');
console.log('source: ' + SRC + '\noutput: ' + OUT);
console.log('embed-frame.html ' + kb(html) + '\nembed-frame.css  ' + kb(css) + '  (' + dropped.length + ' selectors dropped)\nembed-frame.js   ' + kb(js));
console.log('brotli.js        ' + kb(brotli) + '  (loaded only by browsers without Brotli)');
console.log('embed.js and embed-builder.html: frame version written');
if (process.argv.includes('--verbose')) console.log('\nDropped selectors:\n  ' + dropped.join('\n  '));
