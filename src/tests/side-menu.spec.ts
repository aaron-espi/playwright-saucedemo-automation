import { test } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { InventoryPage } from '../pages/InventoryPage';
import { AboutPage } from '../pages/AboutPage';
import { SideMenuAction } from '../constants/enum/SideMenuAction';
import { config } from '../../playwright.config';

test.beforeEach(async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.login(config.validUsername, config.validPassword);
});

test('should reveal side menu when hamburger is clicked', async ({ page }) => {
  const inventoryPage = new InventoryPage(page);
  await inventoryPage.toggleSideMenu(SideMenuAction.Open);
  await inventoryPage.verifySideMenuIsOpen();
});

test('should display all side menu options when opened', async ({ page }) => {
  const inventoryPage = new InventoryPage(page);
  await inventoryPage.toggleSideMenu(SideMenuAction.Open);
  await inventoryPage.verifySideMenuOptionsAreVisible();
});

test('should reset app state when reset button is clicked', async ({ page }) => {
  const inventoryPage = new InventoryPage(page);
  await inventoryPage.addProductToCart(0);
  await inventoryPage.toggleSideMenu(SideMenuAction.Open);
  await inventoryPage.clickOnResetAppState();
  await inventoryPage.verifyCartIsEmpty();
});

test('should collapse side menu when hamburger icon is clicked again', async ({ page }) => {
  const inventoryPage = new InventoryPage(page);
  await inventoryPage.toggleSideMenu(SideMenuAction.Open);
  await inventoryPage.toggleSideMenu(SideMenuAction.Close);
  await inventoryPage.verifySideMenuIsClosed();
});

test('should navigate to login page after clicking logout button in side menu', async ({ page }) => {
  const inventoryPage = new InventoryPage(page);
  const loginPage = new LoginPage(page);
  await inventoryPage.toggleSideMenu(SideMenuAction.Open);
  await inventoryPage.clickOnLogout();
  await loginPage.verifyLoginPageLoaded();
});

test('should navigate to about page after clicking about button in side menu', async ({ page }) => {
  const inventoryPage = new InventoryPage(page);
  const aboutPage = new AboutPage(page);
  await inventoryPage.toggleSideMenu(SideMenuAction.Open);
  await inventoryPage.clickOnAbout();
  await aboutPage.verifyAboutPageLoaded();
});
