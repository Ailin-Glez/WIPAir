import { Given, And, When, Then, But } from "cypress-cucumber-preprocessor/steps";
import { url } from "inspector";
import { maxTimeout, ProposalTypes } from "../../../fixtures/constants";
import { urls } from "../../../fixtures/urls";
import { onFlexJob } from "../../../pages/ProposalBuilderPage/FlexJob";
import { ProposalsBasePage, ProposalStatus } from "../../../pages/ProposalBuilderPage/ProposalsBasePage";
import { baseBody } from "../../../support/commands";

const withValue = true;
const onProposalPage = new ProposalsBasePage();
let data;

before(() => {
    cy.loginUI();
    cy.createConsultation();
    cy.get('@consultationData').then((consultationData) => {
        data = consultationData;
    });
});

after(() => {
    const consultationData = {
        ...baseBody,
        consultationId: data.consultation_id
    };

    cy.archiveConsultation(consultationData);
});

Given('I have added Flex Jobs to the Proposals', () => {
    cy.intercept('POST', urls.consultationSaved).as('consultationSaved');
    cy.loginUI();
    cy.window().then((win) => win.sessionStorage.setItem('ocaa.consultation', JSON.stringify(data)));
    cy.mockProposalRequest(withValue);
    cy.visit(urls.proposal);
    cy.wait('@consultationSaved', { timeout: maxTimeout });
});

When('a modal is displayed with the message: {string}', (modalMessage: string) => {
    onProposalPage.verifyModalText(modalMessage);
});

Then('all the Proposals are removed', () => {
    onFlexJob.verifyProposalsContainers(ProposalStatus.empty);
});

And('I click on the Accessories Only button', () => {
   onProposalPage.selectProposalType(ProposalTypes.accessoryOnly);
});

And('I click on the {string} button', (btn: string) => {
    cy.intercept('POST', urls.cleanProposalData).as('cleanData');
    onProposalPage.clickModalButton(btn);
    cy.wait('@cleanData');
});