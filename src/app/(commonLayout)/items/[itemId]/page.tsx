import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { getSingleAvailableItem } from "@/actions/item";
import { Current_Status, UserRole } from "@/types";
import { cn } from "@/lib/utils";
import Link from "next/link";


export const generateMetadata = async ({ params }: { params: Promise<{ itemId: string }> }) => {
    const { itemId } = await params;
    const { data: item } = await getSingleAvailableItem(itemId);

    return {
        title: item?.title || "Not Found",
        description: `${item?.description}` || ""
    };
};


const SingleItemPage = async ({ params }: { params: Promise<{ itemId: string }> }) => {

    const { itemId } = await params;
    const { data: item, message } = await getSingleAvailableItem(itemId);

    if (!item) {
        return (
            <p className="w-11/12 md:w-10/11 xl:w-9/12 mx-auto mt-8 text-xl font-semibold text-red-500 text-center">
                {message}
            </p>
        );
    };

    const {
        title,
        description,
        specifications,
        images,
        category,
        pricePerDay,
        current_status,
        owner,
        ownerRole,
        location,
    } = item;


    return (
        <main className="w-11/12 md:w-10/12 xl:w-9/12 mx-auto px-4 py-8">
            <div className="grid gap-8 lg:grid-cols-2">
                {/* Image Section */}
                <div className="flex flex-col gap-4">
                    <div className="relative aspect-4/3 w-full overflow-hidden rounded-xl border">
                        <Image
                            src={images[0]}
                            alt={title}
                            fill
                            priority
                            className="object-cover"
                        />
                    </div>
                    <div className="flex justify-center items-center gap-2">
                        {images?.length > 1 && images.filter((image: string) => image !== images[0]).map((img: string) => (
                            <Image
                                key={img}
                                src={img}
                                alt={title}
                                width={1000}
                                height={1000}
                                className="w-28 h-24 object-cover rounded-lg border"
                            />
                        ))}
                    </div>
                </div>

                {/* Info Section */}
                <div className="space-y-5">
                    {/* Category & Status */}
                    <div className="flex flex-wrap items-center gap-2">
                        <Badge variant="secondary">{category}</Badge>
                        <Badge
                            className={cn(
                                { "bg-green-500": current_status === Current_Status.AVAILABLE },
                                { "bg-orange-500": current_status === Current_Status.OCCUPIED },
                            )}
                        >
                            {current_status}
                        </Badge>
                    </div>

                    {/* Title */}
                    <h1 className="text-3xl font-bold leading-tight">
                        {title}
                    </h1>

                    {/* Location */}
                    <p className="text-muted-foreground">
                        📍 {location}
                    </p>

                    {/* Price */}
                    <div className="text-2xl font-semibold">
                        ৳ {pricePerDay}
                        <span className="text-base font-normal text-muted-foreground">
                            {" "} / day
                        </span>
                    </div>

                    {/* CTA */}
                    <Button size="lg" asChild>
                        <Link href={`/order/${itemId}`}>Proceed to Rent</Link>
                    </Button>
                </div>
            </div>

            {/* Description */}
            <section className="mt-10 space-y-4">
                <h2 className="text-xl font-semibold">Description</h2>
                <p className="text-muted-foreground leading-relaxed">
                    {description}
                </p>
            </section>

            <Separator className="my-8" />

            {/* Specifications */}
            <section className="space-y-4">
                <h2 className="text-xl font-semibold">Specifications</h2>
                <ul className="list-disc list-inside text-muted-foreground space-y-1">
                    {
                        specifications.length > 0 ? specifications.map((spec: string, idx: number) => (
                            <li key={idx}>{spec}</li>
                        )) :
                            <span>Nothing to show.</span>
                    }
                </ul>
            </section>

            <Separator className="my-8" />

            {/* Owner Info */}
            <section className="max-w-md">
                <Card>
                    <CardContent className="flex items-center gap-4 p-4">
                        <Image
                            src={
                                ownerRole === UserRole.ADMIN ?
                                    "/Rentopia-logo.PNG" :
                                    owner.picture || "https://res.cloudinary.com"
                            }
                            alt={owner.name || "Owner Image"}
                            width={40}
                            height={48}
                            className="w-10 h-12 rounded-sm object-cover"
                        />
                        <div>
                            <p className="font-medium">{ownerRole === UserRole.ADMIN ? "Rentopia" : owner.name}</p>
                            <p className="text-sm text-muted-foreground">
                                Item owner
                            </p>
                        </div>
                    </CardContent>
                </Card>
            </section>
        </main>
    );
};

export default SingleItemPage;
