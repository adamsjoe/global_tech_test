/// <reference types="cypress" />
const allure = Cypress.Allure.reporter.getInterface();

describe('Logout', () => {
  let userDetails;
  
  beforeEach(() => {
    cy.allure().feature('Logout')
    cy.visit('https://www.saucedemo.com/')
    cy.fixture('swagCredentials').then((user) => {
      userDetails = user;
    });    
  })

  it('should allow standard user to logout', () => {
    cy.allure().testName('should allow standard user to logout').severity('critical')

    cy.loginAsUser(`${userDetails.correctUsername}`, `${userDetails.correctPassword}`)
    cy.verifyElementPresent('#react-burger-menu-btn')   
    cy.clickElement('#react-burger-menu-btn')
    cy.clickElement('#logout_sidebar_link')
        
    cy.verifyElementPresent('#user-name')   
  })

  it('should allow perfomance issue user to logout', () => {
    cy.allure().testName('should allow perfomance issue user to logout').severity('critical')
    
    cy.loginAsUser(`${userDetails.performanceIssueUsername}`, `${userDetails.correctPassword}`)
    cy.verifyElementPresent('#react-burger-menu-btn')   
    cy.clickElement('#react-burger-menu-btn')
    cy.clickElement('#logout_sidebar_link')
    
    cy.verifyElementPresent('#user-name')   
  })

})
