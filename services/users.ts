// Services: Users

import * as db from "../db/utils";
import bcrypt from "bcrypt";
import * as userModel from "../models/users";
// import jwt from "jsonwebtoken";

/**
 * Create new user
 * @param user User model
 * @returns true or false
 */
export async function createNewUser(user: userModel.User): Promise<boolean> {
    const newUser = new userModel.User(user.first, user.last, user.phone, user.email, user.password);
    newUser.password = await bcrypt.hash(newUser.password, 10);
    if (!await db.createUser(newUser)) {
        return false;
    } else {
        return true;
    }
}

// /**
//  * Check if submitted password matches database password
//  * @param email User email
//  * @param password User password
//  * @returns true or false
//  */
// export async function authenticateUser(email: string, password: string): Promise<boolean> {
//     const hash = await db.getPassword(email);
//     const match = await bcrypt.compare(password, hash);
//     return (match ? true : false);
// }

// /**
//  * Create JWT token using user email
//  * @param email User email
//  * @returns JWT token
//  */
// export async function tokenizeUser(email: string): Promise<string> {
//     const token = jwt.sign(email, process.env.JWT_SECRET as string);
//     return token;
// }

// /**
//  * Verifies that a JWT is valid
//  * @param token JWT token
//  * @returns JWT verified or error
//  */
// export async function verifyToken(email: string, token: string): Promise<unknown> {
//     try {
//         const decoded = jwt.verify(token, process.env.JWT_SECRET as string);
//         console.log(decoded);
//         return decoded;
//     } catch (err) {
//         return err;
//     }
// }