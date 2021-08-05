// Routes: Users

import express from 'express';
const router = express.Router();
import { refreshAccessToken, authenticateToken, logout } from "../auth";

router.post('/refresh', refreshAccessToken);
router.post('/refresh/logout', logout);
router.get('/validToken', authenticateToken, (req, res) => {
    res.sendStatus(200);
});

export { router };