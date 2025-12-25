"use server";

import { UserRole } from "@/types";
import { ISidebarMenuSection } from "@/types/sideMenu";
import { Boxes, ChartBarStacked, ChessKing, CircleUser, Crown, Plus, ShoppingCart, Store, Users, Wrench } from "lucide-react";


export const getSideMenu = async (role: UserRole): Promise<ISidebarMenuSection[] | []> => {
    switch (role) {
        case "ADMIN":
            return [
                {
                    title: "Dashboard",
                    url: "/admin/dashboard",
                    items: [
                        {
                          title: "Overview",
                          url: "/admin/dashboard/overview",
                          icon: <ChartBarStacked className="h-5"/>
                        }
                    ],
                },
                {
                    title: "Inventory Management",
                    url: "/admin/dashboard",
                    items: [
                        {
                            title: "Add Item",
                            url: "/admin/dashboard/add-item",
                            icon: <Plus className="h-5" />
                        },
                        {
                            title: "Rentopia Items",
                            url: "/admin/dashboard/rentopia-items",
                            icon: <Store className="h-5" />
                        },
                        {
                            title: "Manage User-Items",
                            url: "/admin/dashboard/manage-user-items",
                            icon: <Wrench className="h-5" />
                        },
                    ]
                },
                {
                    title: "User Management",
                    url: "/admin/dashboard",
                    items: [
                        {
                            title: "Manage Users",
                            url: "/admin/dashboard/manage-users",
                            icon: <Users className="h-5" />
                        },
                        {
                            title: "Manage Orders",
                            url: "/admin/dashboard/manage-orders",
                            icon: <ChessKing className="h-5" /> 
                        },
                        // {
                        //     title: "Manage Payments",
                        //     url: "/admin/dashboard/manage-payments",
                        //     icon: <CircleUser className="h-5" /> 
                        // }
                    ]
                },
                {
                    title: "Settings",
                    url: "/admin/dashboard",
                    items: [
                        {
                            title: "Profile",
                            url: "/my-profile",
                            icon: <CircleUser className="h-5" />
                        }
                    ]
                }
            ];

        case "USER":
            return [
                {
                    title: "Dashboard",
                    url: "/dashboard",
                    items: [
                        {
                            title: "Overview",
                            url: "/dashboard/overview",
                            icon: <ChartBarStacked className="h-5" />
                        }
                    ],
                },
                {
                    title: "Items Management",
                    url: "/dashboard",
                    items: [
                        {
                            title: "Add Item",
                            url: "/dashboard/add-item",
                            icon: <Plus className="h-5" />
                        },
                        {
                            title: "My Items",
                            url: "/dashboard/my-items",
                            icon: <Boxes className="h-5" />
                        }
                    ]
                },
                {
                    title: "Orders and Payments",
                    url: "/dashboard",
                    items: [
                        {
                            title: "Customer Orders",
                            url: "/dashboard/customer-orders",
                            icon: <Crown className="h-5" />
                        },
                        {
                            title: "My Orders",
                            url: "/dashboard/my-orders",
                            icon: <ShoppingCart className="h-5" />
                        },
                        // {
                        //     title: "Payments",
                        //     url: "/dashboard/payments",
                        //     icon: <CircleUser className="h-5" />
                        // }
                    ]
                },
                {
                    title: "Settings",
                    url: "/dashboard",
                    items: [
                        {
                            title: "Profile",
                            url: "/my-profile",
                            icon: <CircleUser className="h-5" />
                        }
                    ]
                }
            ];

        default:
            return [];
    };
};