// Controllers: Users

import * as db from "../db/utils";
import * as userModel from "../models/users";
import * as services from "../services/";
import * as auth from "../auth";

export async function userRegister(user: userModel.User): Promise<unknown> {
    // User registration logic

    // User already exists
    if (await db.checkEntityExists(user.email, "users")) {
        return "user already exists";
    }

    // Create new user
    if (!await services.userService.createNewUser(user)) {
        return "failed to create new user";
    }

    // User login
    const token = login(user.email, user.password);
    return token;
}

export async function login(email: string, password: string): Promise<unknown> {
    // User login logic
    // Authentication
    // Store session tokens
    if (!await db.checkEntityExists(email, "users")) {
        return "user not found";
    }
    // Authenticate user
    if (!await auth.authenticateAcc(email, password, "users")) {
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

/**
 * Add organization code to user list
 * @param code Organization code
 * @param email User email
 * @returns 
 */
 export async function joinOrg(code: string, email: string): Promise<boolean> {
    //  TODO: Check if org code exists
    if (!await db.checkOrgExists(code, "org_code")) {
        return false;
    }
    return (await db.joinOrg(code, email) ? true : false);
}