/// <reference types="cypress" />

describe('Bookstore API Setup', () => {

    let authToken;
    let userId;
    const username = `testuser_${Math.floor(Math.random() * 10000)}`
    const password = `Password123!`

    beforeEach(() => {
        // Create a user via API before each test
        cy.request('POST', 'https://demoqa.com/Account/v1/User', {
            userName: username,
            password: password
        }).then((createResponse) => {
            expect(createResponse.status).to.eq(201)
            userId = createResponse.body.userID
            cy.log(`User Created Successfully: ${username} ${password} (ID: ${userId})`)


        // Login the user
        cy.request('POST', 'https://demoqa.com/Account/v1/GenerateToken', {
            userName: username,
            password: password
        }).then((loginResponse) => {
            expect(loginResponse.status).to.eq(200)
            authToken = loginResponse.body.token
            expect(authToken).to.exist
            cy.log('Auth Token Captured: ' + authToken)

            cy.window().then((window) => {
            window.localStorage.setItem('token', authToken)
            window.localStorage.setItem('userName', username)
            window.localStorage.setItem('userID', userId)
        })
    })
    })

   
})
it('should have an auth token available', () => {
    // Simple check that token exists
    expect(authToken).to.exist
    cy.log('Token is ready to use for API or UI tests')
})
})  
