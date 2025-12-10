import { AppSidebar } from "@/components/app-sidebar";
import { ThemeToggler } from "@/components/ThemeToggler";
import { Separator } from "@/components/ui/separator";
import {
    SidebarInset,
    SidebarProvider,
    SidebarTrigger,
} from "@/components/ui/sidebar";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
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
                    <ThemeToggler />
                </header>
                <div className="flex flex-1 flex-col gap-4 w-11/12 md:w-10/12 mx-auto p-4 sm:p-6">
                    {children}
                </div>
            </SidebarInset>
        </SidebarProvider>
    );
};

export default DashboardLayout;