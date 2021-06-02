import * as db from "../db/database";

export async function orgRegister(): Promise<void> {
    // Organization registration logic
    // Add organization to database
    await db.query("SELECT * FROM data", []);
    console.log("Organization registration")
}

export async function userRegister(): Promise<void> {
    // User registration logic
    // Add user to database
    await db.query("SELECT * FROM data", []);
    console.log("User registration")
}

export async function login(): Promise<void> {
    // User login logic
    // Authentication
    // Store session tokens
    await db.query("SELECT * FROM data", []);
    console.log("User login")
}

export async function logout(): Promise<void> {
    // User logout logic
    // Delete session and tokens
    await db.query("SELECT * FROM data", []);
    console.log("User logout")
}