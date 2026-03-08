import { Topbar } from "@/components/layout/topbar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { mockFinances, mockProjects } from "@/lib/mock-data";
import { formatCurrency, formatDate } from "@/lib/utils";
import { Plus, TrendingUp, DollarSign, Clock, CheckCircle } from "lucide-react";
import type { FinanceRecord } from "@/lib/types";

export const metadata = { title: "Finances" };

export default function FinancesPage() {
    const totalCollected = mockFinances
        .filter((f) => f.paymentStatus === "paid" && f.type === "income")
        .reduce((s, f) => s + f.amount, 0);

    const totalPending = mockFinances
        .filter((f) => f.paymentStatus === "pending" && f.type === "income")
        .reduce((s, f) => s + f.amount, 0);

    const totalContracted = mockProjects.reduce((s, p) => s + p.contractValue, 0);

    return (
        <div className="flex flex-col flex-1">
            <Topbar
                title="Finances"
                description="Track revenue, payments, and outstanding balances"
                actions={
                    <Button variant="accent" size="sm" className="gap-1.5">
                        <Plus className="w-3.5 h-3.5" />
                        Add record
                    </Button>
                }
            />

            <main className="flex-1 p-6 flex flex-col gap-6">
                {/* Summary strip */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                    {[
                        {
                            label: "Collected",
                            value: formatCurrency(totalCollected),
                            icon: <CheckCircle className="w-4 h-4" />,
                            color: "text-success",
                        },
                        {
                            label: "Pending",
                            value: formatCurrency(totalPending),
                            icon: <Clock className="w-4 h-4" />,
                            color: "text-warning-foreground",
                        },
                        {
                            label: "Total contracted",
                            value: formatCurrency(totalContracted),
                            icon: <DollarSign className="w-4 h-4" />,
                            color: "text-accent",
                        },
                        {
                            label: "Collection rate",
                            value: `${Math.round((totalCollected / totalContracted) * 100)}%`,
                            icon: <TrendingUp className="w-4 h-4" />,
                            color: "text-chart-2",
                        },
                    ].map((s) => (
                        <div key={s.label} className="rounded-xl border border-border bg-card p-4 flex flex-col gap-3">
                            <div className="flex items-center justify-between">
                                <span className="text-xs text-muted-foreground">{s.label}</span>
                                <span className={`${s.color}`}>{s.icon}</span>
                            </div>
                            <span className={`text-2xl font-semibold ${s.color}`}>{s.value}</span>
                        </div>
                    ))}
                </div>

                {/* Per-project financial breakdown */}
                <div className="rounded-xl border border-border bg-card overflow-hidden">
                    <div className="px-5 py-4 border-b border-border flex items-center justify-between bg-secondary/20">
                        <h2 className="text-sm font-medium">Payment Records</h2>
                        <Badge variant="muted">{mockFinances.length} records</Badge>
                    </div>
                    <table className="w-full text-sm">
                        <thead>
                            <tr className="border-b border-border bg-secondary/20">
                                <th className="text-left px-5 py-3 text-xs font-medium text-muted-foreground">Description</th>
                                <th className="text-left px-4 py-3 text-xs font-medium text-muted-foreground hidden md:table-cell">Project</th>
                                <th className="text-left px-4 py-3 text-xs font-medium text-muted-foreground hidden lg:table-cell">Client</th>
                                <th className="text-left px-4 py-3 text-xs font-medium text-muted-foreground">Date</th>
                                <th className="text-right px-4 py-3 text-xs font-medium text-muted-foreground">Amount</th>
                                <th className="text-right px-5 py-3 text-xs font-medium text-muted-foreground">Status</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-border">
                            {mockFinances.map((record) => (
                                <FinanceRow key={record.id} record={record} />
                            ))}
                        </tbody>
                    </table>
                </div>
            </main>
        </div>
    );
}

function FinanceRow({ record }: { record: FinanceRecord }) {
    return (
        <tr className="hover:bg-secondary/30 transition-colors group">
            <td className="px-5 py-4">
                <p className="font-medium">{record.description}</p>
                <Badge variant="muted" className="mt-1 text-[10px]">{record.type}</Badge>
            </td>
            <td className="px-4 py-4 hidden md:table-cell text-muted-foreground text-sm">
                {record.projectName}
            </td>
            <td className="px-4 py-4 hidden lg:table-cell text-muted-foreground text-sm">
                {record.clientName}
            </td>
            <td className="px-4 py-4 text-sm text-muted-foreground">
                {formatDate(record.date, { month: "short", day: "numeric", year: "numeric" })}
            </td>
            <td className="px-4 py-4 text-right font-semibold">
                {formatCurrency(record.amount)}
            </td>
            <td className="px-5 py-4 text-right">
                <Badge variant={record.paymentStatus as "paid"} dot>
                    {record.paymentStatus}
                </Badge>
            </td>
        </tr>
    );
}
