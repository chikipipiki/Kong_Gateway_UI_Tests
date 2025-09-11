# Kong_Gateway_UI_Tests

## Getting started

To run/develop tests:

- Install the latest stable version of [Node.js](https://nodejs.org/en)
- Clone this repository
- Restore libraries

## Restoring playwright-test libraries

All dependencies already exist in package.json, to restore them:

```shell
npm ci
#to install browsers on local machine
npx playwright install
```

## Running tests

[To run tests in various modes:](https://playwright.dev/docs/running-tests)

```shell
#run in default mode (will run all "projects" in headless mode)
npx playwright test

#open playwright ui to run/debug tests
npx playwright test --ui

#show report
npx playwright show-report
```

## Overview

This project is more a proof of concept than complete testing framwork.

I followed some ideas:

- granular tests
- page object models
-

## tests

e2e:

- open Kong Manager
- go to default workspace
- go to services tab
- add new service
- go to service routes
- add new route
- send api request to sevice's route and verify response

granular:

- check navigation menu links

- create service

- service validations:
    - invalid url
    - duplicate name
