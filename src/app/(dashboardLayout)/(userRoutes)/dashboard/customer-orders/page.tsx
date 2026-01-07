import { getCustomerOrders } from "@/actions/order";
import { TableSkeleton } from "@/components/dashboard/TableSkeleton";
import CustomerOrdersTable from "@/components/dashboard/user/customer-orders-page/CustomerOrdersTable";
import PageHeader from "@/components/PageHeader";
import Pagination from "@/components/Pagination";
import RefreshButton from "@/components/RefreshButton";
import SelectFilter from "@/components/SelectFilter";
import { queryStringFormatter } from "@/lib/formatters";
import { ORDER_STATUS } from "@/types";
import { Metadata } from "next";
import { Suspense } from "react";


export const metadata: Metadata = {
    title: "Customer Orders | Rentopia",
    description: "This page contains the information of customer orders for current user's items."
};


const CustomerOrdersPage = async ({ searchParams }: { searchParams: Promise<{ [key: string]: string | string[] | undefined }> }) => {

    const searchParamsObj = await searchParams;
    const queryString = queryStringFormatter(searchParamsObj);
    const {data: orders, meta} = await getCustomerOrders(queryString);

    return (
        <>
            <PageHeader title="Customer Orders" subtitle="Manage all customer orders for your items."/>
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
            <Suspense fallback={<TableSkeleton columns={13}/>}>
                <CustomerOrdersTable orders={orders} />
            </Suspense>
            <Pagination currentPage={meta.page} totalPages={meta.totalPages} limit={meta.limit} />
        </>
    );
};

export default CustomerOrdersPage;