import "./App.scss";
import "vazirmatn/Vazirmatn-font-face.css";
import { createTheme, ThemeProvider } from "@mui/material";
import { RootRouter } from "./routes/RootRouter";
import { Navbar, Sidebar } from "./components";

const theme = createTheme({
  direction: "rtl",
  typography: {
    fontFamily: ["Vazirmatn", "sans-serif"].join(","),
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <div className="App">
        <Sidebar />
        <div className="mainContainer">
          <Navbar />
          <RootRouter />
        </div>
      </div>
    </ThemeProvider>
  );
}

export default App;
