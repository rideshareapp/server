// Routes: Trips

import express from 'express';
const router = express.Router();
import * as tripsController from "../controllers/trips";

router.get('/getAll', tripsController.getAll);
router.post('/newRequest', tripsController.newRequest);

export { router };