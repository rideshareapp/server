// Routes: Users

import express from 'express';
const router = express.Router();
import * as userController from "../controllers/users";


router.post('/register', async function (req, res) {
    const details = await userController.userRegister(req.body);
    res.status(200).json({ message: 'User registration here', details: details });
});

router.post('/login', async function (req, res) {
    const details = await userController.login(req.body.email, req.body.password);
    res.status(200).json({ message: 'User login here', details: details });
});

router.post('/logout', async function (req, res) {
    await userController.logout();
    res.status(200).json({ message: 'User logout here' });
});

router.put('/joinOrg', async function (req, res) {
    if (await userController.joinOrg(req.body.code, req.body.email)) {
        res.status(201).json({ message: 'Org joined' });
    } else {
        res.status(400).json({ message: 'Failed to join org' });
    }
});

export { router };