"use client";
import { useLoginApi } from "@/api/auth.api";
import { saveToken } from "@/lib/storage";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

const useLoginService = () => {
  const router = useRouter();
  const { mutate: login, isPending, error } = useLoginApi();

  const loginAdvertiser = (phone: string, pin: string) => {
    login(
      { phone, pin },
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
      },
    );
  };

  return {
    loginAdvertiser,
    isLoggingIn: isPending,
    logInError: error,
  };
};

export { useLoginService };
