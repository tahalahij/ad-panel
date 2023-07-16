import { useEffect, useState } from "react";
import {
  getDeviceByIdRequest,
  getDeviceListRequest,
  getMyDevicesListRequest,
} from "../../network/requests";
import { Device } from "../../types/DeviceType";
import { useAuthenticationState } from "../../context";
import { useQuery } from "@tanstack/react-query";

export const useDeviceData = (operatorId?: string) => {
  const auth = useAuthenticationState();
  const queryKey = auth.role === "OPERATOR" ? "my-devices" : "devices";
  const { data, isLoading: loading } = useQuery({
    queryKey: [queryKey, operatorId],
    queryFn: () =>
      queryKey === "devices"
        ? getDeviceListRequest({ operator: operatorId })
        : getMyDevicesListRequest(),
    placeholderData: { payload: [], error: "", httpStatus: 200, success: true },
  });

  return { list: data?.payload || [], loading };
};

export const useDeviceById = (id: string) => {
  const { data, isLoading: loading } = useQuery({
    queryKey: ["device", id],
    queryFn: () => getDeviceByIdRequest(id),
    // placeholderData: {payload: undefined, error: '', httpStatus: 200, success: true},
  });

  return { data: data?.payload, loading };
};
