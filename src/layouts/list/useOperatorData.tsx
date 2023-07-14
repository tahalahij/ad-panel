import { useEffect, useState } from "react";
import { getControllerListRequest, getOperatorListRequest } from "../../network/requests";
import { USER_ROLE, User } from "../../types/UserTypes";

export const useOperatorData = (userType: USER_ROLE) => {
  const [userList, setUserList] = useState<User[]>();
  const [loading, setLoading] = useState(false);

  const fetchData = async (page: number = 0) => {
    setLoading(true);
    const apiRequest =
      userType.toLocaleLowerCase() === "operator"
        ? getOperatorListRequest
        : getControllerListRequest;
    const response = await apiRequest({ page, limit: 100 });
    if (response.success) {
      setUserList(response.payload);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return { fetchData, userList, loading };
};
