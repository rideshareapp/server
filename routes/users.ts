import express from 'express';
const router = express.Router();
import * as controller from "../controllers/users";


router.get('/register', async function(req, res) {
    await controller.userRegister();
    res.status(200).json({ message: 'User registration here' });
});

router.get('/login', async function(req, res) {
    await controller.login();
    res.status(200).json({ message: 'User login here' });
});

router.get('/logout', async function(req, res) {
    await controller.logout();
    res.status(200).json({ message: 'User logout here' });
});

export { router };