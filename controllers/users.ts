import { query } from "../db/database";

async function main() {
    const res = await query("SELECT * FROM data", [])
    console.log(res.rows)
}

main();
