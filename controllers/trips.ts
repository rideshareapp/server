// Controllers: Trips

import * as services from "../services";
import * as db from "../db/utils";
import { Success, Error } from "../models/return_status";
import { Request, Response } from "express";

export async function getAll(req: Request, res: Response): Promise<Response> {
    try {
        const tripRequests = await db.getTripRequests(req.body.event_id);
        return res.status(200).json(new Success(tripRequests));
    } catch (err) {
        console.error(err);
        return res.status(500).json(new Error("internal server error"));
    }
}

export async function newRequest(req: Request, res:Response): Promise<Response> {
    try {
        if (!await db.newTripRequest(req.body.event_id, req.body.email, req.body.geolocation, req.body.passengers)) {
            return res.status(500).json(new Error("internal server error"));
        }
        return res.status(201).json(new Success("created new request"));
    } catch (err) {
        console.error(err);
        return res.status(500).json(new Error("internal server error"));
    }
}