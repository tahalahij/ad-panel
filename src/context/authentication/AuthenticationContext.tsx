import {
  createContext,
  Dispatch,
  PropsWithChildren,
  Reducer,
  useEffect,
  useReducer,
  useRef,
} from "react";
import store from "./AuthenticationStore";

import { ActionType, ContextSchema } from "./AuthenticationContextTypes";

const STORAGE_KEY = "Authentication";
const INITIAL_STATE: ContextSchema = {
  isLogin: false,
  token: "",
};

function getInitialState() {
  const state = localStorage.getItem(STORAGE_KEY);
  return state ? JSON.parse(state) : INITIAL_STATE;
}

export const AuthenticationContextState =
  createContext<ContextSchema>(INITIAL_STATE);

export const AuthenticationContextSetState = createContext<
  Dispatch<ActionType> | undefined
>(undefined);

export function reducer(state: ContextSchema, action: ActionType) {
  console.log(action)
  switch (action.type) {
    case "LOGIN":
      return {
        isLogin: true,
        token: action?.value?.token!,
      };
    case "LOGOUT":
      return {
        isLogin: false,
        token: "",
      };
    default:
      return state;
  }
}

export function AuthenticationContextProvider({
  children,
}: PropsWithChildren<{}>) {
  const [state, dispatch] = useReducer<Reducer<ContextSchema, ActionType>>(
    reducer,
    getInitialState()
  );

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }, [state]);

  const stateRef = useRef(getInitialState());
  useEffect(() => {
    stateRef.current = state;
    store.__onStateUpdated();
  }, [state]);

  /*
    Store init
  */
  if (!store.isReady) {
    store.init({
      dispatch: (params) => dispatch(params),
      getState: () => ({ ...stateRef.current }),
    });
  }

  return (
    <AuthenticationContextState.Provider value={state}>
      <AuthenticationContextSetState.Provider value={dispatch}>
        {children}
      </AuthenticationContextSetState.Provider>
    </AuthenticationContextState.Provider>
  );
}
