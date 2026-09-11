# Toy Haven

Toy Haven is a plain HTML, CSS, and JavaScript toy shop website built as a university front-end assignment. It has no frameworks, no build tools, and no npm packages.

The site lets users browse products, add items to a cart, check out, save a wishlist, and send feedback. Data is stored in the browser with `localStorage`. A simple service worker and web app manifest are included so the site can work as a basic PWA.

## Features

- Shared sticky header with logo, nav links, and a mobile hamburger menu
- Shared compact footer with quick links and a newsletter form
- Home page hero slider (4 category banners, auto-rotate every 4 seconds)
- Featured products pulled from `PRODUCTS` where `featured` is `true`
- Products page with category filters and live name search
- Add to Cart and Add to Wishlist on product cards
- Cart with quantity +/−, line subtotals, order total, clear cart, and checkout link
- Checkout form with inline validation, order summary, and order history
- Wishlist with status dropdown: Interested / Owned / Not Interested
- Feedback form with inline validation and an FAQ accordion
- Responsive layout for desktop, tablet, and mobile
- Basic PWA support (`manifest.json` + cache-first service worker)

## Pages

| Page | File | Purpose |
|---|---|---|
| Home | `index.html` | Hero banners, featured products, shop links |
| Products | `products.html` | Full catalogue, filter, search, cart and wishlist actions |
| Cart | `cart.html` | Cart items, quantities, total, clear cart, checkout |
| Checkout | `checkout.html` | Delivery form, payment method, place order |
| Wishlist | `wishlist.html` | Saved products and status tracking |
| Feedback | `feedback.html` | Contact form and FAQ accordion |

## Folder structure

```
toy-haven/
├── index.html
├── products.html
├── cart.html
├── checkout.html
├── wishlist.html
├── feedback.html
├── manifest.json
├── service-worker.js
├── README.md
├── css/
│   ├── style.css          shared styles (nav, footer, buttons, breakpoints)
│   ├── home.css
│   ├── products.css
│   ├── cart.css
│   ├── checkout.css
│   ├── wishlist.css
│   └── feedback.css
├── js/
│   ├── data.js            PRODUCTS array (20 items)
│   ├── utils.js           localStorage helpers
│   ├── nav.js             hamburger menu, newsletter, service worker
│   ├── home.js
│   ├── products.js
│   ├── cart.js
│   ├── checkout.js
│   ├── wishlist.js
│   └── feedback.js
├── images/
│   ├── products/          20 product photos
│   └── banners/           4 home slider banners
└── icons/
    ├── favicon.ico
    ├── icon-192.png
    └── icon-512.png
```

## How to run

Do not open the HTML files directly from disk (`file://`). The service worker and some browser features need a local HTTP server.

### Option 1: Python

From the `toy-haven` folder:

```bash
python -m http.server 8080
```

