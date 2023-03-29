const express = require('express');
const authenticate = require('../middleware/authenticate');
const { getCourse, updateCourse } = require('../controllers/course');
const router = express.Router();

router.get('/', authenticate, getCourse);

router.post('/update', authenticate, updateCourse);

module.exports = router
