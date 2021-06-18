import * as db from "./database";
import * as userModel from "../models/users";
import * as orgModel from "../models/organization";
import * as eventModel from "../models/events";


/**
 * Create a new organization and add to database
 * @param org Organization model
 * @returns true or false
 */
export async function createOrg(org: orgModel.Organization): Promise<boolean> {
    try {
        const params = [org.name, org.code, org.email, org.password];
        await db.query("INSERT INTO organizations VALUES($1, $2, $3, $4)", params);
        return true;
    } catch {
        return false;
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
 * @param email - User email
 * @returns true or false
 */
export async function checkOrgExists(email: string): Promise<boolean> {
    const res = await db.query("SELECT * FROM organizations WHERE email = $1", [email]);
    return (res.rows.length === 0 ? false : true);
}

/**
 * Create a new user and add to database
 * @param user - User model
 * @returns true or false
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
 * @param email - User email
 * @returns true or false
 */
export async function checkEntityExists(email: string, type: "users" | "organizations"): Promise<boolean> {
    const query = `SELECT * FROM ${type} WHERE email = $1`;
    const res = await db.query(query, [email]);
    return (res.rows.length === 0 ? false : true);
}

/**
 * Get the password of a user from the users database
 * @param user - User email
 * @returns hashed password of user
 */
export async function getPassword(email: string, type: "users" | "organizations"): Promise<string> {
    const query = `SELECT pw_hashed FROM ${type} WHERE email = $1`;
    const res = await db.query(query, [email]);
    return res.rows[0].pw_hashed;
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
        await db.query("INSERT INTO events VALUES($1, $2, $3, $4)", [code, name, date, include_time]);
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
        const res = await db.query("SELECT event_name, event_date, include_time FROM events WHERE org_code = $1", [code]);
        return(res.rows);
    } catch (err) {
        console.error(err);
        return err;
    }
}