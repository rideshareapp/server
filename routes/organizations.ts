import express from 'express';
const router = express.Router();
import * as orgController from "../controllers/organizations";


router.post('/register', async function(req, res) {
    const details = await orgController.orgRegister(req.body);
    res.status(200).json({ message: 'Org registration here', details: details });
});

router.post('/login', async function(req, res) {
    const details = await orgController.login(req.body.email, req.body.password);
    res.status(200).json({ message: 'Org login here', details: details });
});

router.post('/logout', async function(req, res) {
    await orgController.logout();
    res.status(200).json({ message: 'Org logout here' });
});

export { router };