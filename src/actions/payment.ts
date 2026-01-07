"use server";

import { getCookie } from "@/lib/cookies-tokens";


export const initiatePayment = async (orderId: string) => {
    const token = await getCookie("token");
    if (!token) {
        return {
            success: false,
            message: "Authorization Token Missing! Please Login."
        };
    };
    
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/payment/init-payment/${orderId}`, {
        method: "POST",
        headers: {Cookie: `token=${token.value}`},
        credentials: "include",
        cache: "no-store",
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
export const getPaymentByTransactionId = async (transactionId: string) => {
    const token = await getCookie("token");
    if (!token) {
        return { message: "Authorization Token Missing! Please Login." };
    };
    
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/payment/${transactionId}`, {
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

    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/payment/invoice/${paymentId}`, {
        headers: { Cookie: `token=${token.value}` },
        credentials: "include",
        cache: "no-store",
    });

    if (!res.ok) {
        return null;
    };

    return await res.json();
};