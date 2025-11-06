# Bookstore Hybrid Test Framework (Cypress)

## Overview

This project demonstrates a **hybrid testing strategy** that combines **API testing** and **UI automation** using Cypress.  
The tests are designed around the [DemoQA Bookstore Application](https://demoqa.com/books), leveraging both REST API calls and front-end UI interactions to ensure full end-to-end coverage.

---

## Hybrid Test Strategy

### Why Hybrid?

Instead of relying solely on UI interactions—which can be slower and more brittle—this framework uses a **hybrid approach**:

| Layer | Tool | Purpose |
|--------|------|----------|
| **API Layer** | `cy.request()` | Create and authenticate users, manage tokens, and add books to a collection via direct API calls for speed and reliability. |
| **UI Layer** | Cypress UI commands | Validate that UI elements reflect API-driven actions (e.g., verifying the book appears in the user’s profile). |

This ensures:
- Faster test setup and teardown  
- Reduced UI flakiness  
- Better validation of both backend and frontend consistency

---

## Test Flow

Each test run follows this structure:

1. **User Creation (API)**
   - A new user is dynamically generated using a unique username.
   - Endpoint: `POST /Account/v1/User`

2. **User Authentication (API)**
   - A valid JWT token is obtained using the generated user credentials.
   - Endpoint: `POST /Account/v1/GenerateToken`

3. **Token Injection (UI)**
   - The token, username, and user ID are stored in the browser’s localStorage for UI test use.

4. **Book Addition (API or UI)**
   - The test adds a book to the user’s collection.
   - Endpoint: `POST /BookStore/v1/Books`

5. **Validation (UI + API Intercept)**
   - The UI is loaded, and Cypress asserts that the added book appears in the profile.
   - `cy.intercept()` is used to dynamically wait for the `GET /BookStore/v1/User/{userId}` call.

6. **Cleanup (API)**
   - The user account is deleted after each test run.
   - Endpoint: `DELETE /Account/v1/User/{userId}`

---

## API Endpoints Used

| HTTP Method | Endpoint | Purpose |
|--------------|-----------|----------|
| **POST** | `/Account/v1/User` | Register a new user |
| **POST** | `/Account/v1/GenerateToken` | Generate an authentication token |
| **POST** | `/BookStore/v1/Books` | Add books to the user’s collection |
| **GET** | `/BookStore/v1/User/{userId}` | Retrieve user’s collection (used in UI verification) |
| **DELETE** | `/Account/v1/User/{userId}` | Delete the user (cleanup step) |

> **Base URL:** `https://demoqa.com`

---

## Example Test Coverage

  - **API + UI Integration Test**
  - Register a new user  
  - Generate and store an auth token  
  - Log into the Bookstore UI  
  - Add a book via API  
  - Verify via UI that the book appears in the user’s profile  
  - Clean up the created user after tests  

---

## Technologies

- **Cypress** (End-to-End & API testing)
- **JavaScript (ES6+)**
- **DemoQA Bookstore API**
- **Mocha/Chai** assertions
- **cy.intercept()** for dynamic waits

---

## How to Run

1. Install dependencies  
   ```bash
   npm install

2. Run tests in headed mode
   - npx cypress open
3. Run headless mode
   - npx cypress run
