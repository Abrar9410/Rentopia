import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import CTASearchBar from "./CTASearchBar";

const HeroBanner = () => {
    return (
        <section className="relative w-full h-[60vh] min-h-[520px] flex items-center justify-center">
            {/* Background Image */}
            <Image
                src="/rentopia-hero.avif"
                alt="Rent items easily in Chittagong"
                fill
                priority
                className="object-cover"
            />

            {/* Overlay */}
            <div className="absolute inset-0 bg-black/40 dark:bg-black/50" />

            {/* Content */}
            <div className="relative z-10 text-center px-6 max-w-3xl">
                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight">
                    Rent Smarter. <br className="hidden sm:block" />
                    Live Lighter.
                </h1>

                <p className="mt-4 text-sm sm:text-base md:text-lg text-slate-200 leading-relaxed">
                    Rent electronics, tools, and everyday essentials across Chittagong.
                    Save money, reduce clutter, and get what you need — when you need it.
                </p>

                {/* CTA Buttons */}
                <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
                    <Button size="lg" asChild>
                        <Link href="/items">Rent Now</Link>
                    </Button>

                    <Button
                        size="lg"
                        variant="outline"
                        className="border-white"
                        asChild
                    >
                        <Link href="#how-it-works">How It Works</Link>
                    </Button>
                </div>
            </div>
            {/* Search Bar */}
            <div className="absolute left-1/2 bottom-0 translate-y-1/2 -translate-x-1/2 z-20 w-[90%] max-w-xl p-3 bg-primary shadow-lg">
                <CTASearchBar />
            </div>
        </section>
    );
};

export default HeroBanner;
