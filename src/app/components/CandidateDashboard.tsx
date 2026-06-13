import { useState } from "react";
import {
  Home, User, FileText, Send, Bookmark, Bell, Settings, HelpCircle,
  LogOut, TrendingUp, Building2, Eye, Star, Clock, ChevronRight,
  Edit, Plus, Download, Brain, MessageSquare, Calendar, CheckCircle2,
  AlertCircle, X, Menu, Sparkles
} from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, LineChart, Line } from "recharts";

interface CandidateDashboardProps {
  onNavigate: (page: string) => void;
}

const menuItems = [
  { icon: Home, label: "Início", id: "home" },
  { icon: User, label: "Meu Perfil", id: "profile" },
  { icon: FileText, label: "Currículo", id: "resume" },
  { icon: Send, label: "Candidaturas", id: "applications" },
  { icon: Bookmark, label: "Vagas Salvas", id: "saved" },
  { icon: Bell, label: "Alertas", id: "alerts" },
  { icon: Brain, label: "IA & Insights", id: "ai" },
  { icon: MessageSquare, label: "Mensagens", id: "messages" },
  { icon: Settings, label: "Configurações", id: "settings" },
  { icon: HelpCircle, label: "Suporte", id: "support" },
];

const recentActivity = [
  { icon: CheckCircle2, color: "#10b981", text: "TechCorp visualizou seu currículo", time: "2h atrás" },
  { icon: Bell, color: "#7C3AED", text: "Nova vaga: Senior React Dev — R$18k", time: "5h atrás" },
  { icon: Star, color: "#F59E0B", text: "Você tem 98% de match com uma nova vaga", time: "1d atrás" },
  { icon: MessageSquare, color: "#2563EB", text: "Inovação SA enviou uma mensagem", time: "2d atrás" },
  { icon: Calendar, color: "#9333EA", text: "Entrevista agendada: StartupBR — Seg 10h", time: "3d atrás" },
];

const applications = [
  { company: "TechCorp", role: "Senior React Developer", logo: "TC", status: "Entrevista", statusColor: "#7C3AED", date: "Hoje" },
  { company: "Inovação SA", role: "Product Designer", logo: "IS", status: "Em análise", statusColor: "#F59E0B", date: "Ontem" },
  { company: "StartupBR", role: "Data Scientist", logo: "SB", status: "Aprovado", statusColor: "#10b981", date: "3d" },
  { company: "FinTech ABC", role: "Fullstack Dev", logo: "FA", status: "Reprovado", statusColor: "#ef4444", date: "1w" },
  { company: "CloudBrasil", role: "DevOps Engineer", logo: "CB", status: "Em análise", statusColor: "#F59E0B", date: "1w" },
];

const weeklyData = [
  { day: "Seg", candidaturas: 2, visualizações: 5 },
  { day: "Ter", candidaturas: 1, visualizações: 8 },
  { day: "Qua", candidaturas: 3, visualizações: 12 },
  { day: "Qui", candidaturas: 0, visualizações: 6 },
  { day: "Sex", candidaturas: 4, visualizações: 15 },
  { day: "Sáb", candidaturas: 1, visualizações: 4 },
  { day: "Dom", candidaturas: 0, visualizações: 2 },
];

const savedJobs = [
  { title: "Backend Engineer Go", company: "MicroServ", salary: "R$20k–R$28k", modality: "Híbrido", logo: "MS" },
  { title: "ML Engineer", company: "AIBrasil", salary: "R$22k–R$30k", modality: "Remoto", logo: "AI" },
  { title: "Frontend Senior", company: "UXLab", salary: "R$12k–R$16k", modality: "Remoto", logo: "UX" },
];

const skills = ["React", "TypeScript", "Node.js", "GraphQL", "Docker", "AWS", "PostgreSQL", "Python"];

