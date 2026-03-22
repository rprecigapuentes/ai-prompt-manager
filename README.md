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
└── test/
    ├── features/           # Gherkin .feature files
    ├── step-definitions/   # Selenium step definitions
    └── pages/              # Page Object Model classes
```

---

## Linting

```bash
npm run lint
```

ESLint checks all source files for errors and style issues (unused variables, missing semicolons, wrong quote style, etc.). The CI pipeline runs this before tests.

---

## Running Tests

```bash
npm test
```

Test reports are generated with Allure. After a test run:

```bash
npx allure serve allure-results
```

---

## Running with Docker

```bash
docker-compose up --build
```

The app will be available at `http://localhost:3000`.

---

## Author

Built for the Jalasoft Automation Testing Bootcamp application.
