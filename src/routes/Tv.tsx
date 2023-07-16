import { useQuery } from "react-query";
import {
  IGetAiringTodayTvShowsResult,
  IGetOnTheAirTvShowsResult,
  IGetPopularTvShowsResult,
  IGetTopRatedTvShowsResult,
  getAiringTodayTvShows,
  getOnTheAirTvShows,
  getPopularTvShows,
  getTopRatedTvShows,
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
const Tv = () => {
  const [leaving, setLeaving] = useState(false);

  const { data: onTheAirData, isLoading: onTheAirLoading } =
    useQuery<IGetOnTheAirTvShowsResult>(
      ["tvShows", "onTheAir"],
      getOnTheAirTvShows
    );
  const { data: airingTodayData, isLoading: airingTodayLoading } =
    useQuery<IGetAiringTodayTvShowsResult>(
      ["tvShows", "topRated"],
      getAiringTodayTvShows
    );

  const { data: popularData, isLoading: popularLoading } =
    useQuery<IGetPopularTvShowsResult>(
      ["tvShows", "popular"],
      getPopularTvShows
    );
  const { data: topRatedData, isLoading: topRatedLoading } =
    useQuery<IGetTopRatedTvShowsResult>(
      ["tvShows", "topRated"],
      getTopRatedTvShows
    );
  const [onTheAirIndex, setOnTheAirIndex] = useState(0);
  const [airingTodayIndex, setAiringTodayIndex] = useState(0);
  const [popularIndex, setPopularIndex] = useState(0);
  const [topRatedIndex, setTopRatedIndex] = useState(0);
  const increase = () => {
    if (onTheAirData) {
      if (leaving) return;
      toggleLeaving();
      const totalOnTheAirTvShows = onTheAirData?.results.length - 1;
      const maxOnTheAirIndex = Math.ceil(totalOnTheAirTvShows / offset) - 1;
      setOnTheAirIndex((prev) => (prev === maxOnTheAirIndex ? 0 : prev + 1));

      if (airingTodayData) {
        const totalAiringTodayTvShows = airingTodayData?.results.length;
        const maxAiringTodayIndex =
          Math.ceil(totalAiringTodayTvShows / offset) - 1;
        setAiringTodayIndex((prev) =>
          prev === maxAiringTodayIndex ? 0 : prev + 1
        );
      }
      if (popularData) {
        const totalPopularTvShows = popularData?.results.length;
        const maxPolularIndex = Math.ceil(totalPopularTvShows / offset) - 1;
        setPopularIndex((prev) => (prev === maxPolularIndex ? 0 : prev + 1));
      }
      if (topRatedData) {
        const totalTopRatedTvShows = topRatedData?.results.length;
        const maxTopRatedIndex = Math.ceil(totalTopRatedTvShows / offset) - 1;
        setTopRatedIndex((prev) => (prev === maxTopRatedIndex ? 0 : prev + 1));
      }
    }
  };
  const toggleLeaving = () => setLeaving((prev) => !prev);

  return (
    <Wrapper>
      {onTheAirLoading ? (
        <Loader>Loading....</Loader>
      ) : (
        <>
          <Banner
            onClick={increase}
            bgPhoto={makeImagePath(
              onTheAirData?.results[0].backdrop_path || ""
            )}
          >
            <Title>{onTheAirData?.results[0].name}</Title>
            <Overview>{onTheAirData?.results[0].overview}</Overview>
          </Banner>
          {onTheAirData?.results && (
            <Slider
              title="On The Air"
              index={onTheAirIndex}
              offset={offset}
              tvShows={onTheAirData.results.slice(1)}
              toggleLeaving={toggleLeaving}
              category="tv"
            />
          )}
          {airingTodayData?.results && (
            <Slider
              title="Airing Today"
              index={airingTodayIndex}
              offset={offset}
              tvShows={airingTodayData.results}
              toggleLeaving={toggleLeaving}
              category="tv"
            />
          )}
          {popularData?.results && (
            <Slider
              title="Popular"
              index={popularIndex}
              offset={offset}
              tvShows={popularData.results}
              toggleLeaving={toggleLeaving}
              category="tv"
            />
          )}
          {topRatedData?.results && (
            <Slider
              title="Upcoming"
              index={topRatedIndex}
              offset={offset}
              tvShows={topRatedData.results}
              toggleLeaving={toggleLeaving}
              category="tv"
            />
          )}
        </>
      )}
    </Wrapper>
  );
};

export default Tv;
