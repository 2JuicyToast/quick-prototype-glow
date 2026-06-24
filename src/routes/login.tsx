import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { useAuth } from "@/hooks/useAuth";
import logoAsset from "@/assets/MyCommNet.png.asset.json";
import { Mail, Lock, Eye, EyeOff, Users, Zap, LogIn } from "lucide-react";

export const Route = createFileRoute("/login")({
  head: () => ({
    meta: [
      { title: "Sign In — MyCommNet" },
      { name: "description", content: "Sign in or create your MyCommNet account." },
    ],
  }),
  component: LoginPage,
});

const COMET_SRC =
  "https://lh3.googleusercontent.com/aida-public/AB6AXuApsskkHh1tuHpUa8yO8fn7Wc3Pg23Ebm3QIEhcuitN8k0UMi07akpSEBwfjMi0MxELDaQyFkxWCvkx1mlX9njCE0gNSC6NdHh3lTQBg3rTE6PSOi-7ZpZxz12G7PrDHuPNG5-ttg57IrRAGvqhyKBb6BrZp3KSO5AxudFVQ5Sb8-MtO6mn7S4gdgISlchJMubNoD6e6V3FJUmlYCynm4TTauQpp-iOd6GHqIGRKnv1qf3Ce2b2qthi3-LuX05wYlt-PAfsCzRFYg";

const mono = { fontFamily: "'JetBrains Mono', monospace" };

const inputBase: React.CSSProperties = {
  background: "#0b1326",
  border: "1px solid #1e293b",
  color: "#dae2fd",
  transition: "border-color 0.2s, box-shadow 0.2s",
  outline: "none",
};
const inputFocus: React.CSSProperties = {
  borderColor: "#4fdbc8",
  boxShadow: "0 0 0 1px #4fdbc8",
};

