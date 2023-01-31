import "./table.scss";
import Typography from "@mui/material/Typography";
import MuiTable from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

function createData(
  name: string,
  calories: number,
  fat: number,
  carbs: number,
  protein: number
) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData("Frozen yoghurt", 159, 6.0, 24, 4.0),
  createData("Ice cream sandwich", 237, 9.0, 37, 4.3),
  createData("Eclair", 262, 16.0, 24, 6.0),
  createData("Cupcake", 305, 3.7, 67, 4.3),
  createData("Gingerbread", 356, 16.0, 49, 3.9),
];
export const Table = () => {
  return (
    <TableContainer component={Paper} className="table">
      <MuiTable sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="right" className="tableCell">Dessert (100g serving)</TableCell>
            <TableCell align="right" className="tableCell">Calories</TableCell>
            <TableCell align="right" className="tableCell">Fat&nbsp;(g)</TableCell>
            <TableCell align="right" className="tableCell">Carbs&nbsp;(g)</TableCell>
            <TableCell align="right" className="tableCell">Protein&nbsp;(g)</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.name}>
              <TableCell align="right" className="tableCell" component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell align="right" className="tableCell">{row.calories}</TableCell>
              <TableCell align="right" className="tableCell">{row.fat}</TableCell>
              <TableCell align="right" className="tableCell">{row.carbs}</TableCell>
              <TableCell align="right" className="tableCell">{row.protein}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </MuiTable>
    </TableContainer>
  );
};
