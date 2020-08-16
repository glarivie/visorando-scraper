import axios from 'axios'
import { toNumber } from 'lodash';

import type { Hiking, Waypoint } from 'types';

const extractWaypoints = async (idRandonnee: Hiking['id']): Promise<Waypoint[]> => {
  const { data } = await axios.get('https://www.visorando.com/index.php', {
    params: {
      component: 'exportData',
      task: 'getRandoGeoJson',
      chartData: 1,
      wholePointsData: 1,
      idRandonnee,
    },
  })

  const { chartdata, geojson } = data;

  const elevations: Array<Waypoint['elevation']> = chartdata.data.map(([,e]) => e);

  return geojson.features.map(({ geometry, properties }) => {
    const [longitude, latitude] = geometry.coordinates;
    const index = toNumber(properties.index);

    return {
      index,
      step: toNumber(properties.title),
      elevation: toNumber(elevations[index]),
      latitude: toNumber(latitude),
      longitude: toNumber(longitude),
    }
  })
}

export {
  extractWaypoints,
}
