import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/AppShell";
import { PublicFooter } from "@/components/PublicStars";
import { useAuth } from "@/hooks/useAuth";
import { useEffect, useState } from "react";

export const Route = createFileRoute("/main")({
  head: () => ({
    meta: [
      { title: "Home — MyCommNet" },
      {
        name: "description",
        content: "Your MyCommNet dashboard: opportunities, groups, and resources near you.",
      },
    ],
  }),
  component: MainPage,
});

const glassCard: React.CSSProperties = {
  background: "rgba(255,255,255,0.03)",
  backdropFilter: "blur(10px)",
  border: "1px solid rgba(255,255,255,0.08)",
};

const opportunityCards = [
  {
    tag: "Job",
    tagColor: "#818cf8",
    tagBg: "rgba(99,102,241,0.2)",
    title: "Community Outreach Coordinator",
    org: "Bright Futures Org",
    detail: "2.4 mi away",
    type: "Full-time",
  },
  {
    tag: "Mentoring",
    tagColor: "#60a5fa",
    tagBg: "rgba(59,130,246,0.2)",
    title: "Career Mentorship in Tech",
    org: "Tech Forward",
    detail: "Online",
    type: "Mentor Match",
  },
  {
    tag: "Training",
    tagColor: "#2dd4bf",
    tagBg: "rgba(20,184,166,0.2)",
    title: "Digital Skills Bootcamp",
    org: "Code for Tomorrow",
    detail: "1.1 mi away",
    type: "Free",
  },
  {
    tag: "Event",
    tagColor: "#c084fc",
    tagBg: "rgba(168,85,247,0.2)",
    title: "Community Resource Fair",
    org: "Unity Collective",
    detail: "0.8 mi away",
    type: "May 24",
  },
];

const resourceCards = [
  {
    icon: "📶",
    color: "#60a5fa",
    bg: "rgba(59,130,246,0.1)",
    title: "Free Wi-Fi",
    sub: "3 locations near you",
  },
  {
    icon: "💻",
    color: "#22d3ee",
    bg: "rgba(34,211,238,0.1)",
    title: "Working Computers",
    sub: "5 locations near you",
  },
  {
    icon: "📚",
    color: "#a78bfa",
    bg: "rgba(139,92,246,0.1)",
    title: "Libraries",
    sub: "2 locations near you",
  },
  {
    icon: "🏫",
    color: "#34d399",
    bg: "rgba(52,211,153,0.1)",
    title: "Schools & Education",
    sub: "4 locations near you",
  },
  {
    icon: "🚌",
    color: "#fbbf24",
    bg: "rgba(251,191,36,0.1)",
    title: "Transportation Help",
    sub: "4 locations near you",
  },
];

