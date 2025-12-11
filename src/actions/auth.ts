"use server"

import { FieldValues } from "react-hook-form";
import { deleteTokens, getCookie, setTokens } from "./cookies";


export const login = async (data: FieldValues) => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
    });
    
    const loginInfo = await res.json();
   
    if (loginInfo.success) {
        const { token, refreshToken } = loginInfo.data;
        await setTokens(token, refreshToken);
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
        body: JSON.stringify(data)
    });

    if (!res.ok) {
        return res;
    };

    return await res.json();
};