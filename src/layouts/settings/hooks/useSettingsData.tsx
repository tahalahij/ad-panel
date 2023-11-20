import { useState } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import {
  getAllSettingsRequest,
  updateSettingByIdRequest,
} from "../../../network/requests";

export const useSettingsData = () => {
  const [message, setMessage] = useState<{
    title: string;
    type?: "success" | "error";
  }>({ title: "" });

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
