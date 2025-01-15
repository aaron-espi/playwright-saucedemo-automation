import { Locator, Page, expect } from '@playwright/test';
import { LoginLocators } from '../constants/locators/LoginLocators';

export class LoginPage {
  readonly page: Page;

  readonly loginFailureMessageText: string =
    'Epic sadface: Username and password do not match any user in this service';

  constructor(page: Page) {
    this.page = page;
  }

  async goto() {
    await this.page.goto('https://www.saucedemo.com/');
  }

  async login(username: string, password: string) {
    await this.goto();
    await this.fillUsernameInput(username);
    await this.fillPasswordInput(password);
    await this.clickOnLoginButton();
  }

  async fillUsernameInput(username: string) {
    await this.page.locator(LoginLocators.usernameInput).fill(username);
  }

  async fillPasswordInput(password: string) {
    await this.page.locator(LoginLocators.passwordInput).fill(password);
  }

  async clickOnLoginButton() {
    await this.page.locator(LoginLocators.loginButton).click();
  }

  async verifyLoginWasNotSuccessful() {
    await expect(this.page.locator(LoginLocators.loginFailureMessage)).toBeVisible();
    await expect(this.page.locator(LoginLocators.loginFailureMessage)).toHaveText(this.loginFailureMessageText);
  }
}
