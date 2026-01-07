import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { XCircle } from "lucide-react";
import Link from "next/link";

const PaymentFailPage = () => {
    return (
        <div className="min-h-screen flex items-center justify-center bg-muted px-4">
            <Card className="max-w-md w-full text-center shadow-lg">
                <CardHeader>
                    <XCircle className="mx-auto text-red-500 w-12 h-12" />
                    <CardTitle className="text-2xl mt-2">
                        Payment Failed
                    </CardTitle>
                </CardHeader>

                <CardContent className="space-y-4">
                    <p className="text-muted-foreground">
                        Unfortunately, your payment could not be completed.
                        No amount has been charged.
                        <span className="text-accent">Please try again within 30 minutes to confirm the order.</span>
                        Contact support if the issue persists.
                    </p>

                    <div className="flex flex-col gap-3">
                        <Button asChild>
                            <Link href="/dashboard/my-orders">
                                Try Again
                            </Link>
                        </Button>

                        <Button variant="outline" asChild>
                            <Link href="/">
                                Back to Home
                            </Link>
                        </Button>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
};

export default PaymentFailPage;
