import { io } from "socket.io-client";
import { WS_API_URL } from "../Constants";

export enum SocketEventsEnum {
  "ALL_ACTIVE_DEVICES" = "ALL_ACTIVE_DEVICES",
  "DEVICE_CONNECTED" = "DEVICE_CONNECTED",
  "DEVICE_DISCONNECTED" = "DEVICE_DISCONNECTED",
  "SCHEDULE_CREATED" = "SCHEDULE_CREATED",
}

export const socket = io(WS_API_URL!, {
    autoConnect: false,
    // transports: ["pulling"] 
});

export const getSocketInstance = () => socket;
