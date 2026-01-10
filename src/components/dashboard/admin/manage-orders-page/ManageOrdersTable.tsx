"use client";
import { updateOrderStatus } from "@/actions/order";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { cn } from "@/lib/utils";
import { ORDER_STATUS, IOrder, PAYMENT_STATUS, UserRole } from "@/types";
import { format } from "date-fns";
import { Eye, MoreHorizontal, ArrowUpDown, ArrowDown, ArrowUp } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useTransition } from "react";
import { toast } from "sonner";



const ManageOrdersTable = ({ orders }: { orders: IOrder[] }) => {

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
        if (status === order.status) {
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


    return (
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
                    <TableHead>Renter</TableHead>
                    <TableHead>Renter Contact</TableHead>
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
                            <TableCell className="flex flex-col items-center justify-center gap-2">
                                <Image
                                    src={order.owner.picture || "https://res.cloudinary.com"}
                                    alt={order.owner.name as string}
                                    width={28}
                                    height={28}
                                    className="w-7 h-7 mx-auto"
                                />
                                <p>{order.owner.name}</p>
                                <p>({order.owner.role})</p>
                            </TableCell>

                            {/* Owner Contact */}
                            <TableCell>
                                <p>Email: {order.owner.email}</p>
                                <p>Phone: {order.owner.phone}</p>
                                <p>Address: {order.owner.address}</p>
                            </TableCell>

                            {/* Renter */}
                            <TableCell className="flex flex-col items-center justify-center gap-2">
                                <Image
                                    src={order.renter.picture || "https://res.cloudinary.com"}
                                    alt={order.owner.name as string}
                                    width={28}
                                    height={28}
                                    className="w-7 h-7 mx-auto"
                                />
                                <p>{order.renter.name}</p>
                            </TableCell>

                            {/* Renter Contact */}
                            <TableCell>
                                <p>Email: {order.renter.email}</p>
                                <p>Phone: {order.renter.phone}</p>
                                <p>Address: {order.renter.address}</p>
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
                                            onClick={() => changeStatus(ORDER_STATUS.CONFIRMED, order)}
                                        >
                                            CONFIRMED
                                        </DropdownMenuItem>
                                        <DropdownMenuItem
                                            className="hover:bg-primary hover:text-white"
                                            onClick={() => changeStatus(ORDER_STATUS.CANCELLED, order)}
                                        >
                                            CANCELLED
                                        </DropdownMenuItem>
                                        <DropdownMenuItem
                                            className="hover:bg-primary hover:text-white"
                                            onClick={() => changeStatus(ORDER_STATUS.ONGOING, order)}
                                        >
                                            ONGOING
                                        </DropdownMenuItem>
                                        <DropdownMenuItem
                                            className="hover:bg-primary hover:text-white"
                                            onClick={() => changeStatus(ORDER_STATUS.COMPLETED, order)}
                                        >
                                            COMPLETED
                                        </DropdownMenuItem>
                                        <DropdownMenuItem
                                            className="hover:bg-primary hover:text-white"
                                            onClick={() => changeStatus(ORDER_STATUS.PENDING, order)}
                                        >
                                            PENDING
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
    );
};

export default ManageOrdersTable;