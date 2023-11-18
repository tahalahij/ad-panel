import { GridColDef } from "@mui/x-data-grid";
import { CellImage } from "./CellImage";
import { CellLink } from "./CellLink";
import { ScheduleTypeEnum } from "../../types/ScheduleTypes";
import moment from "moment-jalaali";
import { digitsEnToFa } from "@persian-tools/persian-tools";
import { CellWeekDays } from "./CellWeekDays";
import { CellOnlineStatus } from "./CellOnlineStatus";

export const userColumns: GridColDef[] = [
  { field: "_id", headerName: "شناسه", width: 280, sortable: false },
  {
    field: "username",
    headerName: "نام کاربری",
    width: 200,
    renderCell: CellImage,
  },
  { field: "name", headerName: "نام", width: 230, sortable: true },
  {
    field: "role",
    headerName: "دسترسی",
    width: 130,
    sortable: false,
  },
];

export const userRows = [
  { id: 1, userName: "Snow", email: "Jon0@gmail.com", role: ["ADMIN"] },
  { id: 2, userName: "Lannister", email: "Cersei0@gmail.com", role: ["ADMIN"] },
  { id: 3, userName: "Lannister", email: "Jaime0@gmail.com", role: ["ADMIN"] },
  { id: 4, userName: "Stark", email: "Arya0@gmail.com", role: ["ADMIN"] },
  {
    id: 5,
    userName: "Targaryen",
    email: "Daenerys0@gmail.com",
    role: ["ADMIN"],
  },
  { id: 6, userName: "Melisandre", email: "null0@gmail.com", role: ["ADMIN"] },
  { id: 7, userName: "Clifford", email: "Ferrara0@gmail.com", role: ["ADMIN"] },
  { id: 8, userName: "Frances", email: "Rossini0@gmail.com", role: ["ADMIN"] },
  { id: 9, userName: "Roxie", email: "Harvey0@gmail.com", role: ["ADMIN"] },
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
    width: 150,
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
    width: 90,
    valueFormatter: (params) =>
      digitsEnToFa(moment(params.value).format("jYYYY-jMM-jDD")),
    type: "dateTime",
    valueGetter: ({ value }) => value && new Date(value),
  },
  {
    field: "end",
    headerName: "تاریخ پایان",
    width: 90,
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
];

export const conductorColumns: GridColDef[] = [
  { field: "_id", headerName: "شناسه سری", width: 230, sortable: false },
  {
    field: "name",
    headerName: "نام",
    width: 330,
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
    width: 140,
    sortable: false,
  },
  {
    field: "mac",
    headerName: "آدرس mac",
    width: 140,
    sortable: false,
  },
  {
    field: "enabled",
    headerName: "وضعیت فعالیت",
    width: 120,
    sortable: true,
    valueFormatter: (params) => (params.value ? "فعال" : "غیرفعال"),
  },
  {
    field: "isOnline",
    headerName: "وضعیت اتصال",
    width: 120,
    renderCell: CellOnlineStatus
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
    renderCell: CellLink
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
    // valueFormatter: (params) =>
    //   params.value === "ADMIN"
    //     ? "ادمین"
    //     : params.value === "CONTROLLER"
    //     ? "کنترلر"
    //     : "اپراتور",
  },
  {
    field: "description",
    headerName: "شرح عملیات",
    width: 340,
    // valueFormatter: (params) => params.value.replace(/,/g, '،')
  },
];
