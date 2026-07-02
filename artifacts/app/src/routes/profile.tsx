import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, useEffect, useRef } from "react";
import { supabase } from "@/lib/supabase";
import { AppShell } from "@/components/AppShell";
import { ImageCropper } from "@/components/ImageCropper";
import {
  MapPin,
  Link as LinkIcon,
  Bookmark,
  Award,
  Calendar,
  Briefcase,
  GraduationCap,
  Heart,
  Github,
  Linkedin,
  Globe,
  QrCode,
  Shield,
  Settings,
  Edit3,
  SlidersHorizontal,
  Camera,
  ImageIcon,
  ChevronDown,
  ChevronUp,
  AtSign,
} from "lucide-react";
import { useAuth } from "@/hooks/useAuth";

export const Route = createFileRoute("/profile")({
  head: () => ({
    meta: [
      { title: "Profile — MyCommNet" },
      { name: "description", content: "Your community pass, mini portfolio, saved items, and growth timeline." },
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

function parseLocationDisplay(stored: string | null): string {
  if (!stored) return "";
  const parts = stored.split("|");
  if (parts.length >= 2) {
    const [city, state, country, zip] = parts;
    const countryLabel = country === "US" ? "USA" : country === "CA" ? "Canada" : country === "UK" ? "UK" : country === "AU" ? "Australia" : country === "MX" ? "Mexico" : country;
    const cityState = [city, state].filter(Boolean).join(", ");
    const full = [cityState, countryLabel].filter(Boolean).join(", ");
    return zip ? `${full} ${zip}`.trim() : full.trim();
  }
  return stored;
}

function labelChip(text: string, color: string) {
  const clean = text.startsWith("custom:") ? text.slice(7) : text;
  return (
    <span
      key={text}
      className="rounded-full px-2.5 py-0.5 text-xs font-medium"
      style={{ background: `${color}18`, color, border: `1px solid ${color}40` }}
    >
      {clean}
    </span>
  );
}

type UserPrefs = {
  zip_code?: string;
  age_range?: string;
  gender?: string;
  ethnicity?: string;
  life_status?: string;
  occupation?: string;
  personal_interests?: string[];
  career_interests?: string[];
  resource_interests?: string[];
  transportation_modes?: string[];
  engagement_preference?: string;
  content_preference?: string;
};

function SurveySummary({ userId }: { userId: string }) {
  const [prefs, setPrefs] = useState<UserPrefs | null>(null);
  const [open, setOpen] = useState(false);
  const [loaded, setLoaded] = useState(false);

  async function load() {
    if (loaded) { setOpen((o) => !o); return; }
    const { data } = await supabase.from("user_preferences").select("*").eq("user_id", userId).maybeSingle();
    setPrefs(data ?? null);
    setLoaded(true);
    setOpen(true);
  }

  const location = parseLocationDisplay(prefs?.zip_code ?? null);
  const personalInterests = (prefs?.personal_interests ?? []).slice(0, 5);
  const careerInterests = (prefs?.career_interests ?? []).slice(0, 5);
  const resources = (prefs?.resource_interests ?? []).slice(0, 4);

  return (
    <div className="mt-3 rounded-xl overflow-hidden" style={{ border: "1px solid #1e293b" }}>
      <button
        type="button"
        onClick={load}
        className="w-full flex items-center justify-between px-4 py-3 text-sm font-medium transition-colors hover:bg-white/5"
        style={{ color: "#cbc3d7" }}
      >
        <span>My survey summary</span>
        {open ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
      </button>

      {open && (
        <div className="px-4 pb-4 space-y-3 text-xs" style={{ color: "#cbc3d7", borderTop: "1px solid #1e293b" }}>
          {!prefs ? (
            <p className="pt-3 text-muted-foreground">No survey data saved yet.</p>
          ) : (
            <>
              {location && (
                <div className="pt-3 flex items-start gap-2">
                  <MapPin className="h-3.5 w-3.5 mt-0.5 flex-shrink-0" style={{ color: "#4fdbc8" }} />
                  <span>{location}</span>
                </div>
              )}
              {(prefs.age_range || prefs.gender) && (
                <div className="flex flex-wrap gap-2">
                  {prefs.age_range && labelChip(prefs.age_range, "#a078ff")}
                  {prefs.gender && labelChip(prefs.gender, "#a078ff")}
                  {prefs.ethnicity && labelChip(prefs.ethnicity, "#a078ff")}
                </div>
              )}
              {prefs.life_status && (
                <div>
                  <p className="text-[10px] uppercase tracking-wider mb-1" style={{ color: "#958ea0" }}>Situation</p>
                  <p>{prefs.life_status}{prefs.occupation ? ` · ${prefs.occupation}` : ""}</p>
                </div>
              )}
              {personalInterests.length > 0 && (
                <div>
                  <p className="text-[10px] uppercase tracking-wider mb-1.5" style={{ color: "#958ea0" }}>Personal interests</p>
                  <div className="flex flex-wrap gap-1.5">{personalInterests.map((t) => labelChip(t, "#4fdbc8"))}</div>
                </div>
              )}
              {careerInterests.length > 0 && (
                <div>
                  <p className="text-[10px] uppercase tracking-wider mb-1.5" style={{ color: "#958ea0" }}>Career interests</p>
                  <div className="flex flex-wrap gap-1.5">{careerInterests.map((t) => labelChip(t, "#0566d9"))}</div>
                </div>
              )}
              {resources.length > 0 && (
                <div>
                  <p className="text-[10px] uppercase tracking-wider mb-1.5" style={{ color: "#958ea0" }}>Resources needed</p>
                  <div className="flex flex-wrap gap-1.5">{resources.map((t) => labelChip(t, "#f97316"))}</div>
                </div>
              )}
              {prefs.engagement_preference && (
                <div>
                  <p className="text-[10px] uppercase tracking-wider mb-1" style={{ color: "#958ea0" }}>Engagement style</p>
                  <p>{prefs.engagement_preference}</p>
                </div>
              )}
            </>
          )}
        </div>
      )}
    </div>
  );
}

function ProfilePage() {
  const { user, profile, refreshProfile } = useAuth();
  const [userLocation, setUserLocation] = useState<string>("");
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);
  const [bannerUrl, setBannerUrl] = useState<string | null>(null);
  const [uploadingAvatar, setUploadingAvatar] = useState(false);
  const [uploadingBanner, setUploadingBanner] = useState(false);
  const [uploadErr, setUploadErr] = useState<string | null>(null);
  const [cropFile, setCropFile] = useState<File | null>(null);
  const [cropMode, setCropMode] = useState<"avatar" | "banner" | null>(null);
  const avatarInputRef = useRef<HTMLInputElement>(null);
  const bannerInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!user) return;
    supabase
      .from("user_preferences")
      .select("zip_code")
      .eq("user_id", user.id)
      .single()
      .then(({ data }) => {
        if (data?.zip_code) setUserLocation(parseLocationDisplay(data.zip_code));
      });
  }, [user]);

  useEffect(() => {
    if (profile?.avatar_url) setAvatarUrl(profile.avatar_url);
    if (profile?.banner_url) setBannerUrl(profile.banner_url);
  }, [profile]);

  function openAvatarPicker() { avatarInputRef.current?.click(); }
  function openBannerPicker() { bannerInputRef.current?.click(); }

  function handleAvatarFileSelected(file: File) {
    setCropFile(file);
    setCropMode("avatar");
  }

  function handleBannerFileSelected(file: File) {
    setCropFile(file);
    setCropMode("banner");
  }

  async function uploadAvatarBlob(blob: Blob) {
    if (!user) return;
    setCropFile(null);
    setCropMode(null);
    setUploadingAvatar(true);
    setUploadErr(null);
    try {
      const path = `${user.id}/avatar-${Date.now()}.jpg`;
      const { error: upErr } = await supabase.storage.from("avatars").upload(path, blob, { contentType: "image/jpeg" });
      if (upErr) throw upErr;
      const { data } = supabase.storage.from("avatars").getPublicUrl(path);
      const url = data.publicUrl;
      setAvatarUrl(url);
      await supabase.from("profiles").update({ avatar_url: url }).eq("id", user.id);
      await refreshProfile();
    } catch (e: any) {
      setUploadErr(e?.message ?? "Upload failed. Make sure the 'avatars' bucket exists in Supabase Storage.");
    }
    setUploadingAvatar(false);
  }

  async function uploadBannerBlob(blob: Blob) {
    if (!user) return;
    setCropFile(null);
    setCropMode(null);
    setUploadingBanner(true);
    setUploadErr(null);
    try {
      const path = `${user.id}/banner-${Date.now()}.jpg`;
      const { error: upErr } = await supabase.storage.from("banners").upload(path, blob, { contentType: "image/jpeg" });
      if (upErr) throw upErr;
      const { data } = supabase.storage.from("banners").getPublicUrl(path);
      const url = data.publicUrl;
      setBannerUrl(url);
      await supabase.from("profiles").update({ banner_url: url }).eq("id", user.id);
      await refreshProfile();
    } catch (e: any) {
      setUploadErr(e?.message ?? "Upload failed. Make sure the 'banners' bucket exists in Supabase Storage.");
    }
    setUploadingBanner(false);
  }

  const fullName =
    profile?.full_name ??
    user?.user_metadata?.full_name ??
    user?.email?.split("@")[0] ??
    "Community Member";

  const rawUsername =
    profile?.username ??
    user?.user_metadata?.username ??
    null;

  const username = rawUsername ?? (user ? `user${user.id.replace(/-/g, "").slice(0, 8)}` : null);

  const initial = fullName.charAt(0).toUpperCase();
  const verifiedHours = profile?.verified_hours ?? 36;
  const eventsAttended = profile?.events_attended ?? 12;
  const location = userLocation || profile?.location || "";
  const joinYear = user?.created_at ? new Date(user.created_at).getFullYear() : 2025;
  const bio =
    profile?.bio ??
    "Atlanta-based community member passionate about closing local access gaps to Wi-Fi, mentorship, and first jobs. Always looking for new volunteer opportunities, study spaces, and friendly mentors who've walked the road before.";

  return (
    <AppShell>
      {/* Hidden file inputs */}
      <input
        ref={avatarInputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={(e) => { const f = e.target.files?.[0]; if (f) handleAvatarFileSelected(f); e.target.value = ""; }}
      />
      <input
        ref={bannerInputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={(e) => { const f = e.target.files?.[0]; if (f) handleBannerFileSelected(f); e.target.value = ""; }}
      />

      {/* Crop modal */}
      {cropFile && cropMode === "avatar" && (
        <ImageCropper
          file={cropFile}
          aspect={1}
          shape="round"
          title="Crop profile picture"
          onDone={uploadAvatarBlob}
          onCancel={() => { setCropFile(null); setCropMode(null); }}
        />
      )}
      {cropFile && cropMode === "banner" && (
        <ImageCropper
          file={cropFile}
          aspect={16 / 6}
          shape="rect"
          title="Crop cover photo"
          onDone={uploadBannerBlob}
          onCancel={() => { setCropFile(null); setCropMode(null); }}
        />
      )}

      {uploadErr && (
        <div className="mb-4 rounded-xl px-4 py-3 text-xs" style={{ background: "rgba(147,0,10,0.2)", color: "#ffb4ab", border: "1px solid rgba(147,0,10,0.4)" }}>
          {uploadErr}
        </div>
      )}

      {/* Cover + identity */}
      <section className="relative mb-6 overflow-hidden rounded-3xl border border-border/60">
        {/* Banner */}
        <div className="relative h-44 md:h-56 group cursor-pointer" onClick={() => bannerInputRef.current?.click()}>
          {bannerUrl
            ? <img src={bannerUrl} alt="Profile banner" className="w-full h-full object-cover" />
            : <div className="w-full h-full bg-gradient-brand bg-hero-glow" />
          }
          <div className="absolute inset-0 bg-[radial-gradient(120%_80%_at_100%_0%,oklch(0.72_0.13_185/0.35),transparent_60%)]" />
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity" style={{ background: "rgba(0,0,0,0.35)" }}>
            <div className="flex items-center gap-2 text-white text-sm font-medium">
              {uploadingBanner ? "Uploading…" : <><ImageIcon className="h-4 w-4" /> Change cover photo</>}
            </div>
          </div>
        </div>

        <div className="-mt-16 px-6 pb-6 md:-mt-20 md:px-10 md:pb-8">
          <div className="flex flex-col items-start gap-5 md:flex-row md:items-end md:justify-between">
            <div className="flex items-end gap-4">
              {/* Avatar */}
              <div className="relative group cursor-pointer" onClick={() => avatarInputRef.current?.click()}>
                {avatarUrl
                  ? (
                    <img
                      src={avatarUrl}
                      alt={fullName}
                      className="h-28 w-28 md:h-32 md:w-32 rounded-3xl border-4 object-cover shadow-glow-purple"
                      style={{ borderColor: "var(--background)" }}
                    />
                  )
                  : (
                    <span className="grid h-28 w-28 place-items-center rounded-3xl border-4 border-background bg-gradient-brand font-display text-4xl font-bold text-white shadow-glow-purple md:h-32 md:w-32">
                      {initial}
                    </span>
                  )
                }
                <div
                  className="absolute inset-0 rounded-3xl flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                  style={{ background: "rgba(0,0,0,0.5)" }}
                >
                  {uploadingAvatar
                    ? <span className="text-white text-[10px]">Uploading…</span>
                    : <Camera className="h-6 w-6 text-white" />
                  }
                </div>
              </div>

              <div className="pb-2">
                <div className="flex items-center gap-2 flex-wrap">
                  <h1 className="font-display text-3xl font-bold tracking-tight md:text-4xl">
                    {fullName}
                  </h1>
                  <span className="inline-flex items-center gap-1 rounded-full bg-brand-teal/15 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-brand-teal">
                    <Shield className="h-3 w-3" /> Verified
                  </span>
                </div>
                {username && (
                  <p className="mt-0.5 flex items-center gap-1 text-sm font-medium" style={{ color: "#a078ff" }}>
                    <AtSign className="h-3.5 w-3.5" />{username}
                  </p>
                )}
                <p className="mt-0.5 text-sm text-muted-foreground">Community Member</p>
                <p className="mt-1 flex items-center gap-1 text-xs text-muted-foreground">
                  <MapPin className="h-3 w-3" /> {location || "Location not set"} · joined {joinYear}
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
        {/* Left */}
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
              {username && <p className="text-xs text-white/60">@{username}</p>}
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

          {/* Personalization */}
          <section className="rounded-2xl border border-border/60 bg-surface p-5">
            <h3 className="mb-1 flex items-center gap-2 font-display text-base font-semibold">
              <SlidersHorizontal className="h-4 w-4 text-brand-purple" /> Personalization
            </h3>
            {!profile?.onboarding_complete ? (
              <p className="mb-4 text-xs text-muted-foreground leading-relaxed">
                Complete your profile survey so we can tailor recommendations, resources, and community matches just for you.
              </p>
            ) : (
              <p className="mb-4 text-xs text-muted-foreground leading-relaxed">
                Update your interests, situation, and preferences any time to keep your recommendations fresh.
              </p>
            )}
            <Link
              to="/onboarding"
              search={{ mode: "edit" }}
              className="flex items-center justify-center gap-2 w-full rounded-xl py-2.5 text-sm font-bold text-white transition-all hover:brightness-110 active:scale-[0.98]"
              style={{ background: "linear-gradient(135deg,#a078ff 0%,#0566d9 100%)" }}
            >
              <SlidersHorizontal className="h-4 w-4" />
              {profile?.onboarding_complete ? "Edit My Preferences" : "Take the Survey"}
            </Link>

            {/* Survey summary — always shown if user exists */}
            {user && <SurveySummary userId={user.id} />}
          </section>
        </div>

        {/* Right */}
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
