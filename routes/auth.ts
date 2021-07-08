// Routes: Users

import express from 'express';
const router = express.Router();
import { refreshAccessToken } from "../auth";

router.post('/refresh', refreshAccessToken);

export { router };