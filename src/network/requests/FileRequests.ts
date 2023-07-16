// import type {ExpertCardType} from './../types';
import { FileUploadItem, ScheduleConductor } from "../../types/FileTypes";
import NetworkHandler, {
  listParamsReq,
  withListParam,
} from "../NetworkHandler";

export const getFilesListByOperatorRequest = async (params: withListParam) => {
  return NetworkHandler.get<FileUploadItem[]>(`files/operator`, {
    params: { page: 0, limit: 100, ...params },
  });
};

export const getFilesListByAdminRequest = async (params: withListParam) => {
  return NetworkHandler.get<FileUploadItem[]>(`files`, {
    params: { page: 0, limit: 100, ...params },
  });
};

export const uploadFileRequest = async (
  file: FormData,
  operatorId?: string
) => {
  return NetworkHandler.post<any>(`files/upload`, file, {
    params: { operatorId },
  });
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