function MainPage() {
  const { user, profile } = useAuth();
  const [greeting, setGreeting] = useState("Hello");

  useEffect(() => {
    const h = new Date().getHours();
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setGreeting(h < 12 ? "Good morning" : h < 17 ? "Good afternoon" : "Good evening");
  }, []);

  const displayName =
    profile?.full_name?.split(" ")[0] ??
    user?.user_metadata?.full_name?.split(" ")[0] ??
    user?.email?.split("@")[0] ??
    "there";

  return (
    <AppShell footer={<PublicFooter />}>
      <div style={{ color: "#ffffff" }}>
        {/* ── Notification bar ── */}
        <div
          className="flex flex-col md:flex-row items-center justify-between p-4 mb-6 rounded-2xl space-y-4 md:space-y-0"
          style={{ background: "#131b2e", border: "1px solid rgba(255,255,255,0.05)" }}
        >
          <div className="flex items-center space-x-3">
            <div
              className="w-8 h-8 rounded-full flex items-center justify-center"
              style={{ background: "rgba(139,92,246,0.2)" }}
            >
              <span className="text-sm">⭐</span>
            </div>
            <div>
              <p className="font-medium text-white">New opportunities are landing daily</p>
              <p className="text-xs" style={{ color: "#9ca3af" }}>
                Turn on notifications so you never miss out.
              </p>
            </div>
          </div>
          <button
            className="px-6 py-2 rounded-full text-sm font-semibold transition hover:opacity-90"
            style={{ background: "linear-gradient(90deg,#8b5cf6,#3b82f6)", color: "#fff" }}
          >
            Turn On Notifications
          </button>
        </div>

        {/* ── Hero banner ── */}
        <div
          className="p-8 md:p-16 rounded-[2rem] mb-12 relative overflow-hidden"
          style={{
            background: "linear-gradient(135deg,#1e1b4b 0%,#0b1326 100%)",
            border: "1px solid rgba(255,255,255,0.1)",
          }}
        >
          <div
            className="absolute pointer-events-none"
            style={{
              width: 400,
              height: 400,
              background: "radial-gradient(circle,rgba(139,92,246,0.15) 0%,rgba(139,92,246,0) 70%)",
              top: -100,
              left: -100,
            }}
          />
          <div className="relative z-10 space-y-6">
            <p className="text-lg" style={{ color: "#9ca3af" }} suppressHydrationWarning>
              {greeting}, {displayName} 👋
            </p>
            <h1
              className="font-extrabold leading-tight"
              style={{ fontSize: "clamp(36px,7vw,64px)" }}
            >
              Your community.
              <br />
              <span
                style={{
                  background: "linear-gradient(90deg,#8b5cf6,#3b82f6)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                Your future.
              </span>
            </h1>
            <p className="max-w-xl text-lg" style={{ color: "#9ca3af" }}>
              Discover resources, opportunities, and people ready to help you grow and thrive.
            </p>

            {/* Search */}
            <div className="flex flex-col md:flex-row items-center gap-4 mt-12">
              <div className="relative flex-grow w-full">
                <span className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-500">🔍</span>
                <input
                  className="w-full py-4 pl-14 pr-6 rounded-full text-white focus:outline-none focus:ring-2"
                  style={
                    {
                      background: "rgba(0,0,0,0.4)",
                      border: "1px solid rgba(255,255,255,0.1)",
                      "--tw-ring-color": "#8b5cf6",
                    } as any
                  }
                  placeholder="Search opportunities, resources, groups..."
                />
              </div>
              <button
                className="w-full md:w-auto flex items-center justify-center space-x-2 px-8 py-4 rounded-full font-medium transition hover:brightness-110"
                style={{
                  background: "rgba(49,57,77,0.5)",
                  border: "1px solid rgba(255,255,255,0.1)",
                }}
              >
                <span>⚙️</span>
                <span>Filters</span>
              </button>
            </div>

            {/* Quick filters */}
            <div className="flex flex-wrap gap-2 mt-4">
              {["Wi-Fi near me", "Free meals", "Weekend events", "Resume help", "Tutoring"].map(
                (tag) => (
                  <span
                    key={tag}
                    className="px-4 py-1.5 rounded-full text-xs cursor-pointer transition"
                    style={{
                      background: "rgba(49,57,77,0.3)",
                      border: "1px solid rgba(255,255,255,0.05)",
                      color: "#d1d5db",
                    }}
                    onMouseOver={(e) => {
                      e.currentTarget.style.borderColor = "rgba(139,92,246,0.5)";
                    }}
                    onMouseOut={(e) => {
                      e.currentTarget.style.borderColor = "rgba(255,255,255,0.05)";
                    }}
                  >
                    {tag}
                  </span>
                ),
              )}
            </div>
          </div>
        </div>

        {/* ── Opportunities for You ── */}
        <section className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold">Opportunities for You</h2>
            <a
              className="text-sm font-medium flex items-center space-x-1 hover:underline"
              style={{ color: "#2dd4bf" }}
              href="#"
            >
              <span>View all</span>
              <span>→</span>
            </a>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {opportunityCards.map((c) => (
              <div
                key={c.title}
                className="p-5 rounded-2xl space-y-4 transition-all cursor-pointer"
                style={glassCard}
                onMouseOver={(e) => {
                  e.currentTarget.style.borderColor = "rgba(139,92,246,0.3)";
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)";
                }}
              >
                <div className="flex justify-between items-start">
                  <span
                    className="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider"
                    style={{ color: c.tagColor, background: c.tagBg }}
                  >
                    {c.tag}
                  </span>
                </div>
                <div>
                  <h3
                    className="font-bold text-lg leading-tight transition"
                    onMouseOver={(e) => {
                      e.currentTarget.style.color = "#8b5cf6";
                    }}
                    onMouseOut={(e) => {
                      e.currentTarget.style.color = "";
                    }}
                  >
                    {c.title}
                  </h3>
                  <p className="text-sm mt-1" style={{ color: "#6b7280" }}>
                    {c.org}
                  </p>
                </div>
                <div
                  className="flex items-center justify-between text-xs pt-2"
                  style={{ borderTop: "1px solid rgba(255,255,255,0.05)", color: "#9ca3af" }}
                >
                  <div className="flex items-center space-x-1">
                    <span style={{ color: "#f87171" }}>📍</span>
                    <span>{c.detail}</span>
                  </div>
                  <span
                    className="px-2 py-1 rounded"
                    style={{ background: "rgba(255,255,255,0.05)" }}
                  >
                    {c.type}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── Resources Near You ── */}
        <section className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold">Resources Near You</h2>
            <a
              className="text-sm font-medium flex items-center space-x-1 hover:underline"
              style={{ color: "#2dd4bf" }}
              href="#"
            >
              <span>View on map</span>
              <span>→</span>
            </a>
          </div>
          <div
            className="flex space-x-4 overflow-x-auto pb-2"
            style={{ msOverflowStyle: "none", scrollbarWidth: "none" }}
          >
            {resourceCards.map((r) => (
              <div
                key={r.title}
                className="flex-shrink-0 w-48 p-5 rounded-2xl space-y-6"
                style={glassCard}
              >
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center"
                  style={{ background: r.bg, color: r.color }}
                >
                  <span className="text-xl">{r.icon}</span>
                </div>
                <div>
                  <h4 className="font-bold">{r.title}</h4>
                  <p
                    className="text-[10px] uppercase tracking-tighter mt-0.5"
                    style={{ color: "#6b7280" }}
                  >
                    {r.sub}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── Community Highlights ── */}
        <section className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold">Community Highlights</h2>
            <a
              className="text-sm font-medium flex items-center space-x-1 hover:underline"
              style={{ color: "#2dd4bf" }}
              href="#"
            >
              <span>View all</span>
              <span>→</span>
            </a>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            {/* Join Group */}
            <div className="p-5 rounded-2xl flex flex-col justify-between" style={glassCard}>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center font-bold">
                    G
                  </div>
                  <div>
                    <h4 className="font-bold">Greenfield Neighbors</h4>
                    <p className="text-[10px] uppercase" style={{ color: "#6b7280" }}>
                      1.2K members
                    </p>
                  </div>
                </div>
                <button
                  className="px-4 py-1.5 text-xs font-bold rounded-full transition hover:opacity-90"
                  style={{
                    background: "rgba(139,92,246,0.2)",
                    color: "#8b5cf6",
                    border: "1px solid rgba(139,92,246,0.3)",
                  }}
                >
                  Join
                </button>
              </div>
              <p className="text-sm" style={{ color: "#9ca3af" }}>
                Local updates, events, and ways to get involved in the Greenfield area.
              </p>
            </div>

            {/* Activity Feed */}
            <div className="p-5 rounded-2xl" style={glassCard}>
              <div className="flex items-start space-x-3 mb-3">
                <div className="w-10 h-10 rounded-full bg-indigo-600 flex items-center justify-center font-bold">
                  M
                </div>
                <div>
                  <h4 className="font-bold text-sm">Maya J.</h4>
                  <p className="text-[10px]" style={{ color: "#6b7280" }}>
                    3h ago
                  </p>
                </div>
              </div>
              <p className="text-sm leading-relaxed mb-4" style={{ color: "#d1d5db" }}>
                Great turnout for the job workshop today! Thank you to everyone who joined. Looking
                forward to the next one!
              </p>
              <div className="flex items-center space-x-4 text-xs" style={{ color: "#6b7280" }}>
                <span className="flex items-center space-x-1 cursor-pointer hover:text-white">
                  ❤️ <span className="ml-1">24</span>
                </span>
                <span className="flex items-center space-x-1 cursor-pointer hover:text-white">
                  💬 <span className="ml-1">6</span>
                </span>
              </div>
            </div>

            {/* Another Group */}
            <div className="p-5 rounded-2xl flex flex-col justify-between" style={glassCard}>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-full bg-purple-600 flex items-center justify-center font-bold">
                    Y
                  </div>
                  <div>
                    <h4 className="font-bold">Youth Future</h4>
                    <p className="text-[10px] uppercase" style={{ color: "#6b7280" }}>
                      876 members
                    </p>
                  </div>
                </div>
                <button
                  className="px-4 py-1.5 text-xs font-bold rounded-full transition hover:opacity-90"
                  style={{
                    background: "rgba(139,92,246,0.2)",
                    color: "#8b5cf6",
                    border: "1px solid rgba(139,92,246,0.3)",
                  }}
                >
                  Join
                </button>
              </div>
              <p className="text-sm" style={{ color: "#9ca3af" }}>
                Empowering youth through resources and mentorship programs.
              </p>
            </div>
          </div>
        </section>

        {/* ── Subscribe banner (before footer) ── */}
        <div
          className="p-8 md:p-12 rounded-[2rem] flex flex-col md:flex-row items-center justify-between relative overflow-hidden mb-4"
          style={{
            background: "linear-gradient(90deg,#1e1b4b 0%,#0b1326 100%)",
            border: "1px solid rgba(139,92,246,0.2)",
          }}
        >
          <div className="relative z-10 space-y-2 mb-8 md:mb-0 text-center md:text-left">
            <h3 className="text-3xl font-bold">Stay in the loop</h3>
            <p className="max-w-sm" style={{ color: "#9ca3af" }}>
              Get personalized updates on new opportunities and community news.
            </p>
          </div>
          <div className="relative z-10 w-full md:w-auto flex flex-col sm:flex-row items-center gap-3">
            <input
              className="w-full md:w-80 py-3 px-6 rounded-full text-white focus:outline-none focus:ring-2"
              style={
                {
                  background: "#060e20",
                  border: "1px solid rgba(255,255,255,0.1)",
                  "--tw-ring-color": "#8b5cf6",
                } as any
              }
              placeholder="Enter your email"
              type="email"
            />
            <button
              className="w-full sm:w-auto px-10 py-3 rounded-full font-bold transition hover:shadow-lg"
              style={{ background: "linear-gradient(90deg,#8b5cf6,#3b82f6)", color: "#fff" }}
            >
              Subscribe
            </button>
          </div>
          <div
            className="absolute pointer-events-none"
            style={{
              right: -80,
              bottom: -80,
              width: 320,
              height: 320,
              background: "rgba(139,92,246,0.2)",
              filter: "blur(100px)",
              borderRadius: "50%",
            }}
          />
        </div>
      </div>
    </AppShell>
  );
}
