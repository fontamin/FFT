# Embedding Fontamin Font Tester

The embed is a short preview of **your own fonts** on your own website. It is a separate, light build: `embed-frame.html`,
`embed-frame.css` and `embed-frame.js` (about 100 KB in total instead of about 460 KB): no font picker, URL box, drag & drop, auto-reload, Raqim Kashida, Layout Settings,
Wiki, Glyph List, the info (i) button, test editing, backup or restore.
Of the built-in tests, the embed has Farsi, Arabic, Quran and English. Visitors can't type in their own OpenType features; the site owner can choose them in the builder. The Test tab only has the test buttons (they can't be removed).
The shortcuts are kept: the mouse wheel over the menu switches tabs, Shift + wheel changes the text size and Shift + Alt + wheel the line height
(over the text), and the arrow keys switch tabs while the mouse is over the menu.

In the builder, your own tests are added with **Add** or **Reshape & add** (Arabic letters are first turned into their
presentation forms: isolated, initial, medial, final and lam-alef ligatures, in case you use a subset version of a font,
for example made with pyftsubset), and can be edited or removed later.
Every test can be turned off. Tests and fonts are put in order by dragging their handle (or by focusing it and pressing ↑ / ↓).
In the embed, the About tab shows the FFT-Embed and FFT versions and links to FFT-Embed; like the other tabs, it can be turned off.
In the builder, a chosen font file is only used in the preview until "Add as Base64" puts it in the code (with a disclaimer).
The easiest way is to open `embed-builder.html`: choose your font files or give URLs, set the options with a live preview and copy the code.
To change an embed later, paste its code (Script or iframe) into **Edit an existing embed** at the top of the builder.
The builder also keeps its last settings in the browser and brings them back when it is opened again (**Start over** clears them).
Font files bigger than the browser's storage are not kept; the builder then says so.

If a font can't be loaded, visitors see a short message ("The font couldn’t be loaded."); the builder's preview shows the
technical reason (CORS, wrong URL, not a font file).

## Which files go where

