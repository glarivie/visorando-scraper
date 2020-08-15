import axios from 'axios'
import { parseStringPromise } from 'xml2js'
import { toNumber } from 'lodash';

import type { Waypoint } from 'types';

const extractGPXData = async (gpxFileUrl: string): Promise<Waypoint[]> => {
  const { data } = await axios.get(gpxFileUrl)
  const { gpx } = await parseStringPromise(data);

  const { wpt: waypoints } = gpx;

  return waypoints.map(({ ele, $, time, name }) => ({
    name: name[0],
    elevation: toNumber(ele[0]),
    latitude: toNumber($.lat),
    longitude: toNumber($.lon || $.lng),
    timestamp: new Date(time[0]),
  }));
}

export {
  extractGPXData,
}
