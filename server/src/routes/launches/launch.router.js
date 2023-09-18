const express = require('express');

const { httpgetAllLaunch, httpAddNewLaunch } = require('./launch.controller');

const launchRouter = express.Router();

launchRouter.get('/launch', httpgetAllLaunch).post('/launch', httpAddNewLaunch)

module.exports = launchRouter
