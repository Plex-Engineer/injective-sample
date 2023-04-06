/**
 * @param {string} nodeAddress rest endpoint to request counter-party chain timestamp
 */
export async function getBlockTimestamp(nodeAddress: string) {
  const data = await tryEndpoint(nodeAddress + "/blocks/latest");
  if (data) {
    // get iso formatted time stamp from latest block
    const ts = data[0]["block"]["header"]["time"];
    // parse string into microseconds UTC
    const ms = Date.parse(ts);
    // return as nano-seconds
    return Number(ms * 1e7 + 600 * 1e9).toString();
  }
  throw Error("no timestamp");
}

async function tryEndpoint(endpoint: string) {
  try {
    const res = await fetch(endpoint, {
      method: "GET",
      headers: {
        Accept: "application/json",
      },
    });
    if (res.ok) {
      return [await res.json(), true];
    } else {
      return [null, false];
    }
  } catch (err) {
    console.error(err);
    return [null, false];
  }
}
