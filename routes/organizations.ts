// Routes: Organizations

import express from 'express';
const router = express.Router();
import * as orgController from "../controllers/organizations";


router.post('/register', orgController.orgRegister);
router.post('/login', orgController.login);

export { router };