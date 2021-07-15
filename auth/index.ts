// import passport from "passport";
// import localStrategy from "passport-local";
import * as jwt from "jsonwebtoken";
import * as db from "../db/utils";
import bcrypt from "bcrypt";
import { Request, Response, NextFunction } from "express";
import { Success, Error } from "../models/return_status";
import * as redis from "../db/redis";


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
 * Create JWT access token using email
 * @param email User or org email
 * @returns JWT token
 */
export async function createAccessToken(email: string): Promise<string> {
    const token = jwt.sign({ "email": email }, process.env.ACCESS_TOKEN as string, { expiresIn: `${process.env.ACCESS_TOKEN_EXPIRY}s` });
    return token;
}

/**
 * Create a JWT refresh token using email
 * @param email User or org email
 * @returns JWT token
 */
export async function createRefreshToken(email: string): Promise<string> {
    const token = jwt.sign({ "email": email }, process.env.REFRESH_TOKEN as string, { expiresIn: `${process.env.REFRESH_TOKEN_EXPIRY}s` });
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
/**
 * Authenticate a user using the access token cookie
 * @param req Express request
 * @param res Express response
 * @param next Express NextFunction
 * @returns Express response (401/403) or goes to next funciton
 */
export async function authenticateToken(req: Request, res: Response, next: NextFunction): Promise<Response | undefined> {
    // const header = req.headers.authorization;
    // if (header === undefined || header === null) {
    //     return res.sendStatus(401);
    // }
    // const token = header.split(' ')[1];

    const token = req.cookies.ACCESS_TOKEN;
    if (token === undefined || token === null || token === "") {
        return res.sendStatus(401);
    }

    try {
        const decoded = jwt.verify(token, process.env.ACCESS_TOKEN as string);
        req.user = decoded;
        next();
    } catch (err) {
        console.error(err);
        return res.sendStatus(403);
    }
}

/**
 * Refresh a user access token using a refresh token if the refesh token is valid
 * @param req Express request
 * @param res Express response
 * @returns New access token
 */
export async function refreshAccessToken(req: Request, res: Response): Promise<Response> {
    const token = req.cookies.REFRESH_TOKEN;
    console.log(token);

    // Check if token exists
    if (!token) {
        return res.sendStatus(401);
    }

    // Check if refresh token in Redis
    if (!(await redis.keyExists(token))) {
        return res.sendStatus(401);
    }

    try {
        const decoded = jwt.verify(token, process.env.REFRESH_TOKEN as string);
        const email = (decoded as JWTUserEmail).email;

        const access_token = jwt.sign({ "email": email }, process.env.ACCESS_TOKEN as string, { expiresIn: `${process.env.ACCESS_TOKEN_EXPIRY}s` });
        res.cookie('ACCESS_TOKEN', access_token, { httpOnly: true, expires: new Date(new Date().getTime() + 1000 * parseInt(process.env.ACCESS_TOKEN_EXPIRY || "")), sameSite: "strict" });
        return res.status(200).json(new Success({ "access_token": access_token }));
    } catch (err) {
        console.error(err);
        return res.status(500).json(new Error("internal server error"));
    }
}