const TARGET = Cypress.env("target");
const ENV_VARS = Cypress.env().env;
console.log(TARGET)
const credentials = {
   email: ENV_VARS[TARGET].credentials.admin.email,
   password: ENV_VARS[TARGET].credentials.admin.password
}

class LoginPage {

   login() {
      cy.get("#email").clear().type(credentials.email)
      cy.get("#password").type(credentials.password, {force: true})
      cy.get("#loginButton").click({force: true})
   }

   visit() {
      cy.visit("https://oca-appv2-dev.oncallair.com/")
   }

   fillEmail(value) {
      const field= cy.get("#email")
      field.clear()
      field.type(value)
      return this
   }


   fillPwd(value) {
      const field= cy.get("#password")
   
      field.type(value,{force: true})
      return this
   }

   clickLogin(value){
      const button= cy.get("#loginForm")
      button.submit({force: true})
      
   }
}

export const onLoginPage = new LoginPage()
