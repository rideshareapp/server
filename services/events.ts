// Services: Events

import * as db from "../db/utils";

/**
 * Get organization email from token cookie and call createEvent database query
 * @param code Org code
 * @param name Event name
 * @param date Event date
 * @returns boolean
 */
 export async function createEvent(code: string, name: string, date: Date, include_time: boolean): Promise<boolean> {
    try {
        if (await db.createEvent(code, name, date, include_time)) {
            return true;
        } else {
            return false;
        }
    } catch (err) {
        console.log(err);
        return false;
    }
}