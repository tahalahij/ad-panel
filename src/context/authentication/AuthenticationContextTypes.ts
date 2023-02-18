export type ContextSchema = {
  isLogin: boolean;
  token: string;
};


export declare enum ReducerActionType {
  LOGIN = "LOGIN",
  LOGOUT = "LOGOUT",
  //   INSERT_CONVERSATIONS = 'insert_conversation',
}

export type ActionType = {
  type: keyof typeof ReducerActionType;
  value: ContextSchema;
};
