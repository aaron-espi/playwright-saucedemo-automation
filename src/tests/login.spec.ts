import { test } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { InventoryPage } from '../pages/InventoryPage';
import { config } from '../../playwright.config';

let loginPage: LoginPage;
let inventoryPage: InventoryPage;

test.beforeEach(async ({ page }) => {
  loginPage = new LoginPage(page);
  inventoryPage = new InventoryPage(page);

  await loginPage.goto();
});

test('should log in successfully with valid credentials', async () => {
  await loginPage.fillUsernameInput(config.validUsername);
  await loginPage.fillPasswordInput(config.validPassword);
  await loginPage.clickOnLogin();
  await inventoryPage.verifyHomePageLoaded();
});

test('should not log in with invalid credentials', async () => {
  await loginPage.fillUsernameInput(config.invalidUsername);
  await loginPage.fillPasswordInput(config.invalidPassword);
  await loginPage.clickOnLogin();
  await loginPage.verifyInvalidCredentialsMessage();
});

test('should not log in with empty username', async () => {
  await loginPage.fillPasswordInput(config.validPassword);
  await loginPage.clickOnLogin();
  await loginPage.verifyUsernameRequiredMessage();
});

test('should not log in with empty password', async () => {
  await loginPage.fillUsernameInput(config.validUsername);
  await loginPage.clickOnLogin();
  await loginPage.verifyPasswordRequiredMessage();
});

test('should not log in with a blocked user account', async () => {
  await loginPage.fillUsernameInput(config.lockedUsername);
  await loginPage.fillPasswordInput(config.validPassword);
  await loginPage.clickOnLogin();
  await loginPage.verifyUserLockedMessage();
});
