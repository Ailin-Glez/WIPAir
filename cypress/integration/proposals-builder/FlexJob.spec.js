import { urls } from '../../fixtures/urls';
import { flexJobToSelect } from '../../fixtures/flex-jobs';
import { maxTimeout, proposalTypes } from '../../fixtures/constants';
import { proposalStatus } from '../../pages/ProposalBuilderPage/ProposalsBasePage';
import { onFlexJob } from '../../pages/ProposalBuilderPage/FlexJob';
import { consultationTest } from '../../fixtures/mock-proposal-response';

describe('Create Flex Job Tests', () => {
    const index = 0;
    
    beforeEach(() => {
        cy.loginUI();
        cy.window().then((win) => win.sessionStorage.setItem('ocaa.consultation', JSON.stringify(consultationTest)));
        cy.mockProposalRequest();
        cy.visit(urls.proposal);
        cy.wait('@mockProposalRequest', { timeout: maxTimeout }).then(() => {
            onFlexJob
                .selectProposalType(proposalTypes.flexJob)
                .verifyProposalsContainers(proposalStatus.empty)
                .selectFlexJobAndCategory(flexJobToSelect);
        });
    });

    it('should include a Flex Job to all proposals', () => {
        onFlexJob
            .includeFirstResultToAllProposals()
            .verifyIncludedMessage('all')
            .verifyProposalsContainers(proposalStatus.value)
            .checkFlexJobTitleOnProposals();
    });

    it('should delete a Flex Job previoulsy added', () => {
        onFlexJob
            .clickFlexJobCardArrowBtn()
            .includeFirstResultToSingleProposal()
            .verifyIncludedMessage('Best')
            .deleteItem()
            .verifyProposalsContainers(proposalStatus.empty, index);
    });

    it('should recommend a Flex Job only if the proposal has a Flex Job', () => {
        onFlexJob
            .clickFlexJobCardArrowBtn()
            .verifyRecommendBtns('disabled')
            .includeFirstResultToSingleProposal()
            .verifyProposalsContainers(proposalStatus.value, index)
            .verifyRecommendBtns('enabled', index);

        for (let i = 1; i <= 3; i++) {
            onFlexJob.verifyRecommendBtns('disabled', i);
        }
    });

    it('should include a Flex Job with the customized price', () => {
        onFlexJob
            .customizePrice()
            .verifyAdjustedPriceAndIncludeAll()
            .verifyProposalsPrice()
    });
});
