import mongoose from "mongoose";
import dotenv from 'dotenv';
dotenv.config();

const DATABASE = process.env.DATABASE

export default async function initDatabase() {
  try {
    mongoose.Promise = global.Promise;
    mongoose.set("strictQuery", false);

    mongoose.connect(DATABASE);
    console.log("Database initialized successfully");
  } catch (error) {
    console.log(`Error on connecting to mongoDB database: ${error}`);
  }
}
