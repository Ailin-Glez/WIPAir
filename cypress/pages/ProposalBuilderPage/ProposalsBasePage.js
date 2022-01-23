import { urls } from '../../fixtures/urls';

const messageForEmptyProposal = 'Drop System to Proposal';
const messageIncludedProposal = '1 incl';

const locators = {
    toastMessage: '#toast-container div.toast-message',
    deleteItemBtn: 'div.remove-item',
    proposals: {
        cards: '#proposalsDropZone div.proposal',
        cardsHeader: '#proposalsDropZone div.system-heading',
        includesLabel: 'div.items-includes span',
        cardsBody: '#proposalsDropZone div.items',
        price: 'div.bundle-price',
        cardsNameItem: 'div.item-name',
    },
    modalMessage: '#modalBody p'
};

function checkProposalsPrice(expectedPrice, index = 0) {
    cy.get(locators.proposals.cards).eq(index).click();
    cy.get(locators.proposals.price).should('have.text', ` ${expectedPrice} `);
    cy.get(locators.proposals.cards).eq(index).click();
}

export const proposalStatus = {
    empty: 'empty',
    value: 'value'
};

export class ProposalsBasePage {

    checkFlexJobTitleOnProposals(index) {
        cy.get('@flexJobTitle').then((flexJobTitle) => {
            const expectedJobTitle = ` ${flexJobTitle} `;

            if (index !== undefined) {
                cy.get(locators.proposals.cardsNameItem).eq(index).should('have.text', expectedJobTitle);
            } else {
                cy.get(locators.proposals.cardsNameItem).each((card) => {
                    expect(card).to.have.text(expectedJobTitle);
                });
            }
        });
    }

    selectProposalType(typeName) {
        cy.contains(typeName).click({force: true});

        return this;
    }

    deleteItem() {
        cy.intercept('POST', urls.jobsRemove).as('jobRemove');
        cy.get('div.prop-info').first().click().should('have.class', 'active');
        cy.get(locators.deleteItemBtn).click();
        cy.get(locators.modalMessage).should('have.text', 'Do you want to remove the FlexJob?');
        cy.contains('button', 'Yes').click();
        cy.wait('@jobRemove');

        return this;
    }

    verifyProposalsContainers(status, index) {
        const locator = status === 'empty' ? locators.proposals.cardsHeader : locators.proposals.includesLabel;
        const expectedMessage = status === 'empty' ? messageForEmptyProposal : messageIncludedProposal;

        cy.get(locator).then((proposals) => {
            if (index !== undefined) {
                cy.wrap(proposals).eq(index).should('contain', expectedMessage);
            } else {
                cy.wrap(proposals).each((proposal) => expect(proposal).contain(expectedMessage));
            }
        });

        return this;
    }

    verifyProposalsPrice(index = 4) {
        cy.get('@adjustedPrice').then((expectedPrice) => {
            if (index === undefined) {
                checkProposalsPrice(expectedPrice);
            } else {
                for (let i = 0; i < index; i++) {
                 checkProposalsPrice(expectedPrice, i);   
                }
            }
        });

        return this;
    }

    verifyIncludedMessage(proposalName) {
        cy.get(locators.toastMessage).should('have.text', `Included in ${proposalName}`);

        return this;
    }
}
