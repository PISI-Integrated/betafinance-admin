import { api } from "@/lib/axios";
import { AUTH } from "@/lib/constants/config";
import { useMutation } from "@tanstack/react-query";

const useLoginApi = () => {
  return useMutation<ILoginResponse, ICustomError, ILoginDto>({
    mutationFn: (body: ILoginDto) =>
      api.post<ILoginResponse>(`${AUTH.login}`, body),
  });
};

const useForgotPasswordApi = () => {
  return useMutation<IForgotPasswordResponse, ICustomError, IForgotPasswordDto>(
    {
      mutationFn: (body: IForgotPasswordDto) =>
        api.post<IForgotPasswordResponse>(`${AUTH.forgotPassword}`, body),
    },
  );
};

const useResetPasswordApi = () => {
  return useMutation<string, ICustomError, IResetPasswordDto>({
    mutationFn: (body: IResetPasswordDto) =>
      api.post<string>(`${AUTH.resetPassword}`, body),
  });
};

const useSetPinApi = () => {
  return useMutation<string, ICustomError, ISetPinDto>({
    mutationFn: (body: ISetPinDto) => api.post<string>(`${AUTH.setPin}`, body),
  });
};

const useLogoutApi = () => {
  return useMutation<string, ICustomError, string>({
    mutationFn: (refreshToken: string) =>
      api.post<string>(`${AUTH.logout(refreshToken)}`),
  });
};

export {
  useLoginApi,
  useForgotPasswordApi,
  useSetPinApi,
  useLogoutApi,
  useResetPasswordApi,
};
