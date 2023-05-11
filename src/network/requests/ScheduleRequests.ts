import { Schedule, SchedulePure } from "../../types/ScheduleTypes";
import NetworkHandler, { listParamsReq } from "../NetworkHandler";

export const getSchedulesRequest = async (
  params: listParamsReq = { page: 0, limit: 100 }
) => {
  return NetworkHandler.get<any[]>(`schedule/schedule/operators`, {
    params,
  });
};


export const addScheduleRequest = async (data: SchedulePure) => {
  return NetworkHandler.post<Schedule>(`schedule/schedule`, data);
};