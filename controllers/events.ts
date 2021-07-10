// Controllers: Events

import * as services from "../services";
import { Success, Error } from "../models/return_status";
import { Request, Response } from "express";
import * as db from "../db/utils";

export async function createEvent(req: Request, res: Response): Promise<Response> {
    try {
        if (await db.getOrgCode(req.user.email) !== req.body.code) {
            return res.sendStatus(403);
        }

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
        if (!await db.checkEventBelongsToOrg(req.user.email, req.body.id)) {
            return res.sendStatus(403);
        }

        if (!await db.updateEvent(req.body.id, req.body.name, req.body.date, req.body.include_time)) {
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
        if (!await db.checkEventBelongsToOrg(req.user.email, req.body.id)) {
            return res.sendStatus(403);
        }

        if (!await db.deleteEvent(req.user.email, req.body.id)) {
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
        const eventList = await services.eventService.getEvents(req.user.email);
        if (!eventList) {
            return res.status(400).json(new Error("failed to get events"));
        }
        return res.status(200).json(new Success({ eventList }));
    } catch (err) {
        console.log(err);
        return res.status(500).json(new Error("internal server error"));
    }
}
