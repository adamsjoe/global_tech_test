/// <reference types="cypress" />
const allure = Cypress.Allure.reporter.getInterface();

// error messages
const userDetailsErrorMessage = 'Epic sadface: Username and password do not match any user in this service'
const lockedErrorMessage = 'Epic sadface: Sorry, this user has been locked out.'
const missingPasswordError = 'Epic sadface: Password is required'
const missingUsernameError = 'Epic sadface: Username is required'

describe('Login page', () => {
  let userDetails;
  
  beforeEach(() => {
    cy.allure().feature('Login Page')
    cy.visit('https://www.saucedemo.com/')
    cy.fixture('swagCredentials').then((user) => {
      userDetails = user;
    });    
  })

  it('should contain username, password and login buttons', () => {    
    cy.allure().testName('should contain username, password and login buttons').severity('blocker')
    
    cy.verifyElementPresent('#user-name')
    cy.verifyElementPresent('#password')

    cy.verifyElementPresent('#login-button')    
  })

  it('should have the password field as mandatory', () => {
    cy.allure().testName('should have the password field as mandatory').severity('critical')    
    
    cy.enterText('#user-name', `${userDetails.correctUsername}`)
    cy.clickElement('#login-button')
    
    cy.verifyTextPresent('[data-test="error"]', `${missingPasswordError}`)
  })

  it('should have the username field as mandatory', () => {
    cy.allure().testName('should have the username field as mandatory')
    
    cy.enterText('#password', `${userDetails.correctPassword}`)
    cy.clickElement('#login-button')
    
    cy.verifyTextPresent('[data-test="error"]', `${missingUsernameError}`)
  })  

  it('should not allow login with incorrect username / correct password', () => {
    cy.allure().testName('should not allow login with incorrect username / correct password')

    cy.enterText('#user-name', `${userDetails.badUsername}`)
    cy.enterText('#password', `${userDetails.correctPassword}`)
    cy.clickElement('#login-button')
    
    cy.verifyTextPresent('[data-test="error"]', `${userDetailsErrorMessage}`)
  })

  it('should not allow login with correct username / incorrect password', () => {
    cy.allure().testName('should not allow login with correct username / incorrect password')
    
    cy.enterText('#user-name', `${userDetails.correctUsername}`)
    cy.enterText('#password', `${userDetails.badPassword}`)
    cy.clickElement('#login-button')
    
    cy.verifyTextPresent('[data-test="error"]', `${userDetailsErrorMessage}`)
  })

  it('should not allow locked out users to login', () => {
    cy.allure().testName('should not allow locked out users to login')
    
    cy.loginAsUser(`${userDetails.lockedUsername}`, `${userDetails.correctPassword}`)
    
    cy.verifyTextPresent('[data-test="error"]', `${lockedErrorMessage}`)
  })

  it('should allow performance issue user to login', () => {
    cy.allure().testName('should allow performance issue user to login')
       
    cy.loginAsUser(`${userDetails.performanceIssueUsername}`, `${userDetails.correctPassword}`)
        
    cy.verifyElementPresent('#react-burger-menu-btn')    
    
  })

  it('should allow standard user to login', () => {
    cy.allure().testName('should allow standard user to login')
    
    cy.loginAsUser(`${userDetails.correctUsername}`, `${userDetails.correctPassword}`)
        
    cy.verifyElementPresent('#react-burger-menu-btn')    
  })

})
