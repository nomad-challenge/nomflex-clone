import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { styled } from "styled-components";
import { IMovie } from "../api";
import { useEffect } from "react";
import { makeImagePath } from "../utils";

const Overlay = styled(motion.div)`
  position: fixed;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  opacity: 0;
`;
const Wrapper = styled(motion.div)`
  position: absolute;
  width: 40vw;
  height: 80vh;
  right: 0px;
  left: 0px;
  margin: 0px auto;
  border-radius: 10px;
  overflow: hidden;
  background-color: ${(props) => props.theme.black.lighter};
`;

const BigCover = styled.div`
  width: 100%;
  height: 400px;
  background-size: cover;
  background-position: center center;
`;
const BigTitle = styled.h2`
  font-size: 46px;
  padding: 20px;
  top: -80px;
  position: relative;
`;
const BigOverview = styled.p`
  padding: 20px;
  top: -80px;
  position: relative;
`;
interface IBigMovie {
  movieId: string;
  scrollY: number;
  movie?: IMovie;
}
const BigMovie: React.FC<IBigMovie> = ({ movieId, scrollY, movie }) => {
  const navigate = useNavigate();
  const onOverlayClick = () => navigate("/");
  useEffect(() => {
    console.log(movie);
  }, [movie]);
  return (
    <>
      <Overlay
        onClick={onOverlayClick}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      />
      <Wrapper layoutId={movieId} style={{ top: scrollY + 100 }}>
        {movie && (
          <>
            <BigCover
              style={{
                backgroundImage: `linear-gradient(to top, black, transparent), url(${makeImagePath(
                  movie.backdrop_path,
                  "w500"
                )})`,
              }}
            />
            <BigTitle>{movie.title}</BigTitle>
            <BigOverview>{movie.overview}</BigOverview>
          </>
        )}
      </Wrapper>
    </>
  );
};

export default BigMovie;
