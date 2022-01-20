class CreateConsultationPage {

    clickConsultationBtn() {
        cy.get("#createCustomer").click()
    }


} 

export const onConsultationPage = new CreateConsultationPage();