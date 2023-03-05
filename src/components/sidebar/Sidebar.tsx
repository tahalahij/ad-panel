import "./Sidebar.scss";
import Typography from "@mui/material/Typography";
import { Link, useNavigate } from "react-router-dom";
import {
  useAuthenticationDispatch,
  useAuthenticationState,
} from "../../context";
import {
  MdOutlineDashboard,
  MdOutlineGroup,
  MdOutlineUpdate,
  MdOutlineCloud,
  MdOutlineLogout,
  MdLockReset,
} from "react-icons/md";

export const Sidebar = () => {
  const authDispatch = useAuthenticationDispatch();
  const authState = useAuthenticationState();
  const navigate = useNavigate();

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
              <MdOutlineDashboard className="icon" />
              <Typography component={"span"}>داشبورد</Typography>
            </li>
          </Link>
          <Typography className="title" component={"p"}>
            لیست ها
          </Typography>
          {authState.role === "ADMIN" && (
            <Link to={"/users"} style={{ textDecoration: "none" }}>
              <li>
                <MdOutlineGroup className="icon" />
                <Typography component={"span"}>اپراتور ها</Typography>
              </li>
            </Link>
          )}
          {authState.role === "OPERATOR" && (
            <Link to={"/schedules"} style={{ textDecoration: "none" }}>
              <li>
                <MdOutlineUpdate className="icon" />
                <Typography component={"span"}>برنامه ها</Typography>
              </li>
            </Link>
          )}
          {authState.role === "OPERATOR" && (
            <Link to={"/uploads"} style={{ textDecoration: "none" }}>
              <li>
                <MdOutlineCloud className="icon" />
                <Typography component={"span"}>بارگذاری ها</Typography>
              </li>
            </Link>
          )}
          <Typography className="title" component={"p"}>
            کاربر
          </Typography>
          <Link to={"/users/resetPassword"} style={{ textDecoration: "none" }}>
            <li>
              <MdLockReset className="icon" />
              <Typography component={"span"}>تغییر رمز عبور</Typography>
            </li>
          </Link>
          {/* <li>
            <AccountCircleOutlinedIcon className="icon" />
            <Typography component={"span"}>پروفایل</Typography>
          </li> */}
          <li
            onClick={() => {
              authDispatch({ type: "LOGOUT" });
              navigate("/");
            }}
          >
            <MdOutlineLogout className="icon" />
            <Typography component={"span"}>خروج</Typography>
          </li>
        </ul>
      </div>
      {/* <div className="bottom">
        <div className="colorOption" />
        <div className="colorOption" />
      </div> */}
    </div>
  );
};
