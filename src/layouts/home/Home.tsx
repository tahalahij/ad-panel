import "./Home.scss";
import Typography from "@mui/material/Typography";
import { Sidebar, Navbar } from "../../components";

export const Home = () => {
  return (
    <div className="home">
      <Sidebar />
      <div className="homeContainer">
        <Navbar />
        home container
      </div>
    </div>
  );
};
