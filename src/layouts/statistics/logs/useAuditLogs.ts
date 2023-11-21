import { useQuery } from "@tanstack/react-query";
import { useAuthenticationState } from "../../../context";
import { USER_ROLE } from "../../../types/UserTypes";
import { getAuditLogsRequest } from "../../../network/requests";

export const useAuditLogs = (
  role?: USER_ROLE,
  initiatorId = "",
  initiatorName = "",
  description = "",
  page = 0,
  pageSize = 25
) => {
  const auth = useAuthenticationState();
  return useQuery({
    queryKey: [
      "audit-logs",
      auth.role,
      page,
      pageSize,
      role,
      initiatorId,
      initiatorName,
      description,
    ],
    queryFn: () =>
      getAuditLogsRequest({
        page,
        limit: pageSize,
        role,
        initiatorId,
        initiatorName,
        description,
      }),
  });
};
