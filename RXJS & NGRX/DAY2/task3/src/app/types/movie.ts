// Raw TV Show interface returned by the TVmaze search API
export interface RawTvShow {
  score: number;
  show: {
    id: number;
    name: string;
    genres: string[];
    premiered?: string;
    rating?: {
      average?: number;
    };
    network?: {
      name?: string;
    };
    image?: {
      medium?: string;
      original?: string;
    };
    status?: string;
  };
}

// Our simplified Movie representation model
export interface Movie {
  id: number;
  title: string;       // Mapped from: show.name
  director: string;    // Mapped from: show.network?.name (acts as network/studio director)
  year: number;        // Mapped from: show.premiered (extracts year)
  genre: string;       // Mapped from: show.genres[0] (first genre or default)
  poster: string;      // Mapped from: show.image?.medium (falls back to placeholder)
  rating: number;      // Mapped from: show.rating?.average (falls back to 7.0)
  role: string;        // Mapped from: show.status (e.g. 'Running', 'Ended')
}
