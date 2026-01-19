import { getAllAvailableItems } from "@/actions/item";
import ItemCard from "@/components/ItemCard";
import Pagination from "@/components/Pagination";
import { IItem } from "@/types";



const ItemsGrid = async ({ queryString }: { queryString: string }) => {

    const { data: items, meta } = await getAllAvailableItems(queryString);

    if (!items || items.length === 0) {
        return (
            <p className="text-center text-lg mt-10">No Items Available</p>
        );
    };

    return (
        <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-6">
                {items.map((item: IItem) => (
                    <ItemCard key={item._id} item={item} />
                ))}
            </div>
            <Pagination
                currentPage={meta.page}
                totalPages={meta.totalPages}
                limit={meta.limit}
            />
        </>
    );
}

export default ItemsGrid;