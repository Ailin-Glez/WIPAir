/// <reference types="../support" />

import { urls } from '../fixtures/urls';
import { filterCookies } from '../helpers';
import { mockProposalBody } from '../fixtures/mock-proposal-response';
import { onLoginPage } from '../pages/LoginPage';

const OCATK_KEY = 'OCATK';
// const TARGET = Cypress.env("target");
const TARGET = 'dev';
const ENV_VARS = Cypress.env().env;
export const baseBody = {
    serviceProviderId: 2,
    userId: 100
};

function postRequest(token: string, url: string, bodyRequest) {
    return  cy.request({
        method:'POST', 
        url, 
        headers: {
            Auth: token
        },
        body: JSON.stringify(bodyRequest)
    });
}
Cypress.Commands.add('loginUI', () => {
    cy.session('automated', () => {
        onLoginPage.login();
        cy.getCookies().then((cookies) => {
            const namesOfCookies = cookies.map((c) => c.name);
            Cypress.Cookies.defaults({ preserve: [...namesOfCookies] });
        });
    });
});

Cypress.Commands.add('mockProposalRequest', (withValue = false) => {
    cy.getCookie(OCATK_KEY).then((cookie) => {
        cy.intercept('GET', urls.consultationId, (rq) => {
            const replyBody = mockProposalBody(cookie.value, withValue);
            rq.reply(replyBody);
        }).as('mockProposalRequest');
    });
});

Cypress.Commands.add('archiveConsultation', (consultationData) => {
    cy.getCookie(OCATK_KEY).then((cookie) => {
        cy.log('Archiving Consultation');
        postRequest(cookie.value, `${ENV_VARS['stg']['urlApi']}${urls.archiveConsultation}`, consultationData);
    });
});

Cypress.Commands.add('createConsultation', () => {
    const customerBody = {
        ...baseBody,
        firstName: 'TEST',
        lastName: 'TEST',
        email: 'test@mail.com',
        phone: '1231231234'
    };

    cy.getCookie(OCATK_KEY).then((cookie) => {
        const token = cookie.value;
        const baseUrl = 'https://api-stg.oncallair.com/'
        const postURLs = {
            createCustomer: `${baseUrl}customer/createCustomer`,
            createcustomerlocation: `${baseUrl}customer/createcustomerlocation`,
            createconsultation: `${baseUrl}consultation/createconsultation`,
            saveconsultationstate: `${baseUrl}consultation/saveconsultationstate`,
        };

        cy.log('Creating Customer');
        postRequest(token, postURLs.createCustomer, customerBody).then((customer) => {
            const customerId = customer.body.payLoad.customer_id;
            const location = {
                ...baseBody,
                customerId,
                addressLine1: '2640 Bayshore Drive',
                city: 'Miami',
                state: 'FL',
                zip: '33133',
                countryCode: 'US',
                typeOfHome: 'house'
            };

            cy.log('Creating Customer Location');
            postRequest(token, postURLs.createcustomerlocation, location).then((customerLocation) => {
                const locationId = customerLocation.body.payLoad.customer_location_id;
                const consultationName = `Cypress consultation ${locationId}`;
                const consultationBody = {
                    serviceProviderId: 2,
                    userId: 100,
                    customerLocationId: locationId,
                    assignedUserId: 100,
                    consultationName
                };

                cy.log(`Consultation Name: ${consultationName}`);
                cy.log('Creating Consultation');
                postRequest(token, postURLs.createconsultation, consultationBody).then((consultation) => {
                    const consultationId = consultation.body.payLoad.consultation_id;
                    const consultationCode = consultation.body.payLoad.consultation_code;
                    const state = {
                        ...baseBody,
                        consultationId: consultationId,
                        clientState: 'proposal.equipment',
                        currentClientState: 'proposal.equipment'
                    };

                    cy.log('Saving Consultation State');
                    postRequest(token, postURLs.saveconsultationstate, state).then(() => {
                        const consultationData = {
                            customer_id: customerId,
                            customer_location_id: locationId,
                            consultation_id: consultationId,
                            consultation_name: consultationName,
                            consultation_code: consultationCode,
                            consultation_assigned_user_id: 100,
                            consultation_client_state: 'proposal.equipment',
                            consultation_current_client_state: 'proposal.equipment',
                            status: 'draft'
                        };

                        cy.wrap(consultationData).as('consultationData');
                    });
                });
            });
        });
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
