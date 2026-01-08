import { Metadata } from "next";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";
import PageHeader from "@/components/PageHeader";


export const metadata: Metadata = {
    title: "About | Rentopia",
    description: "This page contains detail information on Rentopia. What it is, how it works, its aim etc.."
};


const AboutPage = () => {
    return (
        <main className="space-y-24 pb-24">
            <PageHeader
                className="mt-8"
                title="About Rentopia"
                subtitle=""
            />

            {/* Hero Intro */}
            <section className="text-center max-w-3xl mx-auto space-y-6 px-4">
                <p className="text-lg text-muted-foreground">
                    Rentopia is a Chittagong-focused peer-to-peer rental marketplace where
                    people can both <span className="font-medium text-foreground">rent items</span> and
                    <span className="font-medium text-foreground"> earn by listing their own</span>.
                </p>

                <p className="text-muted-foreground">
                    From electronics and furniture to tools and books, Rentopia enables
                    smarter access to items without the burden of ownership — all priced
                    per day by item owners.
                </p>
            </section>

            {/* What Makes Rentopia Different */}
            <section className="max-w-6xl mx-auto px-4">
                <h2 className="text-2xl font-semibold text-center mb-12">
                    What Makes Rentopia Different
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {[
                        {
                            title: "Peer-to-Peer Marketplace",
                            description:
                                "Rentopia connects everyday people. Anyone can be a renter, an owner, or both — creating a dynamic and flexible rental ecosystem.",
                        },
                        {
                            title: "Locally Focused",
                            description:
                                "Built exclusively for Chittagong, Rentopia prioritizes local availability, faster coordination, and community trust.",
                        },
                        {
                            title: "Platform-Managed Trust",
                            description:
                                "Secure payments, transparent pricing, and admin oversight ensure a safe and reliable rental experience.",
                        },
                    ].map((item, index) => (
                        <Card key={index}>
                            <CardContent className="p-6 space-y-2">
                                <h3 className="font-semibold text-lg">{item.title}</h3>
                                <p className="text-muted-foreground text-sm">
                                    {item.description}
                                </p>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </section>

            {/* Core Values */}
            <section className="bg-muted/40 py-20">
                <div className="max-w-6xl mx-auto px-4">
                    <h2 className="text-2xl font-semibold text-center mb-12">
                        Our Core Values
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-4 gap-6 text-center">
                        {[
                            "Accessibility over ownership",
                            "Transparency in pricing",
                            "Fair earning opportunities",
                            "Community-first mindset",
                        ].map((value, index) => (
                            <div
                                key={index}
                                className="rounded-lg border bg-background p-6 text-sm font-medium"
                            >
                                {value}
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Why Choose Rentopia */}
            <section className="max-w-6xl mx-auto px-4">
                <h2 className="text-2xl font-semibold text-center mb-12">
                    Why Choose Rentopia
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <ul className="space-y-4 text-muted-foreground">
                        <li>• Secure payments via trusted gateways</li>
                        <li>• Clear availability and booking transparency</li>
                        <li>• Admin-managed dispute resolution</li>
                        <li>• Flexible daily pricing set by owners</li>
                    </ul>

                    <ul className="space-y-4 text-muted-foreground">
                        <li>• Earn from items you already own</li>
                        <li>• Rent only when you need — no long-term cost</li>
                        <li>• Wide range of categories under one platform</li>
                        <li>• More categories continuously being added</li>
                    </ul>
                </div>
            </section>

            {/* Earning Focus */}
            <section className="bg-primary/5 py-20">
                <div className="max-w-4xl mx-auto text-center px-4 space-y-6">
                    <h2 className="text-2xl font-semibold">
                        Turn Your Items Into Income
                    </h2>

                    <p className="text-muted-foreground">
                        Rentopia empowers users to earn by listing items they already own.
                        Set your own price, manage availability, and connect directly with
                        renters — all through a single platform.
                    </p>
                </div>
            </section>

            {/* CTA Section */}
            <section className="text-center space-y-6 px-4">
                <h2 className="text-2xl font-semibold">
                    Ready to Get Started?
                </h2>

                <p className="text-muted-foreground max-w-xl mx-auto">
                    Whether you want to rent what you need or earn from what you own,
                    Rentopia makes it simple.
                </p>

                <div className="flex flex-col sm:flex-row justify-center gap-4">
                    <Button asChild size="lg">
                        <Link href="/items">
                            Start Renting
                        </Link>
                    </Button>

                    <Button asChild size="lg" variant="outline">
                        <Link href="/dashboard/add-item">
                            List Your Item
                        </Link>
                    </Button>
                </div>
            </section>

        </main>
    );
}

export default AboutPage;
