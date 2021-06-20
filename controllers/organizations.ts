// Controllers: Organizations

import * as db from "../db/utils";
import * as orgModel from "../models/organization";
import * as services from "../services";
import * as auth from "../auth";
import { Request, Response, NextFunction } from "express";
import { Success, Error } from "../models/return_status";

// export async function orgRegister(org: orgModel.Organization): Promise<unknown> {
//     // Organization registration logic

//     // Check if org already exists
//     if (await db.checkEntityExists(org.email, "organizations")) {
//         return "org already exists";
//     }
//     // Create new organization
//     // if (!await services.orgService.createNewOrg(org)) {
//     //     return "failed to create new org";
//     // }
//     try {
//         await services.orgService.createNewOrg(org);
//     } catch (err) {
//         return ["error", "failed to create new org"];
//     }

//     // User login
//     const token = login(org.email, org.password);
//     return token;
// }
export async function orgRegister(req: Request, res: Response, next: NextFunction): Promise<unknown> {
    try {
        // Organization registration logic
        const org: orgModel.Organization = req.body;
        if (await db.checkEntityExists(org.email, "organizations")) {
            return res.status(409).json(new Error("org already exists"));
        }
        if (!await services.orgService.createNewOrg(org)) {
            return res.status(500).json(new Error("failed to create org"));
        }
        return await login(req, res, next);
    } catch (err) {
        console.error(err);
        return res.status(500).json(new Error("internal server error"));
    }

}

export async function login(req: Request, res: Response, next: NextFunction): Promise<unknown> {
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


// try {
//     // TODO: Store session tokens

//     // Authenticate user
//     if (!await db.checkEntityExists(req.body.email, "users")) {
//         return res.status(409).json(new Error("user not found"));
//     }
//     if (!await auth.authenticateAcc(req.body.email, req.body.password, "users")) {
//         return res.status(401).json(new Error("password mismatch"));
//     }
//     // Return token
//     const token = await auth.tokenizeAcc(req.body.email);
//     return res.status(200).json(new Success({ "token": token }));
// } catch (err) {
//     console.error(err);
//     return res.status(500).json(new Error("internal server error"));
// }

export async function logout(): Promise<void> {
    // User logout logic
    // Delete session and tokens
}
