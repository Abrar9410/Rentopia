"use client"

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
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import Password from "@/components/ui/Password";
import { login } from "@/actions/auth";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useState } from "react";
import { getDefaultDashboardRoute } from "@/lib/auth-utils";


const loginSchema = z.object({
  email: z.email("Invalid Email Format"),
  password: z.string()
});


export default function LoginForm ({redirect}: {redirect: string}) {

  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const [submitting, setSubmitting] = useState<boolean>(false);
  const router = useRouter();

  const onSubmit = async (data: z.infer<typeof loginSchema>) => {
    const toastId = toast.loading("Verifying Credentials...");
    setSubmitting(true)
    try {
      const res = await login(data);
      if (res.success) {
        router.push(redirect || getDefaultDashboardRoute(res.data.role));
        toast.success(res.message, { id: toastId });
      } else if (res.message) {
        toast.error(res.message, { id: toastId });
      };
    } catch (err: any) {
      toast.error(err.message, { id: toastId });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input
                  type="email"
                  placeholder="john@example.com"
                  {...field}
                  value={field.value || ""}
                />
              </FormControl>
              <FormDescription className="sr-only">
                Input your account email.
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
                Input password for your account.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" disabled={submitting} className="w-full">
          {
            submitting ?
              <span className="w-3 h-3 border-2 animate-spin flex items-center justify-center border-y-foreground dark:border-y-background border-x-background dark:border-x-foreground rounded-full"></span> :
              'Login'
          }
        </Button>
      </form>
    </Form>
  );
}
