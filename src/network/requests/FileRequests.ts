// import type {ExpertCardType} from './../types';
import { FileUploadItem, ScheduleConductor } from "../../types/FileTypes";
import NetworkHandler, { listParamsReq } from "../NetworkHandler";

export const getFilesListRequest = async (
  params: listParamsReq = { page: 0, limit: 100 }
) => {
  return NetworkHandler.get<FileUploadItem[]>(`files`, {
    params,
  });
};

export const uploadFileRequest = async (file: FormData) => {
  return NetworkHandler.post<any>(`files/upload`, file);
};

export const uploadDashboardBackgroundRequest = async (file: FormData) => {
  return NetworkHandler.post<any>(`files/admin/dashboard/upload`, file);
};
