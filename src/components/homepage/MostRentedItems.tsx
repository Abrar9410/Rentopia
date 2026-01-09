import { getAllAvailableItems } from "@/actions/item";
import PageHeader from "../PageHeader";
import { IItem } from "@/types";
import ItemCard from "../ItemCard";


const MostRentedItems = async () => {

    const {data: items} = await getAllAvailableItems();

    return (
        <section className="w-11/12 md:w-10/12 xl:w-9/12 mx-auto pt-24 space-y-16">
            {/* Section Header */}
            <PageHeader
                title="Most Rented Items"
                subtitle="Check out the most popular items among our users."
            />
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {
                    items?.length > 0 ?
                        items.sort((a: IItem, b: IItem) => (b.adv_bookings.length || 0) - (a.adv_bookings.length || 0))
                        .slice(0, 6)
                        .map((item: IItem) => (
                            <ItemCard
                                key={item._id}
                                item={item}
                            />
                        )) :
                        <p className="col-span-1 sm:col-span-2 lg:col-span-3 2xl:col-span-4 text-center text-lg">
                            No Items Currently Available!
                        </p>
                }
            </div>
        </section>
    );
};

export default MostRentedItems;