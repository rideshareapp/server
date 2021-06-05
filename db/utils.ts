import * as db from "./database";
import * as userModel from "../models/users";

/**
 * Create a new user and add to database
 * 
 * @param user - User model
 * @returns true or false
 */
export async function createUser(user: userModel.User): Promise<boolean> {
    try {
        const params = [user.email, user.first, user.last, user.phone, user.password];
        await db.query("INSERT INTO users VALUES($1, $2, $3, $4, $5)", params);
        return true;
    } catch {
        return false;
    }
}

/**
 * Get all user data if user exists in database
 * 
 * @param user - User email
 * @returns User model
 */
export async function findUser(email: string): Promise<userModel.User> {
    const res = await db.query("SELECT * FROM users WHERE email = $1", [email]);
    const userArray = await res.rows[0];
    const user = new userModel.User(userArray.first_name, userArray.last_name, userArray.phone, userArray.email, userArray.pw_hashed);
    return user;
    // return (await db.query("SELECT * FROM users WHERE email = $1", [user])).rows[0];
}

/**
 * Checks if a user email is already in the database
 * 
 * @param user - User email
 * @returns true or false
 */
export async function checkUserExists(email: string): Promise<boolean> {
    const res = await db.query("SELECT * FROM users WHERE email = $1", [email]);
    return (res.rows.length === 0 ? false : true);
}

/**
 * Get the password of a user from the users database
 * 
 * @param user - User email
 * @returns hashed password of user
 */
export async function getPassword(email: string): Promise<string> {
    const res = await db.query("SELECT pw_hashed FROM users WHERE email = $1", [email]);
    return res.rows[0].pw_hashed;
}