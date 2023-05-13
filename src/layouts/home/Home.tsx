import "./Home.scss";
import Typography from "@mui/material/Typography";
import { useAuthenticationState } from "../../context";
// import {
//   Sidebar,
//   Navbar,
//   Widget,
//   WIDGET_TYPE,
//   Featured,
//   Chart,
//   Table,
// } from "../../components";

export const Home = () => {
  const authState = useAuthenticationState();
  return (
    <div className="home homeCenter">
      <img className="logo" src={require("../../assets/images/icon_title.jpeg")} alt="logo" />
      <Typography variant="h3">خوش آمدید</Typography>
      <br />
      <br />
      <Typography>{`شما دسترسی ${authState.role} دارید`}</Typography>
      <Typography>{`از منوی سمت راست می‌توانید به قسمت های مختلف برنامه دسترسی داشته باشید`}</Typography>
    </div>
  );
  // return (
  //   <div className="home">
  //     <div className="widgets">
  //       <Widget type={WIDGET_TYPE.users} />
  //       <Widget type={WIDGET_TYPE.orders} />
  //       <Widget type={WIDGET_TYPE.earnings} />
  //       <Widget type={WIDGET_TYPE.balance} />
  //     </div>
  //     <div className="charts">
  //       <Featured />
  //       <Chart title="درآمد 6 ماه گذشته" />
  //     </div>
  //     <div className="listContainer">
  //       <Typography className="listTitle">آخرین تراکنش ها</Typography>
  //       <Table />
  //     </div>
  //   </div>
  // );
};
