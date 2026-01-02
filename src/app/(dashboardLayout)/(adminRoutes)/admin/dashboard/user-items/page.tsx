import { getAllItems } from "@/actions/item";
import UserItemsTable from "@/components/dashboard/admin/user-items-page/UserItemsTable";
import { TableSkeleton } from "@/components/dashboard/TableSkeleton";
import PageHeader from "@/components/PageHeader";
import Pagination from "@/components/Pagination";
import RefreshButton from "@/components/RefreshButton";
import SearchFilter from "@/components/SearchFilter";
import SelectFilter from "@/components/SelectFilter";
import { queryStringFormatter } from "@/lib/formatters";
import { Category } from "@/types";
import { Metadata } from "next";
import { Suspense } from "react";


export const metadata: Metadata = {
    title: "User Items | Rentopia",
    description: "A page for Admin to manage all items added by users of Rentopia."
};


const UserItemsPage = async ({ searchParams }: { searchParams: Promise<{ [key: string]: string | string[] | undefined }> }) => {

    const searchParamsObj = await searchParams;
    const queryString = queryStringFormatter(searchParamsObj);
    const { data: items, meta } = await getAllItems(`ownerRole=USER&${queryString}`);

    return (
        <>
            <PageHeader title="User Items" subtitle="Manage all user-added items from here."/>
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
            <Suspense fallback={<TableSkeleton columns={12}/>}>
                <UserItemsTable items={items} />
            </Suspense>
            <Pagination currentPage={meta.page} totalPages={meta.totalPages} limit={meta.limit} />
        </>
    );
};

export default UserItemsPage;