import { Schedule } from "../../types/ScheduleTypes";
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
