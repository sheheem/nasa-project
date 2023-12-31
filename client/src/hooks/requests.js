const API_URL = 'http://localhost:3001/v1'


async function httpGetPlanets() {
  const response = await fetch(`${API_URL}/planets`);
  return await response.json();
  // Load planets and return as JSON.
}

async function httpGetLaunches() {
  const response = await fetch(`${API_URL}/launch`);
  const fetchedLaunches = await response.json();
  return fetchedLaunches.sort((a, b) => {
    return a.flightNumber - b.flightNumber;
  })
  // Load launches, sort by flight number, and return as JSON.
}

async function httpSubmitLaunch(launch) {
  try {
    return await fetch(`${API_URL}/launch`, {
      method: 'post',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(launch)
    });

  } catch(arr) {
    return {
      ok: false
    };
  }
  // Submit given launch data to launch system.
}

async function httpAbortLaunch(id) {
  try{
    return await fetch(`${API_URL}/launch/${id}`, {
      method: "delete"
    })
  }catch(err){
    return {
      ok: false
    }
  }
  // Delete launch with given ID.
}

export {
  httpGetPlanets,
  httpGetLaunches,
  httpSubmitLaunch,
  httpAbortLaunch,
};