import "./featured.scss";
import { CircularProgressbar } from "react-circular-progressbar";
import Typography from "@mui/material/Typography";
import "react-circular-progressbar/dist/styles.css";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import KeyboardArrowDownOutlinedIcon from "@mui/icons-material/KeyboardArrowDownOutlined";
import KeyboardArrowUpOutlinedIcon from "@mui/icons-material/KeyboardArrowUpOutlined";
import {
  convertCurrencyToHighValueReadable,
  convertToCurrency,
} from "../../utils/Utils";

export const Featured = () => {
  return (
    <div className="featured">
      <div className="top">
        <Typography variant="h1" className="title">
          مجموع درآمد
        </Typography>
        <MoreVertIcon fontSize="small" />
      </div>
      <div className="bottom">
        <div className="featuredChart">
          <CircularProgressbar value={70} text="70%" strokeWidth={5} />
        </div>
        <Typography component={"p"} className="title">
          مجموع فروش امروز
        </Typography>
        <Typography component={"p"} className="amount">
          {convertToCurrency(230000, { withComma: true, appendToman: true })}
        </Typography>
        <Typography component={"p"} className="desc">
          {"پرداخت های گذشته را شامل نمی‌شود"}
        </Typography>
        <div className="summary">
          <div className="item">
            <Typography className="itemTitle">هدف</Typography>
            <div className="itemResult positive">
              <KeyboardArrowUpOutlinedIcon fontSize="small" />
              <Typography className="resultAmount">
                {convertCurrencyToHighValueReadable(120000)}
              </Typography>
            </div>
          </div>
          <div className="item">
            <Typography className="itemTitle">هفته گذشته</Typography>
            <div className="itemResult negative">
              <KeyboardArrowDownOutlinedIcon fontSize="small" />
              <Typography className="resultAmount">
                {convertCurrencyToHighValueReadable(120000)}
              </Typography>
            </div>
          </div>
          <div className="item">
            <Typography className="itemTitle">ماه گذشته</Typography>
            <div className="itemResult positive">
              <KeyboardArrowUpOutlinedIcon fontSize="small" />
              <Typography className="resultAmount">
                {convertCurrencyToHighValueReadable(120000)}
              </Typography>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
