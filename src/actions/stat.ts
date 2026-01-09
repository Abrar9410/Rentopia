"use server";

import { getCookie } from "@/lib/cookies-tokens";


export const getStatsForAdmin = async () => {
    const token = await getCookie("token");
    if (!token) {
        return { message: "Authorization Token Missing! Please Login." };
    };
    
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/stats/admin`, {
        headers: {Cookie: `token=${token.value}`},
        credentials: "include",
        cache: "no-store",
    });

    if (!res.ok) {
        return { message: "Failed to fetch stats. Please try again later." };
    };

    return await res.json();
};

export const getStatsForUser = async () => {
    const token = await getCookie("token");
    if (!token) {
        return { message: "Authorization Token Missing! Please Login." };
    };
    
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/stats/user`, {
        headers: {Cookie: `token=${token.value}`},
        credentials: "include",
        cache: "no-store",
    });

    if (!res.ok) {
        return { message: "Failed to fetch stats. Please try again later." };
    };

    return await res.json();
};