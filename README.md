# AI Prompt Manager

A web application for managing AI prompts — create, edit, delete, search, and test prompts with a built-in mock AI response feature.

Built as a portfolio project to demonstrate **test automation skills** using industry-standard tools: Selenium WebDriver, Cucumber.js, Docker, Jenkins, and Allure Reports.

---

## Tech Stack

| Layer | Technology |
|---|---|
| Backend | Node.js, Express |
| Templates | EJS |
| Database | SQLite (better-sqlite3) |
| Testing | Selenium WebDriver, Cucumber.js (Gherkin) |
| CI/CD | Jenkins |
| Reporting | Allure Reports |
| Containers | Docker, docker-compose |
| Linting | ESLint |

---

## Features

- Login page (any credentials accepted — demo app)
- Create, read, update, and delete prompts
- Each prompt has a title, body, and comma-separated tags
- Keyword search across title and body
- Tag filtering — click any tag to filter the list
- "Ask AI" button on each prompt — sends the prompt to a mock endpoint and displays a simulated AI response without reloading the page

---

## Getting Started

### Prerequisites

- Node.js v18+ — install with [nvm](https://github.com/nvm-sh/nvm):
  ```bash
  nvm install --lts
  nvm use --lts
  ```
- Google Chrome (required for Selenium tests)

### Install & Run

```bash
git clone https://github.com/rprecigapuentes/ai-prompt-manager.git
cd ai-prompt-manager
npm install
npm start
```

Open `http://localhost:3000/login` in your browser. Sign in with any username and password.

The SQLite database is created automatically at `data/prompts.db` on first run.

---

## Project Structure

```
ai-prompt-manager/
├── app.js                  # Entry point — starts the Express server
├── package.json            # Dependencies and npm scripts
├── cucumber.js             # Cucumber runner config (features, steps, Allure reporter)
├── src/
│   ├── db.js               # SQLite database setup
│   └── routes/
│       ├── auth.js         # Login / logout
│       ├── prompts.js      # CRUD for prompts (search + tag filter)
│       └── ai.js           # Mock AI response endpoint
├── views/                  # EJS templates
│   ├── login.ejs
│   ├── index.ejs           # Prompt list
│   ├── create.ejs
│   ├── edit.ejs
│   ├── detail.ejs          # Single prompt + Ask AI
│   └── 404.ejs
├── public/
│   └── css/style.css
├── test/
│   ├── features/           # Gherkin .feature files (5 features, 14 scenarios)
│   ├── step-definitions/   # Selenium step definitions
│   ├── pages/              # Page Object Model classes
│   └── support/            # World setup, hooks, Allure environment config
└── docs/                   # Test evidence — Allure report exports (PDF + CSV)
```

---

## Linting

```bash
npm run lint
```

ESLint checks all source files for errors and style issues (unused variables, missing semicolons, wrong quote style, etc.). The CI pipeline runs this before tests.

---

## Running Tests

The app must be running before executing the test suite.

**Terminal 1 — start the app:**
```bash
npm start
```

**Terminal 2 — run tests:**
```bash
npm test
```

This clears previous results and runs all 14 Cucumber scenarios against a headless Chrome browser.

### Generate & view the Allure report

```bash
npm run report        # generates allure-report/ from allure-results/
allure open allure-report
```

---

## Test Automation Framework

### Structure

| Directory | Purpose |
|---|---|
| `test/features/` | 5 Gherkin feature files written in plain English |
| `test/step-definitions/` | JavaScript functions that connect Gherkin steps to Selenium actions |
| `test/pages/` | Page Object Model — one class per page, encapsulates all selectors and actions |
| `test/support/` | Cucumber World (WebDriver setup), Before/After hooks, Allure environment writer |

### Feature files and scenarios

| Feature | Scenarios |
|---|---|
| `create-prompt.feature` | Create with all fields, create without tags, fail without title |
| `list-prompts.feature` | View all, search by keyword, filter by tag, clear filters |
| `edit-prompt.feature` | Edit title/body, edit tags, fail without title |
| `delete-prompt.feature` | Delete from list, delete from detail page |
| `ai-response.feature` | Ask AI and receive response, button presence check |

**Total: 14 scenarios, 97 steps**

### Page Object Model classes

| Class | Page covered |
|---|---|
| `BasePage.js` | Shared helpers: `click`, `type`, `getText`, `isVisible`, `waitForVisible` |
| `LoginPage.js` | Login form |
| `HomePage.js` | Prompt list, search, tag cloud |
| `CreatePage.js` | Create prompt form |
| `DetailPage.js` | Prompt detail, edit form, Ask AI |

---

## Test Results: From 35.71% to 100%

On the first real browser run, **5 of 14 scenarios passed (35.71%)**. The remaining 9 failed due to a series of bugs in the test code — not in the app itself. Each bug was diagnosed and fixed systematically.

### Bugs found and fixed

| # | Bug | Root cause | Fix |
|---|---|---|---|
| 1 | Step timeout after 5s | Cucumber's default step timeout was too short for headless Chrome startup | Set `setDefaultTimeout(30000)` in `world.js` |
| 2 | `confirm()` dialog crashed Selenium | The delete button triggers a native browser `confirm()` dialog — Selenium can't interact with the DOM while it's open | Added `driver.switchTo().alert().accept()` after each delete click |
| 3 | Server-side error never shown | HTML5 `required` attribute on form inputs blocks submit at the browser level, so the server never runs validation and the error message never renders | Added `form.noValidate = true` via `executeScript` before each test submit |
| 4 | Edit button opened Logout instead | `a.btn-secondary` matched the Logout link (which shares the same CSS class) before the Edit link in DOM order | Changed selector to `a[href*="/edit"]` |
| 5 | Deleted prompt still visible | The `prompts` database had accumulated entries from previous failed runs — deleting one left others | Added a `BeforeAll` hook that truncates the DB before the full suite runs |
| 6 | Navigation timing race condition | After login form submit, `driver.get('/prompts/new')` was called before the login redirect completed — the browser ended up at `/` with no `#title` input | Added `driver.wait(until.urlIs('/'))` after login to confirm redirect before proceeding |

**Final result: 14/14 scenarios passing (100%)**

See `docs/` for the exported Allure reports at both stages:
- `docs/allure-report-35.71%.pdf` — initial failing run
- `docs/allure-report-100%.pdf` — all passing
- CSV exports also included for data analysis

---

## Running with Docker

```bash
docker-compose up --build
```

The app will be available at `http://localhost:3000`.

---

## Author

Rosemberth Steeven Preciga Puentes
