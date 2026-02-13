import { routes } from "@/lib/constants";
import { Download, Calendar } from "lucide-react";
import { Button } from "../ui/button";

const HeaderOps = ({ currentPath }: { currentPath: string }) => {
  const matchedItem = routes.sidebarItems.find(
    (item) => item.path === currentPath,
  );

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

  return (
    <div className="flex items-center gap-x-2">
      {hasDateFilters && (
        <>
          <div className="flex items-center gap-2 rounded-lg border border-gray-300 bg-white px-[6px] py-2 text-sm">
            <span className="text-xs text-gray-400 font-light hidden sm:inline">
              Start date:
            </span>
            <span className="font-medium">12/02/25</span>
            <Calendar className="h-4 w-4 text-gray-500" />
          </div>
          <div className="flex items-center gap-2 rounded-lg border border-gray-300 bg-white px-[6px] py-2 text-sm">
            <span className="text-xs text-gray-400 font-light hidden sm:inline">End date:</span>
            <span className="font-medium">12/02/25</span>
            <Calendar className="h-4 w-4 text-gray-500" />
          </div>
        </>
      )}
      {hasDownload && (
        <Button className="bg-blue-100 text-blue-600 hover:bg-blue-200 px-3 md:px-4">
          <Download className="md:mr-2 h-4 w-4" />
          <span className="hidden md:inline">Download</span>
        </Button>
      )}
      {currentPath === "/marketers" && (
        <Button className="text-blue-600 text-sm font-normal bg-[#DEEBFF] px-3 md:px-4 shrink-0">
          <span className="md:hidden">+ Create</span>
          <span className="hidden md:inline">+ Create new marketer</span>
        </Button>
      )}
    </div>
  );
};

export default HeaderOps;
