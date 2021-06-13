// Services: Organizations

import * as db from "../db/utils";
import bcrypt from "bcrypt";
import * as orgModel from "../models/organization";

/**
 * Create new user
 * @param user User model
 * @returns true or false
 */
export async function createNewOrg(org: orgModel.Organization): Promise<boolean> {
    const newOrg = new orgModel.Organization(org.name, org.code, org.email, org.password);
    newOrg.password = await bcrypt.hash(newOrg.password, 10);
    if (!await db.createOrg(newOrg)) {
        return false; 
    } else {
        return true;
    }
}
