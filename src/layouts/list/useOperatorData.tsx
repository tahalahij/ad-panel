import { useEffect, useState } from "react";
import { getOperatorListRequest } from "../../network/requests";
import { User } from "../../types/UserTypes";

export const useOperatorData = () => {
  const [userList, setUserList] = useState<User[]>();
  const [loading, setLoading] = useState(false);

  const fetchData = async (page: number = 0) => {
    setLoading(true);
    const response = await getOperatorListRequest({ page, limit: 100 });
    console.log(response);
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
