import type { InvitationStatus } from "@/types/invitation";

/**
 * In-memory fallback so /welcome/demo-john works without a Supabase project
 * configured. lib/invitations.ts falls back to these when SUPABASE_URL /
 * SUPABASE_SECRET_KEY are unset, or when the token matches a demo entry.
 */
export interface DemoInvitation {
  token: string;
  applicantName: string;
  role: string;
  personalMessage: string;
  meetingDate: string;
  meetingTime: string;
  status: InvitationStatus;
  openedAt: string | null;
  respondedAt: string | null;
}

export const DEMO_TOKENS = ["demo", "demo-john"] as const;

// Stashed on globalThis so the store survives Next.js dev's module
// re-evaluation between requests (route handlers and server components can
// otherwise each get a fresh module instance). Irrelevant in production,
// where real tokens go through Supabase instead.
const globalForDemo = globalThis as unknown as {
  __explogenDemoStore?: Map<string, DemoInvitation>;
};

function createDemoStore(): Map<string, DemoInvitation> {
  const store = new Map<string, DemoInvitation>([
    [
      "demo-john",
      {
        token: "demo-john",
        applicantName: "John Doe",
        role: "Co-Founder",
        personalMessage:
          "Throughout our conversations, we were impressed by what you bring to the table. Your skills, perspective, and ambition stood out to us, and we believe you can play a meaningful role in what we're building.",
        meetingDate: "Monday",
        meetingTime: "8:00 PM",
        status: "pending",
        openedAt: null,
        respondedAt: null,
      },
    ],
  ]);
  store.set("demo", { ...store.get("demo-john")!, token: "demo" });
  return store;
}

const demoStore = globalForDemo.__explogenDemoStore ?? createDemoStore();
globalForDemo.__explogenDemoStore = demoStore;

export function getDemoInvitation(token: string): DemoInvitation | null {
  return demoStore.get(token) ?? null;
}

export function markDemoOpened(token: string) {
  const record = demoStore.get(token);
  if (record && !record.openedAt) {
    record.openedAt = new Date().toISOString();
    if (record.status === "pending") record.status = "opened";
  }
}

export function respondToDemoInvitation(token: string, response: "accepted" | "unavailable") {
  const record = demoStore.get(token);
  if (!record) return null;
  if (record.status !== "accepted" && record.status !== "unavailable") {
    record.status = response;
    record.respondedAt = new Date().toISOString();
  }
  return record;
}
