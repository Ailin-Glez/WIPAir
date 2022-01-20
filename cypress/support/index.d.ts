declare namespace Cypress {
    interface Chainable {
        /**
         * Custom command to login into the app
         * @param email 
         * @param pass 
         * @example cy.login('user', 'pass123')
         */
        login(email, pass)
    }
}