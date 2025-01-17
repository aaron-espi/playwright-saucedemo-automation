import { test } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { InventoryPage } from '../pages/InventoryPage';

test.beforeEach(async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.goto();
});

test('should log in successfully with valid credentials', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const inventoryPage = new InventoryPage(page);
  await loginPage.fillUsernameInput(process.env.VALID_USERNAME!);
  await loginPage.fillPasswordInput(process.env.VALID_PASSWORD!);
  await loginPage.clickOnLogin();
  await inventoryPage.verifyHomePageLoaded();
});

test('should not log in with invalid credentials', async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.goto();
  await loginPage.fillUsernameInput(process.env.INVALID_USERNAME!);
  await loginPage.fillPasswordInput(process.env.INVALID_PASSWORD!);
  await loginPage.clickOnLogin();
  await loginPage.verifyLoginWasNotSuccessful();
});
