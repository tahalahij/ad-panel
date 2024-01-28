import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { SocketEventsEnum, getSocketInstance } from "./SocketManager";

export const useSocket = () => {
  const [onlineDeviceIds, setOnlineDeviceIds] = useState<string[]>([]);

  useEffect(() => {
    getSocketInstance().connect();
    getSocketInstance().on("connect", () => {
      console.log("socket connected");
      getSocketInstance().on(SocketEventsEnum.ALL_ACTIVE_DEVICES, (data) => {
        if (Array.isArray(data?.activeDevices)) {
          setOnlineDeviceIds(data.activeDevices);
        }
        console.log(SocketEventsEnum.ALL_ACTIVE_DEVICES, data);
      });
      getSocketInstance().on(SocketEventsEnum.DEVICE_CONNECTED, (data) => {
        if (data?.deviceId) {
          setOnlineDeviceIds((prev) => [...prev, data.deviceId as string]);
          toast(`دستگاه با شناسه ${data.deviceId} آنلاین شد`, {
            position: "top-right",
            type: "success",
          });
        }
        console.log(SocketEventsEnum.DEVICE_CONNECTED, data);
      });
      getSocketInstance().on(SocketEventsEnum.DEVICE_DISCONNECTED, (data) => {
        if (data?.deviceId) {
          setOnlineDeviceIds((prev) => [
            ...prev.filter((d) => d !== data.deviceId),
          ]);
          toast(`دستگاه با شناسه ${data.deviceId} آفلاین شد`, {
            position: "top-right",
            type: "info",
          });
        }
        console.log(SocketEventsEnum.DEVICE_DISCONNECTED, data);
      });
      // getSocketInstance().on(SocketEventsEnum.DEVICE_DISCONNECTED, (data) => {
      //   if (arg.device === deviceId) {
      //     setResetKey(Date.now().toString());
      //   }
      // });
    });

    getSocketInstance().on("disconnect", () => {
      console.log("disconnected");
    });

    return () => {
      getSocketInstance().off("connect");
      getSocketInstance().off("disconnect");
      getSocketInstance().disconnect();
    };
  }, []);

  return onlineDeviceIds;
};
