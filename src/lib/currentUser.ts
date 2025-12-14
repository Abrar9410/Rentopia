"use server";

import { getCookie } from "@/lib/cookies-tokens";
import { verifyToken } from "@/lib/jwtHandlers";
import { IUser } from "@/types";



export const getCurrentUser = async () => {
    let user: Partial<IUser> | undefined = undefined;
    const result = await getCookie("token");
    if (result) {
        const verifiedToken = await verifyToken(result.value);
        if (verifiedToken.success) {
            user = verifiedToken.payload as Partial<IUser>;
        };
    };

    return user;
};