// Routes: Events

import express from 'express';
const router = express.Router();
import * as eventController from "../controllers/events";


router.post('/create', async function (req, res) {
    const created = await eventController.createEvent(req.body);
    if (created) {
        res.status(201).json({ message: 'Create event here', details: created });
    } else {
        res.status(400).json({ message: 'Create event here', details: created });
    }
});

router.get('/getAll', async function (req, res) {
    const eventList = await eventController.getEvents(req.body);
    res.status(200).json({ message: 'Get events', details: eventList });
});

export { router };