"use client";
import { useLoginApi, useLogoutApi, useSetPinApi } from "@/api/auth.api";
import { deleteToken, getToken, saveToken } from "@/lib/storage";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

const useLoginService = () => {
  const router = useRouter();
  const { mutate: login, isPending, error } = useLoginApi();

  const loginAdvertiser = (email: string, pin: string) => {
    login(
      { email, pin },
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
    loginAdvertiser,
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

export { useLoginService, useSetNewPinService, useLogoutService };
