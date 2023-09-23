import "./Sidebar.scss";
import { FC, ReactNode } from "react";
import Typography from "@mui/material/Typography";
import { Link, useLocation, matchPath } from "react-router-dom";

interface ISidebarItemProps {
  link: string;
  title: string;
  icon?: ReactNode;
  exactActivate?: boolean;
  pattern?: string;
}

export const LinkItem: FC<ISidebarItemProps> = ({
  link,
  title,
  icon,
  exactActivate = true,
  pattern = "",
}) => {
  const location = useLocation();

  let isActive =
    (location.pathname === link && exactActivate) ||
    (location.pathname.startsWith(link) && !exactActivate);

  if (location.pathname === "/devices/current" && link === "/devices") {
    isActive = false;
  }
  return (
    <Link
      to={link}
      style={{
        textDecoration: "none",
      }}
    >
      <li style={{ backgroundColor: isActive ? "#6439ff50" : undefined }}>
        {icon}
        <Typography component={"span"} color={isActive ? "#333" : "#888"}>
          {title}
        </Typography>
      </li>
    </Link>
  );
};
