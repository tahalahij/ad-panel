import { ScheduleConductor } from "../../types/FileTypes";
import { WithPagination } from "../../types/Pagination";
import NetworkHandler, {
  listParamsReq,
  withListParam,
} from "../NetworkHandler";

export const addConductorRequest = async (
  name: string,
  conductor: string[],
  operatorId?: string,
) => {
  return NetworkHandler.post<ScheduleConductor>(`conductors`, {
    conductor,
    name,
  });
};

export const addConductorByAdminRequest = async (
  name: string,
  conductor: string[],
  operatorId?: string,
) => {
  return NetworkHandler.post<ScheduleConductor>(`conductors/admin`, {
    conductor,
    name,
    operatorId
  });
};

export const updateConductorRequest = async (
  id: string,
  name: string,
  conductor: string[]
) => {
  return NetworkHandler.patch<ScheduleConductor>(`conductors/${id}`, {
    conductor,
    name,
  });
};

export const deleteConductorRequest = async (id: string) => {
  return NetworkHandler.delete<ScheduleConductor>(`conductors/${id}`, {});
};

export const deleteConductorByAdminRequest = async (id: string) => {
  return NetworkHandler.delete<ScheduleConductor>(`conductors/admin/${id}`, {});
};

export const getConductorsListRequest = async (params: withListParam) => {
  return NetworkHandler.get<WithPagination<ScheduleConductor[]>>(`conductors`, {
    params: { page: 0, limit: 100, ...params },
  });
};

export const getConductorsListByAdminRequest = async (
  params: withListParam
) => {
  return NetworkHandler.get<WithPagination<ScheduleConductor[]>>(`conductors/admin`, {
    params: { page: 0, limit: 100, ...params },
  });
};
