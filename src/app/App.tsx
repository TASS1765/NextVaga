import { useState } from "react";
import { Navbar } from "./components/Navbar";
import { LandingPage } from "./components/LandingPage";
import { JobSearch } from "./components/JobSearch";
import { CandidateDashboard } from "./components/CandidateDashboard";
import { CompanyDashboard } from "./components/CompanyDashboard";
import { PlansPage } from "./components/PlansPage";
import { AuthPages } from "./components/AuthPages";
import { Footer } from "./components/Footer";

type Page =
  | "landing"
  | "jobs"
  | "companies"
  | "about"
  | "plans"
  | "contact"
  | "login"
  | "register"
  | "candidate-dashboard"
  | "company-dashboard";

const PAGES_WITHOUT_FOOTER = ["candidate-dashboard", "company-dashboard", "login", "register"];
const PAGES_WITHOUT_NAVBAR = ["candidate-dashboard", "company-dashboard"];

export default function App() {
  const [page, setPage] = useState<Page>("landing");

  const navigate = (p: string) => {
    setPage(p as Page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const isLoggedIn = page === "candidate-dashboard" || page === "company-dashboard";
  const userType = page === "company-dashboard" ? "company" : "candidate";

  const showNavbar = !PAGES_WITHOUT_NAVBAR.includes(page);
  const showFooter = !PAGES_WITHOUT_FOOTER.includes(page);

  const renderPage = () => {
    switch (page) {
      case "landing":
        return <LandingPage onNavigate={navigate} />;
      case "jobs":
        return <JobSearch onNavigate={navigate} />;
      case "companies":
        return <CompaniesPage onNavigate={navigate} />;
      case "about":
        return <AboutPage onNavigate={navigate} />;
      case "plans":
        return <PlansPage onNavigate={navigate} />;
      case "contact":
        return <ContactPage onNavigate={navigate} />;
      case "login":
        return <AuthPages page="login" onNavigate={navigate} />;
      case "register":
        return <AuthPages page="register" onNavigate={navigate} />;
      case "candidate-dashboard":
        return <CandidateDashboard onNavigate={navigate} />;
      case "company-dashboard":
        return <CompanyDashboard onNavigate={navigate} />;
      default:
        return <LandingPage onNavigate={navigate} />;
    }
  };

  return (
    <div className="min-h-screen" style={{ background: "#09090B" }}>
      {showNavbar && (
        <Navbar
          currentPage={page}
          onNavigate={navigate}
          isLoggedIn={isLoggedIn}
          userType={userType as "candidate" | "company"}
        />
      )}

      <main style={{ animation: "pageFade 0.2s ease" }}>
        {renderPage()}
      </main>

      {showFooter && <Footer onNavigate={navigate} />}

      <style>{`
        @keyframes pageFade {
          from { opacity: 0; transform: translateY(8px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}

function CompaniesPage({ onNavigate }: { onNavigate: (p: string) => void }) {
  const companies = [
    { name: "TechCorp", sector: "Tecnologia", size: "51–200", logo: "TC", openJobs: 8, location: "São Paulo", color: "#7C3AED" },
    { name: "Inovação SA", sector: "Consultoria", size: "201–500", logo: "IS", openJobs: 5, location: "Rio de Janeiro", color: "#2563EB" },
    { name: "StartupBR", sector: "Fintech", size: "11–50", logo: "SB", openJobs: 12, location: "Curitiba", color: "#10b981" },
    { name: "CloudBrasil", sector: "Cloud/Infra", size: "51–200", logo: "CB", openJobs: 6, location: "Remoto", color: "#F59E0B" },
    { name: "FinTech ABC", sector: "Finanças", size: "201–500", logo: "FA", openJobs: 9, location: "São Paulo", color: "#9333EA" },
    { name: "MicroServ", sector: "SaaS", size: "51–200", logo: "MS", openJobs: 4, location: "Remoto", color: "#06b6d4" },
    { name: "AIBrasil", sector: "IA/ML", size: "11–50", logo: "AI", openJobs: 15, location: "São Paulo", color: "#7C3AED" },
    { name: "UXLab", sector: "Design", size: "11–50", logo: "UX", openJobs: 3, location: "Remoto", color: "#2563EB" },
  ];

  return (
    <div className="min-h-screen pt-24 pb-16" style={{ background: "#09090B" }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 style={{ color: "#fff", fontSize: "clamp(1.75rem, 3.5vw, 2.5rem)", fontWeight: 800 }}>Empresas</h1>
          <p style={{ color: "#C4C4C4", marginTop: "0.5rem" }}>Conheça as empresas que contratam pelo NextVaga</p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {companies.map((c, i) => (
            <div key={i} className="p-5 rounded-2xl cursor-pointer transition-all hover:scale-[1.02]" style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)" }}>
              <div className="w-12 h-12 rounded-2xl flex items-center justify-center text-sm font-bold mb-4" style={{ background: `${c.color}20`, color: c.color, border: `1px solid ${c.color}30` }}>{c.logo}</div>
              <p style={{ color: "#fff", fontWeight: 700, fontSize: "0.95rem" }}>{c.name}</p>
              <p style={{ color: "#C4C4C4", fontSize: "0.75rem" }}>{c.sector} · {c.size} func.</p>
              <p style={{ color: "#C4C4C4", fontSize: "0.75rem", marginTop: "0.25rem" }}>{c.location}</p>
              <div className="flex items-center justify-between mt-4">
                <span style={{ color: "#10b981", fontSize: "0.78rem", fontWeight: 600 }}>{c.openJobs} vagas abertas</span>
                <button onClick={() => onNavigate("jobs")} className="text-xs px-3 py-1.5 rounded-lg transition-all" style={{ background: "rgba(255,255,255,0.06)", color: "#C4C4C4", border: "1px solid rgba(255,255,255,0.08)" }}>Ver vagas</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function AboutPage({ onNavigate }: { onNavigate: (p: string) => void }) {
  return (
    <div className="min-h-screen pt-24 pb-16" style={{ background: "#09090B" }}>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 style={{ color: "#fff", fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 800 }}>Sobre o NextVaga</h1>
          <p className="mt-4 max-w-2xl mx-auto" style={{ color: "#C4C4C4", lineHeight: 1.8 }}>
            Somos uma plataforma de recrutamento de nova geração, nascida em 2023 com a missão de transformar a forma como empresas e talentos se conectam — usando Inteligência Artificial para tornar o processo mais humano, justo e eficiente.
          </p>
        </div>

        <div className="grid sm:grid-cols-3 gap-4 mb-12">
          {[
            { value: "+500k", label: "Profissionais cadastrados" },
            { value: "+20k", label: "Empresas parceiras" },
            { value: "98%", label: "Taxa de satisfação" },
          ].map((s, i) => (
            <div key={i} className="text-center p-6 rounded-2xl" style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)" }}>
              <p style={{ color: "#fff", fontSize: "2rem", fontWeight: 800, letterSpacing: "-0.03em" }}>{s.value}</p>
              <p style={{ color: "#C4C4C4", fontSize: "0.8rem" }}>{s.label}</p>
            </div>
          ))}
        </div>

        <div className="p-8 rounded-2xl mb-6" style={{ background: "rgba(124,58,237,0.08)", border: "1px solid rgba(124,58,237,0.2)" }}>
          <h2 style={{ color: "#fff", fontWeight: 700, fontSize: "1.25rem", marginBottom: "0.75rem" }}>Nossa Missão</h2>
          <p style={{ color: "#C4C4C4", lineHeight: 1.8 }}>Democratizar o acesso a oportunidades de emprego de qualidade, tornando o processo de recrutamento mais transparente, eficiente e humano através da tecnologia. Acreditamos que o talento certo na empresa certa transforma carreiras e organizações.</p>
        </div>

        <div className="flex justify-center">
          <button onClick={() => onNavigate("register")} className="px-8 py-3.5 rounded-xl font-semibold text-white text-sm" style={{ background: "linear-gradient(135deg, #7C3AED, #2563EB)" }}>
            Junte-se ao NextVaga
          </button>
        </div>
      </div>
    </div>
  );
}

function ContactPage({ onNavigate }: { onNavigate: (p: string) => void }) {
  const [sent, setSent] = useState(false);
  return (
    <div className="min-h-screen pt-24 pb-16" style={{ background: "#09090B" }}>
      <div className="max-w-2xl mx-auto px-4">
        <div className="text-center mb-10">
          <h1 style={{ color: "#fff", fontSize: "clamp(1.75rem, 3.5vw, 2.5rem)", fontWeight: 800 }}>Fale conosco</h1>
          <p style={{ color: "#C4C4C4", marginTop: "0.5rem" }}>Nossa equipe responde em até 24 horas</p>
        </div>

        {sent ? (
          <div className="text-center p-10 rounded-2xl" style={{ background: "rgba(16,185,129,0.08)", border: "1px solid rgba(16,185,129,0.2)" }}>
            <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4" style={{ background: "rgba(16,185,129,0.15)" }}>
              <svg width="32" height="32" viewBox="0 0 32 32" fill="none"><path d="M6 16l8 8 12-14" stroke="#10b981" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </div>
            <p style={{ color: "#fff", fontWeight: 700, fontSize: "1.125rem", marginBottom: "0.5rem" }}>Mensagem enviada!</p>
            <p style={{ color: "#C4C4C4", fontSize: "0.875rem" }}>Entraremos em contato em breve pelo seu email.</p>
          </div>
        ) : (
          <div className="p-8 rounded-2xl" style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)" }}>
            <div className="flex flex-col gap-4">
              {[{ label: "Nome", placeholder: "Carlos Lima", type: "text" }, { label: "Email", placeholder: "carlos@email.com", type: "email" }, { label: "Assunto", placeholder: "Como podemos ajudar?", type: "text" }].map(f => (
                <div key={f.label}>
                  <label style={{ color: "#C4C4C4", fontSize: "0.75rem", fontWeight: 600, display: "block", marginBottom: "0.5rem" }}>{f.label}</label>
                  <input type={f.type} placeholder={f.placeholder} className="w-full px-4 py-2.5 rounded-xl text-sm outline-none" style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)", color: "#fff" }} />
                </div>
              ))}
              <div>
                <label style={{ color: "#C4C4C4", fontSize: "0.75rem", fontWeight: 600, display: "block", marginBottom: "0.5rem" }}>Mensagem</label>
                <textarea rows={5} placeholder="Descreva sua dúvida ou sugestão..." className="w-full px-4 py-2.5 rounded-xl text-sm outline-none resize-none" style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)", color: "#fff" }} />
              </div>
              <button onClick={() => setSent(true)} className="w-full py-3.5 rounded-xl font-semibold text-sm text-white transition-all hover:opacity-90" style={{ background: "linear-gradient(135deg, #7C3AED, #2563EB)" }}>
                Enviar mensagem
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
