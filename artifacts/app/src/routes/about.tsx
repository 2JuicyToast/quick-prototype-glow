import { createFileRoute, Link } from "@tanstack/react-router";
import {
  Users2,
  Sparkles,
  Globe,
  GraduationCap,
  Wallet,
  ShieldCheck,
  Compass,
  PlusCircle,
  ArrowRight,
} from "lucide-react";
import { PublicNav } from "@/components/PublicNav";
import { PublicStars, PublicFooter } from "@/components/PublicStars";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About MyCommNet | Your Digital Community Center" },
      {
        name: "description",
        content:
          "MyCommNet exists for community, services, and connection — helping people find what is around them and build real connections.",
      },
    ],
  }),
  component: AboutPage,
});

const hanken = { fontFamily: "'Hanken Grotesk', sans-serif" };
const mono = { fontFamily: "'JetBrains Mono', monospace" };

const glassCard: React.CSSProperties = {
  background: "rgba(15, 23, 42, 0.7)",
  backdropFilter: "blur(12px)",
  border: "1px solid rgba(30, 41, 59, 0.5)",
  transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
};

const COMMUNITY_IMG =
  "https://lh3.googleusercontent.com/aida-public/AB6AXuAX4pKmlZrL2jm7pRWIqtT707ASzearub_-GLEt0SM_owS7hhOvLF0o9s5tuhHi8110XlcqWdrMTgQwk5Zmgaw5HWTKsmTZSrrtjtCo84i9IFbF-90PeQv2WYjY8JykUnASSB7T_99hd5QHS9h57dLZAlGelwtp8_DDcgx8DDgMsGYfA7YY02X2DDuAYJwZhpXbKmEQYQ6qfFb96yQEBxeiKdo_echcgAQ2rU_AMxZjGtZQV9pSqZxuUIBlDYF353Ql2DOSfCsRJw";
const SURVEY_IMG =
  "https://lh3.googleusercontent.com/aida-public/AB6AXuBGiHLVfmadCgm_KXSEjejB8yUh2w-dV79SBGitmniqEcAzlBjz_wQK1VJhVm2EAzrQQmtvMaoNdriuA7GXtQTygZeCha9lBHB7VQDtUPfsYJzUUs4a0oT0fHLk_sI4bVp5HPGVrgHH5pMVo_KwrQvzP937N6Z1oGOmjWkhtmeJBJ-oXWrK8xEmyC87qvZx5OwfJDEs8GulGvhRqpSWAD_eyL2cg6fibiqA7-oHQPWw5YROvExxxrHaHqQnIf6KZ8jgOw-UdAh95w";

const whyCards = [
  {
    icon: Users2,
    color: "#d0bcff",
    bg: "rgba(160,120,255,0.15)",
    title: "For community",
    desc: "Helps people go outside and find what exists around them. It's easy to do very little in your own area simply because you do not know what is there.",
  },
  {
    icon: Sparkles,
    color: "#4fdbc8",
    bg: "rgba(79,219,200,0.15)",
    title: "For services",
    desc: "Helps create more activity and visibility for unmet needs like entertainment and enrichment, bringing the hidden gems of your neighborhood to light.",
  },
  {
    icon: Globe,
    color: "#adc6ff",
    bg: "rgba(173,198,255,0.15)",
    title: "For connection",
    desc: "Helps people find mentors, lessons, groups, and spaces. We bridge the gap between seeking an opportunity and actually holding it.",
  },
];

const audienceItems = [
  { icon: GraduationCap, label: "Students" },
  { icon: Wallet, label: "Low-income users" },
  { icon: ShieldCheck, label: "Certificate seekers" },
  { icon: Compass, label: "Opportunity seekers" },
  { icon: PlusCircle, label: "And more..." },
];

