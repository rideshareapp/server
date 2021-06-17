// Services: Organizations

import * as db from "../db/utils";
import * as orgModel from "../models/organization";
import * as auth from "../auth";

/**
 * Create new organization
 * @param org Org model
 * @returns true or false
 */
export async function createNewOrg(org: orgModel.Organization): Promise<boolean> {
    const newOrg = new orgModel.Organization(org.name, org.code, org.email, org.password);
    newOrg.password = await auth.hashPassword(newOrg.password);
    return (await db.createOrg(newOrg) ? true : false);
}
