import { createFileRoute } from "@tanstack/react-router";
import { AppShell, PageHeader } from "@/components/AppShell";
import { Search, Star, Send, Paperclip, Shield, MoreVertical } from "lucide-react";
import { useState } from "react";

export const Route = createFileRoute("/messages")({
  head: () => ({
    meta: [
      { title: "Messages — MyCommNet" },
      { name: "description", content: "Direct message inbox from mentors, organizations, and group members." },
      { property: "og:title", content: "Messages — MyCommNet" },
      { property: "og:description", content: "Direct message inbox from mentors, organizations, and group members." },
    ],
  }),
  component: MessagesPage,
});

type Convo = {
  id: string;
  name: string;
  role: "Mentor" | "Organization" | "Group" | "Friend";
  body: string;
  time: string;
  unread?: number;
  starred?: boolean;
  initial: string;
  color: "purple" | "blue" | "teal";
};

const conversations: Convo[] = [
  { id: "1", name: "Marcus Johnson", role: "Mentor", body: "Great job on your progress! Let's schedule a time to talk about your next steps.", time: "9:30 AM", unread: 2, initial: "M", color: "purple" },
  { id: "2", name: "TechForward Careers", role: "Organization", body: "Thanks for your interest! We'd love to learn more about your experience.", time: "Yesterday", unread: 1, initial: "T", color: "blue" },
  { id: "3", name: "Youth Future Leaders", role: "Group", body: "Aisha: Don't forget about our meeting this Saturday at 10 AM!", time: "Yesterday", unread: 4, initial: "Y", color: "teal" },
  { id: "4", name: "Aisha Patel", role: "Friend", body: "Hey! I found a great workshop you might like.", time: "May 20", starred: true, initial: "A", color: "purple" },
  { id: "5", name: "GreenPath Organization", role: "Organization", body: "We've updated the volunteer opportunities. Check them out!", time: "May 19", initial: "G", color: "blue" },
  { id: "6", name: "Jordan Kim", role: "Friend", body: "Sounds good! Looking for...", time: "May 18", initial: "J", color: "teal" },
];

const thread = [
  { from: "them", time: "9:14 AM", body: "Hey Jayden — checked your reflection notes from the resource fair. Really thoughtful work." },
  { from: "them", time: "9:15 AM", body: "I'd love to hear how the conversation with Bright Futures went." },
  { from: "me", time: "9:22 AM", body: "Thanks! It went well — they're interested in the outreach role and want a follow-up." },
  { from: "them", time: "9:30 AM", body: "Great job on your progress! Let's schedule a time to talk about your next steps." },
];

const filters = ["All", "Mentors", "Groups", "Organizations", "Unread"];

function colorBg(c: string) {
  return c === "blue" ? "bg-brand-blue" : c === "teal" ? "bg-brand-teal" : "bg-gradient-brand";
}

