// import passport from "passport";
// import localStrategy from "passport-local";
import * as jwt from "jsonwebtoken";
import * as db from "../db/utils";
import bcrypt from "bcrypt";
import { Request, Response, NextFunction } from "express";

/**
 * Hash a plaintext password using bcrypt
 * @param plaintext Plaintext password
 * @returns Hashed password
 */
export async function hashPassword(plaintext: string): Promise<string> {
    try {
        const hashed = await bcrypt.hash(plaintext, 10);
        return hashed;
    } catch (err) {
        console.error(err);
        return err;
    }
}

/**
 * Check if submitted password matches database password
 * @param email email
 * @param password password
 * @param type User or org login
 * @returns true or false
 */
export async function authenticateAcc(email: string, password: string, type: "users" | "organizations"): Promise<boolean> {
    try {
        const hash = await db.getPassword(email, type);
        const match = await bcrypt.compare(password, hash);
        if (!match) console.log("password mismatch");
        return (match ? true : false);
    } catch (err) {
        console.error(err);
        return false;
    }

}

/**
 * Create JWT token using email
 * @param email User or org email
 * @returns JWT token
 */
export async function tokenizeAcc(email: string): Promise<string> {
    const token = jwt.sign({ "email": email }, process.env.ACCESS_TOKEN as string, { expiresIn: process.env.ACCESS_TOKEN_EXPIRY });
    return token;
}

/**
 * Verifies that a JWT is valid
 * @param email User or organization email
 * @param token JWT token
 * @returns JWT verified or error
 */
export async function verifyToken(email: string, token: string): Promise<unknown> {
    try {
        const decoded = jwt.verify(token, process.env.ACCESS_TOKEN as string);
        console.log(decoded);
        return decoded;
    } catch (err) {
        return err;
    }
}

/**
 * Get payload of a JWT token
 * @param token JWT token
 * @returns JWT payload
 */
export async function tokenGetPayload(token: string): Promise<unknown | jwt.JsonWebTokenError> {
    try {
        const decoded = jwt.decode(token);
        return decoded;
    } catch (err) {
        return err;
    }
}

export async function authenticateToken(req: Request, res: Response, next: NextFunction): Promise<Response | undefined> {
    const header = req.headers.authorization;
    if (header === undefined || header === null) {
        return res.sendStatus(401);
    }
    const token = header.split(' ')[1];

    try {
        const decoded = jwt.verify(token, process.env.ACCESS_TOKEN as string);
        req.user = decoded;
        next();
    } catch (err) {
        console.error(err);
        return res.sendStatus(403);
    }
}