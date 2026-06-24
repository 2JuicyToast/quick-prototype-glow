import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/AppShell";
import { MapPin, Link as LinkIcon, Bookmark, Award, Calendar, Briefcase, GraduationCap, Heart, Github, Linkedin, Globe, QrCode, Shield, Settings, Edit3 } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";

export const Route = createFileRoute("/profile")({
  head: () => ({
    meta: [
      { title: "Profile — MyCommNet" },
      { name: "description", content: "Your community pass, mini portfolio, saved items, and growth timeline." },
      { property: "og:title", content: "Profile — MyCommNet" },
      { property: "og:description", content: "Your community pass, mini portfolio, saved items, and growth timeline." },
    ],
  }),
  component: ProfilePage,
});

const skills = ["Community Outreach", "Public Speaking", "Tutoring", "Event Planning", "JavaScript", "Design"];

const goals = [
  { label: "Earn 50 verified volunteer hours", progress: 72 },
  { label: "Complete digital skills bootcamp", progress: 45 },
  { label: "Find first part-time role", progress: 30 },
];

const timeline = [
  { icon: Briefcase, title: "Volunteer Coordinator", org: "Bright Futures Org", date: "Mar 2026 — Present", body: "Coordinating outreach for weekly resource fairs across Atlanta." },
  { icon: GraduationCap, title: "Digital Skills Bootcamp", org: "Code for Tomorrow", date: "Jan 2026 — Apr 2026", body: "Hands-on intro to HTML/CSS, JavaScript, and Git workflows." },
  { icon: Calendar, title: "Community Resource Fair", org: "Unity Collective", date: "Nov 2025", body: "Helped onboard 60+ residents to local services. Verified 8 hours." },
];

const saved = [
  { label: "TechConnect Hub", type: "Resource" },
  { label: "Community Resource Fair", type: "Event" },
  { label: "MentorConnect", type: "Group" },
  { label: "Outreach Coordinator", type: "Job" },
];

