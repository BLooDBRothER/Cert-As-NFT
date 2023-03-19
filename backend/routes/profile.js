const express = require('express');
const authenticate = require('../middleware/authenticate');
const { getProfile, uploadProfilePic, removeProfilePic, updateProfile } = require('../controllers/profile');
const upload = require('../utils/fileStorage');
const router = express.Router();

router.get('/', authenticate, getProfile);

router.post('/update', authenticate, updateProfile);

router.post('/upload', authenticate, upload.single('image'), uploadProfilePic)

router.post('/delete', authenticate, removeProfilePic)

module.exports = router
