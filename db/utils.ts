import * as db from "./database";
import * as userModel from "../models/users";

export async function createUser(user: userModel.User): Promise<number> {
    await db.query("INSERT INTO users VALUES($1, $2, $3, $4, $5)", [user.email, user.first, user.last, user.phone, user.password]);
    return 200;
}

export async function findUser(user: string): Promise<Array<unknown>> {
    const res = await db.query("SELECT * FROM users WHERE email = $1", [user]);
    return res.rows[0];
}

export async function checkUserExists(user: string): Promise<boolean> {
    const res = await db.query("SELECT * FROM users WHERE email = $1", [user]);
    // if (res.rows.length === 0) {
    //     return false;
    // } else {
    //     return true;
    // }
    return (res.rows.length === 0 ? false : true);
}

export async function getPassword(user: string): Promise<string> {
    const res = await db.query("SELECT pw_hashed FROM users WHERE email = $1", [user]);
    return res.rows[0][0];
}