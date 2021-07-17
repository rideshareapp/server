// Controllers: Organizations

import * as db from "../db/utils";
import * as redis from "../db/redis";
import * as orgModel from "../models/organization";
import * as services from "../services";
import * as auth from "../auth";
import { Request, Response } from "express";
import { Success, Error } from "../models/return_status";

export async function orgRegister(req: Request, res: Response): Promise<Response> {
    try {
        // Organization registration logic
        const org: orgModel.Organization = { ...req.body };
        if (await db.checkEntityExists(org.email, "organizations")) {
            return res.status(409).json(new Error("org already exists"));
        }

        org.password = await auth.hashPassword(org.password);
        if (!await services.orgService.createNewOrg(org)) {
            return res.status(500).json(new Error("failed to create org"));
        }
        return await login(req, res);
    } catch (err) {
        console.error(err);
        return res.status(500).json(new Error("internal server error"));
    }

}

export async function login(req: Request, res: Response): Promise<Response> {
    try {
        // Authenticate organization login
        if (!await db.checkEntityExists(req.body.email, "organizations")) {
            return res.status(409).json(new Error("org not found"));
        }
        if (!await auth.authenticateAcc(req.body.email, req.body.password, "organizations")) {
            return res.status(401).json(new Error("password mismatch"));
        }

        // Create access and refresh token
        const access_token = await auth.createAccessToken(req.body.email);
        const refresh_token = await auth.createRefreshToken(req.body.email);

        // Insert refresh token into Redis database
        redis.insertKey(refresh_token, req.body.email);
        redis.expire(refresh_token, parseInt(process.env.REFRESH_TOKEN_EXPIRY || ""));

        // Return token
        res.cookie('ACCESS_TOKEN', access_token, { httpOnly: true, expires: new Date(new Date().getTime() + 1000 * parseInt(process.env.ACCESS_TOKEN_EXPIRY || "")), sameSite: "strict" });
        res.cookie('REFRESH_TOKEN', refresh_token, { httpOnly: true, expires: new Date(new Date().getTime() + 1000 * parseInt(process.env.REFRESH_TOKEN_EXPIRY || "")), path: "/token/refresh", sameSite: "strict" });
        res.cookie('REFRESH_TOKEN_VALID', true, { expires: new Date(new Date().getTime() + 1000 * parseInt(process.env.REFRESH_TOKEN_EXPIRY || "")), sameSite: "strict" });
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
