import axios from "axios";
import { parseStringPromise } from "xml2js";
import dotenv from 'dotenv';
dotenv.config();

const URL = process.env.URL;

export default async function getData() {
  try {
    const response = await axios.get(URL, {
      Accept: "application/xml",
    });

    const data = response.data;

    const dataJson = await parseStringPromise(data, {
      mergeAttrs: true,
      explicitArray: false,
    });

    return dataJson;
  } catch (err) {
    console.log("Error making the request: " + err.message);
  }
}
