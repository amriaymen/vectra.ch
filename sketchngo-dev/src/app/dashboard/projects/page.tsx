import { Topbar } from "@/components/layout/topbar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar } from "@/components/ui/avatar";
import { mockProjects } from "@/lib/mock-data";
import { formatCurrency, formatDate } from "@/lib/utils";
import { Plus, Calendar, ArrowRight } from "lucide-react";
import Link from "next/link";
import type { Project } from "@/lib/types";

export const metadata = { title: "Projects" };

const STATUS_ORDER: Record<string, number> = {
    active: 0,
    review: 1,
    delivered: 2,
    archived: 3,
};

export default function ProjectsPage() {
    const sorted = [...mockProjects].sort(
        (a, b) => STATUS_ORDER[a.status] - STATUS_ORDER[b.status]
    );

    const stats = {
        active: mockProjects.filter((p) => p.status === "active").length,
        review: mockProjects.filter((p) => p.status === "review").length,
        delivered: mockProjects.filter((p) => p.status === "delivered").length,
        totalValue: mockProjects.reduce((s, p) => s + p.contractValue, 0),
    };

    return (
        <div className="flex flex-col flex-1">
            <Topbar
                title="Projects"
                description={`${mockProjects.length} projects`}
                actions={
                    <Link href="/dashboard/projects/new">
                        <Button variant="accent" size="sm" className="gap-1.5">
                            <Plus className="w-3.5 h-3.5" />
                            New Project
                        </Button>
                    </Link>
                }
            />

            <main className="flex-1 p-6 flex flex-col gap-6">
                {/* Stats row */}
                <div className="grid grid-cols-4 gap-4">
                    {[
                        { label: "Active", value: stats.active, color: "text-success" },
                        { label: "In Review", value: stats.review, color: "text-warning-foreground" },
                        { label: "Delivered", value: stats.delivered, color: "text-chart-2" },
                        { label: "Total value", value: formatCurrency(stats.totalValue), color: "text-accent" },
                    ].map((s) => (
                        <div key={s.label} className="rounded-xl border border-border bg-card p-4">
                            <p className="text-xs text-muted-foreground">{s.label}</p>
                            <p className={`text-2xl font-semibold mt-1 ${s.color}`}>{s.value}</p>
                        </div>
                    ))}
                </div>

                {/* Projects table */}
                <div className="rounded-xl border border-border bg-card overflow-hidden">
                    <table className="w-full text-sm">
                        <thead>
                            <tr className="border-b border-border bg-secondary/30">
                                <th className="text-left px-5 py-3 text-xs font-medium text-muted-foreground">Project</th>
                                <th className="text-left px-4 py-3 text-xs font-medium text-muted-foreground hidden md:table-cell">Client</th>
                                <th className="text-left px-4 py-3 text-xs font-medium text-muted-foreground">Status</th>
                                <th className="text-left px-4 py-3 text-xs font-medium text-muted-foreground hidden lg:table-cell">Due date</th>
                                <th className="text-right px-4 py-3 text-xs font-medium text-muted-foreground">Value</th>
                                <th className="text-right px-4 py-3 text-xs font-medium text-muted-foreground hidden lg:table-cell">Payment</th>
                                <th className="px-5 py-3" />
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-border">
                            {sorted.map((project) => (
                                <ProjectRow key={project.id} project={project} />
                            ))}
                        </tbody>
                    </table>
                </div>
            </main>
        </div>
    );
}

function ProjectRow({ project }: { project: Project }) {
    const progressPct = Math.round((project.advancePaid / project.contractValue) * 100);

    return (
        <tr className="hover:bg-secondary/30 transition-colors group">
            <td className="px-5 py-4">
                <div className="flex items-center gap-3">
                    <Avatar name={project.clientName} size="sm" accentColor={project.status === "active"} />
                    <div>
                        <p className="font-medium text-foreground group-hover:text-accent transition-colors">
                            {project.name}
                        </p>
                        <div className="flex flex-wrap gap-1 mt-1">
                            {project.stack.slice(0, 3).map((s) => (
                                <span key={s} className="text-[10px] text-muted-foreground bg-secondary px-1.5 py-0.5 rounded">
                                    {s}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>
            </td>
            <td className="px-4 py-4 hidden md:table-cell">
                <p className="text-sm text-muted-foreground">{project.clientName}</p>
            </td>
            <td className="px-4 py-4">
                <Badge variant={`status-${project.status}` as "status-active"} dot>
                    {project.status}
                </Badge>
            </td>
            <td className="px-4 py-4 hidden lg:table-cell">
                <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
                    <Calendar className="w-3.5 h-3.5" />
                    {formatDate(project.dueDate, { month: "short", day: "numeric", year: "numeric" })}
                </div>
            </td>
            <td className="px-4 py-4 text-right">
                <p className="font-semibold">{formatCurrency(project.contractValue)}</p>
                <div className="mt-1 h-1 w-20 ml-auto bg-secondary rounded-full overflow-hidden">
                    <div
                        className="h-full bg-accent rounded-full"
                        style={{ width: `${progressPct}%` }}
                    />
                </div>
            </td>
            <td className="px-4 py-4 text-right hidden lg:table-cell">
                <Badge variant={project.paymentStatus as "pending"} dot>
                    {project.paymentStatus}
                </Badge>
            </td>
            <td className="px-5 py-4 text-right">
                <Link href={`/dashboard/projects/${project.id}`}>
                    <Button variant="ghost" size="icon-sm" className="opacity-0 group-hover:opacity-100 transition-opacity">
                        <ArrowRight className="w-4 h-4" />
                    </Button>
                </Link>
            </td>
        </tr>
    );
}
