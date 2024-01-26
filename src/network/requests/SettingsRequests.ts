// import type {ExpertCardType} from './../types';
import { WithPagination } from "../../types/Pagination";
import { Setting } from "../../types/SettingTypes";
import NetworkHandler, { listParamsReq } from "../NetworkHandler";

export const getAllSettingsRequest = async () => {
  return NetworkHandler.get<WithPagination<Setting>>(`system-settings/admin`);
};

export const updateSettingByIdRequest = async (id: string, value: string) => {
  return NetworkHandler.patch<Setting>(`system-settings/admin/${id}`, { value });
};

export const getSettingByNameRequest = async (name: string) => {
  return NetworkHandler.get<Setting>(`system-settings/${name}`);
};
