"use client";

import { useState } from "react";
import { Topbar } from "@/components/layout/topbar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar } from "@/components/ui/avatar";
import { mockLeads } from "@/lib/mock-data";
import { formatCurrency, formatDate } from "@/lib/utils";
import { Plus, Calendar, DollarSign, ArrowRight } from "lucide-react";
import type { Lead, PipelineStage } from "@/lib/types";

const STAGES: { id: PipelineStage; label: string; description: string }[] = [
    { id: "discovery", label: "Discovery", description: "Initial contact, learning needs" },
    { id: "proposal", label: "Proposal", description: "Quote sent, awaiting response" },
    { id: "negotiation", label: "Negotiation", description: "Terms being discussed" },
    { id: "won", label: "Won", description: "Contract signed" },
    { id: "lost", label: "Lost", description: "Deal not closed" },
];

export default function PipelinePage() {
    const [leads, setLeads] = useState<Lead[]>(mockLeads);

    const getLeadsByStage = (stage: PipelineStage) =>
        leads.filter((l) => l.stage === stage);

    const totalPipelineValue = leads
        .filter((l) => l.stage !== "lost")
        .reduce((s, l) => s + l.estimatedValue, 0);

    const wonValue = leads
        .filter((l) => l.stage === "won")
        .reduce((s, l) => s + l.estimatedValue, 0);

    return (
        <div className="flex flex-col flex-1">
            <Topbar
                title="Pipeline"
                description={`${leads.length} leads · ${formatCurrency(totalPipelineValue)} total value`}
                actions={
                    <Button variant="accent" size="sm" className="gap-1.5">
                        <Plus className="w-3.5 h-3.5" />
                        Add lead
                    </Button>
                }
            />

            <main className="flex-1 p-6 flex flex-col gap-4 overflow-hidden">
                {/* Summary */}
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <span className="flex items-center gap-1.5">
                        <DollarSign className="w-3.5 h-3.5 text-accent" />
                        Pipeline: <strong className="text-foreground">{formatCurrency(totalPipelineValue)}</strong>
                    </span>
                    <span className="text-border">·</span>
                    <span className="flex items-center gap-1.5">
                        Won: <strong className="text-success">{formatCurrency(wonValue)}</strong>
                    </span>
                </div>

                {/* Kanban board */}
                <div className="flex gap-4 flex-1 overflow-x-auto pb-4">
                    {STAGES.map((stage) => {
                        const stageLeads = getLeadsByStage(stage.id);
                        const stageValue = stageLeads.reduce((s, l) => s + l.estimatedValue, 0);

                        return (
                            <div
                                key={stage.id}
                                className="flex flex-col gap-3 min-w-[260px] w-[260px] flex-shrink-0"
                            >
                                {/* Column header */}
                                <div className="flex items-center justify-between px-1">
                                    <div className="flex items-center gap-2">
                                        <Badge variant={`stage-${stage.id}` as "stage-discovery"} dot>
                                            {stage.label}
                                        </Badge>
                                        {stageLeads.length > 0 && (
                                            <span className="text-xs text-muted-foreground">
                                                {stageLeads.length}
                                            </span>
                                        )}
                                    </div>
                                    {stageValue > 0 && (
                                        <span className="text-xs text-muted-foreground">
                                            {formatCurrency(stageValue)}
                                        </span>
                                    )}
                                </div>

                                {/* Cards */}
                                <div className="flex flex-col gap-2 flex-1">
                                    {stageLeads.map((lead) => (
                                        <LeadCard key={lead.id} lead={lead} />
                                    ))}

                                    {stageLeads.length === 0 && (
                                        <div className="rounded-xl border border-dashed border-border p-4 text-center">
                                            <p className="text-xs text-muted-foreground">{stage.description}</p>
                                        </div>
                                    )}
                                </div>
                            </div>
                        );
                    })}
                </div>
            </main>
        </div>
    );
}

function LeadCard({ lead }: { lead: Lead }) {
    const isUrgent =
        lead.nextActionDate && new Date(lead.nextActionDate) <= new Date();

    return (
        <div
            className={`rounded-xl border bg-card p-4 cursor-pointer hover:shadow-md transition-all duration-200 group ${isUrgent ? "border-destructive/30" : "border-border hover:border-accent/30"
                }`}
        >
            <div className="flex items-start gap-3">
                <Avatar name={lead.companyName} size="sm" accentColor={lead.stage === "negotiation"} />
                <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate group-hover:text-accent transition-colors">
                        {lead.companyName}
                    </p>
                    {lead.contactName && (
                        <p className="text-xs text-muted-foreground truncate">{lead.contactName}</p>
                    )}
                </div>
            </div>

            <div className="mt-3 flex items-center justify-between">
                <span className="text-sm font-semibold text-accent">
                    {formatCurrency(lead.estimatedValue)}
                </span>
                {lead.source && (
                    <Badge variant="muted" className="text-[10px]">{lead.source}</Badge>
                )}
            </div>

            {lead.nextActionDate && (
                <div
                    className={`mt-2 flex items-center gap-1 text-[10px] ${isUrgent ? "text-destructive" : "text-muted-foreground"
                        }`}
                >
                    <Calendar className="w-3 h-3" />
                    Follow up {formatDate(lead.nextActionDate, { month: "short", day: "numeric" })}
                </div>
            )}

            {lead.notes && (
                <p className="mt-2 text-[10px] text-muted-foreground line-clamp-2 italic">
                    {lead.notes}
                </p>
            )}

            {/* Tags */}
            {lead.tags.length > 0 && (
                <div className="mt-2 flex flex-wrap gap-1">
                    {lead.tags.map((tag) => (
                        <span
                            key={tag}
                            className="text-[10px] bg-secondary text-muted-foreground px-1.5 py-0.5 rounded"
                        >
                            {tag}
                        </span>
                    ))}
                </div>
            )}

            {/* Win action */}
            {lead.stage === "negotiation" && (
                <Button
                    variant="accent"
                    size="sm"
                    className="w-full mt-3 gap-1 text-xs"
                >
                    Convert to Project <ArrowRight className="w-3 h-3" />
                </Button>
            )}
        </div>
    );
}
