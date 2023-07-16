import "./new.scss";
import { useState, FC } from "react";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import LoadingButton from "@mui/lab/LoadingButton";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import DatePicker, { DateObject } from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import moment from "moment";

import { useFormik } from "formik";
import { useNavigate, useParams } from "react-router-dom";
import { addScheduleRequest } from "../../../network/requests";
import { useScheduleById } from "../useScheduleData";
import {
  SchedulePure,
  ScheduleTypeEnum,
  WeekDays,
} from "../../../types/ScheduleTypes";
import { CellWeekDays } from "../../../components/dataTable/CellWeekDays";
import { getReadableDay } from "../../../utils/Utils";
import { useDeviceData } from "../../device/useDeviceData";
import { useGetConductor } from "../../conductor/data/useConductorData";
import { OperatorSelector } from "../../../components";
import { useAuthenticationState } from "../../../context";
import { userHasAccess } from "../../../utils/UserAccess";

type NewProps = {
  title: string;
  update?: boolean;
};

export const New: FC<NewProps> = ({ title, update = false }) => {
  const navigate = useNavigate();
  const { scheduleId } = useParams();
  const { data, loading: scheduleLoading } = useScheduleById(scheduleId);

  const { list: deviceList, loading: deviceLoading } = useDeviceData();
  const { operatorConductors, loading: conductorLoading } = useGetConductor();
  // const [currentIndex, setCurrentIndex] = useState(-1);
  const authState = useAuthenticationState();

  const [operatorId, setOperatorId] = useState("");
  const [rangeDay, setRangeDay] = useState<DateObject[]>([]);
  const [days, setDays] = useState<WeekDays[]>([]);
  const [startTime, setStartTime] = useState(moment());
  const [endTime, setEndTime] = useState(moment());
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{
    title: string;
    type?: "success" | "error";
  }>({ title: "" });
  const formik = useFormik({
    // enableReinitialize: true,
    initialValues: {
      name: data?.name ?? "",
      conductor: data?.conductor ?? "",
      deviceId: "",
      type: data?.type ?? ScheduleTypeEnum.ONE_TIME,
    },
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
    },
  });

  const onSubmit = async () => {
    // const response = update
    //   ? await updateDeviceRequest({ ...requestBody, _id: scheduleId })
    //   : await addDeviceRequest(formik.values);
    const requestBody: SchedulePure = { ...formik.values };

    if (requestBody.type === ScheduleTypeEnum.RECURSIVE) {
      requestBody.day = days;
      requestBody.from = {
        hour: Number(startTime.format("HH")),
        minute: Number(startTime.format("mm")),
      };
      requestBody.to = {
        hour: Number(endTime.format("HH")),
        minute: Number(endTime.format("mm")),
      };
    } else {
      const start = rangeDay[0].set({
        hour: Number(startTime.format("HH")),
        minute: Number(startTime.format("mm")),
        millisecond: 0,
      });
      const end = rangeDay[1].set({
        hour: Number(endTime.format("HH")),
        minute: Number(endTime.format("mm")),
        millisecond: 0,
      });
      requestBody.start = new Date(start.valueOf()).toISOString();
      requestBody.end = new Date(end.valueOf()).toISOString();
    }

    const response =
      authState.role === "OPERATOR"
        ? await addScheduleRequest(requestBody)
        : await addScheduleRequest(requestBody, operatorId);
    if (response.success) {
      setMessage({ title: "با موفقیت اضافه شد", type: "success" });
      setTimeout(() => {
        navigate(-1);
      }, 2000);
    } else {
      setMessage({
        title: response.error!,
        type: "error",
      });
    }
    setLoading(false);
  };

  const onDayChange = (event: SelectChangeEvent<WeekDays>) => {
    const {
      target: { value },
    } = event;
    setDays(
      // On autofill we get a stringified value.
      typeof value === "string" ? (value.split(",") as WeekDays[]) : value
    );
  };

  // console.log(new Date(rangeDay[0].valueOf()).toISOString())
  return (
    <div className="newSchedule">
      <div className="top">
        <Typography variant="h5" className="title">
          {title}
        </Typography>
      </div>
      <div className="bottom">
        {/* <div className="left">
          <img
            src={
              file
                ? URL.createObjectURL(file)
                : require("../../../assets/images/no_image.jpg")
            }
            alt="empty field"
            className="image"
          />
        </div> */}

        <div className="right">
          <form action="">
            {userHasAccess(authState.role, ["ADMIN"]) && (
              <div className="formInput operatorSelector">
                <OperatorSelector
                  operatorId={operatorId}
                  onOperatorChanged={setOperatorId}
                />
              </div>
            )}
            <div className="formInput">
              <TextField
                error={false}
                id="name"
                name="name"
                value={formik.values.name}
                onChange={formik.handleChange}
                label="نام برنامه"
                helperText={""}
                placeholder="نام"
                sx={{ width: "30ch" }}
              />
            </div>
            <div className="formInput">
              <FormControl sx={{ width: "30ch" }}>
                <InputLabel id="conductor-select-label">نام سری پخش</InputLabel>
                <Select
                  labelId="conductor-select-label"
                  id="conductor"
                  name="conductor"
                  label="نام سری پخش"
                  value={formik.values.conductor}
                  onChange={formik.handleChange}
                >
                  {operatorConductors?.map((item, index) => (
                    <MenuItem value={item._id} key={item._id}>
                      {item.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </div>
            <div className="formInput">
              <FormControl sx={{ width: "30ch" }}>
                <InputLabel id="type-select-label">نوع برنامه</InputLabel>
                <Select
                  labelId="type-select-label"
                  id="type"
                  name="type"
                  value={formik.values.type}
                  label="نوع برنامه"
                  onChange={formik.handleChange}
                >
                  <MenuItem value={ScheduleTypeEnum.ONE_TIME}>
                    یکبار پخش
                  </MenuItem>
                  <MenuItem value={ScheduleTypeEnum.RECURSIVE}>
                    دوره ای
                  </MenuItem>
                </Select>
              </FormControl>
            </div>
            <div className="formInput">
              <FormControl sx={{ width: "30ch" }}>
                <InputLabel id="device-select-label">دستگاه</InputLabel>
                <Select
                  labelId="device-select-label"
                  id="deviceId"
                  name="deviceId"
                  value={formik.values.deviceId}
                  label="دستگاه"
                  onChange={formik.handleChange}
                >
                  {deviceList?.map((item, index) => (
                    <MenuItem value={item._id} key={item._id}>
                      {item.name + " " + item.ip}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </div>
            {formik.values.type === ScheduleTypeEnum.RECURSIVE ? (
              <>
                <div className="formInput">
                  <FormControl sx={{ width: "30ch" }}>
                    <InputLabel id="label-days-select">
                      روز های تکرار
                    </InputLabel>
                    <Select
                      labelId="label-days-select"
                      id="type"
                      name="type"
                      value={days}
                      label="روز های تکرار"
                      // @ts-ignore
                      onChange={onDayChange}
                      multiple={true}
                      renderValue={(selected: string[]) => (
                        <CellWeekDays list={selected as WeekDays[]} />
                      )}
                    >
                      <MenuItem value={WeekDays.SATURDAY}>
                        {getReadableDay(WeekDays.SATURDAY)}
                      </MenuItem>
                      <MenuItem value={WeekDays.SUNDAY}>
                        {getReadableDay(WeekDays.SUNDAY)}
                      </MenuItem>
                      <MenuItem value={WeekDays.MONDAY}>
                        {getReadableDay(WeekDays.MONDAY)}
                      </MenuItem>
                      <MenuItem value={WeekDays.TUESDAY}>
                        {getReadableDay(WeekDays.TUESDAY)}
                      </MenuItem>
                      <MenuItem value={WeekDays.WEDNESDAY}>
                        {getReadableDay(WeekDays.WEDNESDAY)}
                      </MenuItem>
                      <MenuItem value={WeekDays.THURSDAY}>
                        {getReadableDay(WeekDays.THURSDAY)}
                      </MenuItem>
                      <MenuItem value={WeekDays.FRIDAY}>
                        {getReadableDay(WeekDays.FRIDAY)}
                      </MenuItem>
                    </Select>
                  </FormControl>
                </div>
                <div className="formInput">
                  <LocalizationProvider dateAdapter={AdapterMoment}>
                    <TimePicker
                      label="ساعت شروع"
                      value={startTime}
                      ampm={false}
                      onChange={(t) => setStartTime(t!)}
                      sx={{ width: "30ch" }}
                    />
                  </LocalizationProvider>
                </div>
                <div className="formInput">
                  <LocalizationProvider dateAdapter={AdapterMoment}>
                    <TimePicker
                      label="ساعت پایان"
                      value={endTime}
                      ampm={false}
                      onChange={(t) => setEndTime(t!)}
                      sx={{ width: "30ch" }}
                    />
                  </LocalizationProvider>
                </div>
              </>
            ) : (
              <>
                <div className="formInput">
                  <DatePicker
                    value={rangeDay}
                    //@ts-ignore
                    onChange={setRangeDay}
                    range
                    rangeHover
                    portal
                    calendar={persian}
                    locale={persian_fa}
                    render={
                      <TextField
                        error={false}
                        label="تاریخ شروع و پایان"
                        helperText={""}
                        placeholder="تاریخ شروع و پایان را انتخاب کنید"
                        sx={{ width: "30ch" }}
                      />
                    }
                  />
                </div>
                <div className="formInput">
                  <LocalizationProvider dateAdapter={AdapterMoment}>
                    <TimePicker
                      label="ساعت شروع"
                      value={startTime}
                      ampm={false}
                      onChange={(t) => setStartTime(t!)}
                      sx={{ width: "30ch" }}
                    />
                  </LocalizationProvider>
                </div>
                <div className="formInput">
                  <LocalizationProvider dateAdapter={AdapterMoment}>
                    <TimePicker
                      label="ساعت پایان"
                      value={endTime}
                      ampm={false}
                      onChange={(t) => setEndTime(t!)}
                      sx={{ width: "30ch" }}
                    />
                  </LocalizationProvider>
                </div>
              </>
            )}

            <div className="formInput">
              <LoadingButton
                variant="contained"
                className="submitButton"
                loading={loading}
                onClick={onSubmit}
              >
                ارسال
              </LoadingButton>
            </div>

            <div className="formInput"></div>
          </form>
        </div>
      </div>
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
