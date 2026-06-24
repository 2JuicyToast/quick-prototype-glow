import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { useAuth } from "@/hooks/useAuth";
import logoAsset from "@/assets/MyCommNet.png.asset.json";

export const Route = createFileRoute("/login")({
  head: () => ({
    meta: [
      { title: "Sign In — MyCommNet" },
      { name: "description", content: "Sign in or create your MyCommNet account." },
    ],
  }),
  component: LoginPage,
});

function LoginPage() {
  const [tab, setTab] = useState<"login" | "signup">("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const { signIn, signUp, user, loading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && user) {
      navigate({ to: "/" });
    }
  }, [user, loading, navigate]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setErrorMsg(null);
    setSuccessMsg(null);
    setSubmitting(true);

    if (tab === "login") {
      const { error } = await signIn(email, password);
      if (error) {
        setErrorMsg(error.message);
      } else {
        navigate({ to: "/" });
      }
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
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="w-full max-w-sm">
        {/* Logo */}
        <div className="mb-8 flex flex-col items-center gap-3">
          <img src={logoAsset.url} alt="MyCommNet" className="h-12 w-12 object-contain" />
          <span className="font-display text-2xl font-bold tracking-tight">
            <span className="text-brand-purple">My</span>
            <span className="text-brand-blue">Comm</span>
            <span className="text-brand-teal">Net</span>
          </span>
          <p className="text-center text-sm text-muted-foreground">
            Your community. Your future.
          </p>
        </div>

        {/* Card */}
        <div className="rounded-3xl border border-border/60 bg-surface p-7 shadow-card-soft">
          {/* Tabs */}
          <div className="mb-6 flex rounded-xl bg-surface-2 p-1">
            {(["login", "signup"] as const).map((t) => (
              <button
                key={t}
                onClick={() => {
                  setTab(t);
                  setErrorMsg(null);
                  setSuccessMsg(null);
                }}
                className={`flex-1 rounded-lg py-2 text-sm font-medium transition ${
                  tab === t
                    ? "bg-background text-foreground shadow-card-soft"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {t === "login" ? "Sign In" : "Sign Up"}
              </button>
            ))}
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {tab === "signup" && (
              <div>
                <label className="mb-1.5 block text-xs font-medium text-muted-foreground">
                  Full name
                </label>
                <input
                  type="text"
                  required
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="Jayden Wilson"
                  className="w-full rounded-xl border border-border bg-background px-4 py-2.5 text-sm outline-none placeholder:text-muted-foreground focus:border-brand-purple"
                />
              </div>
            )}

            <div>
              <label className="mb-1.5 block text-xs font-medium text-muted-foreground">
                Email
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="w-full rounded-xl border border-border bg-background px-4 py-2.5 text-sm outline-none placeholder:text-muted-foreground focus:border-brand-purple"
              />
            </div>

            <div>
              <label className="mb-1.5 block text-xs font-medium text-muted-foreground">
                Password
              </label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                minLength={6}
                className="w-full rounded-xl border border-border bg-background px-4 py-2.5 text-sm outline-none placeholder:text-muted-foreground focus:border-brand-purple"
              />
            </div>

            {errorMsg && (
              <p className="rounded-xl bg-red-500/10 px-4 py-2.5 text-xs text-red-400">
                {errorMsg}
              </p>
            )}

            {successMsg && (
              <p className="rounded-xl bg-brand-teal/10 px-4 py-2.5 text-xs text-brand-teal">
                {successMsg}
              </p>
            )}

            <button
              type="submit"
              disabled={submitting}
              className="w-full rounded-xl bg-gradient-brand py-2.5 text-sm font-semibold text-white shadow-glow-purple transition hover:opacity-90 disabled:opacity-50"
            >
              {submitting
                ? tab === "login"
                  ? "Signing in…"
                  : "Creating account…"
                : tab === "login"
                  ? "Sign In"
                  : "Create Account"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
