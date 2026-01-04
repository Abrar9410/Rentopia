"use server";

import { revalidateTag } from "next/cache";
import { getCookie } from "../lib/cookies-tokens";
import { ORDER_STATUS } from "@/types";


export const placeOrder = async (payload: { item: string, startDate: Date, endDate: Date }) => {
    const token = await getCookie("token");
    if (!token) {
        return {
            success: false,
            message: "Authorization Token Missing! Please Login."
        };
    };

    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/orders`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Cookie: `token=${token.value}`
        },
        body: JSON.stringify(payload),
        credentials: "include"
    });

    revalidateTag("ORDERS", {expire: 0});
    revalidateTag("MY_ORDERS", {expire: 0});
    revalidateTag("AVAILABLE_ITEMS", {expire: 0});
     
    return await res.json();
};

export const getAllOrders = async (query?: string) => {
    const token = await getCookie("token");
    if (!token) {
        return {
            success: false,
            message: "Authorization Token Missing! Please Login."
        };
    };

    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/orders${query ? `?${query}` : ""}`, {
        headers: { Cookie: `token=${token.value}` },
        credentials: "include",
        next: {
            tags: ["ORDERS"],
            revalidate: 300
        }
    });

    return await res.json();
};

export const getMyOrders = async (query?: string) => {
    const token = await getCookie("token");
    if (!token) {
        return {
            success: false,
            message: "Authorization Token Missing! Please Login."
        };
    };

    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/orders/my-orders${query ? `?${query}` : ""}`, {
        headers: { Cookie: `token=${token.value}` },
        credentials: "include",
        next: {
            tags: ["MY_ORDERS"]
        }
    });

    return await res.json();
};

export const getCustomerOrders = async (query?: string) => {
    const token = await getCookie("token");
    if (!token) {
        return {
            success: false,
            message: "Authorization Token Missing! Please Login."
        };
    };

    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/orders/customer-orders${query ? `?${query}` : ""}`, {
        headers: { Cookie: `token=${token.value}` },
        credentials: "include",
        next: {
            tags: ["CUSTOMER_ORDERS"]
        }
    });

    return await res.json();
};

export const getSingleOrder = async (orderId: string) => {
    const token = await getCookie("token");
    if (!token) {
        return { message: "Authorization Token Missing! Please Login." };
    };
    
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/orders/${orderId}`, {
        headers: {Cookie: `token=${token.value}`},
        credentials: "include",
        next: {
            tags: [`ORDER-${orderId}`]
        }
    });

    if (!res.ok) {
        return null;
    };
     
    return await res.json();
};

export const updateOrderStatus = async (orderId: string, payload: {status: ORDER_STATUS}) => {
    const token = await getCookie("token");
    if (!token) {
        return {
            success: false,
            message: "Authorization Token Missing! Please Login."
        };
    };

    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/orders/${orderId}/status`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
            Cookie: `token=${token.value}`
        },
        body: JSON.stringify(payload),
        credentials: "include",
    });

    if (res.ok) {
        revalidateTag("ORDERS", {expire: 0});
        revalidateTag("AVAILABLE_ITEMS", {expire: 0});
        revalidateTag("MY_ORDERS", {expire: 0});
        revalidateTag(`ORDER-${orderId}`, {expire: 0});
    };

    return await res.json();
};