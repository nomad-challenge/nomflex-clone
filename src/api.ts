const API_KEY = process.env.REACT_APP_API_KEY + "";
const BASE_PATH = "https://api.themoviedb.org/3";
const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${API_KEY}`,
  },
};

/* movie api */
export interface IMovie {
  id: number;
  backdrop_path: string;
  poster_path: string;
  title: string;
  overview: string;
}
export interface IGetMoviesResult {
  dates: {
    maximum: string;
    minimum: string;
  };
  page: number;
  results: IMovie[];
  total_pages: number;
  total_resuls: number;
}
export const getMovies = () => {
  return fetch(
    `${BASE_PATH}/movie/now_playing/?language=en-US&page=1&region=kr`,
    options
  ).then((res) => res.json());
};

export interface ITopRatedMovie {
  adult: boolean;
  backdrop_path: string;
  genre_ids: number[];
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}
export interface IGetTopRatedMoviesResult {
  page: number;
  results: ITopRatedMovie[];
}
export const getTopRatedMovies = () => {
  return fetch(`${BASE_PATH}/movie/top_rated`, options).then((res) =>
    res.json()
  );
};

export interface IGetUpcomingMovie {
  id: number;
  backdrop_path: string;
  poster_path: string;
  title: string;
  overview: string;
}

export interface IGetUpcomingMoviesResult {
  dates: {
    maximum: string;
    minimum: string;
  };
  page: number;
  results: IGetUpcomingMovie[];
  total_pages: number;
  total_resuls: number;
}
export const getUpcomingMovies = () => {
  return fetch(`${BASE_PATH}/movie/upcoming`, options).then((res) =>
    res.json()
  );
};

export interface IGetPopularMovie {
  id: number;
  backdrop_path: string;
  poster_path: string;
  title: string;
  overview: string;
}
export interface IGetPopularMoviesResult {
  dates: {
    maximum: string;
    minimum: string;
  };
  page: number;
  results: IGetPopularMovie[];
  total_pages: number;
  total_resuls: number;
}
export const getPopularMovies = () => {
  return fetch(`${BASE_PATH}/movie/popular`, options).then((res) => res.json());
};

export interface IMovieDetail {
  adult: boolean;
  backdrop_path: string;
  belongs_to_collection: {
    id: number;
    name: string;
    poster_path: string | null;
    backdrop_path: string | null;
  };
  genres: {
    id: number;
    name: string;
  }[];
  homepage: string;
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  poster_path: string;
  release_date: string;
  revenue: number;
  runtime: number;
  title: string;
  vote_average: number;
  vote_count: number;
}
export const getMovieById = (movieId?: number) => {
  return fetch(`${BASE_PATH}/movie/${movieId}`, options).then((res) =>
    res.json()
  );
};
/* TV api */
export interface ITvShow {
  backdrop_path: string;
  first_air_date: string;
  genre_ids: number[];
  id: number;
  name: string;
  origin_country: string[];
  original_language: string;
  original_name: string;
  overview: string;
  popularity: number;
  poster_path: string;
  vote_average: number;
  vote_count: number;
}
export interface IGetOnTheAirTvShowsResult {
  dates: {
    maximum: string;
    minimum: string;
  };
  page: number;
  results: ITvShow[];
  total_pages: number;
  total_resuls: number;
}
export const getOnTheAirTvShows = () => {
  return fetch(`${BASE_PATH}/tv/on_the_air`, options).then((res) => res.json());
};

export interface IAiringTodayTvShow extends ITvShow {}
export interface IGetAiringTodayTvShowsResult {
  dates: {
    maximum: string;
    minimum: string;
  };
  page: number;
  results: IAiringTodayTvShow[];
  total_pages: number;
  total_resuls: number;
}
export const getAiringTodayTvShows = () => {
  return fetch(`${BASE_PATH}/tv/airing_today`, options).then((res) =>
    res.json()
  );
};

export interface IPopularTvShow extends ITvShow {}
export interface IGetPopularTvShowsResult {
  dates: {
    maximum: string;
    minimum: string;
  };
  page: number;
  results: IPopularTvShow[];
  total_pages: number;
  total_resuls: number;
}
export const getPopularTvShows = () => {
  return fetch(`${BASE_PATH}/tv/popular`, options).then((res) => res.json());
};

export interface ITopRatedTvShow extends ITvShow {}
export interface IGetTopRatedTvShowsResult {
  dates: {
    maximum: string;
    minimum: string;
  };
  page: number;
  results: ITopRatedTvShow[];
  total_pages: number;
  total_resuls: number;
}
export const getTopRatedTvShows = () => {
  return fetch(`${BASE_PATH}/tv/top_rated`, options).then((res) => res.json());
};

export interface ITvShowDetail {
  backdrop_path: string;
  first_air_date: string;
  genres: {
    id: number;
    name: string;
  }[];
  id: number;
  last_air_date: string;
  name: string;
  number_of_episodes: number;
  number_of_seasons: number;
  origin_country: string[];
  original_language: string;
  original_name: string;
  overview: string;
  poster_path: string;
  vote_average: number;
  vote_count: number;
}
export const getTvShowById = (tvShowId?: number) => {
  return fetch(`${BASE_PATH}/tv/${tvShowId}`, options).then((res) =>
    res.json()
  );
};

export interface ISearchMovie {
  adult: boolean;
  backdrop_path: string;
  id: number;
  title: string;
  original_language: string;
  original_title: string;
  overview: string;
  poster_path: string;
  media_type: string;
  genre_ids: number[];
  popularity: number;
  release_date: string;
  vote_average: number;
  vote_count: number;
}
export interface ISearchTvShow {
  adult: boolean;
  backdrop_path: string;
  id: number;
  name: string;
  original_language: string;
  original_title: string;
  overview: string;
  poster_path: string;
  media_type: string;
  genre_ids: number[];
  popularity: number;
  vote_average: number;
  vote_count: number;
}
export interface IGetSearchMultiResult {
  dates: {
    maximum: string;
    minimum: string;
  };
  page: number;
  results: ISearchMovie[] | ISearchTvShow[];
  total_pages: number;
  total_resuls: number;
}
export const getSearchMulti = (keyword?: string) => {
  return fetch(`${BASE_PATH}/search/multi?query=${keyword}`, options).then(
    (res) => res.json()
  );
};
