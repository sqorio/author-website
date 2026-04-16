# Personal Website

Static personal website for a novelist, professor, and creative.

Built with plain HTML, CSS, and a small amount of vanilla JavaScript — no build tools, no bundler, no framework.

## Structure

```
/
├── index.html        # Main page
├── styles.css        # All styles
├── script.js         # JS interactions (smooth scroll, hover effects, etc.)
├── assets/
│   ├── images/       # Photos and graphics
│   └── fonts/        # Local font files (if any; Google Fonts loaded via CDN)
└── README.md
```

## Fonts

[Playfair Display](https://fonts.google.com/specimen/Playfair+Display) and [Inter](https://fonts.google.com/specimen/Inter) are loaded from Google Fonts via `<link>` tags in the HTML `<head>`.

## Development

Open `index.html` directly in a browser, or serve locally with any static file server:

```bash
python3 -m http.server
```
