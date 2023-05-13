import { useEffect, useState } from "react";
import {
  getDeviceByIdRequest,
  getDeviceListRequest,
  getMyDevicesListRequest,
} from "../../network/requests";
import { Device } from "../../types/DeviceType";
import { useAuthenticationState } from "../../context";

export const useDeviceData = () => {
  const [list, setList] = useState<Device[]>([]);
  const [loading, setLoading] = useState(false);
  const auth = useAuthenticationState();

  const fetchData = async (page: number = 0) => {
    setLoading(true);
    let response =
      auth.role === "ADMIN"
        ? await getDeviceListRequest({ page, limit: 100 })
        : await getMyDevicesListRequest({ page, limit: 100 });
    console.log(response);
    if (response.success) {
      setList(response.payload!);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return { fetchData, list, loading };
};

export const useDeviceById = (id?: string) => {
  const [data, setData] = useState<Device>();
  const [loading, setLoading] = useState(false);

  const fetchData = async () => {
    if (!id) return;
    setLoading(true);
    let response = await getDeviceByIdRequest(id)
    console.log(response);
    if (response.success) {
      setData(response.payload);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return {data, loading}
}
