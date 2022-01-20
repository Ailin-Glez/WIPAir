const TARGET = Cypress.env("target");
const ENV_VARS = Cypress.env().env;
import CONFIG from "../../fixtures/proposalToAccept.json";

context("Proposal -> Comparison", () => {
  let link;
  function getLink() {
    return new Cypress.Promise((resolve, reject) => {
      var jwtToken = "";
      cy.getCookies()
        .should("have.length", 1)
        .then((cookies) => {
          jwtToken = cookies[0].value;
          cy.request({
            url: `${
              ENV_VARS[TARGET].urlApi
            }consultationpresentation/remoteviewingconsultationurl?consultationId=${
              CONFIG.consultationId
            }&includeComparison=${true}&serviceProviderId=${
              CONFIG.serviceProviderId
            }&userId=${CONFIG.userId}`,
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

  it("visit view/consultation", () => {
    // eslint-disable-next-line cypress/no-unnecessary-waiting
    cy.wait(3000);
    cy.hash().should("not.be.empty");
  });

  it("view/consultation url has props", () => {
    // https://on.cypress.io/location
    cy.location().should((location) => {
      expect(location.href).to.eq(link);
      expect(location.protocol).to.eq("https:");
      expect(location.hash.split("/")[1]).to.eq("view");
      expect(location.hash.split("/")[2]).to.eq("consultation");
      expect(location.search).to.be.empty;
    });
  });

  it("visit view/proposal", () => {
    // fixme: long complex selector should be avoided
    cy.get(".section.action button").then((elements) => {
      expect(elements.length).to.be.greaterThan(0);

      elements[0].click();
      // cy.wait(2000);

      cy.location().should((location) => {
        expect(location.protocol).to.eq("https:");
        expect(location.hash.split("/")[1]).to.eq("view");
        expect(location.hash.split("/")[2]).to.eq("proposal");
        expect(location.search).to.be.empty;
      });
    });
  });

  it("customer-info", () => {
    cy.get(".page-title").should("contain", "Your Samurai Fighter Proposal");

    cy.get("#consumerInfo .proposal-info p").then((items) => {
      expect(items).to.have.length(3);
      expect(items[0].innerText).to.eq("Address: 5th st Miami, FL 33134");
      expect(items[1].innerText).to.eq("Phone: (112) 311-2312");
      expect(items[2].innerText).to.eq("Email: mary@mailinator.com");
    });

    cy.get("#proposalInfo .proposal-info p").then((items) => {
      // expect(items).to.have.length(6)
      console.log('items > ', items); // eslint-disable-line
      expect(items[1].innerText).to.have.string("Consultation Code: ");
      expect(items[2].innerText).to.have.string("Date Presented: ");
      expect(items[3].innerText).to.have.string("Presented by: ");
      expect(items[4].innerText).to.have.string("Phone: ");
      expect(items[5].innerText).to.have.string("Email: ");
    });
  });
});
