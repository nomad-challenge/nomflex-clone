import { useQuery } from "react-query";
import {
  IGetMoviesResult,
  IGetPopularMoviesResult,
  IGetTopRatedMoviesResult,
  getMovies,
  getPopularMovies,
  getTopRatedMovies,
  getUpcomingMovies,
} from "../api";
import { styled } from "styled-components";
import { makeImagePath } from "../utils";
import { useState } from "react";
import Slider from "../components/Slider";

const Wrapper = styled.div`
  background-color: black;
  /* overflow: hidden; */
`;
const Loader = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 20vh;
  color: white;
  font-size: 20px;
`;
const Banner = styled.div<{ bgPhoto: string }>`
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 0 60px;
  background-image: linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 1)),
    url(${(props) => props.bgPhoto});
  background-size: cover;
`;
const Title = styled.h3`
  font-size: 60px;
  margin-bottom: 10px;
`;
const Overview = styled.p`
  font-size: 30px;
  width: 50%;
`;

const offset = 6;
const Home = () => {
  const [leaving, setLeaving] = useState(false);
  const { data, isLoading } = useQuery<IGetMoviesResult>(
    ["movies", "now_playing"],
    getMovies
  );

  const { data: polularData, isLoading: popularLoading } =
    useQuery<IGetPopularMoviesResult>(["movies", "polular"], getPopularMovies);
  const { data: topRatedData, isLoading: topRatedLoading } =
    useQuery<IGetTopRatedMoviesResult>(
      ["movies", "topRated"],
      getTopRatedMovies
    );

  const { data: upcomingData, isLoading: upcomingLoading } = useQuery(
    ["movies", "upcoming"],
    getUpcomingMovies
  );
  const [index, setIndex] = useState(0);
  const [popularIndex, setPopularIndex] = useState(0);
  const [topRatedIndex, setTopRatedIndex] = useState(0);
  const [upcomingIndex, setUpcomingIndex] = useState(0);
  const increase = () => {
    if (data) {
      if (leaving) return;
      toggleLeaving();
      const totalMovies = data?.results.length - 1;
      const maxIndex = Math.ceil(totalMovies / offset) - 1;
      setIndex((prev) => (prev === maxIndex ? 0 : prev + 1));

      if (polularData) {
        const totalPolularMovies = polularData?.results.length;
        const maxPolularIndex = Math.ceil(totalPolularMovies / offset) - 1;
        setPopularIndex((prev) => (prev === maxPolularIndex ? 0 : prev + 1));
      }
      if (topRatedData) {
        const totalTopRatedMovies = topRatedData?.results.length;
        const maxTopRatedIndex = Math.ceil(totalTopRatedMovies / offset) - 1;
        setTopRatedIndex((prev) => (prev === maxTopRatedIndex ? 0 : prev + 1));
      }
      if (upcomingData) {
        const totalUpcomingMovies = upcomingData?.results.length;
        const maxUpcomingIndex = Math.ceil(totalUpcomingMovies / offset) - 1;
        setUpcomingIndex((prev) => (prev === maxUpcomingIndex ? 0 : prev + 1));
      }
    }
  };
  const toggleLeaving = () => setLeaving((prev) => !prev);

  return (
    <Wrapper>
      {isLoading ? (
        <Loader>Loading....</Loader>
      ) : (
        <>
          <Banner
            onClick={increase}
            bgPhoto={makeImagePath(data?.results[0].backdrop_path || "")}
          >
            <Title>{data?.results[0].title}</Title>
            <Overview>{data?.results[0].overview}</Overview>
          </Banner>
          {data?.results && (
            <Slider
              title="Now Playing"
              index={index}
              offset={offset}
              movies={data.results.slice(1)}
              toggleLeaving={toggleLeaving}
              category="movies"
            />
          )}
          {polularData?.results && (
            <Slider
              title="Polular"
              index={popularIndex}
              offset={offset}
              movies={polularData.results}
              toggleLeaving={toggleLeaving}
              category="movies"
            />
          )}
          {topRatedData?.results && (
            <Slider
              title="Top Rated"
              index={topRatedIndex}
              offset={offset}
              movies={topRatedData.results}
              toggleLeaving={toggleLeaving}
              category="movies"
            />
          )}
          {upcomingData?.results && (
            <Slider
              title="Upcoming"
              index={upcomingIndex}
              offset={offset}
              movies={upcomingData.results}
              toggleLeaving={toggleLeaving}
              category="movies"
            />
          )}
        </>
      )}
    </Wrapper>
  );
};

export default Home;