function MessagesPage() {
  const [active, setActive] = useState("1");
  const current = conversations.find((c) => c.id === active)!;

  return (
    <AppShell>
      <PageHeader title="Messages" subtitle="Connect. Communicate. Create impact." />

      {/* Privacy banner */}
      <div className="mb-6 flex items-center gap-3 rounded-2xl border border-brand-teal/30 bg-brand-teal/5 px-4 py-3">
        <Shield className="h-5 w-5 text-brand-teal" />
        <div className="flex-1 text-sm">
          <span className="font-semibold">Your conversations are private and secure.</span>{" "}
          <span className="text-muted-foreground">We protect your messages and data.</span>
        </div>
        <button className="text-xs text-brand-teal hover:underline">Learn more</button>
      </div>

      <div className="grid h-[680px] gap-5 rounded-3xl lg:grid-cols-[360px_1fr]">
        {/* Inbox */}
        <aside className="flex flex-col overflow-hidden rounded-3xl border border-border/60 bg-surface">
          <div className="border-b border-border/60 p-4">
            <div className="flex items-center gap-2 rounded-xl bg-surface-2 px-3 py-2">
              <Search className="h-4 w-4 text-muted-foreground" />
              <input placeholder="Search messages or people..." className="flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground" />
            </div>
            <div className="mt-3 flex gap-2 overflow-x-auto">
              {filters.map((f, i) => (
                <button
                  key={f}
                  className={`whitespace-nowrap rounded-full px-3 py-1 text-xs font-medium ${
                    i === 0 ? "bg-gradient-brand text-white" : "bg-surface-2 text-muted-foreground ring-1 ring-border"
                  }`}
                >
                  {f === "Unread" && <span className="mr-1 inline-block h-1.5 w-1.5 rounded-full bg-brand-teal" />}
                  {f}
                </button>
              ))}
            </div>
          </div>

          <div className="flex-1 overflow-y-auto">
            {conversations.map((c) => (
              <button
                key={c.id}
                onClick={() => setActive(c.id)}
                className={`flex w-full gap-3 border-b border-border/40 px-4 py-3.5 text-left transition hover:bg-surface-2 ${
                  active === c.id ? "bg-surface-2" : ""
                }`}
              >
                <span className={`grid h-11 w-11 flex-shrink-0 place-items-center rounded-full text-sm font-bold text-white ${colorBg(c.color)}`}>
                  {c.initial}
                </span>
                <div className="min-w-0 flex-1">
                  <div className="flex items-baseline justify-between gap-2">
                    <div className="flex min-w-0 items-center gap-1.5">
                      <p className="truncate text-sm font-semibold">{c.name}</p>
                      {c.starred && <Star className="h-3 w-3 flex-shrink-0 fill-brand-teal text-brand-teal" />}
                    </div>
                    <span className="flex-shrink-0 text-[10px] text-muted-foreground">{c.time}</span>
                  </div>
                  <p className="text-[10px] uppercase tracking-wider text-muted-foreground">{c.role}</p>
                  <p className="mt-0.5 line-clamp-1 text-xs text-muted-foreground">{c.body}</p>
                </div>
                {c.unread && (
                  <span className="grid h-5 w-5 flex-shrink-0 place-items-center self-center rounded-full bg-brand-purple text-[10px] font-semibold text-white">
                    {c.unread}
                  </span>
                )}
              </button>
            ))}
          </div>
        </aside>

        {/* Thread */}
        <section className="flex flex-col overflow-hidden rounded-3xl border border-border/60 bg-surface">
          <header className="flex items-center gap-3 border-b border-border/60 p-4">
            <span className={`grid h-11 w-11 place-items-center rounded-full text-sm font-bold text-white ${colorBg(current.color)}`}>{current.initial}</span>
            <div className="flex-1">
              <p className="font-semibold">{current.name}</p>
              <p className="text-xs text-muted-foreground">{current.role} · active recently</p>
            </div>
            <button className="grid h-9 w-9 place-items-center rounded-lg text-muted-foreground hover:bg-surface-2">
              <MoreVertical className="h-4 w-4" />
            </button>
          </header>

          <div className="flex-1 space-y-4 overflow-y-auto p-6">
            <p className="text-center text-[11px] text-muted-foreground">Today</p>
            {thread.map((m, i) => (
              <div key={i} className={`flex ${m.from === "me" ? "justify-end" : "justify-start"}`}>
                <div className={`max-w-[75%] rounded-2xl px-4 py-2.5 text-sm ${
                  m.from === "me"
                    ? "bg-gradient-brand text-white shadow-glow-purple"
                    : "bg-surface-2 text-foreground"
                }`}>
                  <p>{m.body}</p>
                  <p className={`mt-1 text-[10px] ${m.from === "me" ? "text-white/70" : "text-muted-foreground"}`}>{m.time}</p>
                </div>
              </div>
            ))}
          </div>

          <footer className="border-t border-border/60 p-4">
            <div className="flex items-center gap-2 rounded-2xl bg-surface-2 px-3 py-2">
              <button className="grid h-9 w-9 place-items-center rounded-lg text-muted-foreground hover:bg-background">
                <Paperclip className="h-4 w-4" />
              </button>
              <input placeholder="Write a message…" className="flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground" />
              <button className="grid h-9 w-9 place-items-center rounded-lg bg-gradient-brand text-white shadow-glow-purple">
                <Send className="h-4 w-4" />
              </button>
            </div>
          </footer>
        </section>
      </div>
    </AppShell>
  );
}
