import "./cellOnlineStatus.scss";
import { GridRenderCellParams } from "@mui/x-data-grid";

export const CellOnlineStatus = (props: GridRenderCellParams<string>) => {
  const className = `status ${props.row.isOnline ? "online" : "offline"}`;
  return (
    <div className="cellOnlineStatus">
      <div className={className} />
    </div>
  );
};
