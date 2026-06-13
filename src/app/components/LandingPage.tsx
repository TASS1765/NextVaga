import { useState, useEffect } from "react";
import {
  Search, Building2, Users, Zap, Filter, FileText, Bell, BarChart3,
  Brain, MessageSquare, Video, Star, ArrowRight, CheckCircle2, TrendingUp,
  Shield, Clock, Globe, Sparkles, ChevronRight, Play
} from "lucide-react";
import { AreaChart, Area, XAxis, YAxis, ResponsiveContainer, Tooltip } from "recharts";

interface LandingPageProps {
  onNavigate: (page: string) => void;
}

const stats = [
  { label: "Vagas Ativas", value: "+50.000", icon: Zap, color: "#7C3AED" },
  { label: "Empresas", value: "+20.000", icon: Building2, color: "#2563EB" },
  { label: "Candidatos", value: "+500.000", icon: Users, color: "#9333EA" },
  { label: "Contratações", value: "+80.000", icon: CheckCircle2, color: "#10b981" },
];

const features = [
  { icon: Brain, label: "Busca Inteligente por IA", desc: "Matchmaking avançado com algoritmos de IA que conectam o talento certo à vaga ideal." },
  { icon: Filter, label: "Filtros Avançados", desc: "Filtre por salário, localização, modalidade, nível e muito mais." },
  { icon: FileText, label: "Currículo Online", desc: "Editor profissional com exportação em PDF e múltiplos modelos premium." },
  { icon: Bell, label: "Alertas de Vagas", desc: "Notificações em tempo real para vagas que combinam com seu perfil." },
  { icon: BarChart3, label: "Dashboard Analítico", desc: "Acompanhe métricas de candidaturas, visualizações e evolução." },
  { icon: MessageSquare, label: "Chat Integrado", desc: "Comunicação direta entre candidatos e recrutadores na plataforma." },
  { icon: Video, label: "Entrevistas Online", desc: "Sistema de agendamento e videochamadas integradas sem sair da plataforma." },
  { icon: Shield, label: "Banco de Talentos", desc: "Empresas encontram candidatos passivos e constroem pipeline de talentos." },
  { icon: Globe, label: "Vagas Remotas", desc: "Acesso a oportunidades nacionais e internacionais em trabalho remoto." },
];

const candidateSteps = [
  { num: "01", title: "Criar Perfil", desc: "Monte seu perfil profissional completo com foto, experiências e habilidades." },
  { num: "02", title: "Criar Currículo", desc: "Use nosso editor visual para criar um currículo de destaque." },
  { num: "03", title: "Encontrar Vagas", desc: "Nossa IA recomenda vagas compatíveis com seu perfil automaticamente." },
  { num: "04", title: "Candidatar-se", desc: "Candidate-se com um clique e acompanhe o status em tempo real." },
  { num: "05", title: "Ser Contratado", desc: "Receba ofertas, negocie e comece sua nova jornada profissional." },
];

const companySteps = [
  { num: "01", title: "Criar Conta", desc: "Cadastre sua empresa com CNPJ e informações verificadas." },
  { num: "02", title: "Publicar Vagas", desc: "Crie anúncios detalhados com a ajuda da nossa IA." },
  { num: "03", title: "Receber Candidatos", desc: "Receba candidaturas ranqueadas por compatibilidade de IA." },
  { num: "04", title: "Realizar Entrevistas", desc: "Agende e realize entrevistas diretamente na plataforma." },
  { num: "05", title: "Contratar", desc: "Finalize o processo e onboarde seu novo colaborador." },
];

const chartData = [
  { month: "Jan", vagas: 3200, candidatos: 8500 },
  { month: "Fev", vagas: 4100, candidatos: 12000 },
  { month: "Mar", vagas: 5800, candidatos: 18000 },
  { month: "Abr", vagas: 6200, candidatos: 22000 },
  { month: "Mai", vagas: 8100, candidatos: 31000 },
  { month: "Jun", vagas: 9800, candidatos: 42000 },
];

