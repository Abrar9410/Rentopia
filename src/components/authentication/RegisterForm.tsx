"use client";
/* eslint-disable @typescript-eslint/no-explicit-any */

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import Password from "@/components/ui/Password";
import ImageUploader from "../ImageUploader";
import { useRouter } from "next/navigation";
import { createUser } from "@/actions/user";
import { toast } from "sonner";

const registerSchema = z
  .object({
    name: z
      .string()
      .min(3, {
        error: "Name is too short",
      })
      .max(50),
    email: z.email(),
    picture: z
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
      .max(200, "Address cannot exceed 200 characters."),
    password: z
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
  .refine((data) => data.password === data.confirmPassword, {
    message: "Password do not match",
    path: ["confirmPassword"],
  });

export default function RegisterForm() {

  const [submitting, setSubmitting] = useState(false);
  const router = useRouter();

  const form = useForm<z.infer<typeof registerSchema>>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      email: "",
      // role: "",
      phone: "",
      address: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof registerSchema>) => {
    const toastId = toast.loading("Creating Account...");
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { picture, confirmPassword, ...rest } = data;

    const payload = new FormData();

    if (picture) {
      payload.append("file", picture);
    };

    payload.append("data", JSON.stringify(rest));

    setSubmitting(true);

    try {
      const res = await createUser(payload);
      if (res.success) {
        toast.success("Your Account is Created Successfully! You can now login with your credentials.", { id: toastId });
      };
      form.reset();
      router.push("/login");
    } catch (error: any) {
      toast.error(error.message, { id: toastId });
    }
  };

  return (

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
          name="picture"
          render={({ field }) => (
            <FormItem className="min-w-64 max-w-md mx-auto">
              <FormLabel className="w-max mx-auto">Profile Picture</FormLabel>
              <FormControl>
                <ImageUploader {...field} />
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

        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Password {...field} />
              </FormControl>
              <FormDescription className="sr-only">
                This is Password field for your account.
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
                Confirm your Password here.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" disabled={submitting} className="w-full">
          {
            submitting ?
              <span className="w-3 h-3 border-2 animate-spin flex items-center justify-center border-y-foreground dark:border-y-background border-x-background dark:border-x-foreground rounded-full"></span> :
              'Submit'
          }
        </Button>
      </form>
    </Form>
  );
}
