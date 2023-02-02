import "./main.scss";
import { ReactNode, FC } from "react";
import { Sidebar } from "../sidebar/Sidebar";
import { Navbar } from "../navbar/Navbar";
type MainContainerProps = {
  children: ReactNode;
};

export const MainContainer: FC<MainContainerProps> = ({ children }) => {
  return (
    <div className="main">
      <Sidebar />
      <div className="mainContainer">
        <Navbar />
        {children}
      </div>
    </div>
  );
};
