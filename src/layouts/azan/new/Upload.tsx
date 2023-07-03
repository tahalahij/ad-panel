import "./upload.scss";
import { useState, FC } from "react";
import Typography from "@mui/material/Typography";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import TextField from "@mui/material/TextField";
import LoadingButton from "@mui/lab/LoadingButton";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import { uploadAzanMediaFileRequest, uploadAzanTimeStampsRequest } from "../../../network/requests/FileRequests";
import { useNavigate } from "react-router-dom";
import { MdOutlineCloudUpload } from "react-icons/md";
import { Animator, ImageAnimation } from "../../../components/scheduleModule";

type UploadProps = {
  title: string;
};

export const FileUpload: FC<UploadProps> = ({ title }) => {
  const [fileTimeStamp, setFileTimeStamp] = useState<File>();
  const [fileMedia, setFileMedia] = useState<File>();
  // const [delay, setDelay] = useState("");
  // const [animation, setAnimation] = useState<ImageAnimation>("none");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{
    title: string;
    type?: "success" | "error";
  }>({ title: "" });

  const navigate = useNavigate();

  const upload = async (fileType: "media" | "timeStamp") => {
    if (fileType === "timeStamp" && !fileTimeStamp) {
      return;
    }

    if (fileType === "media" && !fileMedia) {
      return;
    }

    setLoading(true);
    const data = new FormData();
    const uploadFile = fileType === "media" ? fileMedia : fileTimeStamp;
    data.append(`file`, uploadFile!);

    const response =
      fileType === "media"
        ? await uploadAzanMediaFileRequest(data)
        : await uploadAzanTimeStampsRequest(data);
    if (response.success) {
      setMessage({ title: "با موفقیت بارگذاری شد", type: "success" });
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

  return (
    <div className="uploadAzan">
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
              <label htmlFor="fileXLSX" className="fileInput">
                {!!fileTimeStamp && (
                  <Typography component={"span"}>
                    {fileTimeStamp.name}
                  </Typography>
                )}

                <div className="placeholder">
                  <Typography component={"span"}>اکسل برنامه اذان:</Typography>
                  <MdOutlineCloudUpload className="icon" fontSize={"large"} />
                </div>
              </label>
              <input
                type="file"
                accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel, .csv"
                id="fileXLSX"
                style={{ display: "none" }}
                onChange={(e) => {
                  if (e.target.files !== null) {
                    setFileTimeStamp(e.target.files[0]);
                  }
                }}
              />
            </div>

            <div className="formInput">
              <LoadingButton
                variant="contained"
                className="submitButton"
                loading={loading}
                onClick={() => upload("timeStamp")}
              >
                ارسال
              </LoadingButton>
            </div>
          </form>
          <form action="">
            <div className="formInput fileInput">
              <label htmlFor="fileMedia" className="fileInput">
                {!!fileMedia && (
                  <Typography component={"span"}>{fileMedia.name}</Typography>
                )}

                <div className="placeholder">
                  <Typography component={"span"}>فایل پخش اذان:</Typography>
                  <MdOutlineCloudUpload className="icon" fontSize={"large"} />
                </div>
              </label>
              <input
                type="file"
                accept="video/*, audio/*"
                id="fileMedia"
                style={{ display: "none" }}
                onChange={(e) => {
                  if (e.target.files !== null) {
                    setFileMedia(e.target.files[0]);
                    console.log(e.target.files[0]);
                  }
                }}
              />
            </div>

            <div className="formInput">
              <LoadingButton
                variant="contained"
                className="submitButton"
                loading={loading}
                onClick={() => upload("media")}
              >
                ارسال
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
