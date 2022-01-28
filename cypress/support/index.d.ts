declare namespace Cypress {
    interface Chainable {
        /**
         * Custom command to login into the app using the UI and session command
         * @example cy.loginUI()
         */
        loginUI(): void;
        /**
         * Custom command to get the proposals options
         * Receives a boolean parameter that allows to mock all proposals with Flex Job data
         * @example cy.mockProposalRequest()
         */
        mockProposalRequest(withValue?: boolean): void;
        /**
         * Custom command to create a consultation via API request
         * @example cy.createConsultation()
         */
        createConsultation(): void;
        /**
         * Custom command to archive the created Consultation via API request
         * Receives an object with the consultation id
         * @example cy.archiveConsultation(data)
         */
        archiveConsultation(consultationData): void;
    }
}
