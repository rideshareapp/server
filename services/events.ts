// Services: Events

import * as db from "../db/utils";
// import * as eventModel from "../models/events";

/**
 * Get organization email from token cookie and call createEvent database query
 * @param code Org code
 * @param name Event name
 * @param date Event date
 * @returns boolean
 */
export async function createEvent(code: string, name: string, date: Date, include_time: boolean): Promise<boolean> {
    try {
        return (await db.createEvent(code, name, date, include_time) ? true : false);
    } catch (err) {
        console.error(err);
        return false;
    }
}

// /**
//  * Create a new event and add to database
//  * @param code Organization code
//  * @param name Event name
//  * @param date Event date
//  * @param include_time Tells the frontend whether or not to display time
//  * @returns boolean
//  */
// export async function deleteEvent(user:string, id: number): Promise<boolean> {
//     try {
//         return (await db.deleteEvent(user, id) ? true : false);
//     } catch (err) {
//         console.error(err);
//         return false;
//     }
// }

// /**
//  * Update an existing event and update the database
//  * @param id Event id
//  * @param name Updated name
//  * @param date Updated date
//  * @param include_time Tells the frontend whether or not to display time
//  * @returns boolean
//  */
// export async function updateEvent(id: number, name: string, date: Date, include_time: boolean): Promise<boolean> {
//     try {
//         return (await db.updateEvent(id, name, date, include_time) ? true : false);
//     } catch (err) {
//         console.error(err);
//         return false;
//     }
// }

/**
 * Get list of events associated with an organization
 * @param code Organization code
 * @returns List of events
 */
export async function getEvents(user: string): Promise<Array<unknown> | boolean> {
    try {
        const org_list = await db.getOrgList(user);
        const events = await db.getEvents(org_list, "list");
        return (events ? events : false);
    } catch (err) {
        console.error(err);
        return false;
    }
}