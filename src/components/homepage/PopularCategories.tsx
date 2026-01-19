import Image from "next/image";
import PageHeader from "../PageHeader";
import { Card } from "../ui/card";
import Link from "next/link";
import { Category } from "@/types";


const PopularCategories = () => {
    return (
        <section className="w-11/12 md:w-10/12 xl:w-9/12 mx-auto pt-24 space-y-16">
            {/* Section Header */}
            <PageHeader
                title="Popular Categories"
                subtitle=""
            />
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                <Link href={`/items?category=${Category.ELECTRONICS}`}>
                    <Card className="py-0 border border-primary group overflow-hidden transition-shadow hover:shadow-xl">
                        {/* Thumbnail */}
                        <div className="relative h-52 w-full overflow-hidden">
                            <Image
                                src={"/categoryImage-Electronics.jpg"}
                                alt={Category.ELECTRONICS}
                                fill
                                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                                className="object-cover transition-transform duration-300 group-hover:scale-105"
                            />

                            {/* Overlay */}
                            <div className="absolute inset-0 bg-black/20 dark:bg-black/30 group-hover:bg-black/40 dark:group-hover:bg-black/50" />

                            {/* Status Badge */}
                            <p className="absolute left-1/2 bottom-3 -translate-x-1/2 z-20 text-xl font-semibold w-max py-1 px-2 bg-background group-hover:text-background group-hover:bg-foreground">
                                {Category.ELECTRONICS}
                            </p>
                        </div>
                    </Card>
                </Link>
                <Link href={`/items?category=${Category.FURNITURE}`}>
                    <Card className="py-0 border border-primary group overflow-hidden transition-shadow hover:shadow-xl">
                        {/* Thumbnail */}
                        <div className="relative h-52 w-full overflow-hidden">
                            <Image
                                src={"/categoryImage-Furniture.webp"}
                                alt={Category.FURNITURE}
                                fill
                                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                                className="object-cover transition-transform duration-300 group-hover:scale-105"
                            />

                            {/* Overlay */}
                            <div className="absolute inset-0 bg-black/20 dark:bg-black/30 group-hover:bg-black/40 dark:group-hover:bg-black/50" />

                            {/* Status Badge */}
                            <p className="absolute left-1/2 bottom-3 -translate-x-1/2 z-20 text-xl font-semibold w-max py-1 px-2 bg-background group-hover:text-background group-hover:bg-foreground">
                                {Category.FURNITURE}
                            </p>
                        </div>
                    </Card>
                </Link>
                <Link href={`/items?category=${Category.TOOLS}`}>
                    <Card className="py-0 border border-primary group overflow-hidden transition-shadow hover:shadow-xl">
                        {/* Thumbnail */}
                        <div className="relative h-52 w-full overflow-hidden">
                            <Image
                                src={"/categoryImage-Tools.jpg"}
                                alt={Category.TOOLS}
                                fill
                                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                                className="object-cover transition-transform duration-300 group-hover:scale-105"
                            />

                            {/* Overlay */}
                            <div className="absolute inset-0 bg-black/20 dark:bg-black/30 group-hover:bg-black/40 dark:group-hover:bg-black/50" />

                            {/* Status Badge */}
                            <p className="absolute left-1/2 bottom-3 -translate-x-1/2 z-20 text-xl font-semibold w-max py-1 px-2 bg-background group-hover:text-background group-hover:bg-foreground">
                                {Category.TOOLS}
                            </p>
                        </div>
                    </Card>
                </Link>
                <Link href={`/items?category=${Category.SPORTS}`}>
                    <Card className="py-0 border border-primary group overflow-hidden transition-shadow hover:shadow-xl">
                        {/* Thumbnail */}
                        <div className="relative h-52 w-full overflow-hidden">
                            <Image
                                src={"/categoryImage-Sports.avif"}
                                alt={Category.SPORTS}
                                fill
                                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                                className="object-cover transition-transform duration-300 group-hover:scale-105"
                            />

                            {/* Overlay */}
                            <div className="absolute inset-0 bg-black/20 dark:bg-black/30 group-hover:bg-black/40 dark:group-hover:bg-black/50" />

                            {/* Status Badge */}
                            <p className="absolute left-1/2 bottom-3 -translate-x-1/2 z-20 text-xl font-semibold w-max py-1 px-2 bg-background group-hover:text-background group-hover:bg-foreground">
                                {Category.SPORTS}
                            </p>
                        </div>
                    </Card>
                </Link>
                <Link href={`/items?category=${Category.HOME_APPLIANCES}`}>
                    <Card className="py-0 border border-primary group overflow-hidden transition-shadow hover:shadow-xl">
                        {/* Thumbnail */}
                        <div className="relative h-52 w-full overflow-hidden">
                            <Image
                                src={"/categoryImage-Home_Appliances.jpg"}
                                alt={Category.HOME_APPLIANCES}
                                fill
                                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                                className="object-cover transition-transform duration-300 group-hover:scale-105"
                            />

                            {/* Overlay */}
                            <div className="absolute inset-0 bg-black/20 dark:bg-black/30 group-hover:bg-black/40 dark:group-hover:bg-black/50" />

                            {/* Status Badge */}
                            <p className="absolute left-1/2 bottom-3 -translate-x-1/2 z-20 text-xl font-semibold w-max py-1 px-2 bg-background group-hover:text-background group-hover:bg-foreground">
                                {Category.HOME_APPLIANCES}
                            </p>
                        </div>
                    </Card>
                </Link>
                <Link href={`/items?category=${Category.BOOKS}`}>
                    <Card className="py-0 border border-primary group overflow-hidden transition-shadow hover:shadow-xl">
                        {/* Thumbnail */}
                        <div className="relative h-52 w-full overflow-hidden">
                            <Image
                                src={"/categoryImage-Books.jpg"}
                                alt={Category.BOOKS}
                                fill
                                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                                className="object-cover transition-transform duration-300 group-hover:scale-105"
                            />

                            {/* Overlay */}
                            <div className="absolute inset-0 bg-black/20 dark:bg-black/30 group-hover:bg-black/40 dark:group-hover:bg-black/50" />

                            {/* Status Badge */}
                            <p className="absolute left-1/2 bottom-3 -translate-x-1/2 z-20 text-xl font-semibold w-max py-1 px-2 bg-background group-hover:text-background group-hover:bg-foreground">
                                {Category.BOOKS}
                            </p>
                        </div>
                    </Card>
                </Link>
                <Link href={`/items?category=${Category.GAMING}`}>
                    <Card className="py-0 border border-primary group overflow-hidden transition-shadow hover:shadow-xl">
                        {/* Thumbnail */}
                        <div className="relative h-52 w-full overflow-hidden">
                            <Image
                                src={"/categoryImage-Gaming.jpg"}
                                alt={Category.GAMING}
                                fill
                                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                                className="object-cover transition-transform duration-300 group-hover:scale-105"
                            />

                            {/* Overlay */}
                            <div className="absolute inset-0 bg-black/20 dark:bg-black/30 group-hover:bg-black/40 dark:group-hover:bg-black/50" />

                            {/* Status Badge */}
                            <p className="absolute left-1/2 bottom-3 -translate-x-1/2 z-20 text-xl font-semibold w-max py-1 px-2 bg-background group-hover:text-background group-hover:bg-foreground">
                                {Category.GAMING}
                            </p>
                        </div>
                    </Card>
                </Link>
                <Link href={`/items?category=${Category.VEHICLES}`}>
                    <Card className="py-0 border border-primary group overflow-hidden transition-shadow hover:shadow-xl">
                        {/* Thumbnail */}
                        <div className="relative h-52 w-full overflow-hidden">
                            <Image
                                src={"/categoryImage-Vehicles.avif"}
                                alt={Category.VEHICLES}
                                fill
                                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                                className="object-cover transition-transform duration-300 group-hover:scale-105"
                            />

                            {/* Overlay */}
                            <div className="absolute inset-0 bg-black/20 dark:bg-black/30 group-hover:bg-black/40 dark:group-hover:bg-black/50" />

                            {/* Category Name */}
                            <p className="absolute left-1/2 bottom-3 -translate-x-1/2 z-20 text-xl font-semibold w-max py-1 px-2 bg-background group-hover:text-background group-hover:bg-foreground">
                                {Category.VEHICLES}
                            </p>
                        </div>
                    </Card>
                </Link>
            </div>
        </section>
    );
};

export default PopularCategories;