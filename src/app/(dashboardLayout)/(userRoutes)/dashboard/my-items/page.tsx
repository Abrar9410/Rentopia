import { getMyItems } from "@/actions/item";
import { TableSkeleton } from "@/components/dashboard/TableSkeleton";
import MyItemsTable from "@/components/dashboard/user/my-items-page/MyItemsTable";
import PageHeader from "@/components/PageHeader";
import Pagination from "@/components/Pagination";
import RefreshButton from "@/components/RefreshButton";
import SearchFilter from "@/components/SearchFilter";
import SelectFilter from "@/components/SelectFilter";
import { Button } from "@/components/ui/button";
import { queryStringFormatter } from "@/lib/formatters";
import { Category } from "@/types";
import { Plus } from "lucide-react";
import { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";


export const metadata: Metadata = {
    title: "My Items | Rentopia",
    description: "A page for managing all Items added by the user."
};


const MyItemsPage = async ({ searchParams }: { searchParams: Promise<{ [key: string]: string | string[] | undefined }> }) => {

    const searchParamsObj = await searchParams;
    const queryString = queryStringFormatter(searchParamsObj);
    const {data: items, meta} = await getMyItems(queryString);

    return (
        <>
            <PageHeader title="My Items" subtitle=""/>
            <div className="flex items-center gap-2 mb-6">
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
                <RefreshButton />
            </div>
            <div className="flex justify-end mb-4">
                <Link href="/dashboard/add-item">
                    <Button className="bg-green-500 flex justify-center items-center gap-1">
                        <Plus /> Add Item
                    </Button>
                </Link>
            </div>
            <Suspense fallback={<TableSkeleton columns={11}/>}>
                <MyItemsTable items={items} />
            </Suspense>
            <Pagination currentPage={meta.page} totalPages={meta.totalPages} limit={meta.limit} />
        </>
    );
};

export default MyItemsPage;