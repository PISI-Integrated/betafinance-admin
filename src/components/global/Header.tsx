"use client";
import { usePathname } from "next/navigation";
import { routes } from "@/lib/constants";
import HeaderSearch from "./HeaderSearch";
import HeaderOps from "./HeaderOps";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { PanelRight } from "lucide-react";

const Header = () => {
  const pathname = usePathname();
  const currentRoute = routes.sidebarItems.find(
    (item) => item.path === pathname,
  );

  return (
    <header className="sticky top-0 z-40 flex items-center justify-between gap-x-2 border-b border-gray-200 bg-white px-4 md:px-6 py-4">
      <div className="flex items-center gap-x-2 min-w-0">
        <SidebarTrigger className="hover:bg-gray-100 shrink-0">
          <PanelRight className="h-5 w-5 text-gray-600" />
        </SidebarTrigger>
        <h1 className="text-lg md:text-xl font-bold text-gray-900 truncate">
          {currentRoute?.title || "Overview"}
        </h1>
      </div>
      <HeaderSearch currentPath={pathname} />
      <div className="flex items-center gap-x-2">
        <HeaderOps currentPath={pathname} />
      </div>
    </header>
  );
};

export default Header;
