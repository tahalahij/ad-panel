import { useEffect, useState } from "react";
import { useFilesDispatch, useFilesLoadingDispatch } from "../../context/file";
import { deleteFileRequest, getFilesListRequest } from "../../network/requests/FileRequests";

export const useFileData = () => {
  const [message, setMessage] = useState<{
    title: string;
    type?: "success" | "error";
  }>({ title: "" });
  const filesDispatch = useFilesDispatch();
  const filesLoadingDispatch = useFilesLoadingDispatch();

  const fetchData = async (page: number = 0) => {
    filesLoadingDispatch(true);
    const response = await getFilesListRequest({ page, limit: 100 });
    if (response.success) {
      filesDispatch({ type: "SET_LIST", value: response.payload });
    }
    filesLoadingDispatch(false);
  };

  const removeItem = async (_id: string) => {
    try {
      filesLoadingDispatch(true);
      const response = await deleteFileRequest(_id);
      if (response.success) {
        setMessage({ title: "با موفقیت حذف شد", type: "success" });
        filesDispatch({type: 'REMOVE_ITEM', value: _id});
      } else {
        setMessage({
          title: response.error?.toString()!,
          type: "error",
        });
      }
      filesLoadingDispatch(false);
    } catch (error) {
      setMessage({
        title: (error as any).toString(),
        type: "error",
      });
      filesLoadingDispatch(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return { fetchData, removeItem, message, setMessage };
};
