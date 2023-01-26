import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Home } from "../layouts/home";
import { PageNotFound } from "../layouts/pageNotFound";

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
  return <RouterProvider router={router} />;
};
