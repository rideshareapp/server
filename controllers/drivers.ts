// Controllers: Drivers

import * as services from "../services";
import * as db from "../db/utils";
import { Success, Error } from "../models/return_status";
import { Request, Response } from "express";

export async function newDriver(req: Request, res: Response): Promise<Response> {
    try {
        // if (!await db.newDriver(req.body.email, req.body.code)) {
        //     return res.status(500).json(new Error("internal server error"));
        // }
        await db.newDriver(req.body.email, req.body.code);
        return res.status(201).json(new Success("driver added"));
    } catch (err) {
        console.error(err);
        return res.status(500).json(new Error("internal server error"));
    }
}

export async function acceptTrip(req: Request, res: Response): Promise<Response> {
    try {
        if (!db.acceptTripRequest(req.body.event_id, req.body.trip_request_id, req.body.driver)) {
            return res.status(500).json(new Error("internal server error"));
        }
        return res.status(201).json(new Success("trip accepted"));
    } catch (err) {
        console.error(err);
        return res.status(500).json(new Error("internal server error"));
    }
}