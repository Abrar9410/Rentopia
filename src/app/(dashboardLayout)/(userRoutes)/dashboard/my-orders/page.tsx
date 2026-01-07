import { getMyOrders } from "@/actions/order";
import { TableSkeleton } from "@/components/dashboard/TableSkeleton";
import MyOrdersTable from "@/components/dashboard/user/my-orders-page/MyOrdersTable";
import PageHeader from "@/components/PageHeader";
import Pagination from "@/components/Pagination";
import RefreshButton from "@/components/RefreshButton";
import SelectFilter from "@/components/SelectFilter";
import { queryStringFormatter } from "@/lib/formatters";
import { ORDER_STATUS } from "@/types";
import { Metadata } from "next";
import { Suspense } from "react";


export const metadata: Metadata = {
    title: "My Orders | Rentopia",
    description: "This page contains information of all the orders the user placed."
};


const MyOrdersPage = async ({ searchParams }: { searchParams: Promise<{ [key: string]: string | string[] | undefined }> }) => {

    const searchParamsObj = await searchParams;
    const queryString = queryStringFormatter(searchParamsObj);
    const {data: orders, meta} = await getMyOrders(queryString);

    return (
        <>
            <PageHeader title="My Orders" subtitle="Manage every order you placed."/>
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
                <MyOrdersTable orders={orders} />
            </Suspense>
            <Pagination currentPage={meta.page} totalPages={meta.totalPages} limit={meta.limit} />
        </>
    );
};

export default MyOrdersPage;