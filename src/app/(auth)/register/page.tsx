import RegisterForm from "@/components/authentication/RegisterForm";
import { Metadata } from "next";
import Link from "next/link";



const metadata: Metadata = {
    title: "Register | Rentopia",
    description: "Rentopia Registration Page",
};


const RegisterPage = async ({ searchParams }: { searchParams: Promise<{ redirect?: string }> }) => {

    const { redirect } = await searchParams;

    return (
        <div className="min-h-[calc(100vh-64px)] md:min-h-[calc(100vh-100px)] xl:min-h-[calc(100vh-200px)] flex flex-col items-center justify-center">
            <div className="w-11/12 max-w-md">
                <div className="flex flex-col gap-6 bg-card p-4 md:p-6 rounded-2xl shadow-lg">
                    <div className="flex flex-col items-center gap-2 text-center">
                        <h1 className="text-2xl font-bold">Register your account</h1>
                        <p className="text-sm text-muted-foreground">
                            Enter your details to create an account
                        </p>
                    </div>

                    <div className="grid gap-6">
                    </div>
                    <RegisterForm redirect={redirect || ""} />
                    <div className="text-center text-sm">
                        Already have an account?{" "}
                        <Link href="/login" className="underline underline-offset-4">
                            Login
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RegisterPage;