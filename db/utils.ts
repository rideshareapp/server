import * as db from "./database";
import * as userModel from "../models/users";
import * as orgModel from "../models/organization";
import * as eventModel from "../models/events";

// Functions

/**
 * Create a new organization and add to database
 * @param org Organization model
 * @returns boolean
 */
export async function createOrg(org: orgModel.Organization): Promise<boolean | Error> {
    try {
        const params = [org.name, org.code, org.email, org.password];
        await db.query("INSERT INTO organizations VALUES($1, $2, $3, $4)", params);
        return true;
    } catch (err) {
        console.error(err);
        return new Error("failed to create org");
    }
}

/**
 * Gets organization data if organization exists in database
 * @param email Organization email
 * @returns Organization model
 */
export async function findOrg(email: string): Promise<orgModel.Organization> {
    const res = await db.query("SELECT * FROM organizations WHERE email = $1", [email]);
    const orgArray = await res.rows[0];
    const org = new orgModel.Organization(orgArray.name, orgArray.code, orgArray.email, orgArray.password);
    return org;
}

/**
 * Checks if an organization email is already in the database
 * @param id Organization email or code
 * @param method 'org_code' or 'email'
 * @returns boolean
 */
export async function checkOrgExists(id: string, method: "org_code" | "email"): Promise<boolean> {
    const query = `SELECT * FROM organizations WHERE ${method} = $1`;
    const res = await db.query(query, [id]);
    return (res.rows.length === 0 ? false : true);
}

/**
 * Check if organization code already exists
 * @param code Possible org code
 * @returns Boolean
 */
export async function checkOrgCodeExists(code: string): Promise<boolean> {
    const res = await db.query("SELECT email FROM organizations WHERE org_code = $1", [code]);
    return (res.rows.length === 0 ? false : true);
}

/**
 * Create a new user and add to database
 * @param user - User model
 * @returns boolean
 */
export async function createUser(user: userModel.User): Promise<boolean> {
    try {
        const params = [user.email, user.first, user.last, user.phone, user.password];
        await db.query("INSERT INTO users VALUES($1, $2, $3, $4, $5)", params);
        return true;
    } catch {
        return false;
    }
}

/**
 * Update user info
 * @param user User model
 * @returns boolean
 */
export async function updateUserProfile(user: userModel.User): Promise<boolean> {
    try {
        await db.query("UPDATE users SET first_name = $2, last_name = $3, phone = $4 WHERE email = $1", [user.email, user.first, user.last, user.phone]);
        return true;
    } catch (err) {
        console.error(err);
        return false;
    }
}

/**
 * Update user email
 * @param newEmail New email
 * @param oldEmail Old email
 * @returns boolean 
 */
export async function updateUserEmail(newEmail: string, oldEmail: string): Promise<boolean> {
    try {
        await db.query("UPDATE users SET email = $1 WHERE email = $2", [newEmail, oldEmail]);
        return true;
    } catch (err) {
        console.error(err);
        return false;
    }
}

/**
 * Update user password
 * @param password New password
 * @returns boolean
 */
export async function updateUserPassword(email: string, password: string): Promise<boolean> {
    try {
        await db.query("UPDATE users SET pw_hashed = $1 WHERE email = $2", [password, email]);
        return true;
    } catch (err) {
        console.error(err);
        return false;
    }
}

/**
 * Get all user data if user exists in database
 * @param user - User email
 * @returns User model
 */
export async function findUser(email: string): Promise<userModel.User> {
    const res = await db.query("SELECT * FROM users WHERE email = $1", [email]);
    const userArray = await res.rows[0];
    const user = new userModel.User(userArray.first_name, userArray.last_name, userArray.phone, userArray.email, "");
    return user;
    // return (await db.query("SELECT * FROM users WHERE email = $1", [user])).rows[0];
}

/**
 * Checks if a user email is already in the database
 * @param email email to check
 * @param type 'users' or 'organizations' database
 * @returns boolean
 */
