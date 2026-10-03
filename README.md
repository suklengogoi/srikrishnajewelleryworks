# Sri Krishna Jewellery Works: website

A static site. No build step and no library. Upload the whole folder as it is.

## Files

| File | What it is |
|---|---|
| `index.html` | Home page |
| `collections.html` | Catalogue page |
| `css/style.css` | All styles, in 16 numbered sections |
| `js/site.js` | Menu, reveals, parallax, the collections slider, films, copy buttons, opening hours, page wipe |
| `js/bangle.js` | The 3D gold bangles in the hero |
| `js/pieces.js` | The catalogue. **The only file you edit to add a piece.** |
| `js/collections.js` | Draws the catalogue page from `pieces.js` |
| `assets/` | Photos, films, logo, favicon, share image |

## Add a piece

1. Save the photo as WebP, 3:4 portrait, about 1000 px wide, into `assets/`.
2. Open `js/pieces.js`, copy one block inside `pieces`, and change the id, name, category, text and photo.
3. Upload. The card, the filter and the detail view appear on their own.

A film is added the same way: `{ film: 'assets/x.mp4', img: 'assets/x-poster.webp', alt: '...' }`.

## Change the contact details

- WhatsApp number: `whatsapp` at the top of `js/pieces.js`, and search both HTML files for `wa.me/917002180879`.
- Phone, email, address and hours: the Visit section in `index.html`, and the `application/ld+json` block in the head of both pages.
- Closing times used by "Open now": block 8 in `js/site.js`.

## Before it goes live

- The pages point to `https://skjw.in/` in the canonical link, the share tags and the business data. Change it if the address differs.
- Fonts load from Google Fonts. To self-host, download Marcellus, Newsreader and Noto Serif Bengali, add `@font-face` rules to `css/style.css`, and remove the three font lines from each page head.
- Open the site through a local server or the live address when testing. Films and page links can misbehave when a page is opened straight from a folder.

## Screen sizes

The collections slider on the home page shows whole tiles only: 4 on a desktop, 3 up to 1280 px, 2 up to 992 px, 1 on a phone. Change the numbers by editing `--per` on `.rail` in `css/style.css`.
