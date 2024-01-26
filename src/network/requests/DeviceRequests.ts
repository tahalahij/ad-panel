import { Device } from "../../types/DeviceType";
import { FileUploadItem } from "../../types/FileTypes";
import { WithPagination } from "../../types/Pagination";
import { Schedule } from "../../types/ScheduleTypes";
import NetworkHandler, { listParamsReq, withListParam } from "../NetworkHandler";

type newDeviceParams = {
  _id?: string;
  name: string;
  ip: string;
  mac: string;
  operatorId: string;
};

export const getDeviceListRequest = async (
  params: withListParam,
) => {
  return NetworkHandler.get<WithPagination<Device>>(`devices/admin`, {
    params,
  });
};

export const addDeviceRequest = async (data: newDeviceParams) => {
  return NetworkHandler.post<any>(`devices/admin`, data);
};

export const updateDeviceRequest = async ({
  _id,
  ...data
}: newDeviceParams) => {
  return NetworkHandler.patch<any>(`devices/admin/${_id}`, data);
};

export const getMyDevicesListRequest = async (
  params: listParamsReq
) => {
  return NetworkHandler.get<WithPagination<Device>>(`devices`, {
    params,
  });
};

export const getDeviceByIdRequest = async (deviceId: string) => {
  return NetworkHandler.get<Device>(`devices/${deviceId}`);
};

export const getDeviceCurrentScheduleByAdminRequest = async (deviceId: string) => {
  return NetworkHandler.get<{ file: FileUploadItem; schedule: Schedule; device: Device }>(
    `devices/admin/schedule/${deviceId}`
  );
};

export const getDeviceCurrentScheduleByOperatorRequest = async (deviceId: string) => {
  return NetworkHandler.get<{ file: FileUploadItem; schedule: Schedule; device: Device }>(
    `devices/operator/schedule/${deviceId}`
  );
};

export const updateDeviceEnableRequest = async (deviceId: string, enabled: boolean) => {
  return NetworkHandler.patch<any>(
    `devices/controller/${deviceId}`,
    {enabled}
  );
};
