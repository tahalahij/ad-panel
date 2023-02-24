import "./Sidebar.scss";
import Typography from "@mui/material/Typography";
import DashboardOutlinedIcon from "@mui/icons-material/DashboardOutlined";
import GroupOutlinedIcon from "@mui/icons-material/GroupOutlined";
import UpdateOutlinedIcon from "@mui/icons-material/UpdateOutlined";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import CloudUploadOutlinedIcon from "@mui/icons-material/CloudUploadOutlined";
import { Link } from "react-router-dom";
import {
  useAuthenticationDispatch,
  useAuthenticationState,
} from "../../context";

export const Sidebar = () => {
  const authDispatch = useAuthenticationDispatch();
  const authState = useAuthenticationState();

  return (
    <div className="sidebar">
      <div className="top">
        <Link to={"/"} style={{ textDecoration: "none" }}>
          <Typography component={"span"} className="logo">
            SCHEDULER
          </Typography>
        </Link>
      </div>
      <hr />
      <div className="center">
        <ul>
          <Typography className="title" component={"p"}>
            اصلی
          </Typography>
          <Link to={"/"} style={{ textDecoration: "none" }}>
            <li>
              <DashboardOutlinedIcon className="icon" />
              <Typography component={"span"}>داشبورد</Typography>
            </li>
          </Link>
          <Typography className="title" component={"p"}>
            لیست ها
          </Typography>
          {authState.role === "ADMIN" && (
            <Link to={"/users"} style={{ textDecoration: "none" }}>
              <li>
                <GroupOutlinedIcon className="icon" />
                <Typography component={"span"}>کاربران</Typography>
              </li>
            </Link>
          )}
          {authState.role === "OPERATOR" && (
            <Link to={"/schedules"} style={{ textDecoration: "none" }}>
              <li>
                <UpdateOutlinedIcon className="icon" />
                <Typography component={"span"}>برنامه ها</Typography>
              </li>
            </Link>
          )}
          {authState.role === "OPERATOR" && (
            <Link to={"/uploads"} style={{ textDecoration: "none" }}>
              <li>
                <CloudUploadOutlinedIcon className="icon" />
                <Typography component={"span"}>بارگذاری ها</Typography>
              </li>
            </Link>
          )}
          <Typography className="title" component={"p"}>
            کاربر
          </Typography>
          {/* <li>
            <AccountCircleOutlinedIcon className="icon" />
            <Typography component={"span"}>پروفایل</Typography>
          </li> */}
          <li onClick={() => authDispatch({ type: "LOGOUT" })}>
            <LogoutOutlinedIcon className="icon" />
            <Typography component={"span"}>خروج</Typography>
          </li>
        </ul>
      </div>
      <div className="bottom">
        <div className="colorOption" />
        <div className="colorOption" />
      </div>
    </div>
  );
};
