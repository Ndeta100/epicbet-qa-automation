# Epicbet QA Automation Test Assignment

## Assignment Overview

This repository contains my solution for the QA Automation Engineer test assignment, testing the Epicbet sportsbook web application (https://epicbet.com/).

## Requirements Implementation

### 1. Playwright with TypeScript ✅
- Implemented using Playwright Test Framework
- Written in TypeScript for better type safety and maintainability
- See `playwright.config.ts` for configuration details

### 2. Test Cases Implementation ✅

I've implemented the following critical test cases:

1. **Sport Categories Visibility Test**
    - Verifies that all major sport categories are visible
    - Handles both directly visible categories and those in the expanded menu
    - Critical for ensuring basic navigation functionality
   ```typescript
   test('should display main sport categories', async () => {
       for (const category of SPORTS_DATA.CATEGORIES) {
           const isVisible = await sportsPage.checkSportVisible(category);
           expect(isVisible).toBe(true);
       }
   });
   ```

2. **Sports Navigation Test**
    - Validates navigation to each sport section
    - Verifies correct URL patterns
    - Ensures core navigation functionality
   ```typescript
   test('should navigate to sport section', async () => {
       await sportsPage.navigateToSport('football');
       const url = await sportsPage.getCurrentUrl();
       expect(url).toContain('/sports/football');
   });
   ```

3. **Cross-Browser Compatibility Test**
    - Tests functionality across different browsers
    - Configured in `playwright.config.ts`
    - Essential for ensuring broad user accessibility

### 3. Unauthenticated Testing ✅
- All tests run without authentication
- No personal accounts created or required
- Tests focus on publicly accessible features

### 4. Real-World Architecture ✅

Project structure follows industry best practices:

```
├── src/
│   ├── pages/         # Page Object Models
│   ├── types/         # TypeScript types
│   └── constants/     # Test data
├── tests/
│   └── sports/        # Test specifications
└── utils/
    └── test-helpers.ts # Helper functions
```

Key architectural features:
- Page Object Model for maintainability
- Type-safe implementation
- Modular and scalable structure
- Reusable utilities
- Clear separation of concerns

### 5. CI/CD and Reporting ✅

Implemented real-world testing infrastructure:
- GitHub Actions for CI/CD
- Automated test reporting
- Cross-browser test execution

## Running the Tests

```bash
# Install dependencies
npm install
npx playwright install

# Run tests
npm test

# View report
npm run report
```

## Project Structure Details

### Key Components

1. **Page Objects** (`src/pages/`)
    - `SportsPage.ts`: Handles sports navigation and interactions
    - Implements Page Object Model pattern

2. **Types** (`src/types/`)
    - `sports.types.ts`: Type definitions for sports categories
    - Ensures type safety throughout the project

3. **Test Helpers** (`utils/`)
    - Retry mechanisms
    - Screenshot capture
    - Common utilities

4. **Test Specifications** (`tests/`)
    - Organized by feature
    - Clear test descriptions
    - Maintainable structure

## Viewing Test Results

After running tests:
1. HTML Report: `npm run report`
2. Screenshots: Available in `playwright-report/`
3. Console output: Displays during test execution

## Additional Notes

- The project uses ESLint and Prettier for code quality
- All code is documented with JSDoc comments
- Error handling is implemented throughout
- Tests are designed to be stable and reliable

## Running Tests Locally

1. Clone the repository
2. Install dependencies: `npm install`
3. Install browsers: `npx playwright install`
4. Run tests: `npm test`
5. View report: `npm run report`

## Access to Repository

- Repository URL: [Your Repository URL]
