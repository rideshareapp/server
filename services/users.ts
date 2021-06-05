import * as db from "../db/utils";
import bcrypt from "bcrypt";
import * as userModel from "../models/users";

/**
 * Create new user
 * @param user User model
 */
export async function createNewUser(user: userModel.User): Promise<void> {
    const newUser = new userModel.User(user.first, user.last, user.phone, user.email, user.password);
    newUser.password = await bcrypt.hash(newUser.password, 10);
    await db.createUser(newUser);
}

/**
 * Check if submitted password matches database password
 * @param email User email
 * @param password User password
 * @returns true or false
 */
export async function authenticateUser(email: string, password: string): Promise<boolean> {
    const hash = await db.getPassword(email);
    const match = await bcrypt.compare(password, hash);
    if (match) {
        return true;
    } else {
        return false;
    }
}

export async function tokenizeUser(): Promise<void> {
    //
}