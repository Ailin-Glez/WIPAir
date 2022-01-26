import faker from '@faker-js/faker'
import { ButtonStatus, maxTimeout } from '../../fixtures/constants';
import { urls } from '../../fixtures/urls';
import { Utils } from '../Utils';
import { ProposalsBasePage } from './ProposalsBasePage';

const locators = {
    showCategoriesBtn: '#showCats',
    flexJobSelector: 'div.cat-info',
    flexJobExpandBtn: 'div.col-info > button',
    flexJobSearchBox: '#gtmAccessorySearchApp',
    flexJobItem: 'div.flexjob-item',
    flexJobCardMainPrice: 'span.currency > span.price',
    flexJobCardAdjustedPrice: 'span.adjusted-price',
    jobItemBtn: 'button.btn-block',
    includeBtn: "[ng-click='$ctrl.addJob($index)']",
    recommendBtn: "[ng-click='$ctrl.recommendJob($index)']",
    customizeCard: {
        description: '#jobDescription',
        materialCost: '#materialCost',
        adjustedPrice: 'div.adjusted-price span.ng-binding'
    },
};

const cardMainBtns = {
    customize: 'Customize',
    includeAll: 'Include All',
    recomendAll: 'Recommend All'
}

function clickFlexJobMainBtn(button: string): void {
    cy.get(locators.flexJobItem).first().then((flexJobItem) => {
        cy.wrap(flexJobItem).find('div.col-info > div.prod-info span.name').invoke('text').as('flexJobTitle');
        cy.wrap(flexJobItem).find('div.col-action button').contains(button).click();
    });
}

class FlexJob extends ProposalsBasePage {

    customizePrice() {
        const dataCustomized = {
            description: 'Price adjusted by Cypress',
            materialCost: faker.datatype.number({ min: 5000, max: 10000 }),
        }

        clickFlexJobMainBtn(cardMainBtns.customize);
        cy.intercept('GET', urls.customPrice).as('customPrice');

        for (const value in dataCustomized) {
            cy.get(locators.customizeCard[value]).clear().type(dataCustomized[value]);
            cy.wait(200);
        }

        cy.wait('@customPrice');

        return this;
    }

    clickFlexJobExpandBtn() {
        cy.get(locators.flexJobExpandBtn).find('img').invoke('attr', 'alt').then((arrowAttr) => {
            if (arrowAttr === 'chevron-down') {
                cy.get(locators.flexJobExpandBtn).first().click();
            }
        })

        return this;
    }

    includeFirstResultToSingleProposal() {
        cy.get(locators.includeBtn).first().click();

        return this;
    }

    includeFirstResultToAllProposals() {
        cy.intercept('POST', urls.consultationSaved).as('consultationSaved');
        clickFlexJobMainBtn(cardMainBtns.includeAll);

        return this;
    }

    selectFlexJobAndCategory() {
        cy.wait('@flexJobCatalog', { timeout: maxTimeout }).its('response.body').then((catalog) => {
            const flexJobName = Utils.getRandomValue(catalog.payLoad)['name'];
            cy.contains(locators.flexJobSelector, flexJobName).click().as('flexJobSelected');
            cy.get('@flexJobSelected')
                .parent('div')
                .siblings('div.sub-categories')
                .should('have.class', 'in')
                .as('subCategories');
            cy.intercept('GET', urls.catalog).as('catalog');
            cy.get('@subCategories').find(locators.flexJobSelector).then((items) => {
                const index = Math.floor(Math.random() * items.length);
                cy.wrap(items).eq(index).click();
            });
            cy.wait('@catalog');
            cy.get(locators.showCategoriesBtn).should('be.visible');
        });

        return this;
    }

    searchFlexJob(name: string) {
        cy.intercept('GET', urls.flexJobsCatalog).as('jobSearch');
        cy.get(locators.flexJobSearchBox).type(name);
        cy.wait('@jobSearch');

        return this;
    }

    verifyAdjustedPriceAndIncludeAll() {
        cy.intercept('POST', urls.consultationSaved).as('consultationSaved');
        cy.get(locators.customizeCard.adjustedPrice).invoke('text').then((adjustedPrice) => {
            cy.wrap(adjustedPrice).as('adjustedPrice');
            cy.get(locators.flexJobCardAdjustedPrice).should('have.text', adjustedPrice);
            cy.get(locators.flexJobCardMainPrice)
                .eq(0)
                .should('have.class', 'strikethrough')
                .invoke('text')
                .should('not.equal', adjustedPrice);
        });

        this.clickFlexJobExpandBtn();
        clickFlexJobMainBtn(cardMainBtns.includeAll);
        cy.wait('@consultationSaved');
        return this;
    }

    verifyRecommendBtns(statusBtn: ButtonStatus, index?: number) {
        cy.get(locators.recommendBtn).then((btns) => {
            if (index !== undefined) {
                cy.wrap(btns).eq(index).should(`be.${statusBtn}`);
            } else {
                cy.wrap(btns).each((btn, index) => {
                    if (index < 4) {
                        cy.wrap(btn).should(`be.${statusBtn}`);
                    }
                });
            }
        });

        return this;
    }
}

export const onFlexJob = new FlexJob();