"use client";
import {
  useForgotPasswordApi,
  useLoginApi,
  useLogoutApi,
  useResetPasswordApi,
  useSetPinApi,
} from "@/api/auth.api";
import { deleteToken, getToken, saveToken } from "@/lib/storage";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

const useLoginService = () => {
  const router = useRouter();
  const { mutateAsync: login, isPending, error } = useLoginApi();

  const loginAdmin = (email: string, password: string) => {
    login(
      { email, password },
      {
        onSuccess: async (data) => {
          await Promise.all([
            saveToken("accessToken", data.token),
            saveToken("refreshToken", data.refreshToken),
            saveToken("user", JSON.stringify(data.user)),
          ]);
          toast.success("Signed in successfully");
          const search =
            typeof window !== "undefined" ? window.location.search : "";
          const redirectParam = new URLSearchParams(search).get("from");
          router.replace(redirectParam || "/");
        },
        onError: (error) => {
          toast.error(error.response?.data.detail || "Something went wrong");
        },
      },
    );
  };

  return {
    loginAdmin,
    isLoggingIn: isPending,
    logInError: error,
  };
};

const useSetNewPinService = () => {
  const router = useRouter();
  const { mutateAsync: setPin, isPending, error } = useSetPinApi();

  const setNewPin = (pin: string, reset_token: string) => {
    setPin(
      { pin, reset_token },
      {
        onSuccess: async (data) => {
          toast.success("Pin set successfully");
          router.replace("/login");
        },
        onError: () => {
          toast.error("Something went wrong");
        },
      },
    );
  };

  return {
    setNewPin,
    isSettingPin: isPending,
    setPinError: error,
  };
};

const useForgotPasswordService = () => {
  const {
    mutateAsync: forgotPassword,
    isPending,
    error,
  } = useForgotPasswordApi();

  const forgotPasswordAdmin = (data: IForgotPasswordDto) => {
    forgotPassword(data, {
      onSuccess: () => {
        toast.success("Reset code sent to your email address");
      },
      onError: () => {
        toast.error(error?.response?.data?.detail || "Something went wrong");
      },
    });
  };

  return {
    forgotPasswordAdmin,
    isSendingCode: isPending,
    sendCodeError: error,
  };
};

const useResetPasswordService = () => {
  const {
    mutateAsync: resetPassword,
    isPending,
    error,
  } = useResetPasswordApi();
  const router = useRouter();

  const resetPasswordAdmin = (data: IResetPasswordDto) => {
    resetPassword(data, {
      onSuccess: () => {
        toast.success("Password reset successful");
        router.push("/login");
      },
      onError: () => {
        toast.error(error?.response?.data?.detail || "Something went wrong");
      },
    });
  };

  return {
    resetPasswordAdmin,
    isResettingPassword: isPending,
    resetPasswordError: error,
  };
};

const useLogoutService = () => {
  const router = useRouter();
  const { mutateAsync: logout, isPending, error } = useLogoutApi();

  const logoutAdmin = async () => {
    const refreshToken = await getToken("refreshToken");
    logout(refreshToken!, {
      onSuccess: async () => {
        await Promise.all([
          deleteToken("accessToken"),
          deleteToken("refreshToken"),
          deleteToken("user"),
        ]);
        toast.success("Signed out successfully");
        router.replace("/login");
      },
      onError: () => {
        toast.error("Something went wrong");
      },
    });
  };

  return {
    logoutAdmin,
    isLoggingOut: isPending,
    logoutError: error,
  };
};

export {
  useLoginService,
  useSetNewPinService,
  useLogoutService,
  useForgotPasswordService,
  useResetPasswordService,
};
