import "./cellImage.scss";
// import Typography from "@mui/material/Typography";
import { GridRenderCellParams } from "@mui/x-data-grid";

export const CellLink = (props: GridRenderCellParams<string>) => {
  // const { hasFocus, value } = props;
  return (
    <div className="cellLink">
      <a href={props.row.path} target={"_blank"} rel={"noreferrer"}>
        {props.row.path}
      </a>
    </div>
  );
};
