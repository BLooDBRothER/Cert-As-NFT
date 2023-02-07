var express = require('express');
const { getStatusData, updateStatus } = require("../controllers/main");
var router = express.Router();

router.get('/get-data', getStatusData);

router.post('/update-status', updateStatus);

module.exports = router;
