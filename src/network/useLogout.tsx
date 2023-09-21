import { useAuthenticationDispatch } from "../context";
import { useNavigate } from "react-router-dom";

export let logoutUnAuthorized = () => {};

export const WithLogout = () => {
  const authDispatch = useAuthenticationDispatch();
  const navigate = useNavigate();

  logoutUnAuthorized = () => {
    
    authDispatch({ type: "LOGOUT" });
    localStorage.removeItem("Authentication");
    navigate('/');
  };

  return null;
};
