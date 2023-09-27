const axios = require('axios');

const launches = require('./launches.schema');
const planets = require('./planets.schema');

const SPACEX_URL = `https://api.spacexdata.com/v5/launches/query`


// async function loadLaunchData() {
//      console.log("Downloading....");
//      const response = await axios.post(SPACEX_URL, {
//         query: {},
//         options: {
//             populate: [
//                 {
//                     path: 'rocket',
//                     select: {
//                         name: 1
//                     }
//                 },
//                 {
//                     path: 'payloads',
//                     select: {
//                         customers: 1
//                     }
//                 }
//             ]
//         }
//      })

//      const launchDocs = response.data.docs;
//      for(let launchDoc of launchDocs) {

//         const payloads = launchDoc['payloads'];
//         const customer = payloads.flatMap((payload) => {
//             return payload['customers'];
//         })

//         const launch = {
//             flightNumber: launchDoc['flight_number'],
//             mission: launchDoc['name'],
//             rocket: launchDoc['rocket']['name'],
//             launchDate: launchDoc['date_local'],
//             upcoming: launchDoc['upcoming'],
//             success: launchDoc['success'],
//             customer
//         }
//         await saveLaunch(launch)
//      }

// }

async function getAllLaunch(skip, limit) {
    return await launches.find({}, {'_id':0, '__v':0}).sort({flightNumber: 1}).skip(skip).limit(limit);
}



async function getLatestFlightNumber() {
    const latestLaunch = await launches.findOne().sort('-flightNumber');

    if(!latestLaunch) {
        latestLaunch.flightNumber = 100;
    }
    return latestLaunch.flightNumber
}



async function saveLaunch(launch) {
    await launches.findOneAndUpdate({
        flightNumber: launch.flightNumber,
    }, launch, {
        upsert: true
    })
}

async function addNewLaunch(launch) {
    const planet = await planets.findOne({
        keplerName: launch.target
    })

    if(!planet) {
        throw new Error("Missing Planet..")
    }

    const latestFlightNumber = await getLatestFlightNumber()+1;
    // return launches.set(launch.flightNumber, Object.assign(launch, {
    //     flightNumber: latestFlightNumber,
    //     customer: ['Constellation', 'Freestar Collective'],
    //     upcoming: true,
    //     success: true
    // }))

    const newLaunch = Object.assign(launch, {
        success: true,
        upcoming: true,
        customer: ['Onepiece', 'naruto'],
        flightNumber: latestFlightNumber
    })

    await saveLaunch(newLaunch)
}

async function existingLaunchId(launchId) {
    return await launches.findOne({
        flightNumber: launchId
    });
}
 
async function abortLaunch(launchId) {
    const abort = await launches.updateOne({
        flightNumber: launchId
    }, {
        upcoming: false,
        success: false
    });
    console.log(abort);
    return abort;
}



module.exports = {
    getAllLaunch,
    addNewLaunch,
    existingLaunchId,
    abortLaunch
}


