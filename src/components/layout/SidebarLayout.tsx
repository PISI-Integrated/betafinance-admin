"use client";

import React, { useEffect, useState } from "react";
import {
  Sidebar,
  SidebarProvider,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarInset,
  useSidebar,
} from "@/components/ui/sidebar";
import { usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { ChevronDown, Bell } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { routes } from "@/lib/constants";
import Header from "@/components/global/Header";
import AuthGuard from "./AuthGuard";
import { getToken } from "@/lib/storage";
import { getUserInitials } from "@/lib/utils/formatters";
import logo from "../../../public/assets/logo.svg";

const nonDashboardPaths = ["/login", "/set-pin"];

function SidebarNav() {
  const pathname = usePathname();
  const { state, isMobile, setOpenMobile } = useSidebar();
  const [user, setUser] = useState<ILoginResponse["user"] | null>(null);

  const firstPartItems = routes.sidebarItems.slice(0, 4);
  const lastPartItems = routes.sidebarItems.slice(4, 6);
  const finalPartItems = routes.sidebarItems.slice(6);

  useEffect(() => {
    const loadUser = async () => {
      const user = await getToken("user");
      const parsedUser: ILoginResponse["user"] | null = user
        ? JSON.parse(user)
        : null;
      setUser(parsedUser);
    };
    loadUser();
  }, []);

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader className="border-b border-gray-200">
        {state === "expanded" && (
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-3 flex-1 min-w-0">
              <Avatar className="h-10 w-10 shrink-0">
                <AvatarImage
                  src={user?.avatar ?? undefined}
                  alt={user?.name || "Admin"}
                />
                <AvatarFallback className="bg-blue-100 text-blue-600">
                  {user?.name ? getUserInitials(user.name) : "AD"}
                </AvatarFallback>
              </Avatar>

              <div className="flex items-center gap-2 min-w-0 flex-1">
                <span className="text-sm font-semibold text-gray-900 truncate">
                  {user?.name || "Admin"}
                </span>
                <ChevronDown className="w-4 h-4 text-gray-500 shrink-0" />
              </div>
            </div>

            <button className="p-1 hover:bg-gray-100 rounded-md shrink-0">
              <Bell className="w-5 h-5 text-gray-600" />
            </button>
          </div>
        )}
      </SidebarHeader>

      <SidebarContent className="px-0 justify-between">
        <SidebarMenu className="gap-0 py-4 border-b">
          {firstPartItems.map((item, index) => (
            <SidebarMenuItem key={index}>
              <Link href={item.path} className="w-full">
                <SidebarMenuButton
                  isActive={pathname === item.path}
                  onClick={() => isMobile && setOpenMobile(false)}
                  className={`justify-start gap-3 rounded-none ${
                    pathname === item.path
                      ? "bg-[#DEEBFF] text-primary border-r border-primary"
                      : "text-gray-600 hover:bg-gray-50"
                  }`}
                >
                  <Image
                    src={pathname === item.path ? item.activeIcon : item.icon}
                    alt={item.alt}
                    width={20}
                    height={20}
                    className="shrink-0"
                  />
                  {state === "expanded" && <span>{item.title}</span>}
                </SidebarMenuButton>
              </Link>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>

        <div className="flex flex-col  h-full justify-between">
          <SidebarMenu className="gap-0 py-4">
            {lastPartItems.map((item, index) => (
              <SidebarMenuItem key={index}>
                <Link href={item.path} className="w-full">
                  <SidebarMenuButton
                    isActive={pathname === item.path}
                    onClick={() => isMobile && setOpenMobile(false)}
                    className={`justify-start gap-3 rounded-none ${
                      pathname === item.path
                        ? "bg-[#DEEBFF] text-primary border-r border-primary"
                        : "text-gray-600 hover:bg-gray-50"
                    }`}
                  >
                    <Image
                      src={pathname === item.path ? item.activeIcon : item.icon}
                      alt={item.alt}
                      width={20}
                      height={20}
                      className="shrink-0"
                    />
                    {state === "expanded" && <span>{item.title}</span>}
                  </SidebarMenuButton>
                </Link>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>

          <SidebarMenu className="gap-0 py-4">
            {finalPartItems.map((item, index) => (
              <SidebarMenuItem key={index}>
                <Link href={item.path} className="w-full">
                  <SidebarMenuButton
                    isActive={pathname === item.path}
                    onClick={() => isMobile && setOpenMobile(false)}
                    className={`justify-start gap-3 rounded-none ${
                      pathname === item.path
                        ? "bg-[#DEEBFF] text-primary border-r border-primary"
                        : "text-gray-600 hover:bg-gray-50"
                    }`}
                  >
                    <Image
                      src={pathname === item.path ? item.activeIcon : item.icon}
                      alt={item.alt}
                      width={20}
                      height={20}
                      className="shrink-0"
                    />
                    {state === "expanded" && <span>{item.title}</span>}
                  </SidebarMenuButton>
                </Link>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </div>
      </SidebarContent>

      <SidebarFooter className="border-t border-gray-200">
        {state === "expanded" && (
          <div className="px-4 py-2">
            <Image
              src={logo}
              alt="Beta Finance Logo"
              width={100}
              height={41}
              priority
              className="h-auto"
            />
          </div>
        )}
      </SidebarFooter>
    </Sidebar>
  );
}

interface SidebarLayoutProps {
  children: React.ReactNode;
}

export default function SidebarLayout({ children }: SidebarLayoutProps) {
  const pathname = usePathname();
  const isOnboardingPage = nonDashboardPaths.some((path) =>
    pathname?.startsWith(path),
  );

  if (isOnboardingPage) {
    return <>{children}</>;
  }
  return (
    <AuthGuard>
      <SidebarProvider defaultOpen={true}>
        <SidebarNav />
        <SidebarInset>
          <Header />
          <div className="flex-1 overflow-y-auto p-6">{children}</div>
        </SidebarInset>
      </SidebarProvider>
    </AuthGuard>
  );
}
