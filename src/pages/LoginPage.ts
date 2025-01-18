import { Page, expect } from '@playwright/test';
import { LoginLocators } from '../constants/locators/LoginLocators';
import { StringConstants } from '../constants/StringConstants';
import { config } from '../config';

export class LoginPage {
  readonly page: Page;

  readonly loginFailureMessageText: string = StringConstants.LOGIN_ERROR_MESSAGE;

  constructor(page: Page) {
    this.page = page;
  }

  async goto() {
    await this.page.goto(config.baseUrl);
  }

  async login(username: string, password: string) {
    await this.goto();
    await this.fillUsernameInput(username);
    await this.fillPasswordInput(password);
    await this.clickOnLogin();
  }

  async fillUsernameInput(username: string) {
    await this.page.locator(LoginLocators.usernameInput).fill(username);
  }

  async fillPasswordInput(password: string) {
    await this.page.locator(LoginLocators.passwordInput).fill(password);
  }

  async clickOnLogin() {
    await this.page.locator(LoginLocators.loginButton).click();
  }

  async verifyLoginWasNotSuccessful() {
    await expect(this.page.locator(LoginLocators.loginFailureMessage)).toBeVisible();
    await expect(this.page.locator(LoginLocators.loginFailureMessage)).toHaveText(this.loginFailureMessageText);
  }

  async verifyLoginPageLoaded() {
    await expect(this.page.locator(LoginLocators.usernameInput)).toBeVisible();
    await expect(this.page.locator(LoginLocators.passwordInput)).toBeVisible();
    await expect(this.page.locator(LoginLocators.loginButton)).toBeVisible();
  }
}