export async function checkEntityExists(email: string, type: "users" | "organizations"): Promise<boolean> {
    try {
        const query = `SELECT * FROM ${type} WHERE email = $1`;
        const res = await db.query(query, [email]);
        return (res.rows.length === 0 ? false : true);
    } catch (err) {
        console.error(err);
        return false;
    }
}

/**
 * Get the password of a user from the users database
 * @param user email to check
 * @param type 'users' or 'organizations' database
 * @returns hashed password of user
 */
export async function getPassword(email: string, type: "users" | "organizations"): Promise<string> {
    try {
        const query = `SELECT pw_hashed FROM ${type} WHERE email = $1`;
        const res = await db.query(query, [email]);
        return res.rows[0].pw_hashed;
    } catch (err) {
        console.error(err);
        return err;
    }
}

/**
 * Create a new event and add to database
 * @param code Organization code
 * @param name Event name
 * @param description Event description (not required)
 * @param location Event location (not required)
 * @param date Event date
 * @param include_time Tells the frontend whether or not to display time
 * @returns boolean
 */
export async function createEvent(code: string | unknown, name: string, description: string, location: string, date: Date, include_time: boolean): Promise<boolean> {
    try {
        await db.query("INSERT INTO events(org_code, event_name, event_description, event_location, event_date, include_time) VALUES($1, $2, $3, $4, $5, $6)", [code, name, description, location, date, include_time]);
        return true;
    } catch (err) {
        console.error(err);
        return false;
    }
}

/**
 * Update an existing event
 * @param id Event id
 * @param name Updated name
 * @param description Updated description
 * @param location Update location
 * @param date Updated date
 * @param include_time Tells the frontend whether or not to display time
 * @returns boolean
 */
export async function updateEvent(id: number, name: string, description: string, location: string, date: Date, include_time: boolean): Promise<boolean> {
    try {
        await db.query("UPDATE events SET event_name = $1, event_description = $2, event_location = $3, event_date = $4, include_time = $5 WHERE id = $6", [name, description, location, date, include_time, id]);
        return true;
    } catch (err) {
        console.error(err);
        return false;
    }
}

/**
 * Check if event belongs to org
 * @param org_email Org email requesting update/delete
 * @param id Event ID 
 * @returns boolean
 */
export async function checkEventBelongsToOrg(org_email: string, id: number): Promise<boolean> {
    try {
        if ((await db.query("SELECT * FROM events, organizations WHERE events.org_code = organizations.org_code AND organizations.email = $1 AND events.id = $2", [org_email, id])).rowCount === 0) {
            return false;
        }
        return true;
    } catch (err) {
        console.error(err);
        return false;
    }
}

/**
 * Delete an event by id
 * @param user event owner
 * @param id id from event table
 * @returns boolean
 */
export async function deleteEvent(user: string, id: number): Promise<boolean> {
    try {
        await db.query("DELETE FROM events, organizations WHERE events.org_code = organizations.org_code AND events.id = $1 AND organizations.email = $2", [id, user]);
        return true;
    } catch (err) {
        console.error(err);
        return false;
    }
}

/**
 * Get all events for an organization
 * @param org Organization code or array of codes
 * @param type spectify single code or array of codes
 * @returns Array of organization events
 */
export async function getEvents(org: string | Array<string>, type: "list" | "code"): Promise<Array<eventModel.EventNoCode>> {
    try {
        if (type === "code") {
            // one code
            return (await db.query(`
            SELECT e.id, e.org_code, e.event_name, e.event_date, e.event_description, e.event_location, e.include_time, o.org_name, o.email
            FROM events AS e
            INNER JOIN organizations AS o
            ON e.org_code = o.org_code
            WHERE e.org_code = $1
            `, [org])).rows;
        } else {
            // array of codes
            return (await db.query(`
            SELECT e.id, e.org_code, e.event_name, e.event_date, e.event_description, e.event_location, e.include_time, o.org_name, o.email
            FROM events AS e
            INNER JOIN organizations AS o
            ON e.org_code = o.org_code
            WHERE e.org_code = ANY ($1)
            `, [org])).rows;
        }
    } catch (err) {
        console.error(err);
        return err;
    }
}

/**
 * Add organization code to user list
 * @param code Organization code
 * @param email User email
 * @returns boolean
 */
