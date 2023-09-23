import "./Sidebar.scss";
import Typography from "@mui/material/Typography";
import { Link } from "react-router-dom";
import { useAuthenticationState } from "../../context";
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
import { logoutUnAuthorized } from "../../network/useLogout";
import { LinkItem } from "./Item";

export const Sidebar = () => {
  const authState = useAuthenticationState();

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
          <LinkItem
            link="/"
            title="داشبورد"
            icon={<MdOutlineDashboard className="icon" />}
          />
          <Typography className="title" component={"p"}>
            لیست ها
          </Typography>
          {authState.role === "ADMIN" && (
            <LinkItem
              link="/users/operator"
              title="اپراتور ها"
              icon={<MdOutlineGroup className="icon" />}
              exactActivate={false}
            />
          )}
          {authState.role === "ADMIN" && (
            <LinkItem
              link="/users/controller"
              title="کنترلر ها"
              icon={<MdOutlineGroup className="icon" />}
              exactActivate={false}
            />
          )}
          {userHasAccess(authState.role, ["ADMIN", "CONTROLLER"]) && (
            <LinkItem
              link="/devices"
              title="دستگاه ها"
              icon={<MdOutlineDevices className="icon" />}
              exactActivate={false}
              pattern="/devices/:deviceId"
            />
          )}

          <LinkItem
            link="/schedules"
            title="برنامه ها"
            icon={<MdOutlineUpdate className="icon" />}
            // exactActivate=
          />

          <LinkItem
            link="/conductors"
            title="سری های پخش"
            icon={<MdOutlineAutoAwesomeMotion className="icon" />}
          />

          <LinkItem
            link="/uploads"
            title="بارگذاری ها"
            icon={<MdOutlineCloud className="icon" />}
          />

          {authState.role === "OPERATOR" && (
            <LinkItem
              link="/devices/me"
              title="دستگاه های من"
              icon={<MdOutlineDevices className="icon" />}
            />
          )}
          <LinkItem
            link="/devices/current"
            title="برنامه در حال پخش"
            icon={<MdOutlineLiveTv className="icon" />}
          />

          {userHasAccess(authState.role, ["ADMIN"]) && (
            <LinkItem
              link="/uploads/azan"
              title="اذان"
              icon={<MdOutlineMosque className="icon" />}
            />
          )}
          {authState.role === "ADMIN" && (
            <>
              <Typography className="title" component={"p"}>
                گزارش ها
              </Typography>

              <LinkItem
                link="/statistics"
                title="آمار دستگاه ها"
                icon={<MdOutlineBarChart className="icon" />}
              />
            </>
          )}
          {userHasAccess(authState.role, ["ADMIN"]) && (
            <>
              <Typography className="title" component={"p"}>
                تنظیمات
              </Typography>
              <LinkItem
                link="/settings/loginBackground"
                title="تصویر صفحه ورود"
                icon={<MdOutlineSettings className="icon" />}
              />
              <LinkItem
                link="/settings/fileLimits"
                title="محدودیت فایل ها"
                icon={<MdOutlineSettings className="icon" />}
              />
            </>
          )}
          <Typography className="title" component={"p"}>
            کاربر
          </Typography>
          <LinkItem
            link="/users/resetPassword"
            title="تغییر رمز عبور"
            icon={<MdLockReset className="icon" />}
          />

          {/* <li>
            <AccountCircleOutlinedIcon className="icon" />
            <Typography component={"span"}>پروفایل</Typography>
          </li> */}
          <li onClick={() => logoutUnAuthorized()}>
            <MdOutlineLogout className="icon" />
            <Typography id="logout" component={"span"}>
              خروج
            </Typography>
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
