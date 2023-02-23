// import type {ExpertCardType} from './../types';
import { FileUploadItem } from "../../types/FileTypes";
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
