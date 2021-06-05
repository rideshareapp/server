// import { Pool, PoolClient, QueryResult } from "pg";
import { Pool, QueryResult } from "pg";
import dotenv from "dotenv";
dotenv.config();

const pool = new Pool({
    host: process.env.DB_HOST,
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    port: 5432,
    max: 10,
});

pool.on('error', (err) => {
    console.error('Unexpected error on idle client', err);
    process.exit(-1);
});

export async function query(text: string, params: Array<unknown>): Promise<QueryResult> {
    const start = Date.now();
    const res = await pool.query(text, params);
    const duration = Date.now() - start;
    console.log('executed query', { text, duration, rows: res.rowCount });
    return res;
}

// export async function getClient(): Promise<PoolClient> {
//     const client = await pool.connect();
//     const query = client.query;
//     const release = client.release;

//     // set a timeout of 5 seconds, after which we will log this client's last query
//     const timeout = setTimeout(() => {
//         console.error('A client has been checked out for more than 5 seconds!')
//     }, 5000)

//     // monkey patch the query method to keep track of the last query executed
//     client.query = (...args: Array<unknown>) => {
//         client.lastQuery = args
//         return query.apply(client, args)
//     }
    
//     client.release = () => {
//         // clear our timeout
//         clearTimeout(timeout)
//         // set the methods back to their old un-monkey-patched version
//         client.query = query
//         client.release = release
//         return release.apply(client)
//     }
//     return client;
// }