import { useState } from "react";
import {
  deleteFileByAdminRequest,
  deleteFileRequest,
  getFilesListByAdminRequest,
  getFilesListByOperatorRequest,
} from "../../network/requests/FileRequests";
import { useMutation, useQuery } from "@tanstack/react-query";
import { queryClient } from "../../App";
import { useAuthenticationState } from "../../context";

export const useFileData = (operatorId?: string, page: number = 0, limit: number = 100) => {
  const auth = useAuthenticationState();
  const [message, setMessage] = useState<{
    title: string;
    type?: "success" | "error";
  }>({ title: "" });

  const queryKey = auth.role === "OPERATOR" ? "my-files" : "files";
  const { data, isLoading: loading } = useQuery({
    queryKey: [queryKey, operatorId, page],
    queryFn: async () => {
      const apiRequest =
        queryKey === "my-files"
          ? getFilesListByOperatorRequest
          : getFilesListByAdminRequest;
      const response = await apiRequest({ operator: operatorId!, page, limit });
      if (response.success) {
        return response.payload;
      } else throw response.error;
    },
    placeholderData: {data: [], total: 0},
  });

  const { mutate } = useMutation({
    mutationFn: (_id: string) =>
      auth.role === "OPERATOR"
        ? deleteFileRequest(_id)
        : deleteFileByAdminRequest(_id),
    onSuccess(response, _id, context) {
      if (response.success) {
        setMessage({ title: "با موفقیت حذف شد", type: "success" });
        // queryClient.setQueryData<WithPagination<FileUploadItem[]>>([queryKey, operatorId, page], (oldData) =>
        //   oldData?.data?.filter((file) => file._id !== _id)
        // );
        queryClient.invalidateQueries({
          queryKey: [queryKey, operatorId, page]
        })
      } else {
        setMessage({
          title: response.error?.toString()!,
          type: "error",
        });
      }
    },
  });

  const removeItem = async (_id: string) => {
    mutate(_id);
  };

  return { data, removeItem, message, setMessage, loading };
};
