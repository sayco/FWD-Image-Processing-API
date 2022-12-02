import dotenv from "dotenv";
import { Pool } from "pg";

dotenv.config();

const {
  POSTGRES_HOST,
  POSTGRES_DB,
  POSTGRES_USERNAME,
  POSTGRES_PASSWORD,
} = process.env;


const client = new Pool({
  POSTGRES_HOST,
  POSTGRES_DB,
  POSTGRES_USERNAME,
  POSTGRES_PASSWORD,
});


export default client;