export async function joinOrg(code: string, email: string): Promise<boolean> {
    try {
        // await db.query(`UPDATE users SET in_orgs = in_orgs || ARRAY[$1] WHERE email = $2`, [code, email]);
        await db.query(`INSERT INTO user_orgs VALUES($1, $2)`, [email, code]);
        return true;
    } catch (err) {
        console.error(err);
        return false;
    }
}

/**
 * Remove an organization from user's list of organizations
 * @param code Org code to be removed
 * @param email user email
 * @returns boolean
 */
export async function leaveOrg(code: string, email: string): Promise<boolean> {
    try {
        await db.query("DELETE FROM user_orgs WHERE email = $1 AND org_code = $2", [email, code]);
        return true;
    } catch (err) {
        console.error(err);
        return false;
    }
}

/**
 * Get list of organizationss by user
 * @param user List all organizations a user belongs in
 * @returns Array
 */
export async function getOrgList(user: string): Promise<Array<string>> {
    try {
        // const orgs: Array<string> = (await db.query("SELECT in_orgs FROM users WHERE email = $1", [user])).rows[0].in_orgs;
        const res = (await db.query("SELECT org_code FROM user_orgs WHERE email = $1", [user]));
        const orgs = [];
        for (let i = 0; i < res.rowCount; i++) {
            orgs.push(res.rows[i].org_code);
        }
        return orgs;
    } catch (err) {
        console.error(err);
        return err;
    }
}

/**
 * Check if user is already in an organization
 * @param code Organization code to check
 * @param email User email
 * @returns boolean
 */
export async function checkUserInOrg(code: string, email: string): Promise<boolean> {
    try {
        // const res = (await db.query("SELECT in_orgs FROM users WHERE email = $1", [email])).rows[0].in_orgs;
        // if (res === null) return false; // If new user not in any orgs
        // return (res.includes(code) ? true : false);
        const rows = (await db.query("SELECT * from user_orgs WHERE email = $1 AND org_code = $2", [email, code])).rowCount;
        return (rows > 0 ? true : false);
    } catch (err) {
        console.error(err);
        return true;
    }
}

/**
 * Convert org email to org code
 * @param email email
 * @returns organization code
 */
export async function getOrgCode(email: string): Promise<unknown> {
    try {
        return (await db.query("SELECT org_code FROM organizations WHERE email = $1", [email])).rows[0].org_code;
    } catch (err) {
        console.error(err);
    }
}

/**
 * 
 * @param email Email of new driver (references users database)
 * @param code Org code of org the user is driving for
 * @returns boolean
 */
export async function newDriver(email: string, code: string): Promise<boolean> {
    try {
        await db.query("INSERT INTO drivers VALUES($1, $2)", [email, code]);
        return true;
    } catch (err) {
        console.error(err);
        // return false;
        throw Error("new error!");
    }
}

/**
 * Check if driver is authorized to accept events based on org status
 * @param email driver email
 * @param event_id event
 * @returns boolean
 */
export async function driverInOrg(email: string, event_id: number): Promise<boolean> {
    try {
        if ((await db.query("SELECT d.email FROM drivers AS d, events AS e WHERE d.org_code = e.org_code AND e.id = $1 AND d.email = $2", [event_id, email])).rowCount === 0) {
            return false;
        }
        return true;
    } catch (err) {
        console.error(err);
        return false;
    }
}

/**
 * Get trip requests as a driver (view by event)
 * @param event_id Event ID
 * @returns List of trip requests
 */
export async function getTripRequestsDriver(event_id: number): Promise<unknown> {
    try {
        const res = await db.query("SELECT id, passenger, geolocation, passengers_num FROM trip_requests WHERE event_id = $1", [event_id]);
        return (res.rows);
    } catch (err) {
        console.error(err);
        return err;
    }
}

/**
 * Get trip requests as a user
 * @param passenger User email
 * @returns List of trip requests
 */
