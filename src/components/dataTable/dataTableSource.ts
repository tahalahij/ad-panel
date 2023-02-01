import { GridColDef } from "@mui/x-data-grid";
import { CellImage } from "./CellImage";

export const userColumns: GridColDef[] = [
  { field: "id", headerName: "شناسه", width: 130, sortable: false },
  {
    field: "userName",
    headerName: "نام کاربری",
    width: 200,
    renderCell: CellImage,
  },
  { field: "email", headerName: "ایمیل", width: 230, sortable: false },
  {
    field: "role",
    headerName: "دسترسی",
    width: 130,
    sortable: false,
  },
];

export const userRows = [
  { id: 1, userName: "Snow", email: "Jon0@gmail.com", role: ['ADMIN'] },
  { id: 2, userName: "Lannister", email: "Cersei0@gmail.com", role: ['ADMIN'] },
  { id: 3, userName: "Lannister", email: "Jaime0@gmail.com", role: ['ADMIN'] },
  { id: 4, userName: "Stark", email: "Arya0@gmail.com", role: ['ADMIN'] },
  { id: 5, userName: "Targaryen", email: "Daenerys0@gmail.com", role: ['ADMIN'] },
  { id: 6, userName: "Melisandre", email: "null0@gmail.com", role: ['ADMIN'] },
  { id: 7, userName: "Clifford", email: "Ferrara0@gmail.com", role: ['ADMIN'] },
  { id: 8, userName: "Frances", email: "Rossini0@gmail.com", role: ['ADMIN'] },
  { id: 9, userName: "Roxie", email: "Harvey0@gmail.com", role: ['ADMIN'] },
];
