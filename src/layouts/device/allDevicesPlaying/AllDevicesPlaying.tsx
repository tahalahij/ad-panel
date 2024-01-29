import "./allDevicesPlaying.scss";
import { FC, useEffect, useState } from "react";
import Typography from "@mui/material/Typography";
import CircularProgress from "@mui/material/CircularProgress";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Pagination from "@mui/material/Pagination";

import { useDeviceData } from "../useDeviceData";
import { GridDevice } from "../gridDevice/GridDevice";
import { DeviceChip } from "../../schedule/new/DeviceChip";
import { useSocket } from "../../../network/socket/useSocket";
import { useAzan } from "../../azan/hooks/useAzan";
import { FileUploadItem } from "../../../types/FileTypes";

type AllDevicesPlayingProps = {};

const TOTAL_ITEMS_IN_PAGE = parseInt(
  process.env.REACT_APP_TOTAL_ITEMS_PLAYING_PER_PAGE!
);

const CURSOR_INITIAL_VALUE = 0;

export const AllDevicesPlaying: FC<AllDevicesPlayingProps> = () => {
  const { list: deviceList, loading } = useDeviceData(undefined, 0, 100);
  const [cursor, setCursor] = useState(CURSOR_INITIAL_VALUE);
  const [selectedDevices, setSelectedDevices] = useState<string[]>([]);
  const [playlist, setPlayList] = useState<string[]>([]);
  const onlineDevices = useSocket();

  const { azanItem } = useAzan();

  useEffect(() => {
    if (deviceList?.data?.length) {
      if (selectedDevices.length > 0) {
        setPlayList(
          selectedDevices.slice(
            cursor * TOTAL_ITEMS_IN_PAGE,
            cursor * TOTAL_ITEMS_IN_PAGE + TOTAL_ITEMS_IN_PAGE
          )
        );
      } else {
        setPlayList(
          deviceList?.data
            ?.slice?.(
              cursor * TOTAL_ITEMS_IN_PAGE,
              cursor * TOTAL_ITEMS_IN_PAGE + TOTAL_ITEMS_IN_PAGE
            )
            .map((d) => d._id)
        );
      }
    }
  }, [deviceList?.data, selectedDevices, cursor]);

  const onDeviceChange = (event: SelectChangeEvent<string[]>) => {
    const {
      target: { value },
    } = event;

    setCursor(0);
    setSelectedDevices(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
  };

  const totalPages =
    selectedDevices.length > 0
      ? Math.ceil(selectedDevices.length / TOTAL_ITEMS_IN_PAGE)
      : Math.ceil(deviceList.total / TOTAL_ITEMS_IN_PAGE);

  return (
    <div className="allDevicesPlaying">
      <div className="header">
        <Typography variant="h6">{"برنامه در حال پخش"}</Typography>
      </div>
      {loading ? <CircularProgress /> : null}

      <div className="bottom">
        <div className="filters">
          <FormControl sx={{ width: "50ch" }}>
            <InputLabel id="filter-device-playlist-select-label">
              دستگاه
            </InputLabel>
            <Select
              labelId="filter-device-playlist-select-label"
              id="deviceId-playlist"
              name="deviceId-playlist"
              value={selectedDevices}
              multiple={true}
              label="دستگاه"
              onChange={onDeviceChange}
              renderValue={(selected) => (
                <DeviceChip selected={selected} devices={deviceList.data} />
              )}
            >
              {deviceList?.data?.map((item) => (
                <MenuItem value={item._id} key={item._id}>
                  {item.name + " " + item.ip}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>
        <div className="grid-container">
          {playlist.map((deviceId) => (
            <GridDevice
              deviceId={deviceId}
              key={deviceId}
              isOnline={onlineDevices.some((d) => d === deviceId)}
              azanKey={azanItem?.resetKey || "ideal"}
              azanItem={azanItem as unknown as FileUploadItem}
            />
          ))}
        </div>
        {!loading ? (
          <Pagination
            count={totalPages}
            shape="rounded"
            page={cursor + 1}
            onChange={(_, page) => setCursor(page - 1)}
          />
        ) : null}
      </div>
    </div>
  );
};
