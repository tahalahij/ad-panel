import "./newFile.scss";
import { useState, FC } from "react";
import Typography from "@mui/material/Typography";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import TextField from "@mui/material/TextField";
import LoadingButton from "@mui/lab/LoadingButton";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import Stack from "@mui/material/Stack";
import MenuItem from "@mui/material/MenuItem";
import {
  uploadFileByAdminRequest,
  uploadFileRequest,
} from "../../../network/requests/FileRequests";
import { useNavigate } from "react-router-dom";
import { MdOutlineCloudUpload } from "react-icons/md";
import { Animator, ImageAnimation } from "../../../components/scheduleModule";
import { OperatorSelector } from "../../../components";
import { useAuthenticationState } from "../../../context";
import { useQuery } from "@tanstack/react-query";
import { getSettingByNameRequest } from "../../../network/requests";
type NewProps = {
  title: string;
};

export const NewFileUpload: FC<NewProps> = ({ title }) => {
  const authState = useAuthenticationState();
  const [operatorId, setOperatorId] = useState("");
  const [file, setFile] = useState<File>();
  const [delay, setDelay] = useState("");
  const [animation, setAnimation] = useState<ImageAnimation>("none");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{
    title: string;
    type?: "success" | "error";
  }>({ title: "" });

  const navigate = useNavigate();

  const { data: maxFileSize } = useQuery({
    queryKey: ["max-file-size"],
    queryFn: () => getSettingByNameRequest("FILE_SIZE_LIMIT_IN_MEGA_BYTE"),
  });

  const upload = async () => {
    if (!file) {
      return;
    }

    if (!operatorId) {
      setMessage({
        title: "اپراتور انتخاب نشده است!",
        type: "error",
      });
      return;
    }

    if (file.type.startsWith("image") && (!delay || Number(delay) <= 0)) {
      setMessage({
        title: "مدت زمان نمایش تصویر به درستی وارد نشده است",
        type: "error",
      });
      return;
    }

    setLoading(true);
    const data = new FormData();
    data.append(`file`, file);
    if (file.type.startsWith("image")) {
      data.append("delay", delay.toString());
      data.append("animationName", animation);
    }

    const response =
      authState.role === "OPERATOR"
        ? await uploadFileRequest(data, operatorId)
        : await uploadFileByAdminRequest(data, operatorId);
    if (response.success) {
      setMessage({ title: "با موفقیت باگذاری شد", type: "success" });
      setTimeout(() => {
        navigate(-1);
      }, 2000);
    } else {
      setMessage({
        title: response.error?.toString()!,
        type: "error",
      });
    }
    setLoading(false);
  };

  const onAnimationChange = (event: SelectChangeEvent<ImageAnimation>) => {
    setAnimation(event.target.value as ImageAnimation);
  };

  const delayErrorText =
    delay === ""
      ? "مدت زمان نمایش تصویر را به 'ثانیه' وارد کنید"
      : Number(delay) < 0
      ? "ثانیه نمیتواند منفی باشد"
      : Number(delay) == 0
      ? "مقداری بزرگتر از صفر وارد کنید"
      : "";

  return (
    <div className="newFile">
      <div className="top">
        <Typography variant="h5" className="title">
          {title}
        </Typography>
      </div>
      <div className="bottom">
        {/* <div className="left">
          <img
            src={
              file
                ? URL.createObjectURL(file)
                : require("../../../assets/images/no_image.jpg")
            }
            alt="empty field"
            className="image"
          />
        </div> */}
        <div className="right">
          <OperatorSelector
            operatorId={operatorId}
            onOperatorChanged={setOperatorId}
            hasError={!operatorId}
          />
          <form action="">
            <div className="formInput fileInput">
              <label htmlFor="file" className="fileInput">
                {!!file && (
                  <Typography component={"span"}>{file.name}</Typography>
                )}

                <div className="placeholder">
                  <Typography component={"span"}>فایل:</Typography>
                  <MdOutlineCloudUpload className="icon" fontSize={"large"} />
                </div>
              </label>
              <input
                type="file"
                accept=".png, .jpg, .jpeg, .mp3, .mp4"
                id="file"
                style={{ display: "none" }}
                onChange={(e) => {
                  if (e.target.files !== null) {
                    setFile(e.target.files[0]);
                  }
                }}
              />
            </div>
            <Stack style={{margin: "0px 24px"}}>
              <Typography variant="caption">{`فرمت های قابل پذیرش شامل .png, .jpg, .jpeg, .mp3, .mp4 می‌باشد.`}</Typography>
              <Typography variant="caption">{`حداکثر حجم قابل اپلود در سیستم ${
                maxFileSize?.payload?.value ?? "-"
              }مگابایت می‌باشد.`}</Typography>
            </Stack>
            {!!file && file.type.startsWith("image") && (
              <div className="imageBox">
                <div className="inputs">
                  <TextField
                    error={!!delayErrorText}
                    type="number"
                    id="delay"
                    name="delay"
                    label="مدت زمان نمایش تصویر"
                    value={delay}
                    onChange={(e) => setDelay(e.target.value)}
                    helperText={delayErrorText}
                    placeholder="مدت زمان نمایش تصویر را به 'ثانیه' وارد کنید"
                    sx={{ width: "30ch", marginLeft: "24px" }}
                  />
                  <FormControl sx={{ width: "30ch", marginLeft: "24px" }}>
                    <InputLabel id="animation-label">انیمیشن ورود</InputLabel>
                    <Select
                      labelId="animation-label"
                      id="animation"
                      name="animation"
                      label="انیمیشن ورود"
                      value={animation}
                      onChange={onAnimationChange}
                    >
                      <MenuItem value={"none"}>{"بدون انیمیشن"}</MenuItem>
                      <MenuItem value={"rotate"}>{"چرخش"}</MenuItem>
                      <MenuItem value={"zoom"}>{"بزرگنمایی"}</MenuItem>
                      <MenuItem value={"fade"}>{"محو شدن"}</MenuItem>
                      <MenuItem value={"fade-left"}>{"محو شدن از چپ"}</MenuItem>
                      <MenuItem value={"fade-right"}>
                        {"محو شدن از راست"}
                      </MenuItem>
                      <MenuItem value={"fade-top"}>
                        {"محو شدن از بالا"}
                      </MenuItem>
                      <MenuItem value={"fade-bottom"}>
                        {"محو شدن از پایین"}
                      </MenuItem>
                      <MenuItem value={"flip-left"}>{"ورق زدن به چپ"}</MenuItem>
                      <MenuItem value={"flip-right"}>
                        {"ورق زدن به راست"}
                      </MenuItem>
                      <MenuItem value={"flip-top"}>
                        {"ورق زدن به بالا"}
                      </MenuItem>
                      <MenuItem value={"flip-bottom"}>
                        {"ورق زدن به پایین"}
                      </MenuItem>
                      <MenuItem value={"bounce"}>{"پرش"}</MenuItem>
                      <MenuItem value={"bounce-left"}>{"پرش از چپ"}</MenuItem>
                      <MenuItem value={"bounce-right"}>
                        {"پرش از راست"}
                      </MenuItem>
                      <MenuItem value={"bounce-top"}>{"پرش از بالا"}</MenuItem>
                      <MenuItem value={"bounce-bottom"}>
                        {"پرش از پایین"}
                      </MenuItem>
                    </Select>
                  </FormControl>
                </div>
                <div className="wrapper">
                  <Animator animation={animation}>
                    <img
                      className="tempImg"
                      src={require("../../../assets/images/temp_image.jpg")}
                      alt="temp"
                    />
                  </Animator>
                </div>
              </div>
            )}
            <div className="formInput">
              <LoadingButton
                variant="contained"
                className="submitButton"
                loading={loading}
                onClick={upload}
              >
                تایید
              </LoadingButton>
            </div>
          </form>
        </div>
      </div>
      <Snackbar
        open={!!message.title}
        // message={error}
        autoHideDuration={5000}
        anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
        onClose={() => setMessage({ title: "" })}
      >
        <Alert severity={message.type} sx={{ width: "100%" }}>
          {message.title}
        </Alert>
      </Snackbar>
    </div>
  );
};
