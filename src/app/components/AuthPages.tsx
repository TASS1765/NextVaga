import { useState } from "react";
import { Eye, EyeOff, ArrowLeft } from "lucide-react";
import { Logo } from "./Logo";

interface AuthPagesProps {
  page: "login" | "register";
  onNavigate: (page: string) => void;
}

export function AuthPages({ page, onNavigate }: AuthPagesProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [userType, setUserType] = useState<"candidate" | "company">("candidate");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      onNavigate(userType === "candidate" ? "candidate-dashboard" : "company-dashboard");
    }, 1200);
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 relative" style={{ background: "#09090B" }}>
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 rounded-full opacity-15 blur-3xl" style={{ background: "radial-gradient(circle, #7C3AED, transparent)" }} />
        <div className="absolute bottom-0 right-1/4 w-80 h-80 rounded-full opacity-10 blur-3xl" style={{ background: "radial-gradient(circle, #2563EB, transparent)" }} />
      </div>

      <div className="w-full max-w-md relative">
        <button onClick={() => onNavigate("landing")} className="flex items-center gap-2 mb-6 text-sm transition-colors hover:text-white" style={{ color: "#C4C4C4" }}>
          <ArrowLeft size={16} /> Voltar ao início
        </button>

        <div className="p-8 rounded-2xl" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", backdropFilter: "blur(20px)" }}>
          <div className="flex justify-center mb-6">
            <Logo size={36} showText />
          </div>

          <h2 className="text-center mb-1" style={{ color: "#fff", fontSize: "1.25rem", fontWeight: 700 }}>
            {page === "login" ? "Bem-vindo de volta" : "Criar sua conta"}
          </h2>
          <p className="text-center mb-6" style={{ color: "#C4C4C4", fontSize: "0.875rem" }}>
            {page === "login" ? "Entre na sua conta NextVaga" : "Junte-se a +500.000 profissionais"}
          </p>

          {/* Social auth */}
          <div className="flex gap-3 mb-5">
            {[{ label: "Google", icon: "G" }, { label: "LinkedIn", icon: "in" }].map(s => (
              <button key={s.label} className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm transition-all hover:bg-white/10" style={{ border: "1px solid rgba(255,255,255,0.1)", color: "#C4C4C4" }}>
                <span className="font-bold text-base">{s.icon}</span>{s.label}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-3 mb-5">
            <div className="flex-1 h-px" style={{ background: "rgba(255,255,255,0.08)" }} />
            <span style={{ color: "#C4C4C4", fontSize: "0.75rem" }}>ou</span>
            <div className="flex-1 h-px" style={{ background: "rgba(255,255,255,0.08)" }} />
          </div>

          {page === "register" && (
            <>
              {/* User type */}
              <div className="flex gap-2 mb-4">
                {(["candidate", "company"] as const).map(type => (
                  <button key={type} onClick={() => setUserType(type)} className="flex-1 py-2.5 rounded-xl text-sm font-semibold transition-all" style={{ background: userType === type ? "linear-gradient(135deg, #7C3AED, #2563EB)" : "rgba(255,255,255,0.05)", color: "#fff", border: userType === type ? "none" : "1px solid rgba(255,255,255,0.08)" }}>
                    {type === "candidate" ? "Sou Candidato" : "Sou Empresa"}
                  </button>
                ))}
              </div>

              <div className="mb-3">
                <label style={{ color: "#C4C4C4", fontSize: "0.75rem", fontWeight: 500, display: "block", marginBottom: "0.5rem" }}>
                  {userType === "candidate" ? "Nome completo" : "Nome da empresa"}
                </label>
                <input value={name} onChange={e => setName(e.target.value)} placeholder={userType === "candidate" ? "Carlos Lima" : "TechCorp Ltda"} className="w-full px-4 py-2.5 rounded-xl text-sm outline-none focus:ring-1 focus:ring-[#7C3AED]" style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)", color: "#fff" }} />
              </div>
            </>
          )}

          <div className="mb-3">
            <label style={{ color: "#C4C4C4", fontSize: "0.75rem", fontWeight: 500, display: "block", marginBottom: "0.5rem" }}>Email</label>
            <input value={email} onChange={e => setEmail(e.target.value)} type="email" placeholder="carlos@email.com" className="w-full px-4 py-2.5 rounded-xl text-sm outline-none" style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)", color: "#fff" }} />
          </div>

          <div className="mb-5">
            <label style={{ color: "#C4C4C4", fontSize: "0.75rem", fontWeight: 500, display: "block", marginBottom: "0.5rem" }}>Senha</label>
            <div className="relative">
              <input value={password} onChange={e => setPassword(e.target.value)} type={showPassword ? "text" : "password"} placeholder="••••••••" className="w-full px-4 py-2.5 rounded-xl text-sm outline-none pr-10" style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)", color: "#fff" }} />
              <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2" style={{ color: "#C4C4C4" }}>
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>

          {page === "login" && (
            <div className="flex justify-end mb-4">
              <button style={{ color: "#A78BFA", fontSize: "0.75rem" }}>Esqueci minha senha</button>
            </div>
          )}

          <button onClick={handleSubmit} disabled={loading} className="w-full py-3 rounded-xl font-semibold text-sm text-white transition-all hover:opacity-90 disabled:opacity-50" style={{ background: "linear-gradient(135deg, #7C3AED, #2563EB)" }}>
            {loading ? <span className="inline-flex items-center gap-2"><span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"/>Aguarde...</span> : page === "login" ? "Entrar" : "Criar conta"}
          </button>

          <p className="text-center mt-4" style={{ color: "#C4C4C4", fontSize: "0.8rem" }}>
            {page === "login" ? "Não tem conta? " : "Já tem conta? "}
            <button onClick={() => onNavigate(page === "login" ? "register" : "login")} style={{ color: "#A78BFA", fontWeight: 600 }}>
              {page === "login" ? "Criar conta grátis" : "Entrar"}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}
