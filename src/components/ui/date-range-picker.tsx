"use client";
import * as React from "react";
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import { DateRange } from "react-day-picker";

import { cn } from "@/lib/utils";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { useEffect } from "react";

export function DateRangePicker({
  className,
}: React.HTMLAttributes<HTMLDivElement>) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const startDateParam = searchParams.get("start_date");
  const endDateParam = searchParams.get("end_date");

  const [date, setDate] = React.useState<DateRange | undefined>(() => {
    if (startDateParam && endDateParam) {
      const from = new Date(startDateParam);
      const to = new Date(endDateParam);
      if (!isNaN(from.getTime()) && !isNaN(to.getTime())) {
        return { from, to };
      }
    }
    return undefined;
  });

  const [tempDate, setTempDate] = React.useState<DateRange | undefined>(date);
  const [isOpen, setIsOpen] = React.useState(false);

  // Sync internal state with URL params
  useEffect(() => {
    if (startDateParam && endDateParam) {
      const from = new Date(startDateParam);
      const to = new Date(endDateParam);
      if (!isNaN(from.getTime()) && !isNaN(to.getTime())) {
        const newDate = { from, to };
        setDate(newDate);
        setTempDate(newDate);
      }
    } else {
      setDate(undefined);
      setTempDate(undefined);
    }
  }, [startDateParam, endDateParam]);

  const handleApply = () => {
    setDate(tempDate);
    const params = new URLSearchParams(searchParams.toString());
    if (tempDate?.from) {
      params.set("start_date", format(tempDate.from, "yyyy-MM-dd"));
    } else {
      params.delete("start_date");
    }
    if (tempDate?.to) {
      params.set("end_date", format(tempDate.to, "yyyy-MM-dd"));
    } else {
      params.delete("end_date");
    }
    router.push(`${pathname}?${params.toString()}`, { scroll: false });
    setIsOpen(false);
  };

  const handleClear = () => {
    setDate(undefined);
    setTempDate(undefined);
    const params = new URLSearchParams(searchParams.toString());
    params.delete("start_date");
    params.delete("end_date");
    router.push(`${pathname}?${params.toString()}`, { scroll: false });
    setIsOpen(false);
  };

  return (
    <div className={cn("grid gap-2", className)}>
      <Popover open={isOpen} onOpenChange={setIsOpen}>
        <PopoverTrigger asChild>
          <button
            id="date"
            className={cn(
              "flex items-center gap-2 rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm font-normal hover:bg-gray-50 transition-colors focus:outline-none focus:ring-2 focus:ring-primary/20",
              !date && "text-muted-foreground",
            )}
          >
            <CalendarIcon className="mr-1 h-4 w-4 text-gray-500" />
            <div className="flex items-center divide-x divide-gray-200">
              <div className="pr-3 flex items-center gap-2">
                <span className="text-[10px] uppercase tracking-wider text-gray-400 font-semibold hidden sm:inline">
                  Start
                </span>
                <span className="font-medium">
                  {date?.from
                    ? format(date.from, "dd/MM/yy")
                    : new Date().toLocaleDateString()}
                </span>
              </div>
              <div className="pl-3 flex items-center gap-2">
                <span className="text-[10px] uppercase tracking-wider text-gray-400 font-semibold hidden sm:inline">
                  End
                </span>
                <span className="font-medium">
                  {date?.to
                    ? format(date.to, "dd/MM/yy")
                    : new Date().toLocaleDateString()}
                </span>
              </div>
            </div>
          </button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="end" sideOffset={8}>
          <div className="p-1">
            <Calendar
              initialFocus
              mode="range"
              defaultMonth={tempDate?.from}
              selected={tempDate}
              onSelect={setTempDate}
              numberOfMonths={2}
            />
          </div>
          <div className="flex items-center justify-end gap-2 border-t p-3 bg-gray-50/50">
            <Button
              variant="outline"
              size="sm"
              onClick={handleClear}
              className="h-8 text-xs text-red-600 hover:text-red-700 hover:bg-red-50"
            >
              Clear Filter
            </Button>
            <Button
              size="sm"
              onClick={handleApply}
              className="h-8 text-xs bg-primary text-white hover:bg-primary/90"
              disabled={!tempDate?.from || !tempDate?.to}
            >
              Apply Filter
            </Button>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
}
