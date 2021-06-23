// Services: Users

import * as db from "../db/utils";
import * as userModel from "../models/users";
import * as auth from "../auth";

/**
 * Create new user
 * @param user User model
 * @returns true or false
 */
export async function createNewUser(user: userModel.User): Promise<boolean> {
    try {
        const newUser = new userModel.User(user.first, user.last, user.phone, user.email, user.password);
        newUser.password = await auth.hashPassword(newUser.password);
        return (await db.createUser(newUser) ? true : false);
    } catch (err) {
        console.error(err);
        return false;
    }
}

// export async function updateUser(user: userModel.User): Promise<boolean> {
//     try {
//         return db.updateUser(user);
//     } catch (err) {
//         console.error(err);
//         return false;
//     }
// }

export async function updateUserPassword(email: string, oldPassword: string, newPassword: string): Promise<boolean> {
    try {
        if (!await auth.authenticateAcc(email, oldPassword, "users")) {
            return false;
        }
        const newPW_hashed = await auth.hashPassword(newPassword);
        await db.updateUserPassword(email, newPW_hashed);
        return true;
    } catch ( err) {
        console.error(err);
        return err;
    }
}

export async function updateUserEmail(oldEmail: string, newEmail: string): Promise<boolean> {
    try {
        return (await db.updateUserEmail(newEmail, oldEmail));
    } catch (err) {
        return false;
    }
}