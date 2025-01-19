import dotenv from 'dotenv';

dotenv.config();

export const config = {
  validUsername: process.env.VALID_USERNAME!,
  validPassword: process.env.VALID_PASSWORD!,
  invalidUsername: process.env.INVALID_USERNAME!,
  invalidPassword: process.env.INVALID_PASSWORD!,
  lockedUsername: process.env.LOCKED_USERNAME!,
  baseUrl: process.env.BASE_URL!,
  aboutUrl: process.env.ABOUT_URL!,
};
