import { GridColDef } from "@mui/x-data-grid";
import { CellImage } from "./CellImage";
import { CellLink } from "./CellLink";
import { ScheduleTypeEnum, WeekDays } from "../../types/ScheduleTypes";
import moment from "moment-jalaali";
import { digitsEnToFa } from "@persian-tools/persian-tools";
import { CellWeekDays } from "./CellWeekDays";

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
    // renderCell: CellLink,
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
  { field: "name", headerName: "نام برنامه", width: 160 },
  {
    field: "deviceId",
    headerName: "شناسه دستگاه",
    width: 210,
    sortable: false,
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
    width: 100,
    valueFormatter: (params) =>
      digitsEnToFa(moment(params.value).format("jYYYY-jMM-jDD")),
    type: "dateTime",
    valueGetter: ({ value }) => value && new Date(value),
  },
  {
    field: "end",
    headerName: "تاریخ پایان",
    width: 100,
    valueFormatter: (params) =>
      digitsEnToFa(moment(params.value).format("jYYYY-jMM-jDD")),
    type: "dateTime",
    valueGetter: ({ value }) => value && new Date(value),
  },
  {
    field: "day",
    headerName: "روز های تکرار",
    width: 200,
    // @ts-ignore
    renderCell: CellWeekDays,
  },
  {
    field: "from",
    headerName: "ساعت شروع",
    width: 100,
    valueFormatter: (params) =>
      params.value ? digitsEnToFa(moment(params.value).format("HH:mm")) : "",
  },
  {
    field: "to",
    headerName: "ساعت پایان",
    width: 100,
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
    width: 200,
  },
  {
    field: "operatorId",
    headerName: "نام اپراتور",
    width: 230,
    sortable: false,
    valueFormatter: (params) => params.value.name,
  },
];
