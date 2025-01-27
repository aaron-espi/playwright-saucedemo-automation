import 'dotenv/config';

const ENV = process.env.NODE_ENV!;

const config = {
  dev: {
    baseUrl: 'https://dev.saucedemo.com',
    aboutUrl: 'https://dev.saucelabs.com/',
  },
  pre: {
    baseUrl: 'https://pre.saucedemo.com',
    aboutUrl: 'https://pre.saucelabs.com/',
  },
  prod: {
    baseUrl: 'https://www.saucedemo.com',
    aboutUrl: 'https://saucelabs.com/',
  },
};

export default config[ENV];
