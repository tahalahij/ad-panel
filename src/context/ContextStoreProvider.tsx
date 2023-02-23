import { PropsWithChildren } from "react";
import Compose from "./Compose";
import { AuthenticationContextProvider } from "./authentication";
import { DarkModeContextProvider } from "./darkMode/DarkModeContext";
import { FilesContextProvider } from "./file";

const providers = [DarkModeContextProvider, AuthenticationContextProvider, FilesContextProvider];

export const ContextStoreProvider = ({ children }: PropsWithChildren) => {
  return <Compose components={providers}>{children}</Compose>;
};
