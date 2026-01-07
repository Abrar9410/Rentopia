import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AlertTriangle } from "lucide-react";
import Link from "next/link";

const PaymentCancelPage = () => {
    return (
        <div className="min-h-screen flex items-center justify-center bg-muted px-4">
            <Card className="max-w-md w-full text-center shadow-lg">
                <CardHeader>
                    <AlertTriangle className="mx-auto text-yellow-500 w-12 h-12" />
                    <CardTitle className="text-2xl mt-2">
                        Payment Cancelled
                    </CardTitle>
                </CardHeader>

                <CardContent className="space-y-4">
                    <p className="text-muted-foreground">
                        You cancelled the payment process.
                        No charges were made.
                    </p>

                    <div className="flex flex-col gap-3">
                        <Button asChild>
                            <Link href="/">
                                Go Back to Home
                            </Link>
                        </Button>

                        <Button variant="outline" asChild>
                            <Link href="/items">
                                Browse Items
                            </Link>
                        </Button>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
};

export default PaymentCancelPage;
