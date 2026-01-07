"use client";
import { updateOrderStatus } from "@/actions/order";
import { initiatePayment } from "@/actions/payment";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { cn } from "@/lib/utils";
import { ORDER_STATUS, IOrder, PAYMENT_STATUS, UserRole } from "@/types";
import { format } from "date-fns";
import { Eye, MoreHorizontal, ArrowUpDown, ArrowDown, ArrowUp, WalletCards } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useTransition } from "react";
import { toast } from "sonner";



const MyOrdersTable = ({ orders }: { orders: IOrder[] }) => {

    const router = useRouter();
    const searchParams = useSearchParams();
    const [, startTransition] = useTransition();

    const currentSort = searchParams.get("sort") || "";

    const handleSort = (sortKey: string) => {
        const params = new URLSearchParams(searchParams.toString());

        // Toggle sort order if clicking the same column
        if (currentSort.includes(sortKey)) {
            const newSort = currentSort.startsWith("-") ? currentSort.slice(1) : `-${currentSort}`;
            params.set("sort", newSort);
        } else {
            // New column, default to descending
            params.set("sort", `-${sortKey}`);
        }

        params.set("page", "1"); // Reset to first page

        startTransition(() => {
            router.push(`?${params.toString()}`);
        });
    };

    const getSortIcon = (sortKey?: string) => {
        if (!sortKey) return null;

        if (!currentSort.includes(sortKey)) {
            return <ArrowUpDown className="ml-2 h-4 w-4 text-muted-foreground" />;
        };

        return currentSort.startsWith("-") ? (
            <ArrowDown className="ml-2 h-4 w-4" />
        ) : (
            <ArrowUp className="ml-2 h-4 w-4" />
        );
    };

    const changeStatus = async (status: ORDER_STATUS, order: IOrder) => {
        if (status === order.status || order.status !== ORDER_STATUS.CONFIRMED) {
            return null;
        };

        const toastId = toast.loading("Updating Order Status...");

        const res = await updateOrderStatus(order._id, { status });

        if (res.success) {
            startTransition(() => {
                router.refresh();
            });
            toast.success(res.message, { id: toastId });
        } else {
            toast.error(res.message || "An error occurred! Please try again.", { id: toastId });
        };
    };

    const handleInitPayment = async (orderId: string) => {
        const toastId = toast.loading("Please wait...");

        const res = await initiatePayment(orderId);

        if (res.success) {
            toast.success("Payment initiated successfully!", { id: toastId });
            window.open(res.data.paymentUrl, "_blank");
        } else {
            toast.error(res.message || "An error occurred! Please try again.", { id: toastId });
        };
    };


    return (
        <div className="overflow-x-auto">
            <Table className="text-center [&_th]:text-center [&_td]:text-center [&_th]:font-semibold">
                <TableHeader>
                    <TableRow>
                        <TableHead>Order ID</TableHead>
                        <TableHead>
                            <p
                                onClick={() => handleSort("createdAt")}
                                className="flex justify-center items-center p-2 hover:text-foreground transition-colors font-medium cursor-pointer select-none"
                            >
                                Order Date
                                {getSortIcon("createdAt")}
                            </p>
                        </TableHead>
                        <TableHead>Item</TableHead>
                        <TableHead>Pickup Location</TableHead>
                        <TableHead>Owner</TableHead>
                        <TableHead>Owner Contact</TableHead>
                        <TableHead>
                            <p
                                onClick={() => handleSort("startDate")}
                                className="flex justify-center items-center p-2 hover:text-foreground transition-colors font-medium cursor-pointer select-none"
                            >
                                Order start
                                {getSortIcon("startDate")}
                            </p>
                        </TableHead>
                        <TableHead>
                            <p
                                onClick={() => handleSort("endDate")}
                                className="flex justify-center items-center p-2 hover:text-foreground transition-colors font-medium cursor-pointer select-none"
                            >
                                Order end
                                {getSortIcon("endDate")}
                            </p>
                        </TableHead>
                        <TableHead>
                            <p
                                onClick={() => handleSort("status")}
                                className="flex justify-center items-center p-2 hover:text-foreground transition-colors font-medium cursor-pointer select-none"
                            >
                                Status
                                {getSortIcon("status")}
                            </p>
                        </TableHead>
                        <TableHead>Transaction ID</TableHead>
                        <TableHead>
                            <p
                                onClick={() => handleSort("ownerEarning")}
                                className="flex justify-center items-center p-2 hover:text-foreground transition-colors font-medium cursor-pointer select-none"
                            >
                                Amount
                                {getSortIcon("ownerEarning")}
                            </p>
                        </TableHead>
                        <TableHead>Payment Status</TableHead>
                        <TableHead>Actions</TableHead>
                    </TableRow>
                </TableHeader>

                <TableBody>
                    {orders?.length > 0 ? (
                        orders.map((order: IOrder) => (
                            <TableRow key={order._id}>
                                {/* Order ID */}
                                <TableCell>{order._id}</TableCell>

                                {/* Order Date */}
                                <TableCell>{format(order.createdAt, "PP")}</TableCell>

                                {/* Item */}
                                <TableCell>
                                    <div className="flex gap-1">
                                        <Image
                                            src={order.item.images[0] as string}
                                            alt="Thumbnail"
                                            width={40}
                                            height={40}
                                            className="w-10 h-10 mx-auto"
                                        />
                                        <p>{order.item.title}</p>
                                    </div>
                                    <p>{order.item._id}</p>
                                </TableCell>

                                {/* Pick-up Location */}
                                <TableCell>{order.item.location}</TableCell>

                                {/* Owner */}
                                <TableCell>{
                                    order.owner.role === UserRole.ADMIN ?
                                        <div className="flex flex-col items-center justify-center gap-2">
                                            <Image
                                                src="/Rentopia-logo.PNG"
                                                alt={order.owner.name as string}
                                                width={28}
                                                height={28}
                                                className="w-7 h-7 mx-auto"
                                            />
                                            <p>Rentopia</p>
                                        </div> :
                                        <div className="flex flex-col items-center justify-center gap-2">
                                            <Image
                                                src={order.owner.picture || "https://res.cloudinary.com"}
                                                alt={order.owner.name as string}
                                                width={28}
                                                height={28}
                                                className="w-7 h-7 mx-auto"
                                            />
                                            <p>{order.owner.name}</p>
                                        </div>
                                }</TableCell>

                                {/* Owner Contact */}
                                <TableCell>
                                    <p>
                                        Email: {
                                            (order.status === ORDER_STATUS.ONGOING || order.status === ORDER_STATUS.CONFIRMED) ?
                                                order.owner.email : "******"
                                        }
                                    </p>
                                    <p>
                                        Phone: {
                                            (order.status === ORDER_STATUS.ONGOING || order.status === ORDER_STATUS.CONFIRMED) ?
                                                order.owner.phone : "******"
                                        }
                                    </p>
                                </TableCell>

                                {/* Order Start */}
                                <TableCell>{format(order.startDate, "PP")}</TableCell>

                                {/* Order End */}
                                <TableCell>{format(order.endDate, "PP")}</TableCell>

                                {/* Status */}
                                <TableCell>
                                    <DropdownMenu>
                                        <DropdownMenuTrigger asChild>
                                            <Badge
                                                className={cn(
                                                    { "bg-green-500": order.status === ORDER_STATUS.CONFIRMED },
                                                    { "bg-primary": order.status === ORDER_STATUS.ONGOING },
                                                    { "bg-gray-500": order.status === ORDER_STATUS.COMPLETED },
                                                    { "bg-yellow-500": order.status === ORDER_STATUS.PENDING },
                                                    { "bg-red-500": order.status === ORDER_STATUS.CANCELLED },
                                                    "cursor-pointer hover:bg-primary"
                                                )}
                                            >
                                                {order.status}
                                            </Badge>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent align="center" className="w-max *:cursor-pointer">
                                            <DropdownMenuItem
                                                className="hover:bg-primary hover:text-white"
                                                onClick={() => changeStatus(ORDER_STATUS.ONGOING, order)}
                                            >
                                                ONGOING
                                            </DropdownMenuItem>
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                </TableCell>

                                {/* Transaction ID */}
                                <TableCell>{order.payment.transactionId}</TableCell>

                                {/* Amount */}
                                <TableCell>{order.payment.amount}</TableCell>

                                {/* Payment Status */}
                                <TableCell>{
                                    <Badge
                                        className={cn(
                                            { "bg-green-500": order.payment.status === PAYMENT_STATUS.PAID },
                                            { "bg-yellow-500": order.payment.status === PAYMENT_STATUS.UNPAID },
                                            { "bg-orange-500": order.payment.status === PAYMENT_STATUS.CANCELLED },
                                            { "bg-red-500": order.payment.status === PAYMENT_STATUS.FAILED },
                                            { "bg-primary": order.payment.status === PAYMENT_STATUS.REFUNDED }
                                        )}
                                    >
                                        {order.payment.status}
                                    </Badge>
                                }</TableCell>

                                {/* Actions */}
                                <TableCell>
                                    <Popover>
                                        <PopoverTrigger asChild>
                                            <Button variant="ghost" size="icon">
                                                <MoreHorizontal className="h-4 w-4" />
                                            </Button>
                                        </PopoverTrigger>
                                        <PopoverContent align="end" className="w-max p-1 space-y-2 *:cursor-pointer">
                                            {
                                                (order.payment.status === PAYMENT_STATUS.PAID) && (
                                                    <Link href={order.payment.invoiceUrl as string} target="_blank">
                                                        <p className="py-1 pl-1 pr-3 rounded-sm text-sm flex items-center gap-4 cursor-pointer hover:bg-accent">
                                                            <Eye className="h-4 w-4 text-primary" />
                                                            View Invoice
                                                        </p>
                                                    </Link>
                                                )
                                            }
                                            {
                                                (order.payment.status !== PAYMENT_STATUS.PAID && order.payment.status !== PAYMENT_STATUS.REFUNDED) ?
                                                    <p
                                                        onClick={() => handleInitPayment(order._id)}
                                                        className="py-1 pl-1 pr-3 rounded-sm text-sm flex items-center gap-4 cursor-pointer hover:bg-accent"
                                                    >
                                                        <WalletCards className="h-4 w-4 text-yellow-500" />
                                                        Complete Payment
                                                    </p> :
                                                    <></>
                                            }
                                        </PopoverContent>
                                    </Popover>
                                </TableCell>
                            </TableRow>
                        ))
                    ) : (
                        <TableRow>
                            <TableCell colSpan={12} className="text-center">
                                No Item Found
                            </TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>
        </div>
    );
};

export default MyOrdersTable;