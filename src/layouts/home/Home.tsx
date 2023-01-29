import "./Home.scss";
import Typography from "@mui/material/Typography";
import { Sidebar } from "../../components";

export const Home = () => {
  return (
    <div className="home">
      <Sidebar />
      <div className="homeContainer">container</div>
    </div>
  );
};
