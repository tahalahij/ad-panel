import "./Home.scss";
import Typography from "@mui/material/Typography";
import {
  Sidebar,
  Navbar,
  Widget,
  WIDGET_TYPE,
  Featured,
  Chart,
  Table,
} from "../../components";

export const Home = () => {
  return (
    <div className="home">
      <div className="widgets">
        <Widget type={WIDGET_TYPE.users} />
        <Widget type={WIDGET_TYPE.orders} />
        <Widget type={WIDGET_TYPE.earnings} />
        <Widget type={WIDGET_TYPE.balance} />
      </div>
      <div className="charts">
        <Featured />
        <Chart />
      </div>
      <div className="listContainer">
        <Typography className="listTitle">آخرین تراکنش ها</Typography>
        <Table />
      </div>
    </div>
  );
};
