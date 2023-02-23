import {
  createContext,
  Dispatch,
  PropsWithChildren,
  Reducer,
  useEffect,
  SetStateAction,
  useReducer,
  useState,
} from "react";

import { ActionType, ContextSchema, ContextListItem } from "./FileContextTypes";

const STORAGE_KEY = "Files";
const INITIAL_STATE: ContextSchema = [];

function getInitialState() {
  const state = localStorage.getItem(STORAGE_KEY);
  return state ? JSON.parse(state) : INITIAL_STATE;
}

export const FilesContextState = createContext<ContextSchema>(INITIAL_STATE);
export const FilesContextSetState = createContext<
  Dispatch<ActionType> | undefined
>(undefined);

export const FilesContextLoadingState = createContext<boolean>(false);
export const FilesContextLoadingSetState = createContext<
  Dispatch<SetStateAction<boolean>> | undefined
>(undefined);

export function reducer(state: ContextSchema, action: ActionType) {
  switch (action.type) {
    case "SET_LIST":
      if (Array.isArray(action.value)) return action.value;
      else return state;
    case "CLEAR_LIST":
      return [];
    case "ADD_ITEM":
      if (action.value instanceof ContextListItem)
        return [...state, action.value];
      else return state;
    case "REMOVE_ITEM":
    default:
      return state;
  }
}

export function FilesContextProvider({ children }: PropsWithChildren<{}>) {
  const [state, dispatch] = useReducer<Reducer<ContextSchema, ActionType>>(
    reducer,
    getInitialState()
  );
  const [loading, setLoading] = useState<boolean>(false);;

  // uncomment to persist data
  // useEffect(() => {
  //   localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  // }, [state]);

  return (
    <FilesContextState.Provider value={state}>
      <FilesContextSetState.Provider value={dispatch}>
        <FilesContextLoadingState.Provider value={loading}>
          <FilesContextLoadingSetState.Provider value={setLoading}>
            {children}
          </FilesContextLoadingSetState.Provider>
        </FilesContextLoadingState.Provider>
      </FilesContextSetState.Provider>
    </FilesContextState.Provider>
  );
}
