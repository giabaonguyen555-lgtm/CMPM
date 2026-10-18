import { sites } from "./hanoiHeritageSites";

export const adminPois = sites.map((site) => ({
  ...site,
  status: "published",
  languages: ["vi", "en", "fr", "ja", "ko", "zh"],
}));

export const adminPayments = [
  {
    id: "PAY-001",
    sessionId: "DEMO-2026-001",
    email: "user@example.com",
    method: "cash",
    amount: 50000,
    status: "pending",
    claimCode: "HANOI-DEMO",
    createdAt: "2026-10-17T08:30:00Z",
  },
  {
    id: "PAY-002",
    sessionId: "DEMO-2026-002",
    email: "traveler@test.com",
    method: "online",
    amount: 50000,
    status: "paid",
    claimCode: "",
    createdAt: "2026-10-16T14:20:00Z",
  },
  {
    id: "PAY-003",
    sessionId: "DEMO-2026-003",
    email: "guest@mail.com",
    method: "cash",
    amount: 50000,
    status: "expired",
    claimCode: "EXPIRED-01",
    createdAt: "2026-10-15T09:00:00Z",
  },
  {
    id: "PAY-004",
    sessionId: "DEMO-2026-004",
    email: "visitor@demo.com",
    method: "online",
    amount: 50000,
    status: "pending",
    claimCode: "",
    createdAt: "2026-10-17T10:15:00Z",
  },
];

export const adminActivity = [
  { id: 1, text: "Cash session DEMO-2026-001 created", time: "2 hours ago" },
  { id: 2, text: "Temple of Literature audio updated", time: "5 hours ago" },
  { id: 3, text: "Payment PAY-002 marked as successful", time: "1 day ago" },
  {
    id: 4,
    text: "New location published: St. Joseph's Cathedral",
    time: "2 days ago",
  },
];

export const adminStats = {
  totalPois: sites.length,
  audioGuides: sites.length,
  languages: 6,
  pendingPayments: adminPayments.filter((p) => p.status === "pending").length,
  audioListens: 1284,
};
