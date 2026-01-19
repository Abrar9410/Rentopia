import ItemCardSkeleton from "../ItemCardSkeleton";


const ItemsGridFallback = () => {
    return (
        <div className="space-y-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-6">
                {Array.from({ length: 8 }).map((_, i) => (
                    <ItemCardSkeleton key={i} />
                ))}
            </div>
            
            <div className="h-10 w-full bg-muted animate-pulse rounded-md" />
        </div>
    );
};

export default ItemsGridFallback;