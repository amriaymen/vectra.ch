import { Topbar } from "@/components/layout/topbar";
import { StatCard } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
    mockKPIs,
    mockProjects,
    mockLeads,
    mockFinances,
    monthlyRevenue,
} from "@/lib/mock-data";
import { formatCurrency, formatDate } from "@/lib/utils";
import {
    DollarSign,
    FolderKanban,
    TrendingUp,
    AlertCircle,
    ArrowRight,
    Zap,
} from "lucide-react";
import Link from "next/link";
import { RevenueChart } from "@/components/dashboard/revenue-chart";

export const metadata = { title: "Dashboard" };

export default function DashboardPage() {
    const recentProjects = mockProjects.slice(0, 4);
    const urgentLeads = mockLeads.filter((l) => l.stage === "negotiation" || l.nextActionDate);
    const outstanding = mockFinances.filter((f) => f.paymentStatus === "pending");

    return (
        <div className="flex flex-col flex-1">
            <Topbar
                title="Dashboard"
                description={`Good evening — ${new Date().toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric" })}`}
            />

            <main className="flex-1 p-6 flex flex-col gap-6">
                {/* KPI Cards */}
                <section>
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                        <StatCard
                            label="Revenue this month"
                            value={formatCurrency(mockKPIs.monthlyRevenue)}
                            delta={mockKPIs.revenueChange}
                            deltaLabel="vs last"
                            icon={<DollarSign className="w-4 h-4" />}
                            accent
                        />
                        <StatCard
                            label="Active projects"
                            value={mockKPIs.activeProjects}
                            icon={<FolderKanban className="w-4 h-4" />}
                        />
                        <StatCard
                            label="Open leads"
                            value={mockKPIs.openLeads}
                            icon={<TrendingUp className="w-4 h-4" />}
                        />
                        <StatCard
                            label="Outstanding"
                            value={formatCurrency(mockKPIs.totalOutstanding)}
                            icon={<AlertCircle className="w-4 h-4" />}
                        />
                    </div>
                </section>

                {/* Revenue Chart + Recent Activity */}
                <div className="grid lg:grid-cols-3 gap-6">
                    {/* Revenue chart */}
                    <div className="lg:col-span-2 rounded-xl border border-border bg-card p-5">
                        <div className="flex items-center justify-between mb-5">
                            <div>
                                <h2 className="text-sm font-medium">Revenue</h2>
                                <p className="text-xs text-muted-foreground mt-0.5">Last 12 months</p>
                            </div>
                            <Badge variant="active" dot>Live</Badge>
                        </div>
                        <RevenueChart data={monthlyRevenue} />
                    </div>

                    {/* Action items */}
                    <div className="rounded-xl border border-border bg-card p-5 flex flex-col gap-4">
                        <div className="flex items-center justify-between">
                            <h2 className="text-sm font-medium">Follow-ups</h2>
                            <Zap className="w-4 h-4 text-accent" />
                        </div>
                        <div className="flex flex-col gap-2">
                            {urgentLeads.slice(0, 4).map((lead) => (
                                <div
                                    key={lead.id}
                                    className="flex items-center gap-3 p-3 rounded-lg bg-secondary/50 hover:bg-secondary transition-colors cursor-pointer group"
                                >
                                    <Avatar name={lead.companyName} size="sm" />
                                    <div className="flex-1 min-w-0">
                                        <p className="text-xs font-medium truncate">{lead.companyName}</p>
                                        {lead.nextActionDate && (
                                            <p className="text-[10px] text-muted-foreground">
                                                Due {formatDate(lead.nextActionDate, { month: "short", day: "numeric" })}
                                            </p>
                                        )}
                                    </div>
                                    <Badge variant={`stage-${lead.stage}` as "stage-discovery"} className="text-[10px]">
                                        {lead.stage}
                                    </Badge>
                                </div>
                            ))}
                        </div>
                        <Link href="/dashboard/pipeline" className="mt-auto">
                            <Button variant="outline" size="sm" className="w-full gap-1">
                                View pipeline <ArrowRight className="w-3.5 h-3.5" />
                            </Button>
                        </Link>
                    </div>
                </div>

                {/* Projects + Outstanding */}
                <div className="grid lg:grid-cols-2 gap-6">
                    {/* Active projects */}
                    <div className="rounded-xl border border-border bg-card p-5">
                        <div className="flex items-center justify-between mb-4">
                            <h2 className="text-sm font-medium">Projects</h2>
                            <Link href="/dashboard/projects">
                                <Button variant="ghost" size="sm" className="text-xs gap-1 text-muted-foreground">
                                    All <ArrowRight className="w-3 h-3" />
                                </Button>
                            </Link>
                        </div>
                        <div className="flex flex-col gap-2">
                            {recentProjects.map((project) => (
                                <Link
                                    key={project.id}
                                    href={`/dashboard/projects/${project.id}`}
                                    className="flex items-center gap-3 p-3 rounded-lg hover:bg-secondary/50 transition-colors group"
                                >
                                    <Avatar name={project.clientName} size="sm" />
                                    <div className="flex-1 min-w-0">
                                        <p className="text-sm font-medium truncate group-hover:text-accent transition-colors">
                                            {project.name}
                                        </p>
                                        <p className="text-xs text-muted-foreground">{project.clientName}</p>
                                    </div>
                                    <div className="flex flex-col items-end gap-1">
                                        <Badge variant={`status-${project.status}` as "status-active"} dot>
                                            {project.status}
                                        </Badge>
                                        <span className="text-[10px] text-muted-foreground">
                                            {formatCurrency(project.contractValue)}
                                        </span>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>

                    {/* Outstanding invoices */}
                    <div className="rounded-xl border border-border bg-card p-5">
                        <div className="flex items-center justify-between mb-4">
                            <h2 className="text-sm font-medium">Outstanding</h2>
                            <Link href="/dashboard/finances">
                                <Button variant="ghost" size="sm" className="text-xs gap-1 text-muted-foreground">
                                    Finances <ArrowRight className="w-3 h-3" />
                                </Button>
                            </Link>
                        </div>
                        <div className="flex flex-col gap-2">
                            {outstanding.map((record) => (
                                <div
                                    key={record.id}
                                    className="flex items-center gap-3 p-3 rounded-lg bg-secondary/40"
                                >
                                    <Avatar name={record.clientName} size="sm" />
                                    <div className="flex-1 min-w-0">
                                        <p className="text-sm font-medium truncate">{record.description}</p>
                                        <p className="text-xs text-muted-foreground">{record.clientName}</p>
                                    </div>
                                    <div className="flex flex-col items-end gap-1">
                                        <span className="text-sm font-semibold">
                                            {formatCurrency(record.amount)}
                                        </span>
                                        <Badge variant={record.paymentStatus as "pending"} dot className="text-[10px]">
                                            {record.paymentStatus}
                                        </Badge>
                                    </div>
                                </div>
                            ))}
                            {outstanding.length === 0 && (
                                <p className="text-sm text-muted-foreground text-center py-6">
                                    All invoices paid 🎉
                                </p>
                            )}
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
