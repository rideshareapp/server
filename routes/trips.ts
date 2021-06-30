// Routes: Trips

import express from 'express';
const router = express.Router();
import * as tripsController from "../controllers/trips";
import { authenticateToken } from "../auth";

// Driver routes
router.post('/drivers/requests/accept', authenticateToken, tripsController.acceptTrip);
router.get('/drivers/requests/get', authenticateToken, tripsController.getTripRequestsDriver);
router.get('/drivers/confirmed/get', authenticateToken, tripsController.getConfirmedTripsDriver);
router.delete('/drivers/confirmed/finish', authenticateToken, tripsController.finishTrip);

// User routes
router.post('/users/requests/new', authenticateToken, tripsController.newTripRequest);
router.get('/users/requests/get', authenticateToken, tripsController.getTripRequestsUser);
router.get('/users/confirmed/get', authenticateToken, tripsController.getConfirmedTripsUser);

export { router };