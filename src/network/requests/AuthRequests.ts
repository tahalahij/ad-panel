// import type {ExpertCardType} from './../types';
import NetworkHandler from "../NetworkHandler";

type loginInputReq = {
  username: string;
  password: string;
};

export const loginRequest = async (body: loginInputReq) => {
  return NetworkHandler.post<{ access_token: string }>(`auth/login`, body);
};
