import { Given, And, When, Then, But } from "cypress-cucumber-preprocessor/steps";
import { urls } from '../../../fixtures/urls';
import { ButtonStatus, maxTimeout, ProposalNames, ProposalTypes } from '../../../fixtures/constants';
import { ProposalStatus } from '../../../pages/ProposalBuilderPage/ProposalsBasePage';
import { onFlexJob } from '../../../pages/ProposalBuilderPage/FlexJob';
import { consultationStagingTest } from '../../../fixtures/mock-proposal-response';

const index = 0;

Given('I am on the Proposals screen', () => {
    cy.intercept('GET', urls.flexJobsCatalog).as('flexJobCatalog');
    cy.loginUI();
    cy.window().then((win) => win.sessionStorage.setItem('ocaa.consultation', JSON.stringify(consultationStagingTest)));
    cy.mockProposalRequest();
    cy.visit(urls.proposal);
});

Given('all the Recommend buttons are {word} since the Proposals haven\'t a Flex Job added', (bntStatus: string) => {
    onFlexJob
        .clickFlexJobExpandBtn()
        .verifyRecommendBtns(ButtonStatus[bntStatus]);
});

When('I click on the Include All button', () => {
    onFlexJob.includeFirstResultToAllProposals();
});

When('I include a Flex Job in the {string} Proposal', (proposalName: string) => {
    onFlexJob
        .clickFlexJobExpandBtn()
        .includeFirstResultToSingleProposal()
        .verifyIncludedMessage(proposalName);
});

When('I click in Customize button and change the price', () => {
    onFlexJob.customizePrice(); 
});

Then('the Flex Job selected is included successfully in {word} Proposals', (proposalMessage: string) => {
    onFlexJob
        .verifyIncludedMessage(proposalMessage)
        .verifyProposalsContainers(ProposalStatus.value)
        .checkFlexJobTitleOnProposals();
});

Then('the Flex Job added is deleted from the {string} Proposal', (proposalName: string) => {
   onFlexJob.verifyProposalsContainers(ProposalStatus.empty, ProposalNames[proposalName]);
});

Then('the Recommend button for the Proposal added is enabled', () => {
    onFlexJob
        .verifyProposalsContainers(ProposalStatus.value, ProposalNames.Best)
        .verifyRecommendBtns(ButtonStatus.enabled, index);
});

Then('the price is adjusted in the Flex Job card', () => {
    onFlexJob.verifyAdjustedPriceAndIncludeAll();
});

And('I have selected a Flex Job and category', () => {
    cy.wait('@mockProposalRequest', { timeout: maxTimeout }).then(() => {
        onFlexJob
            .selectProposalType(ProposalTypes.flexJob)
            .verifyProposalsContainers(ProposalStatus.empty)
            .selectFlexJobAndCategory();
    });
});

And('I delete the added Flex Job', () => {
    onFlexJob.deleteItem();
});

And('the customized price is reflected in all Proposals after the addition', () => {
    onFlexJob.verifyProposalsPrice();
});

But('the Recommend buttons for other Proposals remain {word}', (btnStatus: string) => {
    for (let i = 1; i <= 3; i++) {
        onFlexJob.verifyRecommendBtns(ButtonStatus[btnStatus], i);
    }
});
