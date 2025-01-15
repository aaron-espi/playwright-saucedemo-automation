import { test } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { InventoryPage } from '../pages/InventoryPage';

test.beforeEach(async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.login('standard_user', 'secret_sauce');
});

test('should reveal side menu when hamburger is clicked', async ({ page }) => {
  const inventoryPage = new InventoryPage(page);

  await inventoryPage.toggleSideMenu('open');
  await inventoryPage.verifySideMenuIsOpen();
});

test('should collapse side menu when hamburger icon is clicked again', async ({ page }) => {
  const inventoryPage = new InventoryPage(page);

  await inventoryPage.toggleSideMenu('open');
  await inventoryPage.toggleSideMenu('close');
  await inventoryPage.verifySideMenuIsClosed();
});
