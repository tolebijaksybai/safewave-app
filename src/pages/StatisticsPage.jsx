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

const data = [
    { name: "Approved places (2023)", value: 612 },
    { name: "Planned places", value: 105 },
    { name: "Total water bodies", value: 50000 },
    { name: "Monitored sites", value: 85 },
]

export default function StatisticsPage() {
    return (
        <div className="min-h-[calc(100vh-70px)] bg-white py-12 px-4">
            <div className="container mx-auto max-w-6xl space-y-10">
                <h2 className="text-2xl md:text-3xl font-semibold text-center text-zinc-800">
                    Statistics of the bathing season in Kazakhstan
                </h2>

                <Card className="bg-zinc-50 shadow-none">
                    <CardContent className="p-6 text-center text-zinc-600">
                        In 2023, 612 permitted places of mass recreation, tourism and sports on water bodies were
                        identified in the country. Additionally, it is planned to create 105 permitted bathing areas. In
                        total, there are more than 50 thousand reservoirs in Kazakhstan used by citizens for swimming and
                        recreation.
                    </CardContent>
                </Card>

                <div className="grid md:grid-cols-2 gap-6">
                    <Card className="bg-zinc-50 shadow-none">
                        <CardContent className="p-6 text-zinc-600">
                            To increase the safety of citizens, the Ministry of Emergency Situations (MOE) of Kazakhstan
                            continues to work to increase the number of permitted bathing areas and strengthen preventive
                            measures. Citizens are advised to swim only in specially equipped and authorized places, follow
                            the rules of behavior on the water and follow the warnings of rescue services.
                        </CardContent>
                    </Card>

                    <ResponsiveContainer width="100%" height={300}>
                        <BarChart data={data}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="name" tick={{ fontSize: 12 }} />
                            <YAxis tick={{ fontSize: 12 }} />
                            <Tooltip />
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
