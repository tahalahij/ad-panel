// import type {ExpertCardType} from './../types';
import { FileUploadItem, ScheduleConductor } from "../../types/FileTypes";
import NetworkHandler from "../NetworkHandler";

type fileListParamsReq = {
  page?: number;
  limit?: number;
  _order?: "desc" | "asc";
};

export const getFilesListRequest = async (
  params: fileListParamsReq = { page: 0, limit: 100 }
) => {
  return NetworkHandler.get<FileUploadItem[]>(`files`, {
    params,
  });
};

export const uploadFileRequest = async (file: FormData) => {
  return NetworkHandler.post<any>(`files/upload`, file);
};

export const updateSchedulesRequest = async (
  scheduleList: string[],
  ip: string
) => {
  return NetworkHandler.post<ScheduleConductor>(`files/schedule`, {
    conductor: scheduleList,
    ip,
  });
};

export const getScheduleListRequest = async () => {
  return NetworkHandler.get<ScheduleConductor[]>(`files/schedule/operators`);
};
