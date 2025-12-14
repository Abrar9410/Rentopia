"use client";

import {
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar";
import Link from "next/link";
import ConfirmationAlert from "../ConfirmationAlert";
import { LogOut } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { logout } from "@/actions/auth";
import { toast } from "sonner";
import { ISidebarMenuSection } from "@/types/sideMenu";



export default function AppSidebarContent({ sideMenu }: {sideMenu: ISidebarMenuSection[]}) {

  const router = useRouter();
  const location = usePathname();

  const handleLogout = async () => {
    const toastId = toast.loading("Logging Out...");
    const res = await logout();
    if (res.success) {
      router.refresh();
      toast.success("Logged Out Successfully", { id: toastId });
      router.push("/");
    } else {
      toast.error("Failed to Logout! Please try again.", { id: toastId });
    };
  };

  return (
    <>
      <SidebarContent className="pl-3">
        {/* We create a SidebarGroup for each parent. */}
        {sideMenu.map((item) => (
          <SidebarGroup key={item.title}>
            <SidebarGroupLabel>{item.title}</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {item.items.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild isActive={location.startsWith(item.url)}>
                      <Link href={item.url}>
                        <p className={`${location.startsWith(item.url) && "text-primary"} flex items-center gap-2`}>
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
    </>
  )
}
