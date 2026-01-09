/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState, useMemo, useTransition } from "react";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import { differenceInCalendarDays } from "date-fns";
import type { DateRange } from "react-day-picker";
import ConfirmationAlert from "../ConfirmationAlert";
import { toast } from "sonner";
import { placeOrder } from "@/actions/order";
import { useRouter } from "next/navigation";

interface OrderFormProps {
    itemId: string;
    pricePerDay: number;
    advBookings: {
        startDate: string;
        endDate: string;
    }[];
}

const OrderForm = ({
    itemId,
    pricePerDay,
    advBookings,
}: OrderFormProps) => {

    const [range, setRange] = useState<DateRange | undefined>();
    const [submitting, setSubmitting] = useState(false);
    const [isPending, startTransition] = useTransition();
    const router = useRouter();

    // 🔒 Disabled ranges
    const disabledRanges: DateRange[] = useMemo(
        () =>
            advBookings.map(b => ({
                from: new Date(b.startDate),
                to: new Date(b.endDate),
            })),
        [advBookings]
    );

    // 📅 Total days calculation
    const totalDays = useMemo(() => {
        if (!range?.from) return 0;

        // Single date = 1 day
        if (!range.to) return 1;

        return (
            differenceInCalendarDays(range.to, range.from) + 1
        );
    }, [range]);

    // 💰 Total price
    const totalPrice = totalDays * pricePerDay;

    const handlePlaceOrder = async () => {
        if (!range || !range.from) {
            return;
        };
        setSubmitting(true);
        const toastId = toast.loading("Placing your order...");
        const startDate = range.from;
        const endDate = range.to ?? range.from;

        const orderData = {
            item: itemId,
            startDate,
            endDate
        };

        try {
            const res = await placeOrder(orderData);

            if (res.success) {
                toast.success(res.message || "Order placed successfully!", { id: toastId });
                setRange(undefined);
                startTransition(() => {
                    router.refresh();
                });
                window.open(res.data.paymentUrl, "_blank");
            } else {
                toast.error(res.message || "Failed to place order. Please try again.", { id: toastId });
            };
        } catch (error: any) {
            toast.error(error.message || error.data.message || "Failed to place order. Please try again.", { id: toastId });
        } finally {
            setSubmitting(false);
        };
    };

    return (
        <div className="flex flex-col justify-center items-center space-y-6">
            {/* Calendar */}
            <Calendar
                mode="range"
                selected={range}
                onSelect={setRange}
                disabled={[...disabledRanges, { before: new Date() }]}
                numberOfMonths={2}
                className="rounded-md border"
                modifiersStyles={{
                    today: {
                        backgroundColor: "transparent",
                        color: "inherit",
                        fontWeight: "inherit",
                        border: "2px solid var(--border)",
                    },
                }}
            />

            {/* Selected Info */}
            {range?.from && (
                <div className="space-y-2 text-sm">
                    <p>
                        <strong>Start:</strong>{" "}
                        {range.from.toDateString()}
                    </p>

                    <p>
                        <strong>End:</strong>{" "}
                        {range.to
                            ? range.to.toDateString()
                            : range.from.toDateString()}
                    </p>

                    <p>
                        <strong>Total days:</strong> {totalDays}
                    </p>

                    <p className="text-lg font-semibold">
                        Total: ৳ {totalPrice}
                    </p>
                </div>
            )}

            {/* CTA */}
            <ConfirmationAlert
                dialogDescription="Please remember that you have to complete the payment within 30 minutes of placing the order, otherwise the order will be cancelled automatically."
                onConfirm={handlePlaceOrder}
            >
                <Button
                    disabled={!range || !range?.from || submitting || isPending}
                    className="w-full"
                >
                    {submitting ? "Placing Order..." : "Place Order"}
                </Button>
            </ConfirmationAlert>
        </div>
    );
}

export default OrderForm;