The embed is published from its own repository, **[FFT-Embed](https://github.com/fontamin/FFT-Embed)** (<https://fft-embed.fontamin.com>); the source is in **[FFT](https://github.com/fontamin/FFT)**.

In the FFT repository, the full app is in `FFT/` (the folder GitHub Pages publishes) and the embed tools are in
`embed/` (not published):

```
FFT/                    the full app: index.html, style.css, script.js, kashida.bundle.js, brotli.js
embed/                  the embed tools and sources
  build-embed.mjs       makes the three embed-frame files from FFT/
  embed-builder.html    the builder (index.html in FFT-Embed)
  embed.js              the loader
  EMBED.md              this file
  embed-frame.*         made by the build (in .gitignore), copied to FFT-Embed
  brotli.js             made by the build from FFT/brotli.js (in .gitignore), copied to FFT-Embed
```

| In FFT | In FFT-Embed | What it is |
|---|---|---|
| `embed/embed-builder.html` | `index.html` | the page that makes the code |
| `embed/embed.js` | `embed.js` | the loader that the site owner's code points to |
| `embed/embed-frame.html`, `.css`, `.js` | same names | the tester inside the frame (built, see below) |
| `embed/EMBED.md` | `EMBED.md`; `README.md` is its user-facing version | this file |
| `embed/brotli.js` | `brotli.js` | Brotli decoder, made by the build from `FFT/brotli.js` |
| `embed/build-embed.mjs` | — | makes the three `embed-frame` files from the full app |
| `FFT/index.html`, `style.css`, `script.js`, `kashida.bundle.js` | — | the full app; the embed doesn't load any of them |

A site owner who embeds the tester uploads nothing: they paste the code from the builder, and put their font files on
their own site if they use URLs.

## Building the embed files

The three `embed-frame` files are made from the full app by `node embed/build-embed.mjs`, run from the root of the FFT
repository (Node 16+, no dependencies). It reads `FFT/index.html`, `FFT/style.css` and `FFT/script.js` and writes into
`embed/`. Run it after every change to the full app, then copy the three `embed-frame` files, `brotli.js`, `embed.js` and
`embed-builder.html` (→ `index.html`) to FFT-Embed. What the embed leaves out is marked in the source:

- JS: `//#if full` … `//#endif` (with an optional `//#else` part whose `//= ` lines are the embed's version),
  `code   //#full` for one line, `//#embed code` for a line only the embed has.
- HTML: `<!--#if full-->` … `<!--#endif-->`, `<!--#full-->` at the end of a line, `<!--#embed html-->` for a line only the embed has.
- CSS: no markers. Every rule whose selectors only target removed parts (the `REMOVED` list in `build-embed.mjs`) is dropped.

**Versions.** FFT-Embed has its own version, `EMBED_VERSION` at the top of `build-embed.mjs` (raise it when the embed
itself changes: builder, loader, embed-only features). The FFT version is read from the About tab of `index.html`.
The embed's About tab shows both: "FFT-Embed v1.0 / Built on FFT v1.51 · Customized for this page".

**Cache.** Every file the frame loads gets `?v=<FFT-Embed version>-<content hash>`, and the build writes the frame page's
own version into `embed.js` and `embed-builder.html` (the `FRAME` line). A changed file gets a new address, so browsers
never use an old copy. After a build, copy `embed.js` and `embed-builder.html` (→ `index.html`) to FFT-Embed too.

**woff2.** FFT reads a woff2 font's tables with the browser's `DecompressionStream('brotli')`. Browsers without it
(Chrome on Android, for example) load `brotli.js`, Google's Brotli decoder (MIT), the first time a woff2 font is read;
other browsers never load it. Without it, such a browser shows a woff2 font but can't read its name, axes or features.

The build also strips comments and indentation. `node embed/build-embed.mjs --verbose` lists the CSS selectors it dropped.

## 1. Script (recommended)

```html
<div data-fft
     data-font="/fonts/MyFont-Regular.woff2 | /fonts/MyFont-Bold.woff2"
     data-label="My Font Regular | My Font Bold"
     data-tabs="font,layout,test"
     data-tests="My test | Farsi | English"
     data-theme="Light"
     data-height="560"
     data-width="720" data-position="center">
  <template data-fft-text data-name="My test">Your own sample text, as long as you like.</template>
</div>
<script src="https://fft-embed.fontamin.com/embed.js" async></script>
```

Your page downloads the fonts itself and hands them to the tester, so fonts on your own site need no CORS setup
and relative addresses work. A font file can also live inside the code (this is what the builder does with chosen files):

```html
<template data-fft-font data-name="MyFont.woff2" data-label="My Font">…base64…</template>
<template data-fft-font data-url="/fonts/Other.woff2" data-label="Other"></template>
```

Fonts appear in the Font tab in the given order, with their labels (no label = the font's own full name); the first one is shown at start.
From JavaScript: `FFT.embed(element, { fonts: [{ url }, { file }, { buf, name }], tabs: 'font,test' })` returns the iframe.

## 2. Plain iframe (for site builders that block scripts)

```html
<iframe src="https://fft-embed.fontamin.com/embed-frame.html#embed&font=https%3A%2F%2Fexample.com%2Fa.woff2&label=My%20Font&tabs=font,test"
        style="width:100%;height:560px;border:0" loading="lazy" allow="clipboard-write" title="Font tester"></iframe>
```

Here the tester downloads the fonts itself, so the font server must send `Access-Control-Allow-Origin`, and only URLs can be used.

## Options

| Option | Values | Default |
|---|---|---|
| `embed` | required (turns embed mode on) | — |
| `font`, `label` | iframe only: a font URL and its name; repeat both for more fonts | — |
| `tabs` | any of `font,layout,test,variation,opentype,about` | all |
| `tab` | the tab that opens first | first visible tab |
| `text`, `textname` | one of your own tests and its name; repeat both for more (embed.js: `<template data-fft-text data-name="…">`) | — |
| `test` | the Test tab, in order: names of your tests and built-in ones; repeat it (embed.js: `data-tests="A \| B \| C"`). Only the listed tests are shown, the first one opens; `none` = an empty Test tab | your tests, then all built-in ones |
| `edit` | `0` = the text can't be edited | `1` |
| `theme` | which mode starts: `light`, `dark` or `auto` (the visitor's system setting) | `light` |
| `lighttheme` | the light mode: `Light, Material, Yellow, Mint` | `Light` |
| `darktheme` | the dark mode: `Dark, Night, Ocean, Terminal` | `Dark` |
| `lightcolors`, `darkcolors` | 6 hex colors without `#` (text,bg,accent,footer,chip,box), instead of a preset | — |
| `themetoggle` | `0` = hide the dark-mode button | `1` |
| `fontname` | `0` = no font name above the text | `1` |
| `info` | `0` = no info line (font details, CSS) at the bottom right | `1` |
| `features` | the OpenType tab shows only these features, in this order: `liga,kern:0,ss01:1` (`:1` / `:0` = on / off at start, plain tag = the usual default); `none` = no features | each font's own features |
| `size` | text size in px (10–250) | `26` |
| `lh` | line height (1–2) | `1.5` |
| `align` | `left, right, center, justify` | the text's own |
| `scale` | UI scale (0.2–5) | `1` |
| `height` | embed.js only: frame height (px or any CSS length) | `560` |
| `width` | embed.js only: empty = the width of the parent element; px or any CSS length = that width, never wider than the parent | parent |
| `position` | embed.js only: `start`, `center` or `end`, for a frame narrower than its parent | `start` |
| `title` | embed.js only: the frame's title | `Font tester` |

## Talking to the embed (postMessage)

```js
const frame = document.querySelector('[data-fft] iframe');
frame.contentWindow.postMessage({ fft: 'fonts', fonts: [{ buf: arrayBuffer, name: 'B.woff2', label: 'B' }, { url: 'https://…', label: 'C' }] }, '*');
frame.contentWindow.postMessage({ fft: 'text', text: 'New text' }, '*');
frame.contentWindow.postMessage({ fft: 'theme', theme: 'Ocean' }, '*');
frame.contentWindow.postMessage({ fft: 'size', value: 48 }, '*');
// the embed sends { fft: 'hello' } when it starts and { fft: 'ready', fonts: n } when the fonts are in
```

## Notes

- **Storage:** an embed never touches the browser's saved FFT settings; everything it changes lives only until the page is closed.
- **Framing:** the host of FFT must allow being framed (no `X-Frame-Options: DENY` / restrictive `frame-ancestors`). GitHub Pages allows it.
- The full app (`index.html#embed&…`) still understands the same options, but it loads everything; use `embed-frame.html`.
- **Size:** fonts inside the code (base64) are about a third bigger than the file. For large fonts, use woff2 or put the file on your site and give its URL.
