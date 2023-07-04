// import type {ExpertCardType} from './../types';
import { FileUploadItem } from "../../types/FileTypes";
import { Setting } from "../../types/SettingTypes";
import NetworkHandler, { listParamsReq } from "../NetworkHandler";

export const getAllSettingsRequest = async () => {
  return NetworkHandler.get<Setting[]>(`system-settings/admin`);
};

export const updateSettingByIdRequest = async (id: string, value: string) => {
  return NetworkHandler.patch<Setting>(`system-settings/admin/${id}`, { value });
};
