import { useState } from "react";
import {
  createBrowserRouter,
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import { Home } from "../layouts/home";
import { Login } from "../layouts/login";
import { List } from "../layouts/list";
import { User, New as NewUser } from "../layouts/user";
// import { New } from "../layouts/user/new";
import { PageNotFound } from "../layouts/pageNotFound";
import { Single } from "../layouts/single";
import { MainContainer } from "../components";

export const RootRouter = () => {
  const [isLogin, setLogin] = useState(true);
  return (
    <BrowserRouter>
      {isLogin ? (
        <MainContainer>
          <Routes>
            <Route path="/">
              <Route index element={<Home />} />
              {/* <Route path="login" element={<Login />} /> */}
              <Route path="users">
                <Route
                  index
                  element={
                    <List newItemRoute="/users/new" title="افزودن کاربر جدید" />
                  }
                />
                <Route path=":userId" element={<Single />} />
                <Route
                  path="new"
                  element={<NewUser title={"افزودن کاربر جدید"} />}
                />
              </Route>
            </Route>
          </Routes>
        </MainContainer>
      ) : (
        <Routes>
          <Route index element={<Login />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      )}
    </BrowserRouter>
  );
};
