import { Schedule, SchedulePure } from "../../types/ScheduleTypes";
import NetworkHandler, { listParamsReq } from "../NetworkHandler";

export const getSchedulesRequest = async (
  params: listParamsReq = { page: 0, limit: 100 }
) => {
  return NetworkHandler.get<Schedule[]>(`schedule/schedule/operators`, {
    params,
  });
};

export const addScheduleRequest = async (data: SchedulePure) => {
  return NetworkHandler.post<Schedule>(`schedule/schedule`, data);
};

export const deleteScheduleRequest = async (id: string) => {
  return NetworkHandler.delete<Schedule>(`schedule/${id}`, {});
};
