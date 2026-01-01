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
import { Input } from "@/components/ui/input";
import { useState, useTransition, type ReactNode } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import type { IUser } from "@/types";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { updateUser } from "@/actions/user";
import { useRouter } from "next/navigation";
import ImageUploader from "@/components/ImageUploader";


interface IEditProfileModalProps {
    children: ReactNode;
    user: IUser;
};

const editProfileSchema = z
    .object({
        name: z
            .string()
            .min(3, {
                error: "Name is too short",
            })
            .max(50),
        email: z.email(),
        newPicture: z
            .instanceof(File)
            .refine(
                (file) =>
                    ["image/png", "image/jpeg", "image/webp"].includes(file.type),
                "Only PNG, JPEG or WEBP images are allowed"
            )
            .optional()
            .nullable(),
        phone: z
            .string({ error: "Phone Number must be string" })
            .regex(/^(?:\+8801\d{9}|01\d{9})$/, {
                message: "Phone number must be valid for Bangladesh. Format: +8801XXXXXXXXX or 01XXXXXXXXX",
            }),
        address: z
            .string({ error: "Address must be string" })
            .max(200, "Address cannot exceed 200 characters.")
    });

const EditProfileFormModal = ({ children, user }: IEditProfileModalProps) => {

    const {
        _id,
        name,
        email,
        picture,
        phone,
        address
    } = user;
    const [open, setOpen] = useState(false);
    const [defaultImg, setDefaultImg] = useState<string | null>(picture || null);
    const [submitting, setSubmitting] = useState(false);
    const [isPending, startTransition] = useTransition();
    const router = useRouter();

    const form = useForm<z.infer<typeof editProfileSchema>>({
        resolver: zodResolver(editProfileSchema),
        defaultValues: {
            name: name,
            email: email,
            phone: phone,
            address: address
        },
    });

    const onSubmit = async (data: z.infer<typeof editProfileSchema>) => {
        const toastId = toast.loading("Updating Profile...");
        setSubmitting(true);
        const { newPicture, ...rest } = data;

        const payload = new FormData();
        let deleteImage: string = "";

        if (newPicture) {
            payload.append("file", newPicture);
            deleteImage = picture || "";
        };

        if (picture && !defaultImg) {
            deleteImage = picture;
        };

        payload.append("data", JSON.stringify({
            ...rest,
            deleteImage
        }));

        try {
            const res = await updateUser(_id, payload);
            if (res.success) {
                toast.success(res.message, { id: toastId });
                setOpen(false);
                startTransition(() => {
                    router.refresh();
                });
            } else {
                toast.error(res.message || "Sorry! Profile could not be updated. Please try again.", { id: toastId });
            }
        } catch (error: any) {
            toast.error(error.message, { id: toastId });
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                {children}
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px] max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle>Edit profile</DialogTitle>
                    <DialogDescription>
                        Make changes to your profile here. Click save when you&apos;re
                        done.
                    </DialogDescription>
                </DialogHeader>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Name</FormLabel>
                                    <FormControl>
                                        <Input placeholder="John Doe" {...field} />
                                    </FormControl>
                                    <FormDescription className="sr-only">
                                        This is your public display name.
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Email</FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder="example123@company.com"
                                            type="email"
                                            readOnly
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormDescription className="sr-only">
                                        This is your account email.
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        {/* Picture */}
                        <FormField
                            control={form.control}
                            name="newPicture"
                            render={({ field }) => (
                                <FormItem className="min-w-64 max-w-md mx-auto">
                                    <FormLabel className="w-max mx-auto">Profile Picture</FormLabel>
                                    <FormControl>
                                        <ImageUploader {...field} defaultImg={defaultImg} setDefaultImg={setDefaultImg}/>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="phone"
                            render={({ field }) => (
                                <FormItem className="flex-1">
                                    <FormLabel>Phone</FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder="01XXXXXXXXX"
                                            type="tel"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormDescription className="sr-only">
                                        This is your phone number.
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="address"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Address</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Write your address" {...field} />
                                    </FormControl>
                                    <FormDescription className="sr-only">
                                        This is your address.
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <DialogFooter>
                            <DialogClose asChild>
                                <Button type="button" variant="outline">Cancel</Button>
                            </DialogClose>
                            <Button
                                type="submit"
                                className="w-32"
                                disabled={submitting || isPending}
                            >
                                {submitting ? (
                                    <span className="w-3 h-3 border-2 animate-spin border-y-foreground dark:border-y-background border-x-transparent rounded-full" />
                                ) : (
                                    "Save changes"
                                )}
                            </Button>
                        </DialogFooter>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    )
};

export default EditProfileFormModal;
