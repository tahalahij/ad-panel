import { ScheduleConductor } from "../../types/FileTypes";
import NetworkHandler, { listParamsReq } from "../NetworkHandler";

export const addConductorRequest = async (conductor: string[]) => {
  return NetworkHandler.post<ScheduleConductor>(`conductors`, {
    conductor,
  });
};

export const updateConductorRequest = async (id: string, conductor: string[]) => {
  return NetworkHandler.patch<ScheduleConductor>(`conductors/${id}`, {conductor});
};

export const deleteConductorRequest = async (id: string) => {
  return NetworkHandler.delete<ScheduleConductor>(`conductors/${id}`, {});
};

export const getConductorsListRequest = async (
  params: listParamsReq = { page: 0, limit: 100 }
) => {
  return NetworkHandler.get<ScheduleConductor[]>(`conductors`, { params });
};
