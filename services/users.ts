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
