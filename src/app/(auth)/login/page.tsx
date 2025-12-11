import { Metadata } from "next";
import { LoginForm } from "@/components/authentication/LoginForm";
import Link from "next/link";


export const metadata: Metadata = {
    title: "Login | Rentopia",
    description: "Rentopia Login Page",
};


const LoginPage = () => {
    return (
        <div className="min-h-[calc(100vh-64px)] md:min-h-[calc(100vh-100px)] xl:min-h-[calc(100vh-200px)] flex flex-col items-center justify-center">
            <div className="w-11/12 max-w-md">
                <div className="flex flex-col gap-6 bg-card p-4 md:p-6 rounded-2xl shadow-lg">
                    <div className="flex flex-col items-center gap-2 text-center">
                        <h1 className="text-2xl font-bold">Welcome Back!</h1>
                        <p className="text-balance text-sm text-muted-foreground">
                            Enter your credentials to login
                        </p>
                    </div>
                    <div className="grid gap-6">
                        <LoginForm />
                    </div>
                    <div className="text-center text-sm">
                        Don&apos;t have an account?{" "}
                        <Link href="/register" replace className="underline underline-offset-4">
                            Register
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;