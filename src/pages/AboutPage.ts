import { expect, Page } from '@playwright/test';
import { config } from '../config';

export class AboutPage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async verifyAboutPageLoaded() {
    await expect(this.page.url()).toBe(config.aboutUrl);
  }
}
