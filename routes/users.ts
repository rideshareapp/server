// Routes: Users

import express from 'express';
const router = express.Router();
import * as userController from "../controllers/users";

// Authentication routes
router.post('/register', userController.userRegister);
router.post('/login', userController.login);
router.post('/logout', userController.logout);
router.put('/update/profile', userController.updateUserProfile);
router.put('/update/email', userController.updateUserEmail);
router.put('/update/password', userController.updateUserPassword);

// Organization related routes
router.put('/joinOrg', userController.joinOrg);

export { router };