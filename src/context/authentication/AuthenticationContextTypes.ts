import { USER_ROLE } from "../../types/UserTypes";

export type ContextSchema = {
  isLogin: boolean;
  token: string;
  role: USER_ROLE;
};

export declare enum ReducerActionType {
  LOGIN = "LOGIN",
  LOGOUT = "LOGOUT",
  //   INSERT_CONVERSATIONS = 'insert_conversation',
}

export type ActionType = {
  type: keyof typeof ReducerActionType;
  value?: ContextSchema;
};
