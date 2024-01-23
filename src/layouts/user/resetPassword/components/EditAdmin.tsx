import "../resetPassword.scss";
import React, { FC } from "react";
import TextField from "@mui/material/TextField";
import Divider from "@mui/material/Divider";

import { userHasAccess } from "../../../../utils/UserAccess";
import { useAuthenticationState } from "../../../../context";
import { containsPersianChar } from "../../../../utils/Utils";

interface IEditAdminProfile {
  handleChange: (e: React.ChangeEvent<any>) => void;
  values: { username: string; name: string; ip: string; mac: string };
}

export const EditAdminProfile: FC<IEditAdminProfile> = ({
  handleChange,
  values,
}) => {
  const auth = useAuthenticationState();

  if (userHasAccess(auth.role, ["ADMIN"]))
    return (
      <>
        <div className="editInformation">
          <div className="formInput">
            <TextField
              error={containsPersianChar(values.username)}
              id="username"
              name="username"
              value={values.username}
              onChange={handleChange}
              label="نام کاربری"
              helperText={containsPersianChar(values.username) ? 'نام کاربری نمی‌تواند شامل حروف فارسی باشد' : ''}
              placeholder="نام کاربری را وارد کنید"
              sx={{ width: "35ch" }}
            />
          </div>
          <div className="formInput">
            <TextField
              error={false}
              id="name"
              name="name"
              label={`نام ادمین`}
              value={values.name}
              onChange={handleChange}
              helperText={""}
              placeholder={`نام ادمین را وارد کنید`}
              sx={{ width: "35ch" }}
            />
          </div>
          <div className="formInput">
            <TextField
              error={false}
              id="ip"
              name="ip"
              value={values.ip}
              onChange={handleChange}
              label="آدرس ip"
              helperText={""}
              placeholder="آدرس ip را وارد کنید"
              sx={{ width: "35ch" }}
            />
          </div>
          <div className="formInput">
            <TextField
              error={false}
              id="mac"
              name="mac"
              value={values.mac}
              onChange={handleChange}
              label="آدرس mac"
              helperText={""}
              placeholder="آدرس mac را وارد کنید"
              sx={{ width: "35ch" }}
            />
          </div>
        </div>
        <Divider />
      </>
    );
  return null;
};