function AboutPage() {
  return (
    <div
      style={{
        backgroundColor: "#0b1326",
        color: "#dae2fd",
        fontFamily: "'Inter', sans-serif",
        overflowX: "hidden",
      }}
    >
      <PublicStars />
      <PublicNav activePage="about" />

      <main className="pt-[72px]" style={{ position: "relative", zIndex: 10 }}>
        {/* ── Hero ── */}
        <section className="text-center py-24 px-6 max-w-5xl mx-auto">
          <h1
            className="font-black mb-6"
            style={{
              ...hanken,
              fontSize: "clamp(48px,8vw,72px)",
              lineHeight: 1.1,
              letterSpacing: "-0.02em",
            }}
          >
            <span className="block" style={{ color: "#dae2fd" }}>
              About
            </span>
            <span
              style={{
                background: "linear-gradient(135deg,#d0bcff 0%,#4fdbc8 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              MyCommNet
            </span>
          </h1>
          <p
            className="text-lg leading-relaxed max-w-3xl mx-auto mb-8"
            style={{ color: "#cbc3d7" }}
          >
            MyCommNet exists for three reasons: community, services, and connection. It was created
            from the idea that people should be able to find what is around them, benefit from what
            their area offers, and build real connections that help them do more with where they
            are.
          </p>
          <div
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full"
            style={{ background: "rgba(34,42,61,0.6)", border: "1px solid rgba(73,68,84,1)" }}
          >
            <span
              className="w-2 h-2 rounded-full animate-pulse"
              style={{ background: "#4fdbc8" }}
            />
            <span
              className="text-xs uppercase tracking-widest"
              style={{ color: "#cbc3d7", ...mono }}
            >
              Defining Local Connection
            </span>
          </div>
        </section>

        {/* ── Why It Exists ── */}
        <section className="py-16 px-6 max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-3" style={{ color: "#dae2fd", ...hanken }}>
              Why it exists
            </h2>
            <div className="w-16 h-1 rounded-full mx-auto" style={{ background: "#d0bcff" }} />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {whyCards.map((c) => {
              const Icon = c.icon;
              return (
                <div key={c.title} className="mcn-glass p-8 rounded-xl" style={glassCard}>
                  <div
                    className="w-12 h-12 rounded-lg flex items-center justify-center mb-5"
                    style={{ background: c.bg }}
                  >
                    <Icon className="h-6 w-6" style={{ color: c.color }} />
                  </div>
                  <h3
                    className="text-2xl font-semibold mb-4"
                    style={{ color: "#dae2fd", ...hanken }}
                  >
                    {c.title}
                  </h3>
                  <p className="leading-relaxed" style={{ color: "#cbc3d7" }}>
                    {c.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </section>

        {/* ── Who It Is For + Community Center Image ── */}
        <section className="py-16 px-6 max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
            {/* Who it is for */}
            <div className="lg:col-span-7 p-8 rounded-xl" style={glassCard}>
              <h2 className="text-3xl font-bold mb-4" style={{ color: "#dae2fd", ...hanken }}>
                Who it is for
              </h2>
              <p className="text-lg mb-6" style={{ color: "#cbc3d7" }}>
                Primarily focused on high school age and above, our platform is tailored for:
              </p>
              <div className="grid grid-cols-2 gap-4">
                {audienceItems.map((a) => {
                  const Icon = a.icon;
                  return (
                    <div
                      key={a.label}
                      className="flex items-center gap-3 p-4 rounded-lg"
                      style={{
                        background: "rgba(23,31,51,0.8)",
                        border: "1px solid rgba(73,68,84,0.3)",
                      }}
                    >
                      <Icon className="h-5 w-5 flex-shrink-0" style={{ color: "#d0bcff" }} />
                      <span className="font-medium" style={{ color: "#dae2fd" }}>
                        {a.label}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Digital Community Center */}
            <div className="lg:col-span-5 relative rounded-xl overflow-hidden min-h-[320px]">
              <div
                className="absolute inset-0 bg-cover bg-center"
                style={{ backgroundImage: `url('${COMMUNITY_IMG}')` }}
              />
              <div
                className="absolute inset-0"
                style={{
                  background:
                    "linear-gradient(to top, #0b1326 0%, rgba(11,19,38,0.4) 50%, transparent 100%)",
                }}
              />
              <div className="absolute bottom-0 left-0 right-0 p-8 z-10">
                <h2 className="text-2xl font-semibold mb-2" style={{ color: "#dae2fd", ...hanken }}>
                  A Digital Community Center
                </h2>
                <p style={{ color: "#cbc3d7" }}>
                  People should feel more connected and have more access, turning information into
                  something they can actually use.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ── What Makes It Different ── */}
        <section className="py-16 px-6 max-w-7xl mx-auto">
          <div
            className="relative p-8 rounded-xl"
            style={{ ...glassCard, borderLeft: "4px solid #4fdbc8" }}
          >
            <div
              className="absolute -inset-4 rounded-full pointer-events-none"
              style={{ background: "rgba(79,219,200,0.05)", filter: "blur(40px)" }}
            />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center relative z-10">
              <div>
                <h2 className="text-3xl font-bold mb-4" style={{ color: "#dae2fd", ...hanken }}>
                  What makes it different
                </h2>
                <p className="text-lg italic leading-relaxed" style={{ color: "#cbc3d7" }}>
                  "Not a passive social media platform, but a reason to do something with your day."
                </p>
              </div>
              <div className="flex flex-col md:flex-row items-center justify-center gap-4">
                <div
                  className="text-center p-6 rounded-xl"
                  style={{
                    background: "rgba(34,42,61,0.8)",
                    border: "1px solid rgba(73,68,84,0.3)",
                  }}
                >
                  <div className="text-4xl font-black mb-2" style={{ color: "#4fdbc8", ...hanken }}>
                    Intention
                  </div>
                  <div
                    className="text-xs uppercase tracking-widest opacity-60"
                    style={{ color: "#cbc3d7", ...mono }}
                  >
                    The Purpose
                  </div>
                </div>
                <ArrowRight className="h-6 w-6 flex-shrink-0" style={{ color: "#cbc3d7" }} />
                <div
                  className="text-center p-6 rounded-xl"
                  style={{
                    background: "rgba(34,42,61,0.8)",
                    border: "1px solid rgba(73,68,84,0.3)",
                  }}
                >
                  <div className="text-4xl font-black mb-2" style={{ color: "#d0bcff", ...hanken }}>
                    Action
                  </div>
                  <div
                    className="text-xs uppercase tracking-widest opacity-60"
                    style={{ color: "#cbc3d7", ...mono }}
                  >
                    The Result
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── CTA ── */}
        <section className="py-16 px-6 max-w-7xl mx-auto">
          <div className="rounded-2xl overflow-hidden" style={glassCard}>
            <div className="grid grid-cols-1 lg:grid-cols-2">
              <div className="p-10 flex flex-col justify-center gap-6">
                <h2 className="text-3xl font-bold" style={{ color: "#dae2fd", ...hanken }}>
                  Ready to begin?
                </h2>
                <p className="text-lg leading-relaxed" style={{ color: "#cbc3d7" }}>
                  When you sign up, you begin with a brief survey. This isn't just data — it's how
                  we personalize your dashboard to show you exactly what matters most in your
                  neighborhood.
                </p>
                <div className="flex flex-wrap gap-4">
                  <Link
                    to="/login"
                    search={{ tab: "signup" } as any}
                    className="inline-flex items-center gap-2 px-8 py-3 rounded-lg font-bold text-white transition-all hover:brightness-110"
                    style={{
                      background: "linear-gradient(135deg,#a078ff 0%,#0566d9 100%)",
                      boxShadow: "0 4px 15px rgba(160,120,255,0.3)",
                    }}
                  >
                    Sign Up
                  </Link>
                  <Link
                    to="/features"
                    className="inline-flex items-center gap-2 px-8 py-3 rounded-lg font-bold transition-all hover:text-white"
                    style={{ border: "1px solid #d0bcff", color: "#d0bcff" }}
                  >
                    Start Exploring
                  </Link>
                </div>
              </div>
              <div
                className="min-h-[300px] hidden lg:block bg-cover bg-center"
                style={{ backgroundImage: `url('${SURVEY_IMG}')` }}
              />
            </div>
          </div>
        </section>
      </main>

      <PublicFooter />
    </div>
  );
}
