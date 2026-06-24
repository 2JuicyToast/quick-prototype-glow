import { Link, useRouterState } from "@tanstack/react-router";
import { Home, Map, Users, MessageSquare, User, Search, Bell, Sparkles, Settings, Bookmark } from "lucide-react";
import type { ReactNode } from "react";
import logoAsset from "@/assets/MyCommNet.png.asset.json";

const navItems: { to: string; label: string; icon: typeof Home; badge?: number }[] = [
  { to: "/", label: "Home", icon: Home },
  { to: "/map", label: "Map", icon: Map },
  { to: "/groups", label: "Groups", icon: Users },
  { to: "/messages", label: "Messages", icon: MessageSquare, badge: 3 },
  { to: "/profile", label: "Profile", icon: User },
];

export function AppShell({ children }: { children: ReactNode }) {
  const { location } = useRouterState();
  const path = location.pathname;

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Top bar */}
      <header className="sticky top-0 z-40 border-b border-border/60 bg-background/80 backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-7xl items-center gap-4 px-4 md:px-8">
          <Link to="/" className="flex items-center gap-2">
            <img src={logoAsset.url} alt="MyCommNet Logo" className="h-9 w-9 object-contain" />
            <span className="font-display text-lg font-bold tracking-tight">MyCommNet</span>
          </Link>

          <div className="ml-2 hidden items-center gap-1 rounded-full bg-surface/70 px-3 py-1.5 text-xs text-muted-foreground md:flex">
            <span className="h-2 w-2 rounded-full bg-brand-teal" />
            Atlanta, GA
          </div>

          <nav className="ml-6 hidden items-center gap-1 lg:flex">
            {navItems.map((it) => {
              const Icon = it.icon;
              const active = it.to === "/" ? path === "/" : path.startsWith(it.to);
              return (
                <Link
                  key={it.to}
                  to={it.to}
                  className={`relative flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium transition ${
                    active
                      ? "bg-surface text-foreground shadow-card-soft"
                      : "text-muted-foreground hover:bg-surface/60 hover:text-foreground"
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  {it.label}
                  {it.badge && (
                    <span className="ml-1 grid h-5 min-w-5 place-items-center rounded-full bg-brand-purple px-1.5 text-[10px] font-semibold text-white">
                      {it.badge}
                    </span>
                  )}
                </Link>
              );
            })}
          </nav>

          <div className="ml-auto flex items-center gap-2">
            <button className="hidden h-10 w-10 place-items-center rounded-lg text-muted-foreground hover:bg-surface hover:text-foreground sm:grid">
              <Search className="h-5 w-5" />
            </button>
            <button className="relative grid h-10 w-10 place-items-center rounded-lg text-muted-foreground hover:bg-surface hover:text-foreground">
              <Bell className="h-5 w-5" />
              <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-brand-teal" />
            </button>
            <div className="flex items-center gap-2 rounded-full bg-surface p-1 pr-3">
              <span className="grid h-8 w-8 place-items-center rounded-full bg-gradient-brand text-sm font-semibold text-white">J</span>
              <span className="hidden text-sm font-medium sm:inline">Jayden</span>
            </div>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-4 pb-28 pt-6 md:px-8 md:pb-12 md:pt-10">{children}</main>

      {/* Mobile bottom nav */}
      <nav className="fixed inset-x-0 bottom-0 z-50 border-t border-border/70 bg-background/95 backdrop-blur-xl lg:hidden">
        <div className="mx-auto flex max-w-lg items-center justify-around px-2 py-2">
          {navItems.map((it) => {
            const Icon = it.icon;
            const active = it.to === "/" ? path === "/" : path.startsWith(it.to);
            return (
              <Link
                key={it.to}
                to={it.to}
                className={`relative flex flex-1 flex-col items-center gap-1 rounded-xl px-2 py-2 text-[11px] font-medium transition ${
                  active ? "text-foreground" : "text-muted-foreground"
                }`}
              >
                <span className={`relative grid h-8 w-12 place-items-center rounded-lg ${active ? "bg-gradient-brand-soft" : ""}`}>
                  <Icon className={`h-5 w-5 ${active ? "text-brand-teal" : ""}`} />
                  {it.badge && (
                    <span className="absolute -right-0.5 -top-0.5 grid h-4 min-w-4 place-items-center rounded-full bg-brand-purple px-1 text-[9px] font-semibold text-white">
                      {it.badge}
                    </span>
                  )}
                </span>
                {it.label}
              </Link>
            );
          })}
        </div>
      </nav>
    </div>
  );
}

export function PageHeader({
  eyebrow,
  title,
  subtitle,
  actions,
}: {
  eyebrow?: string;
  title: ReactNode;
  subtitle?: ReactNode;
  actions?: ReactNode;
}) {
  return (
    <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
      <div>
        {eyebrow && (
          <div className="mb-2 inline-flex items-center gap-2 rounded-full bg-surface px-3 py-1 text-xs font-medium text-muted-foreground">
            <span className="h-1.5 w-1.5 rounded-full bg-brand-teal" />
            {eyebrow}
          </div>
        )}
        <h1 className="font-display text-3xl font-bold tracking-tight md:text-4xl">{title}</h1>
        {subtitle && <p className="mt-2 max-w-2xl text-sm text-muted-foreground md:text-base">{subtitle}</p>}
      </div>
      {actions && <div className="flex items-center gap-2">{actions}</div>}
    </div>
  );
}

export function SectionHeader({ title, action }: { title: string; action?: ReactNode }) {
  return (
    <div className="mb-4 flex items-end justify-between">
      <h2 className="font-display text-xl font-semibold tracking-tight md:text-2xl">{title}</h2>
      {action}
    </div>
  );
}

export function QuickLinks() {
  return (
    <div className="hidden flex-col gap-1 rounded-2xl bg-surface/60 p-3 text-sm xl:flex">
      <SidebarLink icon={Bookmark} label="Saved" />
      <SidebarLink icon={Sparkles} label="My Activity" />
      <SidebarLink icon={Settings} label="Settings" />
    </div>
  );
}

function SidebarLink({ icon: Icon, label }: { icon: typeof Bookmark; label: string }) {
  return (
    <button className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground hover:bg-surface-2 hover:text-foreground">
      <Icon className="h-4 w-4" />
      {label}
    </button>
  );
}
