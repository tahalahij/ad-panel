import "./devicesStatistics.scss";
import { useEffect, useState, useMemo } from "react";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import LoadingButton from "@mui/lab/LoadingButton";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Chip from "@mui/material/Chip";
import Box from "@mui/material/Box";
import DatePicker, { DateObject } from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import { useFormik } from "formik";
import moment from "moment";
import { Chart } from "../../../components";
import {
  deviceStatisticsParams,
  getDevicesStatisticsRequest,
} from "../../../network/requests";
import { useDeviceData } from "../../device/useDeviceData";
import { BarChart } from "../../../components/chart/BarChart";

export const DeviceStatistics = () => {
  const formik = useFormik({
    initialValues: {
      ip: "",
      fileType: "",
    },
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
    },
  });
  const { list: deviceList, loading: deviceLoading } = useDeviceData();
  const [rangeDay, setRangeDay] = useState<DateObject[]>([
    new DateObject().subtract(7, "days"),
    new DateObject(),
  ]);
  const [chartData, setChartData] = useState<File[]>([]);

  useEffect(() => {
    const _start = rangeDay[0].set({
      hour: 0, //Number(startTime.format("HH")),
      minute: 0, //Number(startTime.format("mm")),
      millisecond: 0,
    });
    const _end = rangeDay[0].set({
      hour: 0, //Number(endTime.format("HH")),
      minute: 0, //Number(endTime.format("mm")),
      millisecond: 0,
    });
    const start = new Date(_start.valueOf()).toISOString();
    const end = new Date(_end.valueOf()).toISOString();
    const requestParams = {
      page: 0,
      limit: 100,
      start,
      end,
      ip: formik.values.ip ?? undefined,
      fileType: formik.values.fileType ?? undefined,
    };
    getDevicesStatisticsRequest(requestParams)
      .then((res) => setChartData(res.payload?.statistics!))
      .catch(console.log);
  }, [rangeDay, formik.values.ip, formik.values.fileType]);

  const data = useMemo(() => {
    const _d: { name: string; duration: number }[] = [
      { name: "audio", duration: 0 },
      { name: "video", duration: 0 },
      { name: "image", duration: 0 },
      { name: "false", duration: 0 },
    ];
    if (chartData)
      chartData.forEach((item) => {
        // @ts-ignore
        const index = _d.findIndex((c) => c.name === item.fileType);
        if (index > -1) {
          // @ts-ignore
          _d[index].duration = _d[index].duration + item.duration;
        } else {
          _d.push({
            // @ts-ignore
            name: item.fileType,
            // @ts-ignore
            duration: item.duration,
          });
        }
      });
    return _d;
  }, [chartData]);

  return (
    <div className="devicesStatistics">
      {/* <div className="widgets">
        <Widget type={WIDGET_TYPE.users} />
        <Widget type={WIDGET_TYPE.orders} />
        <Widget type={WIDGET_TYPE.earnings} />
        <Widget type={WIDGET_TYPE.balance} />
      </div> */}
      <div className="filters">
        <FormControl sx={{ width: "30ch" }}>
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
        </FormControl>
        <FormControl sx={{ width: "30ch" }}>
          <InputLabel id="demo-simple-select-label">دستگاه</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="ip"
            name="ip"
            value={formik.values.ip}
            label="دستگاه"
            onChange={formik.handleChange}
          >
            {deviceList?.map((item) => (
              <MenuItem key={item._id} value={item.ip}>
                {item.name + " " + item.ip}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl sx={{ width: "30ch" }}>
          <InputLabel id="demo-simple-select-label">نوع فایل</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="fileType"
            name="fileType"
            value={formik.values.fileType}
            label="دستگاه"
            onChange={formik.handleChange}
          >
            <MenuItem value={"image"}>{"تصویر"}</MenuItem>
            <MenuItem value={"video"}>{"ویدیو"}</MenuItem>
            <MenuItem value={"audio"}>{"صدا"}</MenuItem>
            <MenuItem value={"false"}>{"false"}</MenuItem>
          </Select>
        </FormControl>
      </div>
      <div className="charts">
        {/* <Featured /> */}
        <BarChart title="" data={data} />
      </div>
      {/* <div className="listContainer">
        <Typography className="listTitle">آخرین تراکنش ها</Typography>
        <Table />
      </div> */}
    </div>
  );
};
