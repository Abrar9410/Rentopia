"use client"

import { Button } from "@/components/ui/button";
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
import { ThemeToggler } from "../ThemeToggler";
import { usePathname, useRouter } from "next/navigation";
import { Home, LogOut } from "lucide-react";
import ConfirmationAlert from "../ConfirmationAlert";
import { toast } from "sonner";
import { logout } from "@/actions/auth";
import { IUser } from "@/types";



const navigationLinks = [
  { href: "/", label: "Home", role: "PUBLIC" },
  { href: "/items", label: "Browse Items", role: "PUBLIC" },
  { href: "/about", label: "About", role: "PUBLIC" },
  { href: "/contact", label: "Contact", role: "PUBLIC" }
];

export default function NavbarContent({ user }: { user: Partial<IUser> | undefined | null }) {

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
    <div className="w-11/12 md:w-10/12 xl:w-9/12 mx-auto flex h-16 justify-between gap-4">
      {/* Left side */}
      <div className="flex items-center gap-2">
        <div className="flex items-center md:hidden">
          {/* Mobile menu trigger */}
          <Popover>
            <PopoverTrigger asChild>
              <Button className="group size-8" variant="ghost" size="icon">
                <svg
                  className="pointer-events-none"
                  width={16}
                  height={16}
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M4 12L20 12"
                    className="origin-center -translate-y-[7px] transition-all duration-300 ease-[cubic-bezier(.5,.85,.25,1.1)] group-aria-expanded:translate-x-0 group-aria-expanded:translate-y-0 group-aria-expanded:rotate-[315deg]"
                  />
                  <path
                    d="M4 12H20"
                    className="origin-center transition-all duration-300 ease-[cubic-bezier(.5,.85,.25,1.8)] group-aria-expanded:rotate-45"
                  />
                  <path
                    d="M4 12H20"
                    className="origin-center translate-y-[7px] transition-all duration-300 ease-[cubic-bezier(.5,.85,.25,1.1)] group-aria-expanded:translate-y-0 group-aria-expanded:rotate-[135deg]"
                  />
                </svg>
              </Button>
            </PopoverTrigger>
            <PopoverContent align="start" className="w-36 p-1 md:hidden">
              <NavigationMenu className="max-w-none *:w-full">
                <NavigationMenuList className="flex-col items-start gap-0 md:gap-2">
                  {navigationLinks.map((link, index) => (
                    link.role === 'PUBLIC' &&
                    <NavigationMenuItem key={index} className="w-full">
                      <NavigationMenuLink
                        asChild
                        className="py-1.5"
                        active={link.href === "/" ? location === "/" : location.startsWith(link.href)}
                      >
                        <Link href={link.href}>{link.label}</Link>
                      </NavigationMenuLink>
                    </NavigationMenuItem>
                  ))}
                </NavigationMenuList>
              </NavigationMenu>
            </PopoverContent>
          </Popover>
        </div>
        <Link href="/" className="flex items-center">
          <Image src="/Rentopia-logo.PNG" alt="Logo" width={20} height={20} priority className="w-5 h-5" />
          <div className="w-max text-xl font-bold text-primary dark:text-blue-600">entopia</div>
        </Link>
      </div>
      {/* Main nav */}
      <div>
        {/* Navigation menu */}
        <NavigationMenu className="h-full *:h-full max-md:hidden">
          <NavigationMenuList className="h-full gap-1 lg:gap-2">
            {navigationLinks.map((link, index) => (
              link.role === "PUBLIC" &&
              <NavigationMenuItem key={index} className="h-full">
                <NavigationMenuLink
                  asChild
                    className="data-active:text-primary dark:data-active:text-blue-700 data-active:underline h-full justify-center rounded-none border-y-2 border-transparent py-1.5 font-medium hover:bg-transparent"
                  active={link.href === "/" ? location === "/" : location.startsWith(link.href)}
                >
                  <Link href={link.href}>{link.label}</Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
            ))}
          </NavigationMenuList>
        </NavigationMenu>
      </div>
      {/* Right side */}
      <div className="flex items-center gap-3">
        <ThemeToggler />
        {
          !user?.email ?
            <>
              <Button variant="outline" onClick={() => router.push("/login")}>
                LOGIN
              </Button>
              <Button onClick={() => router.push("/register")}>
                SIGN UP
              </Button>
            </> :
            <Popover>
              <PopoverTrigger asChild>
                <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-primary cursor-pointer hover:animate-pulse">
                  <Image
                    src={user.picture ? user.picture as string : "https://res.cloudinary.com/example.png"}
                    alt={user.name?.slice(0, 1).toUpperCase() as string}
                    width={40}
                    height={40}
                    className="object-cover"
                  />
                </div>
              </PopoverTrigger>
              <PopoverContent align="end" className="w-36 p-1">
                <NavigationMenu className="max-w-none *:w-full">
                  <NavigationMenuList className="flex-col items-start gap-0 md:gap-2">
                    <NavigationMenuItem className="w-full">
                      <NavigationMenuLink
                        asChild
                        className="py-1.5 hover:text-portfolio"
                      >
                        <Link href={`${user.role === 'ADMIN' ? '/admin' : ''}/dashboard/overview`}>
                          <p className="flex items-center gap-2">
                            <Home className="h-5 text-portfolio" />
                            Dashboard
                          </p>
                        </Link>
                      </NavigationMenuLink>
                      <ConfirmationAlert onConfirm={handleLogout} dialogDescription="You are going to log out from your account.">
                        <NavigationMenuLink className="cursor-pointer">
                          <p className="flex items-center gap-2 hover:text-red-500">
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
        }
      </div>
    </div>
  )
}
