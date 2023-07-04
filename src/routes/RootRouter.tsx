import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Home } from "../layouts/home";
import { Login } from "../layouts/login";
import { List } from "../layouts/list";
import { FileList, NewFileUpload } from "../layouts/file";
import { User, New as NewUser, ResetPassword } from "../layouts/user";
// import { New } from "../layouts/user/new";
import { PageNotFound } from "../layouts/pageNotFound";
import { Single } from "../layouts/single";
import { Conductor } from "../layouts/conductor";
import { MainContainer } from "../components";
import { useAuthenticationState } from "../context/authentication";
import {
  List as DeviceList,
  New as NewDevice,
  CurrentPlaying,
} from "../layouts/device";
import { List as ScheduleList, New as NewSchedule } from "../layouts/schedule";
import { LoginBackground } from "../layouts/settings";
import { DeviceStatistics } from "../layouts/statistics/devices/DevicesStatistics";
import { FileUpload as UploadAzan } from "../layouts/azan";

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
                      title="اپراتورها"
                      columnKey="user"
                    />
                  }
                />
                <Route
                  path="resetPassword"
                  element={<ResetPassword title={"تغییر رمز عبور"} />}
                />
                <Route
                  path=":userId/:username/:name/:ip/:map"
                  element={<NewUser title={"ویرایش اپراتور"} update={true} />}
                />
                <Route
                  path="new"
                  element={<NewUser title={"افزودن اپراتور جدید"} />}
                />
              </Route>
              <Route path="devices">
                {authState.role === "CONTROLLER" ? (
                  <>
                    <Route
                      index
                      element={
                        <DeviceList columnKey="device" title={"دستگاه ها"} />
                      }
                    />
                    <Route
                      path=":deviceId"
                      element={
                        <NewDevice title={"ویرایش دستگاه"} update={true} />
                      }
                    />
                    <Route path="current" element={<CurrentPlaying />} />
                  </>
                ) : authState.role === "ADMIN" ? (
                  <>
                    <Route
                      index
                      element={
                        <DeviceList columnKey="device" title={"دستگاه ها"} />
                      }
                    />
                    <Route
                      path=":deviceId"
                      element={
                        <NewDevice title={"ویرایش دستگاه"} update={true} />
                      }
                    />
                    <Route
                      path="new"
                      element={<NewDevice title={"افزودن دستگاه جدید"} />}
                    />
                    <Route path="current" element={<CurrentPlaying />} />
                  </>
                ) : (
                  <>
                    <Route
                      path="me"
                      element={<DeviceList columnKey="device" />}
                    />
                    {/* TODO: duplicate */}
                    <Route path="current" element={<CurrentPlaying />} />
                  </>
                )}
              </Route>
              <Route path="conductors">
                <Route index element={<Conductor />} />
                <Route path=":conductorId" element={<Single />} />
                <Route
                  path="new"
                  element={<NewUser title={"افزودن سری پخش جدید"} />}
                />
              </Route>
              <Route path="schedules">
                <Route
                  index
                  element={
                    <ScheduleList columnKey="schedule" title={"برنامه ها"} />
                  }
                />
                <Route
                  path=":scheduleId"
                  element={
                    <NewSchedule update={true} title={"ویرایش برنامه"} />
                  }
                />
                <Route
                  path="new"
                  element={<NewSchedule title={"افزودن برنامه جدید"} />}
                />
              </Route>
              <Route path="uploads">
                <Route
                  index
                  element={<FileList title="فایل ها" columnKey="file" />}
                />
                <Route path=":fileId" element={<Single />} />
                <Route
                  path="new"
                  element={<NewFileUpload title={"افزودن فایل جدید"} />}
                />
                <Route
                  path="azan"
                  element={<UploadAzan title={"افزودن فایل جدید"} />}
                />
              </Route>
              <Route path="settings">
                <Route
                  index
                  element={<LoginBackground title={"تغییر تصویر صفحه ورود"} />}
                />
              </Route>
              <Route path="statistics">
                <Route index element={<DeviceStatistics />} />
              </Route>
            </Route>
            <Route path="*" element={<PageNotFound />} />
          </Routes>
        </MainContainer>
      )}
    </BrowserRouter>
  );
};
