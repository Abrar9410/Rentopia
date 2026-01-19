import Image from "next/image";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Current_Status, IItem, UserRole } from "@/types";
import { cn } from "@/lib/utils";
import Link from "next/link";



const ItemCard = ({ item }: { item: IItem }) => {
    const {
        _id,
        title,
        images,
        pricePerDay,
        current_status,
        owner,
        ownerRole,
        location,
        category,
    } = item;


    return (
        <Card className="py-0 group overflow-hidden transition-shadow hover:shadow-lg">
            {/* Thumbnail */}
            <div className="relative h-52 w-full overflow-hidden">
                <Image
                    src={images[0]}
                    alt={title}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1536px) 33vw, 25vw"
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                />

                {/* Status Badge */}
                <Badge
                    className={cn(
                        { "bg-green-500": current_status === Current_Status.AVAILABLE },
                        { "bg-orange-500": current_status === Current_Status.OCCUPIED },
                        "absolute top-3 left-3"
                    )}
                >
                    {current_status}
                </Badge>
            </div>

            <CardContent className="space-y-3">
                {/* Category */}
                <p className="text-xs text-muted-foreground uppercase tracking-wide">
                    {category}
                </p>

                {/* Title */}
                <h3 className="line-clamp-2 font-semibold leading-snug">
                    {title}
                </h3>

                {/* Location */}
                

                {/* Owner */}
                <div className="flex items-center justify-between pt-2">
                    <p className="text-sm text-muted-foreground">
                        📍 {location}
                    </p>
                    <div className="flex items-center gap-2">
                        <Image
                            src={ownerRole === UserRole.ADMIN ? "/Rentopia-logo.PNG" : owner.picture || "res.cloudinary.com"}
                            alt={owner.name}
                            width={20}
                            height={24}
                            className="w-5 h-6 rounded-sm object-cover"
                        />
                        <span className="text-sm text-muted-foreground">
                            {ownerRole === UserRole.ADMIN ? "Rentopia" : owner.name}
                        </span>
                    </div>
                </div>
            </CardContent>

            <CardFooter className="flex items-center justify-between p-4 pt-0">
                {/* Price */}
                <div className="font-semibold">
                    ৳ {pricePerDay}
                    <span className="text-sm font-normal text-muted-foreground">
                        {" "} / day
                    </span>
                </div>

                {/* CTA */}
                <Button size="sm">
                    <Link href={`/items/${_id}`}>Take on Rent</Link>
                </Button>
            </CardFooter>
        </Card>
    );
};

export default ItemCard;
