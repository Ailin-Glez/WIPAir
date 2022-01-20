class ProposalsPage {

    selectProposalType(typeName){
        /*const fJob=cy.get('#bundlesContainer div ul li:last-child a')*/
        cy.contains(typeName).click()
    }

    searchFlexJob(name) {
        cy.intercept("GET", "**/jobcatalog/**").as("jobSearch")
        cy.get("#gtmAccessorySearchApp").type(name)
        cy.wait("@jobSearch")
    }

    includeFirstFlexJobToAll() {
        cy.get(".col-action").first().find("button").contains("Include All").click()
    }

}
export const onProposalPage = new ProposalsPage();