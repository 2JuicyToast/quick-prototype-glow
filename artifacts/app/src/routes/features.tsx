import { createFileRoute, Link } from "@tanstack/react-router";
import {
  Map,
  ClipboardList,
  Search,
  Tag,
  CheckCircle2,
  Briefcase,
  FileText,
  Lightbulb,
  Bookmark,
  BarChart2,
  Award,
  MessageSquare,
  Lock,
  ShieldCheck,
  ArrowRight,
  Users,
} from "lucide-react";
import { PublicNav } from "@/components/PublicNav";
import { PublicStars, PublicFooter } from "@/components/PublicStars";

export const Route = createFileRoute("/features")({
  head: () => ({
    meta: [
      { title: "Features | MyCommNet" },
      {
        name: "description",
        content:
          "MyCommNet is built for discovery, connection, and growth — the digital infrastructure to bridge community gaps.",
      },
    ],
  }),
  component: FeaturesPage,
});

const hanken = { fontFamily: "'Hanken Grotesk', sans-serif" };
const mono = { fontFamily: "'JetBrains Mono', monospace" };

const glassCard: React.CSSProperties = {
  background: "rgba(15, 23, 42, 0.6)",
  backdropFilter: "blur(12px)",
  border: "1px solid rgba(255,255,255,0.05)",
  transition: "all 0.3s ease",
};

