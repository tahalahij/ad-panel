import { useEffect, useState } from "react";
import {
  getControllerListRequest,
  getOperatorListRequest,
} from "../../network/requests";
import { USER_ROLE, User } from "../../types/UserTypes";
import { useAuthenticationState } from "../../context";
import { userHasAccess } from "../../utils/UserAccess";

export const useOperatorData = (userType: USER_ROLE) => {
  const [userList, setUserList] = useState<User[]>();
  const [loading, setLoading] = useState(false);
  const authState = useAuthenticationState();

  const fetchData = async (page: number = 0, params?: any) => {
    if (!userHasAccess(authState.role, ["ADMIN", "CONTROLLER"])) return;

    setLoading(true);
    const apiRequest =
      userType.toLocaleLowerCase() === "operator"
        ? getOperatorListRequest
        : getControllerListRequest;
    const _params = {
      ip: "",
      mac: "",
      username: "",
      ...params,
    };
    const response = await apiRequest({ page, limit: 100, ..._params });
    if (response.success) {
      setUserList(response.payload?.data);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return { fetchData, userList, loading };
};
