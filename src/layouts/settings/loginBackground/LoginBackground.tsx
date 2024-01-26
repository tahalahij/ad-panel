import "./loginBackground.scss";
import { useState, FC } from "react";
import Typography from "@mui/material/Typography";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import LoadingButton from "@mui/lab/LoadingButton";
import { uploadDashboardBackgroundRequest } from "../../../network/requests/FileRequests";
import { useNavigate } from "react-router-dom";
import { MdOutlineCloudUpload } from "react-icons/md";
import { PanelFilesNameEnum } from "../../../types/FileTypes";

type layoutProps = {
  title: string;
};

export const LoginBackground: FC<layoutProps> = ({ title }) => {
  const [file, setFile] = useState<File>();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{
    title: string;
    type?: "success" | "error";
  }>({ title: "" });

  const navigate = useNavigate();

  const upload = async () => {
    if (!file) {
      return;
    }

    setLoading(true);
    const data = new FormData();
    data.append(`file`, file);
    // data.append("animationName", "flip");

    const response = await uploadDashboardBackgroundRequest(data, PanelFilesNameEnum.FIRST_PAGE);
    if (response.success) {
      setMessage({ title: "با موفقیت بارگذاری شد", type: "success" });
      setTimeout(() => {
        navigate(-1);
      }, 2000);
    } else {
      setMessage({
        title:  response.error?.toString()!,
        type: "error",
      });
    }
    setLoading(false);
  };

  return (
    <div className="loginBackground">
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
          <form action="">
            <div className="formInput fileInput">
              <label htmlFor="file" className="fileInput">
                {!!file && (
                  <Typography component={"span"}>{file.name}</Typography>
                )}

                <div className="placeholder">
                  <Typography component={"span"}>تصویر:</Typography>
                  <MdOutlineCloudUpload className="icon" fontSize={"large"} />
                </div>
              </label>
              <input
                type="file"
                accept="image/png, image/jpeg"
                id="file"
                style={{ display: "none" }}
                onChange={(e) => {
                  if (e.target.files !== null) {
                    setFile(e.target.files[0]);
                  }
                }}
              />
            </div>
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
