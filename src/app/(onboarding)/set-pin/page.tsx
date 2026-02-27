"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSetNewPinService } from "@/services/auth.service";
import { Form, FormField } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { SetPinFormValues, setPinSchema } from "@/schema/auth.validation";
import { TextInput } from "@/components/ui/TextInput";
import Image from "next/image";
import { Lock } from "lucide-react";
import logo from "../../../../public/assets/logo.svg";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";

function SetPinForm() {
  const searchParams = useSearchParams();
  const token = searchParams.get("token") || "";
  const { setNewPin, isSettingPin } = useSetNewPinService();

  const form = useForm<SetPinFormValues>({
    resolver: zodResolver(setPinSchema),
    defaultValues: {
      pin: "",
      confirmPin: "",
    },
  });

  const onSubmit = (values: SetPinFormValues) => {
    setNewPin(values.pin, token);
  };

  return (
    <div className="w-full max-w-[400px] bg-white rounded-lg border border-black/10 p-6">
      <h1 className="text-[22px] font-bold text-[#0A0A0A] mb-2">Set New Pin</h1>
      <p className="text-sm text-gray-500 mb-8">
        Create a secure 4-digit PIN for your account
      </p>

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-y-6"
        >
          <FormField
            control={form.control}
            name="pin"
            render={({ field }) => (
              <TextInput
                label="New Pin"
                type="password"
                placeholder="••••"
                maxLength={4}
                icon={<Lock size={20} className="text-gray-400" />}
                field={field}
                labelClassName="text-gray-400 font-medium mb-1"
                className="h-12 bg-white border-gray-200 focus:border-primary focus:ring-1 focus:ring-primary/20 transition-all px-4"
              />
            )}
          />

          <FormField
            control={form.control}
            name="confirmPin"
            render={({ field }) => (
              <TextInput
                label="Confirm Pin"
                type="password"
                placeholder="••••"
                maxLength={4}
                icon={<Lock size={20} className="text-gray-400" />}
                field={field}
                labelClassName="text-gray-400 font-medium mb-1"
                className="h-12 bg-white border-gray-200 focus:border-primary focus:ring-1 focus:ring-primary/20 transition-all px-4"
              />
            )}
          />

          <Button
            loading={isSettingPin}
            type="submit"
            className="w-full p-2.5 text-sm font-bold bg-primary hover:bg-primary/90 text-white rounded-sm transition-all mt-4"
          >
            Set Pin
          </Button>
        </form>
      </Form>
    </div>
  );
}

export default function SetPinPage() {
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

      <Suspense fallback={<div>Loading...</div>}>
        <SetPinForm />
      </Suspense>
    </section>
  );
}
