import { useState, useEffect } from "react";
import { useFilesState } from "../../../context/file";
import {
  getConductorsListByAdminRequest,
  getConductorsListRequest,
} from "../../../network/requests";
import { ScheduleConductor } from "../../../types/FileTypes";
import { Schedule } from "../../../types/ScheduleTypes";
import { useFileData } from "../../file/useFileData";
import { useAuthenticationState } from "../../../context";
import { WithPagination } from "../../../types/Pagination";

//
export const useConductorData = (operatorId?: string) => {
  const { data } = useFileData(operatorId);

  return data?.data || [];
};

// TODO: rewrite with react-query
export const useGetConductor = (
  operatorId?: string,
  page: number = 0,
  limit: number = 100
) => {
  const [operatorConductors, setOperatorConductors] = useState<
    WithPagination<ScheduleConductor>
  >({data: [], total: 0});
  const [loading, setLoading] = useState(false);
  const authState = useAuthenticationState();

  const fetchData = async () => {
    setLoading(true);
    const response =
      authState.role === "OPERATOR"
        ? await getConductorsListRequest({ operator: "", page, limit })
        : await getConductorsListByAdminRequest({
            operator: operatorId!,
            page,
            limit,
          });
    if (response.success) {
      setOperatorConductors(response.payload!);
    }
    setLoading(false);
  };

  const addOperatorConductor = (item: ScheduleConductor) => {
    // setOperatorConductors((prev) => [...prev, item]);
    fetchData();
  };

  const removeOperatorConductor = (id: string) => {
    // const list = [...operatorConductors];
    // const index = list.findIndex((item) => item._id === id);
    // if (index > -1) {
    //   list.splice(index, 1);
    // }

    // setOperatorConductors(list);
    fetchData();
  };

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [operatorId, page, limit]);

  return {
    fetchData,
    operatorConductors,
    loading,
    addOperatorConductor,
    removeOperatorConductor,
  };
};
