import { Locator, Page, expect } from '@playwright/test';
import { LoginSelectors } from '../constants/selectors/LoginSelectors';

export class LoginPage {
  readonly page: Page;
  readonly usernameInput: Locator;
  readonly passwordInput: Locator;
  readonly loginButton: Locator;
  readonly loginFailureMessage: Locator;

  readonly loginFailureMessageText: string =
    'Epic sadface: Username and password do not match any user in this service';

  constructor(page: Page) {
    this.page = page;
    this.usernameInput = page.locator(LoginSelectors.usernameInput);
    this.passwordInput = page.locator(LoginSelectors.passwordInput);
    this.loginButton = page.locator(LoginSelectors.loginButton);
    this.loginFailureMessage = page.locator(LoginSelectors.loginFailureMessage);
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
    await this.usernameInput.fill(username);
  }

  async fillPasswordInput(password: string) {
    await this.passwordInput.fill(password);
  }

  async clickOnLoginButton() {
    await this.loginButton.click();
  }

  async verifyLoginWasNotSuccessful() {
    await expect(this.loginFailureMessage).toBeVisible();
    await expect(this.loginFailureMessage).toHaveText(this.loginFailureMessageText);
  }
}
