import { get, isEqual, toNumber, isNil } from 'lodash'

import { Details, Point } from '../types'

const getPoint = (details: string) => (regex: RegExp): Point | undefined => {
  const matches = details.match(regex)

  if (isNil(matches)) return undefined;

  const [lat, lng] = matches.slice(1, 3).map(el => {
    const [cardinal, value] = el.split(/\s/)

    return (cardinal.startsWith('S') || cardinal.startsWith('O'))
      ? toNumber('-' + value)
      : toNumber(value)
  })

  return { type: 'Point', coordinates: [lng, lat] };
};

const parseDetails = (details: string): Details => {
  return {
    ign: get(details.match(/Ref.\s+(\d+[A-Z]+)/), '[1]'),
    duration: get(details.match(/Durée .+:\s+(\d+h\d{0,2})\[?\??\]?/), '[1]'),
    distance: parseFloat(get(details.match(/Distance:\s+(\d+.?\d?\d?)km/), '[1]', 0)),
    vertical: {
      rise: parseFloat(get(details.match(/Dénivelé positif:\s+(\d+)m/), '[1]', 0)),
      drop: parseFloat(get(details.match(/Dénivelé négatif:\s+(\d+)m/), '[1]', 0)),
    },
    altitude: {
      high: parseFloat(get(details.match(/Point haut:\s+(\d+)m/), '[1]', 0)),
      low: parseFloat(get(details.match(/Point bas:\s+(\d+)m/), '[1]', 0)),
    },
    difficulty: get(details.match(/Difficulté:\s+(\w+)/), '[1]'),
    loop: isEqual(get(details.match(/Retour point de départ:\s+([Oo]ui|[Nn]on)/), '[1]'), 'Oui'),
    type: get(details.match(/(A pied|A VTT|En raquettes à neige|En cyclo-route)/), '[0]', 'A pied'),
    region: get(details.match(/Région:\s+(.+) Commune/), '[1]', undefined),
    city: get(details.match(/Commune:\s+(.+)\s\(\d+\)/), '[1]'),
    zipCode: parseInt(get(details.match(/Commune:\s+.+(\d{5})/), '[1]'), 10),
    departure: getPoint(details)(/Départ:\s+([N|S]\s\d+.\d+)°\s\/\s([E|O]\s\d+.\d+)°/) as Point,
    arrival: getPoint(details)(/Arrivée:\s+([N|S]\s\d+.\d+)°\s\/\s([E|O]\s\d+.\d+)°/),
  }
}

export {
  parseDetails,
}
