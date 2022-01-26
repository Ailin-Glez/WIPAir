/// <reference types="../support" />

import { urls } from '../fixtures/urls';
import { filterCookies } from '../helpers';
import { mockProposalBody } from '../fixtures/mock-proposal-response';
import { onLoginPage } from '../pages/LoginPage';

const OCATK_KEY = 'OCATK';
// const TARGET = Cypress.env("target");
const TARGET = 'dev';
const ENV_VARS = Cypress.env().env;

Cypress.Commands.add('loginUI', () => {
    cy.session('automated', () => {
        onLoginPage.login();
        cy.wait(2000);
        cy.getCookies().then((cookies) => {
            const namesOfCookies = cookies.map((c) => c.name);
            Cypress.Cookies.defaults({ preserve: [...namesOfCookies] });
        });
    });
});

Cypress.Commands.add('mockProposalRequest', () => {
    cy.getCookie(OCATK_KEY).then((cookie) => {
        cy.intercept('GET', urls.consultationId, (rq) => {
            const replyBody = mockProposalBody(cookie.value);
            rq.reply(replyBody);
        }).as('mockProposalRequest');
    });
});

// Cypress.Commands.add('login', () => {
//   cy.session('Test user', () => {
//     cy.request({
//         method: 'POST',
//         url: 'https://api.oncallair.com/serviceprovideruser/login',
//         form: true, // indicates the body should be form urlencoded and sets Content-Type: application/x-www-form-urlencoded headers
//         headers: {
//             Accept: 'application/json,text/plain,*/*',
//             Auth: 'WVudHMiXSwkdBR0UiLCJ1c2VyX2lkIjoXNlciJdfQLf88Iegu7LC8t2lcH9r_o70yUuRSVPZlYXR1cmVzzLCJ1'
//         },
//         body: {
//             email: ENV_VARS[TARGET].credentials.admin.email,
//             password: ENV_VARS[TARGET].credentials.admin.password
//         }
//     }).then((rq) => {
//       console.log(rq)
//       cy.getCookies().then(cookies => {
//         const namesOfCookies = cookies.map(c => c.name);
//         console.log(namesOfCookies)
//         Cypress.Cookies.defaults({ preserve: [...namesOfCookies] });
//       });
//     })
//   }), { validate() {
//       cy.getCookies().then(cookies => {
//         const namesOfCookies = cookies.map(c => c.name);
//         console.log(namesOfCookies)
//         Cypress.Cookies.defaults({ preserve: [...namesOfCookies] });
//       });
//     }
//   }
// });
