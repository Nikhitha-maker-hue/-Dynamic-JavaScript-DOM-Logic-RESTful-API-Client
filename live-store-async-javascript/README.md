# Live Store — Async JavaScript ES6+ Project

A responsive product-store frontend demonstrating:

- `async/await` + `fetch()` with Fake Store API
- Dynamic search filtering
- Category tabs
- Sorting by price, rating, and name
- Client-side cart state
- `localStorage` persistence
- Loading skeletons
- User-friendly API error banner
- Modular JavaScript files

## Project structure

```text
live-store/
├── index.html
├── css/
│   └── styles.css
├── js/
│   ├── api.js
│   ├── app.js
│   ├── state.js
│   └── ui.js
└── README.md
```

## Run locally

Because ES modules are used, run the project with a local server.

### VS Code
Install the **Live Server** extension, open `index.html`, and choose **Open with Live Server**.

### Python
From the project folder:

```bash
python -m http.server 5500
```

Then open `http://localhost:5500`.

## API

Products are loaded from:

https://fakestoreapi.com/products

## GitHub submission

Create a repository and upload all project files. Suggested repository name:

`live-store-async-javascript`

The important proof files are `js/app.js` and `js/api.js`; `state.js` and `ui.js` keep the application modular.
