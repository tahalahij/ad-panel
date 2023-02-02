import {
  createBrowserRouter,
  RouterProvider,
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import { Home } from "../layouts/home";
import { Login } from "../layouts/login";
import { List } from "../layouts/list";
import { User } from "../layouts/user";
import { New } from "../layouts/new";
import { PageNotFound } from "../layouts/pageNotFound";
import { Single } from "../layouts/single";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    errorElement: <PageNotFound />,
  },
  {
    path: "content",
    element: null,
  },
  {
    path: "content/:contentId",
    element: null,
  },
]);

export const RootRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/">
          <Route index element={<Home />} />
          <Route path="login" element={<Login />} />
          <Route path="users">
            <Route index element={<List />} />
            <Route path=":userId" element={<Single />} />
            <Route path="new" element={<New />} />
          </Route>
          <Route path="schedule">
            <Route index element={<List />} />
            <Route path=":scheduleId" element={<Single />} />
            <Route path="new" element={<New />} />
          </Route>

          <Route path="*" element={<PageNotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};