export function CandidateDashboard({ onNavigate }: CandidateDashboardProps) {
  const [activeSection, setActiveSection] = useState("home");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const renderContent = () => {
    switch (activeSection) {
      case "home": return <DashboardHome setActiveSection={setActiveSection} />;
      case "profile": return <ProfileSection />;
      case "resume": return <ResumeSection />;
      case "applications": return <ApplicationsSection />;
      case "saved": return <SavedJobsSection onNavigate={onNavigate} />;
      case "ai": return <AISection />;
      case "messages": return <MessagesSection />;
      case "alerts": return <AlertsSection />;
      case "settings": return <SettingsSection />;
      default: return <DashboardHome setActiveSection={setActiveSection} />;
    }
  };

  return (
    <div className="min-h-screen flex pt-16" style={{ background: "#09090B" }}>
      {/* Mobile overlay */}
      {sidebarOpen && <div className="fixed inset-0 z-30 bg-black/60 lg:hidden" onClick={() => setSidebarOpen(false)} />}

      {/* Sidebar */}
      <aside
        className={`fixed top-16 bottom-0 z-40 w-56 flex flex-col transition-transform duration-300 lg:translate-x-0 ${sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}`}
        style={{ background: "#0f0f14", borderRight: "1px solid rgba(255,255,255,0.06)" }}
      >
        {/* Profile mini */}
        <div className="p-4 border-b" style={{ borderColor: "rgba(255,255,255,0.06)" }}>
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold" style={{ background: "linear-gradient(135deg, #7C3AED, #2563EB)", color: "#fff" }}>CL</div>
            <div>
              <p style={{ color: "#fff", fontWeight: 600, fontSize: "0.8rem" }}>Carlos Lima</p>
              <p style={{ color: "#10b981", fontSize: "0.65rem" }}>● Online</p>
            </div>
          </div>
        </div>

        <nav className="flex-1 p-3 overflow-y-auto">
          {menuItems.map(item => (
            <button
              key={item.id}
              onClick={() => { setActiveSection(item.id); setSidebarOpen(false); }}
              className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl mb-0.5 text-sm transition-all"
              style={{
                background: activeSection === item.id ? "rgba(124,58,237,0.15)" : "transparent",
                color: activeSection === item.id ? "#fff" : "#C4C4C4",
                fontWeight: activeSection === item.id ? 600 : 400,
                borderLeft: activeSection === item.id ? "2px solid #7C3AED" : "2px solid transparent",
              }}
            >
              <item.icon size={16} />
              {item.label}
              {item.id === "messages" && <span className="ml-auto w-4 h-4 rounded-full text-xs flex items-center justify-center" style={{ background: "#7C3AED", color: "#fff" }}>3</span>}
              {item.id === "alerts" && <span className="ml-auto w-4 h-4 rounded-full text-xs flex items-center justify-center" style={{ background: "#ef4444", color: "#fff" }}>5</span>}
            </button>
          ))}
        </nav>

        <div className="p-3 border-t" style={{ borderColor: "rgba(255,255,255,0.06)" }}>
          <button onClick={() => onNavigate("landing")} className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-[#C4C4C4] hover:bg-white/5 transition-all">
            <LogOut size={16} /> Sair
          </button>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 lg:ml-56 overflow-x-hidden">
        {/* Mobile header */}
        <div className="lg:hidden flex items-center gap-3 px-4 py-3 border-b" style={{ borderColor: "rgba(255,255,255,0.06)" }}>
          <button onClick={() => setSidebarOpen(true)} className="p-1.5 rounded-lg" style={{ color: "#C4C4C4" }}>
            <Menu size={18} />
          </button>
          <span style={{ color: "#fff", fontWeight: 600, fontSize: "0.875rem" }}>
            {menuItems.find(m => m.id === activeSection)?.label || "Dashboard"}
          </span>
        </div>

        <div className="p-4 sm:p-6 lg:p-8">
          {renderContent()}
        </div>
      </main>
    </div>
  );
}

function DashboardHome({ setActiveSection }: { setActiveSection: (s: string) => void }) {
  const statCards = [
    { label: "Currículos Enviados", value: "24", icon: Send, color: "#7C3AED", change: "+4 essa semana" },
    { label: "Entrevistas", value: "3", icon: Calendar, color: "#10b981", change: "2 agendadas" },
    { label: "Empresas Interessadas", value: "8", icon: Building2, color: "#2563EB", change: "+2 essa semana" },
    { label: "Vagas Salvas", value: "12", icon: Bookmark, color: "#F59E0B", change: "3 expirando" },
  ];

  return (
    <div>
      <div className="mb-6">
        <h2 style={{ color: "#fff", fontSize: "1.5rem", fontWeight: 700 }}>Olá, Carlos 👋</h2>
        <p style={{ color: "#C4C4C4", fontSize: "0.875rem" }}>Aqui está seu resumo de hoje. Você tem 2 entrevistas essa semana!</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {statCards.map((card, i) => (
          <div key={i} className="p-4 rounded-2xl" style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)" }}>
            <div className="flex items-center justify-between mb-3">
              <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ background: `${card.color}20` }}>
                <card.icon size={16} style={{ color: card.color }} />
              </div>
              <TrendingUp size={12} style={{ color: "#10b981" }} />
            </div>
            <p style={{ color: "#fff", fontSize: "1.5rem", fontWeight: 800, letterSpacing: "-0.03em" }}>{card.value}</p>
            <p style={{ color: "#C4C4C4", fontSize: "0.7rem", marginTop: "0.25rem" }}>{card.label}</p>
            <p style={{ color: "#10b981", fontSize: "0.65rem", marginTop: "0.25rem" }}>{card.change}</p>
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-4 mb-6">
        {/* Chart */}
        <div className="lg:col-span-2 p-5 rounded-2xl" style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)" }}>
          <p style={{ color: "#fff", fontWeight: 600, fontSize: "0.875rem", marginBottom: "1rem" }}>Atividade da Semana</p>
          <ResponsiveContainer width="100%" height={160}>
            <BarChart data={weeklyData} barGap={4}>
              <XAxis dataKey="day" tick={{ fill: "#C4C4C4", fontSize: 11 }} axisLine={false} tickLine={false} />
              <YAxis hide />
              <Tooltip contentStyle={{ background: "#111827", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 8, color: "#fff", fontSize: 12 }} />
              <Bar dataKey="candidaturas" fill="#7C3AED" radius={[4, 4, 0, 0]} />
              <Bar dataKey="visualizações" fill="#2563EB" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
          <div className="flex gap-4 mt-1">
            <div className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full" style={{ background: "#7C3AED" }}/><span style={{ color: "#C4C4C4", fontSize: "0.7rem" }}>Candidaturas</span></div>
            <div className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full" style={{ background: "#2563EB" }}/><span style={{ color: "#C4C4C4", fontSize: "0.7rem" }}>Visualizações</span></div>
          </div>
        </div>

        {/* Recent activity */}
        <div className="p-5 rounded-2xl" style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)" }}>
          <p style={{ color: "#fff", fontWeight: 600, fontSize: "0.875rem", marginBottom: "1rem" }}>Atividade Recente</p>
          <div className="flex flex-col gap-3">
            {recentActivity.map((act, i) => (
              <div key={i} className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5" style={{ background: `${act.color}20` }}>
                  <act.icon size={12} style={{ color: act.color }} />
                </div>
                <div>
                  <p style={{ color: "#C4C4C4", fontSize: "0.72rem", lineHeight: 1.5 }}>{act.text}</p>
                  <p style={{ color: "rgba(196,196,196,0.5)", fontSize: "0.65rem" }}>{act.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Quick applications */}
      <div className="p-5 rounded-2xl" style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)" }}>
        <div className="flex items-center justify-between mb-4">
          <p style={{ color: "#fff", fontWeight: 600, fontSize: "0.875rem" }}>Últimas Candidaturas</p>
          <button onClick={() => setActiveSection("applications")} style={{ color: "#A78BFA", fontSize: "0.75rem" }} className="flex items-center gap-1">Ver todas <ChevronRight size={12}/></button>
        </div>
        <div className="flex flex-col gap-2">
          {applications.slice(0, 3).map((app, i) => (
            <div key={i} className="flex items-center gap-3 p-3 rounded-xl" style={{ background: "rgba(255,255,255,0.02)" }}>
              <div className="w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold" style={{ background: "linear-gradient(135deg, #7C3AED, #2563EB)", color: "#fff" }}>{app.logo}</div>
              <div className="flex-1">
                <p style={{ color: "#fff", fontSize: "0.8rem", fontWeight: 500 }}>{app.role}</p>
                <p style={{ color: "#C4C4C4", fontSize: "0.7rem" }}>{app.company}</p>
              </div>
              <div className="text-right">
                <span className="px-2 py-0.5 rounded-full text-xs" style={{ background: `${app.statusColor}20`, color: app.statusColor }}>{app.status}</span>
                <p style={{ color: "rgba(196,196,196,0.5)", fontSize: "0.65rem", marginTop: "2px" }}>{app.date}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function ProfileSection() {
  const [editMode, setEditMode] = useState(false);
  return (
    <div className="max-w-2xl">
      <div className="flex items-center justify-between mb-6">
        <h2 style={{ color: "#fff", fontSize: "1.25rem", fontWeight: 700 }}>Meu Perfil</h2>
        <button onClick={() => setEditMode(!editMode)} className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm transition-all" style={{ background: editMode ? "rgba(124,58,237,0.2)" : "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", color: editMode ? "#A78BFA" : "#C4C4C4" }}>
          <Edit size={14} /> {editMode ? "Salvar" : "Editar"}
        </button>
      </div>

      <div className="p-6 rounded-2xl mb-4" style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)" }}>
        <div className="flex items-center gap-5 mb-6">
          <div className="w-20 h-20 rounded-2xl flex items-center justify-center text-2xl font-bold relative" style={{ background: "linear-gradient(135deg, #7C3AED, #2563EB)", color: "#fff" }}>
            CL
            {editMode && <button className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-[#7C3AED] flex items-center justify-center"><Edit size={10} color="#fff"/></button>}
          </div>
          <div>
            {editMode ? (
              <div className="flex flex-col gap-2">
                <input defaultValue="Carlos Lima" className="px-3 py-1.5 rounded-lg text-sm bg-white/5 border border-white/10 text-white outline-none focus:border-[#7C3AED]" />
                <input defaultValue="Senior React Developer" className="px-3 py-1.5 rounded-lg text-sm bg-white/5 border border-white/10 text-white outline-none focus:border-[#7C3AED]" />
              </div>
            ) : (
              <>
                <p style={{ color: "#fff", fontWeight: 700, fontSize: "1.1rem" }}>Carlos Lima</p>
                <p style={{ color: "#C4C4C4", fontSize: "0.875rem" }}>Senior React Developer</p>
                <p style={{ color: "#10b981", fontSize: "0.75rem" }}>● Disponível para novas oportunidades</p>
              </>
            )}
          </div>
        </div>

        {[
          { label: "Email", value: "carlos@email.com" },
          { label: "Telefone", value: "(11) 98765-4321" },
          { label: "Localização", value: "São Paulo, SP — Brasil" },
          { label: "LinkedIn", value: "linkedin.com/in/carloslima" },
          { label: "GitHub", value: "github.com/carloslima" },
        ].map((field, i) => (
          <div key={i} className="flex items-center gap-4 py-3 border-b last:border-0" style={{ borderColor: "rgba(255,255,255,0.06)" }}>
            <span style={{ color: "#C4C4C4", fontSize: "0.75rem", width: "100px" }}>{field.label}</span>
            {editMode ? <input defaultValue={field.value} className="flex-1 px-3 py-1.5 rounded-lg text-sm bg-white/5 border border-white/10 text-white outline-none focus:border-[#7C3AED]" />
              : <span style={{ color: "#fff", fontSize: "0.875rem" }}>{field.value}</span>}
          </div>
        ))}
      </div>

      {/* Skills */}
      <div className="p-5 rounded-2xl mb-4" style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)" }}>
        <div className="flex items-center justify-between mb-4">
          <p style={{ color: "#fff", fontWeight: 600, fontSize: "0.875rem" }}>Competências</p>
          {editMode && <button className="text-xs text-[#A78BFA] flex items-center gap-1"><Plus size={12}/> Adicionar</button>}
        </div>
        <div className="flex flex-wrap gap-2">
          {skills.map(s => (
            <div key={s} className="flex items-center gap-1 px-3 py-1 rounded-full text-sm" style={{ background: "rgba(124,58,237,0.1)", border: "1px solid rgba(124,58,237,0.2)", color: "#A78BFA" }}>
              {s}
              {editMode && <button className="ml-1"><X size={10}/></button>}
            </div>
          ))}
        </div>
      </div>

      {/* Experience */}
      <div className="p-5 rounded-2xl" style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)" }}>
        <div className="flex items-center justify-between mb-4">
          <p style={{ color: "#fff", fontWeight: 600, fontSize: "0.875rem" }}>Experiência</p>
          {editMode && <button className="text-xs text-[#A78BFA] flex items-center gap-1"><Plus size={12}/> Adicionar</button>}
        </div>
        {[
          { role: "Senior React Developer", company: "StartupBR", period: "2022 – Presente", desc: "Liderança técnica de equipe com 6 desenvolvedores. Arquitetura de micro-frontends." },
          { role: "Fullstack Developer", company: "TechCorp", period: "2020 – 2022", desc: "Desenvolvimento de plataforma SaaS B2B com +50k usuários." },
        ].map((exp, i) => (
          <div key={i} className="flex gap-4 py-4 border-b last:border-0" style={{ borderColor: "rgba(255,255,255,0.06)" }}>
            <div className="w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold flex-shrink-0 mt-1" style={{ background: "rgba(124,58,237,0.15)", color: "#A78BFA" }}>
              {exp.company.slice(0, 2)}
            </div>
            <div>
              <p style={{ color: "#fff", fontWeight: 600, fontSize: "0.875rem" }}>{exp.role}</p>
              <p style={{ color: "#C4C4C4", fontSize: "0.75rem" }}>{exp.company} · {exp.period}</p>
              <p style={{ color: "#C4C4C4", fontSize: "0.75rem", marginTop: "0.25rem" }}>{exp.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function ResumeSection() {
  const [activeTemplate, setActiveTemplate] = useState(0);
  return (
    <div className="max-w-3xl">
      <div className="flex items-center justify-between mb-6">
        <h2 style={{ color: "#fff", fontSize: "1.25rem", fontWeight: 700 }}>Meu Currículo</h2>
        <button className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm text-white font-semibold" style={{ background: "linear-gradient(135deg, #7C3AED, #2563EB)" }}>
          <Download size={14}/> Exportar PDF
        </button>
      </div>

      {/* Templates */}
      <div className="flex gap-3 mb-6 overflow-x-auto pb-2">
        {["Moderno", "Executivo", "Criativo", "Minimalista"].map((t, i) => (
          <button key={i} onClick={() => setActiveTemplate(i)} className="px-4 py-2 rounded-xl text-sm whitespace-nowrap transition-all flex-shrink-0" style={{ background: activeTemplate === i ? "rgba(124,58,237,0.2)" : "rgba(255,255,255,0.05)", border: activeTemplate === i ? "1px solid rgba(124,58,237,0.4)" : "1px solid rgba(255,255,255,0.08)", color: activeTemplate === i ? "#A78BFA" : "#C4C4C4" }}>{t}</button>
        ))}
      </div>

      {/* Preview */}
      <div className="p-8 rounded-2xl" style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)" }}>
        <div className="flex items-start gap-6 mb-6 pb-6 border-b" style={{ borderColor: "rgba(255,255,255,0.08)" }}>
          <div className="w-16 h-16 rounded-2xl flex items-center justify-center text-xl font-bold" style={{ background: "linear-gradient(135deg, #7C3AED, #2563EB)", color: "#fff" }}>CL</div>
          <div>
            <h3 style={{ color: "#fff", fontWeight: 700, fontSize: "1.25rem" }}>Carlos Lima</h3>
            <p style={{ color: "#A78BFA", fontWeight: 500 }}>Senior React Developer</p>
            <p style={{ color: "#C4C4C4", fontSize: "0.8rem" }}>carlos@email.com · (11) 98765-4321 · São Paulo, SP</p>
          </div>
        </div>

        {[
          { title: "Objetivo Profissional", content: "Desenvolvedor React com 5+ anos de experiência em construção de aplicações web escaláveis e de alta performance. Especializado em arquitetura de micro-frontends e liderança técnica." },
          { title: "Experiência", items: ["Senior React Developer @ StartupBR (2022–Presente)", "Fullstack Developer @ TechCorp (2020–2022)"] },
          { title: "Formação", items: ["Bacharelado em Ciência da Computação — USP (2016–2020)"] },
          { title: "Competências", tags: skills },
          { title: "Certificações", items: ["AWS Solutions Architect Associate (2023)", "Google Cloud Professional (2022)"] },
        ].map((section, i) => (
          <div key={i} className="mb-5">
            <div className="flex items-center gap-2 mb-2">
              <p style={{ color: "#fff", fontWeight: 600, fontSize: "0.875rem" }}>{section.title}</p>
              <button className="ml-auto"><Edit size={12} style={{ color: "#C4C4C4" }}/></button>
            </div>
            {section.content && <p style={{ color: "#C4C4C4", fontSize: "0.8rem", lineHeight: 1.7 }}>{section.content}</p>}
            {section.items && section.items.map((item, j) => <p key={j} style={{ color: "#C4C4C4", fontSize: "0.8rem" }} className="flex items-center gap-2 mb-1"><span style={{ color: "#7C3AED" }}>▸</span>{item}</p>)}
            {section.tags && (
              <div className="flex flex-wrap gap-2">
                {section.tags.map(t => <span key={t} className="px-2 py-0.5 rounded text-xs" style={{ background: "rgba(124,58,237,0.1)", color: "#A78BFA" }}>{t}</span>)}
              </div>
            )}
          </div>
        ))}

        <button className="w-full mt-4 py-2.5 rounded-xl text-sm border border-dashed transition-all hover:bg-white/5" style={{ borderColor: "rgba(255,255,255,0.15)", color: "#C4C4C4" }}>
          <Plus size={14} className="inline mr-2" /> Adicionar seção
        </button>
      </div>
    </div>
  );
}

function ApplicationsSection() {
  return (
    <div>
      <h2 style={{ color: "#fff", fontSize: "1.25rem", fontWeight: 700, marginBottom: "1.5rem" }}>Minhas Candidaturas</h2>
      <div className="flex flex-col gap-3">
        {applications.map((app, i) => (
          <div key={i} className="flex items-center gap-4 p-4 rounded-2xl transition-all hover:bg-white/5" style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)" }}>
            <div className="w-10 h-10 rounded-xl flex items-center justify-center text-sm font-bold" style={{ background: "linear-gradient(135deg, #7C3AED, #2563EB)", color: "#fff" }}>{app.logo}</div>
            <div className="flex-1">
              <p style={{ color: "#fff", fontWeight: 600, fontSize: "0.875rem" }}>{app.role}</p>
              <p style={{ color: "#C4C4C4", fontSize: "0.75rem" }}>{app.company}</p>
            </div>
            <div className="text-right">
              <span className="px-3 py-1 rounded-full text-xs" style={{ background: `${app.statusColor}20`, color: app.statusColor }}>{app.status}</span>
              <p style={{ color: "rgba(196,196,196,0.5)", fontSize: "0.65rem", marginTop: "4px" }}>{app.date}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function SavedJobsSection({ onNavigate }: { onNavigate: (p: string) => void }) {
  return (
    <div>
      <h2 style={{ color: "#fff", fontSize: "1.25rem", fontWeight: 700, marginBottom: "1.5rem" }}>Vagas Salvas</h2>
      <div className="grid sm:grid-cols-2 gap-4">
        {savedJobs.map((job, i) => (
          <div key={i} className="p-5 rounded-2xl" style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)" }}>
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center text-sm font-bold" style={{ background: "linear-gradient(135deg, #7C3AED, #2563EB)", color: "#fff" }}>{job.logo}</div>
              <div>
                <p style={{ color: "#fff", fontWeight: 600, fontSize: "0.875rem" }}>{job.title}</p>
                <p style={{ color: "#C4C4C4", fontSize: "0.75rem" }}>{job.company}</p>
              </div>
            </div>
            <div className="flex items-center gap-2 mb-4">
              <span className="px-2 py-0.5 rounded-full text-xs" style={{ background: "rgba(16,185,129,0.15)", color: "#10b981" }}>{job.salary}</span>
              <span className="px-2 py-0.5 rounded-full text-xs" style={{ background: "rgba(37,99,235,0.15)", color: "#60A5FA" }}>{job.modality}</span>
            </div>
            <button onClick={() => onNavigate("jobs")} className="w-full py-2 rounded-xl text-sm font-semibold text-white" style={{ background: "linear-gradient(135deg, #7C3AED, #2563EB)" }}>Candidatar-se</button>
          </div>
        ))}
      </div>
    </div>
  );
}

function AISection() {
  const [analyzing, setAnalyzing] = useState(false);
  const [analyzed, setAnalyzed] = useState(false);

  const handleAnalyze = () => {
    setAnalyzing(true);
    setTimeout(() => { setAnalyzing(false); setAnalyzed(true); }, 2000);
  };

  return (
    <div className="max-w-2xl">
      <h2 style={{ color: "#fff", fontSize: "1.25rem", fontWeight: 700, marginBottom: "0.5rem" }}>IA & Insights</h2>
      <p style={{ color: "#C4C4C4", fontSize: "0.875rem", marginBottom: "1.5rem" }}>Ferramentas de inteligência artificial para acelerar sua carreira</p>

      <div className="p-5 rounded-2xl mb-4" style={{ background: "rgba(124,58,237,0.08)", border: "1px solid rgba(124,58,237,0.2)" }}>
        <div className="flex items-center gap-3 mb-3">
          <Brain size={20} style={{ color: "#A78BFA" }} />
          <p style={{ color: "#fff", fontWeight: 600 }}>Análise de Currículo por IA</p>
        </div>
        <p style={{ color: "#C4C4C4", fontSize: "0.8rem", marginBottom: "1rem" }}>Nossa IA analisa seu currículo e fornece feedback detalhado com sugestões de melhoria para aumentar suas chances de contratação.</p>
        {!analyzed ? (
          <button onClick={handleAnalyze} disabled={analyzing} className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold text-white transition-all hover:opacity-90" style={{ background: "linear-gradient(135deg, #7C3AED, #2563EB)" }}>
            {analyzing ? <><span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"/> Analisando...</> : <><Sparkles size={14}/> Analisar meu currículo</>}
          </button>
        ) : (
          <div>
            <div className="flex items-center gap-3 mb-3">
              <div className="flex-1 h-2 rounded-full bg-white/10">
                <div className="h-full rounded-full" style={{ width: "78%", background: "linear-gradient(90deg, #7C3AED, #2563EB)" }} />
              </div>
              <span style={{ color: "#fff", fontWeight: 700 }}>78/100</span>
            </div>
            <div className="flex flex-col gap-2">
              {[
                { type: "success", text: "Boa quantidade de palavras-chave técnicas" },
                { type: "warning", text: "Adicione métricas quantitativas às experiências" },
                { type: "warning", text: "Inclua um objetivo profissional mais específico" },
                { type: "success", text: "Excelente quantidade de projetos relevantes" },
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-2 text-sm">
                  {item.type === "success" ? <CheckCircle2 size={14} style={{ color: "#10b981" }} /> : <AlertCircle size={14} style={{ color: "#F59E0B" }} />}
                  <span style={{ color: "#C4C4C4" }}>{item.text}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      <div className="p-5 rounded-2xl mb-4" style={{ background: "rgba(37,99,235,0.08)", border: "1px solid rgba(37,99,235,0.2)" }}>
        <div className="flex items-center gap-3 mb-3">
          <Star size={20} style={{ color: "#60A5FA" }} />
          <p style={{ color: "#fff", fontWeight: 600 }}>Vagas Recomendadas por IA</p>
        </div>
        <div className="flex flex-col gap-2">
          {[
            { title: "Staff Engineer", company: "BigTech BR", match: 96, salary: "R$30k+" },
            { title: "Tech Lead React", company: "Scale-up XYZ", match: 91, salary: "R$22k–R$28k" },
            { title: "Senior Frontend", company: "ProductLab", match: 89, salary: "R$16k–R$20k" },
          ].map((job, i) => (
            <div key={i} className="flex items-center gap-3 p-3 rounded-xl" style={{ background: "rgba(255,255,255,0.03)" }}>
              <div className="w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold" style={{ background: "linear-gradient(135deg, #7C3AED, #2563EB)", color: "#fff" }}>{job.company.slice(0,2)}</div>
              <div className="flex-1">
                <p style={{ color: "#fff", fontSize: "0.8rem", fontWeight: 500 }}>{job.title}</p>
                <p style={{ color: "#C4C4C4", fontSize: "0.7rem" }}>{job.company} · {job.salary}</p>
              </div>
              <span style={{ color: "#10b981", fontSize: "0.75rem", fontWeight: 700 }}>{job.match}% match</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function MessagesSection() {
  const [activeChat, setActiveChat] = useState(0);
  const [msg, setMsg] = useState("");
  const [messages, setMessages] = useState([
    { from: "them", text: "Olá Carlos! Temos interesse no seu perfil para a vaga de Senior React Developer.", time: "10:30" },
    { from: "me", text: "Obrigado! Tenho muito interesse na posição também. Poderia me contar mais sobre o projeto?", time: "10:45" },
    { from: "them", text: "Claro! É um produto SaaS B2B para gestão de equipes. Stack com React, TypeScript e AWS.", time: "11:00" },
    { from: "me", text: "Perfeito, é exatamente o que busco. Quando podemos agendar uma conversa?", time: "11:15" },
    { from: "them", text: "Podemos fazer uma call amanhã às 14h ou quinta às 10h. Qual prefere?", time: "11:20" },
  ]);

  const chats = [
    { name: "TechCorp RH", avatar: "TC", last: "Podemos fazer uma call amanhã...", time: "11:20", unread: 1 },
    { name: "Inovação SA", avatar: "IS", last: "Obrigado pelo interesse!", time: "Ontem", unread: 0 },
    { name: "StartupBR", avatar: "SB", last: "Vaga encerrada, obrigado!", time: "3d", unread: 0 },
  ];

  const sendMessage = () => {
    if (!msg.trim()) return;
    setMessages([...messages, { from: "me", text: msg, time: new Date().toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" }) }]);
    setMsg("");
  };

  return (
    <div className="flex gap-4 h-[600px]">
      {/* Chat list */}
      <div className="w-64 flex-shrink-0 flex flex-col rounded-2xl overflow-hidden" style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)" }}>
        <div className="p-4 border-b" style={{ borderColor: "rgba(255,255,255,0.06)" }}>
          <p style={{ color: "#fff", fontWeight: 600, fontSize: "0.875rem" }}>Mensagens</p>
        </div>
        {chats.map((chat, i) => (
          <button key={i} onClick={() => setActiveChat(i)} className="flex items-center gap-3 p-3 text-left border-b transition-all" style={{ background: activeChat === i ? "rgba(124,58,237,0.1)" : "transparent", borderColor: "rgba(255,255,255,0.04)" }}>
            <div className="w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0" style={{ background: "linear-gradient(135deg, #7C3AED, #2563EB)", color: "#fff" }}>{chat.avatar}</div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between">
                <p style={{ color: "#fff", fontSize: "0.8rem", fontWeight: 600 }}>{chat.name}</p>
                <p style={{ color: "#C4C4C4", fontSize: "0.65rem" }}>{chat.time}</p>
              </div>
              <p style={{ color: "#C4C4C4", fontSize: "0.72rem", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{chat.last}</p>
            </div>
            {chat.unread > 0 && <span className="w-4 h-4 rounded-full flex items-center justify-center text-xs" style={{ background: "#7C3AED", color: "#fff" }}>{chat.unread}</span>}
          </button>
        ))}
      </div>

      {/* Chat window */}
      <div className="flex-1 flex flex-col rounded-2xl overflow-hidden" style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)" }}>
        <div className="flex items-center gap-3 p-4 border-b" style={{ borderColor: "rgba(255,255,255,0.06)" }}>
          <div className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold" style={{ background: "linear-gradient(135deg, #7C3AED, #2563EB)", color: "#fff" }}>{chats[activeChat].avatar}</div>
          <div>
            <p style={{ color: "#fff", fontWeight: 600, fontSize: "0.875rem" }}>{chats[activeChat].name}</p>
            <p style={{ color: "#10b981", fontSize: "0.7rem" }}>● Online</p>
          </div>
        </div>
        <div className="flex-1 p-4 overflow-y-auto flex flex-col gap-3">
          {messages.map((m, i) => (
            <div key={i} className={`flex ${m.from === "me" ? "justify-end" : "justify-start"}`}>
              <div className="max-w-[80%] px-4 py-2.5 rounded-2xl text-sm" style={{ background: m.from === "me" ? "linear-gradient(135deg, #7C3AED, #2563EB)" : "rgba(255,255,255,0.06)", color: "#fff" }}>
                {m.text}
                <p style={{ color: "rgba(255,255,255,0.5)", fontSize: "0.6rem", marginTop: "4px", textAlign: "right" }}>{m.time}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="p-4 border-t flex gap-2" style={{ borderColor: "rgba(255,255,255,0.06)" }}>
          <input value={msg} onChange={e => setMsg(e.target.value)} onKeyDown={e => e.key === "Enter" && sendMessage()} placeholder="Digite uma mensagem..." className="flex-1 px-4 py-2.5 rounded-xl text-sm outline-none" style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)", color: "#fff" }} />
          <button onClick={sendMessage} className="px-4 py-2.5 rounded-xl text-sm font-semibold text-white" style={{ background: "linear-gradient(135deg, #7C3AED, #2563EB)" }}>Enviar</button>
        </div>
      </div>
    </div>
  );
}

function AlertsSection() {
  const [alerts, setAlerts] = useState([
    { title: "Senior React Developer", desc: "São Paulo · Remoto", active: true },
    { title: "Tech Lead Frontend", desc: "Qualquer localização", active: true },
    { title: "Staff Engineer", desc: "Remoto · R$25k+", active: false },
  ]);
  return (
    <div className="max-w-xl">
      <div className="flex items-center justify-between mb-6">
        <h2 style={{ color: "#fff", fontSize: "1.25rem", fontWeight: 700 }}>Alertas de Vagas</h2>
        <button className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm text-white font-semibold" style={{ background: "linear-gradient(135deg, #7C3AED, #2563EB)" }}><Plus size={14}/> Novo alerta</button>
      </div>
      <div className="flex flex-col gap-3">
        {alerts.map((alert, i) => (
          <div key={i} className="flex items-center gap-4 p-4 rounded-2xl" style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)" }}>
            <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ background: "rgba(124,58,237,0.15)" }}>
              <Bell size={16} style={{ color: "#A78BFA" }} />
            </div>
            <div className="flex-1">
              <p style={{ color: "#fff", fontWeight: 600, fontSize: "0.875rem" }}>{alert.title}</p>
              <p style={{ color: "#C4C4C4", fontSize: "0.75rem" }}>{alert.desc}</p>
            </div>
            <button onClick={() => setAlerts(alerts.map((a, j) => j === i ? { ...a, active: !a.active } : a))} className="w-10 h-5 rounded-full transition-all relative" style={{ background: alert.active ? "#7C3AED" : "rgba(255,255,255,0.1)" }}>
              <span className="absolute top-0.5 w-4 h-4 rounded-full bg-white transition-all" style={{ left: alert.active ? "calc(100% - 1.125rem)" : "2px" }} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

function SettingsSection() {
  return (
    <div className="max-w-xl">
      <h2 style={{ color: "#fff", fontSize: "1.25rem", fontWeight: 700, marginBottom: "1.5rem" }}>Configurações</h2>
      {[
        { section: "Conta", items: [{ label: "Email", value: "carlos@email.com" }, { label: "Senha", value: "••••••••" }] },
        { section: "Notificações", items: [{ label: "Novas vagas", value: "Ativado" }, { label: "Mensagens", value: "Ativado" }, { label: "Newsletter", value: "Desativado" }] },
        { section: "Privacidade", items: [{ label: "Perfil público", value: "Sim" }, { label: "Mostrar salário desejado", value: "Não" }] },
      ].map((group, i) => (
        <div key={i} className="p-5 rounded-2xl mb-3" style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)" }}>
          <p style={{ color: "#A78BFA", fontWeight: 600, fontSize: "0.75rem", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: "0.75rem" }}>{group.section}</p>
          {group.items.map((item, j) => (
            <div key={j} className="flex items-center justify-between py-3 border-b last:border-0" style={{ borderColor: "rgba(255,255,255,0.06)" }}>
              <span style={{ color: "#C4C4C4", fontSize: "0.875rem" }}>{item.label}</span>
              <div className="flex items-center gap-2">
                <span style={{ color: "#fff", fontSize: "0.875rem" }}>{item.value}</span>
                <Edit size={12} style={{ color: "#C4C4C4" }} />
              </div>
            </div>
          ))}
        </div>
      ))}
      <button className="w-full py-3 rounded-xl text-sm font-semibold border transition-all hover:bg-red-500/10" style={{ borderColor: "rgba(239,68,68,0.3)", color: "#ef4444" }}>
        Excluir conta
      </button>
    </div>
  );
}
