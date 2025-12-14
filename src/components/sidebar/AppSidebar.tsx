import { getCurrentUser } from "@/lib/currentUser";
import { getSideMenu } from "@/lib/roleBasedSideMenu";
import { UserRole } from "@/types";
import Image from "next/image";
import { Sidebar, SidebarHeader } from "../ui/sidebar";
import Link from "next/link";
import AppSidebarContent from "./AppSidebarContent";


const AppSidebar = async ({...props}) => {

    const user = await getCurrentUser();

    const sideMenu = getSideMenu(user!.role as UserRole);

    return (
        <Sidebar {...props}>
            <SidebarHeader>
                <Link href="/" className="flex items-center mt-2 ml-5">
                    <Image src="/Rentopia-logo.PNG" alt="Logo" width={20} height={20} priority className="w-5 h-5" />
                    <div className="w-max text-xl font-bold text-primary">entopia</div>
                </Link>
            </SidebarHeader>
            <AppSidebarContent sideMenu={sideMenu}/>
        </Sidebar>
    );
};

export default AppSidebar;