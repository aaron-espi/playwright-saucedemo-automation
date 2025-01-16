import { expect, Page } from '@playwright/test';

export class AboutPage {
  readonly page: Page;

  readonly expectedUrl = 'https://saucelabs.com/';

  constructor(page: Page) {
    this.page = page;
  }

  async verifyAboutPageLoaded() {
    await expect(this.page.url()).toBe(this.expectedUrl);
  }
}
