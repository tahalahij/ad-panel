import "./App.scss";
import "vazirmatn/Vazirmatn-font-face.css";
import { createTheme, ThemeProvider } from "@mui/material";
import rtlPlugin from "stylis-plugin-rtl";
import { prefixer } from "stylis";
import { CacheProvider } from "@emotion/react";
import createCache from "@emotion/cache";
import { RootRouter } from "./routes/RootRouter";
import { ContextStoreProvider } from "./context/ContextStoreProvider";

const theme = createTheme({
  direction: "rtl",
  typography: {
    fontFamily: ["Vazirmatn", "sans-serif"].join(","),
  },
});

// Create rtl cache
const cacheRtl = createCache({
  key: "muirtl",
  stylisPlugins: [prefixer, rtlPlugin],
});

function App() {
  return (
    <CacheProvider value={cacheRtl}>
      <ContextStoreProvider>
        <ThemeProvider theme={theme}>
          <RootRouter />
        </ThemeProvider>
      </ContextStoreProvider>
    </CacheProvider>
  );
}

export default App;
