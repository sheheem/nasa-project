const { getAllLaunch, addNewLaunch, existingLaunchId, abortLaunch } = require('../../models/launch.model');
const { getPagination } = require('../../utils/query')

async function httpgetAllLaunch(req, res) {
    const {skip, limit} = getPagination(req.query);
    const launch = await getAllLaunch(skip, limit);
    return res.status(200).json( launch);
}

async function httpAddNewLaunch(req, res) {
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
    await addNewLaunch(launch)
    return res.status(201).json(launch);
}

async function httpAbortLaunch(req, res) {
    const launchId = +req.params.id;

    const existingLaunch = await existingLaunchId(launchId)

    if(!existingLaunch) {
        res.status(404).json({
            error: "Flight not found"
        })
    }
    const abort = await abortLaunch(launchId);
    res.status(200).json(abort);
}

module.exports = {
    httpgetAllLaunch,
    httpAddNewLaunch,
    httpAbortLaunch,
}