const express = require("express");

const { httpgetAllLaunch, httpAddNewLaunch, httpAbortLaunch } = require("./launch.controller");

const launchRouter = express.Router();

launchRouter
  .get("/", httpgetAllLaunch)
  .post("/", httpAddNewLaunch)
  .delete("/:id", httpAbortLaunch);

module.exports = launchRouter;
