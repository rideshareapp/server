// Routes: Events

import express from 'express';
const router = express.Router();
import * as eventController from "../controllers/events";


router.post('/create', eventController.createEvent);
router.get('/getAll', eventController.getEvents);

export { router };