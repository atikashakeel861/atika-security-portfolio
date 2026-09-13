# Atika — Information Security Portfolio

A static, multi-page personal portfolio built with plain HTML, CSS, and
JavaScript (no framework, no backend) for the Web Technologies Assignment 01
brief (BS CS F24 — Faculty of Information and Technology).

## Folder structure

```
atika-security-portfolio/
├── index.html          Home
├── about.html           About
├── skills.html          Skills (Services/Products equivalent)
├── portfolio.html       Gallery / Portfolio
├── contact.html         Contact
├── css/
│   └── style.css        Single shared stylesheet
├── js/
│   └── main.js           All interactivity
└── images/               (empty — the design uses inline SVG instead of photos)
```

## Running it locally

No build step or server is required — just open `index.html` in a browser.
For a closer-to-production feel (so relative paths and the map iframe behave
exactly as they would when deployed), you can also serve it locally:

```
cd atika-security-portfolio
python3 -m http.server 8000
```

Then visit `http://localhost:8000`.

## The five pages

| Page | Purpose |
|---|---|
| `index.html` | Hero introduction, highlight stats, focus-area summary |
| `about.html` | Education timeline, background, two focus areas |
| `skills.html` | Tabbed skill list (Offensive Security / AI & LLM Security / Tools) |
| `portfolio.html` | Project carousel — three real projects with details |
| `contact.html` | Validated contact form, contact details, map, FAQ accordion |

## JavaScript features (in `js/main.js`)

1. **Hamburger nav menu** — `initNavToggle()` — collapses the nav into a
   toggleable menu under ~820px.
2. **Active link highlighting** — `initActiveNavLink()` — compares the
   current URL to each nav link and marks the match.
3. **Project carousel** — `initCarousel()` — slides via `transform:
   translateX(...)`, with dot navigation, arrow buttons, and auto-advance
   that pauses on hover.
4. **FAQ accordion** — `initAccordion()` — toggles `max-height` and
   `aria-expanded` so only one answer is open at a time.
5. **Skills tab switcher** — `initTabs()` — swaps which `.tab-panel` has the
   `active` class based on the clicked button's `data-tab`.
6. **Contact form validation** — `initContactForm()` — checks name length,
   email format, and message length on submit, with inline error messages
   and a status banner on success/failure.
7. **Back-to-top button** — `initBackToTop()` — appears after scrolling and
   smooth-scrolls to top on click.

Each function starts with an early `return` if its markup isn't on the page,
so `main.js` can be safely linked from every page without errors.

## Git & GitHub — branching workflow

Run this from inside the `atika-security-portfolio` folder.

```bash
git init
git add .
git commit -m "Initial commit: project structure and home page"

# Create GitHub repo, then link it (replace the URL with your own repo)
git branch -M main
git remote add origin https://github.com/<your-username>/atika-security-portfolio.git
git push -u origin main
```

Then build the rest of the site on feature branches and merge them in one at
a time — this is what the assignment's "Version Control Requirements" is
checking for:

```bash
git checkout -b feature-navbar
# ...work on the nav / hamburger menu...
git add .
git commit -m "Add responsive nav bar with hamburger toggle"
git checkout main
git merge feature-navbar
git push

git checkout -b feature-about-page
# ...build about.html...
git commit -am "Add About page with education timeline"
git checkout main
git merge feature-about-page
git push

git checkout -b feature-portfolio-carousel
# ...build portfolio.html + carousel JS...
git commit -am "Add portfolio page with project carousel"
git checkout main
git merge feature-portfolio-carousel
git push

git checkout -b feature-contact-form
# ...build contact.html + validation...
git commit -am "Add contact page with form validation and FAQ accordion"
git checkout main
git merge feature-contact-form
git push
```

Keep commit messages specific ("Add email regex validation to contact form",
not "update code") — the instructor is explicitly checking commit history.

## Deploying with GitHub Pages (free, no server needed)

1. Push the project to GitHub (steps above).
2. On GitHub, open the repo → **Settings** → **Pages**.
3. Under **Build and deployment → Source**, choose **Deploy from a branch**.
4. Branch: `main`, folder: `/ (root)` → **Save**.
5. GitHub gives you a live URL after a minute or two, typically:
   `https://<your-username>.github.io/atika-security-portfolio/`
6. Bring this link (and the repo open in a code editor) to the viva.

## Viva preparation checklist

Since this assignment is graded entirely through a live viva, be ready to:

- **Walk through the HTML structure** — explain why `<header>`, `<nav>`,
  `<main>`, `<section>`, and `<footer>` were used instead of generic `<div>`s.
- **Explain the CSS** — the `:root` custom properties (design tokens), the
  `.hero-grid` / `.grid-3` Grid layouts, the `@media` breakpoints for
  responsiveness, and how the hamburger menu's CSS (`max-height` transition)
  works together with the JS that toggles its class.
- **Explain the JavaScript, function by function** — especially
  `addEventListener`, `classList.toggle`, and the way each `init...()`
  function is scoped to one feature.
- **Explain the form validation logic** — what `testFn` checks for each
  field, what happens on valid vs. invalid submission, and why validation
  re-runs on `input` events.
- **Justify the design decisions** — the "case file / security report"
  visual concept (navy background, amber "clearance stamp" accent, monospace
  used only for reference-style labels) ties directly to the security theme
  of the content.
- **Be ready for small live edits** — e.g. adding a new skill list item, a
  new FAQ question, or changing the carousel's auto-advance timing in
  `main.js`.

Practice explaining every section before the viva — code you can't explain
counts as not understood, regardless of how it looks.
