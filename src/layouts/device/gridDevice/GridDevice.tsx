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
import { useNavigate } from "react-router-dom";
import { Device } from "../../../types/DeviceType";

interface IGridDeviceProps {
  deviceId: string;
  isOnline: boolean;
  azanKey?: string;
  azanItem?: FileUploadItem;
}

export const GridDevice = ({
  deviceId,
  isOnline,
  azanKey = "ideal",
  azanItem,
}: IGridDeviceProps) => {
  const [currentItem, setCurrentItem] = useState<{
    file: FileUploadItem;
    schedule?: Schedule;
    device?: Device;
  }>();
  const auth = useAuthenticationState();
  const navigate = useNavigate();

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
            device: res.payload?.device!,
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

  useEffect(() => {
    if (azanKey !== "ideal") {
      // @ts-ignore
      setCurrentItem((prev) => ({ ...(prev || {}), file: azanItem! }));
    }
  }, [azanKey]);

  if (!currentItem?.file) {
    return null;
  }

  const onlineStatus = isOnline ? "online" : "offline";

  return (
    <div
      className={`gridDevice ${onlineStatus}`}
      onClick={() => navigate(`${deviceId}`)}
    >
      <div className={`mediaPlayer ${onlineStatus}`}>
        <FileTypeDetector onEnd={onEnd} {...currentItem?.file} />
      </div>

      <div className="footer">
        <Typography
          variant="caption"
          color="white"
        >{`${currentItem?.device?.name ?? ''}`}</Typography>
        <Typography
          variant="caption"
          color="white"
        >{`${currentItem?.device?.ip ?? ''}`}</Typography>
      </div>
    </div>
  );
};
