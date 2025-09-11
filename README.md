# Kong Gateway UI Tests

Automated end-to-end and integration tests for Kong Gateway Manager UI using [Playwright](https://playwright.dev/).

---

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/en) (latest LTS recommended)
- [Docker](https://www.docker.com/) (for running Kong and dependencies)

### Setup

1. **Clone the repository:**

    ```sh
    git clone https://github.com/chikipipiki/Kong_Gateway_UI_Tests.git
    cd Kong_Gateway_UI_Tests
    ```

2. **Install dependencies:**

    ```sh
    npm ci
    ```

3. **Install Playwright browsers (local development):**

    ```sh
    npx playwright install
    ```

4. **Start Kong Gateway and dependencies:**
    ```sh
    docker compose up -d
    ```

---

## Running Tests

- **Run all tests (headless, all browsers):**

    ```sh
    npx playwright test
    ```

- **Open Playwright UI for interactive running/debugging:**

    ```sh
    npx playwright test --ui
    ```

- **Show HTML report:**
    ```sh
    npx playwright show-report
    ```

---

## Project Structure

- `tests/` - Test specs (e2e, granular, UI content)
- `page_objects/` - Page Object Models (POMs) for UI abstraction
- `models/` - Data models for test entities (Service, Route, etc.)
- `helpers/` - API helpers and utilities
- `fixtures/` - Playwright fixtures for setup/teardown and POM wiring
- `playwright.config.ts` - Playwright configuration
- `docker-compose.yml` - Kong Gateway and Postgres setup for local testing

---

## Test Types

### E2E Workflow

- Open Kong Manager
- Navigate to default workspace
- Go to Services tab
- Add a new service
- Go to service routes
- Add a new route
- Send API request to the service's route and verify the response

### Granular Tests

- Check navigation menu links
- Check overview card contents
- Create service
- Edit service
- Delete service
- Create service validations:
    - Invalid URL
    - Duplicate name
- Create route

---

## CI Integration

Tests are automatically run on pushes and pull requests to the `dev` branch via [GitHub Actions](.github/workflows/playwright.yml). Reports are published to [GitHub Pages](https://chikipipiki.github.io/Kong_Gateway_UI_Tests/).

---

## Resources

- [Playwright Documentation](https://playwright.dev/docs/intro)
- [Fixtures in Playwright](https://playwright.dev/docs/test-fixtures)

---

## Notes

- This project is a proof of concept and not a complete testing framework.
- Page Object Model (POM) pattern is used for maintainability.
- Test data is generated using [faker](https://www.npmjs.com/package/@faker-js/faker).

---
