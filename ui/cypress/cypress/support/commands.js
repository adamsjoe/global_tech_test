// override a few cypress commands with ones which will be more allure-friendly

Cypress.Commands.add('loginAsUser', (username, password) => {
  cy.allure().step('Logging in with username ' + username + ' and password ' + password)
  cy.get('#user-name').type(username)
  cy.get('#password').type(password)
  cy.get('#login-button').click()
})

Cypress.Commands.add('clickElement', (locator) => {
  cy.allure().step('Clicking element with locator of ' + locator)
  cy.get(locator).click()
})

Cypress.Commands.add('enterText', (locator, text) => {
  cy.allure().step('Entering "' + text + '" into element with locator of ' + locator)
  cy.get(locator).type(text)
})

Cypress.Commands.add('verifyTextPresent', (locator, expectedText) => {
  cy.allure().step('Verifying text at element with locator of ' + locator + ' is "' + expectedText + '"')
  cy.get(locator).should('have.text', expectedText)
})

Cypress.Commands.add('verifyElementPresent', (locator) => {
  cy.allure().step('Verifying element with locator of ' + locator + ' is visible')
  cy.get(locator).should('be.visible')
})

Cypress.Commands.add('verifyElementNotPresent', (locator) => {
  cy.allure().step('Verifying element with locator of ' + locator + ' is NOT visible')
  cy.get(locator).should('not.be.visible')
})

Cypress.Commands.add('verifyMultipleElementsPresent', (locator, expectedNumber) => {
  cy.allure().step('Verifying element with locator of ' + locator + ' has ' + expectedNumber + ' copies on screen')
  cy.get(locator).should('have.length', expectedNumber)
})

Cypress.Commands.add('clickNumberedElement', (locator, number) => {
  cy.allure().step('Clicking number ' + number + ' element with locator of ' + locator)
  cy.get(locator).eq(number).click()
})