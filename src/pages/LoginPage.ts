import { Page, expect } from '@playwright/test';
import { LoginLocators } from '../constants/locators/LoginLocators';
import { StringConstants } from '../constants/StringConstants';
import config from '../config/config';

export class LoginPage {
  readonly page: Page;

  readonly baseUrl: string = config.baseUrl;
  readonly invalidCredentialsMessageText: string = StringConstants.INVALID_CREDENTIALS;
  readonly userLockedMessageText: string = StringConstants.USER_LOCKED;
  readonly usernameRequiredMessageText: string = StringConstants.USERNAME_REQUIRED;
  readonly passwordRequiredMessageText: string = StringConstants.PASSWORD_REQUIRED;

  constructor(page: Page) {
    this.page = page;
  }

  async goto() {
    await this.page.goto(this.baseUrl);
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

  async verifyInvalidCredentialsMessage() {
    await this.verifyErrorMessage(this.invalidCredentialsMessageText);
  }

  async verifyUsernameRequiredMessage() {
    await this.verifyErrorMessage(this.usernameRequiredMessageText);
  }

  async verifyPasswordRequiredMessage() {
    await this.verifyErrorMessage(this.passwordRequiredMessageText);
  }

  async verifyUserLockedMessage() {
    await this.verifyErrorMessage(this.userLockedMessageText);
  }

  async verifyErrorMessage(expectedMessage: string) {
    await expect(this.page.locator(LoginLocators.loginFailureMessage)).toBeVisible();
    await expect(this.page.locator(LoginLocators.loginFailureMessage)).toHaveText(expectedMessage);
  }

  async verifyLoginPageLoaded() {
    await expect(this.page.locator(LoginLocators.usernameInput)).toBeVisible();
    await expect(this.page.locator(LoginLocators.passwordInput)).toBeVisible();
    await expect(this.page.locator(LoginLocators.loginButton)).toBeVisible();
  }
}
