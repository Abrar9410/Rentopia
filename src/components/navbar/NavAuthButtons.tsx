"use client";

import Link from "next/link";
import { Button } from "../ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { CircleUser } from "lucide-react";
import { NavigationMenu, NavigationMenuItem, NavigationMenuLink, NavigationMenuList } from "../ui/navigation-menu";

const NavAuthButtons = () => {
    return (
        <>
            <div className="min-[450px]:hidden">
                <Popover>
                    <PopoverTrigger asChild>
                        <CircleUser size={30} />
                    </PopoverTrigger>
                    <PopoverContent align="end" className="w-36 p-1 sm:hidden">
                        <NavigationMenu className="max-w-none *:w-full">
                            <NavigationMenuList className="flex-col items-start gap-0">
                                <NavigationMenuItem className="w-full">
                                    <NavigationMenuLink
                                        asChild
                                        className="py-1.5"
                                    >
                                        <Link href="/login">LOGIN</Link>
                                    </NavigationMenuLink>
                                </NavigationMenuItem>
                                <NavigationMenuItem className="w-full">
                                    <NavigationMenuLink
                                        asChild
                                        className="py-1.5"
                                    >
                                        <Link href="/register">SIGN UP</Link>
                                    </NavigationMenuLink>
                                </NavigationMenuItem>
                            </NavigationMenuList>
                        </NavigationMenu>
                    </PopoverContent>
                </Popover>
            </div>
            <div className="hidden min-[450px]:flex items-center gap-3">
                <Button variant="outline" asChild>
                    <Link href="/login">LOGIN</Link>
                </Button>
                <Button asChild>
                    <Link href="/register">SIGN UP</Link>
                </Button>
            </div>
        </>
    );
};

export default NavAuthButtons;