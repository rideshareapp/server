// Routes: Users

import express from 'express';
const router = express.Router();
import * as userController from "../controllers/users";

// Authentication routes
router.post('/register', userController.userRegister);
router.post('/login', userController.login);
router.post('/logout', userController.logout);

// Organization related routes
router.put('/joinOrg', userController.joinOrg);

export { router };