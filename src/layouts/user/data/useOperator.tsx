import { useQuery } from "@tanstack/react-query";
import { getUserInfoRequest } from "../../../network/requests";

export const useUserData = (id: string) => {
  const { data, isLoading: loading } = useQuery({
    queryKey: ["user", id],
    queryFn: () => getUserInfoRequest(id),
    // placeholderData: {},
  });

  return data?.payload;
};
