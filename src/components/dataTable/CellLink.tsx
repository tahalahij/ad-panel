import { BASE_API_URL } from "../../network/Constants";
import "./cellImage.scss";
// import Typography from "@mui/material/Typography";
import { GridRenderCellParams } from "@mui/x-data-grid";

export const CellLink = (props: GridRenderCellParams<string>) => {
  // const { hasFocus, value } = props;
  const url = encodeURI(BASE_API_URL + "files/download/stream/" + props.row.path.replace('files:/', ''))
  return (
    <div className="cellLink">
      <a href={url} target={"_blank"} rel={"noreferrer"}>
        {'لینک فایل'}
      </a>
    </div>
  );
};
