import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { styled } from "styled-components";
import { IMovie } from "../api";
import { useEffect } from "react";

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
  background-color: red;
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
            <h2>{movie.title}</h2>
          </>
        )}
      </Wrapper>
    </>
  );
};

export default BigMovie;
