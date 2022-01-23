class ConsultationPage {

    clickConsultationBtn() {
        cy.get("#createCustomer").click();
    }

} 

export const onConsultationPage = new ConsultationPage();
