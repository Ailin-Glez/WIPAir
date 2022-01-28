import { credentials } from '../fixtures/constants';
import { urls } from '../fixtures/urls';

class LoginPage {

    login() {
        cy.intercept('POST', '**/serviceprovideruser/login').as('login');
        cy.visit(urls.login);
        cy.get('#appLogo').should('be.visible');
        cy.get('#email').clear().type(credentials.email, { log: false });
        cy.get('#password').type(credentials.password, { log: false });
        cy.get('#loginButton').click({ force: true });
        cy.wait('@login');
    }
}

export const onLoginPage = new LoginPage();
