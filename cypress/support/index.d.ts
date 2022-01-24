declare namespace Cypress {
    interface Chainable {
        /**
         * Custom command to login into the app using the UI and session command 
         * @example cy.loginUI()
         */
        loginUI(): void
        /**
         * Custom command to always get the proposals options empty
         * @example cy.mockProposalRequest()
         */
        mockProposalRequest(): void
    }
}