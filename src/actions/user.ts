"use server"

import { revalidateTag } from "next/cache";
import { getCookie } from "../lib/cookies-tokens";


export const createUser = async (payload: FormData) => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/users/register`, {
        method: "POST",
        body: payload,
    });

    if (!res.ok) {
        return {
            success: false,
            message: "An Error Occurred! Please try again.",
            data: null
        };
    };
     
    return await res.json();
};

export const getMe = async () => {
    const token = await getCookie("token");
    if (!token) {
        return {
            success: false,
            message: "You are not logged in!",
            data: {}
        };
    };
    
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/users/me`, {
        headers: {Cookie: `token=${token.value}`},
        credentials: "include",
        next: {
            tags: ["USER"]
        }
    });

    const data = await res.json();
    return data.data;
};

export const getAllUsers = async (query: string) => {
    const token = await getCookie("token");
    if (!token) {
        return {message: "Authorization Token Missing! Please Login."};
    };
    
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/users/all-users${query ? `?${query}` : ""}`, {
        headers: {Cookie: `token=${token.value}`},
        credentials: "include",
        next: {
            tags: ["USERS"],
            revalidate: 1800
        }
    });

    if (!res.ok) {
        return {
            success: false,
            message: "An Error Occurred! Please try again.",
            data: null
        };
    };
     
    return await res.json();
};

export const getSingleUser = async (userId: string) => {
    const token = await getCookie("token");
    if (!token) {
        return { message: "Authorization Token Missing! Please Login." };
    };
    
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/users/${userId}`, {
        headers: {Cookie: `token=${token.value}`},
        credentials: "include",
        next: {
            tags: [`USER-${userId}`]
        }
    });

    if (!res.ok) {
        return null;
    };
     
    return await res.json();
};

export const updateUser = async (userId: string, payload: FormData) => {
    const token = await getCookie("token");
    if (!token) {
        return { message: "Authorization Token Missing! Please Login." };
    };
    
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/users/update-user/${userId}`, {
        method: "PATCH",
        headers: {Cookie: `token=${token.value}`},
        body: payload,
        credentials: "include",
    });

    if (res.ok) {
        revalidateTag("USERS", "max");
        revalidateTag("USER", { expire: 0 });
        revalidateTag(`USER-${userId}`, { expire: 0 });
    };
     
    return await res.json();
};

export const deleteUser = async (userId: string) => {
    const token = await getCookie("token");
    if (!token) {
        return { message: "Authorization Token Missing! Please Login." };
    };
    
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/users/delete-user/${userId}`, {
        method: "DELETE",
        headers: {Cookie: `token=${token.value}`},
        credentials: "include",
    });

    if (res.ok) {
        revalidateTag("USERS", { expire: 0 });
        revalidateTag(`USER-${userId}`, { expire: 0 });
    };
     
    return await res.json();
};