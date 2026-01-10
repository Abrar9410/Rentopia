/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { deleteUser, updateUser } from "@/actions/user";
import ConfirmationAlert from "@/components/ConfirmationAlert";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { cn } from "@/lib/utils";
import { IsActive, IUser, UserRole } from "@/types";
import { format } from "date-fns";
import { Trash2, MoreHorizontal, ArrowUpDown, ArrowDown, ArrowUp, ShieldUser } from "lucide-react";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { useTransition } from "react";
import { toast } from "sonner";



const ManageAdminsTable = ({ users }: { users: IUser[] }) => {

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

    const changeStatus = async (status: IsActive, user: IUser) => {
        if (status === user.isActive) {
            return null;
        };

        const toastId = toast.loading("Updating Info...");
        const formData = new FormData();

        formData.append("data", JSON.stringify({ IsActive: status }));
        try {
            const res = await updateUser(user._id, formData);

            if (res.success) {
                startTransition(() => {
                    router.refresh();
                });
                toast.success(res.message || "Status updated successfully!", { id: toastId });
            } else {
                toast.error(res.message || "Error Occurred! Could not update user status.", { id: toastId });
            };
        } catch (error: any) {
            toast.error(error.message || error.data.message || "Error occurred! Could not update status.", { id: toastId });
        }
    };

    const makeUser = async (userId: string) => {
        const toastId = toast.loading("Updating Info...");
        const formData = new FormData();

        formData.append("data", JSON.stringify({ role: UserRole.USER }));
        try {
            const res = await updateUser(userId, formData);

            if (res.success) {
                startTransition(() => {
                    router.refresh();
                });
                toast.success(res.message || "User Role updated successfully!", { id: toastId });
            } else {
                toast.error(res.message || "Error Occurred! Could not update user role.", { id: toastId });
            };
        } catch (error: any) {
            toast.error(error.message || error.data.message || "Error occurred! Could not update role.", { id: toastId });
        }
    };

    const handleDeleteUser = async (userId: string) => {
        const toastId = toast.loading("Deleting User Account...");

        const res = await deleteUser(userId);

        if (res.success) {
            startTransition(() => {
                router.refresh();
            });
            toast.success(res.message || "User deleted successfully!", { id: toastId });
        } else {
            toast.error(res.message || "Error Occurred! Could not delete user account.", { id: toastId });
        };
    };

    return (
        <Table className="text-center [&_th]:text-center [&_td]:text-center [&_th]:font-semibold">
            <TableHeader>
                <TableRow>
                    <TableHead>Image</TableHead>
                    <TableHead>
                        <p
                            onClick={() => handleSort("name")}
                            className="flex justify-center items-center p-2 hover:text-foreground transition-colors font-medium cursor-pointer select-none"
                        >
                            Name
                            {getSortIcon("name")}
                        </p>
                    </TableHead>
                    <TableHead>
                        <p
                            onClick={() => handleSort("_id")}
                            className="flex justify-center items-center p-2 hover:text-foreground transition-colors font-medium cursor-pointer select-none"
                        >
                            User ID
                            {getSortIcon("_id")}
                        </p>
                    </TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Phone</TableHead>
                    <TableHead>Address</TableHead>
                    <TableHead>
                        <p
                            onClick={() => handleSort("createdAt")}
                            className="flex justify-center items-center p-2 hover:text-foreground transition-colors font-medium cursor-pointer select-none"
                        >
                            Joined On
                            {getSortIcon("createdAt")}
                        </p>
                    </TableHead>
                    <TableHead>
                        <p
                            onClick={() => handleSort("isVerified")}
                            className="flex justify-center items-center p-2 hover:text-foreground transition-colors font-medium cursor-pointer select-none"
                        >
                            Verified
                            {getSortIcon("isVerified")}
                        </p>
                    </TableHead>
                    <TableHead>
                        <p
                            onClick={() => handleSort("isActive")}
                            className="flex justify-center items-center p-2 hover:text-foreground transition-colors font-medium cursor-pointer select-none"
                        >
                            Status
                            {getSortIcon("isActive")}
                        </p>
                    </TableHead>
                    <TableHead>Actions</TableHead>
                </TableRow>
            </TableHeader>

            <TableBody>
                {users?.length > 0 ? (
                    users.map((user: IUser) => (
                        <TableRow key={user._id}>

                            {/* Picture */}
                            <TableCell>
                                <Image
                                    src={user.picture || "https://res.cloudinary.com"}
                                    alt={user.name}
                                    width={50}
                                    height={50}
                                    className="w-[50px] h-[50px] mx-auto"
                                />
                            </TableCell>

                            {/* Name */}
                            <TableCell>{user.name}</TableCell>

                            {/* User ID */}
                            <TableCell>{user._id}</TableCell>

                            {/* Email */}
                            <TableCell>{user.email}</TableCell>

                            {/* Phone */}
                            <TableCell>{user.phone}</TableCell>

                            {/* Address */}
                            <TableCell>{user.address}</TableCell>

                            {/* Joined On */}
                            <TableCell>{format(user.createdAt, "PP")}</TableCell>

                            {/* Verified */}
                            <TableCell>
                                <div className="flex justify-center items-center gap-2">
                                    {
                                        user.isVerified ?
                                            <span>✅</span> :
                                            <span>❌</span>
                                    }
                                </div>
                            </TableCell>

                            {/* Active Status */}
                            <TableCell>
                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                        <Badge
                                            className={cn(
                                                { "bg-green-500": user.isActive === IsActive.ACTIVE },
                                                { "bg-yellow-500": user.isActive === IsActive.INACTIVE },
                                                { "bg-red-500": user.isActive === IsActive.BLOCKED },
                                                "cursor-pointer hover:bg-primary"
                                            )}
                                        >
                                            {user.isActive}
                                        </Badge>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent align="center" className="w-max *:cursor-pointer">
                                        <DropdownMenuItem
                                            className="hover:bg-primary hover:text-white"
                                            onClick={() => changeStatus(IsActive.ACTIVE, user)}
                                        >
                                            ACTIVE
                                        </DropdownMenuItem>
                                        <DropdownMenuItem
                                            className="hover:bg-primary hover:text-white"
                                            onClick={() => changeStatus(IsActive.INACTIVE, user)}
                                        >
                                            INACTIVE
                                        </DropdownMenuItem>
                                        <DropdownMenuItem
                                            className="hover:bg-primary hover:text-white"
                                            onClick={() => changeStatus(IsActive.BLOCKED, user)}
                                        >
                                            BLOCK
                                        </DropdownMenuItem>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            </TableCell>

                            {/* Actions */}
                            <TableCell>
                                <Popover>
                                    <PopoverTrigger asChild>
                                        <Button variant="ghost" size="icon">
                                            <MoreHorizontal className="h-4 w-4" />
                                        </Button>
                                    </PopoverTrigger>
                                    <PopoverContent align="end" className="w-max p-1 space-y-2 *:cursor-pointer">
                                        <ConfirmationAlert
                                            onConfirm={() => makeUser(user._id)}
                                            dialogDescription="This Admin will convert into a general User!"
                                        >
                                            <p className="py-1 pl-1 pr-3 rounded-sm text-sm flex items-center gap-4 cursor-pointer hover:bg-accent">
                                                <ShieldUser className="h-4 w-4 text-primary" />
                                                Make User
                                            </p>
                                        </ConfirmationAlert>
                                        <ConfirmationAlert
                                            onConfirm={() => handleDeleteUser(user._id)}
                                            dialogDescription="This User Account will be deleted permanently!"
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
                        <TableCell colSpan={11} className="text-center">
                            No Item Found
                        </TableCell>
                    </TableRow>
                )}
            </TableBody>
        </Table>
    );
};

export default ManageAdminsTable;