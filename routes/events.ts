// Routes: Events

import express from 'express';
const router = express.Router();
import * as orgController from "../controllers/organizations";


router.post('/create', async function (req, res) {
    const created = await orgController.createEvent(req.body);
    if (created) {
        res.status(201).json({ message: 'Create event here', details: created });
    } else {
        res.status(400).json({ message: 'Create event here', details: created });
    }
});

export { router };