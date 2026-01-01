"use client";
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { useState, type ReactNode } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import Password from "@/components/ui/Password";
import { changePassword } from "@/actions/auth";


interface IChangePasswordModalProps {
    children: ReactNode;
};

const changePasswordSchema = z
    .object({
        oldPassword: z.string(),
        newPassword: z
            .string()
            .min(8, { error: "Password must be at least 8 characters long" })
            .regex(/^(?=.*[A-Z])/, {
                message: "Password must contain at least 1 uppercase letter.",
            })
            .regex(/^(?=.*[!@#$%^&*])/, {
                message: "Password must contain at least 1 special character.",
            })
            .regex(/^(?=.*\d)/, {
                message: "Password must contain at least 1 number.",
            }),
        confirmPassword: z.string()
    })
    .refine((data) => data.newPassword === data.confirmPassword, {
        message: "Password do not match",
        path: ["confirmPassword"],
    });

const ChangePasswordModal = ({ children }: IChangePasswordModalProps) => {

    const [open, setOpen] = useState(false);

    const form = useForm<z.infer<typeof changePasswordSchema>>({
        resolver: zodResolver(changePasswordSchema),
        defaultValues: {
            oldPassword: "",
            newPassword: "",
            confirmPassword: ""
        },
    });

    const onSubmit = async (data: z.infer<typeof changePasswordSchema>) => {
        const toastId = toast.loading("Saving Info...")
        const passwordInfo = {
            oldPassword: data.oldPassword,
            newPassword: data.newPassword,
        };

        try {
            const res = await changePassword(passwordInfo);
            if (res.success) {
                toast.success("Password Changed Successfully! You Must Use your New Password the next time you Login.",
                    { id: toastId }
                );
                setOpen(false);
            } else {
                toast.error(res.message || "Sorry! Password could not be changed.", {id: toastId});
            };
        } catch (error: any) {
            toast.error(error.data.message, { id: toastId });
        }
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                {children}
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Change Password</DialogTitle>
                    <DialogDescription>
                        Change your password from here. Click save when you&apos;re
                        done.
                    </DialogDescription>
                </DialogHeader>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-6">
                        <div className="space-y-6">
                            <FormField
                                control={form.control}
                                name="oldPassword"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Old Password</FormLabel>
                                        <FormControl>
                                            <Password {...field} />
                                        </FormControl>
                                        <FormDescription className="sr-only">
                                            This is a Password field for your old Password.
                                        </FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="newPassword"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>New Password</FormLabel>
                                        <FormControl>
                                            <Password {...field} />
                                        </FormControl>
                                        <FormDescription className="sr-only">
                                            Type your new Password you wish to set.
                                        </FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="confirmPassword"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Confirm Password</FormLabel>
                                        <FormControl>
                                            <Password {...field} />
                                        </FormControl>
                                        <FormDescription className="sr-only">
                                            Confirm your new Password.
                                        </FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                        <DialogFooter>
                            <DialogClose asChild>
                                <Button variant="outline" className="cursor-pointer">Cancel</Button>
                            </DialogClose>
                            <Button type="submit" className="cursor-pointer text-white">Save changes</Button>
                        </DialogFooter>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    )
};

export default ChangePasswordModal;
