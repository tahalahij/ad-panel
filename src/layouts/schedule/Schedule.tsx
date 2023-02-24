import "./schedule.scss";
import { FC, useState, useRef } from "react";
import Typography from "@mui/material/Typography";
import { DataTable } from "../../components";
import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import LoadingButton from "@mui/lab/LoadingButton";
import AddIcon from "@mui/icons-material/Add";
import ReorderIcon from "@mui/icons-material/Reorder";
import { useScheduleData } from "./data/useScheduleData";
import { SortingList, SortListMethods } from "./SortingList";
import { updateSchedulesRequest } from "../../network/requests/FileRequests";

type ScheduleProps = {};

export const Schedule: FC<ScheduleProps> = () => {
  const navigate = useNavigate();
  const scheduleList = useScheduleData();

  const [isOrdering, setOrdering] = useState(true);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{
    title: string;
    type?: "success" | "error";
  }>({ title: "" });

  const sortListRef = useRef<SortListMethods>(null);

  const submitSort = async () => {
    setLoading(true);
    const tempArray = sortListRef.current
      ?.getOrderedList()
      .map((item) => item._id);
    const response = await updateSchedulesRequest(tempArray!);
    if (response.success) {
      setMessage({ title: "با موفقیت ثبت شد", type: "success" });
      setTimeout(() => {
        navigate(-1);
      }, 2000);
    } else {
      setMessage({
        title: "خطایی در ثبت تغییرات رخ داده است",
        type: "error",
      });
    }
    setLoading(false);
    console.log(tempArray);
  };

  return (
    <div className="schedule">
      <div className="header">
        <Typography variant="h6">{"افزودن برنامه جدید"}</Typography>

        <div className="buttonContainer">
          {isOrdering ? (
            <LoadingButton
              loading={loading}
              variant="contained"
              onClick={submitSort}
            >
              ثبت تغییرات
            </LoadingButton>
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
      <SortingList listData={scheduleList} ref={sortListRef} />
      {/* {isOrdering ? (
        <SortingList listData={scheduleList} ref={sortListRef} />
      ) : (
        <DataTable columnKey="schedule" />
      )} */}
      <Snackbar
        open={!!message.title}
        // message={error}
        autoHideDuration={5000}
        anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
        onClose={() => setMessage({ title: "" })}
      >
        <Alert severity={message.type} sx={{ width: "100%" }}>
          {message.title}
        </Alert>
      </Snackbar>
    </div>
  );
};
