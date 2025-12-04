/* eslint-disable n/no-process-env */
import path from 'path';
import dotenv from 'dotenv';

// Configure "dotenv"
const pathToEnv = path.join(__dirname, '../.env.test');
const result1 = dotenv.config({ path: pathToEnv });
if (result1.error) {
  throw result1.error;
}
