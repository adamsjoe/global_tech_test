const { test, expect } = require('@playwright/test');

const standardUserName = 'standard_user';
const goodPassword = 'secret_sauce'

const badUserName = 'joeBad'
const badPassword = 'rubbish'

// errors
const userDetailsErrorMessage = 'Epic sadface: Username and password do not match any user in this service'
const lockedErrorMessage = 'Epic sadface: Sorry, this user has been locked out.'
const missingPasswordError = 'Epic sadface: Password is required'
const missingUsernameError = 'Epic sadface: Username is required'

test.beforeEach(async ({ page }) => {
  await page.goto('https://www.saucedemo.com/');
});

test.describe('Login Page', () => {
  test('should contain username, password and login buttons', async ({ page }) => {

    await expect(page.locator('#user-name')).toBeVisible();
    await expect(page.locator('#password')).toBeVisible();
    await expect(page.locator('#login-button')).toBeVisible();
  });

  test('should have the password field as mandatory', async ({ page }) => {
    
    await page.fill('#user-name', standardUserName);
    await page.locator('#login-button').click();

    const content = await page.textContent('[data-test="error"]');

    expect(content).toBe(missingPasswordError);
  });

  test('should have the username field as mandatory', async ({ page }) => {

    await page.fill('#password', goodPassword);
    await page.locator('#login-button').click();

    const content = await page.textContent('[data-test="error"]');

    expect(content).toBe(missingUsernameError);
  });  

  test('should not allow login with incorrect username / correct password', async ({ page }) => {

    await page.fill('#user-name', badUserName);
    await page.fill('#password', goodPassword);
    await page.locator('#login-button').click();

    const content = await page.textContent('[data-test="error"]');

    expect(content).toBe(userDetailsErrorMessage);
  });    

  test('should not allow login with correct username / incorrect password', async ({ page }) => {

    await page.fill('#user-name', standardUserName);
    await page.fill('#password', badPassword);
    await page.locator('#login-button').click();

    const content = await page.textContent('[data-test="error"]');

    expect(content).toBe(userDetailsErrorMessage);
  });    

});