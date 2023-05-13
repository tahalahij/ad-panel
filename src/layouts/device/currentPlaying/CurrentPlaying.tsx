import "./currentPlaying.scss";
import { FC, useState, useEffect } from "react";
import Typography from "@mui/material/Typography";
import CircularProgress from "@mui/material/CircularProgress";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";

import { useDeviceData } from "../useDeviceData";
import { Device } from "../../../types/DeviceType";
import { getDeviceCurrentScheduleRequest } from "../../../network/requests";

type CurrentPlayingProps = {};

export const CurrentPlaying: FC<CurrentPlayingProps> = ({}) => {
  const { fetchData, list, loading } = useDeviceData();

  const [currentIndex, setCurrentIndex] = useState(-1);

  const onDayChange = (event: SelectChangeEvent<number>) => {
    const {
      target: { value },
    } = event;
    setCurrentIndex(Number(value));
  };

  useEffect(() => {
    if (currentIndex > -1 && list?.length > 0) {
      getDeviceCurrentScheduleRequest(list[currentIndex]._id)
        .then((res) => {
          console.log(res);
        })
        .catch(console.log);
    }
  }, [currentIndex]);

  //   const auth = useAuthenticationState();
  return (
    <div className="currentPlaying">
      <div className="header">
        <Typography variant="h6">{"برنامه در حال پخش"}</Typography>
      </div>
      {loading ? <CircularProgress /> : null}

      <div className="bottom">
        <FormControl sx={{ width: "40ch" }}>
          <InputLabel id="demo-simple-select-label">دستگاه</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="type"
            name="type"
            value={currentIndex}
            label="دستگاه"
            onChange={onDayChange}
          >
            {list?.map((item, index) => (
              <MenuItem value={index}>{item.name + " " + item.ip}</MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>
    </div>
  );
};
