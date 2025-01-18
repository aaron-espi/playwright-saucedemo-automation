import dotenv from 'dotenv';

dotenv.config();

export const config = {
  validUsername: process.env.VALID_USERNAME!,
  validPassword: process.env.VALID_PASSWORD!,
  invalidUsername: process.env.INVALID_USERNAME!,
  invalidPassword: process.env.INVALID_PASSWORD!,
  baseUrl: process.env.BASE_URL!,
};
