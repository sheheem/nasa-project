const { getAllLaunch, addNewLaunch } = require('../../models/launch.model');

function httpgetAllLaunch(req, res) {
    return res.status(200).json(getAllLaunch())
}

function httpAddNewLaunch(req, res) {
    const launch = req.body;
    if(!launch.mission || !launch.rocket || !launch.target || !launch.launchDate) {
        res.status(400).json({
            error: "Missing required field"
        })
    }
    launch.launchDate = new Date(launch.launchDate);
    if(isNaN(launch.launchDate)) {
        res.status(400).json({
            error: "Invalid Launch Date"
        })
    }
    addNewLaunch(launch)
    return res.status(201).json(launch);
}

module.exports = {
    httpgetAllLaunch,
    httpAddNewLaunch
}