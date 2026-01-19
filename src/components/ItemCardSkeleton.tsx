import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

const ItemCardSkeleton = () => {
    return (
        <Card className="py-0 overflow-hidden">
            {/* Thumbnail Skeleton */}
            <Skeleton className="h-52 w-full rounded-none" />

            <CardContent className="space-y-3 p-4">
                {/* Category */}
                <Skeleton className="h-3 w-20" />

                {/* Title (2 lines) */}
                <div className="space-y-2">
                    <Skeleton className="h-5 w-full" />
                    <Skeleton className="h-5 w-4/5" />
                </div>

                {/* Location & Owner */}
                <div className="flex items-center justify-between pt-2">
                    <Skeleton className="h-4 w-24" />
                    <div className="flex items-center gap-2">
                        <Skeleton className="h-6 w-5 rounded-sm" />
                        <Skeleton className="h-4 w-16" />
                    </div>
                </div>
            </CardContent>

            <CardFooter className="flex items-center justify-between p-4 pt-0">
                {/* Price */}
                <Skeleton className="h-6 w-20" />
                {/* Button */}
                <Skeleton className="h-9 w-28" />
            </CardFooter>
        </Card>
    );
}

export default ItemCardSkeleton;