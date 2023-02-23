import { useContext } from "react";
import {
  FilesContextLoadingSetState,
  FilesContextLoadingState,
  FilesContextSetState,
  FilesContextState,
} from "./FileContext";

export function useFilesState() {
  const context = useContext(FilesContextState);
  if (context === undefined) {
    throw new Error(
      "render <FilesContextProvider /> at top of the tree"
    );
  }
  return context;
}

export function useFilesDispatch() {
  const context = useContext(FilesContextSetState);
  if (context === undefined) {
    throw new Error(
      "render <FilesContextProvider /> at top of the tree"
    );
  }
  return context;
}

export function useFilesLoadingState() {
  const context = useContext(FilesContextLoadingState);
  if (context === undefined) {
    throw new Error(
      "render <FilesContextProvider /> at top of the tree"
    );
  }
  return context;
}

export function useFilesLoadingDispatch() {
  const context = useContext(FilesContextLoadingSetState);
  if (context === undefined) {
    throw new Error(
      "render <FilesContextProvider /> at top of the tree"
    );
  }
  return context;
}
