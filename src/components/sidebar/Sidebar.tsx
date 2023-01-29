import "./Sidebar.scss";
import Typography from "@mui/material/Typography";
import DashboardOutlinedIcon from "@mui/icons-material/DashboardOutlined";
import GroupOutlinedIcon from "@mui/icons-material/GroupOutlined";
import UpdateOutlinedIcon from "@mui/icons-material/UpdateOutlined";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";

export const Sidebar = () => {
  return (
    <div className="sidebar">
      <div className="top">
        <Typography component={"span"} className="logo">
          SCHEDULER
        </Typography>
      </div>
      <hr />
      <div className="center">
        <ul>
          <Typography className="title" component={"p"}>
            اصلی
          </Typography>
          <li>
            <DashboardOutlinedIcon className="icon" />
            <Typography component={"span"}>داشبورد</Typography>
          </li>
          <Typography className="title" component={"p"}>
            لیست ها
          </Typography>
          <li>
            <GroupOutlinedIcon className="icon" />
            <Typography component={"span"}>کاربران</Typography>
          </li>
          <li>
            <UpdateOutlinedIcon className="icon" />
            <Typography component={"span"}>برنامه ها</Typography>
          </li>
          <Typography className="title" component={"p"}>
            کاربر
          </Typography>
          <li>
            <AccountCircleOutlinedIcon className="icon" />
            <Typography component={"span"}>پروفایل</Typography>
          </li>
          <li>
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
