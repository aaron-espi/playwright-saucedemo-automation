import { test } from '@playwright/test';
import { InventoryPage } from '../pages/InventoryPage';
import { LoginPage } from '../pages/LoginPage';
import { SortOrder } from '../constants/enum/SortOrder';
import { SortCriteria } from '../constants/enum/SortCriteria';
import { config } from '../../playwright.config';

let inventoryPage: InventoryPage;

test.beforeEach(async ({ page }) => {
  inventoryPage = new InventoryPage(page);
  const loginPage = new LoginPage(page);
  await loginPage.login(config.validUsername, config.validPassword);
});

test('should sort products by price in descending order when "Price (High to Low)" is selected', async () => {
  await inventoryPage.selectSortOption(SortCriteria.PriceHighToLow);
  await inventoryPage.verifyPricesSorted(SortOrder.Descending);
});

test('should sort products by price in ascending order when "Price (Low to High)" is selected', async () => {
  await inventoryPage.selectSortOption(SortCriteria.PriceLowToHigh);
  await inventoryPage.verifyPricesSorted(SortOrder.Ascending);
});

test('should sort products by name in ascending order when "Name (A to Z)" is selected', async () => {
  await inventoryPage.selectSortOption(SortCriteria.NameAtoZ);
  await inventoryPage.verifyProductsSortedByName(SortOrder.Ascending);
});

test('should sort products by name in descending order when "Name (Z to A)" is selected', async () => {
  await inventoryPage.selectSortOption(SortCriteria.NameZtoA);
  await inventoryPage.verifyProductsSortedByName(SortOrder.Descending);
});
