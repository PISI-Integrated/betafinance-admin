"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForgotPasswordService } from "@/services/auth.service";
import { Form, FormField } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import {
  ForgotPasswordFormValues,
  forgotPasswordSchema,
} from "@/schema/auth.validation";
import { TextInput } from "@/components/ui/TextInput";
import Image from "next/image";
import { Mail } from "lucide-react";
import logo from "../../../../public/assets/logo.svg";
import Link from "next/link";

export default function ForgotPasswordPage() {
  const { forgotPasswordAdmin, isSendingCode } = useForgotPasswordService();

  const form = useForm<ForgotPasswordFormValues>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = (values: ForgotPasswordFormValues) => {
    forgotPasswordAdmin({ email: values.email });
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
            Forgot Password
          </h1>
          <p className="text-gray-500 text-sm">
            Enter your email to receive a reset link.
          </p>
        </div>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col gap-y-6"
          >
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <TextInput
                  label="Email"
                  placeholder="admin@mail.com"
                  icon={<Mail size={20} className="text-gray-400" />}
                  field={field}
                  labelClassName="text-gray-400 font-medium mb-1"
                  className="h-12 bg-white border-gray-200 focus:border-primary focus:ring-1 focus:ring-primary/20 transition-all px-4"
                />
              )}
            />

            <Button
              loading={isSendingCode}
              type="submit"
              className="w-full p-2.5 text-sm font-bold bg-primary hover:bg-primary/90 text-white rounded-sm transition-all mt-4"
            >
              Send Reset Code
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
