// Controllers: Events

import * as services from "../services";
import { Success, Error } from "../models/return_status";
import { Request, Response, NextFunction } from "express";

export async function createEvent(req: Request, res: Response, next: NextFunction): Promise<unknown> {
    try {
        // return (await services.eventService.createEvent(req.code, req.name, req.date, req.include_time) ? true : false);
        const event: eventRequest = req.body;
        if (!await services.eventService.createEvent(event.code, event.name, event.date, event.include_time)) {
            return res.status(400).json(new Error("failed to create event"));
        }
        return res.status(201).json(new Success("event created"));
    } catch (err) {
        console.log(err);
        return res.status(500).json(new Error("internal server error"));
    }
}

export async function getEvents(req: Request, res: Response, next: NextFunction): Promise<unknown> {
    try {
        const eventList = await services.eventService.getEvents(req.body.code);
        if (!eventList) {
            return res.status(400).json(new Error("failed to get events"));
        }
        return res.status(200).json(new Success({ eventList }));
    } catch (err) {
        console.log(err);
        return res.status(500).json(new Error("internal server error"));
    }
}

interface eventRequest {
    code: string;
    name: string;
    date: Date;
    include_time: boolean;
}
