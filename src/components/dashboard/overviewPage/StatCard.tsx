import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";


const StatCard = ({ title, value, className }: { title: string; value: string | number; className?: string }) => (
    <Card className={className}>
        <CardHeader>
            <CardTitle className="text-sm opacity-80">
                {title}
            </CardTitle>
        </CardHeader>
        <CardContent>
            <p className="text-2xl font-bold">{value}</p>
        </CardContent>
    </Card>
);

export default StatCard;