import { getAllAvailableItems } from "@/actions/item";
import ItemCard from "@/components/ItemCard";
import PageHeader from "@/components/PageHeader";
import Pagination from "@/components/Pagination";
import RefreshButton from "@/components/RefreshButton";
import SearchFilter from "@/components/SearchFilter";
import SelectFilter from "@/components/SelectFilter";
import { Separator } from "@/components/ui/separator";
import { queryStringFormatter } from "@/lib/formatters";
import { Category, Current_Status, IItem } from "@/types";
import { Metadata } from "next";


export const metadata: Metadata = {
    title: "Items | Rentopia",
    description: "This page contains all the items available on rent. Search and filter are possible."
};


const ItemsPage = async ({ searchParams }: { searchParams: Promise<{ [key: string]: string | string[] | undefined }> }) => {

    const searchParamsObj = await searchParams;
    const queryString = queryStringFormatter(searchParamsObj);
    const {data: items, meta} = await getAllAvailableItems(queryString);


    return (
        <>
            <PageHeader
                className="mt-8"
                title="Browse Items"
                subtitle="Explore everything! See what you need and just place an order."
            />
            <div className="w-11/12 md:w-10/12 xl:w-9/12 mx-auto flex justify-center items-center gap-2 flex-wrap mb-6">
                <SearchFilter placeholder="Search by title, description, specifications, category or pickup location" />
                <SelectFilter
                    placeholder="Category"
                    paramName="category"
                    options={
                        Object.values(Category).map((category: Category) => (
                            {
                                label: category,
                                value: category
                            }
                        ))
                    }
                />
                <SelectFilter
                    placeholder="Current Status"
                    paramName="current_status"
                    options={
                        [
                            { label: "Available", value: Current_Status.AVAILABLE },
                            { label: "Occupied", value: Current_Status.OCCUPIED }
                        ]
                    }
                />
                <SelectFilter
                    placeholder="Sort by (Newest)"
                    paramName="sort"
                    defaultValue="None"
                    options={
                        [
                            { label: "Newest", value: "-createdAt" },
                            { label: "Oldest", value: "createdAt" },
                            { label: "Price (Low to High)", value: "pricePerDay" },
                            { label: "Price (High to Low)", value: "-pricePerDay" },
                            { label: "Title (A to Z)", value: "title" },
                            { label: "Title (Z to A)", value: "-title" },
                        ]
                    }
                />
                <RefreshButton />
            </div>
            <Separator className="my-6"/>
            <div className="w-11/12 md:w-10/12 xl:w-9/12 mx-auto">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-6">
                    {
                        items?.length > 0 ?
                        items.map((item: IItem) => (
                            <ItemCard
                                key={item._id}
                                item={item}
                            />
                        )) :
                            <p className="col-span-1 sm:col-span-2 lg:col-span-3 2xl:col-span-4 text-center text-lg">
                            No Items Available
                        </p>
                    }
                </div>
                <Pagination currentPage={meta.page} totalPages={meta.totalPages} limit={meta.limit} />
            </div>
        </>
    );
};

export default ItemsPage;