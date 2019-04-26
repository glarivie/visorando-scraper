interface ICoordinate {
  lat: number;
  lng: number;
}

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
  coordinate?: ICoordinate;
}

interface IRating {
  average?: number;
  count?: number;
  description?: number;
  map?: number;
  route?: number;
}

interface IReview {
  author: string;
  date: Date | null;
  rating: number;
  description: string;
}

interface IHiking {
  url: string;
  title: string;
  createdAt?: Date;
  updatedAt?: Date;
  overview: string;
  details: IDetails;
  steps: string[];
  rating: IRating;
  reviews: IReview[];
  images: string[];
}

export {
  ICoordinate,
  IDetails,
  IRating,
  IHiking,
}
