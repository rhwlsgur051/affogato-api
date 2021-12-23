require('dotenv').config();
import dotenv from "dotenv";
import path from "path";

export async function setEnv() {
  if (process.env.NODE_ENV === 'development') {
    dotenv.config({
      path: path.join(__dirname, '../../.env.development')
    });
  } else if (process.env.NODE_ENV === 'local') {
    dotenv.config({
      path: path.join(__dirname, '../../.env.local')
    });
  } else if (process.env.NODE_ENV === 'production') {
    dotenv.config({
      path: path.join(__dirname, '../../.env.production')
    });
  }
}