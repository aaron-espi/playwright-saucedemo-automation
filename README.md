<br />
<div align="center">
  <a href="">
    <img src="https://raw.githubusercontent.com/microsoft/playwright/main/packages/web/src/assets/playwright-logo.svg" alt="Logo" width="125" height="125">
  </a>

  <h3 align="center">Automated Web Testing with Playwright</h3>

  <p align="center">
   Portfolio demonstrating my skills in automating web applications using Playwright.
    <br />
  </p>
</div>

<br/>

## About The Project

This repository demonstrates my QA and test automation skills using Playwright. It is a project created as part of my internal portfolio to showcase my ability to write automated tests for web applications. The focus of this project is on simulating real-world user scenarios and ensuring the quality and proper functioning of critical system features. Although this is not a real store, the project simulates the testing of a sample e-commerce platform to validate key functionalities.

### Built With

- [![Playwright](https://img.shields.io/badge/Playwright-333333?style=for-the-badge&logo=playwright&logoColor=white)](https://playwright.dev/)
- [![TypeScript][TypeScript.com]][TypeScript-url]
- [![GitHub Actions][GitHubActions.com]][GitHubActions-url]
- [![NPM][NPM.com]][NPM-url]
- [![Dotenv][Dotenv.com]][Dotenv-url]

<br/>

## Project Structure

This project is structured as follows:

```bash
playwright-saucedemo-automation/
├── .github/
│   └── workflows/                      # GitHub Actions workflows
├── src/
│   ├── tests/                          # Automated tests
│   ├── pages/                          # Page objects that encapsulate the UI elements and interactions
│   ├── config/                         # Configuration files, environment settings, and reusable test configurations
│   └── constants/
│       ├── enum/                       # Enumerations
│       ├── locators/                   # UI element locators
│       └── StringConstants.ts          # Text constants and messages
├── playwright.config.ts
├── .gitignore
├── package.json
├── package-lock.json
└── README.md
```

<br/>

## Getting Started

### Prerequisites

Before you begin, make sure you have the following tools installed on your machine:

- **npm**
  
  ```sh
  npm install npm@latest -g
  ```
- **dotenv**
  
  ```sh
  npm install dotenv
  ```
- **Playwright**
  
  ```sh
  npm install playwright
  ```

### Installation

Follow these steps to install and set up the project locally:

1. **Clone the repository**
   
   ```sh
   git clone https://github.com/aaron-espi/playwright-saucedemo-automation.git
   ```
2. **Install dependencies**
   
   ```sh
   npm install
   ```
3. **Set up environment variables:**
   
   - **`NODE_ENV`**: The environment setting for the application ('dev', 'pre', 'prod').
   - **`VALID_USERNAME`**: The valid username for logging in.
   - **`VALID_PASSWORD`**: The corresponding password for the valid user.
   - **`INVALID_USERNAME`**: An incorrect username to test failed login.
   - **`INVALID_PASSWORD`**: An incorrect password to test failed login.
   - **`LOCKED_USERNAME`**: A locked username to test login failure due to account lock.
   - **`BUYER_FIRST_NAME`**: The first name of the buyer for the checkout process.
   - **`BUYER_LAST_NAME`**: The last name of the buyer for the checkout process.
   - **`BUYER_ZIP_CODE`**: The ZIP code of the buyer for the checkout process.

<br/>

## Usage

### Running Tests

To run the tests locally, use the following command:

```sh
npx playwright test
```

This will run all the tests in the project, simulating different user interactions and verifying the behavior of the application.

### Configuring for Different Environments

You can easily customize the .env file to configure environment variables for various testing scenarios. For example, you can switch between different environments, test with various usernames, passwords, and modify other data related to the checkout process.

<br/>

## Continuous Integration with GitHub Actions

This project integrates GitHub Actions for continuous integration (CI), ensuring that automated tests are run on every push to the main branch and on every pull request.

Whenever changes are pushed to main or a pull request is created, GitHub Actions automatically triggers the test workflow. This workflow ensures that the code is tested in a clean environment.

### Workflow Details

- **Triggered on:**
  - Pushes to the main branch.
  - Pull requests targeting the main branch.
- **Actions Performed:**
  - Checkout the repository.
  - Install the necessary dependencies.
  - Install Playwright browsers.
  - Run Playwright tests.
  - Upload Playwright test results as artifacts for review.

[Playwright-url]: https://playwright.dev/
[TypeScript.com]: https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white
[TypeScript-url]: https://www.typescriptlang.org/
[GitHubActions.com]: https://img.shields.io/badge/GitHub_Actions-2088FF?style=for-the-badge&logo=github-actions&logoColor=white
[GitHubActions-url]: https://github.com/features/actions
[Dotenv.com]: https://img.shields.io/badge/Dotenv-1A2C4C?style=for-the-badge&logo=dotenv&logoColor=white
[Dotenv-url]: https://www.npmjs.com/package/dotenv
[NPM.com]: https://img.shields.io/badge/NPM-CB3837?style=for-the-badge&logo=npm&logoColor=white
[NPM-url]: https://www.npmjs.com/
