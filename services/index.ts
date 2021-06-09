import * as db from "../db/utils";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export * as userService from "./users";
export * as orgService from "./organizations";

/**
 * Check if submitted password matches database password
 * @param email email
 * @param password password
 * @returns true or false
 */
export async function authenticateAcc(email: string, password: string, type: "users" | "organizations"): Promise<boolean> {
    const hash = await db.getPassword(email, type);
    const match = await bcrypt.compare(password, hash);
    return (match ? true : false);
}

/**
 * Create JWT token using email
 * @param email User or org email
 * @returns JWT token
 */
export async function tokenizeAcc(email: string): Promise<string> {
    const token = jwt.sign(email, process.env.JWT_SECRET as string);
    return token;
}

/**
 * Verifies that a JWT is valid
 * @param token JWT token
 * @returns JWT verified or error
 */
export async function verifyToken(email: string, token: string): Promise<unknown> {
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET as string);
        console.log(decoded);
        return decoded;
    } catch (err) {
        return err;
    }
}