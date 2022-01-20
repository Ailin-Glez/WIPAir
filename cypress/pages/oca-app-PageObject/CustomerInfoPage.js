

class CustomerInfoPage{
    fistNameInfo(value){
        const fName= cy.get('input[name="first_name"]')
        fName.type(value)
        return this
    
    }

    lastNameInfo(value){
        const lName= cy.get('input[name="last_name"]')
        lName.type(value)
        return this
    
    }
    phoneNumber(value){
        const pNumber= cy.get('input[name="phone"]')
        pNumber.type(value)
        return this
    
    }

    emailAddress(value){
        const eAddress= cy.get('input[name="email"]')
        eAddress.type(value)
        return this
    
    }

    serviceAddress(value){
        const sAddress= cy.get("#searchBox")
        sAddress.type(value)
        return this
    
    }

    city(value){
        const sAddress= cy.get('input[name="city"]')
        sAddress.type(value)
        return this
    
    }

    zipCode(value){
        const zCode= cy.get('input[name="zip_code"]')
        zCode.type(value)
        return this
    
    }

    selectTestMode(){
        cy.get('input[name="test_mode"]').click({force: true})
    }

    clickNextButton(){
        cy.get('#btnSaveNext').click()
    }

    skipSurvey(){
        cy.get('#btnSurveySkip').click()
        cy.get('.survey-confirm-skip').click()
    }

}
export const onCustomerInfoPage = new CustomerInfoPage();
