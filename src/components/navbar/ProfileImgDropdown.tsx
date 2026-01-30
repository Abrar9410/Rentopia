"use client";
import {
    NavigationMenu,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
} from "@/components/ui/navigation-menu";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { CircleUser, Home, LogOut } from "lucide-react";
import ConfirmationAlert from "../ConfirmationAlert";
import { toast } from "sonner";
import { logout } from "@/actions/auth";
import { IUser } from "@/types";



const ProfileImgDropdown = ({ user }: { user: Partial<IUser> | undefined | null }) => {

    const location = usePathname();
    const router = useRouter();

    const handleLogout = async () => {
        const toastId = toast.loading("Logging Out...");
        const res = await logout();
        if (res.success) {
            router.refresh();
            toast.success("Logged Out Successfully", { id: toastId });
        } else {
            toast.error("Failed to Logout! Please try again.", { id: toastId });
        };
    };

    return (
        <Popover>
            <PopoverTrigger asChild>
                <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-primary cursor-pointer hover:animate-pulse">
                    <Image
                        src={user!.picture ? user!.picture as string : "https://res.cloudinary.com/example.png"}
                        alt={user!.name?.slice(0, 1).toUpperCase() as string}
                        width={40}
                        height={40}
                        className="object-cover"
                    />
                </div>
            </PopoverTrigger>
            <PopoverContent align="end" className="w-36 p-1">
                <NavigationMenu className="max-w-none *:w-full">
                    <NavigationMenuList className="flex-col items-start gap-2">
                        <NavigationMenuItem className="w-full">
                            <NavigationMenuLink
                                asChild
                                className="py-1.5"
                                active={location.includes('/dashboard')}
                            >
                                <Link href={`${user!.role === 'ADMIN' ? '/admin' : ''}/dashboard/overview`}>
                                    <p className="flex items-center gap-2">
                                        <Home className="h-5" />
                                        Dashboard
                                    </p>
                                </Link>
                            </NavigationMenuLink>
                            <NavigationMenuLink
                                asChild
                                className="py-1.5"
                                active={location === '/my-profile'}
                            >
                                <Link href="/my-profile">
                                    <p className="flex items-center gap-2">
                                        <CircleUser className="h-5" />
                                        My Profile
                                    </p>
                                </Link>
                            </NavigationMenuLink>
                            <ConfirmationAlert onConfirm={handleLogout} dialogDescription="You are going to log out from your account.">
                                <NavigationMenuLink className="cursor-pointer py-1.5 hover:text-red-500 hover:bg-transparent">
                                    <p className="flex items-center gap-2">
                                        <LogOut className="h-5 text-red-500" />
                                        Logout
                                    </p>
                                </NavigationMenuLink>
                            </ConfirmationAlert>
                        </NavigationMenuItem>
                    </NavigationMenuList>
                </NavigationMenu>
            </PopoverContent>
        </Popover>
    );
};

export default ProfileImgDropdown;