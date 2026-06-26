import { createFileRoute } from "@tanstack/react-router";
import { AppShell, PageHeader } from "@/components/AppShell";
import { Search, Plus, Sparkles, Calendar, MessageSquare, ArrowRight } from "lucide-react";

export const Route = createFileRoute("/groups")({
  head: () => ({
    meta: [
      { title: "Groups — MyCommNet" },
      {
        name: "description",
        content: "Connect, learn, and grow together. Discover groups & clubs by interest.",
      },
      { property: "og:title", content: "Groups — MyCommNet" },
      {
        property: "og:description",
        content: "Connect, learn, and grow together. Discover groups & clubs by interest.",
      },
    ],
  }),
  component: GroupsPage,
});

const categories = [
  "All",
  "Youth",
  "Education",
  "Mentoring",
  "Sports",
  "Arts & Culture",
  "Community",
];

const featured = [
  {
    name: "Youth Future Leaders",
    desc: "Empowering youth to lead and create change in our communities.",
    members: "1.2K",
    online: 24,
    tag: "Youth",
  },
  {
    name: "Next Chapter Book Club",
    desc: "Read, discuss, and grow together—one book at a time.",
    members: "842",
    online: 18,
    tag: "Arts",
  },
  {
    name: "MentorConnect",
    desc: "Mentorship and guidance for students and young professionals.",
    members: "975",
    online: 15,
    tag: "Mentoring",
  },
];

const suggested = [
  {
    name: "Tech Forward",
    desc: "Learn tech skills, share resources, and build your future.",
    cat: "Education",
    members: "1.1K",
    online: 31,
  },
  {
    name: "Community Hoops",
    desc: "Play. Compete. Connect. All skill levels welcome!",
    cat: "Sports",
    members: "643",
    online: 12,
  },
  {
    name: "Community Changemakers",
    desc: "Local action. Real impact. Be the change.",
    cat: "Community",
    members: "712",
    online: 9,
  },
  {
    name: "Inspire & Create",
    desc: "A space for artists, writers, and dreamers.",
    cat: "Arts",
    members: "389",
    online: 7,
  },
];

const yourGroups = [
  {
    name: "Tech Creators Hub",
    tagline: "Design · Code · Build",
    members: 128,
    online: 8,
    unread: 2,
  },
  {
    name: "Community Hoops",
    tagline: "Win together. Grow together.",
    members: 243,
    online: 14,
    unread: 1,
  },
  {
    name: "Local Changemakers",
    tagline: "Small actions. Big impact.",
    members: 156,
    online: 6,
    unread: 3,
  },
];

const discussions = [
  {
    title: "Resources for first-time job seekers",
    group: "MentorConnect",
    author: "Maya J.",
    time: "2h ago",
    body: "Hey everyone! I'm putting together a list of local resources and tips for teens and young adults looking for their first job...",
    replies: 12,
    isNew: true,
  },
  {
    title: "Best study spots in the city",
    group: "Next Chapter Book Club",
    author: "Jordan K.",
    time: "5h ago",
    body: "Where are your go-to quiet spots to study or read? Drop your favorites below 👇",
    replies: 8,
  },
  {
    title: "Volunteer this weekend!",
    group: "Community Changemakers",
    author: "Aisha R.",
    time: "1d ago",
    body: "We're organizing a neighborhood clean-up this Saturday. Join us!",
    replies: 6,
  },
];

function GroupCard({ g, suggested = false }: { g: any; suggested?: boolean }) {
  return (
    <article className="group flex flex-col rounded-2xl border border-border/60 bg-surface p-5 transition hover:-translate-y-0.5 hover:border-brand-purple/40">
      <div className="flex items-center justify-between">
        <span className="grid h-11 w-11 place-items-center rounded-xl bg-gradient-brand font-display text-base font-bold text-white shadow-glow-purple">
          {g.name.charAt(0)}
        </span>
        {(g.cat || g.tag) && (
          <span className="rounded-full bg-surface-2 px-2 py-0.5 text-[10px] font-medium text-muted-foreground">
            {g.cat || g.tag}
          </span>
        )}
      </div>
      <h3 className="mt-3 font-display text-base font-semibold">{g.name}</h3>
      <p className="mt-1 line-clamp-2 text-sm text-muted-foreground">{g.desc}</p>
      <div className="mt-4 flex items-center justify-between">
        <div className="text-xs text-muted-foreground">
          <span className="font-semibold text-foreground">{g.members}</span> members
          <span className="ml-2 inline-flex items-center gap-1">
            <span className="h-1.5 w-1.5 rounded-full bg-brand-teal" /> {g.online} online
          </span>
        </div>
        <button className="rounded-lg bg-gradient-brand px-3 py-1.5 text-xs font-semibold text-white hover:opacity-95">
          Join
        </button>
      </div>
    </article>
  );
}

