// Services: Organizations

import * as db from "../db/utils";
import * as orgModel from "../models/organization";

/**
 * Create new organization
 * @param org Org model
 * @returns true or false
 */
export async function createNewOrg(org: orgModel.Organization): Promise<unknown> {
    try {
        // Generate a code and check for conflicts in database
        let codeExists = true;
        while (codeExists) {
            org.code = await generateCode();
            if (db.checkOrgCodeExists(org.code)) { // If the code does not already exist then continue
                codeExists = false;
            }
        }
        const newOrg = new orgModel.Organization(org.name, org.code, org.email, org.password);
        return (await db.createOrg(newOrg) ? true : false);
    } catch (err) {
        console.error(err);
        return false;
    }
}

export async function generateCode(): Promise<string> {
    const len = 4;
    const charSet = 'ab0cd1ef2gh3ij4kl5mn6op7qr8st9uvwxyz';
    let org_code = '';
    for (let i = 0; i < len; i++) {
        const randomPoz = Math.floor(Math.random() * charSet.length);
        org_code += charSet.substring(randomPoz, randomPoz + 1);
    }
    return org_code;
}