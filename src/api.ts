const API_KEY = process.env.REACT_APP_API_KEY + "";
const BASE_PATH = "https://api.themoviedb.org/3";
const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${API_KEY}`,
  },
};

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
