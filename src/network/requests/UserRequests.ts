import { User } from "../../types/UserTypes";
import NetworkHandler from "../NetworkHandler";

type newUserParams = {
  _id?: string;
  username: string;
  name: string;
  password?: string;
  // ip: string;
};

type operatorListParamsReq = {
  page?: number;
  limit?: number;
  _order?: "desc" | "asc";
};

export const getOperatorListRequest = async (
  params: operatorListParamsReq = { page: 0, limit: 100 }
) => {
  return NetworkHandler.get<User[]>(`users/operators`, {
    params,
  });
};

export const addOperatorRequest = async (data: newUserParams) => {
  return NetworkHandler.post<any>(`users`, data);
};

export const updateOperatorRequest = async (data: newUserParams) => {
  return NetworkHandler.patch<any>(`users/${data._id}`, data);
};
