import "./chart.scss";
import { FC } from "react";
import {
  PieChart as MuiPieChart,
  pieArcLabelClasses,
} from "@mui/x-charts/PieChart";
import Typography from "@mui/material/Typography";
import {
  convertEnglishNumberToPersian,
  sumTotalSecondsToReadableValue,
} from "../../utils/Utils";

type PieChartProps = {
  aspect?: number;
  title?: string;
  data?: any;
  height?: number;
  total?: number;
};

export const PieChart: FC<PieChartProps> = ({ data, height = 200, total }) => {
  return (
    <div className="chart">
      <MuiPieChart
        series={[
          {
            valueFormatter: (item) =>
              `${sumTotalSecondsToReadableValue(item.value)}`,
            // arcLabel: (item) => {
            //   console.log(item.id + "|" + item.value + "|" + total);
            //   return `${convertEnglishNumberToPersian(
            //     ((item.value / total!) * 100).toFixed(0)
            //   )}%`;
            // },
            arcLabel: (item) =>
              `${convertEnglishNumberToPersian(item.value)} ثانیه`,
            arcLabelMinAngle: 30,
            data,
            highlightScope: { faded: "global", highlighted: "item" },
            faded: { innerRadius: 10, additionalRadius: -20, color: "gray" },
          },
        ]}
        sx={{
          [`& .${pieArcLabelClasses.root}`]: {
            fill: "white",
            // fontWeight: "bold",
          },
        }}
        height={height}
      />
    </div>
  );
};
