# FFT — Fontamin Font Tester

A small, fast, responsive font tester that runs entirely in the browser. Drop one or more font files on the page, type or pick a specimen text, and play with size, line height, variable axes and OpenType features. Built for type designers, with Arabic(mostly focused on Farsi) / Latin scripts in mind.

No build step, no dependencies, no server, no tracking: three static files (`index.html`, `script.js`, `style.css`).

> **A large part of this project was designed and written in collaboration with [Claude](https://claude.ai) (Anthropic's AI assistant).**

## Features

- **Load fonts your way:** drag & drop (several files at once), the **+ Font** button, or a URL. Supports `ttf`, `otf`, `woff` and `woff2`.
- **Several fonts at the same time:** every font is a chip you can select, reload (↻) or remove (×). Each font remembers its own variable-axis and OpenType settings.
- **Auto-reload:** when a font file changes on disk (for example, after you export it from your font editor), it reloads by itself. Toggle it with the round **↻** button next to the dark-mode button.
- **Variable fonts:** axes are read from the font's `fvar` table and turned into sliders. A 🎲 button randomizes them.
- **OpenType features:** the feature list is read from the font's `GSUB` / `GPOS` tables. **All +N** also shows the shaping features hidden by default (`init`, `medi`, `fina`, `ccmp`, `locl`…). You can add your own 4-letter tag with a default value (`1`, `0`, `on`, `off`).
- **Layout controls:** size, line height, outline mode, text alignment (right / left / justify) and **Guides**, which draw the ascender, descender (solid lines), x-height and cap-height (dotted lines) under every line of text.
- **Specimen texts:** built-in tests for Persian, Arabic, Quran, English, numbers, ZWNJ, Arabic marks, kerning pairs and full layout pages. Add your own with **+**, remove any of them with **×**.
- **Wikipedia mode:** the **Wiki** button in the Test tab fetches a long random article in Persian, Arabic, English or any language code you type.
- **About popup:** the **i** button(on top-right corner) shows the notes, author and link of the current test, or the link of the Wikipedia article.
- **Copy CSS:** click the small CSS line in the Layout, Variation and OpenType tabs to copy `font-size`, `font-variation-settings` or `font-feature-settings`.
- **Dark mode**, RTL/LTR text, and a layout that works on phones (the bottom bar scrolls horizontally, no scrollbars).

## Getting started

1. Download or clone the repository.
2. Open `index.html` in a browser.

Opening the file directly works. Serving it over HTTP is recommended (auto-reload of fonts loaded by URL needs it). The simplest way:

```bash
python3 -m http.server
# then open http://localhost:8000
```

It also works on GitHub Pages or any static host.

## Usage

The bar at the bottom has six tabs (on a mouse device, hovering a tab title opens it):

| Tab | What it does |
| --- | --- |
| **Font** | Add fonts (**+ Font**, URL + **Load**, or drop files anywhere on the page). Select, reload or remove them. The first chip, **Fallback font**, is the browser's default font. |
| **Test** | Pick a specimen text. **+** saves the text currently on screen as a new test (name, text, notes, author, link). 📂 / ⬇ import / export a backup. The **Wiki** button switches this row to the Wikipedia menu. |
| **Layout** | Size, height, outline, **Guides**, alignment. |
| **Variation** | One slider per variable axis. |
| **OpenType** | One toggle per feature, plus the **tag / value / Add** box for custom features (a **×** removes them). |
| **About** | Version and link. |

Tip: the text on the page is editable. Type, paste or edit it directly.

### Backup file

**⬇** exports `fft-backup.json`; **📂** (or dropping the `.json` file on the page) imports it. Tests and custom features are **added** to your list (duplicates are skipped); settings are **replaced**.

```json
{
  "app": "FFT",
  "version": 1,
  "settings": { "dark": true, "autoReload": true, "wikiLang": "fa" },
  "tests": [
    { "name": "My test", "text": "…", "about": "…", "author": "…", "link": "https://…" }
  ],
  "features": [ { "tag": "ss05", "on": true } ]
}
```

Only plain-text tests are exported (the built-in layout pages are code, not data). Links must start with `http://` or `https://`.

### Danger zone

At the end of the Test row, in a red dashed box: **↺** adds back built-in tests that you deleted, **🗑** deletes everything FFT saved in this browser (tests, theme, Wikipedia language, custom features) and reloads the page.

## What is saved, and where

Everything stays in your browser. Tests, custom OpenType features, theme, auto-reload and Wikipedia-language settings are kept in `localStorage` (keys starting with `fft-`). **Fonts are never saved**; refreshing the page clears them. The only network requests are the ones you ask for: Wikipedia (when you press **Fetch article**) and fonts you load by URL.

## Browser support and limits

- **Chrome / Edge (desktop)** give the full experience. Auto-reload of local files uses the File System Access API: fonts added with **+ Font** or by drag & drop are watched for changes. Firefox and Safari can't watch local files, so use the ↻ button on the chip.
- **woff2:** reading its tables (axes, features, name) needs Brotli support in `DecompressionStream`. Without it the font still renders, but a generic feature list is shown and variable axes can't be listed. `ttf`, `otf` and `woff` always work.
- **Fonts by URL** need the server to allow CORS.
- **Guides** are measured from the Latin glyphs (`b d h k l`, `p q`, `x`, `H`). For a font without Latin letters, the values in the font's `hhea` / `OS/2` tables are used instead.
- The **Fallback font** is whatever the browser uses for `system-ui`; browsers don't tell which font that is, so no axes or feature list can be read for it.

## Project structure

```
index.html   markup, the footer tabs, inline SVG icons
style.css    all styles (light / dark, responsive)
script.js    everything else: font parser, UI, tests, Wikipedia, backup
```

## Credits

- Built-in test texts by Amin Abedi, Saleh Souzanchi, AmirMahdi Moslehi and Pablo Impallari ([Impallari Font Testing Project](https://www.cyreal.org/Font-Testing-Page/index.php)). Each test shows its author in the **i** popup.
- Some specimen texts, and the articles fetched in Wikipedia mode, come from [Wikipedia](https://www.wikipedia.org/) and remain under their own license, [CC BY-SA](https://creativecommons.org/licenses/by-sa/4.0/).
- Made with Claude (Anthropic).

## License

[MIT](LICENSE) © 2026 Amin Abedi. The MIT license covers the code; the Wikipedia texts keep their own license.
