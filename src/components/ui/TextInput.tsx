"use client";
import * as React from "react";
import { Eye, EyeOff } from "lucide-react";
import { cn } from "@/lib/utils";
import { FormItem, FormLabel, FormControl, FormMessage } from "./form";
import { Input } from "./input";

interface TextInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  field?: {
    name: string;
    value: string | boolean;
    onChange: (...event: any[]) => void;
    onBlur: () => void;
    ref: React.Ref<any>;
  };
  className?: string;
  icon?: React.ReactElement;
  iconPosition?: "left" | "right";
}

export function TextInput({
  label,
  field,
  className,
  type = "text",
  icon,
  iconPosition = "left",
  ...props
}: TextInputProps) {
  const isCheckbox = type === "checkbox";
  const isPassword = type === "password";
  const [showPassword, setShowPassword] = React.useState(false);

  const inputType = isPassword && showPassword ? "text" : type;
  const hasIcon = !!icon || isPassword;

  return (
    <FormItem>
      {label && <FormLabel>{label}</FormLabel>}

      <div className="relative w-full">
        <FormControl>
          <Input
            type={inputType}
            {...props}
            {...field}
            checked={isCheckbox ? Boolean(field?.value) : undefined}
            value={isCheckbox ? undefined : (field?.value as string)}
            onChange={(e) =>
              isCheckbox
                ? field?.onChange(e.target.checked)
                : field?.onChange(e.target.value)
            }
            className={cn(
              className,
              isCheckbox && "w-4 h-4",
              hasIcon && "pr-10",
              icon && iconPosition === "left" && "pl-9",
            )}
          />
        </FormControl>

        {/* Left icon */}
        {icon && iconPosition === "left" && (
          <span className="absolute left-3 inset-y-0 flex items-center text-gray-500 pointer-events-none">
            {icon}
          </span>
        )}

        {/* Password eye toggle */}
        {isPassword && (
          <button
            type="button"
            onClick={() => setShowPassword((prev) => !prev)}
            className="absolute right-3 inset-y-0 flex items-center text-gray-500 hover:text-gray-700"
          >
            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        )}
      </div>

      <FormMessage />
    </FormItem>
  );
}
