"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useLoginService } from "@/services/auth.service";
import { Form, FormField } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { LoginFormValues, loginSchema } from "@/schema/auth.validation";
import { TextInput } from "@/components/ui/TextInput";

// import { Metadata } from "next";

// export const metadata: Metadata = {
//   title: "Login | Betafinance",
//   description: "Login to Betafinance Admin Dashboard",
// };

export default function LoginPage() {
  const { loginAdvertiser, isLoggingIn } = useLoginService();

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      phone: "",
      pin: "",
    },
  });

  const onRegister = (values: LoginFormValues) => {
    loginAdvertiser(values.phone, values.pin);
  };

  return (
    <section className="p-5 flex flex-col gap-y-5 justify-center min-h-dvh md:max-w-[400px] md:mx-auto">
      <div className="flex flex-col gap-y-4 items-center mb-6 text-center text-titleBlack font-medium text-sm">
        <p>Log in to Betafinance Admin Dashboard</p>
      </div>

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onRegister)}
          className="flex flex-col gap-y-3"
        >
          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <TextInput
                label="Phone Number"
                placeholder="08xxxxxxxxxx"
                field={field}
              />
            )}
          />

          <FormField
            control={form.control}
            name="pin"
            render={({ field }) => (
              <TextInput
                label="PIN"
                type="password"
                placeholder="****"
                field={field}
              />
            )}
          />
          <Button
            loading={isLoggingIn}
            type="submit"
            className="mt-9 w-full disabled:cursor-not-allowed"
          >
            Login
          </Button>
        </form>
      </Form>
    </section>
  );
}
