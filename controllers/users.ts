import * as db from "../db/utils";
import * as userModel from "../models/users";
import * as userService from "../services/users";

export async function orgRegister(): Promise<void> {
    // Organization registration logic
    // Add organization to database
    console.log("Organization registration");
}

export async function userRegister(user: userModel.User): Promise<unknown> {
    // User registration logic

    // User already exists
    if (await db.checkUserExists(user.email)) {
        return "user already exists";
    }

    // Create new user
    userService.createNewUser(user);
    
    console.log("User registration");
    return "User created";
}

export async function login(email: string, password: string): Promise<unknown> {
    // User login logic
    // Authentication
    // Store session tokens
    if (!await db.checkUserExists(email)) {
        return "user not found";
    }
    // Authenticate user
    if (!await userService.authenticateUser(email, password)) {
        return "password mismatch";
    }
    const user = await db.findUser(email);
    console.log("User login");
    return user;
}

export async function logout(): Promise<void> {
    // User logout logic
    // Delete session and tokens
    console.log("User logout");
}