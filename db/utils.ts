import * as db from "./database";
import * as userModel from "../models/users";
import * as orgModel from "../models/organization";
import * as eventModel from "../models/events";


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
    const user = new userModel.User(userArray.first_name, userArray.last_name, userArray.phone, userArray.email, userArray.pw_hashed);
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
 * @param date Event date
 * @param include_time Tells the frontend whether or not to display time
 * @returns boolean
 */
export async function createEvent(code: string | unknown, name: string, date: Date, include_time: boolean): Promise<boolean> {
    try {
        await db.query("INSERT INTO events(org_code, event_name, event_date, include_time) VALUES($1, $2, $3, $4)", [code, name, date, include_time]);
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
 * @param date Updated date
 * @param include_time Tells the frontend whether or not to display time
 * @returns boolean
 */
export async function updateEvent(id: number, name: string, date: Date, include_time: boolean): Promise<boolean> {
    try {
        // TODO: Make sure event belongs to user before updating
        await db.query("UPDATE events SET event_name = $1, event_date = $2, include_time = $3 WHERE id = $4", [name, date, include_time, id]);
        return true;
    } catch (err) {
        console.error(err);
        return false;
    }
}

/**
 * Delete an event by id
 * @param id id from event table
 * @returns boolean
 */
export async function deleteEvent(id: number): Promise<boolean> {
    try {
        // TODO: Make sure event belongs to user before deleting
        await db.query("DELETE FROM events WHERE id = $1", [id]);
        return true;
    } catch (err) {
        console.error(err);
        return false;
    }
}

/**
 * Get all events for an organization
 * @param code Organization code
 * @returns Array of organization events
 */
export async function getEvents(code: string): Promise<Array<eventModel.EventNoCode>> {
    try {
        const res = await db.query("SELECT id, event_name, event_date, include_time FROM events WHERE org_code = $1", [code]);
        return (res.rows);
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
        await db.query(`UPDATE users SET in_orgs = in_orgs || ARRAY[$1] WHERE email = $2`, [code, email]);
        return true;
    } catch (err) {
        console.error(err);
        return false;
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
        const res = (await db.query("SELECT in_orgs FROM users WHERE email = $1", [email])).rows[0].in_orgs;
        if (res === null) return false; // If new user not in any orgs
        return (await res.includes(code) ? true : false);
    } catch (err) {
        console.error(err);
        return true;
    }
}

export async function newDriver(email: string, code: string): Promise<boolean> {
    try {
        await db.query("INSERT INTO drivers VALUES($1, $2)", [email, code]);
        return true;
    } catch (err) {
        console.error(err.message);
        // return false;
        throw Error("new error!");
    }
}