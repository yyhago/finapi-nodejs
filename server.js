const routes = require('./src/routes')

const express = require('express');
const app = express();

app.use(express.json());

app.use('/', routes)
app.listen(5000);