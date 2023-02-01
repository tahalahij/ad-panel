import './cellImage.scss';
import Typography from "@mui/material/Typography";
import { GridRenderCellParams } from "@mui/x-data-grid";
const Gravatar = require("react-gravatar");

export const CellImage = (props: GridRenderCellParams<string>) => {
  // const { hasFocus, value } = props;
  return (
    <div className="cellImage">
      <Gravatar
        email={props.row.email}
        size={30}
        rating="g"
        default="identicon"
        className="avatar"
        protocol="https://"
      />
      <Typography>{props.row.userName}</Typography>
    </div>
  );
};
