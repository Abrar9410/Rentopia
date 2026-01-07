import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle } from "lucide-react";
import Link from "next/link";
import { getPaymentByTransactionId } from "@/actions/payment";



const PaymentSuccessPage = async ({ searchParams }: { searchParams: Promise<{ [key: string]: string | string[] | undefined }> }) => {

    const { transactionId } = await searchParams;

    if (!transactionId) {
        return <p className="text-center mt-10">Invalid payment reference.</p>;
    };

    const { data: payment} = await getPaymentByTransactionId(transactionId as string);
    if (!payment) {
        return <p className="text-center mt-10">Payment details not found for the order.</p>;
    };

    const invoiceUrl = payment.invoiceUrl;
    const downloadUrl = invoiceUrl.replace("/upload/", "/upload/fl_attachment/");

    return (
        <div className="min-h-screen flex items-center justify-center bg-muted px-4">
            <Card className="max-w-3xl w-full shadow-lg">
                <CardHeader className="text-center">
                    <CheckCircle className="mx-auto text-green-600 w-12 h-12" />
                    <CardTitle className="text-2xl mt-2">
                        Payment Successful 🎉
                    </CardTitle>
                    <p className="text-sm text-muted-foreground">
                        Transaction ID: {transactionId}
                    </p>
                </CardHeader>

                <CardContent className="space-y-6">
                    {/* Invoice Preview */}
                    <div className="border rounded-lg overflow-hidden h-[450px]">
                        <iframe
                            src={invoiceUrl}
                            className="w-full h-full"
                            title="Invoice Preview"
                        />
                    </div>

                    {/* Actions */}
                    <div className="flex flex-col sm:flex-row gap-3 justify-center">
                        <Button asChild>
                            <Link href={invoiceUrl} target="_blank">
                                View Full Invoice
                            </Link>
                        </Button>

                        <Button variant="secondary" asChild>
                            <Link href={downloadUrl}>
                                Download Invoice
                            </Link>
                        </Button>
                    </div>

                    <p className="text-center text-sm text-muted-foreground">
                        Thank you for renting with <span className="font-semibold">Rentopia</span>!
                    </p>
                </CardContent>
            </Card>
        </div>
    );
};

export default PaymentSuccessPage;
