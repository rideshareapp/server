// Routes: Users

import express from 'express';
const router = express.Router();
import * as userController from "../controllers/users";
import { authenticateToken } from "../auth";

// Authentication routes
router.post('/register', userController.userRegister);
router.post('/login', userController.login);
router.put('/update/profile', authenticateToken, userController.updateUserProfile);
router.put('/update/email', authenticateToken, userController.updateUserEmail);
router.put('/update/password', authenticateToken, userController.updateUserPassword);

router.get('/profile', authenticateToken, userController.getProfile);

// Organization related routes
router.put('/joinOrg', authenticateToken, userController.joinOrg);
router.put('/leaveOrg', authenticateToken, userController.leaveOrg);

export { router };