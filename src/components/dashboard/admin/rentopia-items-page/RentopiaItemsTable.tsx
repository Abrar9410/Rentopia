"use client";
import { editItemAvailability, editItemStatus, editRentopiaItem, removeItem } from "@/actions/item";
import ConfirmationAlert from "@/components/ConfirmationAlert";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { cn } from "@/lib/utils";
import { Adv_Booking, Current_Status, IItem } from "@/types";
import { format } from "date-fns";
import { Eye, Trash2, MoreHorizontal, Edit, ChevronDown, ArrowUpDown, ArrowDown, ArrowUp } from "lucide-react";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { useTransition } from "react";
import { toast } from "sonner";
import ViewItemModal from "../../manage-items/ViewItemModal";
import EditItemFormModal from "../../manage-items/EditItemFormModal";



const RentopiaItemsTable = ({ items }: { items: IItem[] }) => {

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

    const handleAvailable = async (available: boolean, item: IItem) => {
        if (available === item.available) {
            return null;
        };

        const res = await editItemAvailability(item._id, { available });

        if (res.success) {
            startTransition(() => {
                router.refresh();
            });
        } else {
            toast.error(res.message || "An error occurred! Please try again.")
        };
    };

    const changeStatus = async (current_status: Current_Status, item: IItem) => {
        if (current_status === item.current_status) {
            return null;
        };

        const res = await editItemStatus(item._id, { current_status });

        if (res.success) {
            startTransition(() => {
                router.refresh();
            });
        } else {
            toast.error(res.message || "An error occurred! Please try again.")
        };
    };

    const handleRemoveItem = async (itemId: string) => {
        const toastId = toast.loading("Removing Item...");
        const res = await removeItem(itemId);

        if (res.success) {
            startTransition(() => {
                router.refresh();
            });
            toast.success(res.message, { id: toastId });
        } else {
            toast.error(res.message || "Error Occurred! Could not remove Item.", { id: toastId });
        };
    };

    return (
        <Table className="text-center [&_th]:text-center [&_td]:text-center [&_th]:font-semibold">
            <TableHeader>
                <TableRow>
                    <TableHead>Thumbnail</TableHead>
                    <TableHead>
                        <p
                            onClick={() => handleSort("title")}
                            className="flex justify-center items-center p-2 hover:text-foreground transition-colors font-medium cursor-pointer select-none"
                        >
                            Title
                            {getSortIcon("title")}
                        </p>
                    </TableHead>
                    <TableHead>
                        <p
                            onClick={() => handleSort("_id")}
                            className="flex justify-center items-center p-2 hover:text-foreground transition-colors font-medium cursor-pointer select-none"
                        >
                            Item ID
                            {getSortIcon("_id")}
                        </p>
                    </TableHead>
                    <TableHead>Description</TableHead>
                    <TableHead>
                        <p
                            onClick={() => handleSort("category")}
                            className="flex justify-center items-center p-2 hover:text-foreground transition-colors font-medium cursor-pointer select-none"
                        >
                            Category
                            {getSortIcon("category")}
                        </p>
                    </TableHead>
                    <TableHead>
                        <p
                            onClick={() => handleSort("owner")}
                            className="flex justify-center items-center p-2 hover:text-foreground transition-colors font-medium cursor-pointer select-none"
                        >
                            Added By
                            {getSortIcon("owner")}
                        </p>
                    </TableHead>
                    <TableHead>
                        <p
                            onClick={() => handleSort("createdAt")}
                            className="flex justify-center items-center p-2 hover:text-foreground transition-colors font-medium cursor-pointer select-none"
                        >
                            Added On
                            {getSortIcon("createdAt")}
                        </p>
                    </TableHead>
                    <TableHead>
                        <p
                            onClick={() => handleSort("pricePerDay")}
                            className="flex justify-center items-center p-2 hover:text-foreground transition-colors font-medium cursor-pointer select-none"
                        >
                            Price Per Day
                            {getSortIcon("pricePerDay")}
                        </p>
                    </TableHead>
                    <TableHead>
                        <p
                            onClick={() => handleSort("available")}
                            className="flex justify-center items-center p-2 hover:text-foreground transition-colors font-medium cursor-pointer select-none"
                        >
                            Rentable
                            {getSortIcon("available")}
                        </p>
                    </TableHead>
                    <TableHead>
                        <p
                            onClick={() => handleSort("current_status")}
                            className="flex justify-center items-center p-2 hover:text-foreground transition-colors font-medium cursor-pointer select-none"
                        >
                            Status
                            {getSortIcon("current_status")}
                        </p>
                    </TableHead>
                    <TableHead>Location</TableHead>
                    <TableHead>Next Bookings</TableHead>
                    <TableHead>Actions</TableHead>
                </TableRow>
            </TableHeader>

            <TableBody>
                {items?.length > 0 ? (
                    items.map((item: IItem) => (
                        <TableRow key={item._id}>

                            {/* Thumbnail */}
                            <TableCell>
                                <Image
                                    src={item.images[0]}
                                    alt="Thumbnail"
                                    width={70}
                                    height={70}
                                    className="w-[70px] h-[70px] mx-auto"
                                />
                            </TableCell>

                            {/* Title */}
                            <TableCell>{item.title}</TableCell>

                            {/* Item ID */}
                            <TableCell>{item._id}</TableCell>

                            {/* Description */}
                            <TableCell>
                                <div className="min-w-[200px] max-w-lg">{item.description}</div>
                            </TableCell>

                            {/* Category */}
                            <TableCell>{item.category}</TableCell>

                            {/* Added By */}
                            <TableCell>
                                <p className="text-center">{item.owner.name}</p>
                                <p className="text-center text-xs text-muted-foreground">{item.owner._id}</p>
                            </TableCell>

                            {/* Added On */}
                            <TableCell>{format(item.createdAt, "PP")}</TableCell>

                            {/* Price Per Day */}
                            <TableCell>{item.pricePerDay}</TableCell>

                            {/* Rentable */}
                            <TableCell>
                                <div className="flex justify-center items-center gap-2">
                                    {
                                        item.available ?
                                            <span>✅</span> :
                                            <span>❌</span>
                                    }
                                    <DropdownMenu>
                                        <DropdownMenuTrigger asChild>
                                            <ChevronDown className="w-4 cursor-pointer hover:animate-pulse" />
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent align="start" className="w-max *:cursor-pointer">
                                            <DropdownMenuItem onClick={() => handleAvailable(true, item)}>
                                                ✅ Enlist Item
                                            </DropdownMenuItem>
                                            <DropdownMenuItem onClick={() => handleAvailable(false, item)}>
                                                ❌ Withdraw Item
                                            </DropdownMenuItem>
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                </div>
                            </TableCell>

                            {/* Current Status */}
                            <TableCell>
                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                        <Badge
                                            className={cn(
                                                { "bg-green-500": item.current_status === Current_Status.AVAILABLE },
                                                { "bg-orange-500": item.current_status === Current_Status.OCCUPIED },
                                                { "bg-gray-500": item.current_status === Current_Status.UNDER_MAINTENANCE },
                                                { "bg-yellow-500": item.current_status === Current_Status.FLAGGED },
                                                { "bg-red-500": item.current_status === Current_Status.BLOCKED },
                                                "cursor-pointer hover:bg-primary"
                                            )}
                                        >
                                            {item.current_status}
                                        </Badge>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent align="center" className="w-max *:cursor-pointer">
                                        <DropdownMenuItem
                                            className="hover:bg-primary hover:text-white"
                                            onClick={() => changeStatus(Current_Status.AVAILABLE, item)}
                                        >
                                            AVAILABLE
                                        </DropdownMenuItem>
                                        <DropdownMenuItem
                                            className="hover:bg-primary hover:text-white"
                                            onClick={() => changeStatus(Current_Status.OCCUPIED, item)}
                                        >
                                            OCCUPIED
                                        </DropdownMenuItem>
                                        <DropdownMenuItem
                                            className="hover:bg-primary hover:text-white"
                                            onClick={() => changeStatus(Current_Status.UNDER_MAINTENANCE, item)}
                                        >
                                            UNDER_MAINTENANCE
                                        </DropdownMenuItem>
                                        <DropdownMenuItem
                                            className="hover:bg-primary hover:text-white"
                                            onClick={() => changeStatus(Current_Status.FLAGGED, item)}
                                        >
                                            FLAGGED
                                        </DropdownMenuItem>
                                        <DropdownMenuItem
                                            className="hover:bg-primary hover:text-white"
                                            onClick={() => changeStatus(Current_Status.BLOCKED, item)}
                                        >
                                            BLOCKED
                                        </DropdownMenuItem>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            </TableCell>

                            {/* Pick-up Location */}
                            <TableCell>{item.location}</TableCell>

                            {/* Next Bookings */}
                            <TableCell>{
                                item.adv_bookings.length > 0 ?
                                    item.adv_bookings.map((booking: Adv_Booking, idx: number) => (
                                        <p key={booking.startDate}>
                                            <span>{idx + 1}. </span>
                                            <span>
                                                {
                                                    format(booking.startDate, "PP")
                                                    + " to " +
                                                    format(booking.endDate, "PP")
                                                }
                                            </span>
                                        </p>
                                    )) :
                                    "None"
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
                                        <ViewItemModal item={item}>
                                            <p className="py-1 pl-1 pr-3 rounded-sm text-sm flex items-center gap-4 cursor-pointer hover:bg-accent">
                                                <Eye className="h-4 w-4 text-primary" />
                                                View
                                            </p>
                                        </ViewItemModal>
                                        <EditItemFormModal item={item}>
                                            <p className="py-1 pl-1 pr-3 rounded-sm text-sm flex items-center gap-4 cursor-pointer hover:bg-accent">
                                                <Edit className="h-4 w-4 text-yellow-500" />
                                                Edit
                                            </p>
                                        </EditItemFormModal>
                                        <ConfirmationAlert
                                            onConfirm={() => handleRemoveItem(item._id)}
                                            dialogDescription="This Item will be removed from your Inventory!"
                                        >
                                            <p className="py-1 pl-1 pr-3 rounded-sm text-sm flex items-center gap-4 cursor-pointer hover:bg-accent">
                                                <Trash2 className="h-4 w-4 text-red-500" />
                                                Delete
                                            </p>
                                        </ConfirmationAlert>
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

export default RentopiaItemsTable;