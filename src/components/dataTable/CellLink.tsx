import { BASE_API_URL } from "../../network/Constants";
import "./cellImage.scss";
// import Typography from "@mui/material/Typography";
import { GridRenderCellParams } from "@mui/x-data-grid";
import { Link } from "react-router-dom";

export const CellLink = (props: GridRenderCellParams<string>) => {
  // const { hasFocus, value } = props;
  if (props.row.initiatorId) {
    return <OperatorIdLink {...props} />;
  }

  return <FilePathLink {...props} />;
};

const OperatorIdLink = (props: GridRenderCellParams<string>) => {
  const url = encodeURI(
    "/users/" + props.row.role.toLowerCase() + "/" + props.row.initiatorId
  );
  return (
    <div className="cellLink">
      {props.row.role !== "ADMIN" ? (
        <Link to={url} >{props.row.initiatorId}</Link>
      ) : (
        props.row.initiatorId
      )}
    </div>
  );
};

const FilePathLink = (props: GridRenderCellParams<string>) => {
  const url = encodeURI(
    BASE_API_URL +
      "files/download/stream/" +
      props.row.name?.replace("files:/", "")
  );
  return (
    <div className="cellLink">
      <a href={url} target={"_blank"} rel={"noreferrer"}>
        {props.row.originalName}
      </a>
    </div>
  );
};
