import "./devicesStatistics.scss";
import { useEffect, useState, useMemo } from "react";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import DatePicker, { DateObject } from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import { useFormik } from "formik";
import { getDevicesStatisticsRequest } from "../../../network/requests";
import { useDeviceData } from "../../device/useDeviceData";
import { PieChart } from "../../../components/chart/PieChart";

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
  const { list: deviceList, loading: deviceLoading } = useDeviceData(
    undefined,
    0,
    200
  );
  const [rangeDay, setRangeDay] = useState<DateObject[]>([
    new DateObject().subtract(7, "days"),
    new DateObject(),
  ]);
  const [chartData, setChartData] = useState<File[]>([]);
  const [totalSeconds, setTotalSeconds] = useState<number>(0);

  useEffect(() => {
    const _start = rangeDay[0].set({
      hour: 0, //Number(startTime.format("HH")),
      minute: 0, //Number(startTime.format("mm")),
      millisecond: 0,
    });
    const _end = rangeDay[1].set({
      hour: 0, //Number(endTime.format("HH")),
      minute: 0, //Number(endTime.format("mm")),
      millisecond: 0,
    });
    const start = new Date(_start.valueOf()).toISOString();
    const end = new Date(_end.valueOf()).toISOString();
    const requestParams = {
      // page: 0,
      // limit: 10000,
      start,
      end,
      ip: formik.values.ip ?? undefined,
      fileType: formik.values.fileType ?? undefined,
    };
    getDevicesStatisticsRequest(requestParams)
      .then((res) => {
        setChartData(res.payload?.statistics!);
        setTotalSeconds(res.payload?.total!);
      })
      .catch(console.log);
  }, [rangeDay, formik.values.ip, formik.values.fileType]);

  const data = useMemo(() => {
    const _d: { name: string; value: number; id: number; label?: string }[] = [
      { id: 0, name: "audio", value: 0, label: "  ==>       صدا"},
      { id: 1, name: "video", value: 0, label: "  ==>       ویدیو" },
      { id: 2, name: "image", value: 0, label: "  ==>      تصویر" },
    ];
    if (chartData)
      chartData.forEach((item) => {
        // @ts-ignore
        const index = _d.findIndex((c) => c.name === item.fileType);
        if (index > -1) {
          // @ts-ignore
          _d[index].value = _d[index].value + (item.duration || 0);
        } else {
          _d.push({
            // @ts-ignore
            name: item.fileType,
            id: _d[_d.length - 1].id + 1,
            label: "",
            // @ts-ignore
            value: item.duration,
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
            {deviceList?.data?.map((item) => (
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
          </Select>
        </FormControl>
      </div>
      <div className="charts">
        {/* <Featured /> */}
        <PieChart title="" data={data} height={360} total={totalSeconds} />
        <Typography className="listTitle">{`در مجموع ${totalSeconds} عدد فایل نمایش داده شده است `}</Typography>
      </div>
      {/* <div className="listContainer">
        <Typography className="listTitle">آخرین تراکنش ها</Typography>
        <Table />
      </div> */}
    </div>
  );
};
