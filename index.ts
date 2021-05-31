import express from "express";
import cors from "cors";
import { query } from "./db/database";

const app = express();
app.use(cors());

// async function main() {
//     const res = await query("SELECT * FROM data", [])
//     console.log(res.rows)
// }

// main();

module.exports = app;