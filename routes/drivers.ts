// Routes: Users

import express from 'express';
const router = express.Router();
import * as userController from "../controllers/users";
import * as driverController from "../controllers/drivers";

router.post('/new', driverController.newDriver);

export { router };