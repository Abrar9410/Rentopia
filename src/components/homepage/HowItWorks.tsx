import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import PageHeader from "../PageHeader";



const HowItWorks = () => {
    return (
        <section
            id="how-it-works"
            className="w-11/12 md:w-10/12 xl:w-9/12 mx-auto py-24 space-y-16"
        >
            {/* Section Header */}
            <PageHeader
                title="How It Works"
                subtitle="A simple, transparent rental process designed for both renters and item owners."
            />

            {/* Renter Flow */}
            <div className="space-y-8">
                <h3 className="text-xl font-semibold text-center">
                    Renting an Item
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                    {[
                        {
                            step: "01",
                            title: "Browse Items",
                            desc: "Explore available items in Chittagong across multiple categories.",
                        },
                        {
                            step: "02",
                            title: "Select Dates",
                            desc: "Choose your rental start and end dates based on availability.",
                        },
                        {
                            step: "03",
                            title: "Pay Securely",
                            desc: "Complete payment through a secure and trusted payment gateway.",
                        },
                        {
                            step: "04",
                            title: "Use & Return",
                            desc: "Meet the owner, use the item, and return it on time.",
                        },
                    ].map((item) => (
                        <Card key={item.step} className="relative">
                            <CardContent className="p-6 space-y-3">
                                <span className="text-sm font-medium text-muted-foreground">
                                    Step {item.step}
                                </span>
                                <h4 className="font-semibold">{item.title}</h4>
                                <p className="text-sm text-muted-foreground">
                                    {item.desc}
                                </p>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>

            <Separator />

            {/* Owner Flow */}
            <div className="space-y-8">
                <h3 className="text-xl font-semibold text-center">
                    Listing Your Item
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                    {[
                        {
                            step: "01",
                            title: "List Your Item",
                            desc: "Upload item details, images, and set a daily rental price.",
                        },
                        {
                            step: "02",
                            title: "Manage Availability",
                            desc: "Control booking dates and monitor upcoming rentals.",
                        },
                        {
                            step: "03",
                            title: "Hand Over Item",
                            desc: "Meet the renter and hand over the item when booking starts.",
                        },
                        {
                            step: "04",
                            title: "Earn Securely",
                            desc: "Receive payments securely through the platform.",
                        },
                    ].map((item) => (
                        <Card key={item.step} className="relative">
                            <CardContent className="p-6 space-y-3">
                                <span className="text-sm font-medium text-muted-foreground">
                                    Step {item.step}
                                </span>
                                <h4 className="font-semibold">{item.title}</h4>
                                <p className="text-sm text-muted-foreground">
                                    {item.desc}
                                </p>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default HowItWorks;