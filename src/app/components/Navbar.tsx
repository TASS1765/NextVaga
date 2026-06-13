import { useState, useEffect } from "react";
import { Menu, X, ChevronDown, Bell, User } from "lucide-react";
import { Logo } from "./Logo";

interface NavbarProps {
  currentPage: string;
  onNavigate: (page: string) => void;
  isLoggedIn?: boolean;
  userType?: "candidate" | "company";
}

export function Navbar({ currentPage, onNavigate, isLoggedIn, userType }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  const links = [
    { label: "Início", page: "landing" },
    { label: "Vagas", page: "jobs" },
    { label: "Empresas", page: "companies" },
    { label: "Sobre", page: "about" },
    { label: "Planos", page: "plans" },
    { label: "Contato", page: "contact" },
  ];

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
      style={{
        background: scrolled ? "rgba(9,9,11,0.92)" : "transparent",
        backdropFilter: scrolled ? "blur(20px)" : "none",
        borderBottom: scrolled ? "1px solid rgba(255,255,255,0.06)" : "none",
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <button onClick={() => onNavigate("landing")} className="focus:outline-none">
            <Logo size={32} showText />
          </button>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center gap-1">
            {links.map((link) => (
              <button
                key={link.page}
                onClick={() => onNavigate(link.page)}
                className="px-3 py-2 rounded-lg text-sm transition-all duration-200"
                style={{
                  color: currentPage === link.page ? "#fff" : "#C4C4C4",
                  background: currentPage === link.page ? "rgba(124,58,237,0.15)" : "transparent",
                  fontWeight: currentPage === link.page ? 600 : 400,
                }}
                onMouseEnter={(e) => {
                  if (currentPage !== link.page) {
                    (e.target as HTMLElement).style.color = "#fff";
                    (e.target as HTMLElement).style.background = "rgba(255,255,255,0.05)";
                  }
                }}
                onMouseLeave={(e) => {
                  if (currentPage !== link.page) {
                    (e.target as HTMLElement).style.color = "#C4C4C4";
                    (e.target as HTMLElement).style.background = "transparent";
                  }
                }}
              >
                {link.label}
              </button>
            ))}
          </div>

          {/* Actions */}
          <div className="hidden md:flex items-center gap-3">
            {isLoggedIn ? (
              <>
                <button className="p-2 rounded-lg text-[#C4C4C4] hover:text-white hover:bg-white/5 transition-all">
                  <Bell size={18} />
                </button>
                <button
                  onClick={() => onNavigate(userType === "company" ? "company-dashboard" : "candidate-dashboard")}
                  className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-sm text-white hover:bg-white/10 transition-all"
                >
                  <div className="w-6 h-6 rounded-full bg-gradient-to-br from-[#7C3AED] to-[#2563EB] flex items-center justify-center text-xs font-bold">
                    {userType === "company" ? "E" : "C"}
                  </div>
                  Dashboard
                  <ChevronDown size={14} />
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={() => onNavigate("login")}
                  className="px-4 py-2 rounded-lg text-sm text-[#C4C4C4] hover:text-white transition-colors"
                >
                  Entrar
                </button>
                <button
                  onClick={() => onNavigate("register")}
                  className="px-4 py-2 rounded-lg text-sm font-semibold text-white transition-all hover:opacity-90 hover:scale-105"
                  style={{ background: "linear-gradient(135deg, #7C3AED, #2563EB)" }}
                >
                  Começar Agora
                </button>
              </>
            )}
          </div>

          {/* Mobile toggle */}
          <button
            className="md:hidden p-2 text-white"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div
          className="md:hidden border-t"
          style={{ background: "rgba(9,9,11,0.98)", borderColor: "rgba(255,255,255,0.06)", backdropFilter: "blur(20px)" }}
        >
          <div className="px-4 py-4 flex flex-col gap-1">
            {links.map((link) => (
              <button
                key={link.page}
                onClick={() => { onNavigate(link.page); setMobileOpen(false); }}
                className="px-3 py-2.5 rounded-lg text-sm text-left transition-all"
                style={{ color: currentPage === link.page ? "#fff" : "#C4C4C4", background: currentPage === link.page ? "rgba(124,58,237,0.15)" : "transparent" }}
              >
                {link.label}
              </button>
            ))}
            <div className="mt-3 pt-3 border-t flex flex-col gap-2" style={{ borderColor: "rgba(255,255,255,0.08)" }}>
              <button onClick={() => { onNavigate("login"); setMobileOpen(false); }} className="px-4 py-2.5 rounded-lg text-sm text-center text-[#C4C4C4] border border-white/10">Entrar</button>
              <button onClick={() => { onNavigate("register"); setMobileOpen(false); }} className="px-4 py-2.5 rounded-lg text-sm text-center text-white font-semibold" style={{ background: "linear-gradient(135deg, #7C3AED, #2563EB)" }}>Começar Agora</button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
