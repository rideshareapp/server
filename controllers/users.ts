// Controllers: Users

import * as db from "../db/utils";
import * as redis from "../db/redis";
import * as userModel from "../models/users";
import { Success, Error } from "../models/return_status";
import * as services from "../services/";
import * as auth from "../auth";
import { Request, Response } from "express";

export async function userRegister(req: Request, res: Response): Promise<Response> {
    try {
        const user: userModel.User = req.body; // Create a new user from body content
        if (await db.checkEntityExists(req.body.email, "users")) {
            return res.status(409).json(new Error("user already exists"));
        }
        if (!await services.userService.createNewUser(user)) {
            return res.status(500).json(new Error("failed to create user"));
        }
        return await login(req, res);
    } catch (err) {
        console.error(err);
        return res.status(500).json(new Error("internal server error"));
    }
}

export async function login(req: Request, res: Response): Promise<Response> {
    try {
        // Authenticate user
        if (!await db.checkEntityExists(req.body.email, "users")) {
            return res.status(409).json(new Error("user not found"));
        }
        if (!await auth.authenticateAcc(req.body.email, req.body.password, "users")) {
            return res.status(401).json(new Error("password mismatch"));
        }

        // Create access and refresh token
        const access_token = await auth.createAccessToken(req.body.email);
        const refresh_token = await auth.createRefreshToken(req.body.email);

        // Insert refresh token into Redis database
        redis.insertKey(refresh_token, req.body.email);

        // Return token
        res.cookie('ACCESS_TOKEN', access_token, { httpOnly: true, expires: new Date(new Date().getTime() + 1000 * parseInt(process.env.ACCESS_TOKEN_EXPIRY || "")), sameSite: "strict" });
        res.cookie('REFRESH_TOKEN', refresh_token, { httpOnly: true, expires: new Date(new Date().getTime() + 1000 * parseInt(process.env.REFRESH_TOKEN_EXPIRY || "")), path: "/auth/refresh", sameSite: "strict" });
        return res.status(200).json(new Success({ "access_token": access_token, "refresh_token": refresh_token }));
    } catch (err) {
        console.error(err);
        return res.status(500).json(new Error("internal server error"));
    }
}

export async function logout(req: Request, res: Response): Promise<Response> {
    // User logout logic
    try {
        redis.deleteKey(req.cookies.REFRESH_TOKEN);
        return res.sendStatus(401);
    } catch (err) {
        console.error(err);
        return res.status(500).json(new Error("internal server error"));
    }
}

export async function joinOrg(req: Request, res: Response): Promise<Response> {
    try {
        if (!await db.checkOrgExists(req.body.code, "org_code")) {
            return res.status(409).json(new Error("org does not exist"));
        }
        if (!await db.checkEntityExists(req.user.email, "users")) {
            return res.status(409).json(new Error("user not found"));
        }
        if (await db.checkUserInOrg(req.body.code, req.user.email)) {
            return res.status(409).json(new Error("user already in org"));
        }
        if (!await db.joinOrg(req.body.code, req.user.email)) {
            return res.status(500).json(new Error("failed to join org"));
        }
        return res.status(201).json(new Success("joined org"));
    } catch (err) {
        console.error(err);
        return res.status(500).json(new Error("internal server error"));
    }
}

export async function leaveOrg(req: Request, res: Response): Promise<Response> {
    try {
        await db.leaveOrg(req.body.code, req.user.email);
        return res.status(200).json(new Success("left org"));
    } catch (err) {
        console.error(err);
        return res.status(500).json(new Error("internal server error"));
    }
}

export async function updateUserProfile(req: Request, res: Response): Promise<Response> {
    try {
        if (req.user.email !== req.body.email) {
            return res.sendStatus(403);
        }
        if (!await db.updateUserProfile(req.body)) {
            return res.status(500).json(new Error("internal server error"));
        }
        return res.status(200).json(new Success("user updated"));
    } catch (err) {
        console.error(err);
        return res.status(500).json(new Error("internal server error"));
    }
}

export async function updateUserPassword(req: Request, res: Response): Promise<Response> {
    try {
        if (!await services.userService.updateUserPassword(req.user.email, req.body.oldPassword, req.body.newPassword)) {
            return res.status(500).json(new Error("internal server error"));
        }
        return res.status(200).json(new Success("user updated"));
    } catch (err) {
        console.error(err);
        return res.status(500).json(new Error("internal server error"));
    }
}

export async function updateUserEmail(req: Request, res: Response): Promise<Response> {
    try {
        if (!await services.userService.updateUserEmail(req.user.email, req.body.newEmail)) {
            return res.status(500).json(new Error("internal server error"));
        }
        return res.status(200).json(new Success("user updated"));
    } catch (err) {
        console.error(err);
        return res.status(500).json(new Error("internal server error"));
    }
}