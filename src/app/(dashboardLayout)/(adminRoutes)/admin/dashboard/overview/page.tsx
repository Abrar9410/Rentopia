import { Metadata } from "next";
import { getStatsForAdmin } from "@/actions/stat";
import StatCard from "@/components/dashboard/overviewPage/StatCard";
import AdminCharts from "@/components/dashboard/overviewPage/AdminCharts";
import PageHeader from "@/components/PageHeader";



export const metadata: Metadata = {
    title: "Overview | Rentopia",
    description: "An overview page for Admin containing stats and analytics of the platform 'Rentopia'."
};


const AdminOverviewPage = async () => {
    const result = await getStatsForAdmin();

    if (!result) {
        return <p className="text-destructive">{result?.message}</p>;
    };

    const { data } = result;

    return (
        <section className="space-y-8">
            <PageHeader 
                title="Overview"
                subtitle="Platform Analytics and Performance"
                className="mt-8"
            />

            {/* Stat Cards */}
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                <StatCard title="Users" value={data.users.total} className="bg-cyan-100 text-cyan-900" />
                <StatCard title="Items" value={data.items.total} className="bg-indigo-100 text-indigo-900" />
                <StatCard title="Active Orders" value={data.orders.active} className="bg-lime-100 text-lime-900" />
                <StatCard title="Revenue" value={`৳${data.revenue.total}`} className="bg-sky-100 text-sky-900" />
            </div>

            {/* Charts */}
            <AdminCharts charts={data.charts} />
        </section>
    );
};

export default AdminOverviewPage;