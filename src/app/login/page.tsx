"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useLoginService } from "@/services/auth.service";
import { Form, FormField } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { LoginFormValues, loginSchema } from "@/schema/auth.validation";
import { TextInput } from "@/components/ui/TextInput";
import Image from "next/image";
import { Phone, Lock, Mail } from "lucide-react";
import logo from "../../../public/assets/logo.svg";

export default function LoginPage() {
  const { loginAdvertiser, isLoggingIn } = useLoginService();

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      pin: "",
    },
  });

  const onRegister = (values: LoginFormValues) => {
    loginAdvertiser(values.email, values.pin);
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
        <h1 className="text-[22px] font-bold text-[#0A0A0A] mb-8">
          Admin Sign in
        </h1>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onRegister)}
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

            <div className="space-y-2">
              <FormField
                control={form.control}
                name="pin"
                render={({ field }) => (
                  <TextInput
                    label="Pin"
                    type="password"
                    placeholder="••••••••"
                    icon={<Lock size={20} className="text-gray-400" />}
                    field={field}
                    labelClassName="text-gray-400 font-medium mb-1"
                    className="h-12 bg-white border-gray-200 focus:border-primary focus:ring-1 focus:ring-primary/20 transition-all px-4"
                  />
                )}
              />
            </div>

            <Button
              loading={isLoggingIn}
              type="submit"
              className="w-full p-2.5 text-sm font-bold bg-primary hover:bg-primary/90 text-white rounded-sm transition-all mt-4"
            >
              Sign in
            </Button>
          </form>
        </Form>
      </div>
    </section>
  );
}
