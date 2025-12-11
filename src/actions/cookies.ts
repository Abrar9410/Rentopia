"use server"

import { cookies } from "next/headers"



export const setCookie = async (name: string, value: string) => {
    const cookieStore = await cookies();
    cookieStore.set(name, value, {
        httpOnly: true,
        secure: true,
        sameSite: "none"
    });
};

export const getCookie = async (name: string) => {
    const cookieStore = await cookies();
    const cookieName = cookieStore.get(name);
    if (!cookieName) {
        return null;
    };

    return cookieName;
};

export const deleteCookie = async (name: string) => {
    const cookieStore = await cookies();
    const cookieName = cookieStore.delete(name);
    if (!cookieName) {
        return null;
    };

    return cookieName;
};

export const setTokens = async (token: string, refreshToken: string) => {
    await setCookie("token", token);
    await setCookie("refreshToken", refreshToken);
};

export const deleteTokens = async () => {
    await deleteCookie("token");
    await deleteCookie("refreshToken");
};