import * as db from "../db/utils";
import * as userModel from "../models/users";
import * as services from "../services/";

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