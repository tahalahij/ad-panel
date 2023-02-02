import "./chart.scss";
import { FC } from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import Typography from "@mui/material/Typography";
import { convertCurrencyToHighValueReadable } from "../../utils/Utils";
import { title } from "process";

const data = [
  { name: "شهریور", total: 1300000, subTotal: 90 },
  { name: "مهر", total: 700000 },
  { name: "آبان", total: 800000 },
  { name: "آذر", total: 1700000 },
  { name: "دی", total: 1500000 },
  { name: "بهمن", total: 1970000 },
];
// chart options for react
// react-vits
// nivo
// recharts
// react-rechart-js2

type ChartProps = {
  aspect?: number;
  title?: string;
};

export const Chart: FC<ChartProps> = ({ aspect, title }) => {
  return (
    <div className="chart">
      <Typography>{title}</Typography>
      <ResponsiveContainer width={"100%"} aspect={aspect}>
        <AreaChart
          width={730}
          height={250}
          data={data}
          margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
        >
          <defs>
            <linearGradient id="colorTotal" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
            </linearGradient>
            {/* <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#82ca9d" stopOpacity={0} />
            </linearGradient> */}
          </defs>
          <XAxis dataKey="name" stroke="gray" />
          {/* <YAxis /> */}
          <CartesianGrid strokeDasharray="3 3" className="chartGrid" />
          <Tooltip
          //@ts-ignore
          // formatter={(value) => convertCurrencyToHighValueReadable(value)}
          />
          <Area
            type="monotone"
            dataKey="total"
            stroke="#8884d8"
            fillOpacity={1}
            fill="url(#colorTotal)"
          />
          {/* <Area
            type="monotone"
            dataKey="pv"
            stroke="#82ca9d"
            fillOpacity={1}
            fill="url(#colorPv)"
          /> */}
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

Chart.defaultProps = {
  aspect: 2 / 1,
  title: "",
};
