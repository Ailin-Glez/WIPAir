// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
// const helper = require("../helpers");
import { filterCookies } from "../helpers";
const OCATK_KEY = "OCATK";
const TARGET = Cypress.env("target");
const ENV_VARS = Cypress.env().env;

// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// -- This is a parent command --
Cypress.Commands.add("login", (email, password) => {
  cy.request({
    method: "POST",
    url: `${ENV_VARS[TARGET].urlApi}serviceprovideruser/login`,
    form: true, // indicates the body should be form urlencoded and sets Content-Type: application/x-www-form-urlencoded headers
    headers: {
      Accept: "application/json,text/plain,*/*",
      Auth: "WVudHMiXSwkdBR0UiLCJ1c2VyX2lkIjoXNlciJdfQLf88Iegu7LC8t2lcH9r_o70yUuRSVPZlYXR1cmVzzLCJ1",
    },
    body: {
      email: ENV_VARS[TARGET].credentials.admin.email,
      password: ENV_VARS[TARGET].credentials.admin.password,
    },
  }).then((response) => {
    expect(response.body).to.have.property("session_token");
    Cypress.Cookies.debug(true); // now Cypress will log out when it alters cookies
    cy.clearCookie(OCATK_KEY);
    cy.setCookie(OCATK_KEY, response.body.session_token);
    // .should("have.length", 1)
    cy.getCookies().then((cookies) => {
      const OCA_TK = filterCookies(cookies, OCATK_KEY);
      expect(OCA_TK.name).to.equal(OCATK_KEY);
      expect(OCA_TK.value).to.equal(response.body.session_token);
    });
  });
});

Cypress.Commands.add(
  "unAccept",
  (serviceProviderId, consultationId, userId) => {
    cy.getCookies().then((cookies) => {
      const OCA_TK = filterCookies(cookies, OCATK_KEY);
      cy.request({
        method: "POST",
        url: `${ENV_VARS[TARGET].urlApi}/consultation/unacceptconsultationfromapp`,
        form: true,
        headers: {
          Accept: "application/json,text/plain,*/*",
          Auth: OCA_TK.value,
        },
        body: {
          consultationId,
          userId,
          serviceProviderId,
        },
      }).then((response) => {
        expect(response.body).to.have.property("success");
      });
    });
  }
);

Cypress.Commands.add("mockGeolocation", (latitude, longitude) => {
  cy.window().then(($window) => {
    cy.stub($window.navigator.geolocation, "getCurrentPosition", (callback) => {
      return callback({ coords: { latitude, longitude } });
    });
  });
});

// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })
