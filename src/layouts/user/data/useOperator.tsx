import { useQuery } from "@tanstack/react-query";
import {
  getUserInfoRequest,
  getWhoAmIRequest,
} from "../../../network/requests";

export const useUserData = (id: string) => {
  const { data, isLoading: loading } = useQuery({
    queryKey: ["user", id],
    queryFn: () => getUserInfoRequest(id),
    // placeholderData: {},
  });

  return data?.payload;
};

export const useWhoAmI = () => {
  return useQuery({
    queryKey: ["whoami"],
    queryFn: () => getWhoAmIRequest(),
    cacheTime: 0,
  });
};
