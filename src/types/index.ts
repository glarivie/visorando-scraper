interface Point {
  type: 'Point';
  coordinates: [number, number];
}

interface Details {
  ign?: string;
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
  departure: Point;
  arrival?: Point;
}

interface Rating {
  average?: number;
  count?: number;
  description?: number;
  map?: number;
  route?: number;
}

interface Review {
  author: string;
  date: Date | null;
  rating: number;
  description: string;
}

interface Waypoint {
  index: number;
  step: number;
  elevation: number;
  latitude: number;
  longitude: number;
}

interface Hiking {
  id: number;
  url: string;
  title: string;
  createdAt?: Date;
  updatedAt?: Date;
  overview: string;
  details: Details;
  steps: string[];
  rating: Rating;
  reviews: Review[];
  images: string[];
  waypoints?: Waypoint[];
}

export {
  Point,
  Details,
  Rating,
  Waypoint,
  Hiking,
}
