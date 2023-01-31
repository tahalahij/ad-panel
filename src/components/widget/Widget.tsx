import "./widget.scss";
import { FC, ReactNode } from "react";
import Typography from "@mui/material/Typography";
import KeyboardArrowUpOutlinedIcon from "@mui/icons-material/KeyboardArrowUpOutlined";
import KeyboardArrowDownOutlinedIcon from "@mui/icons-material/KeyboardArrowDownOutlined";
import AccountBalanceWalletOutlinedIcon from "@mui/icons-material/AccountBalanceWalletOutlined";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import MonetizationOnOutlinedIcon from "@mui/icons-material/MonetizationOnOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import { convertToCurrency } from "../../utils/Utils";

export const enum WIDGET_TYPE {
  users = "users",
  orders = "orders",
  earnings = "earnings",
  balance = "balance",
}

type WidgetProps = {
  type: WIDGET_TYPE;
};

type WidgetData = {
  title: string;
  isMoney: boolean;
  linkTitle: string;
  icon: ReactNode;
};

export const Widget: FC<WidgetProps> = ({ type }) => {
  let data: WidgetData;

  //   mock values
  const amount = 2300000;
  const percentage = 20;

  switch (type) {
    case WIDGET_TYPE.users:
      data = {
        title: "کاربران",
        isMoney: false,
        linkTitle: "مشاهده همه",
        icon: (
          <PersonOutlinedIcon
            className="icon"
            style={{
              color: "crimson",
              backgroundColor: "rgba(255, 0, 0, 0.2)",
            }}
          />
        ),
      };
      break;
    case WIDGET_TYPE.orders:
      data = {
        title: "سفارشات",
        isMoney: false,
        linkTitle: "مشاهده همه",
        icon: (
          <ShoppingCartOutlinedIcon
            className="icon"
            style={{
              color: "goldenrod",
              backgroundColor: "rgba(218, 165, 32, 0.2)",
            }}
          />
        ),
      };
      break;
    case WIDGET_TYPE.earnings:
      data = {
        title: "درآمدها",
        isMoney: true,
        linkTitle: "مشاهده همه",
        icon: (
          <MonetizationOnOutlinedIcon
            className="icon"
            style={{
              color: "green",
              backgroundColor: "rgba(0, 128, 0, 0.2)",
            }}
          />
        ),
      };
      break;
    case WIDGET_TYPE.balance:
      data = {
        title: "موجودی",
        isMoney: true,
        linkTitle: "مشاهده جزئیات",
        icon: (
          <AccountBalanceWalletOutlinedIcon
            className="icon"
            style={{
              color: "purple",
              backgroundColor: "rgba(128, 0, 128, 0.2)",
            }}
          />
        ),
      };
      break;
    default:
      data = {
        title: "",
        isMoney: false,
        linkTitle: "",
        icon: null,
      };
      break;
  }

  return (
    <div className="widget">
      <div className="left">
        <Typography component={"span"} className="title">
          {data.title}
        </Typography>
        <Typography component={"span"} className="counter">
          {convertToCurrency(amount, { withComma: true })}{" "}
          {data.isMoney && (
            <Typography component={"span"} className="moneySign">
              {"تومان"}
            </Typography>
          )}
        </Typography>
        <Typography component={"span"} className="link">
          {data.linkTitle}
        </Typography>
      </div>
      <div className="right">
        <div className="percentage positive">
          <KeyboardArrowUpOutlinedIcon />
          <Typography>{percentage} %</Typography>
        </div>
        {data.icon}
      </div>
    </div>
  );
};
