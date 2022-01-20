import LoginPage from   "../../pages/oca-app-PageObject/LoginPage";
import CreateConsultationPage from "../../pages/oca-app-PageObject/CreateConsultationPage";
import CustomerInfoPage from "../../pages/oca-app-PageObject/CustomerInfoPage";
import ProposalsPage from "../../pages/oca-app-PageObject/ProposalsPage";
import LiveBundlePage from "../../pages/oca-app-PageObject/LiveBundlePage";

describe('Test Suite',function()
{
  //Login
it('Login',function(){
const login=new LoginPage()
login.visit()
login.fillEmail('adminsamurai@watscoventures.com')
login.fillPwd('Engage2017!')
login.clickLogin()
})

it('CreateConsultation',function(){
const consultation=new CreateConsultationPage()
onConsultationPage.clickConsultationBtn()
const info=new CustomerInfoPage()
info.selectTestMode()
info.nextButton()
info.surveyNext()
info.modalNext()
const lBundle=new LiveBundlePage()


})



})

