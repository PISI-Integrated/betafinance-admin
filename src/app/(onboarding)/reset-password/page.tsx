"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useResetPasswordService } from "@/services/auth.service";
import { Form, FormField } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import {
  ResetPasswordFormValues,
  resetPasswordSchema,
} from "@/schema/auth.validation";
import { TextInput } from "@/components/ui/TextInput";
import Image from "next/image";
import { Lock } from "lucide-react";
import logo from "../../../../public/assets/logo.svg";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";

function ResetPasswordForm() {
  const searchParams = useSearchParams();
  const resetToken = searchParams.get("token") || "";
  const { resetPasswordAdmin, isResettingPassword } = useResetPasswordService();

  const form = useForm<ResetPasswordFormValues>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = (values: ResetPasswordFormValues) => {
    resetPasswordAdmin({
      resettoken: resetToken,
      newpassword: values.password,
    });
  };

  return (
    <section className="bg-[#FAFBFE] min-h-screen flex flex-col items-center justify-center p-6">
      <div className="mb-10">
        <Image
          src={logo}
          alt="Beta Finance Logo"
          width={100}
          height={41}
          priority
          className="h-auto"
        />
      </div>

      <div className="w-full max-w-[400px] bg-white rounded-lg border border-black/10 p-6">
        <div className="mb-8">
          <h1 className="text-[22px] font-bold text-[#0A0A0A] mb-2">
            Reset Password
          </h1>
          <p className="text-gray-500 text-sm">
            Enter your new password below.
          </p>
        </div>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col gap-y-6"
          >
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <TextInput
                  label="New Password"
                  type="password"
                  placeholder="••••••••"
                  icon={<Lock size={20} className="text-gray-400" />}
                  field={field}
                  labelClassName="text-gray-400 font-medium mb-1"
                  className="h-12 bg-white border-gray-200 focus:border-primary focus:ring-1 focus:ring-primary/20 transition-all px-4"
                />
              )}
            />

            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <TextInput
                  label="Confirm Password"
                  type="password"
                  placeholder="••••••••"
                  icon={<Lock size={20} className="text-gray-400" />}
                  field={field}
                  labelClassName="text-gray-400 font-medium mb-1"
                  className="h-12 bg-white border-gray-200 focus:border-primary focus:ring-1 focus:ring-primary/20 transition-all px-4"
                />
              )}
            />

            <Button
              loading={isResettingPassword}
              type="submit"
              className="w-full p-2.5 text-sm font-bold bg-primary hover:bg-primary/90 text-white rounded-sm transition-all mt-4"
            >
              Reset Password
            </Button>

            <div className="text-center mt-4">
              <Link
                href="/login"
                className="text-primary font-medium text-sm hover:underline"
              >
                Back to Sign in
              </Link>
            </div>
          </form>
        </Form>
      </div>
    </section>
  );
}

export default function ResetPasswordPage() {
  return (
    <Suspense>
      <ResetPasswordForm />
    </Suspense>
  );
}
