import { createFileRoute, Link } from "@tanstack/react-router";
import { AppShell, PageHeader, SectionHeader } from "@/components/AppShell";
import {
  Search, SlidersHorizontal, ArrowRight, Briefcase, GraduationCap, Calendar, Users,
  Wifi, MonitorSmartphone, Library, School, Bus, Heart, MessageSquare,
} from "lucide-react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "MyCommNet — Home" },
      { name: "description", content: "Personalized feed of opportunities, resources, and community nearby." },
      { property: "og:title", content: "MyCommNet — Home" },
      { property: "og:description", content: "Personalized feed of opportunities, resources, and community nearby." },
    ],
  }),
  component: HomePage,
});

const opportunities = [
  { tag: "JOB", title: "Community Outreach Coordinator", org: "Bright Futures Org", meta: "2.4 mi away", chip: "Full-time", tone: "purple" },
  { tag: "MENTORING", title: "Career Mentorship in Tech", org: "Tech Forward", meta: "Online", chip: "Mentor Match", tone: "blue" },
  { tag: "TRAINING", title: "Digital Skills Bootcamp", org: "Code for Tomorrow", meta: "1.1 mi away", chip: "Free", tone: "teal" },
  { tag: "EVENT", title: "Community Resource Fair", org: "Unity Collective", meta: "0.8 mi away", chip: "May 24", tone: "purple" },
] as const;

const resources = [
  { icon: Wifi, label: "Free Wi-Fi", count: "3 locations near you" },
  { icon: MonitorSmartphone, label: "Working Computers", count: "5 locations near you" },
  { icon: Library, label: "Libraries", count: "2 locations near you" },
  { icon: School, label: "Schools & Education", count: "4 locations near you" },
  { icon: Bus, label: "Transportation Help", count: "4 locations near you" },
];

const highlights = [
  { type: "group", name: "Greenfield Neighbors", members: "1.2K members", body: "Local updates, events, and ways to get involved." },
  { type: "post", name: "Maya J.", time: "3h ago", body: "Great turnout for the job workshop today! Thank you to everyone who joined.", likes: 24, comments: 6 },
  { type: "group", name: "Youth Future", members: "876 members", body: "Empowering youth through resources and mentorship." },
];

function toneClasses(tone: string) {
  switch (tone) {
    case "blue": return "bg-brand-blue/15 text-brand-blue ring-1 ring-brand-blue/30";
    case "teal": return "bg-brand-teal/15 text-brand-teal ring-1 ring-brand-teal/30";
    default: return "bg-brand-purple/15 text-brand-purple ring-1 ring-brand-purple/40";
  }
}

