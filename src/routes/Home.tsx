import { useQuery } from "react-query";
import { getMovies } from "../api";

const Home = () => {
  const { data, isLoading, error } = useQuery(
    ["movies", "now_playing"],
    getMovies
  );
  console.log(data);
  return (
    <div style={{ height: "300vh" }}>
      <h1>Home</h1>
    </div>
  );
};

export default Home;
