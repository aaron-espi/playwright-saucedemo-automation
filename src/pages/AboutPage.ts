import { expect, Page } from '@playwright/test';
import config from '../config/config';

export class AboutPage {
  readonly page: Page;

  readonly aboutUrl: string = config.aboutUrl;

  constructor(page: Page) {
    this.page = page;
  }

  async verifyAboutPageLoaded() {
    await expect(this.page.url()).toBe(this.aboutUrl);
  }
}
