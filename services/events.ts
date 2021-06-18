// Services: Events

import * as db from "../db/utils";
import * as eventModel from "../models/events";

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


/**
 * Get list of events associated with an organization
 * @param code Organization code
 * @returns List of events
 */
export async function getEvents(code: string): Promise<Array<eventModel.EventNoCode> | undefined> {
    try {
        const eventList = await db.getEvents(code);
        return eventList;
    } catch (err) {
        console.error(err);
    }
}