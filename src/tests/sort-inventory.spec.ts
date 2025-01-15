import { test } from '@playwright/test';
import { InventoryPage } from '../pages/InventoryPage';
import { LoginPage } from '../pages/LoginPage';

let inventoryPage: InventoryPage;

test.beforeEach(async ({ page }) => {
  inventoryPage = new InventoryPage(page);
  const loginPage = new LoginPage(page);
  await loginPage.login('standard_user', 'secret_sauce');
});

test('should sort products by price in descending order when "Price (High to Low)" is selected', async () => {
  await inventoryPage.selectSortOption('hilo');
  await inventoryPage.verifyPricesSorted('desc');
});

test('should sort products by price in ascending order when "Price (Low to High)" is selected', async () => {
  await inventoryPage.selectSortOption('lohi');
  await inventoryPage.verifyPricesSorted('asc');
});

test('should sort products by name in ascending order when "Name (A to Z)" is selected', async () => {
  await inventoryPage.selectSortOption('az');
  await inventoryPage.verifyProductsSortedByName('asc');
});

test('should sort products by name in descending order when "Name (Z to A)" is selected', async () => {
  await inventoryPage.selectSortOption('za');
  await inventoryPage.verifyProductsSortedByName('desc');
});
