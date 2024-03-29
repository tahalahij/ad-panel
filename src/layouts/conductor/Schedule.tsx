import "./conductor.scss";
import { FC, useState, useRef, useEffect } from "react";
import Typography from "@mui/material/Typography";
import { DataTable, OperatorSelector } from "../../components";
import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import LoadingButton from "@mui/lab/LoadingButton";
import CircularProgress from "@mui/material/CircularProgress";
import TextField from "@mui/material/TextField";
import { useGetConductor, useConductorData } from "./data/useConductorData";
import { SortingList, SortListMethods } from "./SortingList";
import {
  addConductorRequest,
  updateConductorRequest,
  deleteConductorRequest,
  addConductorByAdminRequest,
  deleteConductorByAdminRequest,
} from "../../network/requests";
import { FileUploadItem } from "../../types/FileTypes";
import { useAuthenticationState } from "../../context";
import { userHasAccess } from "../../utils/UserAccess";

type ConductorProps = {};

const PAGE_SIZE = parseInt(process.env.REACT_APP_PAGE_SIZE!);

export const Conductor: FC<ConductorProps> = () => {
  const [operatorId, setOperatorId] = useState("");
  const [page, setPage] = useState(0);
  const navigate = useNavigate();
  const conductorList = useConductorData(operatorId);
  const {
    operatorConductors,
    loading: listLoading,
    addOperatorConductor,
    removeOperatorConductor,
  } = useGetConductor(operatorId, page, PAGE_SIZE);
  const authState = useAuthenticationState();

  const [isOrdering, setOrdering] = useState(false);
  const [conductorName, setConductorName] = useState("");
  const [orderList, setOrderList] = useState<FileUploadItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [isPatching, setPatching] = useState(false);
  const [message, setMessage] = useState<{
    title: string;
    type?: "success" | "error";
  }>({ title: "" });

  const patchingId = useRef("");
  const sortListRef = useRef<SortListMethods>(null);

  useEffect(() => {
    setOrderList(conductorList);
  }, [conductorList]);

  const submitSort = async () => {
    // if (!validateIPAddress(ip)) {
    //   setMessage({
    //     title: "آدرس ip دستگاه مورد نظر را وارد نکرده اید!",
    //     type: "error",
    //   });
    //   return;
    // }
    if (!conductorName) {
      setMessage({
        title: "نام سری پخش را وارد نکرده اید!",
        type: "error",
      });
      return;
    }
    setLoading(true);
    const tempArray = sortListRef.current
      ?.getOrderedList()
      .map((item) => item._id);
    const createConductor =
      authState.role === "OPERATOR"
        ? addConductorRequest
        : addConductorByAdminRequest;
    let response = isPatching
      ? await updateConductorRequest(
          patchingId.current,
          conductorName,
          tempArray!
        )
      : await createConductor(conductorName, tempArray!, operatorId);
    if (response.success) {
      setMessage({ title: "با موفقیت ثبت شد", type: "success" });
      setTimeout(() => {
        addOperatorConductor(response.payload!);
        // setIp("");
        setOrderList([]);
        patchingId.current = "";
        setPatching(false);
        setOrdering(false);
      }, 2000);
    } else {
      setMessage({
        title: response.error?.toString()!,
        type: "error",
      });
    }
    setLoading(false);
  };

  const onDeleteClick = async (_id: string) => {
    try {
      setLoading(true);
      const response =
        authState.role === "OPERATOR"
          ? await deleteConductorRequest(_id)
          : await deleteConductorByAdminRequest(_id);
      if (response.success) {
        setMessage({ title: "با موفقیت حذف شد", type: "success" });
        removeOperatorConductor(_id);
      } else {
        setMessage({
          title: response.error?.toString()!,
          type: "error",
        });
      }
      setLoading(false);
    } catch (error) {
      setMessage({
        title: "خطایی در حذف اطلاعات رخ داده است",
        type: "error",
      });
      setLoading(false);
    }
  };

  // const onViewClick = (_id: string) => {
  //   try {
  //     const index = operatorConductors.findIndex(
  //       (schedule) => schedule._id === _id
  //     );
  //     const activeIds = operatorConductors[index].conductor;
  //     // const tempIp = operatorConductors[index].ip;
  //     const tempArray = conductorList.filter(function (item) {
  //       return activeIds.indexOf(item._id) > -1;
  //     });
  //     setOrderList(tempArray);
  //     // setIp(tempIp);
  //     setPatching(true);
  //     // patchingId.current = _id;
  //     setOrdering(true);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  const onRemove = (_id: string) => {
    const index = orderList.findIndex((schedule) => schedule._id === _id);
    const temp = orderList.flat();
    temp.splice(index, 1);
    setOrderList(temp);
  };

  const onCancel = () => {
    setOrderList([]);
    setPatching(false);
    setOrdering(false);
  };

  const onAddScheduleClick = () => {
    setOrdering(true);
    // setIp("");
    setOrderList(conductorList);
  };

  return (
    <div className="conductor">
      <div className="header">
        <Typography variant="h6">
          {isOrdering ? "افزودن سری پخش جدید" : "سری های پخش"}
        </Typography>
        {/* <Typography variant="h6">{`${
          isPatching ? "ویرایش" : "افزودن"
        } سری پخش`}</Typography> */}

        <div className="buttonContainer">
          {isOrdering ? (
            <>
              <LoadingButton
                loading={loading}
                variant="outlined"
                onClick={onCancel}
              >
                لغو
              </LoadingButton>
              <LoadingButton
                disabled={isPatching}
                loading={loading}
                variant="contained"
                onClick={submitSort}
              >
                ثبت تغییرات
              </LoadingButton>
            </>
          ) : userHasAccess(authState.role, ["ADMIN", "OPERATOR"]) ? (
            <>
              <Button
                className="link"
                variant="outlined"
                onClick={() => onAddScheduleClick()}
              >
                افزودن
              </Button>
            </>
          ) : null}
        </div>
      </div>
      <div>
        <OperatorSelector
          operatorId={operatorId}
          onOperatorChanged={setOperatorId}
        />
      </div>
      {/* <SortingList listData={conductorList} ref={sortListRef} /> */}
      {isOrdering ? (
        <>
          <TextField
            error={false}
            id="conductorName"
            name="conductorName"
            value={conductorName}
            onChange={(e) => setConductorName(e.target.value)}
            label="نام سری پخش"
            helperText={""}
            placeholder="نام"
            sx={{ width: "30ch", marginLeft: "16px", marginTop: "8px" }}
          />
          <SortingList
            listData={orderList}
            ref={sortListRef}
            onRemove={onRemove}
          />
        </>
      ) : (
        <>
          {listLoading ? <CircularProgress /> : null}
          <DataTable
            columnKey="conductor"
            data={operatorConductors?.data}
            actionVisible={userHasAccess(authState.role, ["ADMIN", "OPERATOR"])}
            onDeleteClick={onDeleteClick}
            rowCount={operatorConductors?.total}
            page={page}
            onPageChange={setPage}
            pageSize={PAGE_SIZE}
            // onViewClick={onViewClick}
          />
        </>
      )}
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
