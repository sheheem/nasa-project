const express = require('express');

const { httpgetAllLaunch } = require('./launch.controller');

const launchRouter = express.Router();

launchRouter.get('/launch', httpgetAllLaunch);

module.exports = launchRouter
