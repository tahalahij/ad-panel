import { Schedule, SchedulePure } from "../../types/ScheduleTypes";
import NetworkHandler, { listParamsReq } from "../NetworkHandler";

export const getSchedulesByOperatorRequest = async (
  params: listParamsReq = { page: 0, limit: 100 }
) => {
  return NetworkHandler.get<Schedule[]>(`schedule/operators`, {
    params,
  });
};

export const getSchedulesByAdminRequest = async (
  params: listParamsReq = { page: 0, limit: 100 }
) => {
  return NetworkHandler.get<Schedule[]>(`schedule/admin`, {
    params,
  });
};

export const getSchedulesByControllerRequest = async (
  params: listParamsReq = { page: 0, limit: 100 }
) => {
  return NetworkHandler.get<Schedule[]>(`schedule/controller`, {
    params,
  });
};

export const getScheduleByIdRequest = async (id: string) => {
  return NetworkHandler.get<Schedule>(`schedule/${id}`);
};

export const addScheduleRequest = async (data: SchedulePure) => {
  return NetworkHandler.post<Schedule>(`schedule`, data);
};

export const deleteScheduleRequest = async (id: string) => {
  return NetworkHandler.delete<Schedule>(`schedule/${id}`, {});
};
