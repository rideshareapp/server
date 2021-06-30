// Routes: Events

import express from 'express';
const router = express.Router();
import * as eventController from "../controllers/events";
import { authenticateToken } from "../auth";


router.post('/create', authenticateToken, eventController.createEvent);
router.put('/update', authenticateToken, eventController.updateEvent);
router.delete('/delete', authenticateToken, eventController.deleteEvent);
router.get('/getAll', authenticateToken, eventController.getEvents);

export { router };