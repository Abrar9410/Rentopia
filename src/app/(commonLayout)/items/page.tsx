import ItemsGrid from "@/components/items-page/ItemsGrid";
import ItemsGridFallback from "@/components/items-page/ItemsGridFallback";
import PageHeader from "@/components/PageHeader";
import RefreshButton from "@/components/RefreshButton";
import SearchFilter from "@/components/SearchFilter";
import SelectFilter from "@/components/SelectFilter";
import { Separator } from "@/components/ui/separator";
import { queryStringFormatter } from "@/lib/formatters";
import { Category, Current_Status } from "@/types";
import { Metadata } from "next";
import { Suspense } from "react";


export const metadata: Metadata = {
    title: "Items | Rentopia",
    description: "This page contains all the items available on rent. Search and filter are possible."
};


const ItemsPage = async ({ searchParams }: { searchParams: Promise<{ [key: string]: string | string[] | undefined }> }) => {

    const searchParamsObj = await searchParams;
    const queryString = queryStringFormatter(searchParamsObj);
    
    const suspenseKey = JSON.stringify(searchParamsObj);

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
                <Suspense key={suspenseKey} fallback={<ItemsGridFallback />}>
                    <ItemsGrid queryString={queryString} />
                </Suspense>
            </div>
        </>
    );
};

export default ItemsPage;