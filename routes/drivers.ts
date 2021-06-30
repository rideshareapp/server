// Routes: Users

import express from 'express';
const router = express.Router();
import * as driverController from "../controllers/drivers";
import { authenticateToken } from "../auth";

router.post('/new', authenticateToken, driverController.newDriver);

export { router };