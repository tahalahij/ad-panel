import { PropsWithChildren } from "react";
import Compose from "./Compose";
import { AuthenticationContextProvider } from "./authentication";
import { DarkModeContextProvider } from "./darkMode/DarkModeContext";

const providers = [DarkModeContextProvider, AuthenticationContextProvider];

export const ContextStoreProvider = ({ children }: PropsWithChildren) => {
  return <Compose components={providers}>{children}</Compose>;
};
