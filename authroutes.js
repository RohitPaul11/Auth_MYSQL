const express = require('express');
const { register, login } = require('../controllers/authController');
const { profile } = require('../controllers/userController');
const auth = require('../middleware/auth');

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.get('/profile', auth, profile);

module.exports = router;
