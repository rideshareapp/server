import * as db from "../db/utils";
import bcrypt from "bcrypt";
import * as userModel from "../models/users";

export async function createNewUser(user: userModel.User): Promise<void> {
    const newUser = new userModel.User(user.first, user.last, user.phone, user.email, user.password)
    newUser.password = await bcrypt.hash(newUser.password, 10);
    await db.createUser(newUser);
}

export async function authenticateUser(email: string, password: string): Promise<unknown> {
    password = await bcrypt.hash(password, 10);
    const pw_hashed = await db.getPassword(email);
    if (password !== pw_hashed) {
        return "password mismatch";
    }
    return "password match";
}