"use client";

import React from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { ChevronDown, Menu } from "lucide-react";

import {
  Sidebar as SidebarComponent,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarSeparator,
  useSidebar,
} from "@/components/ui/sidebar";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import Icon from "@/lib/constants/icons";
import { routes } from "@/lib/constants";

const Sidebar = () => {
  const pathname = usePathname();
  const { toggleSidebar, state } = useSidebar();

  const firstPartItems = routes.sidebarItems.slice(0, 3);
  const middlePartItem = routes.sidebarItems.slice(3, 4);
  const lastPartItems = routes.sidebarItems.slice(4);

  return (
    <SidebarComponent
      collapsible="icon"
      className="bg-white flex flex-col h-full"
    >
      <SidebarHeader className="flex justify-between items-center border-b pb-4">
        <div className="flex gap-3 items-center flex-1 min-w-0">
          <Avatar className="h-8 w-8 shrink-0">
            <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
            <AvatarFallback>AO</AvatarFallback>
          </Avatar>
          {state === "expanded" && (
            <div className="flex items-center gap-2 min-w-0 flex-1">
              <span className="text-xs font-bold text-gray-900 truncate">
                Alexis Olayinka
              </span>
              <ChevronDown className="w-4 h-4 text-gray-500 shrink-0" />
            </div>
          )}
        </div>
        <button
          onClick={toggleSidebar}
          className="p-1 hover:bg-gray-100 rounded-md shrink-0 ml-2"
        >
          <Menu className="w-5 h-5 text-gray-600" />
        </button>
      </SidebarHeader>

      <SidebarContent className="flex flex-col flex-1 px-0">
        <SidebarMenu>
          {firstPartItems.map((item, index) => (
            <SidebarMenuItem key={index}>
              <Link href={item.path} className="w-full">
                <SidebarMenuButton
                  isActive={pathname === item.path}
                  title={item.title}
                  className={`w-full justify-start gap-4 px-4 py-3 text-sm font-medium rounded-none ${
                    pathname === item.path
                      ? "bg-blue-50 text-blue-600"
                      : "text-gray-400 hover:text-gray-600"
                  }`}
                >
                  <Image
                    src={pathname === item.path ? item.activeIcon : item.icon}
                    alt={item.alt}
                    width={20}
                    height={20}
                  />
                  {state === "expanded" && <span>{item.title}</span>}
                </SidebarMenuButton>
              </Link>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>

        <SidebarSeparator className="my-2" />

        <SidebarMenu>
          {middlePartItem.map((item, index) => (
            <SidebarMenuItem key={index}>
              <Link href={item.path} className="w-full">
                <SidebarMenuButton
                  isActive={pathname === item.path}
                  title={item.title}
                  className={`w-full justify-start gap-4 px-4 py-3 text-sm font-medium rounded-none ${
                    pathname === item.path
                      ? "bg-blue-50 text-blue-600"
                      : "text-gray-400 hover:text-gray-600"
                  }`}
                >
                  <Image
                    src={pathname === item.path ? item.activeIcon : item.icon}
                    alt={item.alt}
                    width={20}
                    height={20}
                  />
                  {state === "expanded" && <span>{item.title}</span>}
                </SidebarMenuButton>
              </Link>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>

      <SidebarFooter className="border-t flex flex-col gap-4 px-0 pb-4">
        <SidebarMenu>
          {lastPartItems.map((item, index) => (
            <SidebarMenuItem key={index}>
              <Link href={item.path} className="w-full">
                <SidebarMenuButton
                  isActive={pathname === item.path}
                  title={item.title}
                  className={`w-full justify-start gap-4 px-4 py-3 text-sm font-medium rounded-none ${
                    pathname === item.path
                      ? "bg-blue-50 text-blue-600"
                      : "text-gray-400 hover:text-gray-600"
                  }`}
                >
                  <Image
                    src={pathname === item.path ? item.activeIcon : item.icon}
                    alt={item.alt}
                    width={20}
                    height={20}
                  />
                  {state === "expanded" && <span>{item.title}</span>}
                </SidebarMenuButton>
              </Link>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
        {state === "expanded" && (
          <div className="px-4 text-xl font-bold">
            <h2 className="text-gray-900">Beta Finance</h2>
          </div>
        )}
      </SidebarFooter>
    </SidebarComponent>
  );
};

export default Sidebar;
