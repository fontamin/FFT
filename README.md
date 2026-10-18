# FFT — Fontamin Font Tester

A small, fast, responsive font tester that runs entirely in the browser. Drop one or more font files on the page, type or pick a specimen text, and play with size, line height, variable axes, OpenType features and colors. Built for type designers, with Arabic(mostly focused on Farsi) / Latin scripts in mind.

No build step, no dependencies, no server, no tracking: three static files (`index.html`, `script.js`, `style.css`).

> **A large part of this project was designed and written in collaboration with [Claude](https://claude.ai) (Anthropic's AI assistant).**

## Features

- **Load fonts your way:** drag & drop (several files at once), the **+ Font** button, or a URL. Supports `ttf`, `otf`, `woff` and `woff2`.
- **Several fonts at the same time:** every font is a chip you can select, reload (↻) or remove (×). With more than one font loaded, **↻ all** and **× all** reload or remove them all at once. Variable-axis values and OpenType choices are shared between fonts (clamped to each font's range); features a font doesn't have are kept and shown dimmed.
- **Auto-reload:** when a font file changes on disk (for example, after you export it from your font editor), it reloads by itself. Toggle it with the round auto-reload button next to the dark-mode button (its icon is crossed out when off).
- **Variable fonts:** axes are read from the font's `fvar` table and turned into sliders. A dice button randomizes them. The **Instances** button lists the font's named instances (Regular, Bold…); one tap sets all axes, and the matching instance stays lit while the sliders are on its values.
- **OpenType features:** the feature list is read from the font's `GSUB` / `GPOS` tables. **All +N** also shows the shaping features hidden by default (`init`, `medi`, `fina`, `ccmp`, `locl`…). You can add your own 4-letter tag with a default value (`1`, `0`, `on`, `off`).
- **Layout controls:** size, line height, outline mode, text alignment (right / center / left / justify; click the active one again to return to the text's own alignment) and **Guides**, which draw the ascender, descender (solid lines), x-height and cap-height (dotted lines) under every line of text.
- **Layout Settings:** a sub-menu of the Layout tab with the **UI scale** (0.2x – 5x), the number of **footer rows** (1 – 6) and the interface **colors**.
- **Colors:** six customizable colors (text, background, accent, footer, button, box). Ready-made color sets are split into a light-mode group (sun icon) and a dark-mode group (moon icon); add your own, edit (✎) or remove (×) them. Choosing a set with a dark background switches the interface to dark mode. **Set to light mode / Set to dark mode** makes the colors on screen the main colors of that mode.
- **Specimen texts:** built-in tests for Persian, Arabic, Quran, English, numbers, ZWNJ, Arabic marks, kerning pairs and full layout pages. Add your own with **+**, remove any of them with **×**.
- **Glyph List:** shows every character the font has (read from its `cmap` table), plus the glyphs that have no Unicode value but can be reached through `GSUB` (alternates, ligatures, Arabic joining forms). Click a glyph to copy it, show its Unicode value and/or glyph name under it, or copy all characters at once.
- **Wikipedia mode:** the **Wiki** button in the Test tab fetches a long random article in Persian, Arabic, English or any language code you type.
- **About popup:** the **i** button (on top-right corner) shows the notes, author and link of the current test, the link of the Wikipedia article, or a summary of the Glyph List.
- **Copy CSS:** click the small CSS line in the Layout, Variation and OpenType tabs to copy `font-size` / `line-height` (or the colors, while Layout Settings is open), `font-variation-settings` or `font-feature-settings`.
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

The bar at the bottom has six tabs: **Font**, **Layout**, **Test**, **Variation**, **OpenType**, **About**. Click a tab to open it. On a computer, while the mouse is over the bar, the **←** / **→** arrow keys move between the tabs.

| Tab | What it does |
| --- | --- |
| **Font** | Add fonts (**+ Font**, URL + **Load**, or drop files anywhere on the page). Select, reload or remove them. The first chip, **Fallback font**, is the browser's default font. |
| **Layout** | Size, height, alignment, outline and **Guides**. The **Layout Settings** button opens the UI scale, footer rows and color settings. |
| **Test** | Pick a specimen text. **+** saves the text currently on screen as a new test (name, text, notes, author, link). The folder / download icons import / export a backup. The **Wiki** button switches this row to the Wikipedia menu; **Glyph List** switches it to the glyph table. |
| **Variation** | One slider per variable axis, and the **Instances** button. |
| **OpenType** | One toggle per feature, plus the **tag / value / Add** box for custom features (a **×** removes them). |
| **About** | Version and link. |

Tip: the text on the page is editable. Type, paste or edit it directly.

### Sub-menus and going back

Layout Settings, Instances, Wiki and Glyph List open as a sub-menu that slides up in the bottom bar. To go back, click the thin arrow bar at the top of the bar or, on a touch screen, drag down on the bottom bar. FFT remembers where you had scrolled in each sub-menu (and in the normal row), so you return to the same place.

### Layout Settings

Open it from the Layout tab with the **Layout Settings** button. It contains three groups, separated by thin vertical lines.

#### UI scale

**Scale** makes the whole interface bigger or smaller, from 0.2x to 5x. The **−** / **+** buttons move one small logarithmic step (about 3%) at a time, and the **1x** button resets it. While the scale is far from 1x (above 1.25x or below 0.8x), a **Reset scale** badge appears at the top of the page. It is not zoomed with the rest of the page, so you can always reach it, even if the zoomed bottom bar becomes unusable.

#### Footer rows

**Rows** sets how many rows the bottom bar has, from 1 (the normal single row) to 6. With more than one row, the items of a tab fill row 1 first, then row 2, and so on; each row is centered. Separators never end up at the start or end of a row. If the items don't fit in the page width even with all the rows, they run left to right through the rows with about equal widths, and the whole tab scrolls horizontally.

#### Colors

The six round pickers change the page live:

| Color | Used for |
| --- | --- |
| Text / Background | the specimen text and the page |
| Accent | active tab dot, slider thumbs, active items, guides, hover highlights |
| Footer | the bottom bar |
| Button | buttons, chips and the on/off toggles |
| Box | glyph cells and the info popup |

Everything else (lines, slider tracks, hover colors, selection color, text on buttons) is derived from these six. **+** opens a dialog to save the current colors as a named set in the light or dark group (it previews live, **Cancel** brings back the previous colors); the restore button adds back built-in sets you removed. The **Light** and **Dark** sets can be edited but not removed.

### Backup file

The export button saves `fft-backup.json`; the import button (or dropping the `.json` file on the page) imports it. Tests, custom features and color sets are **added** to your list (duplicates are skipped, a color set with the same name and group is updated); settings (dark mode, auto-reload, Wikipedia language, UI scale, footer rows) and the main light / dark colors are **replaced**.

```json
{
  "app": "FFT",
  "version": 1,
  "settings": {
    "dark": true,
    "autoReload": true,
    "wikiLang": "fa",
    "scale": 1.5,
    "rows": 2,
    "themeColors": {
      "light": { "text": "#222222", "bg": "#f6f6f6", "accent": "#ff4242", "footer": "#ffffff", "chip": "#ececee", "box": "#f0f0f0" },
      "dark":  { "text": "#f5f5f5", "bg": "#222222", "accent": "#ff4242", "footer": "#000000", "chip": "#111111", "box": "#2e2e2e" }
    }
  },
  "tests": [
    { "name": "My test", "text": "…", "about": "…", "author": "…", "link": "https://…" }
  ],
  "features": [ { "tag": "ss05", "on": true } ],
  "colors": [
    { "name": "My colors", "mode": "dark", "text": "#d6e6ff", "bg": "#10233f", "accent": "#4dabf7", "footer": "#0b1a30", "chip": "#17325a", "box": "#173055" }
  ]
}
```

`scale` must be a number between 0.2 and 5 (otherwise it is ignored); `rows` is rounded and limited to 1 – 6. Every key in `settings` is optional, and files exported before `scale` and `rows` existed still import (those two just stay as they are).

Only plain-text tests are exported (the built-in layout pages are code, not data). Links must start with `http://` or `https://`. Older files with only text and background colors still import; the missing colors take the defaults of the mode.

### Danger zone

At the end of the Test row, in a red dashed box: the **restore** icon adds back built-in tests that you deleted, and the **trash** icon deletes everything FFT saved in this browser (tests, colors, theme, UI scale, footer rows, Wikipedia language, custom features) and reloads the page.

## What is saved, and where

Everything stays in your browser. Tests, color sets and main colors, custom OpenType features, dark mode, auto-reload, UI scale, footer rows, Glyph List captions and Wikipedia-language settings are kept in `localStorage` (keys starting with `fft-`). **Fonts are never saved**; refreshing the page clears them. The only network requests are the ones you ask for: Wikipedia (when you press **Fetch article**) and fonts you load by URL.

## Browser support and limits

- **Chrome / Edge (desktop)** give the full experience. Auto-reload of local files uses the File System Access API: fonts added with **+ Font** or by drag & drop are watched for changes. Firefox and Safari can't watch local files, so use the ↻ button on the chip.
- **woff2:** reading its tables (axes, instances, features, name, character list) needs Brotli support in `DecompressionStream`. Without it the font still renders, but a generic feature list is shown and variable axes, instances and the Glyph List aren't available. `ttf`, `otf` and `woff` always work.
- **Glyph List:** glyphs without a Unicode value are found by reading `GSUB`; glyphs that are only used inside contextual rules or as components can't be drawn from text and are only counted. Glyph names come from the `post` or `CFF` table; if the font has none, the glyph number is shown. The fallback font has no character list.
- **Fonts by URL** need the server to allow CORS.
- **Guides** are measured from the Latin glyphs (`b d h k l`, `p q`, `x`, `H`). For a font without Latin letters, the values in the font's `hhea` / `OS/2` tables are used instead.
- **UI scale** uses the CSS `zoom` property, so it needs a browser that supports it (all current Chrome, Edge, Safari and Firefox versions).
- The **Fallback font** is whatever the browser uses for `system-ui`; browsers don't tell which font that is, so no axes or feature list can be read for it.

## Project structure

```
index.html   markup, the footer tabs, inline SVG icons
style.css    all styles (light / dark, responsive)
script.js    everything else: font parser, UI, colors, scale and rows, tests, Glyph List, Wikipedia, backup
```

## Credits

- Built-in test texts by Amin Abedi, Saleh Souzanchi, AmirMahdi Moslehi and Pablo Impallari ([Impallari Font Testing Project](https://www.cyreal.org/Font-Testing-Page/index.php)). Each test shows its author in the **i** popup.
- Some specimen texts, and the articles fetched in Wikipedia mode, come from [Wikipedia](https://www.wikipedia.org/) and remain under their own license, [CC BY-SA](https://creativecommons.org/licenses/by-sa/4.0/).
- Made with Claude (Anthropic).

## License

[MIT](LICENSE) © 2026 fontamin. The MIT license covers the code; the Wikipedia texts keep their own license.
