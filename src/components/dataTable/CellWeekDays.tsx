import Chip from "@mui/material/Chip";
import Box from "@mui/material/Box";
import { WeekDays } from "../../types/ScheduleTypes";
import { getReadableDay } from "../../utils/Utils";
import { GridRenderCellParams } from "@mui/x-data-grid";

type CellWeekDaysProps =
  | {
      list: WeekDays[];
    }
  | GridRenderCellParams<WeekDays[]>;

export function CellWeekDays(props: CellWeekDaysProps) {
  let list: WeekDays[] = [];
  if ('list' in props) {
    list = props.list;
  } else {
    list = props.row.day
  }
  return (
    <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
      {list.map((value) => (
        <Chip key={value} label={getReadableDay(value)} />
      ))}
    </Box>
  );
}
