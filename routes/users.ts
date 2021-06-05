import express from 'express';
const router = express.Router();
import * as userService from "../controllers/users";


router.post('/register', async function(req, res) {
    const details = await userService.userRegister(req.body);
    res.status(200).json({ message: 'User registration here', details: details });
});

router.post('/login', async function(req, res) {
    const details = await userService.login(req.body.email, req.body.password);
    res.status(200).json({ message: 'User login here', details: details });
});

router.post('/logout', async function(req, res) {
    await userService.logout();
    res.status(200).json({ message: 'User logout here' });
});

export { router };