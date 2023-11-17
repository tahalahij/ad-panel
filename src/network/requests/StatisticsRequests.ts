import { WithPagination } from "../../types/Pagination";
import { Schedule } from "../../types/ScheduleTypes";
import { USER_ROLE } from "../../types/UserTypes";
import NetworkHandler, { listParamsReq } from "../NetworkHandler";

export type deviceStatisticsParams = listParamsReq & {
  start: string | Date; // isoString
  end: string | Date;
  ip?: string;
  fileType?: string; // images
  // fileId: string;
};

export const getDevicesStatisticsRequest = async (
  params: deviceStatisticsParams
) => {
  return NetworkHandler.get<{ details: unknown; statistics: File[] }>(
    `statistics`,
    {
      params,
    }
  );
};

export const getAuditLogsRequest = async (
  params: listParamsReq & { role?: USER_ROLE; initiatorId?: string }
) =>
  NetworkHandler.get<
    WithPagination<{
      createdAt: string;
      description: string;
      initiatorName: string;
      initiatorId: string;
      role: USER_ROLE;
    }>
  >("audit-logs", { params });
