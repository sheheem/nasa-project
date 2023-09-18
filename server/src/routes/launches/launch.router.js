const express = require("express");

const { httpgetAllLaunch, httpAddNewLaunch, httpAbortLaunch } = require("./launch.controller");

const launchRouter = express.Router();

launchRouter
  .get("/launch", httpgetAllLaunch)
  .post("/launch", httpAddNewLaunch)
  .delete("/launch/:id", httpAbortLaunch);

module.exports = launchRouter;
