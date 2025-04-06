import { Card, CardContent } from "@/components/ui/card"
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    LabelList,
} from "recharts"
import { useTranslation } from "react-i18next"

const data = [
    { name: "approved_places", value: 612 },
    { name: "planned_places", value: 105 },
    { name: "total_water", value: 50000 },
    { name: "monitored_sites", value: 85 },
]

export default function StatisticsPage() {
    const { t } = useTranslation()

    return (
        <div className="min-h-[calc(100vh-70px)] bg-white py-12 px-4">
            <div className="container mx-auto max-w-6xl space-y-10">
                <h2 className="text-2xl md:text-3xl font-semibold text-center text-zinc-800">
                    {t("season_stats.title")}
                </h2>

                <Card className="bg-zinc-50 shadow-none">
                    <CardContent className="p-6 text-center text-zinc-600">
                        {t("season_stats.description_1")}
                    </CardContent>
                </Card>

                <div className="grid md:grid-cols-2 gap-6">
                    <Card className="bg-zinc-50 shadow-none">
                        <CardContent className="p-6 text-zinc-600">
                            {t("season_stats.description_2")}
                        </CardContent>
                    </Card>

                    <ResponsiveContainer width="100%" height={300}>
                        <BarChart data={data}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis
                                dataKey="name"
                                tick={{ fontSize: 12 }}
                                tickFormatter={(key) => t(`season_stats.chart.${key}`)}
                            />
                            <YAxis tick={{ fontSize: 12 }} />
                            <Tooltip
                                formatter={(value) => [value, t("season_stats.count")]}
                                labelFormatter={(label) => t(`season_stats.chart.${label}`)}
                            />
                            <Bar dataKey="value" fill="#22c55e">
                                <LabelList dataKey="value" position="top" />
                            </Bar>
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </div>
    )
}