function FeaturesPage() {
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
      <PublicNav activePage="features" />

      <main className="pt-[72px]" style={{ position: "relative", zIndex: 10 }}>
        {/* ── Hero ── */}
        <section className="relative min-h-[70vh] flex items-center justify-center overflow-hidden py-16 px-6">
          <div className="absolute inset-0 z-0">
            <div
              className="absolute rounded-full animate-pulse"
              style={{
                top: "20%",
                left: "30%",
                width: 500,
                height: 500,
                background: "rgba(160,120,255,0.1)",
                filter: "blur(120px)",
              }}
            />
            <div
              className="absolute rounded-full animate-pulse"
              style={{
                bottom: "20%",
                right: "20%",
                width: 400,
                height: 400,
                background: "rgba(79,219,200,0.07)",
                filter: "blur(100px)",
                animationDelay: "2s",
              }}
            />
          </div>
          <div className="relative z-10 text-center max-w-4xl mx-auto">
            <span
              className="block text-sm uppercase tracking-widest mb-6 font-medium"
              style={{ color: "#4fdbc8", ...mono }}
            >
              Platform Capabilities
            </span>
            <h1
              className="font-black mb-6"
              style={{
                ...hanken,
                fontSize: "clamp(48px,8vw,72px)",
                lineHeight: 1.1,
                letterSpacing: "-0.02em",
                color: "#dae2fd",
                textShadow: "0 0 20px rgba(208,188,255,0.4)",
              }}
            >
              Features
            </h1>
            <p
              className="text-lg leading-relaxed max-w-2xl mx-auto mb-10"
              style={{ color: "#cbc3d7" }}
            >
              MyCommNet is built for discovery, connection, and growth. We provide the digital
              infrastructure to bridge community gaps and empower every individual through
              meaningful local opportunities.
            </p>
            <Link
              to="/login"
              search={{ tab: "signup" } as any}
              className="inline-block px-10 py-4 rounded-xl font-bold text-base transition-all hover:brightness-110 active:scale-95"
              style={{
                background: "#d0bcff",
                color: "#23005c",
                boxShadow: "0 8px 20px rgba(208,188,255,0.2)",
              }}
            >
              Get Started
            </Link>
          </div>
        </section>

        {/* ── Personalized Discovery ── */}
        <section className="py-16 px-6 max-w-7xl mx-auto">
          <div className="mb-10">
            <h2 className="text-3xl font-bold mb-2" style={{ color: "#dae2fd", ...hanken }}>
              Personalized Discovery
            </h2>
            <p className="text-base" style={{ color: "#cbc3d7" }}>
              Tailored results based on your unique lifestyle and immediate needs.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
            {/* Map-based Exploration — large card */}
            <div
              className="md:col-span-8 p-6 rounded-xl flex flex-col justify-end relative overflow-hidden group min-h-[300px]"
              style={glassCard}
            >
              <div className="absolute inset-0 flex items-center justify-center opacity-10">
                <Map className="h-64 w-64" style={{ color: "#4fdbc8" }} />
              </div>
              <div
                className="absolute inset-0"
                style={{ background: "linear-gradient(to top, rgba(15,23,42,0.95), transparent)" }}
              />
              <div className="relative z-10">
                <Map className="h-10 w-10 mb-3" style={{ color: "#4fdbc8" }} />
                <h3 className="text-2xl font-semibold mb-2" style={{ color: "#dae2fd", ...hanken }}>
                  Map-based Exploration
                </h3>
                <p className="max-w-md" style={{ color: "#cbc3d7" }}>
                  Find resources near you with our real-time interactive community map.
                </p>
              </div>
            </div>

            {/* Personalized Survey */}
            <div
              className="md:col-span-4 p-6 rounded-xl flex flex-col items-center text-center justify-center gap-4"
              style={glassCard}
            >
              <div
                className="w-16 h-16 rounded-full flex items-center justify-center"
                style={{ background: "rgba(208,188,255,0.1)" }}
              >
                <ClipboardList className="h-8 w-8" style={{ color: "#d0bcff" }} />
              </div>
              <h3 className="text-2xl font-semibold" style={{ color: "#dae2fd", ...hanken }}>
                Personalized Survey
              </h3>
              <p style={{ color: "#cbc3d7" }}>
                Take a quick assessment to get recommendations that match your goals.
              </p>
            </div>

            {/* Smart Search */}
            <div className="md:col-span-6 p-6 rounded-xl flex items-start gap-4" style={glassCard}>
              <div
                className="p-3 rounded-lg flex-shrink-0"
                style={{ background: "rgba(23,31,51,0.8)" }}
              >
                <Search className="h-5 w-5" style={{ color: "#adc6ff" }} />
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-1" style={{ color: "#dae2fd", ...hanken }}>
                  Smart Search
                </h3>
                <p style={{ color: "#cbc3d7" }}>
                  AI-powered search that understands intent, not just keywords.
                </p>
              </div>
            </div>

            {/* Resource Categories */}
            <div className="md:col-span-6 p-6 rounded-xl flex items-start gap-4" style={glassCard}>
              <div
                className="p-3 rounded-lg flex-shrink-0"
                style={{ background: "rgba(23,31,51,0.8)" }}
              >
                <Tag className="h-5 w-5" style={{ color: "#4fdbc8" }} />
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-1" style={{ color: "#dae2fd", ...hanken }}>
                  Resource Categories
                </h3>
                <p style={{ color: "#cbc3d7" }}>
                  Browse through intuitive tags from food security to tech education.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ── Community & Connection ── */}
        <section
          className="py-16"
          style={{
            background: "rgba(19,27,46,0.5)",
            borderTop: "1px solid rgba(73,68,84,0.3)",
            borderBottom: "1px solid rgba(73,68,84,0.3)",
          }}
        >
          <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <span
                className="block text-sm font-medium mb-4"
                style={{ color: "#adc6ff", ...mono }}
              >
                Intentional Spaces
              </span>
              <h2 className="text-3xl font-bold mb-4" style={{ color: "#dae2fd", ...hanken }}>
                Community &amp; Connection
              </h2>
              <p className="text-lg leading-relaxed mb-6" style={{ color: "#cbc3d7" }}>
                Experience a platform that prioritizes intentional connection. It's social, but not
                a feed — focused on action and shared goals rather than mindless scrolling.
              </p>
              <ul className="space-y-4">
                {[
                  "Direct messages for 1-on-1 collaboration",
                  "Group chats for neighborhood projects",
                  "Verified updates from community leaders",
                ].map((item) => (
                  <li key={item} className="flex items-center gap-3">
                    <CheckCircle2 className="h-5 w-5 flex-shrink-0" style={{ color: "#d0bcff" }} />
                    <span style={{ color: "#dae2fd" }}>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Mock chat UI */}
            <div className="relative">
              <div
                className="absolute -inset-4 rounded-full pointer-events-none"
                style={{ background: "rgba(208,188,255,0.05)", filter: "blur(40px)" }}
              />
              <div
                className="p-8 rounded-2xl relative"
                style={{ ...glassCard, border: "1px solid rgba(208,188,255,0.15)" }}
              >
                <div className="space-y-4">
                  {[0, 1, 2].map((i) => (
                    <div
                      key={i}
                      className={`flex items-center gap-3 p-3 rounded-xl ${i === 1 ? "ml-8" : ""}`}
                      style={{
                        background: i === 1 ? "rgba(208,188,255,0.05)" : "rgba(23,31,51,0.8)",
                        border: i === 1 ? "1px solid rgba(208,188,255,0.1)" : "none",
                      }}
                    >
                      {i !== 1 && (
                        <div
                          className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0"
                          style={{ background: "rgba(73,68,84,0.4)" }}
                        >
                          <Users className="h-5 w-5" style={{ color: "#cbc3d7" }} />
                        </div>
                      )}
                      <div className="flex-1">
                        {i === 1 ? (
                          <>
                            <p className="text-sm font-medium mb-1" style={{ color: "#d0bcff" }}>
                              Group Project Alpha
                            </p>
                            <div
                              className="h-2 w-32 rounded-full"
                              style={{ background: "rgba(208,188,255,0.2)" }}
                            />
                          </>
                        ) : (
                          <>
                            <div
                              className="h-2 w-24 rounded-full mb-2"
                              style={{ background: "rgba(73,68,84,0.4)" }}
                            />
                            <div
                              className="h-2 rounded-full"
                              style={{
                                background: "rgba(73,68,84,0.2)",
                                width: i === 0 ? "12rem" : "9rem",
                              }}
                            />
                          </>
                        )}
                      </div>
                      {i === 1 && (
                        <Users className="h-5 w-5 flex-shrink-0" style={{ color: "#d0bcff" }} />
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── Growth & Opportunities ── */}
        <section className="py-16 px-6 max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-3" style={{ color: "#dae2fd", ...hanken }}>
              Growth &amp; Opportunities
            </h2>
            <p className="text-base max-w-2xl mx-auto" style={{ color: "#cbc3d7" }}>
              Focus on your long-term success with tools designed to help you level up your career
              and life skills.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                icon: Briefcase,
                color: "#4fdbc8",
                border: "#4fdbc8",
                title: "Hiring Resources",
                desc: "Direct access to local companies looking for talent in your community.",
              },
              {
                icon: FileText,
                color: "#adc6ff",
                border: "#adc6ff",
                title: "Resume Help",
                desc: "Guided tools and peer reviews to make your professional profile stand out.",
              },
              {
                icon: Lightbulb,
                color: "#d0bcff",
                border: "#d0bcff",
                title: "Mentoring",
                desc: "Connect with experienced professionals willing to guide your journey.",
              },
            ].map((c) => {
              const Icon = c.icon;
              return (
                <div
                  key={c.title}
                  className="p-8 rounded-xl"
                  style={{ ...glassCard, borderTop: `4px solid ${c.border}` }}
                >
                  <Icon className="h-10 w-10 mb-4" style={{ color: c.color }} />
                  <h3
                    className="text-xl font-semibold mb-3"
                    style={{ color: "#dae2fd", ...hanken }}
                  >
                    {c.title}
                  </h3>
                  <p style={{ color: "#cbc3d7" }}>{c.desc}</p>
                </div>
              );
            })}
          </div>
        </section>

        {/* ── Personal Hub & Trust/Safety ── */}
        <section className="py-16 px-6 max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Personal Hub */}
            <div>
              <h2 className="text-3xl font-bold mb-2" style={{ color: "#dae2fd", ...hanken }}>
                Personal Hub
              </h2>
              <p className="mb-6" style={{ color: "#cbc3d7" }}>
                Track your local impact and stay organized.
              </p>
              <div className="space-y-4">
                {[
                  {
                    icon: Bookmark,
                    title: "Saved Resources",
                    desc: "Keep your most-used services just one click away.",
                  },
                  {
                    icon: BarChart2,
                    title: "Experience Tracking",
                    desc: "Visualize your growth through completed training and workshops.",
                  },
                  {
                    icon: Award,
                    title: "Digital Community Pass",
                    desc: "A unified digital ID for accessing community events and spaces.",
                  },
                ].map((item) => {
                  const Icon = item.icon;
                  return (
                    <div
                      key={item.title}
                      className="flex items-center gap-4 p-5 rounded-xl"
                      style={glassCard}
                    >
                      <Icon className="h-5 w-5 flex-shrink-0" style={{ color: "#d0bcff" }} />
                      <div>
                        <h4 className="font-bold mb-0.5" style={{ color: "#dae2fd" }}>
                          {item.title}
                        </h4>
                        <p className="text-sm" style={{ color: "#cbc3d7" }}>
                          {item.desc}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Trust & Safety */}
            <div>
              <h2 className="text-3xl font-bold mb-2" style={{ color: "#dae2fd", ...hanken }}>
                Trust &amp; Safety
              </h2>
              <p className="mb-6" style={{ color: "#cbc3d7" }}>
                Built on a foundation of security and verification.
              </p>
              <div
                className="p-6 rounded-2xl"
                style={{ background: "rgba(34,42,61,0.4)", border: "1px solid rgba(73,68,84,0.5)" }}
              >
                <div className="space-y-4">
                  {[
                    {
                      icon: ShieldCheck,
                      title: "Verified Listings",
                      desc: "Every organization is manually vetted for community safety.",
                    },
                    {
                      icon: MessageSquare,
                      title: "Review Categories",
                      desc: "Community-driven feedback to ensure high quality support.",
                    },
                    {
                      icon: Lock,
                      title: "Privacy Controls",
                      desc: "You decide what to share and who you connect with.",
                    },
                  ].map((item) => {
                    const Icon = item.icon;
                    return (
                      <div
                        key={item.title}
                        className="flex items-start gap-4 p-4 rounded-lg"
                        style={{ background: "rgba(11,19,38,0.5)" }}
                      >
                        <Icon
                          className="h-5 w-5 mt-0.5 flex-shrink-0"
                          style={{ color: "#4fdbc8" }}
                        />
                        <div>
                          <h4 className="font-bold mb-0.5" style={{ color: "#dae2fd" }}>
                            {item.title}
                          </h4>
                          <p className="text-sm" style={{ color: "#cbc3d7" }}>
                            {item.desc}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
                <div
                  className="mt-6 pt-5 text-center"
                  style={{ borderTop: "1px solid rgba(73,68,84,0.5)" }}
                >
                  <span
                    className="text-xs font-medium px-4 py-1.5 rounded-full"
                    style={{ background: "rgba(79,219,200,0.1)", color: "#4fdbc8", ...mono }}
                  >
                    Secure &amp; Encrypted
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── Final CTA ── */}
        <section className="py-20 px-6 text-center relative overflow-hidden">
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                "radial-gradient(circle at center, rgba(208,188,255,0.07) 0%, transparent 70%)",
            }}
          />
          <div className="max-w-3xl mx-auto relative z-10">
            <h2
              className="font-black mb-4"
              style={{
                ...hanken,
                fontSize: "clamp(32px,6vw,48px)",
                lineHeight: 1.1,
                color: "#dae2fd",
              }}
            >
              Explore what your community has to offer
            </h2>
            <p className="text-lg mb-10" style={{ color: "#cbc3d7" }}>
              Join thousands of community members already growing together on MyCommNet.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link
                to="/login"
                search={{ tab: "signup" } as any}
                className="w-full sm:w-auto px-10 py-4 rounded-xl font-bold text-base transition-all hover:brightness-110 active:scale-95"
                style={{ background: "#d0bcff", color: "#23005c" }}
              >
                Sign Up
              </Link>
              <Link
                to="/about"
                className="w-full sm:w-auto px-10 py-4 rounded-xl font-bold text-base flex items-center justify-center gap-2 transition-colors hover:text-white"
                style={{ color: "#dae2fd" }}
              >
                Learn More
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </section>
      </main>

      <PublicFooter />
    </div>
  );
}
