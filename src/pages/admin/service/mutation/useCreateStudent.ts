import { useMutation } from "@tanstack/react-query";
import { message } from "antd";
import { request } from "@/config/request";

export const useCreateStudent = () => {
  return useMutation({
    mutationFn: (payload: {
      name: string;
      email: string;
      password: string;
      groupId?: string;
    }) =>
      request.post("/students", payload).then((res) => res.data),

    onSuccess: () => {
      message.success("Student muvaffaqiyatli yaratildi");
    },

    onError: () => {
      message.error("Student yaratishda xatolik");
    },
  });
};
