// Controllers: Organizations

import * as db from "../db/utils";
import * as orgModel from "../models/organization";
import * as services from "../services";
import * as auth from "../auth";
import * as eventModel from "../models/events";

export async function orgRegister(org: orgModel.Organization): Promise<unknown> {
    // Organization registration logic

    // Check if org already exists
    if (await db.checkEntityExists(org.email, "organizations")) {
        return "org already exists";
    }
    // Create new organization
    if (!await services.orgService.createNewOrg(org)) {
        return "failed to create new org";
    }
    // User login
    const token = login(org.email, org.password);
    return token;
}

export async function login(email: string, password: string): Promise<unknown> {
    // Organization login logic
    // Authentication
    // Store session tokens
    if (!await db.checkEntityExists(email, "organizations")) {
        return "user not found";
    }
    // Authenticate user
    if (!await auth.authenticateAcc(email, password, "organizations")) {
        return "password mismatch";
    }
    // Return token
    const token = await auth.tokenizeAcc(email);
    return token;
}

export async function logout(): Promise<void> {
    // User logout logic
    // Delete session and tokens
}

export async function createEvent(req: eventRequest): Promise<unknown> {
    try {
        return (await services.orgService.createEvent(req.code, req.name, req.date, req.include_time) ? true : false);
    } catch (err) {
        console.log(err);
        return false;
    }
}

interface eventRequest {
    code: string;
    name: string;
    date: Date;
    include_time: boolean;
}