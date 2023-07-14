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
  MdOutlineDevices,
  MdOutlineAutoAwesomeMotion,
  MdOutlineLiveTv,
  MdOutlineBarChart,
  MdOutlineSettings,
  MdOutlineMosque,
} from "react-icons/md";
import { userHasAccess } from "../../utils/UserAccess";

export const Sidebar = () => {
  const authDispatch = useAuthenticationDispatch();
  const authState = useAuthenticationState();
  const navigate = useNavigate();

  return (
    <div className="sidebar">
      <div className="top">
        <Link to={"/"} style={{ textDecoration: "none" }}>
          <img
            className="logo"
            src={require("../../assets/images/icon_title.png")}
            alt="logo"
          />
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
            <Link to={"/users/operator"} style={{ textDecoration: "none" }}>
              <li>
                <MdOutlineGroup className="icon" />
                <Typography component={"span"}>اپراتور ها</Typography>
              </li>
            </Link>
          )}
          {authState.role === "ADMIN" && (
            <Link to={"/users/controller"} style={{ textDecoration: "none" }}>
              <li>
                <MdOutlineGroup className="icon" />
                <Typography component={"span"}>کنترلر ها</Typography>
              </li>
            </Link>
          )}
          {userHasAccess(authState.role, ["ADMIN", "CONTROLLER"]) && (
            <Link to={"/devices"} style={{ textDecoration: "none" }}>
              <li>
                <MdOutlineDevices className="icon" />
                <Typography component={"span"}>دستگاه ها</Typography>
              </li>
            </Link>
          )}

          {userHasAccess(authState.role, ["ADMIN", "OPERATOR"]) && (
            <Link to={"/schedules"} style={{ textDecoration: "none" }}>
              <li>
                <MdOutlineUpdate className="icon" />
                <Typography component={"span"}>برنامه ها</Typography>
              </li>
            </Link>
          )}
          {userHasAccess(authState.role, ["ADMIN", "OPERATOR"]) && (
            <Link to={"/conductors"} style={{ textDecoration: "none" }}>
              <li>
                <MdOutlineAutoAwesomeMotion className="icon" />
                <Typography component={"span"}>سری های پخش</Typography>
              </li>
            </Link>
          )}
          {userHasAccess(authState.role, ["ADMIN", "OPERATOR"]) && (
            <Link to={"/uploads"} style={{ textDecoration: "none" }}>
              <li>
                <MdOutlineCloud className="icon" />
                <Typography component={"span"}>بارگذاری ها</Typography>
              </li>
            </Link>
          )}
          {authState.role === "OPERATOR" && (
            <Link to={"/devices/me"} style={{ textDecoration: "none" }}>
              <li>
                <MdOutlineDevices className="icon" />
                <Typography component={"span"}>دستگاه های من</Typography>
              </li>
            </Link>
          )}
          {userHasAccess(authState.role, ["ADMIN", "OPERATOR"]) && (
            <Link to={"/devices/current"} style={{ textDecoration: "none" }}>
              <li>
                <MdOutlineLiveTv className="icon" />
                <Typography component={"span"}>برنامه در حال پخش</Typography>
              </li>
            </Link>
          )}
          {userHasAccess(authState.role, ["ADMIN"]) && (
            <Link to={"/uploads/azan"} style={{ textDecoration: "none" }}>
              <li>
                <MdOutlineMosque className="icon" />
                <Typography component={"span"}>اذان</Typography>
              </li>
            </Link>
          )}
          {authState.role === "ADMIN" && (
            <>
              <Typography className="title" component={"p"}>
                گزارش ها
              </Typography>

              <Link to={"/statistics"} style={{ textDecoration: "none" }}>
                <li>
                  <MdOutlineBarChart className="icon" />
                  <Typography component={"span"}>آمار دستگاه ها</Typography>
                </li>
              </Link>
            </>
          )}
          {userHasAccess(authState.role, ["ADMIN"]) && (
            <>
              <Typography className="title" component={"p"}>
                تنظیمات
              </Typography>

              <Link
                to={"/settings/loginBackground"}
                style={{ textDecoration: "none" }}
              >
                <li>
                  <MdOutlineSettings className="icon" />
                  <Typography component={"span"}>تصویر صفحه ورود</Typography>
                </li>
              </Link>
              <Link
                to={"/settings/fileLimits"}
                style={{ textDecoration: "none" }}
              >
                <li>
                  <MdOutlineSettings className="icon" />
                  <Typography component={"span"}>محدودیت فایل ها</Typography>
                </li>
              </Link>
            </>
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
