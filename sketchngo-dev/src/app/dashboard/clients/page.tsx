import { Topbar } from "@/components/layout/topbar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar } from "@/components/ui/avatar";
import { mockClients, mockProjects } from "@/lib/mock-data";
import { formatCurrency, formatDate } from "@/lib/utils";
import { Plus, Mail, Phone, ArrowRight } from "lucide-react";
import Link from "next/link";

export const metadata = { title: "Clients" };

export default function ClientsPage() {
    return (
        <div className="flex flex-col flex-1">
            <Topbar
                title="Clients"
                description={`${mockClients.length} clients`}
                actions={
                    <Button variant="accent" size="sm" className="gap-1.5">
                        <Plus className="w-3.5 h-3.5" />
                        Add client
                    </Button>
                }
            />

            <main className="flex-1 p-6 flex flex-col gap-6">
                <div className="grid gap-4">
                    {mockClients.map((client) => {
                        const clientProjects = mockProjects.filter((p) => p.clientId === client.id);
                        const activeProjects = clientProjects.filter((p) => p.status === "active" || p.status === "review");

                        return (
                            <div
                                key={client.id}
                                className="rounded-xl border border-border bg-card p-5 hover:border-accent/30 transition-all duration-200 group"
                            >
                                <div className="flex items-start justify-between gap-4">
                                    <div className="flex items-center gap-4">
                                        <Avatar name={client.name} size="lg" accentColor={activeProjects.length > 0} />
                                        <div>
                                            <h3 className="font-medium text-foreground group-hover:text-accent transition-colors">
                                                {client.name}
                                            </h3>
                                            <p className="text-sm text-muted-foreground">{client.company}</p>
                                            <div className="flex items-center gap-3 mt-2">
                                                <a
                                                    href={`mailto:${client.email}`}
                                                    className="flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground transition-colors"
                                                >
                                                    <Mail className="w-3 h-3" />
                                                    {client.email}
                                                </a>
                                                {client.phone && (
                                                    <a
                                                        href={`tel:${client.phone}`}
                                                        className="flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground transition-colors"
                                                    >
                                                        <Phone className="w-3 h-3" />
                                                        {client.phone}
                                                    </a>
                                                )}
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex items-start gap-4">
                                        <div className="text-right hidden sm:block">
                                            <p className="text-xs text-muted-foreground">Total billed</p>
                                            <p className="text-lg font-semibold text-accent">
                                                {formatCurrency(client.totalBilled)}
                                            </p>
                                        </div>
                                        <div className="text-right hidden md:block">
                                            <p className="text-xs text-muted-foreground">Member since</p>
                                            <p className="text-sm font-medium">
                                                {formatDate(client.createdAt, { month: "short", year: "numeric" })}
                                            </p>
                                        </div>
                                        {activeProjects.length > 0 && (
                                            <Badge variant="status-active" dot className="mt-0.5">
                                                Active project
                                            </Badge>
                                        )}
                                    </div>
                                </div>

                                {/* Projects for this client */}
                                {clientProjects.length > 0 && (
                                    <div className="mt-4 pt-4 border-t border-border flex flex-wrap gap-2">
                                        {clientProjects.map((project) => (
                                            <Link
                                                key={project.id}
                                                href={`/dashboard/projects/${project.id}`}
                                                className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-secondary hover:bg-secondary/80 transition-colors text-xs"
                                            >
                                                <span>{project.name}</span>
                                                <Badge variant={`status-${project.status}` as "status-active"} dot className="text-[10px]">
                                                    {project.status}
                                                </Badge>
                                                <ArrowRight className="w-3 h-3 text-muted-foreground" />
                                            </Link>
                                        ))}
                                    </div>
                                )}

                                {/* Notes */}
                                {client.notes && (
                                    <p className="mt-3 text-xs text-muted-foreground italic border-l-2 border-accent/30 pl-3">
                                        {client.notes}
                                    </p>
                                )}
                            </div>
                        );
                    })}
                </div>
            </main>
        </div>
    );
}
