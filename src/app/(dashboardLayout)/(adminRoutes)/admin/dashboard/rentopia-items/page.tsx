import { getRentopiaItems } from "@/actions/item";
import RentopiaItemsTable from "@/components/dashboard/admin/rentopia-items-page/RentopiaItemsTable";
import { TableSkeleton } from "@/components/dashboard/TableSkeleton";
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
    title: "Rentopia Items | Rentopia",
    description: "This page contains and lets manage items added by Admins of Rentopia."
};


const RentopiaItemsPage = async ({ searchParams }: { searchParams: Promise<{ [key: string]: string | string[] | undefined }> }) => {

    const searchParamsObj = await searchParams;
    const queryString = queryStringFormatter(searchParamsObj);
    const {data: items, meta} = await getRentopiaItems(queryString);

    return (
        <>
            <PageHeader title="Rentopia Items" subtitle="Manage Rentopia-owned items from here."/>
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
                <Link href="/admin/dashboard/add-item">
                    <Button className="bg-green-500 flex justify-center items-center gap-1">
                        <Plus /> Add Item
                    </Button>
                </Link>
            </div>
            <Suspense fallback={<TableSkeleton columns={12}/>}>
                <RentopiaItemsTable items={items} />
            </Suspense>
            <Pagination currentPage={meta.page} totalPages={meta.totalPages} limit={meta.limit} />
        </>
    );
};

export default RentopiaItemsPage;