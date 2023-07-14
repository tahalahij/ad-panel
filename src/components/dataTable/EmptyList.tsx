import "./emptyList.scss";
import Typography from "@mui/material/Typography";
import { MdOutlineInbox } from "react-icons/md";

export const EmptyList = ({title = 'مورد'}) => {
  // const { hasFocus, value } = props;
  return (
    <div className="emptyList">
      <MdOutlineInbox fontSize={200} color="#333333" />
      <Typography variant="h6">{`هیچ ${title}ی پیدا نشد.`}</Typography>
    </div>
  );
};
