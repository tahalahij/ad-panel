import { WithPagination } from "../../types/Pagination";
import { Schedule, SchedulePure } from "../../types/ScheduleTypes";
import NetworkHandler, { listParamsReq } from "../NetworkHandler";

type paramsWithList = { operator: string } & listParamsReq;

export const getSchedulesByOperatorRequest = async (
  params: listParamsReq = { page: 0, limit: 100 }
) => {
  return NetworkHandler.get<WithPagination<Schedule>>(`schedule/operators`, {
    params,
  });
};

export const getSchedulesByAdminRequest = async (params: paramsWithList) => {
  return NetworkHandler.get<WithPagination<Schedule>>(`schedule/admin`, {
    params: { page: 0, limit: 100, ...params },
  });
};

export const getSchedulesByControllerRequest = async (
  params: paramsWithList
) => {
  return NetworkHandler.get<WithPagination<Schedule>>(`schedule/controller`, {
    params: { page: 0, limit: 100, ...params },
  });
};

export const getScheduleByIdRequest = async (id: string) => {
  return NetworkHandler.get<Schedule>(`schedule/${id}`);
};

export const addScheduleRequest = async (
  data: SchedulePure,
    operatorId?: string
) => {
  return NetworkHandler.post<Schedule>(`schedule`, data);
};

export const addScheduleByAdminRequest = async (
  data: SchedulePure,
    operatorId?: string
) => {
  return NetworkHandler.post<Schedule>(`schedule/admin/${operatorId}`, data);
};

export const deleteScheduleRequest = async (id: string) => {
  return NetworkHandler.delete<Schedule>(`schedule/${id}`, {});
};

export const deleteScheduleByAdminRequest = async (id: string) => {
  return NetworkHandler.delete<Schedule>(`schedule/admin/${id}`, {});
};
