// Controllers: Events

import * as services from "../services";
import { Success, Error } from "../models/return_status";
import { Request, Response } from "express";

export async function createEvent(req: Request, res: Response): Promise<Response> {
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

export async function updateEvent(req: Request, res: Response): Promise<Response> {
    try {
        if (!await services.eventService.updateEvent(req.body.id, req.body.name, req.body.date, req.body.include_time)) {
            return res.status(400).json(new Error("failed to update event"));
        }
        return res.status(200).json(new Success("event updated"));
    } catch (err) {
        console.error(err);
        return res.status(500).json(new Error("internal server error"));
    }
}

export async function deleteEvent(req: Request, res: Response): Promise<Response> {
    try {
        if (!await services.eventService.deleteEvent(req.body.id)) {
            return res.status(400).json(new Error("failed to delete event"));
        }
        return res.status(200).json(new Success("event deleted"));
    } catch (err) {
        console.error(err);
        return res.status(500).json(new Error("internal server error"));
    }
}

export async function getEvents(req: Request, res: Response): Promise<Response> {
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
