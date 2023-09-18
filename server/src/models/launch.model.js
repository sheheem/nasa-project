const launches = new Map;

const launch = {
    flightNumber: 100,
    mission: 'Keplar Exploration X',
    rocket: "Explorer IS1",
    launchDate: new Date('December 27, 2030'),
    destination: "Keplar-442 b",
    customer: ['ZTM', 'NASA'],
    upcoming: true,
    success: true
}

launches.set(launch.flightNumber, launch);

function getAllLaunch() {
    return Array.from(launches.values())
}

module.exports = {
    getAllLaunch
}


