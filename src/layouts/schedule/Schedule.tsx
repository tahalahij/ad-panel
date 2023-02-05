import "./schedule.scss";
import { FC, useState, useRef } from "react";
import Typography from "@mui/material/Typography";
import { DataTable } from "../../components";
import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import ReorderIcon from "@mui/icons-material/Reorder";
import { useScheduleData } from "./data/useScheduleData";
import { SortingList, SortListMethods } from "./SortingList";

type ScheduleProps = {};

export const Schedule: FC<ScheduleProps> = () => {
  const navigate = useNavigate();
  const scheduleList = useScheduleData();

  const [isOrdering, setOrdering] = useState(false);

  const sortListRef = useRef<SortListMethods>(null);

  const submitSort = () => {
    const tempArray = sortListRef.current
      ?.getOrderedList()
      .map((item) => item.objectId);
    console.log(tempArray);
  };

  return (
    <div className="schedule">
      <div className="header">
        <Typography variant="h6">{"افزودن برنامه جدید"}</Typography>

        <div className="buttonContainer">
          {isOrdering ? (
            <Button variant="contained" onClick={submitSort}>
              ثبت تغییرات
            </Button>
          ) : (
            <>
              <Button
                variant="outlined"
                onClick={() => setOrdering(true)}
                startIcon={<ReorderIcon />}
              >
                تغییر ترتیب
              </Button>
              <Button
                variant="contained"
                onClick={() => navigate("/schedules/new")}
                startIcon={<AddIcon />}
              >
                افزودن
              </Button>
            </>
          )}
        </div>
      </div>
      {isOrdering ? (
        <SortingList listData={scheduleList} ref={sortListRef} />
      ) : (
        <DataTable />
      )}
    </div>
  );
};
