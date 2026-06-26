import { Link } from "@tanstack/react-router";

type ActivePage = "home" | "about" | "features";

export function PublicNav({ activePage }: { activePage: ActivePage }) {
  const hanken = { fontFamily: "'Hanken Grotesk', sans-serif" };

  const navLink = (label: string, page: ActivePage, to: string) => {
    const isActive = activePage === page;
    return (
      <Link
        to={to as any}
        className="text-sm transition-colors"
        style={{
          color: isActive ? "#d0bcff" : "#cbc3d7",
          fontWeight: isActive ? 700 : 500,
          borderBottom: isActive ? "2px solid #d0bcff" : "2px solid transparent",
          paddingBottom: 4,
        }}
      >
        {label}
      </Link>
    );
  };

  return (
    <nav
      className="fixed top-0 left-0 w-full z-50 flex justify-between items-center px-6 h-[72px] backdrop-blur-lg"
      style={{ backgroundColor: "rgba(11,19,38,0.85)", borderBottom: "1px solid rgba(30,41,59,0.8)" }}
    >
      <div className="flex items-center gap-3">
        <img
          src="/logo.png"
          alt="MyCommNet Logo"
          className="h-10 w-10 rounded-full object-cover"
          style={{ boxShadow: "0 0 12px rgba(160,120,255,0.5)" }}
        />
        <span className="text-xl font-black tracking-tight" style={hanken}>
          <span style={{ color: "#a078ff" }}>My</span>
          <span style={{ color: "#0566d9" }}>Comm</span>
          <span style={{ color: "#4fdbc8" }}>Net</span>
        </span>
      </div>

      <div className="hidden md:flex items-center gap-8">
        {navLink("Home", "home", "/")}
        {navLink("About", "about", "/about")}
        {navLink("Features", "features", "/features")}
      </div>

      <div className="flex items-center gap-3">
        <Link
          to="/login"
          className="px-4 py-2 rounded-lg text-sm transition-all hover:text-white"
          style={{ color: "#cbc3d7", border: "1px solid transparent" }}
        >
          Log In
        </Link>
        <Link
          to="/login"
          search={{ tab: "signup" } as any}
          className="px-5 py-2 rounded-lg text-sm font-semibold transition-all hover:brightness-110"
          style={{ background: "#a078ff", color: "#23005c", boxShadow: "0 4px 12px rgba(160,120,255,0.3)" }}
        >
          Sign Up
        </Link>
      </div>
    </nav>
  );
}
