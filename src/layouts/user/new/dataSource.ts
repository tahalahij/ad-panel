import { ReactNode } from "react";

export type newFormInputItem = {
  id: string;
  label: string;
  type: "text" | "password" | "file" | "email";
  placeHolder?: string;
  isPassword?: boolean;
  icon?: ReactNode;
  validator?: (value: string) => boolean;
  multiline?: boolean;
  defaultValue?: string;
  helperText?: string;
};

export const newUserFormData: newFormInputItem[] = [
  {
    id: "user_name",
    label: "نام کاربری",
    type: 'text',
    placeHolder: "نام کاربری را وارد کنید",
    isPassword: false,
    icon: null,
    // validator: null,
    multiline: false,
    defaultValue: "",
    helperText: "",
  },
  {
    id: "name_and_surname",
    label: "نام و نام‌خانوادگی",
    type: 'text',
    placeHolder: "نام و نام‌خانوادگی را وارد کنید",
    isPassword: false,
    icon: null,
    // validator: null,
    multiline: false,
    defaultValue: "",
    helperText: "",
  },
  {
    id: "email",
    label: "ایمیل",
    type: 'email',
    placeHolder: "ایمیل را وارد کنید",
    isPassword: false,
    icon: null,
    // validator: null,
    multiline: false,
    defaultValue: "",
    helperText: "",
  },
  {
    id: "password",
    label: "رمز عبور",
    type: 'password',
    placeHolder: "رمز عبور را وارد کنید",
    isPassword: true,
    icon: null,
    // validator: null,
    multiline: false,
    defaultValue: "",
    helperText: "",
  },
  {
    id: "password",
    label: "رمز عبور",
    type: 'password',
    placeHolder: "رمز عبور را وارد کنید",
    isPassword: true,
    icon: null,
    // validator: null,
    multiline: false,
    defaultValue: "",
    helperText: "",
  },
];
