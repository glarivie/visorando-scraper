interface Coordinate {
  lat: number;
  lng: number;
}

interface Details {
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
  coordinate?: Coordinate;
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

interface Hiking {
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
}

export {
  Coordinate,
  Details,
  Rating,
  Hiking,
}
