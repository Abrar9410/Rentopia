import { getAllOrders } from "@/actions/order";
import ManageOrdersTable from "@/components/dashboard/admin/manage-orders-page/ManageOrdersTable";
import { TableSkeleton } from "@/components/dashboard/TableSkeleton";
import PageHeader from "@/components/PageHeader";
import Pagination from "@/components/Pagination";
import RefreshButton from "@/components/RefreshButton";
import SelectFilter from "@/components/SelectFilter";
import { queryStringFormatter } from "@/lib/formatters";
import { ORDER_STATUS } from "@/types";
import { Metadata } from "next";
import { Suspense } from "react";


export const metadata: Metadata = {
    title: "Manage Orders | Rentopia",
    description: "An Admin page for managing all rental orders."
};


const ManageOrdersPage = async ({ searchParams }: { searchParams: Promise<{ [key: string]: string | string[] | undefined }> }) => {

    const searchParamsObj = await searchParams;
    const queryString = queryStringFormatter(searchParamsObj);
    const {data: orders, meta} = await getAllOrders(queryString);

    return (
        <>
            <PageHeader title="Manage Orders" subtitle="Manage all rental orders."/>
            <div className="flex items-center gap-2 mb-6">
                <SelectFilter
                    placeholder="Status"
                    paramName="status"
                    options={
                        Object.values(ORDER_STATUS).map((status: ORDER_STATUS) => (
                            {
                                label: status,
                                value: status
                            }
                        ))
                    }
                />
                <RefreshButton />
            </div>
            <Suspense fallback={<TableSkeleton columns={15}/>}>
                <ManageOrdersTable orders={orders} />
            </Suspense>
            <Pagination currentPage={meta.page} totalPages={meta.totalPages} limit={meta.limit} />
        </>
    );
};

export default ManageOrdersPage;