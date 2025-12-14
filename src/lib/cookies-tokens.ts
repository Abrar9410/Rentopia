/* eslint-disable @typescript-eslint/no-explicit-any */
"use server"

import { parse } from "cookie";
import { cookies } from "next/headers"
import { verifyToken } from "./jwtHandlers";


interface ITokenObject {
    token?: string;
    refreshToken?: string;
    httpOnly?: boolean;
    SameSite?: "lax" | "strict" | "none";
    Secure?: boolean;
    "Max-Age"?: string;
    Path?: string;
};


export const setCookie = async (name: "token" | "refreshToken", tokenObject: ITokenObject) => {
    const cookieStore = await cookies();
    cookieStore.set(name, (tokenObject.token ?? tokenObject.refreshToken) as string, {
        httpOnly: tokenObject.httpOnly || true,
        secure: tokenObject.Secure || true,
        sameSite: tokenObject.SameSite || "none",
        maxAge: Number(tokenObject["Max-Age"]) || (tokenObject.token? 60 * 60 * 24 : 60 * 60 * 24 * 7),
        path: tokenObject.Path || "/",
    });
};

export const getCookie = async (name: string) => {
    const cookieStore = await cookies();
    const cookie = cookieStore.get(name);
    if (!cookie) {
        return null;
    };

    return cookie;
};

export const deleteCookie = async (name: string) => {
    const cookieStore = await cookies();
    cookieStore.delete(name);
};

export const deleteTokens = async () => {
    await deleteCookie("token");
    await deleteCookie("refreshToken");
};

export async function getNewAccessToken() {
    try {
        const token = await getCookie("token");
        const refreshToken = await getCookie("refreshToken");

        //Case 1: Both tokens are missing - user is logged out
        if (!token && !refreshToken) {
            return {
                tokenRefreshed: false,
            };
        };

        // Case 2 : Access Token exist- and need to verify
        if (token) {
            const verifiedToken = await verifyToken(token.value as string);

            if (verifiedToken.success) {
                return {
                    tokenRefreshed: false,
                };
            };
        };

        //Case 3 : refresh Token is missing- user is logged out
        if (!refreshToken) {
            return {
                tokenRefreshed: false,
            };
        };

        //Case 4: Access Token is invalid/expired- try to get a new one using refresh token
        // This is the only case we need to call the API

        // Now we know: accessToken is invalid/missing AND refreshToken exists
        // Safe to call the API
        let accessTokenObject: null | any = null;
        let refreshTokenObject: null | any = null;

        // API Call - serverFetch will skip getNewAccessToken for /auth/refresh-token endpoint
        const res = await fetch("/auth/refresh-token", {
            method: "POST",
            headers: {
                Cookie: `refreshToken=${refreshToken}`,
            },
        });

        const result = await res.json();


        const setCookieHeaders = res.headers.getSetCookie();

        if (setCookieHeaders && setCookieHeaders.length > 0) {
            setCookieHeaders.forEach((cookie: string) => {
                const parsedCookie = parse(cookie);

                if (parsedCookie['token']) {
                    accessTokenObject = parsedCookie;
                }
                if (parsedCookie['refreshToken']) {
                    refreshTokenObject = parsedCookie;
                }
            })
        } else {
            throw new Error("No Set-Cookie header found!");
        };

        if (!accessTokenObject || !refreshTokenObject) {
            throw new Error("Tokens not found in cookies!");
        };

        await deleteCookie("token");
        await setCookie("token", accessTokenObject.accessToken);

        await deleteCookie("refreshToken");
        await setCookie("refreshToken", refreshTokenObject.refreshToken);

        if (!result.success) {
            throw new Error(result.message || "Token refresh failed");
        };


        return {
            tokenRefreshed: true,
            success: true,
            message: "Tokens refreshed successfully!"
        };


    } catch (error: any) {
        return {
            tokenRefreshed: false,
            success: false,
            message: error?.message || "Something went wrong!",
        };
    }

};