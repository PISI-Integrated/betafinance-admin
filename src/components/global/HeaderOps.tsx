import { Download } from "lucide-react";
import { Button } from "../ui/button";
import { DateRangePicker } from "../ui/date-range-picker";
import { useRouter } from "next/navigation";

const HeaderOps = ({ currentPath }: { currentPath: string }) => {
  // Pages with date filters and download button
  const hasDateFilters =
    currentPath === "/" ||
    currentPath === "/loans" ||
    currentPath === "/marketers";

  // All pages except help and settings have download button
  const hasDownload =
    currentPath !== "/help" &&
    currentPath !== "/settings" &&
    currentPath !== "/marketers";

  const router = useRouter();

  const openCreateMarketerModal = () => {
    const params = new URLSearchParams(window.location.search);
    params.set("add-marketer", "true");
    router.push(`${currentPath}?${params.toString()}`);
  };

  return (
    <div className="flex items-center gap-x-2">
      {hasDateFilters && <DateRangePicker />}

      {hasDownload && (
        <Button className="bg-blue-100 text-blue-600 hover:bg-blue-200 px-3 md:px-4">
          <Download className="md:mr-2 h-4 w-4" />
          <span className="hidden md:inline">Download</span>
        </Button>
      )}
      {currentPath === "/marketers" && (
        <Button
          onClick={openCreateMarketerModal}
          className="text-blue-600 text-sm font-normal bg-[#DEEBFF] px-3 md:px-4 shrink-0 hover:text-white"
        >
          <span className="md:hidden">+ Create</span>
          <span className="hidden md:inline">+ Create new marketer</span>
        </Button>
      )}
    </div>
  );
};

export default HeaderOps;
