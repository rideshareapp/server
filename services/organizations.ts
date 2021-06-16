// Services: Organizations

import * as db from "../db/utils";
import bcrypt from "bcrypt";
import * as orgModel from "../models/organization";
import * as auth from "../auth";

/**
 * Create new organization
 * @param org Org model
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

/**
 * Get organization email from token cookie and call createEvent database query
 * @param token JWT token
 * @param name Event name
 * @param date Event date
 * @returns boolean
 */
export async function createEvent(token: string, name: string, date: Date): Promise<boolean> {
    try {
        const email = await auth.tokenGetPayload(token);
        if (await db.createEvent(email, name, date)) {
            return true;
        } else {
            return false;
        }
    } catch (err) {
        console.log(err);
        return false;
    }
}