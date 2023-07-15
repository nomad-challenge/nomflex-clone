// https://image.tmdb.org/t/p/original/woJbg7ZqidhpvqFGGMRhWQNoxwa.jpg
const API_KEY = process.env.REACT_APP_API_KEY + "";
const BASE_PATH = "https://api.themoviedb.org/3";
const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${API_KEY}`,
  },
};
export const getMovies = () => {
  return fetch(
    `${BASE_PATH}/movie/now_playing/?language=en-US&page=1&region=kr`,
    options
  ).then((res) => res.json());
};
