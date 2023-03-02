import "./schedule.scss";
import { FC, useState, useRef } from "react";
import Typography from "@mui/material/Typography";
import { DataTable } from "../../components";
import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import LoadingButton from "@mui/lab/LoadingButton";
import CircularProgress from "@mui/material/CircularProgress";
import TextField from "@mui/material/TextField";
import AddIcon from "@mui/icons-material/Add";
import ReorderIcon from "@mui/icons-material/Reorder";
import { useGetSchedule, useScheduleData } from "./data/useScheduleData";
import { SortingList, SortListMethods, WithOrderId } from "./SortingList";
import { updateSchedulesRequest } from "../../network/requests/FileRequests";
import { validateIPAddress } from "../../utils/Validator";
import { FileUploadItem } from "../../types/FileTypes";

type ScheduleProps = {};

export const Schedule: FC<ScheduleProps> = () => {
  const navigate = useNavigate();
  const scheduleList = useScheduleData();
  const {
    operatorSchedules,
    loading: listLoading,
    addOperatorSchedule,
  } = useGetSchedule();

  const [isOrdering, setOrdering] = useState(false);
  const [ip, setIp] = useState("");
  const [orderList, setOrderList] = useState<FileUploadItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{
    title: string;
    type?: "success" | "error";
  }>({ title: "" });

  const sortListRef = useRef<SortListMethods>(null);

  const submitSort = async () => {
    if (!validateIPAddress(ip)) {
      setMessage({
        title: "آدرس ip دستگاه مورد نظر را وارد نکرده اید!",
        type: "error",
      });
      return;
    }
    setLoading(true);
    const tempArray = sortListRef.current
      ?.getOrderedList()
      .map((item) => item._id);
    const response = await updateSchedulesRequest(tempArray!, ip);
    if (response.success) {
      setMessage({ title: "با موفقیت ثبت شد", type: "success" });
      setTimeout(() => {
        addOperatorSchedule(response.payload!);
        setIp("");
        setOrderList([]);
        setOrdering(false);
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

  const onViewClick = (_id: string) => {
    try {
      const index = operatorSchedules.findIndex(
        (schedule) => schedule._id === _id
      );
      const activeIds = operatorSchedules[index].conductor;
      const tempIp = operatorSchedules[index].ip;
      const tempArray = scheduleList.filter(function (item) {
        return activeIds.indexOf(item._id) > -1;
      });
      setOrderList(tempArray);
      setIp(tempIp);
      setOrdering(true);
    } catch (error) {
      console.log(error);
    }
  };

  const onRemove = (_id: string) => {
    const index = orderList.findIndex((schedule) => schedule._id === _id);
    const temp = orderList.flat();
    temp.splice(index, 1);
    setOrderList(temp);
  };

  const onAddScheduleClick = () => {
    setOrdering(true);
    setIp("");
    setOrderList(scheduleList);
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
                onClick={() => onAddScheduleClick()}
                startIcon={<AddIcon />}
              >
                افزودن
              </Button>
            </>
          )}
        </div>
      </div>
      {/* <SortingList listData={scheduleList} ref={sortListRef} /> */}
      {isOrdering ? (
        <>
          <TextField
            error={ip.length > 2 && !validateIPAddress(ip)}
            id="ip"
            name="ip"
            value={ip}
            onChange={(e) => setIp(e.target.value)}
            label="آدرس ip"
            helperText={
              ip.length > 2 && !validateIPAddress(ip)
                ? "آدرس ip معتبر نیست"
                : ""
            }
            placeholder="آدرس ip را وارد کنید"
            sx={{ width: "25ch", marginLeft: "16px", marginTop: "8px" }}
          />
          <SortingList
            listData={orderList}
            ref={sortListRef}
            onRemove={onRemove}
          />
        </>
      ) : (
        <>
          {listLoading ? <CircularProgress /> : null}
          <DataTable
            columnKey="schedule"
            data={operatorSchedules}
            onViewClick={onViewClick}
          />
        </>
      )}
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
