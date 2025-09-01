const express = require('express');
const router = express.Router();

const routeBanco = require('./routeBanco')
router.use('/conta', routeBanco);

module.exports = router