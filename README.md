# Playwright Automation Testing Framework

A **production-ready**, robust, and comprehensive test automation framework built with **Playwright** and **TypeScript**, employing best practices and design patterns like the **Page Object Model (POM)**. Suitable for UI, API, Accessibility, Visual Regression, Authentication, and Performance Testing, integrated with **CI/CD** using **GitHub Actions**.

---

## 🚀 Key Features

- ✅ **Modular Design**: Page Object Model (POM) for reusable and maintainable code.
- ✅ **Data-Driven Testing**: Clearly structured JSON-based datasets.
- ✅ **API Testing**: Real API tests with built-in Playwright request context.
- ✅ **Visual Regression Testing**: Automatic visual testing with snapshot comparisons.
- ✅ **Authentication and Session Management**: Tests for basic auth and session persistence.
- ✅ **CI/CD Integration**: Continuous testing with GitHub Actions.
- ✅ **Accessibility Testing**: Tests ensuring inclusive web application design.
- ✅ **Performance Testing**: Validating page load and API response performance.

---

## 📂 Project Structure

```plaintext
playwright-automation-framework
├── .github
│   └── workflows
│       └── playwright.yml  # CI/CD workflow file
├── data                    # Data-driven testing datasets
├── pages                   # Page object model classes
├── tests                   # All test suites
│   ├── accessibility       # Accessibility tests
│   ├── api                 # API tests
│   ├── auth                # Authentication & session tests
│   ├── e2e                 # End-to-End functional tests
│   ├── performance         # Performance/load tests
│   └── visual              # Visual regression tests
├── utils                   # Reusable utility functions
├── .env                    # Environment variables
├── playwright.config.ts    # Playwright configuration file
├── package.json
└── README.md
```

---

## ⚙️ Installation & Setup

**Step 1: Clone the Repository**

```bash
git clone https://github.com/vinay1g-commits/playwright-typescript-automation-framework.git
cd playwright-automation-testing-framework
```

**Step 2: Install Dependencies**

```bash
npm install
```

**Step 3: Install Playwright Browsers**

```bash
npx playwright install
```

**Step 4: Environment Setup**

Create a `.env` file with your test URL:

```env
BASE_URL=https://www.saucedemo.com
```

---

## ▶️ Running Tests

Run all tests:

```bash
npx playwright test
```

Run specific tests:

```bash
# Run API tests
npx playwright test tests/api/

# Run visual tests and update snapshots
npx playwright test tests/visual/ --update-snapshots

# Run specific test file
npx playwright test tests/e2e/login.test.ts
```

Open test reports clearly:

```bash
npx playwright show-report
```

---

## 🚦 CI/CD Pipeline (GitHub Actions)

This project is integrated with GitHub Actions. Tests run automatically upon pushing or creating pull requests to the `main` branch.

- **View CI/CD workflows:**  
  [GitHub Actions Tab](https://github.com/vinay1g-commits/playwright-typescript-automation-framework/actions)

---

## 📚 Technologies Used

- [Playwright](https://playwright.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [GitHub Actions](https://github.com/features/actions)
- [dotenv](https://github.com/motdotla/dotenv)
- [FakerJS](https://fakerjs.dev/)

--

## 🎯 Future Improvements (Roadmap)

- Extend API tests coverage (authentication, CRUD operations).
- Integrate more accessibility checks with automated reports.
- Enhance performance tests with advanced metrics and monitoring.
- Add Docker support for environment consistency.

---

## 🤝 Contributing

Feel free to fork this repository, submit pull requests, and contribute to improving this project.

---

## 📜 License

This project is open-source, available under the [MIT License](LICENSE).

---

## ✉️ Contact

- **Your Name:**
- **GitHub:** https://github.com/vinay1g-commits

---
