const express = require('express');

const planetRouter = require('../planets/planet.router');
const launchRouter = require('../launches/launch.router');

const api = express.Router();


api.use('/planets', planetRouter);
api.use('/launch',launchRouter);

module.exports = api;