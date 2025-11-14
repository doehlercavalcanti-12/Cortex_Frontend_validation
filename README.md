# Boilerplate React

A modern React + TypeScript boilerplate powered by Vite. This project includes automated
quality gates (linting, testing, security scans) and end-to-end tooling to help you ship
production-ready front-end applications quickly.

## Getting Started

### 1. Install dependencies

```bash
npm install
```

This command installs all runtime and development dependencies, including tooling for
linting, testing, Playwright end-to-end tests, and Husky git hooks.

### 2. Configure the project

```bash
npm run config
```

The `config` script validates the boilerplate structure by ensuring that critical
directories (such as `src/`, `public/`, and `reports/`) exist and that required entry
files (`index.html`, `public/index.html`, `src/index.tsx`, and `src/App.tsx`) are present. You can
re-run the script any time you need to confirm the environment is correctly set up.

### 3. Start the development server

```bash
npm run dev
```

The app will start on [http://localhost:5173](http://localhost:5173) with hot module
replacement enabled.

## Additional Scripts

- `npm run build` – Type-checks the project and produces a production-ready build in
  `dist/`.
- `npm run lint` – Runs ESLint with React, accessibility, and TypeScript rules.
- `npm run typecheck` – Performs a strict TypeScript type check without emitting files.
- `npm run test` – Executes the Jest unit test suite.
- `npm run coverage:report` – Generates Jest coverage data and outputs a Markdown summary to `reports/coverage.md`.
- `npm run playwright` – Builds the app and executes Playwright end-to-end tests against the Vite preview server.
- `npm run security` – Runs the ESLint security ruleset (OWASP-focused) against the
  source code.

## Conventional Commits & Git Hooks

Husky installs a pre-commit hook that runs linting and tests on staged files. Commit
messages are validated against the Conventional Commits specification through Commitlint.

## Docker support

A lightweight Dockerfile is included so you can containerize the application:

```bash
docker build -t boilerplate-react .
```

## Project Structure

```
.
├── public/             # Static assets served by Vite
├── src/                # React + TypeScript application code
├── tests/              # Playwright end-to-end tests
├── reports/            # Generated lint, coverage, and security reports
├── scripts/            # Utility scripts (including npm run config)
└── README.md
```
