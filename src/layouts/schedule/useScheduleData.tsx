import { useEffect, useState } from "react";
import { getScheduleByIdRequest, getSchedulesRequest } from "../../network/requests";
import { Schedule } from "../../types/ScheduleTypes";

export const useScheduleData = () => {
  const [list, setList] = useState<Schedule[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchData = async (page: number = 0) => {
    setLoading(true);
    let response = await getSchedulesRequest({ limit: 100, page });
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
  }, []);

  return { fetchData, list, loading, removeSchedule };
};

export const useScheduleById = (id?: string) => {
  const [data, setData] = useState<Schedule>();
  const [loading, setLoading] = useState(false);

  const fetchData = async () => {
    if (!id) return;
    setLoading(true);
    const response = await getScheduleByIdRequest(id)
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
