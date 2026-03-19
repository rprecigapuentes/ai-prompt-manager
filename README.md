# AI Prompt Manager

A web application for managing AI prompts — create, edit, delete, search, and test prompts with a built-in mock AI response feature.

Built as a portfolio project to demonstrate **test automation skills** using industry-standard tools.

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

- Fake login page
- Create, read, update, and delete prompts
- Each prompt has a title, body, and tags
- Keyword search and tag filtering
- Mock AI response simulation

---

## Getting Started

### Prerequisites
- Node.js v18+ (use [nvm](https://github.com/nvm-sh/nvm))
- npm

### Install & Run

```bash
npm install
node app.js
```

The app will be available at `http://localhost:3000`.

### Run Tests

```bash
npm test
```

---

## Project Structure

```
ai-prompt-manager/
├── app.js                 # Entry point
├── src/                   # Application logic
├── views/                 # EJS templates
├── public/                # Static assets (CSS)
└── test/
    ├── features/          # Gherkin feature files
    ├── step-definitions/  # Selenium step definitions
    └── pages/             # Page Object Model classes
```

---

## Author

Built for the Jalasoft Automation Testing Bootcamp application.
