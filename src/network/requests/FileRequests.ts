// import type {ExpertCardType} from './../types';
import { FileUploadItem, ScheduleConductor } from "../../types/FileTypes";
import NetworkHandler, { listParamsReq } from "../NetworkHandler";

export const getFilesListByOperatorRequest = async (
  params: listParamsReq = { page: 0, limit: 100 }
) => {
  return NetworkHandler.get<FileUploadItem[]>(`files/operator`, {
    params,
  });
};

export const getFilesListByAdminRequest = async (
  params: listParamsReq = { page: 0, limit: 100 }
) => {
  return NetworkHandler.get<FileUploadItem[]>(`files`, {
    params,
  });
};

export const uploadFileRequest = async (file: FormData) => {
  return NetworkHandler.post<any>(`files/upload`, file);
};

export const uploadAzanMediaFileRequest = async (file: FormData) => {
  return NetworkHandler.post<any>(`files/admin/azan-file`, file);
};

export const uploadAzanTimeStampsRequest = async (file: FormData) => {
  return NetworkHandler.post<any>(`files/admin/azan-time-xlsx`, file);
};

export const deleteFileRequest = async (id: string) => {
  return NetworkHandler.delete<any>(`files/${id}`, {});
};

export const uploadDashboardBackgroundRequest = async (file: FormData) => {
  return NetworkHandler.post<any>(`files/admin/dashboard/upload`, file);
};
