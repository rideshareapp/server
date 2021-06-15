// Services: Users

import * as db from "../db/utils";
import bcrypt from "bcrypt";
import * as userModel from "../models/users";
// import jwt from "jsonwebtoken";

/**
 * Create new user
 * @param user User model
 * @returns true or false
 */
export async function createNewUser(user: userModel.User): Promise<boolean> {
    const newUser = new userModel.User(user.first, user.last, user.phone, user.email, user.password);
    newUser.password = await bcrypt.hash(newUser.password, 10);
    if (!await db.createUser(newUser)) {
        return false;
    } else {
        return true;
    }
}
