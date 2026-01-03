import { getAllUsers } from "@/actions/user";
import ManageAdminsTable from "@/components/dashboard/admin/manage-admins-page/ManageAdminsTable";
import { TableSkeleton } from "@/components/dashboard/TableSkeleton";
import PageHeader from "@/components/PageHeader";
import Pagination from "@/components/Pagination";
import RefreshButton from "@/components/RefreshButton";
import SearchFilter from "@/components/SearchFilter";
import SelectFilter from "@/components/SelectFilter";
import { queryStringFormatter } from "@/lib/formatters";
import { IsActive } from "@/types";
import { Metadata } from "next";
import { Suspense } from "react";


export const metadata: Metadata = {
    title: "Manage Admins | Rentopia",
    description: "A page for Admin to manage all the admins of Rentopia."
};


const ManageAdminsPage = async ({ searchParams }: { searchParams: Promise<{ [key: string]: string | string[] | undefined }> }) => {

    const searchParamsObj = await searchParams;
    const queryString = queryStringFormatter(searchParamsObj);
    const { data: users, meta } = await getAllUsers(`role=ADMIN&${queryString}`);

    return (
        <>
            <PageHeader title="Manage Users" subtitle="Manage all users from here."/>
            <div className="flex items-center gap-2 mb-6">
                <SearchFilter placeholder="Search by name, email or address" />
                <SelectFilter
                    placeholder="Status"
                    paramName="category"
                    options={
                        Object.values(IsActive).map((status: IsActive) => (
                            {
                                label: status,
                                value: status
                            }
                        ))
                    }
                />
                <RefreshButton />
            </div>
            <Suspense fallback={<TableSkeleton columns={10}/>}>
                <ManageAdminsTable users={users} />
            </Suspense>
            <Pagination currentPage={meta.page} totalPages={meta.totalPages} limit={meta.limit} />
        </>
    );
};

export default ManageAdminsPage;