const testimonials = [
  { name: "Ana Lima", role: "Engenheira de Software", company: "TechCorp", avatar: "AL", text: "Encontrei meu emprego dos sonhos em apenas 2 semanas. A IA do NextVaga recomendou vagas perfeitas para o meu perfil!", rating: 5 },
  { name: "Carlos Mendes", role: "Head de RH", company: "Inovação SA", avatar: "CM", text: "Reduzimos o tempo de contratação em 60%. O ranking de candidatos por IA é incrível e muito preciso.", rating: 5 },
  { name: "Fernanda Costa", role: "Designer UX", company: "StartupBR", avatar: "FC", text: "A plataforma é lindíssima e super intuitiva. Me candidatei para 10 vagas em menos de uma hora.", rating: 5 },
];

const floatingCards = [
  { icon: "🚀", title: "Nova vaga", sub: "Senior React Dev — R$18k", color: "#7C3AED" },
  { icon: "✅", title: "Candidatura aprovada", sub: "TechCorp quer conversar", color: "#10b981" },
  { icon: "⭐", title: "Match perfeito!", sub: "98% de compatibilidade", color: "#F59E0B" },
];

export function LandingPage({ onNavigate }: LandingPageProps) {
  const [activeTab, setActiveTab] = useState<"candidate" | "company">("candidate");
  const [searchRole, setSearchRole] = useState("");
  const [searchCity, setSearchCity] = useState("");

  return (
    <div className="min-h-screen" style={{ background: "#09090B" }}>
      {/* Hero */}
      <section className="relative min-h-screen flex items-center overflow-hidden pt-16">
        {/* Background gradients */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-1/4 w-96 h-96 rounded-full opacity-20 blur-3xl" style={{ background: "radial-gradient(circle, #7C3AED, transparent)" }} />
          <div className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full opacity-15 blur-3xl" style={{ background: "radial-gradient(circle, #2563EB, transparent)" }} />
          <div className="absolute top-1/3 right-1/3 w-64 h-64 rounded-full opacity-10 blur-3xl" style={{ background: "radial-gradient(circle, #9333EA, transparent)" }} />
          {/* Grid */}
          <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: "linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)", backgroundSize: "60px 60px" }} />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-20">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left */}
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold mb-6 border" style={{ background: "rgba(124,58,237,0.12)", borderColor: "rgba(124,58,237,0.3)", color: "#A78BFA" }}>
                <Sparkles size={12} />
                Plataforma #1 de Recrutamento com IA no Brasil
              </div>
              <h1 className="mb-6" style={{ fontSize: "clamp(2.5rem, 5vw, 4rem)", fontWeight: 800, lineHeight: 1.05, letterSpacing: "-0.03em", color: "#fff" }}>
                Encontre{" "}
                <span style={{ background: "linear-gradient(135deg, #7C3AED, #2563EB)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                  oportunidades.
                </span>
                <br />
                Contrate{" "}
                <span style={{ background: "linear-gradient(135deg, #9333EA, #7C3AED)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                  talentos.
                </span>
                <br />
                Conecte o{" "}
                <span style={{ background: "linear-gradient(135deg, #2563EB, #7C3AED)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                  futuro.
                </span>
              </h1>
              <p className="mb-8 max-w-lg" style={{ color: "#C4C4C4", fontSize: "1.125rem", lineHeight: 1.7 }}>
                A plataforma inteligente que conecta empresas e profissionais de forma simples, rápida e eficiente — impulsionada por Inteligência Artificial.
              </p>

              {/* Search bar */}
              <div className="flex flex-col sm:flex-row gap-2 p-2 rounded-2xl mb-6" style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)" }}>
                <div className="flex items-center gap-2 flex-1 px-3">
                  <Search size={16} style={{ color: "#C4C4C4" }} />
                  <input
                    placeholder="Cargo ou palavra-chave"
                    value={searchRole}
                    onChange={(e) => setSearchRole(e.target.value)}
                    className="flex-1 bg-transparent outline-none text-sm"
                    style={{ color: "#fff" }}
                  />
                </div>
                <div className="flex items-center gap-2 flex-1 px-3 border-t sm:border-t-0 sm:border-l pt-2 sm:pt-0" style={{ borderColor: "rgba(255,255,255,0.08)" }}>
                  <Globe size={16} style={{ color: "#C4C4C4" }} />
                  <input
                    placeholder="Cidade ou Remoto"
                    value={searchCity}
                    onChange={(e) => setSearchCity(e.target.value)}
                    className="flex-1 bg-transparent outline-none text-sm"
                    style={{ color: "#fff" }}
                  />
                </div>
                <button
                  onClick={() => onNavigate("jobs")}
                  className="px-6 py-2.5 rounded-xl text-sm font-semibold text-white transition-all hover:opacity-90"
                  style={{ background: "linear-gradient(135deg, #7C3AED, #2563EB)" }}
                >
                  Buscar Vagas
                </button>
              </div>

              <div className="flex flex-wrap gap-3">
                <button
                  onClick={() => onNavigate("jobs")}
                  className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold text-white border transition-all hover:bg-white/5"
                  style={{ borderColor: "rgba(255,255,255,0.15)" }}
                >
                  <Search size={15} /> Ver todas as vagas
                </button>
                <button
                  onClick={() => onNavigate("company-dashboard")}
                  className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all hover:opacity-90"
                  style={{ background: "linear-gradient(135deg, #7C3AED, #2563EB)", color: "#fff" }}
                >
                  <Building2 size={15} /> Sou Empresa
                </button>
              </div>

              {/* Testimonial avatars */}
              <div className="flex items-center gap-3 mt-8">
                <div className="flex -space-x-2">
                  {["AL", "CM", "FC", "RB", "JM"].map((init, i) => (
                    <div key={i} className="w-8 h-8 rounded-full border-2 flex items-center justify-center text-xs font-bold" style={{ background: `linear-gradient(135deg, #7C3AED, #2563EB)`, borderColor: "#09090B" }}>{init}</div>
                  ))}
                </div>
                <div>
                  <div className="flex">
                    {[...Array(5)].map((_, i) => <Star key={i} size={12} fill="#F59E0B" color="#F59E0B" />)}
                  </div>
                  <p style={{ color: "#C4C4C4", fontSize: "0.75rem" }}>+500k profissionais confiam no NextVaga</p>
                </div>
              </div>
            </div>

            {/* Right — Visual */}
            <div className="relative hidden lg:block">
              {/* Main card */}
              <div className="relative p-6 rounded-2xl" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", backdropFilter: "blur(20px)" }}>
                <div className="flex items-center justify-between mb-4">
                  <span style={{ color: "#C4C4C4", fontSize: "0.75rem", fontWeight: 500 }}>Crescimento da Plataforma</span>
                  <span style={{ color: "#10b981", fontSize: "0.75rem", fontWeight: 600 }}>+340% esse ano</span>
                </div>
                <ResponsiveContainer width="100%" height={180}>
                  <AreaChart data={chartData}>
                    <defs>
                      <linearGradient id="lgVagas" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#7C3AED" stopOpacity={0.4}/>
                        <stop offset="100%" stopColor="#7C3AED" stopOpacity={0}/>
                      </linearGradient>
                      <linearGradient id="lgCand" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#2563EB" stopOpacity={0.4}/>
                        <stop offset="100%" stopColor="#2563EB" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <XAxis dataKey="month" tick={{ fill: "#C4C4C4", fontSize: 11 }} axisLine={false} tickLine={false} />
                    <YAxis hide />
                    <Tooltip contentStyle={{ background: "#111827", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 8, color: "#fff", fontSize: 12 }} />
                    <Area type="monotone" dataKey="vagas" stroke="#7C3AED" fill="url(#lgVagas)" strokeWidth={2} />
                    <Area type="monotone" dataKey="candidatos" stroke="#2563EB" fill="url(#lgCand)" strokeWidth={2} />
                  </AreaChart>
                </ResponsiveContainer>
                <div className="flex gap-4 mt-2">
                  <div className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full" style={{ background: "#7C3AED" }}/><span style={{ color: "#C4C4C4", fontSize: "0.7rem" }}>Vagas</span></div>
                  <div className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full" style={{ background: "#2563EB" }}/><span style={{ color: "#C4C4C4", fontSize: "0.7rem" }}>Candidatos</span></div>
                </div>
              </div>

              {/* Floating cards */}
              {floatingCards.map((card, i) => (
                <div
                  key={i}
                  className="absolute flex items-center gap-3 px-4 py-3 rounded-xl"
                  style={{
                    background: "rgba(17,24,39,0.95)",
                    border: "1px solid rgba(255,255,255,0.1)",
                    backdropFilter: "blur(20px)",
                    top: i === 0 ? "-40px" : i === 1 ? "auto" : "30%",
                    bottom: i === 1 ? "-40px" : "auto",
                    left: i === 2 ? "-60px" : "auto",
                    right: i === 0 ? "10px" : i === 1 ? "20px" : "auto",
                    boxShadow: `0 8px 32px rgba(0,0,0,0.4)`,
                    animation: `float ${3 + i * 0.5}s ease-in-out infinite alternate`,
                    minWidth: "200px",
                  }}
                >
                  <span className="text-xl">{card.icon}</span>
                  <div>
                    <p style={{ color: "#fff", fontSize: "0.75rem", fontWeight: 600 }}>{card.title}</p>
                    <p style={{ color: "#C4C4C4", fontSize: "0.65rem" }}>{card.sub}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 border-y" style={{ borderColor: "rgba(255,255,255,0.06)" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat, i) => (
              <div key={i} className="text-center p-6 rounded-2xl transition-all hover:scale-105" style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)" }}>
                <div className="w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-3" style={{ background: `${stat.color}20` }}>
                  <stat.icon size={22} style={{ color: stat.color }} />
                </div>
                <p className="mb-1" style={{ fontSize: "2rem", fontWeight: 800, color: "#fff", letterSpacing: "-0.03em" }}>{stat.value}</p>
                <p style={{ color: "#C4C4C4", fontSize: "0.8rem" }}>{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold mb-4 border" style={{ background: "rgba(37,99,235,0.12)", borderColor: "rgba(37,99,235,0.3)", color: "#60A5FA" }}>
              <Clock size={12} /> Como Funciona
            </div>
            <h2 style={{ color: "#fff", fontSize: "clamp(1.8rem, 3.5vw, 2.5rem)" }}>Simples, rápido e eficiente</h2>
            <p className="mt-3 max-w-xl mx-auto" style={{ color: "#C4C4C4" }}>Do cadastro à contratação em poucos passos. Nossa plataforma foi projetada para ser intuitiva e poderosa.</p>
          </div>

          <div className="flex gap-2 justify-center mb-10">
            {(["candidate", "company"] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className="px-6 py-2.5 rounded-xl text-sm font-semibold transition-all"
                style={{
                  background: activeTab === tab ? "linear-gradient(135deg, #7C3AED, #2563EB)" : "rgba(255,255,255,0.05)",
                  color: activeTab === tab ? "#fff" : "#C4C4C4",
                  border: activeTab === tab ? "none" : "1px solid rgba(255,255,255,0.08)",
                }}
              >
                {tab === "candidate" ? "Para Candidatos" : "Para Empresas"}
              </button>
            ))}
          </div>

          <div className="grid sm:grid-cols-3 lg:grid-cols-5 gap-4">
            {(activeTab === "candidate" ? candidateSteps : companySteps).map((step, i) => (
              <div key={i} className="relative text-center p-5 rounded-2xl transition-all hover:scale-105 group" style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)" }}>
                <div className="w-10 h-10 rounded-xl flex items-center justify-center mx-auto mb-4 font-bold text-sm" style={{ background: "linear-gradient(135deg, #7C3AED, #2563EB)", color: "#fff" }}>
                  {step.num}
                </div>
                {i < 4 && (
                  <div className="hidden lg:block absolute top-10 -right-4 z-10">
                    <ChevronRight size={16} style={{ color: "rgba(124,58,237,0.4)" }} />
                  </div>
                )}
                <p style={{ color: "#fff", fontWeight: 600, fontSize: "0.875rem", marginBottom: "0.5rem" }}>{step.title}</p>
                <p style={{ color: "#C4C4C4", fontSize: "0.75rem", lineHeight: 1.6 }}>{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-24" style={{ background: "rgba(255,255,255,0.01)" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold mb-4 border" style={{ background: "rgba(124,58,237,0.12)", borderColor: "rgba(124,58,237,0.3)", color: "#A78BFA" }}>
              <Zap size={12} /> Recursos da Plataforma
            </div>
            <h2 style={{ color: "#fff", fontSize: "clamp(1.8rem, 3.5vw, 2.5rem)" }}>Tudo que você precisa, em um só lugar</h2>
            <p className="mt-3 max-w-xl mx-auto" style={{ color: "#C4C4C4" }}>Ferramentas poderosas impulsionadas por IA para transformar a maneira como você contrata ou se candidata.</p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {features.map((feat, i) => (
              <div key={i} className="p-6 rounded-2xl transition-all duration-300 hover:scale-[1.02] group cursor-pointer" style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)" }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.borderColor = "rgba(124,58,237,0.3)"; (e.currentTarget as HTMLElement).style.background = "rgba(124,58,237,0.05)"; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.06)"; (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.03)"; }}
              >
                <div className="w-11 h-11 rounded-xl flex items-center justify-center mb-4" style={{ background: "rgba(124,58,237,0.15)" }}>
                  <feat.icon size={20} style={{ color: "#A78BFA" }} />
                </div>
                <p style={{ color: "#fff", fontWeight: 600, fontSize: "0.95rem", marginBottom: "0.5rem" }}>{feat.label}</p>
                <p style={{ color: "#C4C4C4", fontSize: "0.8rem", lineHeight: 1.7 }}>{feat.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 style={{ color: "#fff", fontSize: "clamp(1.8rem, 3.5vw, 2.5rem)" }}>O que dizem sobre nós</h2>
            <p className="mt-3" style={{ color: "#C4C4C4" }}>Histórias reais de quem transformou sua carreira com o NextVaga</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {testimonials.map((t, i) => (
              <div key={i} className="p-6 rounded-2xl" style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)" }}>
                <div className="flex mb-3">
                  {[...Array(t.rating)].map((_, s) => <Star key={s} size={14} fill="#F59E0B" color="#F59E0B" />)}
                </div>
                <p style={{ color: "#C4C4C4", fontSize: "0.875rem", lineHeight: 1.7, marginBottom: "1rem" }}>"{t.text}"</p>
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold" style={{ background: "linear-gradient(135deg, #7C3AED, #2563EB)", color: "#fff" }}>{t.avatar}</div>
                  <div>
                    <p style={{ color: "#fff", fontWeight: 600, fontSize: "0.8rem" }}>{t.name}</p>
                    <p style={{ color: "#C4C4C4", fontSize: "0.7rem" }}>{t.role} · {t.company}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <div className="p-12 rounded-3xl relative overflow-hidden" style={{ background: "linear-gradient(135deg, rgba(124,58,237,0.2), rgba(37,99,235,0.2))", border: "1px solid rgba(124,58,237,0.3)" }}>
            <div className="absolute inset-0 pointer-events-none">
              <div className="absolute top-0 left-1/4 w-64 h-64 rounded-full opacity-20 blur-3xl" style={{ background: "#7C3AED" }} />
              <div className="absolute bottom-0 right-1/4 w-64 h-64 rounded-full opacity-20 blur-3xl" style={{ background: "#2563EB" }} />
            </div>
            <div className="relative">
              <h2 className="mb-4" style={{ color: "#fff", fontSize: "clamp(1.5rem, 3vw, 2.25rem)" }}>Pronto para transformar sua carreira?</h2>
              <p className="mb-8 max-w-lg mx-auto" style={{ color: "#C4C4C4" }}>Junte-se a +500.000 profissionais e +20.000 empresas que já usam o NextVaga para conectar talentos.</p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <button onClick={() => onNavigate("register")} className="px-8 py-3.5 rounded-xl font-semibold text-white transition-all hover:opacity-90 hover:scale-105" style={{ background: "linear-gradient(135deg, #7C3AED, #2563EB)" }}>
                  Criar conta grátis
                </button>
                <button onClick={() => onNavigate("jobs")} className="px-8 py-3.5 rounded-xl font-semibold text-white border transition-all hover:bg-white/5" style={{ borderColor: "rgba(255,255,255,0.2)" }}>
                  Ver vagas disponíveis
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <style>{`
        @keyframes float {
          from { transform: translateY(0px); }
          to { transform: translateY(-12px); }
        }
      `}</style>
    </div>
  );
}
