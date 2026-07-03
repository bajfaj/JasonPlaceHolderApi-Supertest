import * as dotenv from 'dotenv';
import * as path from 'path';

const envName = process.env.ENV ?? 'DEV';  // capture immediately
const envFile = path.resolve(process.cwd(), `.env.${envName}`);

const result = dotenv.config({ path: envFile });
if (result.error) {
  throw new Error(`Could not load ${envFile}: ${result.error.message}`);
}

if (!process.env.BASE_URL) {
  throw new Error(`BASE_URL is not defined in ${envFile}`);
}

export const BASE_URL: string = process.env.BASE_URL;
export const ENV: string = envName;  // export the captured value, not process.env.ENV

console.log(`Running tests against ENV: ${ENV}`);
console.log(`BaseURL set to: ${BASE_URL}`);