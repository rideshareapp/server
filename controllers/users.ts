// Controllers: Users

import * as db from "../db/utils";
import * as userModel from "../models/users";
import { Success, Error } from "../models/return_status";
import * as services from "../services/";
import * as auth from "../auth";
import { Request, Response, NextFunction } from "express";

export async function userRegister(req: Request, res: Response, next: NextFunction): Promise<Response> {
    try {
        const user: userModel.User = req.body; // Create a new user from body content
        if (await db.checkEntityExists(req.body.email, "users")) {
            return res.status(409).json(new Error("user already exists"));
        }
        if (!await services.userService.createNewUser(user)) {
            return res.status(500).json(new Error("failed to create user"));
        }
        return await login(req, res, next);
    } catch (err) {
        console.error(err);
        return res.status(500).json(new Error("internal server error"));
    }
}

export async function login(req: Request, res: Response, next: NextFunction): Promise<Response> {
    try {
        // TODO: Store session tokens

        // Authenticate user
        if (!await db.checkEntityExists(req.body.email, "users")) {
            return res.status(409).json(new Error("user not found"));
        }
        if (!await auth.authenticateAcc(req.body.email, req.body.password, "users")) {
            return res.status(401).json(new Error("password mismatch"));
        }
        // Return token
        const token = await auth.tokenizeAcc(req.body.email);
        return res.status(200).json(new Success({ "token": token }));
    } catch (err) {
        console.error(err);
        return res.status(500).json(new Error("internal server error"));
    }
}

export async function logout(): Promise<void> {
    // User logout logic
    // Delete session and tokens
}

export async function joinOrg(req: Request, res: Response, next: NextFunction): Promise<Response> {
    try {
        if (!await db.checkOrgExists(req.body.code, "org_code")) {
            return res.status(409).json(new Error("org does not exist"));
        }
        if (await db.checkUserInOrg(req.body.code, req.body.email)) {
            return res.status(409).json(new Error("user already in org"));
        }
        if (!await db.joinOrg(req.body.code, req.body.email)) {
            return res.status(500).json(new Error("failed to join org"));
        }
        return res.status(201).json(new Success("joined org"));
    } catch (err) {
        console.error(err);
        return res.status(500).json(new Error("internal server error"));
    }
}