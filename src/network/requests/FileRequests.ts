// import type {ExpertCardType} from './../types';
import { FileUploadItem, PanelFilesNameEnum } from "../../types/FileTypes";
import { WithPagination } from "../../types/Pagination";
import NetworkHandler, { withListParam } from "../NetworkHandler";

export const getFilesListByOperatorRequest = async (params: withListParam) => {
  return NetworkHandler.get<WithPagination<FileUploadItem>>(`files/operator`, {
    params: { page: 0, limit: 100, ...params },
  });
};

export const getFilesListByAdminRequest = async (params: withListParam) => {
  return NetworkHandler.get<WithPagination<FileUploadItem>>(`files`, {
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

export const uploadFileByAdminRequest = async (
  file: FormData,
  operatorId?: string
) => {
  return NetworkHandler.post<any>(`files/admin/${operatorId}/upload`, file, {
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

export const deleteFileByAdminRequest = async (id: string) => {
  return NetworkHandler.delete<any>(`files/admin/${id}`, {});
};

export const uploadDashboardBackgroundRequest = async (
  file: FormData,
  place: PanelFilesNameEnum
) => {
  return NetworkHandler.post<any>(
    `files/admin/panel-file/upload/${place}`,
    file
  );
};
