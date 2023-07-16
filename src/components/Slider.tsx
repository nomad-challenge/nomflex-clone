import { AnimatePresence, motion, useScroll } from "framer-motion";
import { useMatch, useNavigate } from "react-router-dom";
import { styled } from "styled-components";
import { makeImagePath } from "../utils";
import { IMovie, ITvShow } from "../api";
import BigMovie from "./BigMovie";
import BigTvShow from "./BigTvShow";

const Container = styled.div`
  position: relative;
  top: -200px;
  margin-bottom: 50px;
  height: 150px;
`;
const Row = styled(motion.div)`
  display: grid;
  gap: 5px;
  grid-template-columns: repeat(6, 1fr);
  position: absolute;
  width: 100%;
  height: 100%;
`;
const Box = styled(motion.div)<{ bgPhoto: string }>`
  font-size: 60px;
  height: 100%;
  background-image: url(${(props) => props.bgPhoto});
  background-size: cover;
  background-position: center center;
  cursor: pointer;
  &:first-child {
    transform-origin: center left;
  }
  &:last-child {
    transform-origin: center right;
  }
`;

const Info = styled(motion.div)`
  padding: 10px;
  background-color: ${(props) => props.theme.black.lighter};
  opacity: 0;
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  h4 {
    font-size: 18px;
    text-align: center;
  }
`;

const SliderTitle = styled.h3`
  font-size: 24px;
  padding: 5px 10px;
`;

const boxVariants = {
  normal: { scale: 1 },
  hover: {
    y: -50,
    scale: 1.3,
    transition: { type: "tween", duration: 0.3, delay: 0.5 },
  },
};
const infoVariants = {
  hover: {
    opacity: 1,
    transition: { type: "tween", duration: 0.3, delay: 0.5 },
  },
};

interface ISlider {
  title: string;
  index: number;
  offset: number;
  category: "movies" | "tv" | "search";
  movies?: IMovie[];
  tvShows?: ITvShow[];
  toggleLeaving: () => void;
}
const Slider: React.FC<ISlider> = ({
  title,
  index,
  offset,
  movies,
  tvShows,
  category,
  toggleLeaving,
}) => {
  const paramId =
    category === "movies" ? ":movieId" : category === "tv" ? ":tvShowId" : "";
  const matchUrl = `/${category}/${title.replaceAll(" ", "").toLowerCase()}`;
  const bigMovieMatch = useMatch(`${matchUrl}/${paramId}`);
  const { scrollY } = useScroll();
  const navigate = useNavigate();
  const onBoxClick = (movieId: number) => {
    if (category === "search") return;
    navigate(`${matchUrl}/${movieId}`);
  };
  const onTvShowBoxClick = (tvShowId: number) => {
    if (category === "search") return;
    navigate(`${matchUrl}/${tvShowId}`);
  };
  return (
    <>
      <Container>
        <SliderTitle>{title}</SliderTitle>
        <AnimatePresence initial={false} onExitComplete={toggleLeaving}>
          <Row
            initial={{ x: window.outerWidth + 5 }}
            animate={{ x: 0 }}
            exit={{ x: -window.outerWidth - 5 }}
            key={index}
            transition={{ type: "tween", duration: 0.8 }}
          >
            {movies &&
              movies
                .slice(offset * index, offset * index + offset)
                .map((movie) => (
                  <Box
                    key={movie.id}
                    bgPhoto={makeImagePath(
                      movie.backdrop_path || movie.poster_path,
                      "w400"
                    )}
                    variants={boxVariants}
                    initial="normal"
                    whileHover="hover"
                    transition={{ type: "tween" }}
                    onClick={() => onBoxClick(movie.id)}
                    layoutId={String(movie.id) + title}
                  >
                    <Info variants={infoVariants}>
                      <h4>{movie.title}</h4>
                    </Info>
                  </Box>
                ))}
            {tvShows &&
              tvShows
                .slice(offset * index, offset * index + offset)
                .map((tvShow) => (
                  <Box
                    key={tvShow.id}
                    bgPhoto={makeImagePath(
                      tvShow.backdrop_path || tvShow.poster_path,
                      "w400"
                    )}
                    variants={boxVariants}
                    initial="normal"
                    whileHover="hover"
                    transition={{ type: "tween" }}
                    onClick={() => onTvShowBoxClick(tvShow.id)}
                    layoutId={String(tvShow.id) + title}
                  >
                    <Info variants={infoVariants}>
                      <h4>{tvShow.name}</h4>
                    </Info>
                  </Box>
                ))}
          </Row>
        </AnimatePresence>
      </Container>
      <AnimatePresence>
        {movies && bigMovieMatch?.params.movieId ? (
          <BigMovie
            layoutId={bigMovieMatch.params.movieId + title}
            scrollY={scrollY.get()}
            movie={movies?.find(
              (movie) => String(movie.id) === bigMovieMatch?.params.movieId
            )}
          />
        ) : null}
        {tvShows && bigMovieMatch?.params.tvShowId ? (
          <BigTvShow
            layoutId={bigMovieMatch.params.tvShowId + title}
            scrollY={scrollY.get()}
            tvShow={tvShows?.find(
              (tvShow) => String(tvShow.id) === bigMovieMatch?.params.tvShowId
            )}
          />
        ) : null}
      </AnimatePresence>
    </>
  );
};

export default Slider;
