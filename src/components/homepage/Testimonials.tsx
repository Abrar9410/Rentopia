import { Card, CardContent } from "@/components/ui/card";
import PageHeader from "../PageHeader";



const testimonials = [
    {
        name: "Mahin Chowdhury",
        role: "Renter · Chittagong",
        review:
            "Rentopia made it incredibly easy to rent a DSLR for a short trip. The booking process was smooth, and meeting the owner was hassle-free. I’ll definitely use it again.",
    },
    {
        name: "Nusrat Jahan",
        role: "Item Owner · Chittagong",
        review:
            "I listed my power tools on Rentopia and started earning without any complications. The date blocking system works perfectly, and I always feel in control of my listings.",
    },
    {
        name: "Tanvir Ahmed",
        role: "Renter & Owner · Chittagong",
        review:
            "What I love about Rentopia is that I can both rent items and earn from my own. It feels like a community-driven platform rather than a traditional marketplace.",
    },
];


const Testimonials = () => {
    return (
        <section className="w-11/12 md:w-10/12 xl:w-9/12 mx-auto pb-24 space-y-16">
            {/* Section Header */}
            <PageHeader
                title="Testimonials"
                subtitle="Real experiences from people using Rentopia to rent smarter and earn more in Chittagong."
            />
            {/* Testimonials Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {testimonials.map((testimonial, index) => (
                    <Card
                        key={index}
                        className="rounded-2xl border bg-card shadow-sm hover:shadow-md transition-shadow"
                    >
                        <CardContent className="p-6 flex flex-col h-full">
                            <p className="text-muted-foreground leading-relaxed mb-6">
                                “{testimonial.review}”
                            </p>

                            <div className="mt-auto">
                                <p className="font-semibold text-foreground">
                                    {testimonial.name}
                                </p>
                                <p className="text-sm text-muted-foreground">
                                    {testimonial.role}
                                </p>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </section>
    );
};

export default Testimonials;