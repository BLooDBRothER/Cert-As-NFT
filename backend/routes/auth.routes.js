var express = require('express');
const { register, login, verifyMail, verifyLogin, resendMail, logout } = require('../controllers/auth');
const authenticate = require('../middleware/authenticate');
const {validateRegister, validateLogin} = require('../middleware/validate');
var router = express.Router();

// POST register
router.post('/register', validateRegister(), register);

// GET login
router.get('/login', authenticate, verifyLogin);

// POST login
router.post('/login', validateLogin(), login);

// GET verifyMail
router.get('/verify/:token', verifyMail);

// GET resendMail
router.get('/resend', resendMail);

// GET logout
router.get('/logout', authenticate, logout);

module.exports = router;
