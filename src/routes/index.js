const express = require('express');
const router = express.Router();

const contaRoute = require('./route')
router.use('/conta', contaRoute);

module.exports = router