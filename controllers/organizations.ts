import * as db from "../db/utils";
import * as orgModel from "../models/organization";
import * as services from "../services";

export async function orgRegister(org: orgModel.Organization): Promise<unknown> {
    // Organization registration logic
    
    // Check if org already exists
    if (await db.checkOrgExists(org.email)) {
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
    if (!await db.checkEntityExists(email, "users")) {
        return "user not found";
    }
    // Authenticate user
    if (!await services.authenticateAcc(email, password, "users")) {
        return "password mismatch";
    }

    // Return token
    const token = await services.tokenizeAcc(email);
    return token;
}

export async function logout(): Promise<void> {
    // User logout logic
    // Delete session and tokens
}