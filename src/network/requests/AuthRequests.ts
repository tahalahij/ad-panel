// import type {ExpertCardType} from './../types';
import { USER_ROLE } from "../../types/UserTypes";
import NetworkHandler from "../NetworkHandler";

type loginInputReq = {
  username: string;
  password: string;
};

export const loginRequest = async (body: loginInputReq) => {
  return NetworkHandler.post<{
    access_token: string;
    role: USER_ROLE;
  }>(`auth/login`, body);
};
