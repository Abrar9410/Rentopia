"use server";

import { getCookie } from "@/lib/cookies-tokens";


export const getPaymentByTransactionId = async (transactionId: string) => {
    const token = await getCookie("token");
    if (!token) {
        return { message: "Authorization Token Missing! Please Login." };
    };
    
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/payments/${transactionId}`, {
        headers: {Cookie: `token=${token.value}`},
        credentials: "include",
        cache: "no-store",
    });

    if (!res.ok) {
        return null;
    };
     
    return await res.json();
};

export const getInvoiceDownloadUrl = async (paymentId: string) => {
    const token = await getCookie("token");
    if (!token) {
        return { message: "Authorization Token Missing! Please Login." };
    };

    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/payments/invoice/${paymentId}`, {
        headers: { Cookie: `token=${token.value}` },
        credentials: "include",
        cache: "no-store",
    });

    if (!res.ok) {
        return null;
    };

    return await res.json();
};