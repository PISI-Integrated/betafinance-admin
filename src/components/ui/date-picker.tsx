"use client";
import * as React from "react";
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import { DayPicker } from "react-day-picker";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { useController, Control } from "react-hook-form";
import { cn } from "@/lib/utils";

interface DatePickerProps {
  control: Control<any>;
  name: string;
  className?: string;
}

export function DatePicker({ control, name, className }: DatePickerProps) {
  const { field } = useController({ control, name });

  const value = field.value as string | null | undefined;
  const parsed = value ? new Date(value) : undefined;
  const [date, setDate] = React.useState<Date | undefined>(() =>
    parsed && !isNaN(parsed.getTime()) ? parsed : undefined,
  );
  const [isOpen, setIsOpen] = React.useState(false);

  React.useEffect(() => {
    const p = value ? new Date(value) : undefined;
    setDate(p && !isNaN(p.getTime()) ? p : undefined);
  }, [value]);

  const handleSelect = (d: Date | undefined) => {
    setDate(d);
    if (!d) field.onChange(null);
    else field.onChange(format(d, "yyyy-MM-dd"));
  };

  const clear = () => handleSelect(undefined);

  return (
    <div className={cn("grid gap-2", className)}>
      <Popover open={isOpen} onOpenChange={setIsOpen}>
        <PopoverTrigger asChild>
          <button
            type="button"
            className={cn(
              "flex items-center gap-2 rounded-lg border bg-white px-3 py-2 text-sm hover:bg-gray-50 transition-colors focus:outline-none",
              !date && "text-muted-foreground",
            )}
          >
            <CalendarIcon className="h-4 w-4 text-gray-500" />
            <span className="font-medium">
              {date ? format(date, "yyyy-MM-dd") : "Immediate"}
            </span>
          </button>
        </PopoverTrigger>

        <PopoverContent className="w-auto p-0" align="start" sideOffset={8}>
          <div className="p-1">
            <Calendar
              mode="single"
              selected={date}
              onSelect={(d) => handleSelect(d ?? undefined)}
            />
          </div>
          <div className="flex items-center justify-end gap-2 border-t p-3 bg-gray-50/50">
            <Button
              variant="outline"
              size="sm"
              onClick={clear}
              className="h-8 text-xs text-red-600 hover:text-red-700 hover:bg-red-50"
            >
              Clear
            </Button>
            <Button
              size="sm"
              onClick={() => setIsOpen(false)}
              className="h-8 text-xs"
            >
              Done
            </Button>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
}

export default DatePicker;
