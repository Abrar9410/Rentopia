"use server"

import { getCookie } from "@/lib/cookies-tokens";
import { Current_Status } from "@/types";
import { revalidateTag } from "next/cache";



export const addItem = async (payload: FormData) => {
    const token = await getCookie("token");
        if (!token) {
            return {
                success: false,
                message: "Authorization Token Missing! Please Login."
            };
        };
        
        const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/items/add-item`, {
            method: "POST",
            headers: {Cookie: `token=${token.value}`},
            body: payload,
            credentials: "include",
        });

        if (res.ok) {
            revalidateTag("ITEMS", {expire: 0});
            revalidateTag("MY_ITEMS", {expire: 0});
            revalidateTag("AVAILABLE_ITEMS", "max");
        };
         
        return await res.json();
};

export const getAllAvailableItems = async (query?: string) => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/items${query ? `?${query}` : ""}`, {
        next: {
            tags: ["AVAILABLE_ITEMS"],
            revalidate: 300
        }
    });

    return await res.json();
};

export const getAllItems = async (query?: string) => {
    const token = await getCookie("token");
    if (!token) {
        return {
            success: false,
            message: "Authorization Token Missing! Please Login."
        };
    };

    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/items/all-items${query ? `?${query}` : ""}`, {
        headers: { Cookie: `token=${token.value}` },
        credentials: "include",
        next: {
            tags: ["ITEMS"],
            revalidate: 300
        }
    });

    return await res.json();
};

export const getRentopiaItems = async (query?: string) => {
    const token = await getCookie("token");
    if (!token) {
        return {
            success: false,
            message: "Authorization Token Missing! Please Login."
        };
    };

    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/items/rentopia-items${query? `?${query}` : ""}`, {
        headers: { Cookie: `token=${token.value}` },
        credentials: "include",
        next: {
            tags: ["RENTOPIA_ITEMS"]
        }
    });

    return await res.json();
};

export const getMyItems = async (query?: string) => {
    const token = await getCookie("token");
    if (!token) {
        return {
            success: false,
            message: "Authorization Token Missing! Please Login."
        };
    };

    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/items/my-items${query? `?${query}` : ""}`, {
        headers: { Cookie: `token=${token.value}` },
        credentials: "include",
        next: {
            tags: ["MY_ITEMS"]
        }
    });

    return await res.json();
};

export const getSingleAvailableItem = async (itemId: string) => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/items/${itemId}`, {
        next: {
            tags: [`ITEM-${itemId}`]
        }
    });

    return await res.json();
};

export const getSingleItem = async (itemId: string) => {
    const token = await getCookie("token");
    if (!token) {
        return {
            success: false,
            message: "Authorization Token Missing! Please Login."
        };
    };

    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/items/all-items/${itemId}`, {
        headers: { Cookie: `token=${token.value}` },
        credentials: "include",
        next: {
            tags: [`ITEM-${itemId}`]
        }
    });

    return await res.json();
};

export const editRentopiaItem = async (itemId: string, payload: FormData) => {
    const token = await getCookie("token");
    if (!token) {
        return {
            success: false,
            message: "Authorization Token Missing! Please Login."
        };
    };

    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/items/edit-rentopia-item/${itemId}`, {
        method: "PATCH",
        headers: { Cookie: `token=${token.value}` },
        body: payload,
        credentials: "include",
    });

    if (res.ok) {
        revalidateTag("ITEMS", "max");
        revalidateTag("RENTOPIA_ITEMS", {expire: 0});
        revalidateTag(`Item-${itemId}`, {expire: 0});
    };

    return await res.json();
};

export const editItem = async (itemId: string, payload: FormData) => {
    const token = await getCookie("token");
    if (!token) {
        return {
            success: false,
            message: "Authorization Token Missing! Please Login."
        };
    };

    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/items/edit-item/${itemId}`, {
        method: "PATCH",
        headers: { Cookie: `token=${token.value}` },
        body: payload,
        credentials: "include",
    });

    if (res.ok) {
        revalidateTag("ITEMS", "max");
        revalidateTag("MY_ITEMS", {expire: 0});
        revalidateTag(`Item-${itemId}`, {expire: 0});
    };

    return await res.json();
};

export const editItemStatus = async (itemId: string, payload: {current_status: Current_Status}) => {
    const token = await getCookie("token");
    if (!token) {
        return {
            success: false,
            message: "Authorization Token Missing! Please Login."
        };
    };

    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/items/update-status/${itemId}`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
            Cookie: `token=${token.value}`
        },
        body: JSON.stringify(payload),
        credentials: "include",
    });

    if (res.ok) {
        revalidateTag("ITEMS", {expire: 0});
        revalidateTag("AVAILABLE_ITEMS", {expire: 0});
        revalidateTag("MY_ITEMS", {expire: 0});
        revalidateTag(`Item-${itemId}`, {expire: 0});
    };

    return await res.json();
};

export const editItemAvailability = async (itemId: string, payload: {available: boolean}) => {
    const token = await getCookie("token");
    if (!token) {
        return {
            success: false,
            message: "Authorization Token Missing! Please Login."
        };
    };

    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/items/update-availability/${itemId}`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
            Cookie: `token=${token.value}`
        },
        body: JSON.stringify(payload),
        credentials: "include",
    });

    if (res.ok) {
        revalidateTag("ITEMS", {expire: 0});
        revalidateTag("AVAILABLE_ITEMS", {expire: 0});
        revalidateTag("MY_ITEMS", {expire: 0});
        revalidateTag(`Item-${itemId}`, {expire: 0});
    };

    return await res.json();
};

export const removeItem = async (itemId: string) => {
    const token = await getCookie("token");
    if (!token) {
        return {
            success: false,
            message: "Authorization Token Missing! Please Login."
        };
    };

    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/items/remove-item/${itemId}`, {
        method: "DELETE",
        headers: { Cookie: `token=${token.value}` },
        credentials: "include",
    });

    if (res.ok) {
        revalidateTag("ITEMS", "max");
        revalidateTag(`ITEM-${itemId}`, {expire: 0});
    };

    return await res.json();
};