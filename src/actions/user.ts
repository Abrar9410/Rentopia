"use server"

import { getCookie } from "../lib/cookies-tokens";


export const createUser = async (payload: FormData) => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/users/create-user`, {
        method: "POST",
        body: payload,
    });

    if (!res.ok) {
        return res;
    };
     
    return await res.json();
};

export const getMe = async () => {
    const token = await getCookie("token");
    if (!token) {
        return null;
    };
    
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/users/me`, {
        headers: {Cookie: `token=${token.value}`},
        credentials: "include",
    });

    if (!res.ok) {
        return null;
    };
    const data = await res.json(); 
    return data.data;
};

export const getAllUsers = async (query: string) => {
    const token = await getCookie("token");
    if (!token) {
        return {message: "Authorization Token Missing! Please Login."};
    };
    
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/users/all-users${query || ""}`, {
        headers: {Cookie: `token=${token.value}`},
        credentials: "include",
    });

    if (!res.ok) {
        return null;
    };
     
    return await res.json();
};

export const getSingleUser = async (userId: string) => {
    const token = await getCookie("token");
    if (!token) {
        return null;
    };
    
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/users/${userId}`, {
        headers: {Cookie: `token=${token.value}`},
        credentials: "include",
    });

    if (!res.ok) {
        return null;
    };
     
    return await res.json();
};

export const updateUser = async (userId: string, payload: FormData) => {
    const token = await getCookie("token");
    if (!token) {
        return null;
    };
    
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/users/update-user/${userId}`, {
        headers: {Cookie: `token=${token.value}`},
        body: payload,
        credentials: "include",
    });

    if (!res.ok) {
        return res;
    };
     
    return await res.json();
};

export const deleteUser = async (userId: string) => {
    const token = await getCookie("token");
    if (!token) {
        return null;
    };
    
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/users/delete-user/${userId}`, {
        method: "DELETE",
        headers: {Cookie: `token=${token.value}`},
        credentials: "include",
    });

    if (!res.ok) {
        return res;
    };
     
    return await res.json();
};