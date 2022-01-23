import { credentials } from '../fixtures/constants';
import { urls } from '../fixtures/urls';

class LoginPage {

    login() {
        cy.visit(urls.login);
        cy.get('#appLogo').should('be.visible');
        cy.get('#email').clear().type(credentials.email, { log: false });
        cy.get('#password').type(credentials.password, {
            force: true,
            log: false
        });
        cy.get('#loginButton').click({ force: true });
    }
}

export const onLoginPage = new LoginPage();
