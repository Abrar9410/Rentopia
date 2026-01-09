"use client";

import {
    BarChart,
    Bar,
    PieChart,
    Pie,
    Cell,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const COLORS = ["#2563eb", "#22c55e", "#f97316", "#ef4444"];

interface AdminChartsProps {
    charts: {
        orderStatusDistribution: { _id: string; count: number }[];
        monthlyRevenue: { _id: number; total: number }[];
    };
}

const AdminCharts = ({ charts }: AdminChartsProps) => {
    return (
        <div className="grid gap-6 lg:grid-cols-2">
            {/* Orders Status */}
            <Card>
                <CardHeader>
                    <CardTitle>Orders Status</CardTitle>
                </CardHeader>
                <CardContent className="h-72">
                    <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                            <Pie
                                data={charts.orderStatusDistribution}
                                dataKey="count"
                                nameKey="_id"
                                outerRadius={100}
                                label
                            >
                                {charts.orderStatusDistribution.map((_, i) => (
                                    <Cell key={i} fill={COLORS[i % COLORS.length]} />
                                ))}
                            </Pie>
                            <Tooltip />
                        </PieChart>
                    </ResponsiveContainer>
                </CardContent>
            </Card>

            {/* Monthly Revenue */}
            <Card>
                <CardHeader>
                    <CardTitle>Monthly Revenue</CardTitle>
                </CardHeader>
                <CardContent className="h-72">
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={charts.monthlyRevenue}>
                            <XAxis dataKey="_id" />
                            <YAxis />
                            <Tooltip />
                            <Bar dataKey="total" fill="#2563eb" radius={[6, 6, 0, 0]} />
                        </BarChart>
                    </ResponsiveContainer>
                </CardContent>
            </Card>
        </div>
    );
};

export default AdminCharts;
