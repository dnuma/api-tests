# ExpandTesting.com API Test Suite (Playwright & TypeScript)

This repository contains an end-to-end API test suite for the **ExpandTesting.com** platform, implemented using **Playwright** and **TypeScript**. It demonstrates a robust flow covering user registration, authentication (login/logout), profile management (get/update), and cleanup (delete user).

-----

## Features

  * **API Testing:** Focused on validating API endpoints and business logic.
  * **Playwright:** Leverages Playwright's superb **`request`** context for reliable API testing.
  * **TypeScript:** Provides strong typing for improved code quality and maintainability.
  * **Faker.js:** Utilizes `@faker-js/faker` for generating realistic and unique test data (user names, emails, passwords, etc.).
  * **E2E Flow:** Tests a complete user lifecycle: **Register** $\to$ **Login** $\to$ **Get Profile** $\to$ **Update Profile** $\to$ **Logout** $\to$ **Delete User**.
  * **Data Validation:** Includes assertions to verify correct HTTP status codes and data integrity across requests.

-----

## Technology Stack

| Technology | Description |
| :--- | :--- |
| **Playwright** | Test Automation Framework |
| **TypeScript** | Primary programming language |
| **Node.js** | Runtime environment |
| **@faker-js/faker** | Data generation for tests |

-----

## Getting Started

### Prerequisites

You'll need **Node.js** (version 16 or higher) installed on your machine.

### Installation

1.  **Clone the repository:**

    ```bash
    git clone https://github.com/dnuma/api-tests.git
    cd api-tests
    ```

2.  **Install dependencies:**

    ```bash
    npm install
    # or
    yarn install
    ```

### Configuration

No special configuration needed after installing all dependencies and browsers

-----

## Running the Tests

To execute the API test suite, use:

```bash
npx run test '@api'
```

### View Test Report

After the run, you can generate and view the detailed HTML report:

```bash
npx playwright show-report
```

-----

## Key Test Flow

The single test case provided executes the following steps in sequence:

1.  **Health Check:** Verifies the API is up and running.
2.  **Register an user:** Creates a new, unique user.
3.  **Login:** Authenticates the user and retrieves a **token**.
4.  **Get Profile info:** Uses the token to retrieve profile details and verifies data integrity.
5.  **Update profile:** Patches the user profile with new Faker data (phone, company) and verifies the changes.
6.  **Logout user:** Invalidates the current token and verifies subsequent calls with the old token fail.
7.  **Cleanup - Delete user:** Logs in again (to get a new token) and deletes the user, finally confirming the user is no longer able to log in.