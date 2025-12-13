"use server"

import { FieldValues } from "react-hook-form";
import { deleteTokens, getCookie, setCookie } from "../lib/cookies-tokens";
import { parse } from "cookie";


export const login = async (data: FieldValues) => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
    });
    
    const loginInfo = await res.json();

    const setCookieHeaders = res.headers.getSetCookie();

    if (setCookieHeaders) {
        setCookieHeaders.forEach((cookie: string) => {
            const tokenObject = parse(cookie);

            if (tokenObject.token) {
                setCookie("token", tokenObject);
            };
            if (tokenObject.refreshToken) {
                setCookie("refreshToken", tokenObject);
            };
        });
    } else {
        return new Error("Set-Cookie headers are missing in the response.");
    };

    return loginInfo;
};

export const logout = async () => {
    const token = await getCookie("token");
    const refreshToken = await getCookie("refreshToken");
    if (!token || !refreshToken) {
        return new Error("You are not logged in!");
    };
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/auth/logout`, {
        method: "POST",
        headers: { Cookie: `token=${token.value}; refreshToken=${refreshToken.value}` },
        credentials: "include"
    });

    if (res.ok) {
        await deleteTokens();
    };

    return await res.json();
};

export const changePassword = async (data: FieldValues) => {
    const token = await getCookie("token");
    if (!token) {
        return {
            success: false,
            message: "You are not logged in!"
        };
    };

    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/auth/change-password`, {
        method: "PATCH",
        headers: {
            Cookie: `token=${token.value}`,
            "Content-Type": "application/json"
        },
        credentials: "include",
        body: JSON.stringify(data)
    });

    if (!res.ok) {
        return res;
    };

    return await res.json();
};

export const forgotPassword = async (data: FieldValues) => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/auth/forgot-password`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    });
    return await res.json();
};

export const resetPassword = async (data: FieldValues) => {
    const {token, ...payload} = data;
    if (!token) {
        return {
            success: false,
            message: "Reset-Password Token is missing!"
        };
    };

    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/auth/reset-password`, {
        method: "POST",
        headers: {
            Cookie: `token=${token}`,
            "Content-Type": "application/json"
        },
        credentials: "include",
        body: JSON.stringify(payload)
    });
    return await res.json();
};