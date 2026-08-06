const express = require('express');
const router = express.Router();
const { signup, signin, getMe } = require('../CONTROLLER/authController');

router.post('/signup', signup);
router.post('/signin', signin);
router.get('/me', getMe);

module.exports = router;