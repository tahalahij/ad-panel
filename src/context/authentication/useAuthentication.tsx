import { useContext } from "react";
import {
  AuthenticationContextSetState,
  AuthenticationContextState,
} from "./AuthenticationContext";

export function useAuthenticationState() {
  const context = useContext(AuthenticationContextState);
  if (context === undefined) {
    throw new Error(
      "render <AuthenticationContextProvider /> at top of the tree"
    );
  }
  return context;
}

export function useAuthenticationDispatch() {
  const context = useContext(AuthenticationContextSetState);
  if (context === undefined) {
    throw new Error(
      "render <AuthenticationContextProvider /> at top of the tree"
    );
  }
  return context;
}
