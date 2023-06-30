import { useEffect, useState } from "react";
import { useFilesDispatch, useFilesLoadingDispatch } from "../../context/file";
import {
  deleteFileRequest,
  getFilesListRequest,
} from "../../network/requests/FileRequests";
import { useMutation, useQuery } from "@tanstack/react-query";
import { queryClient } from "../../App";
import { FileUploadItem } from "../../types/FileTypes";

export const useFileData = () => {
  const [message, setMessage] = useState<{
    title: string;
    type?: "success" | "error";
  }>({ title: "" });

  const { data, isLoading: loading } = useQuery({
    queryKey: ["files"],
    queryFn: async () => {
      const response = await getFilesListRequest();
      if (response.success) {
        return response.payload;
      } else throw response.error;
    },
    placeholderData: [],
  });

  const { mutate } = useMutation({
    mutationFn: (_id: string) => deleteFileRequest(_id),
    onSuccess(response, _id, context) {
      if (response.success) {
        setMessage({ title: "با موفقیت حذف شد", type: "success" });
        queryClient.setQueryData<FileUploadItem[]>(["files"], (oldData) =>
          oldData?.filter((file) => file._id !== _id)
        );
      } else {
        setMessage({
          title: response.error?.toString()!,
          type: "error",
        });
      }
    },
  });

  const removeItem = async (_id: string) => {
    mutate(_id)
  };

  return { data, removeItem, message, setMessage };
};
