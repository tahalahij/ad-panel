import { useEffect, useState } from "react";
import {
  getScheduleByIdRequest,
  getSchedulesByAdminRequest,
  getSchedulesByControllerRequest,
  getSchedulesByOperatorRequest,
} from "../../network/requests";
import { Schedule } from "../../types/ScheduleTypes";
import { useAuthenticationState } from "../../context";
import { WithPagination } from "../../types/Pagination";

export const useScheduleData = (operatorId?: string, page: number = 0, limit: number = 100) => {
  const [list, setList] = useState<WithPagination<Schedule>>({data: [], total: 0});
  const [loading, setLoading] = useState(false);
  const auth = useAuthenticationState();

  const fetchData = async () => {
    setLoading(true);
    let response =
      auth.role === "OPERATOR"
        ? await getSchedulesByOperatorRequest({ limit, page })
        : auth.role === "ADMIN"
        ? await getSchedulesByAdminRequest({
            limit,
            page,
            operator: operatorId!,
          })
        : await getSchedulesByControllerRequest({
            limit,
            page,
            operator: operatorId!,
          });
    if (response.success) {
      setList(response.payload!);
    }
    setLoading(false);
  };

  const removeSchedule = (id: string) => {
    // const cloneList = [...list];
    // const index = cloneList.findIndex((item) => item._id === id);
    // if (index > -1) {
    //   cloneList.splice(index, 1);
    // }

    // setList(cloneList);
    fetchData()
  };

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [operatorId, page, limit]);

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