Open [http://localhost:8080](http://localhost:8080) in a browser.

### Option 2: VS Code / Cursor Live Server

Right-click `index.html` and open with Live Server.

After code changes, hard-refresh with **Ctrl+Shift+R** so the service worker picks up new files.

## Technologies

- HTML5
- CSS3 (Flexbox, Grid, media queries, CSS variables)
- Vanilla JavaScript
- `localStorage` for cart, wishlist, orders, and feedback
- Web App Manifest
- Service Worker (cache-first)

No React, Vue, Bootstrap, jQuery, or npm.

## Product data

All products live in `js/data.js` as a `PRODUCTS` array.

There are **20 products**, 5 in each category:

- Figurines
- Toys
- Board Games
- Diecast Cars

Each product has:

| Field | Type | Description |
|---|---|---|
| `id` | number | Unique product id |
| `name` | string | Product name |
| `category` | string | One of the four categories |
| `price` | number | Price in USD |
| `image` | string | Path under `images/products/` |
| `description` | string | Short product text |
| `featured` | boolean | Shown on the home page if `true` (4 products) |
| `stock` | number | Stock count |

## localStorage keys

| Key | Used by | Value |
|---|---|---|
| `cart` | Home, Products, Cart, Checkout | `[{ id, quantity }]` |
| `wishlist` | Products, Wishlist | `[{ id, status }]` |
| `orderHistory` | Checkout | Array of placed orders (includes date, customer details, items, total) |
| `feedbackList` | Feedback | Array of `{ name, email, message, date }` |

Wishlist `status` values: `Interested`, `Owned`, `Not Interested`.

Helpers in `js/utils.js`:

- `getStoredList(key)` — reads an array, returns `[]` if missing or invalid
- `setStoredList(key, list)` — saves an array as JSON

## Colour palette

Defined as CSS variables in `css/style.css`:

| Name | Hex | Use |
|---|---|---|
| Primary | `#2E1A47` | Headings, header, theme colour |
| Accent | `#FF7A29` | Buttons, prices, highlights |
| Background | `#FAF8F5` | Page background |
| Text | `#222222` | Body text |

Fonts: **Poppins** for headings, **Inter** for body text (Google Fonts, with system-font fallback).

## Responsive design

Breakpoints in the CSS:

| Width | Layout |
|---|---|
| Above 1024px | Desktop nav, multi-column grids |
| 1024px and below | 2-column product grids, stacked cart/checkout |
| 768px and below | Hamburger menu, compact footer, larger tap targets |
| 480px and below | Single-column cards, stacked cart rows |

The hamburger button is shown at `768px` and below. `js/nav.js` toggles the menu and closes it when a link is clicked or the window is resized back to desktop.

## PWA

`manifest.json`

- `name`: Toy Haven
- `short_name`: ToyHaven
- `start_url`: `index.html`
- `theme_color`: `#2E1A47`
- `background_color`: `#FAF8F5`
- Icons: `icons/icon-192.png`, `icons/icon-512.png`

`service-worker.js` uses a **cache-first** strategy. On install it caches HTML, CSS, JS, icons, banners, and product images. On activate it deletes old caches. It is registered from `js/nav.js` on every page.

## Page behaviour

### Home (`js/home.js`)

- Fades between 4 banner slides every 4 seconds
- Dots jump to a specific slide
- Renders the 4 featured products
- Add to Cart saves to `localStorage` and shows a toast

### Products (`js/products.js`)

- Renders all 20 products as cards
- Filter buttons: All / Figurines / Toys / Board Games / Diecast Cars
- Search filters by product name as the user types
- Add to Cart updates `cart`
- Add to Wishlist saves `{ id, status: "Interested" }` (no duplicates)

### Cart (`js/cart.js`)

- Matches cart ids to `PRODUCTS`
- +/− updates quantity immediately (no page reload)
- Quantity 0 removes the item
- Clear Cart asks for confirmation first
- Proceed to Checkout goes to `checkout.html`

### Checkout (`js/checkout.js`)

- Shows an empty-cart message if there are no items
- Required fields: Full Name, Email, Delivery Address, Payment Method (Card or Cash on Delivery)
- Email is checked with a simple regex
- Errors appear as red inline text (no `alert()`)
- On success: saves the order with a date, clears the cart, shows “Order placed!”

### Wishlist (`js/wishlist.js`)

- Lists saved products with image, name, and status dropdown
- Changing the dropdown updates `localStorage` immediately

### Feedback (`js/feedback.js`)

- Required Name, Email, and Message, with inline errors
- Saves entries to `feedbackList`
- FAQ accordion: click a question to expand or collapse the answer

## Accessibility

- Viewport meta tag on every page
- `alt` text on product and banner images
- `aria-label` / `aria-expanded` on the hamburger button
- `aria-label` on cart quantity buttons
- Form labels linked to inputs
- Buttons use `type="button"` where they should not submit a form

## Notes for marking / demo

1. Start the local server and open the home page.
2. Add featured items to the cart from Home.
3. On Products, filter, search, add to cart, and add to wishlist.
4. On Cart, change quantities and go to Checkout.
5. Submit checkout with invalid fields first, then with valid details.
6. Change wishlist statuses.
7. Submit feedback and open the FAQ items.
8. Resize the browser or use device mode to show mobile layout.

Browser data can be cleared in DevTools → Application → Local Storage if you need a fresh demo.
