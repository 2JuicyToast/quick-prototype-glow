import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect } from "react";
import { Lock, Shield, Key, Rocket, VerifiedIcon, Globe, Users } from "lucide-react";
import { PublicNav } from "@/components/PublicNav";
import { PublicFooter } from "@/components/PublicStars";
import { useAuth } from "@/hooks/useAuth";

export const Route = createFileRoute("/restricted")({
  head: () => ({
    meta: [
      { title: "Restricted Orbit | MyCommNet" },
      { name: "description", content: "You need to be logged in to access this page." },
    ],
  }),
  component: RestrictedPage,
});

function RestrictedPage() {
  const { user, loading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && user) {
      navigate({ to: "/main" });
    }
  }, [user, loading, navigate]);

  if (loading) return null;

  return (
    <div
      className="min-h-screen flex flex-col"
      style={{ backgroundColor: "#0b1326", color: "#dae2fd", overflowX: "hidden" }}
    >
      <style>{`
        @keyframes mcn-float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
        @keyframes mcn-ping-slow {
          0% { transform: scale(1); opacity: 0.3; }
          70% { transform: scale(1.4); opacity: 0; }
          100% { transform: scale(1.4); opacity: 0; }
        }
        .restricted-float { animation: mcn-float 6s ease-in-out infinite; }
        .restricted-ping { animation: mcn-ping-slow 2.5s ease-out infinite; }
        .restricted-star-field {
          background-image:
            radial-gradient(1px 1px at 20px 30px, rgba(255,255,255,0.6), transparent),
            radial-gradient(1px 1px at 80px 120px, rgba(255,255,255,0.6), transparent),
            radial-gradient(1.5px 1.5px at 150px 50px, rgba(255,255,255,0.6), transparent),
            radial-gradient(1px 1px at 40px 170px, rgba(255,255,255,0.4), transparent),
            radial-gradient(2px 2px at 110px 90px, rgba(255,255,255,0.5), transparent);
          background-repeat: repeat;
          background-size: 200px 200px;
          opacity: 0.2;
        }
        .restricted-primary-btn {
          background: linear-gradient(90deg, #6d3bd7 0%, #0566d9 100%);
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }
        .restricted-primary-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 24px rgba(109, 59, 215, 0.35);
        }
        .restricted-glass-btn {
          background: rgba(15, 23, 42, 0.6);
          backdrop-filter: blur(12px);
          border: 1px solid rgba(73, 68, 84, 0.6);
          transition: all 0.3s ease;
        }
        .restricted-glass-btn:hover {
          background: rgba(49, 57, 77, 0.6);
          transform: translateY(-2px);
        }
      `}</style>

      <PublicNav activePage="home" />

      <main className="flex-grow flex flex-col items-center justify-center pt-24 pb-24 px-6 relative overflow-hidden">
        {/* Star field */}
        <div className="restricted-star-field absolute inset-0 pointer-events-none" />

        {/* Nebula glows */}
        <div
          className="absolute pointer-events-none"
          style={{ top: "10%", left: "-15%", width: 600, height: 600, borderRadius: "50%", background: "radial-gradient(circle, rgba(160,120,255,0.12) 0%, rgba(5,102,217,0.04) 50%, transparent 100%)", filter: "blur(80px)", zIndex: 0 }}
        />
        <div
          className="absolute pointer-events-none"
          style={{ bottom: "10%", right: "-15%", width: 600, height: 600, borderRadius: "50%", background: "radial-gradient(circle, rgba(79,219,200,0.08) 0%, transparent 60%)", filter: "blur(80px)", zIndex: 0 }}
        />

        {/* Lock icon visual */}
        <div className="relative flex justify-center mb-10 z-10 restricted-float">
          {/* Ping ring */}
          <div
            className="restricted-ping absolute inset-0 rounded-full"
            style={{ margin: "auto", width: 192, height: 192, border: "1px solid rgba(208,188,255,0.25)" }}
          />

          {/* Main icon circle */}
          <div
            className="relative w-44 h-44 rounded-full flex items-center justify-center"
            style={{
              background: "rgba(23,31,51,0.8)",
              backdropFilter: "blur(12px)",
              border: "2px solid rgba(208,188,255,0.25)",
              boxShadow: "0 0 40px rgba(160,120,255,0.15)",
            }}
          >
            <Lock
              size={80}
              style={{ color: "#d0bcff", filter: "drop-shadow(0 0 15px rgba(160,120,255,0.6))" }}
              strokeWidth={1.5}
            />

            {/* Orbiting particle 1 — Shield */}
            <div
              className="absolute -top-4 -right-4 w-11 h-11 rounded-full flex items-center justify-center"
              style={{ background: "rgba(15,23,42,0.7)", backdropFilter: "blur(8px)", border: "1px solid rgba(79,219,200,0.35)" }}
            >
              <Shield size={18} style={{ color: "#4fdbc8" }} />
            </div>

            {/* Orbiting particle 2 — Key */}
            <div
              className="absolute -bottom-6 -left-4 w-14 h-14 rounded-full flex items-center justify-center"
              style={{ background: "rgba(15,23,42,0.7)", backdropFilter: "blur(8px)", border: "1px solid rgba(173,198,255,0.35)" }}
            >
              <Key size={22} style={{ color: "#adc6ff" }} />
            </div>
          </div>
        </div>

        {/* Text content */}
        <div className="text-center max-w-2xl z-10">
          <h1
            className="font-black mb-4 leading-tight"
            style={{
              fontSize: "clamp(36px,7vw,52px)",
              fontFamily: "'Hanken Grotesk', sans-serif",
              background: "linear-gradient(135deg, #d0bcff 0%, #4fdbc8 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            Restricted Orbit
          </h1>

          <p
            className="text-lg leading-relaxed mb-8 max-w-lg mx-auto"
            style={{ color: "#cbc3d7" }}
          >
            You need to be logged in to access this corner of the community.
            Authenticate your credentials to continue your journey through the MyCommNet ecosystem.
          </p>

          {/* CTA buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-10">
            <Link
              to="/login"
              className="restricted-primary-btn w-full sm:w-auto h-11 px-8 text-white rounded-lg font-semibold text-sm flex items-center justify-center gap-2"
              style={{ fontFamily: "'JetBrains Mono', monospace" }}
            >
              <Lock size={16} />
              Log In
            </Link>
            <Link
              to="/login"
              search={{ tab: "signup" } as any}
              className="restricted-glass-btn w-full sm:w-auto h-11 px-8 rounded-lg font-semibold text-sm flex items-center justify-center gap-2"
              style={{ color: "#dae2fd", fontFamily: "'JetBrains Mono', monospace" }}
            >
              <Rocket size={16} />
              Join the Community
            </Link>
          </div>

          {/* Info row */}
          <div
            className="flex flex-wrap justify-center gap-8 pt-6 text-xs uppercase tracking-widest"
            style={{ borderTop: "1px solid rgba(73,68,84,0.3)", color: "rgba(203,195,215,0.5)", fontFamily: "'JetBrains Mono', monospace" }}
          >
            {[
              { Icon: VerifiedIcon, label: "Secure Access" },
              { Icon: Globe, label: "Global Network" },
              { Icon: Users, label: "Group Connections" },
            ].map(({ Icon, label }) => (
              <div key={label} className="flex items-center gap-2">
                <Icon size={14} />
                <span>{label}</span>
              </div>
            ))}
          </div>
        </div>
      </main>

      <PublicFooter />
    </div>
  );
}
