import { api } from "@/lib/axios";
import { AUTH } from "@/lib/constants/config";
import { useMutation } from "@tanstack/react-query";

const useLoginApi = () => {
  return useMutation<ILoginResponse, Error, ILoginDto>({
    mutationFn: (body: ILoginDto) =>
      api.post<ILoginResponse>(`${AUTH.login}`, body),
  });
};

const useSetPinApi = () => {
  return useMutation<string, Error, ISetPinDto>({
    mutationFn: (body: ISetPinDto) => api.post<string>(`${AUTH.setPin}`, body),
  });
};

export { useLoginApi, useSetPinApi };