function ProfilePage() {
  const { user, profile } = useAuth();

  const fullName =
    profile?.full_name ??
    user?.user_metadata?.full_name ??
    user?.email?.split("@")[0] ??
    "Community Member";

  const initial = fullName.charAt(0).toUpperCase();

  const verifiedHours = profile?.verified_hours ?? 36;
  const eventsAttended = profile?.events_attended ?? 12;
  const location = profile?.location ?? "Atlanta, GA";
  const joinYear = user?.created_at ? new Date(user.created_at).getFullYear() : 2025;
  const bio = profile?.bio ??
    "Atlanta-based community member passionate about closing local access gaps to Wi-Fi, mentorship, and first jobs. Always looking for new volunteer opportunities, study spaces, and friendly mentors who've walked the road before.";

  return (
    <AppShell>
      {/* Cover + identity */}
      <section className="relative mb-6 overflow-hidden rounded-3xl border border-border/60">
        <div className="h-44 bg-gradient-brand bg-hero-glow md:h-56" />
        <div className="absolute inset-0 bg-[radial-gradient(120%_80%_at_100%_0%,oklch(0.72_0.13_185/0.35),transparent_60%)]" />

        <div className="-mt-16 px-6 pb-6 md:-mt-20 md:px-10 md:pb-8">
          <div className="flex flex-col items-start gap-5 md:flex-row md:items-end md:justify-between">
            <div className="flex items-end gap-4">
              <span className="grid h-28 w-28 place-items-center rounded-3xl border-4 border-background bg-gradient-brand font-display text-4xl font-bold text-white shadow-glow-purple md:h-32 md:w-32">
                {initial}
              </span>
              <div className="pb-2">
                <div className="flex items-center gap-2">
                  <h1 className="font-display text-3xl font-bold tracking-tight md:text-4xl">{fullName}</h1>
                  <span className="inline-flex items-center gap-1 rounded-full bg-brand-teal/15 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-brand-teal">
                    <Shield className="h-3 w-3" /> Verified
                  </span>
                </div>
                <p className="mt-1 text-sm text-muted-foreground">Community Member</p>
                <p className="mt-1 flex items-center gap-1 text-xs text-muted-foreground">
                  <MapPin className="h-3 w-3" /> {location} · joined {joinYear}
                </p>
              </div>
            </div>
            <div className="flex flex-wrap gap-2">
              <button className="flex items-center gap-2 rounded-xl border border-border bg-surface px-4 py-2 text-sm font-medium hover:bg-surface-2">
                <Edit3 className="h-4 w-4" /> Edit Profile
              </button>
              <button className="flex items-center gap-2 rounded-xl border border-border bg-surface px-4 py-2 text-sm font-medium hover:bg-surface-2">
                <Settings className="h-4 w-4" /> Settings
              </button>
            </div>
          </div>
        </div>
      </section>

      <div className="grid gap-6 lg:grid-cols-[1fr_1.6fr]">
        {/* Left: Community Pass + Links + Saved */}
        <div className="space-y-6">
          {/* Community Pass */}
          <section className="relative overflow-hidden rounded-3xl border border-border/60 bg-gradient-brand p-6 text-white shadow-glow-purple">
            <div className="absolute -right-12 -top-12 h-40 w-40 rounded-full bg-white/10 blur-2xl" />
            <div className="relative">
              <div className="flex items-center justify-between">
                <p className="text-xs font-medium uppercase tracking-wider text-white/80">Community Pass</p>
                <span className="rounded-full bg-white/15 px-2 py-0.5 text-[10px] font-semibold">MyCom Card</span>
              </div>
              <h2 className="mt-4 font-display text-2xl font-bold">{fullName}</h2>
              <p className="text-sm text-white/80">Community Member</p>

              <div className="mt-5 flex items-end justify-between gap-4">
                <div className="grid grid-cols-2 gap-3 text-xs">
                  <div>
                    <p className="text-white/60">Verified hours</p>
                    <p className="font-display text-xl font-bold">{verifiedHours}</p>
                  </div>
                  <div>
                    <p className="text-white/60">Events attended</p>
                    <p className="font-display text-xl font-bold">{eventsAttended}</p>
                  </div>
                </div>
                <div className="grid h-20 w-20 place-items-center rounded-2xl bg-white text-brand-purple">
                  <QrCode className="h-14 w-14" />
                </div>
              </div>
            </div>
          </section>

          {/* Links */}
          <section className="rounded-2xl border border-border/60 bg-surface p-5">
            <h3 className="mb-3 font-display text-base font-semibold">Links</h3>
            <ul className="space-y-2 text-sm">
              {[
                { icon: Linkedin, label: "LinkedIn" },
                { icon: Github, label: "GitHub" },
                { icon: Globe, label: "Personal site" },
                { icon: LinkIcon, label: "Portfolio (PDF)" },
              ].map((l) => {
                const Icon = l.icon;
                return (
                  <li key={l.label} className="flex items-center gap-3 rounded-lg px-2 py-1.5 text-muted-foreground hover:bg-surface-2 hover:text-foreground">
                    <Icon className="h-4 w-4" />
                    {l.label}
                  </li>
                );
              })}
            </ul>
          </section>

          {/* Skills */}
          <section className="rounded-2xl border border-border/60 bg-surface p-5">
            <h3 className="mb-3 font-display text-base font-semibold">Skills & Interests</h3>
            <div className="flex flex-wrap gap-2">
              {skills.map((s) => (
                <span key={s} className="rounded-full bg-gradient-brand-soft px-3 py-1 text-xs font-medium text-foreground ring-1 ring-brand-purple/30">
                  {s}
                </span>
              ))}
            </div>
          </section>

          {/* Saved */}
          <section className="rounded-2xl border border-border/60 bg-surface p-5">
            <h3 className="mb-3 flex items-center gap-2 font-display text-base font-semibold">
              <Bookmark className="h-4 w-4 text-brand-teal" /> Saved
            </h3>
            <ul className="space-y-2">
              {saved.map((s) => (
                <li key={s.label} className="flex items-center justify-between rounded-lg bg-surface-2/60 px-3 py-2 text-sm">
                  <span>{s.label}</span>
                  <span className="text-[10px] uppercase tracking-wider text-muted-foreground">{s.type}</span>
                </li>
              ))}
            </ul>
          </section>
        </div>

        {/* Right: About + Goals + Timeline */}
        <div className="space-y-6">
          <section className="rounded-2xl border border-border/60 bg-surface p-6">
            <h3 className="mb-2 font-display text-lg font-semibold">About</h3>
            <p className="text-sm leading-relaxed text-muted-foreground">{bio}</p>
          </section>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-3">
            {[
              { label: "Verified hours", value: String(verifiedHours), icon: Award },
              { label: "Groups", value: "8", icon: Heart },
              { label: "Connections", value: "142", icon: LinkIcon },
            ].map((s) => {
              const Icon = s.icon;
              return (
                <div key={s.label} className="rounded-2xl border border-border/60 bg-surface p-4 text-center">
                  <Icon className="mx-auto mb-2 h-5 w-5 text-brand-teal" />
                  <p className="font-display text-2xl font-bold">{s.value}</p>
                  <p className="text-[11px] text-muted-foreground">{s.label}</p>
                </div>
              );
            })}
          </div>

          {/* Goals */}
          <section className="rounded-2xl border border-border/60 bg-surface p-6">
            <h3 className="mb-4 font-display text-lg font-semibold">Goals in Progress</h3>
            <div className="space-y-4">
              {goals.map((g) => (
                <div key={g.label}>
                  <div className="mb-1.5 flex justify-between text-sm">
                    <span>{g.label}</span>
                    <span className="font-semibold text-brand-teal">{g.progress}%</span>
                  </div>
                  <div className="h-2 overflow-hidden rounded-full bg-surface-2">
                    <div className="h-full rounded-full bg-gradient-brand" style={{ width: `${g.progress}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Timeline */}
          <section className="rounded-2xl border border-border/60 bg-surface p-6">
            <div className="mb-5 flex items-center justify-between">
              <h3 className="font-display text-lg font-semibold">My Timeline</h3>
              <button className="text-xs text-brand-teal hover:underline">Export for resume →</button>
            </div>
            <div className="relative space-y-6 border-l border-border/60 pl-6">
              {timeline.map((t, i) => {
                const Icon = t.icon;
                return (
                  <div key={i} className="relative">
                    <span className="absolute -left-[34px] grid h-7 w-7 place-items-center rounded-full bg-gradient-brand shadow-glow-purple">
                      <Icon className="h-3.5 w-3.5 text-white" />
                    </span>
                    <p className="font-display text-base font-semibold">{t.title}</p>
                    <p className="text-xs text-muted-foreground">{t.org} · {t.date}</p>
                    <p className="mt-1 text-sm text-muted-foreground">{t.body}</p>
                  </div>
                );
              })}
            </div>
          </section>
        </div>
      </div>
    </AppShell>
  );
}
