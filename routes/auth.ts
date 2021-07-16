// Routes: Users

import express from 'express';
const router = express.Router();
import { refreshAccessToken, authenticateToken } from "../auth";

router.post('/refresh', refreshAccessToken);
router.get('/validToken', authenticateToken, (req, res) => {
    res.sendStatus(200);
});

export { router };