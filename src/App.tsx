import "./App.scss";
import "vazirmatn/Vazirmatn-font-face.css";
import 'react-toastify/dist/ReactToastify.css';
import { createTheme, ThemeProvider } from "@mui/material";
import rtlPlugin from "stylis-plugin-rtl";
import { prefixer } from "stylis";
import { CacheProvider } from "@emotion/react";
import createCache from "@emotion/cache";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ToastContainer } from 'react-toastify';
import { RootRouter } from "./routes/RootRouter";
import { ContextStoreProvider } from "./context/ContextStoreProvider";
import { faIR } from "@mui/material/locale";

export const queryClient = new QueryClient();

const theme = createTheme(
  {
    direction: "rtl",
    typography: {
      fontFamily: ["Vazirmatn", "sans-serif"].join(","),
    },
  },
  faIR
);

// Create rtl cache
const cacheRtl = createCache({
  key: "muirtl",
  stylisPlugins: [prefixer, rtlPlugin],
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <CacheProvider value={cacheRtl}>
        <ContextStoreProvider>
          <ThemeProvider theme={theme}>
            <RootRouter />
            <ToastContainer />
          </ThemeProvider>
        </ContextStoreProvider>
      </CacheProvider>
    </QueryClientProvider>
  );
}

export default App;
