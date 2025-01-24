import { test } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { InventoryPage } from '../pages/InventoryPage';
import { credentials } from '../config/variables';

let loginPage: LoginPage;
let inventoryPage: InventoryPage;

test.beforeEach(async ({ page }) => {
  loginPage = new LoginPage(page);
  inventoryPage = new InventoryPage(page);

  await loginPage.goto();
});

test('should log in successfully with valid credentials', async () => {
  await loginPage.fillUsernameInput(credentials.validUsername);
  await loginPage.fillPasswordInput(credentials.validPassword);
  await loginPage.clickOnLogin();
  await inventoryPage.verifyHomePageLoaded();
});

test('should not log in with invalid credentials', async () => {
  await loginPage.fillUsernameInput(credentials.invalidUsername);
  await loginPage.fillPasswordInput(credentials.invalidPassword);
  await loginPage.clickOnLogin();
  await loginPage.verifyInvalidCredentialsMessage();
});

test('should not log in with empty username', async () => {
  await loginPage.fillPasswordInput(credentials.validPassword);
  await loginPage.clickOnLogin();
  await loginPage.verifyUsernameRequiredMessage();
});

test('should not log in with empty password', async () => {
  await loginPage.fillUsernameInput(credentials.validUsername);
  await loginPage.clickOnLogin();
  await loginPage.verifyPasswordRequiredMessage();
});

test('should not log in with a blocked user account', async () => {
  await loginPage.fillUsernameInput(credentials.lockedUsername);
  await loginPage.fillPasswordInput(credentials.validPassword);
  await loginPage.clickOnLogin();
  await loginPage.verifyUserLockedMessage();
});
