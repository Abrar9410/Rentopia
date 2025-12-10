"use client"

import * as React from "react"

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar";
import Link from "next/link";
import Image from "next/image";
import ConfirmationAlert from "./ConfirmationAlert";
import { /*ChartBarStacked,*/ CircleUser, ImagePlus, LogOut, MonitorCog, NotebookPen, NotepadText } from "lucide-react";
import { useUser } from "@/contexts/UserContext";
import { usePathname, useRouter } from "next/navigation";
import { logout } from "@/actions/auth";
import { toast } from "sonner";


const navMain = [
  {
    title: "Manage Portfolio",
    url: "/dashboard",
    items: [
      // {
      //   title: "Overview",
      //   url: "/dashboard/overview",
      //   icon: <ChartBarStacked className="h-5"/>
      // },
      {
        title: "Add Project",
        url: "/dashboard/add-project",
        icon: <ImagePlus className="h-5"/>
      },
      {
        title: "Create Blog",
        url: "/dashboard/create-blog",
        icon: <NotebookPen className="h-5"/>
      },
      {
        title: "Manage Projects",
        url: "/dashboard/manage-projects",
        icon: <MonitorCog className="h-5"/>
      },
      {
        title: "Manage Blogs",
        url: "/dashboard/manage-blogs",
        icon: <NotepadText className="h-5"/>
      },
      {
        title: "Profile",
        url: "/dashboard/profile",
        icon: <CircleUser className="h-5" />
      }
    ],
  }
];

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {

  const { setUser } = useUser();
  const router = useRouter();
  const location = usePathname();

  const handleLogout = async () => {
    const toastId = toast.loading("Logging Out...");
    const res = await logout();
    if (res.success) {
      setUser(null);
      toast.success("Logged Out Successfully", { id: toastId });
      router.push("/");
    } else {
      toast.error("Failed to Logout! Please try again.", { id: toastId });
    };
  };

  return (
    <Sidebar {...props}>
      <SidebarHeader>
        <Link href="/" className="mt-2 ml-5">
          <Image src="/my_logo.PNG" alt="Logo" width={60} height={40} priority className="w-[60px] h-[40px]"/>
        </Link>
      </SidebarHeader>
      <SidebarContent className="pl-3">
        {/* We create a SidebarGroup for each parent. */}
        {navMain.map((item) => (
          <SidebarGroup key={item.title}>
            <SidebarGroupLabel>{item.title}</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {item.items.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild isActive={location.startsWith(item.url)}>
                      <Link href={item.url}>
                        <p className={`${location.startsWith(item.url) && "text-portfolio"} flex items-center gap-2`}>
                          {item.icon}
                          {item.title}
                        </p>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>
      <SidebarRail />
      <SidebarFooter className="pl-3">
        <ConfirmationAlert onConfirm={handleLogout} dialogDescription="You are going to log out from your account.">
          <SidebarMenuButton className="cursor-pointer hover:text-red-500 mb-2">
            <p className="flex items-center gap-1"><LogOut className="h-5" />Logout</p>
          </SidebarMenuButton>
        </ConfirmationAlert>
      </SidebarFooter>
    </Sidebar>
  )
}
