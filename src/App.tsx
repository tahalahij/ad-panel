import "./App.css";
import "vazirmatn/Vazirmatn-font-face.css"
import { createTheme, ThemeProvider } from "@mui/material";
import { RootRouter } from "./routes/RootRouter";

const theme = createTheme({
  typography: {
    fontFamily: ["Vazirmatn", "sans-serif"].join(","),
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <RootRouter />
    </ThemeProvider>
  );
}

export default App;