function GroupsPage() {
  return (
    <AppShell>
      {/* Hero strip */}
      <div className="mb-8 grid items-center gap-4 overflow-hidden rounded-3xl border border-border/60 bg-gradient-brand-soft p-6 md:grid-cols-[1.5fr_1fr] md:p-8">
        <div>
          <p className="text-xs font-medium uppercase tracking-wider text-brand-teal">
            Communities create change
          </p>
          <h1 className="mt-2 font-display text-3xl font-bold md:text-4xl">
            Join, contribute, make an impact.
          </h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Find groups that match your interests, goals, and neighborhood.
          </p>
        </div>
        <div className="flex justify-end">
          <button className="flex items-center gap-2 rounded-xl bg-gradient-brand px-4 py-3 text-sm font-semibold text-white shadow-glow-purple">
            <Plus className="h-4 w-4" /> Create a Group
          </button>
        </div>
      </div>

      <PageHeader title="Groups" subtitle="Connect, learn, and grow together." />

      {/* Search + filters */}
      <div className="mb-6 flex flex-col gap-3 lg:flex-row lg:items-center">
        <div className="flex flex-1 items-center gap-2 rounded-xl border border-border bg-surface px-4 py-2.5">
          <Search className="h-4 w-4 text-muted-foreground" />
          <input
            placeholder="Search groups or topics..."
            className="flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground"
          />
        </div>
        <div className="flex items-center gap-2 overflow-x-auto pb-1">
          {categories.map((c, i) => (
            <button
              key={c}
              className={`whitespace-nowrap rounded-full px-3.5 py-1.5 text-xs font-medium ${
                i === 0
                  ? "bg-gradient-brand text-white"
                  : "bg-surface text-muted-foreground ring-1 ring-border hover:text-foreground"
              }`}
            >
              {c}
            </button>
          ))}
        </div>
      </div>

      {/* Featured */}
      <section className="mb-12">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="flex items-center gap-2 font-display text-xl font-semibold">
            <Sparkles className="h-5 w-5 text-brand-teal" /> Featured Groups
          </h2>
          <button className="flex items-center gap-1 text-sm text-brand-teal hover:underline">
            View all <ArrowRight className="h-3.5 w-3.5" />
          </button>
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          {featured.map((g) => (
            <GroupCard key={g.name} g={g} />
          ))}
        </div>
      </section>

      <div className="grid gap-8 lg:grid-cols-[1.6fr_1fr]">
        {/* Suggested */}
        <section>
          <div className="mb-4 flex items-center justify-between">
            <h2 className="font-display text-xl font-semibold">Suggested for You</h2>
            <span className="text-xs text-muted-foreground">Based on your interests</span>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {suggested.map((g) => (
              <GroupCard key={g.name} g={g} suggested />
            ))}
          </div>
        </section>

        {/* Sidebar: Your groups + Upcoming */}
        <aside className="space-y-6">
          <section className="rounded-2xl border border-border/60 bg-surface p-5">
            <h2 className="mb-4 font-display text-lg font-semibold">Your Groups</h2>
            <div className="space-y-3">
              {yourGroups.map((g) => (
                <div
                  key={g.name}
                  className="flex items-center gap-3 rounded-xl bg-surface-2/60 p-3"
                >
                  <span className="grid h-10 w-10 place-items-center rounded-lg bg-gradient-brand text-sm font-bold text-white">
                    {g.name.charAt(0)}
                  </span>
                  <div className="flex-1">
                    <p className="text-sm font-semibold">{g.name}</p>
                    <p className="text-[11px] text-muted-foreground">{g.tagline}</p>
                  </div>
                  <span className="grid h-6 w-6 place-items-center rounded-full bg-brand-purple text-[11px] font-semibold text-white">
                    {g.unread}
                  </span>
                </div>
              ))}
            </div>
          </section>

          <section className="rounded-2xl border border-border/60 bg-surface p-5">
            <h2 className="mb-4 flex items-center gap-2 font-display text-lg font-semibold">
              <Calendar className="h-4 w-4 text-brand-teal" /> Upcoming Events
            </h2>
            <div className="flex gap-4 rounded-xl bg-gradient-brand-soft p-4">
              <div className="grid h-16 w-16 flex-shrink-0 place-items-center rounded-xl bg-background text-center">
                <div>
                  <p className="text-[10px] font-bold uppercase text-brand-teal">May</p>
                  <p className="font-display text-2xl font-bold leading-none">24</p>
                </div>
              </div>
              <div className="flex-1">
                <p className="font-semibold">Community Resource Fair</p>
                <p className="text-xs text-muted-foreground">Sat, May 24 · 10:00 AM</p>
                <p className="text-xs text-muted-foreground">Central Library Plaza</p>
                <p className="mt-2 text-xs">
                  <span className="font-semibold text-brand-teal">124</span> going
                </p>
              </div>
            </div>
          </section>
        </aside>
      </div>

      {/* Active Discussions */}
      <section className="mt-12">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="font-display text-xl font-semibold">Active Discussions</h2>
          <button className="flex items-center gap-1 text-sm text-brand-teal hover:underline">
            View all <ArrowRight className="h-3.5 w-3.5" />
          </button>
        </div>
        <div className="space-y-3">
          {discussions.map((d) => (
            <article
              key={d.title}
              className="flex items-start gap-4 rounded-2xl border border-border/60 bg-surface p-5 transition hover:border-brand-blue/40"
            >
              <span className="grid h-10 w-10 flex-shrink-0 place-items-center rounded-full bg-brand-blue/15 text-sm font-bold text-brand-blue">
                {d.author.charAt(0)}
              </span>
              <div className="flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <h3 className="font-display text-base font-semibold">{d.title}</h3>
                  {d.isNew && (
                    <span className="rounded-full bg-brand-teal/15 px-2 py-0.5 text-[10px] font-semibold text-brand-teal">
                      NEW
                    </span>
                  )}
                </div>
                <p className="text-xs text-muted-foreground">
                  {d.group} · {d.author} · {d.time}
                </p>
                <p className="mt-2 line-clamp-2 text-sm text-muted-foreground">{d.body}</p>
              </div>
              <span className="flex flex-shrink-0 items-center gap-1 text-xs text-muted-foreground">
                <MessageSquare className="h-3.5 w-3.5" /> {d.replies}
              </span>
            </article>
          ))}
        </div>
      </section>
    </AppShell>
  );
}
