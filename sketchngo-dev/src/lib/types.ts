// ─── Type Definitions ────────────────────────────────────────────────────────

export type ProjectStatus = "active" | "review" | "delivered" | "archived";
export type PaymentType = "fixed" | "hourly" | "retainer";
export type PaymentStatus = "pending" | "partial" | "paid" | "overdue";
export type PipelineStage = "discovery" | "proposal" | "negotiation" | "won" | "lost";
export type CaseStudyCategory = "web-app" | "mobile" | "saas" | "ecommerce" | "branding" | "other";

export interface Client {
    id: string;
    name: string;
    company: string;
    email: string;
    phone?: string;
    timezone?: string;
    country?: string;
    notes?: string;
    createdAt: string;
    totalBilled: number;
    projectIds: string[];
}

export interface Project {
    id: string;
    name: string;
    description?: string;
    clientId: string;
    clientName: string;
    status: ProjectStatus;
    startDate: string;
    dueDate: string;
    deliveredDate?: string;
    // Financials
    contractValue: number;
    paymentType: PaymentType;
    advancePaid: number;
    remainingBalance: number;
    paymentStatus: PaymentStatus;
    currency: string;
    // Stack & tags
    stack: string[];
    tags: string[];
    // Meta
    createdAt: string;
    updatedAt: string;
    caseStudyId?: string;
}

export interface FinanceRecord {
    id: string;
    projectId: string;
    projectName: string;
    clientName: string;
    type: "income" | "expense" | "adjustment";
    description: string;
    amount: number;
    currency: string;
    date: string;
    paymentStatus: PaymentStatus;
    notes?: string;
}

export interface Lead {
    id: string;
    companyName: string;
    contactName?: string;
    contactEmail?: string;
    contactLinkedIn?: string;
    stage: PipelineStage;
    estimatedValue: number;
    currency: string;
    source?: string;
    nextActionDate?: string;
    lastContactDate?: string;
    notes?: string;
    tags: string[];
    createdAt: string;
    updatedAt: string;
    convertedProjectId?: string;
}

export interface CaseStudy {
    id: string;
    slug: string;
    title: string;
    subtitle?: string;
    client: string;
    category: CaseStudyCategory;
    stack: string[];
    coverImage?: string;
    images: string[];
    problem: string;
    solution: string;
    outcome: string;
    metrics: { label: string; value: string }[];
    projectId?: string;
    featured: boolean;
    publishedAt: string;
}

export interface DashboardKPIs {
    monthlyRevenue: number;
    revenueChange: number;
    activeProjects: number;
    openLeads: number;
    overdueInvoices: number;
    totalOutstanding: number;
}
