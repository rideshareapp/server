// Controllers: Events

import * as services from "../services";

export async function createEvent(req: eventRequest): Promise<unknown> {
    try {
        return (await services.eventService.createEvent(req.code, req.name, req.date, req.include_time) ? true : false);
    } catch (err) {
        console.log(err);
        return false;
    }
}

export async function getEvents(req: eventCode): Promise<unknown> {
    try {
        const eventList = await services.eventService.getEvents(req.code);
        return eventList;
    } catch(err) {
        console.log(err);
        return err;
    }
}

interface eventRequest {
    code: string;
    name: string;
    date: Date;
    include_time: boolean;
}

interface eventCode {
    code: string;
}