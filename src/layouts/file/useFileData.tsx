import { useEffect } from "react";
import { useFilesDispatch, useFilesLoadingDispatch } from "../../context/file";
import { getFilesListRequest } from "../../network/requests/FileRequests";

export const useFileData = () => {
  const filesDispatch = useFilesDispatch();
  const filesLoadingDispatch = useFilesLoadingDispatch();

  const fetchData = async (page: number = 0) => {
    filesLoadingDispatch(true);
    const response = await getFilesListRequest({ page, limit: 100 });
    console.log(response);
    if (response.success) {
      filesDispatch({ type: "SET_LIST", value: response.payload });
    }
    filesLoadingDispatch(false);
  };

  useEffect(() => {
    fetchData();
    console.log("-------------fetch");
  }, []);

  return fetchData;
};
