/// <reference types ="cypress" />

import { onConsultationPage } from "../../pages/oca-app-PageObject/CreateConsultationPage";
import { onCustomerInfoPage } from "../../pages/oca-app-PageObject/CustomerInfoPage";
import { onLoginPage } from "../../pages/oca-app-PageObject/LoginPage";
import { onProposalPage } from "../../pages/oca-app-PageObject/ProposalsPage";

const url = Cypress.env('dev')

describe('Create Flex Job Tests', () => {

  /*before(() => {
    cy.login()
  })*/

  beforeEach(() => {
    cy.intercept("POST", "**/consultation/saveconsultationstate").as("proposals")
    cy.visit("https://app.oncallair.com/#/user/login")
    cy.get("#appLogo").should("be.visible")
    onLoginPage.login()
    onConsultationPage.clickConsultationBtn()
    onCustomerInfoPage.selectTestMode()
    onCustomerInfoPage.clickNextButton()
    onCustomerInfoPage.skipSurvey()
  });
  
  it.only('should search and include a Flex job to all', () => {
    cy.wait("@proposals", { timeout: 30000 }).then((rq) => {
      expect(rq.response.body.success.message).to.be.equal("OK")
      cy.wait(200)
      onProposalPage.selectProposalType("FlexJob")
    })
    /*onProposalPage.searchFlexJob("New Flex")
    onProposalPage.includeFirstFlexJobToAll();*/
  });

  it('CreateConsultation',function(){

  })



})

