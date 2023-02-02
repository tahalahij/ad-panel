import {
  createContext,
  Dispatch,
  PropsWithChildren,
  SetStateAction,
  useState,
  useContext,
} from "react";

const INITIAL_STATE = false;

const DarkModeContextState = createContext<boolean>(INITIAL_STATE);
const DarkModeContextSetState = createContext<
  Dispatch<SetStateAction<boolean>> | undefined
>(undefined);

export function DarkModeContextProvider({ children }: PropsWithChildren<{}>) {
  const [isDarkMode, setIsDarkMode] = useState<boolean>(INITIAL_STATE);
  return (
    <DarkModeContextState.Provider value={isDarkMode}>
      <DarkModeContextSetState.Provider value={setIsDarkMode}>
        {children}
      </DarkModeContextSetState.Provider>
    </DarkModeContextState.Provider>
  );
}


export function useDarkModeState() {
  const context = useContext(DarkModeContextState);
  if (context === undefined) {
    throw new Error('render <DarkModeContextProvider /> at top of the tree');
  }
  return context;
}

export function useDarkModeDispatch() {
  const context = useContext(DarkModeContextState);
  if (context === undefined) {
    throw new Error('render <DarkModeContextProvider /> at top of the tree');
  }
  return context;
}
