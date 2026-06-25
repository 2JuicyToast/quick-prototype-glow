import { createFileRoute, Link } from "@tanstack/react-router";
import { AppShell, PageHeader, SectionHeader, QuickLinks } from "@/components/AppShell";
import { Briefcase, GraduationCap, HeartHandshake, Search, MapPin, Users, ArrowRight, Calendar } from "lucide-react";

export const Route = createFileRoute("/main")({
  head: () => ({
    meta: [
      { title: "Dashboard — MyCommNet" },
      { name: "description", content: "Your MyCommNet dashboard: opportunities, groups, and resources near you." },
    ],
  }),
  component: MainPage,
});

const opportunities = [
  {
    icon: Briefcase,
    title: "Jobs & Apprenticeships",
    desc: "12 new openings within 5 miles, from entry-level to skilled trades.",
    accent: "text-brand-purple",
    bg: "bg-brand-purple/10",
  },
  {
    icon: HeartHandshake,
    title: "Mentoring",
    desc: "Connect with vetted mentors in your field. 4 matches waiting for you.",
    accent: "text-brand-blue",
    bg: "bg-brand-blue/10",
  },
  {
    icon: GraduationCap,
    title: "Training & Workshops",
    desc: "Free skill-building sessions hosted by local community partners.",
    accent: "text-brand-teal",
    bg: "bg-brand-teal/10",
  },
];

function MainPage() {
  return (
    <AppShell>
      <PageHeader
        eyebrow="Your Community"
        title="Welcome back"
        subtitle="Discover opportunities, connect with neighbors, and grow alongside your community."
      />

      {/* Search hero */}
      <div className="mb-8 rounded-2xl bg-gradient-brand-soft p-6 md:p-8 shadow-card-soft">
        <div className="mx-auto flex max-w-2xl flex-col items-center text-center">
          <h2 className="font-display text-2xl font-bold tracking-tight md:text-3xl">
            What do you need today?
          </h2>
          <p className="mt-2 text-sm text-muted-foreground md:text-base">
            Search jobs, resources, mentors, events, and more — all near you.
          </p>
          <div className="mt-5 flex w-full items-center gap-2 rounded-xl bg-background/80 p-2 shadow-card-soft backdrop-blur">
            <Search className="ml-2 h-5 w-5 text-muted-foreground" />
            <input
              placeholder="Try “food pantry”, “welding class”, or “youth mentor”"
              className="h-10 flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground"
            />
            <button className="rounded-lg bg-gradient-brand px-4 py-2 text-sm font-semibold text-white shadow-glow-purple">
              Search
            </button>
          </div>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1fr_280px]">
        <div>
          <SectionHeader title="Opportunities near you" action={<Link to="/map" className="text-sm font-medium text-brand-teal hover:underline">View on map</Link>} />
          <div className="grid gap-4 md:grid-cols-3">
            {opportunities.map(({ icon: Icon, title, desc, accent, bg }) => (
              <div key={title} className="group rounded-2xl border border-border/60 bg-surface/60 p-5 transition hover:border-brand-purple/40">
                <div className={`grid h-11 w-11 place-items-center rounded-xl ${bg}`}>
                  <Icon className={`h-5 w-5 ${accent}`} />
                </div>
                <h3 className="mt-4 font-display text-lg font-semibold">{title}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{desc}</p>
                <button className={`mt-4 inline-flex items-center gap-1 text-sm font-semibold ${accent}`}>
                  Explore <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </button>
              </div>
            ))}
          </div>

          <div className="mt-8">
            <SectionHeader title="Happening this week" action={<Link to="/groups" className="text-sm font-medium text-brand-teal hover:underline">All groups</Link>} />
            <div className="grid gap-4 md:grid-cols-2">
              {[
                { title: "Neighborhood Cleanup", when: "Sat · 9:00 AM", where: "Grant Park", Icon: Calendar },
                { title: "Resume Lab", when: "Tue · 6:30 PM", where: "Westside Library", Icon: Users },
              ].map((e) => (
                <div key={e.title} className="flex items-center gap-4 rounded-2xl border border-border/60 bg-surface/60 p-4">
                  <div className="grid h-12 w-12 place-items-center rounded-xl bg-brand-teal/10">
                    <e.Icon className="h-5 w-5 text-brand-teal" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold">{e.title}</h4>
                    <p className="text-xs text-muted-foreground">{e.when}</p>
                    <p className="mt-0.5 flex items-center gap-1 text-xs text-muted-foreground">
                      <MapPin className="h-3 w-3" /> {e.where}
                    </p>
                  </div>
                  <button className="rounded-lg bg-surface-2 px-3 py-1.5 text-xs font-semibold hover:bg-surface">RSVP</button>
                </div>
              ))}
            </div>
          </div>
        </div>

        <aside className="space-y-4">
          <QuickLinks />
          <div className="rounded-2xl border border-border/60 bg-surface/60 p-5">
            <h3 className="font-display text-base font-semibold">Your impact</h3>
            <p className="mt-1 text-xs text-muted-foreground">Volunteer hours this month</p>
            <p className="mt-3 font-display text-3xl font-bold text-brand-teal">12.5</p>
            <Link to="/profile" className="mt-3 inline-flex items-center gap-1 text-sm font-medium text-brand-purple">
              View profile <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </aside>
      </div>
    </AppShell>
  );
}
