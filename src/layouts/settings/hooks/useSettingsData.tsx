import { useState } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { queryClient } from "../../../App";
import {
  getAllSettingsRequest,
  updateSettingByIdRequest,
} from "../../../network/requests";
import { useAuthenticationState } from "../../../context";

export const useSettingsData = () => {
  const [message, setMessage] = useState<{
    title: string;
    type?: "success" | "error";
  }>({ title: "" });
  const auth = useAuthenticationState();

  const { data: settings } = useQuery({
    queryKey: ["system-settings"],
    queryFn: getAllSettingsRequest,
  });

  const { mutate: updateSettings, isLoading: loading } = useMutation({
    mutationFn: (params: {id: string, value: string}) =>
      updateSettingByIdRequest(params.id, params.value),
    onSuccess(response, variables, context) {
      if (response.success) {
        // queryClient.setQueryData<ResponseType<Setting[]>>(
        //   ["system-settings"],
        //   (oldData) => oldData?.payload?.filter((file) => file._id !== _id)
        // );
        setMessage({
          title: "با موفقیت ثبت شد!",
          type: "success",
        });
      } else {
        setMessage({
          title: response.error?.toString()!,
          type: "error",
        });
      }
    },
  });

  return { settings, updateSettings, loading, message, setMessage };
};
