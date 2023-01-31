import "./navbar.scss";
// import Typography from "@mui/material/Typography";
// import TextField from "@mui/material/TextField";
// import InputAdornment from "@mui/material/InputAdornment";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import LanguageOutlinedIcon from "@mui/icons-material/LanguageOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import FullscreenExitOutlinedIcon from "@mui/icons-material/FullscreenExitOutlined";
import ChatBubbleOutlineOutlinedIcon from "@mui/icons-material/ChatBubbleOutlineOutlined";
import NotificationsNoneOutlinedIcon from "@mui/icons-material/NotificationsNoneOutlined";
import ListOutlinedIcon from "@mui/icons-material/ListOutlined";
// import Avatar from "@mui/material/Avatar";
const Gravatar = require("react-gravatar");

export const Navbar = () => {
  return (
    <div className="navbar">
      <div className="wrapper">
        <div className="search">
          {/* <TextField
            id="input-with-icon-textfield"
            // label="TextField"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchOutlinedIcon />
                </InputAdornment>
              ),
            }}
            variant="outlined"
          /> */}
          <input type="text" placeholder="جست و جو" />
          <SearchOutlinedIcon className="icon" />
        </div>

        <div className="items">
          <div className="item">
            <LanguageOutlinedIcon className="icon" />
            فارسی
          </div>
          <div className="item">
            <DarkModeOutlinedIcon className="icon" />
          </div>
          <div className="item">
            <FullscreenExitOutlinedIcon className="icon" />
          </div>
          {/* <div className="item">
            <NotificationsNoneOutlinedIcon className="icon" />
            <div className="counter">1</div>
          </div> */}
          <div className="item">
            <ChatBubbleOutlineOutlinedIcon className="icon" />
            <div className="counter">2</div>
          </div>
          <div className="item">
            <ListOutlinedIcon className="icon" />
          </div>
          <div className="item">
            <Gravatar
              email="simple.mail@gmail.com"
              size={30}
              rating="g"
              default="identicon"
              className="avatar"
              protocol="https://"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
