// Routes: Events

import express from 'express';
const router = express.Router();
import * as eventController from "../controllers/events";


router.post('/create', eventController.createEvent);
router.put('/update', eventController.updateEvent);
router.delete('/delete', eventController.deleteEvent);
router.get('/getAll', eventController.getEvents);

export { router };