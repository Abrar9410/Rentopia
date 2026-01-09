import { getStatsForUser } from "@/actions/stat";
import StatCard from "@/components/dashboard/overviewPage/StatCard";
import UserCharts from "@/components/dashboard/overviewPage/UserCharts";
import PageHeader from "@/components/PageHeader";
import { Metadata } from "next";



export const metadata: Metadata = {
    title: "Overview | Rentopia",
    description: "An overview page for user containing stats and analytics of his/her usage."
};


const UserOverviewPage = async () => {
    const result = await getStatsForUser();

    if (!result) {
        return <p className="text-destructive">{result?.message}</p>;
    }

    const { data } = result;

    return (
        <section className="space-y-8 mb-8">
            <PageHeader
                title="Overview"
                subtitle="Your renting and earning activities"
                className="mt-8"
            />

            {/* Stat Cards */}
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                <StatCard
                    title="Items Listed"
                    value={data.listings.itemsListed}
                    className="bg-amber-100 text-amber-900"
                />
                <StatCard
                    title="Active Rentals"
                    value={data.renting.active}
                    className="bg-emerald-100 text-emerald-900"
                />
                <StatCard
                    title="Total Spent"
                    value={`৳${data.renting.totalSpent}`}
                    className="bg-rose-100 text-rose-900"
                />
                <StatCard
                    title="Total Earned"
                    value={`৳${data.earning.totalEarned}`}
                    className="bg-blue-100 text-blue-900"
                />
            </div>

            {/* Charts */}
            <UserCharts charts={data.charts} />
        </section>
    );
};

export default UserOverviewPage;