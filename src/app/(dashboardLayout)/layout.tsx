import ProfileImgDropdown from "@/components/navbar/ProfileImgDropdown";
import AppSidebar from "@/components/sidebar/AppSidebar";
import { ThemeToggler } from "@/components/ThemeToggler";
import { Separator } from "@/components/ui/separator";
import {
    SidebarInset,
    SidebarProvider,
    SidebarTrigger,
} from "@/components/ui/sidebar";
import { getCurrentUser } from "@/lib/currentUser";



const DashboardLayout = async ({ children }: { children: React.ReactNode }) => {

    const user = await getCurrentUser();

    return (
        <SidebarProvider>
            <AppSidebar />
            <SidebarInset>
                <header className="flex h-16 shrink-0 items-center justify-between border-b px-4">
                    <div className="flex items-center gap-3">
                        <SidebarTrigger className="-ml-1 cursor-pointer" />
                        <Separator
                            orientation="vertical"
                            className="mr-2 data-[orientation=vertical]:h-4"
                        />
                    </div>
                    <div className="flex items-center justify-end gap-3">
                        <ThemeToggler />
                        <ProfileImgDropdown user={user} />
                    </div>
                </header>
                <div className="flex flex-1 flex-col w-11/12 mx-auto">
                    {children}
                </div>
            </SidebarInset>
        </SidebarProvider>
    );
};

export default DashboardLayout;