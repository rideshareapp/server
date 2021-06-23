// Controllers: Organizations

import * as db from "../db/utils";
import * as orgModel from "../models/organization";
import * as services from "../services";
import * as auth from "../auth";
import { Request, Response } from "express";
import { Success, Error } from "../models/return_status";

export async function orgRegister(req: Request, res: Response): Promise<Response> {
    try {
        // Organization registration logic
        const org: orgModel.Organization = req.body;
        if (await db.checkEntityExists(org.email, "organizations")) {
            return res.status(409).json(new Error("org already exists"));
        }
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
        // TODO: Store session tokens

        // Authenticate organization login
        if (!await db.checkEntityExists(req.body.email, "organizations")) {
            return res.status(409).json(new Error("org not found"));
        }
        if (!await auth.authenticateAcc(req.body.email, req.body.password, "organizations")) {
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
