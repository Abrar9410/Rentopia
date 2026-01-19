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
import Link from "next/link";
import { ThemeToggler } from "../ThemeToggler";
import { usePathname } from "next/navigation";
import { IUser } from "@/types";
import NavAuthButtons from "./NavAuthButtons";
import Logo from "../Logo";
import ProfileImgDropdown from "./ProfileImgDropdown";



const navigationLinks = [
  { href: "/", label: "Home", role: "PUBLIC" },
  { href: "/items", label: "Browse Items", role: "PUBLIC" },
  { href: "/about", label: "About", role: "PUBLIC" },
  { href: "/contact", label: "Contact", role: "PUBLIC" },
  { href: "/faq", label: "FAQ", role: "PUBLIC" }
];

export default function NavbarContent({ user }: { user: Partial<IUser> | undefined | null }) {

  const location = usePathname();

  return (
    <div className="w-11/12 md:w-10/12 xl:w-9/12 mx-auto flex h-16 justify-between gap-4">
      {/* Left side */}
      <div className="flex items-center gap-2">
        <div className="flex items-center min-[820px]:hidden">
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
                    className="origin-center -translate-y-[7px] transition-all duration-300 ease-[cubic-bezier(.5,.85,.25,1.1)] group-aria-expanded:translate-x-0 group-aria-expanded:translate-y-0 group-aria-expanded:rotate-315"
                  />
                  <path
                    d="M4 12H20"
                    className="origin-center transition-all duration-300 ease-[cubic-bezier(.5,.85,.25,1.8)] group-aria-expanded:rotate-45"
                  />
                  <path
                    d="M4 12H20"
                    className="origin-center translate-y-[7px] transition-all duration-300 ease-[cubic-bezier(.5,.85,.25,1.1)] group-aria-expanded:translate-y-0 group-aria-expanded:rotate-135"
                  />
                </svg>
              </Button>
            </PopoverTrigger>
            <PopoverContent align="start" className="w-36 p-1 min-[820px]:hidden">
              <NavigationMenu className="max-w-none *:w-full">
                <NavigationMenuList className="flex-col items-start gap-0">
                  {navigationLinks.map((link, index) => (
                    link.role === 'PUBLIC' &&
                    <NavigationMenuItem key={index} className="w-full">
                      <NavigationMenuLink
                        asChild
                        className="py-1.5 data-active:text-primary dark:data-active:text-blue-700"
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
          <Logo />
          <span className="w-max text-xl font-bold text-primary dark:text-blue-600">entopia</span>
        </Link>
      </div>
      {/* Main nav */}
      <div>
        {/* Navigation menu */}
        <NavigationMenu className="h-full *:h-full max-[820px]:hidden">
          <NavigationMenuList className="h-full lg:gap-2">
            {navigationLinks.map((link, index) => (
              link.role === "PUBLIC" &&
              <NavigationMenuItem key={index} className="h-full">
                <NavigationMenuLink
                  asChild
                    className="data-active:text-primary dark:data-active:text-blue-700 hover:text-primary dark:hover:text-blue-700 h-full justify-center rounded-none border-y-2 border-transparent py-1.5 font-medium hover:bg-transparent"
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
      <div className="flex items-center justify-end gap-3">
        <ThemeToggler />
        {
          !user?.email ?
            <NavAuthButtons />:
            <ProfileImgDropdown user={user} />
        }
      </div>
    </div>
  )
}
