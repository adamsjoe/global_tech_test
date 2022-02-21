const { test, expect } = require('@playwright/test');

const standardUserName = 'standard_user';
const goodPassword = 'secret_sauce'

/***
 * 
    Login to https://www.saucedemo.com/ using the "standard_user" account
    Sort the products by Price (high to low)
    Add the cheapest & the 2nd costliest products to your basket
    Open the basket
    Checkout
    Enter details and Finish the purchase
 */

test.beforeEach(async ({ page }) => {
  await page.goto('https://www.saucedemo.com/');
});

test.describe('End to End Happy Path', () => {
  test('should allow items to be purchased', async ({ page }) => {
    
    await page.fill('#user-name', standardUserName);
    await page.fill('#password', goodPassword);
    await page.locator('#login-button').click();

    // select hilo
    await page.selectOption('.product_sort_container', 'hilo');    

    // select the items
    await page.locator(':nth-match(:text("Add to cart"), 2)').click();
    await page.locator(':nth-match(:text("Add to cart"), 5)').click();

    // click the shopping cart 
    await page.locator('.shopping_cart_link').click();

    await page.locator('[data-test="checkout"]').click();

    // fill details
    await page.fill('[data-test="firstName"]', 'Joseph');
    await page.fill('[data-test="lastName"]', 'Adams');
    await page.fill('[data-test="postalCode"]', 'ML4 2UP');

    // finish the purchase
    await page.locator('[data-test="continue"]').click();

     // check that the confirmation page is correct

     // take a screenshot here
     await page.screenshot({ path: 'screenshot.png', fullPage: true });
    
    const title = await page.textContent('.title');
    expect(title).toBe('Checkout: Overview');

    const summaryPayment = await page.textContent('.summary_info > :nth-child(2)');
    expect(summaryPayment).toBe('SauceCard #31337');

    const summaryInfo = await page.textContent('.summary_info > :nth-child(4)');
    expect(summaryInfo).toBe('FREE PONY EXPRESS DELIVERY!');

    const summarySubTotal = await page.textContent('.summary_subtotal_label');
    expect(summarySubTotal).toBe('Item total: $37.98');
    
    const summaryTax = await page.textContent('.summary_tax_label');
    expect(summaryTax).toBe('Tax: $3.04');
    
    const summaryTotal = await page.textContent('.summary_total_label');
    expect(summaryTotal).toBe('Total: $41.02');    
 
    
    await page.locator('[data-test="finish"]').click()
    
    // order completed

    const titleComplete = await page.textContent('.title');
    expect(titleComplete).toBe('Checkout: Complete!');    
 

    const headerComplete = await page.textContent('.complete-header');
    expect(headerComplete).toBe('THANK YOU FOR YOUR ORDER');    
      
  });  

});