export async function getTripRequestsUser(passenger: string): Promise<unknown> {
    try {
        return (await db.query(`
        SELECT org_name, organizations.org_code, event_name, event_date, 
        include_time, passenger, geolocation, passengers_num 
        FROM events, trip_requests, organizations 
        WHERE events.id = trip_requests.event_id 
        AND organizations.org_code = events.org_code 
        AND passenger = $1
        `, [passenger])).rows;
    } catch (err) {
        console.error(err);
        return err;
    }
}

/**
 * Creates a new trip request with user information
 * @param event_id event user is requesting a ride for
 * @param passenger user email
 * @param geolocation location coordiantes
 * @param passengers_num number of passengers
 * @returns boolean
 */
export async function newTripRequest(event_id: number, passenger: string, geolocation: coordinates, passengers_num: number): Promise<boolean> {
    try {
        await db.query("INSERT INTO trip_requests(event_id, passenger, geolocation, passengers_num) VALUES($1, $2, $3, $4)", [event_id, passenger, `(${geolocation.x},${geolocation.y})`, passengers_num]);
        return true;
    } catch (err) {
        console.error(err);
        return false;
    }
}

/**
 * Move trip requests to confirmed trips with confirmed driver and delete request
 * @param trip_request_id Trip request ID
 * @param driver Driver email that is accepting trip request
 * @returns boolean
 */
export async function acceptTripRequest(trip_request_id: number, driver: string): Promise<unknown> {
    try {
        // Check if driver is allowed to accept
        const canAccept = (await db.query(`SELECT * FROM trip_requests, drivers, events WHERE drivers.org_code = events.org_code AND trip_requests.event_id = events.id AND drivers.email = $1`, [driver])).rowCount !== 0;
        if (!canAccept) {
            return false;
        }
        const tripRequest = (await db.query("SELECT * FROM trip_requests WHERE id = $1", [trip_request_id])).rows[0];
        await db.query("INSERT INTO trips(driver, event_id, passenger, geolocation, passengers_num) VALUES($1, $2, $3, $4, $5)", [driver, tripRequest.event_id, tripRequest.passenger, `(${tripRequest.geolocation.x},${tripRequest.geolocation.y})`, tripRequest.passengers_num]);
        await db.query("DELETE FROM trip_requests WHERE id = $1", [trip_request_id]);
        return true;
    } catch (err) {
        console.error(err);
        return false;
    }
}

/**
 * Delete a confirmed trip by driver and event ID
 * @param driver Driver email
 * @param event_id Event
 * @returns boolean
 */
export async function deleteTrip(driver: string, event_id: number): Promise<boolean> {
    try {
        await db.query("DELETE FROM trips WHERE driver = $1 and event_id = $2", [driver, event_id]);
        return true;
    } catch (err) {
        console.error(err);
        return false;
    }
}

/**
 * Get confirmed trips as a driver (View individual passengers and their information)
 * @param driver Driver email
 * @returns List of confirmed trips by event ID
 */
export async function getConfirmedTripsDriver(driver: string): Promise<unknown> {
    try {
        return (await db.query(`
        SELECT o.org_name, e.event_name, e.event_date, e.include_time, 
        u.first_name, u.last_name, t.passenger, t.geolocation, t.passengers_num
        FROM events AS e, trips AS t, organizations AS o, users AS u
        WHERE o.org_code = e.org_code
        AND u.email = passenger
        AND e.id = t.event_id
        AND t.driver = $1
        `, [driver])).rows;
    } catch (err) {
        console.error(err);
        return err;
    }
}

/**
 * Get confirmed trips as a user (Can see driver information)
 * @param user User email
 * @returns List of confiremd trips by event ID
 */
export async function getConfirmedTripsUser(user: string): Promise<unknown> {
    try {
        return (await db.query(`
        SELECT o.org_name, e.event_name, e.event_date, e.include_time, u.first_name AS driver_first, 
        u.last_name AS driver_last, u.email AS driver_email, t.geolocation, t.passengers_num
        FROM events AS e, trips AS t, organizations AS o, users AS u
        WHERE u.email = t.driver
        AND o.org_code = e.org_code
        AND e.id = t.event_id
        AND t.passenger = $1
        `, [user])).rows;
    } catch (err) {
        console.error(err);
        return err;
    }
}
