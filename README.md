# Automated Web Testing with Playwright

This repository demonstrates my **QA and test automation skills** using **Playwright**. It is a project created as part of my **internal portfolio** to showcase my ability to write automated tests for web applications. The focus of this project is on simulating real-world user scenarios and ensuring the quality and proper functioning of critical system features. Although this is not a real store, the project simulates the testing of a sample e-commerce platform to validate key functionalities.

---

### Software Requirements

To run the tests, make sure you have the following installed:

- **IDE**
- **Node.js**
- **Playwright**
- **dotenv**

To install the necessary dependencies, run the following command at the root of the project:

```bash
npm install
```

---

### Project Structure

This project is structured as follows:

```bash
playwright-saucedemo-automation/
│
├── src/                                 
│   ├── tests/                          # Automated tests
│   │
│   ├── pages/                          # Page objects that encapsulate the UI elements and interactions.
│   │
│   └── constants/                       
│       ├── enum/                       # Enumerations
│       ├── locators/                   # UI element locators
│       └── StringConstants.ts          # Text constants and messages
│
├── playwright.config.ts                
├── .gitignore                          
├── package.json                        
├── package-lock.json                   
└── README.md                            
```

---

### Environment Variables

The project requires a `.env` file at the root of the project to configure the system access credentials. In the `.env` file, you should add the following variables:

---

### Required Variables

- **VALID_USERNAME:** The valid username for logging in.
- **VALID_PASSWORD:** The corresponding password for the valid user.
- **INVALID_USERNAME:** An incorrect username to test failed login.
- **INVALID_PASSWORD:** An incorrect password to test failed login.
- **LOCKED_USERNAME:** A locked username to test login failure due to account lock.
- **BASE_URL:** The base URL of the application for running the tests.
- **ABOUT_URL:** The URL of the "About" page of the application.

---

### Running Tests

Once the variables are set up in the `.env` file, you can run the tests using Playwright.

#### Run All Tests

```bash
npx playwright test
```

#### Run a Specific Test

If you want to run a specific test, you can use the following command:

```bash
npx playwright test tests/login.spec.ts
```

---

### Continuous Integration with GitHub Actions

This project integrates GitHub Actions for continuous integration (CI), ensuring that automated tests are run on every push to the main branch and on every pull request.

Whenever changes are pushed to main or a pull request is created, GitHub Actions automatically triggers the test workflow. This workflow ensures that the code is tested in a clean environment.

#### Workflow Details
- Triggered on:
    - Pushes to the main branch.
    - Pull requests targeting the main branch.
- Actions Performed:
    - Checkout the repository.
    - Install the necessary dependencies.
    - Install Playwright browsers.
    - Run Playwright tests.
    - Upload Playwright test results as artifacts for review.

#### View Test Results

After the tests are executed, GitHub Actions will automatically upload the results as artifacts. Results can be viewed in the GitHub Actions UI to quickly identify any failing tests and resolve issues.

This ensures that all changes are tested before they are merged into main, helping to maintain a stable codebase.