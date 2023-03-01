import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Home } from "../layouts/home";
import { Login } from "../layouts/login";
import { List } from "../layouts/list";
import { FileList, NewFileUpload } from "../layouts/file";
import { User, New as NewUser } from "../layouts/user";
// import { New } from "../layouts/user/new";
import { PageNotFound } from "../layouts/pageNotFound";
import { Single } from "../layouts/single";
import { Schedule } from "../layouts/schedule";
import { MainContainer } from "../components";
import { useAuthenticationState } from "../context/authentication";

export const RootRouter = () => {
  const authState = useAuthenticationState();

  return (
    <BrowserRouter>
      {!authState.isLogin ? (
        <Routes>
          <Route index element={<Login />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      ) : (
        <MainContainer>
          <Routes>
            <Route path="/">
              <Route index element={<Home />} />
              {/* <Route path="login" element={<Login />} /> */}
              <Route path="users">
                <Route
                  index
                  element={
                    <List
                      newItemRoute="/users/new"
                      title="افزودن اپراتور جدید"
                      columnKey="user"
                    />
                  }
                />
                <Route
                  path=":userId/:ip/:username/:name"
                  element={
                    <NewUser title={"ویرایش اپراتور"} update={true} />
                  }
                />
                <Route
                  path="new"
                  element={<NewUser title={"افزودن اپراتور جدید"} />}
                />
              </Route>
              <Route path="schedules">
                <Route index element={<Schedule />} />
                <Route path=":scheduleId" element={<Single />} />
                <Route
                  path="new"
                  element={<NewUser title={"افزودن برنامه جدید"} />}
                />
              </Route>
              <Route path="uploads">
                <Route
                  index
                  element={
                    <FileList title="افزودن فایل جدید" columnKey="file" />
                  }
                />
                <Route path=":fileId" element={<Single />} />
                <Route
                  path="new"
                  element={<NewFileUpload title={"افزودن فایل جدید"} />}
                />
              </Route>
            </Route>
          </Routes>
        </MainContainer>
      )}
    </BrowserRouter>
  );
};
