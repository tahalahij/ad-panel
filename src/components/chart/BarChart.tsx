import "./chart.scss";
import { FC } from "react";
import {
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
  BarChart as ReBarChart,
  Bar,
} from "recharts";
import Typography from "@mui/material/Typography";
import { convertCurrencyToHighValueReadable } from "../../utils/Utils";

// chart options for react
// react-vits
// nivo
// recharts
// react-rechart-js2

type BarChartProps = {
  aspect?: number;
  title?: string;
  data?: any;
};

export const BarChart: FC<BarChartProps> = ({ aspect, title = "پشمک", data }) => {
  return (
    <div className="chart">
      <Typography>{title}</Typography>
      <ResponsiveContainer width={"100%"} aspect={aspect}>
        <ReBarChart
          width={500}
          height={300}
          data={data}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          {/* <Bar dataKey="duration" fill="#8884d8" /> */}
          <Bar dataKey="duration" fill="#82ca9d" />
        </ReBarChart>
      </ResponsiveContainer>
    </div>
  );
};

BarChart.defaultProps = {
  aspect: 2 / 1,
  title: "",
};
