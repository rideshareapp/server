import express from 'express';
const router = express.Router();

router.get('/register', function(req, res) {
    res.status(200).json({ message: 'User registration here' });
});

router.get('/login', function(req, res) {
    res.status(200).json({ message: 'User login here' });
});

router.get('/logout', function(req, res) {
    res.status(200).json({ message: 'User logout here' });
});

export { router }