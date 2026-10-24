# Toolshop Playwright Test Suite

Automated end to end tests for [Toolshop](https://practicesoftwaretesting.com), a public demo ecommerce site built for practicing software testing. This is a learning project that shows how I plan, structure, and automate tests.

## What it covers

| Area | What is tested |
| --- | --- |
| Authentication | Login with valid and invalid details, registration, age validation, logout |
| Catalog and search | Category browsing, keyword search, empty results, price filter, sorting, product details |
| Cart and checkout | Adding, updating, and removing items, stock limits, checkout flow |
| Favorites | Adding and managing saved products |
| Contact form | Valid submission and field validation |

The tests are based on a 23 case manual test suite I wrote first, with each case ranked by priority (P1 critical path, P2 core functions, P3 edge cases).

## How it is built

* **Playwright with JavaScript**
* **Page Object Model:** each page has its own class in the `Page` folder, so tests stay short and easy to maintain
* **Data driven tests:** test data lives in JSON files in the `Data` folder, kept separate from the test logic
* **Environment variables:** login details and URLs are stored in a private `.env` file, never in the code

The `DemoBlaze_App` folder holds a second practice project on the DemoBlaze demo store.

## Run it yourself

1. Clone this repository and run `npm install`
2. Install the browsers with `npx playwright install`
3. Create a `Config/.env` file with your own Toolshop test account details
4. Run the tests with `npx playwright test`
5. Open the report with `npx playwright show-report`

## About me

I'm Faith Osunde, a software tester based in Finland with hands on experience in manual and automated testing, Jira with Xray, and Playwright.
