// Controllers: Trips

import * as db from "../db/utils";
import { Success, Error } from "../models/return_status";
import { Request, Response } from "express";

// Drivers
export async function acceptTrip(req: Request, res: Response): Promise<Response> {
    try {
        if (!db.acceptTripRequest(req.body.trip_request_id, req.user.email)) {
            return res.status(500).json(new Error("internal server error"));
        }
        return res.status(201).json(new Success("trip accepted"));
    } catch (err) {
        console.error(err);
        return res.status(500).json(new Error("internal server error"));
    }
}

export async function getTripRequestsDriver(req: Request, res: Response): Promise<Response> {
    try {
        // Check if driver is allowed to view requests for an event
        if (!await db.driverInOrg(req.user.email, req.body.event_id)) {
            return res.status(403);
        }
        const tripRequests = await db.getTripRequestsDriver(req.body.event_id);
        return res.status(200).json(new Success(tripRequests));
    } catch (err) {
        console.error(err);
        return res.status(500).json(new Error("internal server error"));
    }
}

export async function getConfirmedTripsDriver(req: Request, res: Response): Promise<Response> {
    try {
        const trips = await db.getConfirmedTripsDriver(req.user.email);
        return res.status(200).json(new Success(trips));
    } catch (err) {
        console.error(err);
        return res.status(500).json(new Error("internal server error"));
    }
}

export async function finishTrip(req: Request, res: Response): Promise<Response> {
    try {
        if (!await db.deleteTrip(req.user.email, req.body.event_id)) {
            return res.status(500).json(new Error("internal server error"));
        }
        return res.status(201).json(new Success("trip finished"));
    } catch (err) {
        console.error(err);
        return res.status(500).json(new Error("internal server error"));
    }
}


// Users
export async function newTripRequest(req: Request, res: Response): Promise<Response> {
    try {
        if (!await db.newTripRequest(req.body.event_id, req.user.email, req.body.geolocation, req.body.passengers_num)) {
            return res.status(500).json(new Error("internal server error"));
        }
        return res.status(201).json(new Success("created new request"));
    } catch (err) {
        console.error(err);
        return res.status(500).json(new Error("internal server error"));
    }
}

export async function getTripRequestsUser(req: Request, res: Response): Promise<Response> {
    try {
        const tripRequests = await db.getTripRequestsUser(req.user.email);
        return res.status(200).json(new Success(tripRequests));
    } catch (err) {
        console.error(err);
        return res.status(500).json(new Error("internal server error"));
    }
}

export async function getConfirmedTripsUser(req: Request, res: Response): Promise<Response> {
    try {
        const trips = await db.getConfirmedTripsUser(req.user.email);
        return res.status(200).json(new Success(trips));
    } catch (err) {
        console.error(err);
        return res.status(500).json(new Error("internal server error"));
    }
}