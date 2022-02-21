/// <reference types="cypress" />
const allure = Cypress.Allure.reporter.getInterface();

describe('Product page checks', () => {
  let userDetails;

  beforeEach(() => {
    cy.allure().feature('Product Page')
    cy.visit('https://www.saucedemo.com/')
    cy.fixture('swagCredentials').then((user) => {
      userDetails = user;
    });       
  })

  it('should contain page items', () => {
    cy.allure().testName('should contain page items').severity('blocker')

    cy.loginAsUser(`${userDetails.correctUsername}`, `${userDetails.correctPassword}`)

    // burger menu     
    cy.verifyElementPresent('#react-burger-menu-btn')   

    // cart present
    cy.verifyElementPresent('.shopping_cart_link')   

    // sort dropdown present
    cy.verifyElementPresent('[data-test="product_sort_container"]')   
    
    // sort drop down options
    cy.get('[data-test="product_sort_container"]').then(options => {
      const actual = [...options].map(o => o.value)
      // expect(actual).to.deep.eq(['NAME (A to Z)', 'Name (Z to A)', 'Price (low to high)', 'Price (high to low)'])
      cy.log(actual.length)
    })
    // cy.get('[data-test="product_sort_container"]').select('NAME (A to Z)').should('have.value', 'az')
    // cy.get('[data-test="product_sort_container"]').select('Name (Z to A)').should('have.value', 'za')
    // cy.get('[data-test="product_sort_container"]').select('Price (low to high)').should('have.value', 'lohi')
    // cy.get('[data-test="product_sort_container"]').select('hilo').should('have.value', 'PRICE (HIGH TO LOW)')

    // cy.get('[data-test="product_sort_container"]').select('hilo').should('have.length', 4)
    
  })

  it('should open sidebar when burger clicked', () => {
    cy.allure().testName('should open sidebar when burger clicked')
    
    cy.loginAsUser(`${userDetails.correctUsername}`, `${userDetails.correctPassword}`)

    cy.clickElement('#react-burger-menu-btn')

    // side bar
    cy.verifyElementPresent('#inventory_sidebar_link')   
    cy.verifyElementPresent('#about_sidebar_link')   
    cy.verifyElementPresent('#logout_sidebar_link')      
    cy.verifyElementPresent('#reset_sidebar_link')   
    cy.verifyElementPresent('#react-burger-cross-btn')       
  })

  it('should close sidebar when x clicked', () => {
    cy.allure().testName('hould close sidebar when x clicked').severity('critical')
    
    cy.loginAsUser(`${userDetails.correctUsername}`, `${userDetails.correctPassword}`)

    // open the sidebar
    cy.clickElement('#react-burger-menu-btn')

    // close the sidebar
    cy.clickElement('#react-burger-cross-btn')

    cy.verifyElementNotPresent('#inventory_sidebar_link')
    cy.verifyElementNotPresent('#about_sidebar_link')    
    cy.verifyElementNotPresent('#inventory_sidebar_link')        
    cy.verifyElementNotPresent('#reset_sidebar_link')    
    cy.verifyElementNotPresent('#react-burger-cross-btn')    
  })  

})

