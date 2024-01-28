import { GridColDef } from "@mui/x-data-grid";
import { CellImage } from "./CellImage";
import { CellLink } from "./CellLink";
import { ScheduleTypeEnum } from "../../types/ScheduleTypes";
import moment from "moment-jalaali";
import { digitsEnToFa } from "@persian-tools/persian-tools";
import { CellWeekDays } from "./CellWeekDays";
import { CellOnlineStatus } from "./CellOnlineStatus";
import { getRoleName } from "../../utils/Utils";

export const userColumns: GridColDef[] = [
  { field: "_id", headerName: "شناسه", width: 218, sortable: false },
  {
    field: "username",
    headerName: "نام کاربری",
    width: 192,
    renderCell: CellImage,
  },
  { field: "name", headerName: "نام", width: 230, sortable: true },
  {
    field: "role",
    headerName: "دسترسی",
    width: 130,
    sortable: false,
    valueFormatter: (params) => getRoleName(params.value),
  },
  {
    field: "ip",
    headerName: "آدرس IP",
    width: 120,
    sortable: false,
  },
  {
    field: "mac",
    headerName: "آدرس mac",
    width: 120,
    sortable: false,
  },
  {
    field: "createdAt",
    headerName: "تاریخ ایجاد",
    width: 140,
    valueFormatter: (params) =>
      digitsEnToFa(moment(params.value).format("HH:mm jYYYY-jMM-jDD")),
    type: "dateTime",
    valueGetter: ({ value }) => value && new Date(value),
  },
];

export const fileColumns: GridColDef[] = [
  { field: "_id", headerName: "شناسه فایل", width: 230, sortable: false },
  {
    field: "originalName",
    headerName: "نام فایل",
    width: 330,
    renderCell: CellLink,
  },
  { field: "type", headerName: "نوع فایل", width: 100, sortable: false },
  {
    field: "createdAt",
    headerName: "تاریخ ایجاد",
    width: 200,
    sortable: true,
    type: "dateTime",
    valueGetter: ({ value }) => value && new Date(value),
    valueFormatter: ({ value }) =>
      digitsEnToFa(moment(value).format("HH:mm jYYYY-jMM-jDD")),
  },
];

export const scheduleColumns: GridColDef[] = [
  { field: "_id", headerName: "شناسه برنامه", width: 210, sortable: false },
  { field: "name", headerName: "نام برنامه", width: 130 },
  {
    field: "device",
    headerName: "نام دستگاه",
    width: 140,
    sortable: false,
    valueFormatter: ({ value }) => value.name,
  },
  {
    field: "type",
    headerName: "نوع برنامه",
    width: 80,
    valueFormatter: (params) =>
      params.value === ScheduleTypeEnum.ONE_TIME ? "یکبار پخش" : "دوره ای",
  },
  {
    field: "start",
    headerName: "تاریخ شروع",
    width: 88,
    valueFormatter: (params) =>
      digitsEnToFa(moment(params.value).format("jYYYY-jMM-jDD")),
    type: "dateTime",
    valueGetter: ({ value }) => value && new Date(value),
  },
  {
    field: "end",
    headerName: "تاریخ پایان",
    width: 88,
    valueFormatter: (params) =>
      digitsEnToFa(moment(params.value).format("jYYYY-jMM-jDD")),
    type: "dateTime",
    valueGetter: ({ value }) => value && new Date(value),
  },
  {
    field: "day",
    headerName: "روز های تکرار",
    width: 160,
    // @ts-ignore
    renderCell: CellWeekDays,
  },
  {
    field: "from",
    headerName: "ساعت شروع",
    width: 85,
    valueFormatter: (params) =>
      params.value ? digitsEnToFa(moment(params.value).format("HH:mm")) : "",
  },
  {
    field: "to",
    headerName: "ساعت پایان",
    width: 85,
    valueFormatter: (params) =>
      params.value ? digitsEnToFa(moment(params.value).format("HH:mm")) : "",
  },
  {
    field: "createdAt",
    headerName: "تاریخ ایجاد",
    width: 88,
    valueFormatter: (params) =>
      digitsEnToFa(moment(params.value).format("jYYYY-jMM-jDD HH:mm")),
    type: "dateTime",
    valueGetter: ({ value }) => value && new Date(value),
  },
];

export const conductorColumns: GridColDef[] = [
  { field: "_id", headerName: "شناسه سری", width: 230, sortable: false },
  {
    field: "name",
    headerName: "نام",
    width: 330,
  },
  {
    field: "createdAt",
    headerName: "تاریخ ایجاد",
    width: 140,
    valueFormatter: (params) =>
      digitsEnToFa(moment(params.value).format("HH:mm jYYYY-jMM-jDD")),
    type: "dateTime",
    valueGetter: ({ value }) => value && new Date(value),
  },
];

export const deviceColumns: GridColDef[] = [
  { field: "_id", headerName: "شناسه دستگاه", width: 230, sortable: false },
  {
    field: "name",
    headerName: "نام دستگاه",
    width: 180,
  },
  {
    field: "operatorId",
    headerName: "نام اپراتور",
    width: 180,
    sortable: false,
    valueFormatter: (params) => params.value.name,
  },
  {
    field: "ip",
    headerName: "آدرس IP",
    width: 120,
    sortable: false,
  },
  {
    field: "mac",
    headerName: "آدرس mac",
    width: 120,
    sortable: false,
  },
  {
    field: "enabled",
    headerName: "فعالیت",
    width: 76,
    sortable: true,
    valueFormatter: (params) => (params.value ? "فعال" : "غیرفعال"),
  },
  {
    field: "isOnline",
    headerName: "اتصال",
    width: 76,
    renderCell: CellOnlineStatus,
  },
  {
    field: "createdAt",
    headerName: "تاریخ ایجاد",
    width: 140,
    valueFormatter: (params) =>
      digitsEnToFa(moment(params.value).format("HH:mm jYYYY-jMM-jDD")),
    type: "dateTime",
    valueGetter: ({ value }) => value && new Date(value),
  },
];

export const auditLogsColumns: GridColDef[] = [
  {
    field: "createdAt",
    headerName: "تاریخ",
    width: 100,
    valueFormatter: (params) =>
      digitsEnToFa(moment(params.value).format("jYYYY-jMM-jDD HH:mm")),
    type: "dateTime",
    valueGetter: ({ value }) => value && new Date(value),
  },
  {
    field: "initiatorId",
    headerName: "شناسه کاربر",
    width: 210,
    renderCell: CellLink,
  },
  {
    field: "initiatorName",
    headerName: "نام کاربر",
    width: 140,
  },
  {
    field: "role",
    headerName: "دسترسی",
    width: 120,
    valueFormatter: (params) => getRoleName(params.value),
  },
  {
    field: "description",
    headerName: "شرح عملیات",
    flex: 1,
    // valueFormatter: (params) => params.value.replace(/,/g, '،')
  },
];
