/// <reference types="cypress" />
const allure = Cypress.Allure.reporter.getInterface();

/***
 * 
    Login to https://www.saucedemo.com/ using the "standard_user" account
    Sort the products by Price (high to low)
    Add the cheapest & the 2nd costliest products to your basket
    Open the basket
    Checkout
    Enter details and Finish the purchase
 */

describe('End to End test - Happy Path', () => {
  let userDetails;

  beforeEach(() => {
    cy.allure().feature('"Happy Path" End-to-End Test"')
    cy.visit('https://www.saucedemo.com/')
    cy.fixture('swagCredentials').then((user) => {
      userDetails = user;
    });  
  })

  it('should run end to end "Happy Path""', () => {
    cy.allure().testName('should run end to end "Happy Path""').severity('blocker')
    
    // login with standard user details
    cy.loginAsUser(`${userDetails.correctUsername}`, `${userDetails.correctPassword}`)

    // check how many items we have - we should have 6.
    cy.verifyMultipleElementsPresent('.inventory_item', 6)

    // Sort products high to low
    cy.get('[data-test="product_sort_container"]').select('hilo')

    // add the second most expensive item (search for the class of the add to cart button)
    cy.clickNumberedElement('.btn.btn_primary.btn_small.btn_inventory', 1)
    
    // add the last item (the least expensive item)
    cy.clickNumberedElement('.btn.btn_primary.btn_small.btn_inventory', 4)
    // why is this 4??

    // open the basket
    cy.clickElement('.shopping_cart_link')
    
    // check the conine shopping and checkout buttons are present
    cy.verifyElementPresent('[data-test="continue-shopping"]')  
    cy.verifyElementPresent('[data-test="checkout"]')  
    
    // before continuing on, check that the prices are correct - we don't have a total
    cy.verifyTextPresent(':nth-child(3) > .cart_item_label > .item_pricebar > .inventory_item_price', '$29.99')
    cy.verifyTextPresent(':nth-child(4) > .cart_item_label > .item_pricebar > .inventory_item_price', '$7.99')
    cy.screenshot()
    
    // click the checkout button    
    cy.clickElement('[data-test="checkout"]')

    // fill in details
    cy.enterText('[data-test="firstName"]', 'Joseph')
    cy.enterText('[data-test="lastName"]', 'Adams')
    cy.enterText('[data-test="postalCode"]', 'ML4 2UP')

    // finish the purchase
    cy.clickElement('[data-test="continue"]')
    
    // check that the confirmation page is correct
    cy.verifyTextPresent('.title', 'Checkout: Overview')   
    cy.verifyTextPresent('.summary_info > :nth-child(2)', 'SauceCard #31337')
    cy.verifyTextPresent('.summary_info > :nth-child(4)', 'FREE PONY EXPRESS DELIVERY!')
    cy.verifyTextPresent('.summary_subtotal_label', 'Item total: $37.98')

    cy.log('NOTE: I do not know the tax scheme here or would assert the tax calculation is correct')            
    cy.screenshot()
    cy.verifyTextPresent('.summary_tax_label', 'Tax: $3.04')    
    cy.verifyTextPresent('.summary_total_label', 'Total: $41.02')
    
    cy.clickElement('[data-test="finish"]')    
    
    // order completed
    cy.verifyTextPresent('.title', 'Checkout: Complete!')
    cy.verifyTextPresent('.complete-header', 'THANK YOU FOR YOUR ORDER')
  
    // logout
    cy.clickElement('#react-burger-menu-btn')
    cy.clickElement('#logout_sidebar_link')
    
    // check we are back on login
    cy.verifyElementPresent('#user-name')   
  })

})


