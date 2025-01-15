import { test } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { InventoryPage } from '../pages/InventoryPage';

test('should log in successfully with valid credentials', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const inventoryPage = new InventoryPage(page);

  await loginPage.goto();
  await loginPage.fillUsernameInput('standard_user');
  await loginPage.fillPasswordInput('secret_sauce');
  await loginPage.clickOnLoginButton();
  await inventoryPage.verifyHomePageLoaded();
});

test('should not log in with invalid credentials', async ({ page }) => {
  const loginPage = new LoginPage(page);

  await loginPage.goto();
  await loginPage.fillUsernameInput('not_existing_user');
  await loginPage.fillPasswordInput('secret_sauce');
  await loginPage.clickOnLoginButton();
  await loginPage.verifyLoginWasNotSuccessful();
});
