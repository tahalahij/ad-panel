import "./gridDevice.scss";
import { useEffect, useState } from "react";
import { FileTypeDetector } from "../../../components";
import { useAuthenticationState } from "../../../context";
import {
  getDeviceCurrentScheduleByAdminRequest,
  getDeviceCurrentScheduleByOperatorRequest,
} from "../../../network/requests";
import { FileUploadItem } from "../../../types/FileTypes";
import { Schedule } from "../../../types/ScheduleTypes";
import { Typography } from "@mui/material";

interface IGridDeviceProps {
  deviceId: string;
}

export const GridDevice = ({ deviceId }: IGridDeviceProps) => {
  const [currentItem, setCurrentItem] = useState<{
    file: FileUploadItem;
    schedule: Schedule;
  }>();
  const auth = useAuthenticationState();

  const fetchData = async () => {
    const getCurrentScheduleRequest =
      auth.role === "OPERATOR"
        ? getDeviceCurrentScheduleByOperatorRequest
        : getDeviceCurrentScheduleByAdminRequest;

    getCurrentScheduleRequest(deviceId)
      .then((res) => {
        if (res.success)
          setCurrentItem({
            schedule: res.payload?.schedule!,
            file: {
              ...res.payload?.file!,
              resetKey: Date.now().toString(),
            },
          });
      })
      .catch(console.log);
  };

  const onEnd = (id?: string) => {
    fetchData();
  };

  useEffect(() => {
    if (deviceId) {
      fetchData();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [deviceId]);

  if (!currentItem?.file) {
    return null;
  }

  return (
    <div className="gridDevice">
      <div className="mediaPlayer">
        <FileTypeDetector onEnd={onEnd} {...currentItem?.file} />
      </div>
      {/* <Typography  /> */}
    </div>
  );
};
