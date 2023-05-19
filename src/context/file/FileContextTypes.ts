import { FileUploadItem } from "../../types/FileTypes";

export class ContextListItem extends FileUploadItem {}

export type ContextSchema = ContextListItem[];

export declare enum ReducerActionType {
  SET_LIST = "SET_LIST",
  CLEAR_LIST = "CLEAR_LIST",
  REMOVE_ITEM = "REMOVE_ITEM",
  ADD_ITEM = "ADD_ITEM",
  //   INSERT_CONVERSATIONS = 'insert_conversation',
}

export type ActionType = {
  type: keyof typeof ReducerActionType;
  value: ContextSchema | ContextListItem | string | undefined;
};
