// test-data/login.data.ts
import { flashMessages } from "../pages/loginPage";

export type LoginTestCase = {
  name: string;
  username: string;
  password: string;
  expectedMessage: string;
};

export const invalidLoginCases: LoginTestCase[] = [
  {
    name: "invalid username",
    username: "wrongUser",              
    password: process.env.TEST_PASSWORD!,
    expectedMessage: flashMessages.INVALID_USERNAME,
  },
  {
    name: "invalid password",
    username: process.env.TEST_USERNAME!,
    password: "wrongPassword",          
    expectedMessage: flashMessages.INVALID_PASSWORD,
  },
  {
    name: "empty fields",
    username: " ",
    password: " ",
    expectedMessage: flashMessages.INVALID_USERNAME,
  }
];