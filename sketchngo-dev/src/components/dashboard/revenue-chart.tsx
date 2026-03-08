"use client";

import {
    AreaChart,
    Area,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
} from "recharts";
import { formatCurrency } from "@/lib/utils";

interface RevenueChartProps {
    data: { month: string; revenue: number }[];
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function CustomTooltip({ active, payload, label }: any) {
    if (!active || !payload?.length) return null;
    return (
        <div className="bg-popover border border-border rounded-lg px-3 py-2 shadow-lg text-xs">
            <p className="text-muted-foreground mb-1">{label}</p>
            <p className="font-semibold text-foreground">
                {formatCurrency(payload[0].value)}
            </p>
        </div>
    );
}

export function RevenueChart({ data }: RevenueChartProps) {
    return (
        <ResponsiveContainer width="100%" height={200}>
            <AreaChart data={data} margin={{ top: 4, right: 4, bottom: 0, left: 0 }}>
                <defs>
                    <linearGradient id="revenueGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="oklch(0.91 0.22 120)" stopOpacity={0.3} />
                        <stop offset="95%" stopColor="oklch(0.91 0.22 120)" stopOpacity={0} />
                    </linearGradient>
                </defs>
                <CartesianGrid
                    strokeDasharray="3 3"
                    stroke="oklch(0.5 0 0 / 12%)"
                    vertical={false}
                />
                <XAxis
                    dataKey="month"
                    tick={{ fontSize: 11, fill: "oklch(0.56 0 0)" }}
                    axisLine={false}
                    tickLine={false}
                    dy={8}
                />
                <YAxis
                    tick={{ fontSize: 11, fill: "oklch(0.56 0 0)" }}
                    axisLine={false}
                    tickLine={false}
                    tickFormatter={(v) => (v === 0 ? "$0" : `$${v / 1000}k`)}
                    width={38}
                />
                <Tooltip content={<CustomTooltip />} cursor={{ stroke: "oklch(0.91 0.22 120)", strokeWidth: 1, strokeDasharray: "4 4" }} />
                <Area
                    type="monotone"
                    dataKey="revenue"
                    stroke="oklch(0.91 0.22 120)"
                    strokeWidth={2}
                    fill="url(#revenueGradient)"
                    dot={false}
                    activeDot={{ r: 4, fill: "oklch(0.91 0.22 120)", strokeWidth: 0 }}
                />
            </AreaChart>
        </ResponsiveContainer>
    );
}
