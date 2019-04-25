import { get, isEqual } from 'lodash'

interface IDetails {
  reference?: string;
  duration?: string;
  distance: number;
  vertical: {
    rise: number;
    drop: number;
  };
  altitude: {
    high: number;
    low: number;
  };
  difficulty?: string;
  loop: boolean;
  type: string;
  region?: string;
  city?: string;
  zipCode?: number;
  coordinate?: string[];
}

const parseDetails = (details: string): IDetails => {
  const results = {
    reference: get(details.match(/Ref.\s+(\d+[A-Z]{2})/), '[1]'),
    duration: get(details.match(/Durée moyenne:\s+(\d+h\d{2})\[\?\]/), '[1]'),
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
    region: get(details.match(/Région:\s+(.+) Commune/), '[1]'),
    city: get(details.match(/Commune:\s+(.+)\s\(\d+\)/), '[1]'),
    zipCode: parseInt(get(details.match(/Commune:\s+.+\s\((\d+)\)/), '[1]'), 10),
    coordinate: (details.match(/Départ:\s+(N\s\d+.\d+°)\s\/\s(E\s\d+.\d+°)/) || []).slice(1, 3),
  }

  return results
}

export {
  parseDetails,
}
