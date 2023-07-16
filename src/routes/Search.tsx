import { useQuery } from "react-query";
import {
  IGetSearchMultiResult,
  ISearchMovie,
  ISearchTvShow,
  getSearchMulti,
} from "../api";
import { styled } from "styled-components";
import { useState } from "react";
import Slider from "../components/Slider";
import { useLocation } from "react-router-dom";

const Wrapper = styled.div`
  background-color: black;
  padding-top: 40vh;
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

const offset = 6;
const Search = () => {
  const { search } = useLocation();
  const param = new URLSearchParams(search);
  const keyword = param.get("keyword")!;
  const [leaving, setLeaving] = useState(false);
  const { data, isLoading } = useQuery<IGetSearchMultiResult>(
    ["search", keyword],
    () => getSearchMulti(keyword)
  );

  const [index, setIndex] = useState(0);

  console.log(data);
  const toggleLeaving = () => setLeaving((prev) => !prev);
  return (
    <Wrapper>
      {isLoading ? (
        <Loader>Loading....</Loader>
      ) : (
        <>
          {data?.results && (
            <>
              <Slider
                title="Movie"
                index={index}
                offset={offset}
                //@ts-ignore
                movies={data?.results.filter(
                  (result: ISearchMovie) => result.media_type === "movie"
                )}
                toggleLeaving={toggleLeaving}
                category="search"
              />
              <Slider
                title="Tv Show"
                index={index}
                offset={offset}
                //@ts-ignore
                tvShows={data?.results.filter(
                  (result: ISearchTvShow) => result.media_type === "tv"
                )}
                toggleLeaving={toggleLeaving}
                category="search"
              />
            </>
          )}
        </>
      )}
    </Wrapper>
  );
};

export default Search;