function HomePage() {
  return (
    <AppShell>
      {/* Notify banner */}
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-border/70 bg-surface/60 px-4 py-3 text-sm">
        <div className="flex items-center gap-3">
          <span className="grid h-9 w-9 place-items-center rounded-lg bg-gradient-brand-soft text-brand-teal">✦</span>
          <div>
            <p className="font-semibold">New opportunities are landing daily</p>
            <p className="text-xs text-muted-foreground">Turn on notifications so you never miss out.</p>
          </div>
        </div>
        <button className="rounded-lg bg-gradient-brand px-4 py-2 text-xs font-semibold text-white shadow-glow-purple hover:opacity-95">
          Turn On Notifications
        </button>
      </div>

      {/* Hero */}
      <section className="relative mb-10 overflow-hidden rounded-3xl border border-border/60 bg-surface/40 bg-hero-glow p-6 md:p-10">
        <p className="text-sm text-muted-foreground">Good morning, Jayden 👋</p>
        <h1 className="mt-3 font-display text-4xl font-bold leading-tight tracking-tight md:text-6xl">
          Your community. <br />
          <span className="text-gradient-brand">Your future.</span>
        </h1>
        <p className="mt-4 max-w-xl text-sm text-muted-foreground md:text-base">
          Discover resources, opportunities, and people ready to help you grow and thrive.
        </p>

        <div className="mt-6 flex flex-col gap-2 sm:flex-row">
          <div className="flex flex-1 items-center gap-3 rounded-2xl border border-border bg-background/80 px-4 py-3 shadow-card-soft">
            <Search className="h-5 w-5 text-muted-foreground" />
            <input
              placeholder="Search opportunities, resources, groups..."
              className="flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground"
            />
          </div>
          <button className="flex items-center justify-center gap-2 rounded-2xl border border-border bg-background/80 px-4 py-3 text-sm font-medium hover:bg-surface">
            <SlidersHorizontal className="h-4 w-4" />
            Filters
          </button>
        </div>

        <div className="mt-5 flex flex-wrap gap-2">
          {["Wi-Fi near me", "Free meals", "Weekend events", "Resume help", "Tutoring"].map((p) => (
            <button key={p} className="rounded-full bg-surface/70 px-3 py-1.5 text-xs text-muted-foreground ring-1 ring-border hover:text-foreground">
              {p}
            </button>
          ))}
        </div>
      </section>

      {/* Opportunities */}
      <section className="mb-12">
        <SectionHeader
          title="Opportunities for You"
          action={
            <Link to="/" className="flex items-center gap-1 text-sm text-brand-teal hover:underline">
              View all <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          }
        />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {opportunities.map((o) => {
            const Icon = o.tag === "JOB" ? Briefcase : o.tag === "TRAINING" ? GraduationCap : o.tag === "EVENT" ? Calendar : Users;
            return (
              <article key={o.title} className="group flex flex-col rounded-2xl border border-border/60 bg-surface p-5 shadow-card-soft transition hover:-translate-y-0.5 hover:border-brand-purple/40">
                <div className="flex items-center justify-between">
                  <span className={`rounded-md px-2 py-0.5 text-[10px] font-bold tracking-wider ${toneClasses(o.tone)}`}>{o.tag}</span>
                  <Icon className="h-4 w-4 text-muted-foreground" />
                </div>
                <h3 className="mt-4 font-display text-base font-semibold leading-snug">{o.title}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{o.org}</p>
                <div className="mt-auto flex items-center justify-between pt-5 text-xs">
                  <span className="text-muted-foreground">📍 {o.meta}</span>
                  <span className="rounded-full bg-surface-2 px-2 py-1 font-medium">{o.chip}</span>
                </div>
              </article>
            );
          })}
        </div>
      </section>

      {/* Resources */}
      <section className="mb-12">
        <SectionHeader
          title="Resources Near You"
          action={<Link to="/map" className="flex items-center gap-1 text-sm text-brand-teal hover:underline">View on map <ArrowRight className="h-3.5 w-3.5" /></Link>}
        />
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
          {resources.map((r) => {
            const Icon = r.icon;
            return (
              <Link
                to="/map"
                key={r.label}
                className="group flex items-center gap-4 rounded-2xl border border-border/60 bg-surface p-4 transition hover:border-brand-teal/40 hover:bg-surface-2 lg:flex-col lg:items-start"
              >
                <span className="grid h-11 w-11 place-items-center rounded-xl bg-gradient-brand-soft text-brand-teal">
                  <Icon className="h-5 w-5" />
                </span>
                <div className="flex-1">
                  <p className="font-semibold">{r.label}</p>
                  <p className="text-xs text-muted-foreground">{r.count}</p>
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      {/* Community */}
      <section className="mb-12">
        <SectionHeader
          title="Community Highlights"
          action={<Link to="/groups" className="flex items-center gap-1 text-sm text-brand-teal hover:underline">View all <ArrowRight className="h-3.5 w-3.5" /></Link>}
        />
        <div className="grid gap-4 md:grid-cols-3">
          {highlights.map((h, i) => (
            <article key={i} className="rounded-2xl border border-border/60 bg-surface p-5">
              {h.type === "group" ? (
                <>
                  <div className="flex items-center justify-between">
                    <span className="grid h-10 w-10 place-items-center rounded-xl bg-gradient-brand text-sm font-bold text-white">
                      {h.name.charAt(0)}
                    </span>
                    <button className="rounded-lg bg-gradient-brand px-3 py-1.5 text-xs font-semibold text-white">Join</button>
                  </div>
                  <h3 className="mt-3 font-display text-base font-semibold">{h.name}</h3>
                  <p className="text-xs text-muted-foreground">{h.members}</p>
                  <p className="mt-3 text-sm text-muted-foreground">{h.body}</p>
                </>
              ) : (
                <>
                  <div className="flex items-center gap-3">
                    <span className="grid h-10 w-10 place-items-center rounded-full bg-brand-blue/20 text-sm font-bold text-brand-blue">{h.name.charAt(0)}</span>
                    <div>
                      <p className="text-sm font-semibold">{h.name}</p>
                      <p className="text-xs text-muted-foreground">{h.time}</p>
                    </div>
                  </div>
                  <p className="mt-3 text-sm">{h.body}</p>
                  <div className="mt-4 flex items-center gap-4 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1"><Heart className="h-3.5 w-3.5" /> {h.likes}</span>
                    <span className="flex items-center gap-1"><MessageSquare className="h-3.5 w-3.5" /> {h.comments}</span>
                  </div>
                </>
              )}
            </article>
          ))}
        </div>
      </section>

      {/* Newsletter */}
      <section className="relative overflow-hidden rounded-3xl border border-border/60 bg-gradient-brand-soft p-6 md:p-10">
        <div className="absolute -right-20 -top-20 h-72 w-72 rounded-full bg-brand-purple/30 blur-3xl" />
        <div className="relative grid items-center gap-6 md:grid-cols-[1.4fr_1fr]">
          <div>
            <h3 className="font-display text-2xl font-bold md:text-3xl">Stay in the loop</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              Get personalized updates on new opportunities and community news.
            </p>
          </div>
          <form className="flex flex-col gap-2 sm:flex-row">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 rounded-xl border border-border bg-background/80 px-4 py-3 text-sm outline-none placeholder:text-muted-foreground focus:border-brand-purple"
            />
            <button className="rounded-xl bg-gradient-brand px-5 py-3 text-sm font-semibold text-white shadow-glow-purple">
              Subscribe
            </button>
          </form>
        </div>
      </section>
    </AppShell>
  );
}

