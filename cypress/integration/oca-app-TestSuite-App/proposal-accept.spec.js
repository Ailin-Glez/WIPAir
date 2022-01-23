const TARGET = Cypress.env("target");
const ENV_VARS = Cypress.env().env;
import CONFIG from "../../fixtures/proposalToAccept.json";

context.skip("Proposal -> Details -> Accept", () => {
  let link;

  function getLink() {
    return new Cypress.Promise((resolve, reject) => {
      var jwtToken = "";
      cy.getCookies()
        .should("have.length", 1)
        .then((cookies) => {
          jwtToken = cookies[0].value;
          cy.request({
            url: `${ENV_VARS[TARGET].urlApi}consultationpresentation/remoteviewingconsultationurl?consultationId=${CONFIG.consultationId}&includeComparison=${CONFIG.includeComparison}&proposalId=${CONFIG.proposalId}&serviceProviderId=${CONFIG.serviceProviderId}&userId=${CONFIG.userId}`,
            headers: {
              Accept: "*/*",
              "Content-Type": "application/x-www-form-urlencoded;charset=utf-8",
              Auth: jwtToken,
            },
          }).then((response) => {
            expect(response.body.payLoad).to.have.property("link");
            resolve(response.body.payLoad.link);
          });
        });
    });
  }

  before(() => {
    cy.login();
    getLink().then((response) => {
      link = response;
      cy.visit(response);
    });
  });

  beforeEach(function () {
    cy.viewport("iphone-6+");
  });

  it("visit view/proposal", () => {
    // eslint-disable-next-line cypress/no-unnecessary-waiting
    cy.wait(3000);
    cy.hash().should("not.be.empty");
  });

  it("should have a Review and Sign Proposal button disabled", () => {
    cy.get(".sign button")
      .should("contain", "Review & Sign Proposal")
      .and("have.attr", "disabled");
  });

  it("should check -> I acknowledge receipt of the Notice of Cancellation form", () => {
    cy.get("#acknowledgementContainer label").click();
    cy.get(".sign button").should("not.have.attr", "disabled");
  });

  it("should open and accept -> Terms & Conditions View", () => {
    cy.get(".sign button").click();

    cy.get(".modal-title").should("contain", "Terms and conditions");
    cy.get("#tandcCheckboxForm button").should("have.attr", "disabled");
  });

  it("should open and accept -> Aditional Terms", () => {
    cy.get("#tandcCheckboxForm label").click();
    cy.get("#tandcCheckboxForm button").click();

    cy.get(".modal-title").should("contain", "Notice Title");
    cy.get(".modal-footer button").should("have.attr", "disabled");
  });

  it("should open and save -> Sign Proposal", () => {
    cy.get("#acCheckbox label").click();
    cy.get("#acCheckbox button").click();

    cy.get(".modal-title").should("contain", "Sign proposal");

    cy.get("#signaturePad")
      .trigger("mouseover")
      .trigger("mousedown", { which: 1 });

    cy.get("#signaturePad")
      .trigger("mousemove", { pageX: 600, pageY: 400 })
      .trigger("mouseup");

    cy.get("#signaturePad").click();

    cy.get(".modal-footer button.btn-primary").click();
  });

  it("should render accepted confirmation -> accepted -> proposal details", () => {
    cy.get("#confirmation button").should(
      "contain",
      "See my Accepted Proposal"
    );
    cy.get("#confirmation button").click();
    cy.get("#presentDetails .sub-title").should(
      "contain",
      "Your Samurai Fighter Proposal"
    );
  });
});
