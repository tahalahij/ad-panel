import { useEffect, useState } from "react";
import {
  getDeviceByIdRequest,
  getDeviceListRequest,
  getMyDevicesListRequest,
} from "../../network/requests";
import { Device } from "../../types/DeviceType";
import { useAuthenticationState } from "../../context";
import { useQuery } from "@tanstack/react-query";

export const useDeviceData = (operatorId?: string, page = 0, pageSize = 100) => {
  const auth = useAuthenticationState();
  const queryKey = auth.role === "OPERATOR" ? "my-devices" : "devices";
  const { data, isLoading: loading } = useQuery({
    queryKey: [queryKey, operatorId, page, pageSize],
    queryFn: () =>
      queryKey === "devices"
        ? getDeviceListRequest({ operatorId, page, limit: pageSize })
        : getMyDevicesListRequest({page, limit: pageSize}),
    placeholderData: { payload: {data: [], total: 0}, error: "", httpStatus: 200, success: true },
  });

  return { list: data?.payload || {data: [], total: 0}, loading };
};

export const useDeviceById = (id: string) => {
  const { data, isLoading: loading } = useQuery({
    queryKey: ["device", id],
    queryFn: () => getDeviceByIdRequest(id),
    // placeholderData: {payload: undefined, error: '', httpStatus: 200, success: true},
  });

  return { data: data?.payload, loading };
};
