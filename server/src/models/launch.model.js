const launches = new Map;


let latestFlightNumber = 100;

const launch = {
    flightNumber: 100,
    mission: 'Keplar Exploration X',
    rocket: "Explorer IS1",
    launchDate: new Date('December 27, 2030'),
    target: "Keplar-442 b",
    customer: ['ZTM', 'NASA'],
    upcoming: true,
    success: true
}

launches.set(launch.flightNumber, launch);

function getAllLaunch() {
    return Array.from(launches.values())
}

function addNewLaunch(launch) {
    latestFlightNumber++;
    return launches.set(launch.flightNumber, Object.assign(launch, {
        flightNumber: latestFlightNumber,
        customer: ['Constellation', 'Freestar Collective'],
        upcoming: true,
        success: true
    }))
}

module.exports = {
    getAllLaunch,
    addNewLaunch
}


