var express = require('express');
var router = express.Router();
var handler = require('./handler');

router.get('/', handler.handleGet);

module.exports = router;
