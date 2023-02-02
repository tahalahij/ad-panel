import "./single.scss";
import Typography from "@mui/material/Typography";
import { Chart, Table } from "../../components";
const Gravatar = require("react-gravatar");

export const Single = () => {
  return (
    <div className="single">
      <div className="top">
        <div className="left">
          <div className="editButton">
            <Typography>ویرایش</Typography>
          </div>
          <Typography component={"h1"} variant="h5" className="title">
            اطلاعات
          </Typography>
          <div className="item">
            {/* <img src="" alt="" className="itemImage" /> */}
            <Gravatar
              email={"simple.mail@gmail.com"}
              size={100}
              rating="g"
              default="identicon"
              className="itemImage"
              protocol="https://"
            />
            <div className="details">
              <Typography component={"h1"} variant="h3" className="itemTitle">
                محمد عظیمی
              </Typography>
              <div className="detailItem">
                <Typography component={"span"} className="itemKey">
                  ایمیل:
                </Typography>
                <Typography component={"span"} className="itemValue">
                  simple@gmail.com
                </Typography>
              </div>
              <div className="detailItem">
                <Typography component={"span"} className="itemKey">
                  موبایل:
                </Typography>
                <Typography component={"span"} className="itemValue">
                  simple@gmail.com
                </Typography>
              </div>
              <div className="detailItem">
                <Typography component={"span"} className="itemKey">
                  آدرس:
                </Typography>
                <Typography component={"span"} className="itemValue">
                  تهران، میدان امام حسین، خیابان قجاوند، پلاک 24
                </Typography>
              </div>
            </div>
          </div>
        </div>
        <div className="right">
          <Chart aspect={3 / 1} title={"تراکنش های کاربر (6 ماه گذشته)"} />
        </div>
      </div>
      <div className="bottom">
        <Typography component={"h1"} variant="h5" className="title">
          آخرین تراکنش ها
        </Typography>
        <Table />
      </div>
    </div>
  );
};