function LoginPage() {
  const [tab, setTab] = useState<"login" | "signup">("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [emailFocused, setEmailFocused] = useState(false);
  const [passwordFocused, setPasswordFocused] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const { signIn, signUp, user, loading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && user) navigate({ to: "/" });
  }, [user, loading, navigate]);

  function switchTab(next: "login" | "signup") {
    setTab(next);
    setErrorMsg(null);
    setSuccessMsg(null);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setErrorMsg(null);
    setSuccessMsg(null);
    setSubmitting(true);

    if (tab === "login") {
      const { error } = await signIn(email, password);
      if (error) setErrorMsg(error.message);
      else navigate({ to: "/" });
    } else {
      const { error } = await signUp(email, password, fullName);
      if (error) {
        setErrorMsg(error.message);
      } else {
        setSuccessMsg("Check your email to confirm your account, then sign in.");
        setTab("login");
        setFullName("");
        setPassword("");
      }
    }
    setSubmitting(false);
  }

  return (
    <div
      className="min-h-screen flex flex-col overflow-x-hidden"
      style={{ backgroundColor: "#020617", color: "#dae2fd", fontFamily: "'Inter', sans-serif" }}
    >
      {/* ── Header ── */}
      <header
        className="flex justify-between items-center px-6 w-full z-50 h-[72px] sticky top-0 shadow-sm"
        style={{ backgroundColor: "rgba(15, 23, 42, 0.8)", backdropFilter: "blur(12px)", borderBottom: "1px solid rgba(255,255,255,0.05)" }}
      >
        <div className="flex items-center gap-3">
          <img
            src={logoAsset.url}
            alt="MyCommNet Logo"
            className="h-10 w-10 object-contain"
            style={{ filter: "drop-shadow(0 0 10px rgba(160,120,255,0.4))" }}
          />
          <span className="text-xl font-black tracking-tight">
            <span style={{ color: "#a078ff" }}>My</span>
            <span style={{ color: "#0566d9" }}>Comm</span>
            <span style={{ color: "#4fdbc8" }}>Net</span>
          </span>
        </div>
        <nav className="hidden md:flex items-center gap-8">
          {["Home", "About", "Features"].map((l) => (
            <a key={l} href="#" className="text-sm transition-colors hover:text-white" style={{ color: "#cbc3d7" }}>
              {l}
            </a>
          ))}
        </nav>
      </header>

      {/* ── Main ── */}
      <main className="flex-grow flex flex-col lg:flex-row relative">

        {/* Left — Form */}
        <section className="w-full lg:w-1/2 flex items-center justify-center p-6 lg:p-10 z-10 relative">
          {/* Atmospheric glow */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            <div className="absolute -top-48 -right-48 w-96 h-96 rounded-full blur-[120px]" style={{ background: "rgba(160,120,255,0.1)" }} />
            <div className="absolute -bottom-48 -left-48 w-96 h-96 rounded-full blur-[120px]" style={{ background: "rgba(5,102,217,0.1)" }} />
          </div>

          <div className="w-full max-w-md relative z-10">
            {/* Heading */}
            <div className="mb-8">
              <h1 className="text-[32px] leading-10 font-bold mb-2" style={{ color: "#dae2fd", fontFamily: "'Hanken Grotesk', sans-serif" }}>
                {tab === "login" ? "Welcome Back" : "Join the Community"}
              </h1>
              <p className="text-base" style={{ color: "#cbc3d7" }}>
                {tab === "login"
                  ? "Enter your credentials to access your community dashboard."
                  : "Connect with local resources, build meaningful networks, and create opportunities."}
              </p>
            </div>

            {/* Glass card */}
            <div
              className="rounded-xl p-8"
              style={{ background: "rgba(15, 23, 42, 0.7)", backdropFilter: "blur(16px)", border: "1px solid rgba(255,255,255,0.1)" }}
            >
              {/* Pill tab switcher — sliding indicator */}
              <div className="relative flex rounded-full p-1 mb-6" style={{ background: "rgba(6, 14, 32, 0.8)" }}>
                {/* Sliding pill */}
                <span
                  className="absolute top-1 bottom-1 w-[calc(50%-4px)] rounded-full pointer-events-none"
                  style={{
                    background: "linear-gradient(135deg, #a078ff 0%, #0566d9 100%)",
                    transform: tab === "login" ? "translateX(0)" : "translateX(calc(100% + 8px))",
                    transition: "transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                    left: 4,
                  }}
                />
                {(["login", "signup"] as const).map((t) => (
                  <button
                    key={t}
                    type="button"
                    onClick={() => switchTab(t)}
                    className="relative flex-1 h-9 rounded-full text-sm font-semibold z-10"
                    style={{
                      color: tab === t ? "#ffffff" : "#cbc3d7",
                      transition: "color 0.3s ease",
                    }}
                  >
                    {t === "login" ? "Sign In" : "Sign Up"}
                  </button>
                ))}
              </div>

              <form onSubmit={handleSubmit} className="space-y-5">
                {/* Full name — signup only */}
                {tab === "signup" && (
                  <div>
                    <label className="block text-xs uppercase tracking-widest mb-1.5" style={{ color: "#cbc3d7", ...mono }}>
                      Full Name
                    </label>
                    <input
                      type="text"
                      required
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      placeholder="Jayden Smith"
                      className="w-full h-11 px-4 rounded-lg text-sm"
                      style={inputBase}
                    />
                  </div>
                )}

                {/* Email */}
                <div>
                  <label className="block text-xs uppercase tracking-widest mb-1.5 transition-colors" style={{ color: emailFocused ? "#4fdbc8" : "#cbc3d7", ...mono }}>
                    Email {tab === "login" ? "Address" : ""}
                  </label>
                  <div className="relative">
                    <Mail
                      className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 transition-colors"
                      style={{ color: emailFocused ? "#4fdbc8" : "#958ea0" }}
                    />
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      onFocus={() => setEmailFocused(true)}
                      onBlur={() => setEmailFocused(false)}
                      placeholder="name@example.com"
                      className="w-full h-11 pl-12 pr-4 rounded-lg text-sm"
                      style={{ ...inputBase, ...(emailFocused ? inputFocus : {}) }}
                    />
                  </div>
                </div>

                {/* Password */}
                <div>
                  <div className="flex justify-between items-center mb-1.5">
                    <label className="block text-xs uppercase tracking-widest transition-colors" style={{ color: passwordFocused ? "#4fdbc8" : "#cbc3d7", ...mono }}>
                      Password
                    </label>
                    {tab === "login" && (
                      <a href="#" className="text-xs hover:underline" style={{ color: "#4fdbc8" }}>
                        Forgot password?
                      </a>
                    )}
                  </div>
                  <div className="relative">
                    <Lock
                      className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 transition-colors"
                      style={{ color: passwordFocused ? "#4fdbc8" : "#958ea0" }}
                    />
                    <input
                      type={showPassword ? "text" : "password"}
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      onFocus={() => setPasswordFocused(true)}
                      onBlur={() => setPasswordFocused(false)}
                      placeholder="••••••••"
                      minLength={6}
                      className="w-full h-11 pl-12 pr-12 rounded-lg text-sm"
                      style={{ ...inputBase, ...(passwordFocused ? inputFocus : {}) }}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 transition-colors hover:text-white"
                      style={{ color: "#958ea0" }}
                    >
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                </div>

                {/* Remember me — login only */}
                {tab === "login" && (
                  <div className="flex items-center gap-2 pt-1">
                    <input
                      type="checkbox"
                      id="remember"
                      className="w-4 h-4 rounded"
                      style={{ accentColor: "#0566d9" }}
                    />
                    <label htmlFor="remember" className="text-sm cursor-pointer" style={{ color: "#cbc3d7" }}>
                      Remember me for 30 days
                    </label>
                  </div>
                )}

                {/* Feedback messages */}
                {errorMsg && (
                  <div
                    className="rounded-lg px-4 py-2.5 text-xs"
                    style={{ background: "rgba(147,0,10,0.2)", color: "#ffb4ab", border: "1px solid rgba(147,0,10,0.4)" }}
                  >
                    {errorMsg}
                  </div>
                )}
                {successMsg && (
                  <div
                    className="rounded-lg px-4 py-2.5 text-xs"
                    style={{ background: "rgba(79,219,200,0.1)", color: "#4fdbc8", border: "1px solid rgba(79,219,200,0.3)" }}
                  >
                    {successMsg}
                  </div>
                )}

                {/* Submit */}
                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full h-11 rounded-lg font-bold text-sm flex items-center justify-center gap-2 transition-all active:scale-[0.98] disabled:opacity-50 hover:brightness-110"
                  style={{ background: "linear-gradient(135deg, #a078ff 0%, #0566d9 100%)", color: "#ffffff" }}
                >
                  {submitting
                    ? tab === "login" ? "Signing in…" : "Creating account…"
                    : tab === "login" ? "Log In" : "Create Account"}
                  {!submitting && <LogIn className="h-4 w-4" />}
                </button>
              </form>

              {/* OR divider */}
              <div className="flex items-center gap-3 my-5">
                <div className="h-px flex-grow" style={{ background: "#1e293b" }} />
                <span className="text-xs tracking-widest" style={{ color: "#cbc3d7", ...mono }}>OR CONTINUE WITH</span>
                <div className="h-px flex-grow" style={{ background: "#1e293b" }} />
              </div>

              {/* Google button */}
              <button
                type="button"
                className="w-full flex items-center justify-center gap-3 h-11 rounded-lg text-sm font-medium transition-colors"
                style={{ border: "1px solid #1e293b", color: "#dae2fd" }}
                onMouseEnter={(e) => (e.currentTarget.style.background = "#222a3d")}
                onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24">
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="currentColor" />
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="currentColor" />
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="currentColor" />
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="currentColor" />
                </svg>
                Google
              </button>

              {/* Switch tab */}
              <div className="mt-6 pt-5 text-center" style={{ borderTop: "1px solid #1e293b" }}>
                <span className="text-sm" style={{ color: "#cbc3d7" }}>
                  {tab === "login" ? "Don't have an account? " : "Already a member? "}
                </span>
                <button
                  type="button"
                  onClick={() => switchTab(tab === "login" ? "signup" : "login")}
                  className="text-sm font-bold hover:underline"
                  style={{ color: "#adc6ff" }}
                >
                  {tab === "login" ? "Create an account" : "Log in instead"}
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Right — Brand visual */}
        <section
          className="hidden lg:flex lg:w-1/2 relative items-center justify-center overflow-hidden"
          style={{ backgroundColor: "#020617" }}
        >
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            <div className="absolute -top-48 -right-48 w-96 h-96 rounded-full blur-[120px]" style={{ background: "rgba(160,120,255,0.1)" }} />
            <div className="absolute -bottom-48 -left-48 w-96 h-96 rounded-full blur-[120px]" style={{ background: "rgba(5,102,217,0.1)" }} />
          </div>

          <div className="relative z-10 flex flex-col items-center justify-center w-full max-w-2xl px-8">
            <div className="absolute w-[120%] h-[120%] rounded-full blur-[150px] opacity-50" style={{ background: "rgba(160,120,255,0.05)" }} />

            <div className="relative w-full transition-transform duration-700 ease-out hover:scale-[1.02]">
              <img
                alt="Celestial Brand Asset"
                src={COMET_SRC}
                className="w-full h-auto object-contain"
                style={{ filter: "drop-shadow(0 0 50px rgba(160,120,255,0.3))" }}
              />

              {/* Badge — Members */}
              <div
                className="absolute top-10 left-0 px-4 py-2 rounded-lg flex items-center gap-3 animate-bounce"
                style={{ animationDuration: "4s", background: "rgba(15,23,42,0.7)", backdropFilter: "blur(16px)", border: "1px solid rgba(255,255,255,0.1)" }}
              >
                <div className="w-8 h-8 rounded-full flex items-center justify-center" style={{ background: "rgba(0,163,146,0.2)" }}>
                  <Users className="h-4 w-4" style={{ color: "#4fdbc8" }} />
                </div>
                <div>
                  <p className="text-[10px] uppercase tracking-widest" style={{ color: "#cbc3d7", ...mono }}>Growth</p>
                  <p className="text-sm font-bold" style={{ color: "#dae2fd" }}>25K+ Active Members</p>
                </div>
              </div>

              {/* Badge — Resources */}
              <div
                className="absolute bottom-20 right-0 px-4 py-2 rounded-lg flex items-center gap-3 animate-bounce"
                style={{ animationDuration: "5s", background: "rgba(15,23,42,0.7)", backdropFilter: "blur(16px)", border: "1px solid rgba(255,255,255,0.1)" }}
              >
                <div className="w-8 h-8 rounded-full flex items-center justify-center" style={{ background: "rgba(5,102,217,0.2)" }}>
                  <Zap className="h-4 w-4" style={{ color: "#adc6ff" }} />
                </div>
                <div>
                  <p className="text-[10px] uppercase tracking-widest" style={{ color: "#cbc3d7", ...mono }}>Impact</p>
                  <p className="text-sm font-bold" style={{ color: "#dae2fd" }}>8K+ Resources Shared</p>
                </div>
              </div>
            </div>

            {/* Tagline */}
            <div className="mt-8 text-center">
              <h2
                className="text-4xl font-bold mb-4 leading-tight"
                style={{ letterSpacing: "-0.02em", fontFamily: "'Hanken Grotesk', sans-serif" }}
              >
                Connect. Access. <br />
                <span
                  style={{
                    background: "linear-gradient(90deg, #a078ff 0%, #0566d9 50%, #4fdbc8 100%)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                  }}
                >
                  Grow—Together.
                </span>
              </h2>
              <p className="text-base leading-relaxed" style={{ color: "rgba(203,195,215,0.8)" }}>
                MyCommNet helps you discover local resources, build meaningful connections,
                and create opportunities that move your community forward.
              </p>
            </div>
          </div>
        </section>
      </main>

      {/* ── Footer ── */}
      <footer
        className="py-8 px-6 mt-auto"
        style={{ borderTop: "1px solid #1e293b", backgroundColor: "#0f172a" }}
      >
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div>
            <p className="font-bold text-base" style={{ color: "#dae2fd", fontFamily: "'Hanken Grotesk', sans-serif" }}>MyCommNet</p>
            <p className="text-sm mt-0.5" style={{ color: "#cbc3d7" }}>Stay Connected</p>
          </div>
          <div className="flex flex-wrap gap-8">
            {["Privacy Policy", "Terms of Service", "Help Center"].map((l) => (
              <a key={l} href="#" className="text-xs transition-colors hover:text-white" style={{ color: "#cbc3d7", ...mono }}>
                {l}
              </a>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
}
