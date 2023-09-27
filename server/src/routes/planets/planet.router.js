const express = require('express');
const { httpgetAllPlanets } = require('./planet.controller');

const planetRouter = express.Router();

planetRouter.get('/', httpgetAllPlanets);

module.exports = planetRouter;
