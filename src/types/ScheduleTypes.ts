export enum ScheduleTypeEnum {
  RECURSIVE = "RECURSIVE",
  ONE_TIME = "ONE_TIME",
}

export enum WeekDays {
  "SATURDAY" = "SATURDAY",
  "SUNDAY" = "SUNDAY",
  "MONDAY" = "MONDAY",
  "TUESDAY" = "TUESDAY",
  "WEDNESDAY" = "WEDNESDAY",
  "THURSDAY" = "THURSDAY",
  "FRIDAY" = "FRIDAY",
}

export type SchedulePure = {
  conductor: string;
  deviceIds: string[];
  type: ScheduleTypeEnum;
  name: string;
  day?: WeekDays[];
  from?: {
    hour: number;
    minute: number;
  };
  to?: {
    hour: number;
    minute: number;
  };
  start?: Date | string;
  end?: Date | string;
};

export class Schedule {
  constructor(
    public _id: string,
    public __v: number,
    public path: string,
    public createdAt: string,
    public updatedAt: Date | string | null,
    public conductor: string,
    public ip: string,
    public name: string,
    public type: ScheduleTypeEnum,
    public day?: WeekDays[],
    public from?: {
      hour: number;
      minute: number;
    },
    public to?: {
      hour: number;
      minute: number;
    },
    public start?: Date | string,
    public end?: Date | string
  ) {}
}
