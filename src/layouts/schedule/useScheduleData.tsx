import { useEffect, useState } from "react";
import {
  getScheduleByIdRequest,
  getSchedulesByAdminRequest,
  getSchedulesByControllerRequest,
  getSchedulesByOperatorRequest,
} from "../../network/requests";
import { Schedule } from "../../types/ScheduleTypes";
import { useAuthenticationState } from "../../context";

export const useScheduleData = (operatorId?: string) => {
  const [list, setList] = useState<Schedule[]>([]);
  const [loading, setLoading] = useState(false);
  const auth = useAuthenticationState();

  const fetchData = async (page: number = 0) => {
    setLoading(true);
    let response =
      auth.role === "OPERATOR"
        ? await getSchedulesByOperatorRequest({ limit: 100, page })
        : auth.role === "ADMIN"
        ? await getSchedulesByAdminRequest({
            limit: 100,
            page,
            operator: operatorId!,
          })
        : await getSchedulesByControllerRequest({
            limit: 100,
            page,
            operator: operatorId!,
          });
    if (response.success) {
      setList(response.payload!);
    }
    setLoading(false);
  };

  const removeSchedule = (id: string) => {
    const cloneList = [...list];
    const index = cloneList.findIndex((item) => item._id === id);
    if (index > -1) {
      cloneList.splice(index, 1);
    }

    setList(cloneList);
  };

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [operatorId]);

  return { fetchData, list, loading, removeSchedule };
};

export const useScheduleById = (id?: string) => {
  const [data, setData] = useState<Schedule>();
  const [loading, setLoading] = useState(false);

  const fetchData = async () => {
    if (!id) return;
    setLoading(true);
    const response = await getScheduleByIdRequest(id);
    if (response.success) {
      setData(response.payload);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return { data, loading };
};
