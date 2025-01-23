import { CommonLocators } from './CommonLocators';

export class LoginLocators {
  static readonly usernameInput = '[data-test="username"]';
  static readonly passwordInput = '[data-test="password"]';
  static readonly loginButton = '[data-test="login-button"]';
  static readonly loginFailureMessage = CommonLocators.errorMessage;
}
