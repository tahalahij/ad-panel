import { USER_ROLE, User } from "../../types/UserTypes";
import NetworkHandler, { listParamsReq } from "../NetworkHandler";

type newUserParams = {
  _id?: string;
  username: string;
  name: string;
  password?: string;
  ip: string;
  mac: string;
  role?: USER_ROLE;
};

export const getOperatorListRequest = async (
  params: listParamsReq = { page: 0, limit: 100 }
) => {
  return NetworkHandler.get<User[]>(`users/admin/operators`, {
    params,
  });
};

export const getControllerListRequest = async (
  params: listParamsReq = { page: 0, limit: 100 }
) => {
  return NetworkHandler.get<User[]>(`users/admin/controllers`, {
    params,
  });
};

export const addOperatorRequest = async (data: newUserParams) => {
  return NetworkHandler.post<any>(`users/admin`, data);
};

export const updateOperatorRequest = async ({
  _id,
  ...data
}: newUserParams) => {
  return NetworkHandler.patch<any>(`users/admin/${_id}`, data);
};

export const updateAdminRequest = async ({ _id, ...data }: newUserParams) => {
  return NetworkHandler.patch<any>(`users/admin`, data);
};

export const resetPasswordAdminRequest = async (password: string) => {
  return NetworkHandler.patch<any>(`users/admin`, { password });
};

export const resetPasswordRequest = async (
  // userId: string,
  password: string
) => {
  return NetworkHandler.patch<any>(`users/operator`, { password });
};
