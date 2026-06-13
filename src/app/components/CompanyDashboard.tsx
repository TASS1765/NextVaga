import { useState } from "react";
import {
  LayoutDashboard, PlusCircle, Briefcase, Users, Database, Calendar, BarChart3,
  Settings, HelpCircle, LogOut, TrendingUp, Eye, Send, UserCheck, Star,
  Filter, Search, ChevronRight, Edit, Trash2, Menu, Brain, Sparkles,
  CheckCircle2, Clock, MessageSquare, Phone, Mail
} from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";

interface CompanyDashboardProps {
  onNavigate: (page: string) => void;
}

const menuItems = [
  { icon: LayoutDashboard, label: "Dashboard", id: "home" },
  { icon: PlusCircle, label: "Publicar Vaga", id: "post-job" },
  { icon: Briefcase, label: "Minhas Vagas", id: "my-jobs" },
  { icon: Users, label: "Candidatos", id: "candidates" },
  { icon: Database, label: "Banco de Talentos", id: "talent-bank" },
  { icon: Calendar, label: "Entrevistas", id: "interviews" },
  { icon: Brain, label: "IA Recrutamento", id: "ai" },
  { icon: MessageSquare, label: "Mensagens", id: "messages" },
  { icon: BarChart3, label: "Relatórios", id: "reports" },
  { icon: Settings, label: "Configurações", id: "settings" },
  { icon: HelpCircle, label: "Suporte", id: "support" },
];

const weekData = [
  { day: "Seg", candidatos: 12, vagas: 2 },
  { day: "Ter", candidatos: 8, vagas: 1 },
  { day: "Qua", candidatos: 24, vagas: 3 },
  { day: "Qui", candidatos: 15, vagas: 2 },
  { day: "Sex", candidatos: 31, vagas: 4 },
  { day: "Sáb", candidatos: 5, vagas: 0 },
  { day: "Dom", candidatos: 2, vagas: 0 },
];

const pieData = [
  { name: "Remoto", value: 45, color: "#10b981" },
  { name: "Híbrido", value: 35, color: "#F59E0B" },
  { name: "Presencial", value: 20, color: "#2563EB" },
];

const myJobs = [
  { title: "Senior React Developer", applicants: 48, views: 312, status: "Ativa", posted: "3d", level: "Sênior", modality: "Remoto" },
  { title: "Product Designer", applicants: 23, views: 189, status: "Ativa", posted: "5d", level: "Pleno", modality: "Híbrido" },
  { title: "Data Scientist", applicants: 67, views: 428, status: "Ativa", posted: "1w", level: "Sênior", modality: "Remoto" },
  { title: "DevOps Engineer", applicants: 12, views: 94, status: "Pausada", posted: "2w", level: "Pleno", modality: "Remoto" },
  { title: "Frontend Junior", applicants: 89, views: 621, status: "Fechada", posted: "1m", level: "Júnior", modality: "Presencial" },
];

const candidates = [
  { name: "Ana Silva", role: "React Developer", avatar: "AS", exp: "5 anos", skills: ["React", "TS", "Node"], location: "SP", match: 96, status: "Novo" },
  { name: "Bruno Costa", role: "Frontend Dev", avatar: "BC", exp: "3 anos", skills: ["Vue", "CSS", "React"], location: "RJ", match: 88, status: "Em análise" },
  { name: "Carla Mendes", role: "UX Designer", avatar: "CM", exp: "4 anos", skills: ["Figma", "UX", "UI"], location: "SP", match: 82, status: "Entrevista" },
  { name: "Diego Lima", role: "Fullstack", avatar: "DL", exp: "6 anos", skills: ["React", "Python", "AWS"], location: "MG", match: 91, status: "Novo" },
  { name: "Elena Santos", role: "Data Scientist", avatar: "ES", exp: "4 anos", skills: ["Python", "ML", "SQL"], location: "Remoto", match: 87, status: "Favorito" },
];

const interviews = [
  { candidate: "Ana Silva", role: "Senior React", date: "Hoje", time: "14:00", type: "Video", status: "Confirmada" },
  { candidate: "Bruno Costa", role: "Frontend Dev", date: "Amanhã", time: "10:30", type: "Video", status: "Pendente" },
  { candidate: "Diego Lima", role: "Fullstack Dev", date: "Quinta", time: "16:00", type: "Presencial", status: "Confirmada" },
];

export function CompanyDashboard({ onNavigate }: CompanyDashboardProps) {
  const [activeSection, setActiveSection] = useState("home");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const renderContent = () => {
    switch (activeSection) {
      case "home": return <CompanyHome setActiveSection={setActiveSection} />;
      case "post-job": return <PostJobSection />;
      case "my-jobs": return <MyJobsSection setActiveSection={setActiveSection} />;
      case "candidates": return <CandidatesSection />;
      case "talent-bank": return <TalentBankSection />;
      case "interviews": return <InterviewsSection />;
      case "ai": return <AIRecruitmentSection />;
      case "messages": return <CompanyMessagesSection />;
      case "reports": return <ReportsSection />;
      case "settings": return <CompanySettingsSection />;
      default: return <CompanyHome setActiveSection={setActiveSection} />;
    }
  };

  return (
    <div className="min-h-screen flex pt-16" style={{ background: "#09090B" }}>
      {sidebarOpen && <div className="fixed inset-0 z-30 bg-black/60 lg:hidden" onClick={() => setSidebarOpen(false)} />}

      <aside
        className={`fixed top-16 bottom-0 z-40 w-56 flex flex-col transition-transform duration-300 lg:translate-x-0 ${sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}`}
        style={{ background: "#0f0f14", borderRight: "1px solid rgba(255,255,255,0.06)" }}
      >
        <div className="p-4 border-b" style={{ borderColor: "rgba(255,255,255,0.06)" }}>
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl flex items-center justify-center text-sm font-bold" style={{ background: "linear-gradient(135deg, #2563EB, #7C3AED)", color: "#fff" }}>TC</div>
            <div>
              <p style={{ color: "#fff", fontWeight: 600, fontSize: "0.8rem" }}>TechCorp</p>
              <p style={{ color: "#10b981", fontSize: "0.65rem" }}>● Plano Pro</p>
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
                background: activeSection === item.id ? "rgba(37,99,235,0.15)" : "transparent",
                color: activeSection === item.id ? "#fff" : "#C4C4C4",
                fontWeight: activeSection === item.id ? 600 : 400,
                borderLeft: activeSection === item.id ? "2px solid #2563EB" : "2px solid transparent",
              }}
            >
              <item.icon size={16} />
              {item.label}
              {item.id === "messages" && <span className="ml-auto w-4 h-4 rounded-full text-xs flex items-center justify-center" style={{ background: "#7C3AED", color: "#fff" }}>2</span>}
            </button>
          ))}
        </nav>

        <div className="p-3 border-t" style={{ borderColor: "rgba(255,255,255,0.06)" }}>
          <button onClick={() => onNavigate("landing")} className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-[#C4C4C4] hover:bg-white/5 transition-all">
            <LogOut size={16} /> Sair
          </button>
        </div>
      </aside>

      <main className="flex-1 lg:ml-56 overflow-x-hidden">
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

function CompanyHome({ setActiveSection }: { setActiveSection: (s: string) => void }) {
  const stats = [
    { label: "Vagas Abertas", value: "8", icon: Briefcase, color: "#2563EB", change: "+2 essa semana" },
    { label: "Currículos Recebidos", value: "239", icon: Send, color: "#7C3AED", change: "+48 hoje" },
    { label: "Entrevistas", value: "12", icon: Calendar, color: "#10b981", change: "3 hoje" },
    { label: "Contratações", value: "5", icon: UserCheck, color: "#F59E0B", change: "+2 esse mês" },
  ];

  return (
    <div>
      <div className="mb-6">
        <h2 style={{ color: "#fff", fontSize: "1.5rem", fontWeight: 700 }}>Painel da Empresa</h2>
        <p style={{ color: "#C4C4C4", fontSize: "0.875rem" }}>Visão geral do seu processo de recrutamento em tempo real</p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {stats.map((card, i) => (
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
        <div className="lg:col-span-2 p-5 rounded-2xl" style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)" }}>
          <p style={{ color: "#fff", fontWeight: 600, fontSize: "0.875rem", marginBottom: "1rem" }}>Candidatos por Dia</p>
          <ResponsiveContainer width="100%" height={160}>
            <BarChart data={weekData}>
              <XAxis dataKey="day" tick={{ fill: "#C4C4C4", fontSize: 11 }} axisLine={false} tickLine={false} />
              <YAxis hide />
              <Tooltip contentStyle={{ background: "#111827", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 8, color: "#fff", fontSize: 12 }} />
              <Bar dataKey="candidatos" fill="#7C3AED" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="p-5 rounded-2xl" style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)" }}>
          <p style={{ color: "#fff", fontWeight: 600, fontSize: "0.875rem", marginBottom: "1rem" }}>Vagas por Modalidade</p>
          <ResponsiveContainer width="100%" height={130}>
            <PieChart>
              <Pie data={pieData} cx="50%" cy="50%" innerRadius={35} outerRadius={55} paddingAngle={3} dataKey="value">
                {pieData.map((entry, index) => <Cell key={index} fill={entry.color} />)}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
          <div className="flex flex-col gap-1.5 mt-2">
            {pieData.map((d, i) => (
              <div key={i} className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full" style={{ background: d.color }} />
                <span style={{ color: "#C4C4C4", fontSize: "0.72rem" }}>{d.name}</span>
                <span style={{ color: "#fff", fontSize: "0.72rem", marginLeft: "auto", fontWeight: 600 }}>{d.value}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Top candidates */}
      <div className="p-5 rounded-2xl mb-4" style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)" }}>
        <div className="flex items-center justify-between mb-4">
          <p style={{ color: "#fff", fontWeight: 600, fontSize: "0.875rem" }}>Top Candidatos Hoje</p>
          <button onClick={() => setActiveSection("candidates")} style={{ color: "#60A5FA", fontSize: "0.75rem" }} className="flex items-center gap-1">Ver todos <ChevronRight size={12}/></button>
        </div>
        <div className="flex flex-col gap-2">
          {candidates.slice(0, 3).map((c, i) => (
            <div key={i} className="flex items-center gap-3 p-3 rounded-xl" style={{ background: "rgba(255,255,255,0.02)" }}>
              <div className="w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold" style={{ background: "linear-gradient(135deg, #7C3AED, #2563EB)", color: "#fff" }}>{c.avatar}</div>
              <div className="flex-1">
                <p style={{ color: "#fff", fontSize: "0.8rem", fontWeight: 500 }}>{c.name}</p>
                <p style={{ color: "#C4C4C4", fontSize: "0.7rem" }}>{c.role} · {c.location}</p>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-12 h-1.5 rounded-full bg-white/10">
                  <div className="h-full rounded-full" style={{ width: `${c.match}%`, background: "linear-gradient(90deg, #7C3AED, #2563EB)" }} />
                </div>
                <span style={{ color: "#A78BFA", fontSize: "0.7rem", fontWeight: 600 }}>{c.match}%</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Upcoming interviews */}
      <div className="p-5 rounded-2xl" style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)" }}>
        <div className="flex items-center justify-between mb-4">
          <p style={{ color: "#fff", fontWeight: 600, fontSize: "0.875rem" }}>Próximas Entrevistas</p>
          <button onClick={() => setActiveSection("interviews")} style={{ color: "#60A5FA", fontSize: "0.75rem" }} className="flex items-center gap-1">Ver todas <ChevronRight size={12}/></button>
        </div>
        <div className="flex flex-col gap-2">
          {interviews.map((iv, i) => (
            <div key={i} className="flex items-center gap-3 p-3 rounded-xl" style={{ background: "rgba(255,255,255,0.02)" }}>
              <div className="w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold" style={{ background: "rgba(37,99,235,0.2)", color: "#60A5FA" }}>{iv.candidate.split(" ").map(n => n[0]).join("")}</div>
              <div className="flex-1">
                <p style={{ color: "#fff", fontSize: "0.8rem", fontWeight: 500 }}>{iv.candidate}</p>
                <p style={{ color: "#C4C4C4", fontSize: "0.7rem" }}>{iv.role}</p>
              </div>
              <div className="text-right">
                <p style={{ color: "#fff", fontSize: "0.75rem", fontWeight: 600 }}>{iv.date} {iv.time}</p>
                <span className="px-2 py-0.5 rounded-full text-xs" style={{ background: iv.status === "Confirmada" ? "rgba(16,185,129,0.15)" : "rgba(245,158,11,0.15)", color: iv.status === "Confirmada" ? "#10b981" : "#F59E0B" }}>{iv.status}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function PostJobSection() {
  const [form, setForm] = useState({ title: "", desc: "", requirements: "", benefits: "", salary: "", city: "", modality: "Remoto", level: "Pleno" });
  const [generating, setGenerating] = useState(false);
  const [posted, setPosted] = useState(false);

  const generateWithAI = () => {
    if (!form.title) return;
    setGenerating(true);
    setTimeout(() => {
      setForm(prev => ({
        ...prev,
        desc: `Buscamos um ${prev.title} talentoso para se juntar ao nosso time de tecnologia. Você será responsável por desenvolver e manter soluções de alta qualidade, colaborar com stakeholders e contribuir para a cultura de inovação da empresa.`,
        requirements: "• 3+ anos de experiência na área\n• Inglês intermediário\n• Boa comunicação e trabalho em equipe\n• Proatividade e autonomia",
        benefits: "• Plano de saúde e odontológico\n• VR/VA\n• Home office flexível\n• Gympass\n• Educação corporativa",
      }));
      setGenerating(false);
    }, 1800);
  };

  if (posted) return (
    <div className="flex flex-col items-center justify-center py-20">
      <div className="w-16 h-16 rounded-full flex items-center justify-center mb-4" style={{ background: "rgba(16,185,129,0.15)" }}>
        <CheckCircle2 size={32} style={{ color: "#10b981" }} />
      </div>
      <h2 style={{ color: "#fff", fontWeight: 700, fontSize: "1.25rem", marginBottom: "0.5rem" }}>Vaga publicada com sucesso!</h2>
      <p style={{ color: "#C4C4C4" }}>Sua vaga já está visível para milhares de candidatos.</p>
      <button onClick={() => setPosted(false)} className="mt-6 px-6 py-2.5 rounded-xl text-sm font-semibold text-white" style={{ background: "linear-gradient(135deg, #7C3AED, #2563EB)" }}>Publicar outra vaga</button>
    </div>
  );

  return (
    <div className="max-w-2xl">
      <div className="flex items-center justify-between mb-6">
        <h2 style={{ color: "#fff", fontSize: "1.25rem", fontWeight: 700 }}>Publicar Vaga</h2>
        <button onClick={generateWithAI} disabled={generating || !form.title} className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm transition-all disabled:opacity-50" style={{ background: "rgba(124,58,237,0.15)", border: "1px solid rgba(124,58,237,0.3)", color: "#A78BFA" }}>
          {generating ? <><span className="w-3.5 h-3.5 border-2 border-purple-300/30 border-t-purple-300 rounded-full animate-spin"/>Gerando...</> : <><Sparkles size={14}/>Preencher com IA</>}
        </button>
      </div>

      <div className="flex flex-col gap-4">
        {[
          { label: "Título da vaga *", field: "title", placeholder: "Ex: Senior React Developer" },
          { label: "Cidade / Localização", field: "city", placeholder: "Ex: São Paulo, SP" },
          { label: "Faixa Salarial", field: "salary", placeholder: "Ex: R$10.000 – R$15.000" },
        ].map(f => (
          <div key={f.field}>
            <label style={{ color: "#C4C4C4", fontSize: "0.75rem", fontWeight: 600, display: "block", marginBottom: "0.5rem" }}>{f.label}</label>
            <input
              value={(form as any)[f.field]}
              onChange={e => setForm(prev => ({ ...prev, [f.field]: e.target.value }))}
              placeholder={f.placeholder}
              className="w-full px-4 py-2.5 rounded-xl text-sm outline-none focus:ring-1"
              style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)", color: "#fff" }}
            />
          </div>
        ))}

        <div className="grid grid-cols-2 gap-3">
          {[
            { label: "Modalidade", field: "modality", options: ["Remoto", "Híbrido", "Presencial"] },
            { label: "Nível", field: "level", options: ["Júnior", "Pleno", "Sênior", "Staff"] },
          ].map(f => (
            <div key={f.field}>
              <label style={{ color: "#C4C4C4", fontSize: "0.75rem", fontWeight: 600, display: "block", marginBottom: "0.5rem" }}>{f.label}</label>
              <select
                value={(form as any)[f.field]}
                onChange={e => setForm(prev => ({ ...prev, [f.field]: e.target.value }))}
                className="w-full px-4 py-2.5 rounded-xl text-sm outline-none"
                style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)", color: "#fff" }}
              >
                {f.options.map(o => <option key={o} value={o} style={{ background: "#111827" }}>{o}</option>)}
              </select>
            </div>
          ))}
        </div>

        {[
          { label: "Descrição da vaga", field: "desc", rows: 4 },
          { label: "Requisitos", field: "requirements", rows: 4 },
          { label: "Benefícios", field: "benefits", rows: 3 },
        ].map(f => (
          <div key={f.field}>
            <label style={{ color: "#C4C4C4", fontSize: "0.75rem", fontWeight: 600, display: "block", marginBottom: "0.5rem" }}>{f.label}</label>
            <textarea
              value={(form as any)[f.field]}
              onChange={e => setForm(prev => ({ ...prev, [f.field]: e.target.value }))}
              rows={f.rows}
              className="w-full px-4 py-2.5 rounded-xl text-sm outline-none resize-none"
              style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)", color: "#fff" }}
            />
          </div>
        ))}

        <button
          onClick={() => setPosted(true)}
          className="w-full py-3.5 rounded-xl font-semibold text-white text-sm transition-all hover:opacity-90"
          style={{ background: "linear-gradient(135deg, #7C3AED, #2563EB)" }}
        >
          Publicar Vaga
        </button>
      </div>
    </div>
  );
}

function MyJobsSection({ setActiveSection }: { setActiveSection: (s: string) => void }) {
  const statusColor: Record<string, string> = { Ativa: "#10b981", Pausada: "#F59E0B", Fechada: "#ef4444" };
  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 style={{ color: "#fff", fontSize: "1.25rem", fontWeight: 700 }}>Minhas Vagas</h2>
        <button onClick={() => setActiveSection("post-job")} className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm text-white font-semibold" style={{ background: "linear-gradient(135deg, #7C3AED, #2563EB)" }}>
          <PlusCircle size={14} /> Publicar vaga
        </button>
      </div>
      <div className="flex flex-col gap-3">
        {myJobs.map((job, i) => (
          <div key={i} className="flex items-center gap-4 p-4 rounded-2xl transition-all hover:bg-white/5" style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)" }}>
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-1">
                <p style={{ color: "#fff", fontWeight: 600, fontSize: "0.875rem" }}>{job.title}</p>
                <span className="px-2 py-0.5 rounded-full text-xs" style={{ background: `${statusColor[job.status]}20`, color: statusColor[job.status] }}>{job.status}</span>
              </div>
              <div className="flex flex-wrap gap-3">
                <span style={{ color: "#C4C4C4", fontSize: "0.72rem" }} className="flex items-center gap-1"><Eye size={10}/>{job.views} views</span>
                <span style={{ color: "#C4C4C4", fontSize: "0.72rem" }} className="flex items-center gap-1"><Users size={10}/>{job.applicants} candidatos</span>
                <span style={{ color: "#C4C4C4", fontSize: "0.72rem" }} className="flex items-center gap-1"><Clock size={10}/>{job.posted}</span>
                <span style={{ color: "#C4C4C4", fontSize: "0.72rem" }}>{job.level} · {job.modality}</span>
              </div>
            </div>
            <div className="flex gap-2">
              <button className="p-2 rounded-xl hover:bg-white/5 transition-all"><Edit size={14} style={{ color: "#C4C4C4" }} /></button>
              <button className="p-2 rounded-xl hover:bg-red-500/10 transition-all"><Trash2 size={14} style={{ color: "#C4C4C4" }} /></button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function CandidatesSection() {
  const [search, setSearch] = useState("");
  const statusColor: Record<string, string> = { Novo: "#7C3AED", "Em análise": "#F59E0B", Entrevista: "#2563EB", Favorito: "#10b981" };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 style={{ color: "#fff", fontSize: "1.25rem", fontWeight: 700 }}>Candidatos</h2>
        <div className="flex items-center gap-2 px-3 py-2 rounded-xl" style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)" }}>
          <Search size={14} style={{ color: "#C4C4C4" }} />
          <input placeholder="Buscar candidato..." value={search} onChange={e => setSearch(e.target.value)} className="bg-transparent outline-none text-sm" style={{ color: "#fff", width: "160px" }} />
        </div>
      </div>
      <div className="grid sm:grid-cols-2 gap-4">
        {candidates.filter(c => !search || c.name.toLowerCase().includes(search.toLowerCase())).map((c, i) => (
          <div key={i} className="p-5 rounded-2xl" style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)" }}>
            <div className="flex items-start gap-3 mb-4">
              <div className="w-11 h-11 rounded-full flex items-center justify-center text-sm font-bold" style={{ background: "linear-gradient(135deg, #7C3AED, #2563EB)", color: "#fff" }}>{c.avatar}</div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-0.5">
                  <p style={{ color: "#fff", fontWeight: 600, fontSize: "0.875rem" }}>{c.name}</p>
                  <span className="px-2 py-0.5 rounded-full text-xs" style={{ background: `${statusColor[c.status]}20`, color: statusColor[c.status] }}>{c.status}</span>
                </div>
                <p style={{ color: "#C4C4C4", fontSize: "0.75rem" }}>{c.role} · {c.exp}</p>
                <p style={{ color: "#C4C4C4", fontSize: "0.75rem" }}>{c.location}</p>
              </div>
              <div className="text-right">
                <p style={{ color: "#A78BFA", fontWeight: 700, fontSize: "0.875rem" }}>{c.match}%</p>
                <p style={{ color: "#C4C4C4", fontSize: "0.65rem" }}>match</p>
              </div>
            </div>
            <div className="flex flex-wrap gap-1 mb-4">
              {c.skills.map(s => <span key={s} className="px-2 py-0.5 rounded-md text-xs" style={{ background: "rgba(124,58,237,0.1)", color: "#A78BFA" }}>{s}</span>)}
            </div>
            <div className="flex gap-2">
              <button className="flex-1 py-2 rounded-xl text-xs font-semibold text-white" style={{ background: "linear-gradient(135deg, #7C3AED, #2563EB)" }}>Ver Perfil</button>
              <button className="flex-1 py-2 rounded-xl text-xs transition-all hover:bg-white/5" style={{ border: "1px solid rgba(255,255,255,0.1)", color: "#C4C4C4" }}>Convidar</button>
              <button className="p-2 rounded-xl transition-all hover:bg-white/5" style={{ border: "1px solid rgba(255,255,255,0.1)" }}><MessageSquare size={14} style={{ color: "#C4C4C4" }} /></button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function TalentBankSection() {
  return (
    <div>
      <h2 style={{ color: "#fff", fontSize: "1.25rem", fontWeight: 700, marginBottom: "0.5rem" }}>Banco de Talentos</h2>
      <p style={{ color: "#C4C4C4", fontSize: "0.875rem", marginBottom: "1.5rem" }}>Acesse candidatos passivos e construa seu pipeline de talentos</p>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {[...candidates, { name: "Felipe Rocha", role: "DevOps Engineer", avatar: "FR", exp: "7 anos", skills: ["K8s", "AWS", "Go"], location: "Remoto", match: 93, status: "Disponível" }].map((c, i) => (
          <div key={i} className="p-4 rounded-2xl" style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)" }}>
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold" style={{ background: "linear-gradient(135deg, #7C3AED, #2563EB)", color: "#fff" }}>{c.avatar}</div>
              <div>
                <p style={{ color: "#fff", fontWeight: 600, fontSize: "0.8rem" }}>{c.name}</p>
                <p style={{ color: "#C4C4C4", fontSize: "0.7rem" }}>{c.role}</p>
              </div>
            </div>
            <div className="flex flex-wrap gap-1 mb-3">
              {c.skills.slice(0, 3).map(s => <span key={s} className="px-2 py-0.5 rounded text-xs" style={{ background: "rgba(255,255,255,0.05)", color: "#C4C4C4" }}>{s}</span>)}
            </div>
            <div className="flex items-center justify-between">
              <span style={{ color: "#A78BFA", fontSize: "0.75rem", fontWeight: 600 }}>{c.match}% match</span>
              <button className="px-3 py-1 rounded-lg text-xs font-semibold text-white" style={{ background: "rgba(124,58,237,0.2)", border: "1px solid rgba(124,58,237,0.3)" }}>Contatar</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function InterviewsSection() {
  const [view, setView] = useState<"list" | "calendar">("list");
  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 style={{ color: "#fff", fontSize: "1.25rem", fontWeight: 700 }}>Entrevistas</h2>
        <div className="flex gap-2">
          {(["list", "calendar"] as const).map(v => (
            <button key={v} onClick={() => setView(v)} className="px-4 py-2 rounded-xl text-sm transition-all" style={{ background: view === v ? "rgba(37,99,235,0.2)" : "rgba(255,255,255,0.05)", border: view === v ? "1px solid rgba(37,99,235,0.4)" : "1px solid rgba(255,255,255,0.08)", color: view === v ? "#60A5FA" : "#C4C4C4" }}>
              {v === "list" ? "Lista" : "Calendário"}
            </button>
          ))}
        </div>
      </div>
      {view === "list" ? (
        <div className="flex flex-col gap-3">
          {interviews.map((iv, i) => (
            <div key={i} className="flex items-center gap-4 p-5 rounded-2xl" style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)" }}>
              <div className="w-12 h-12 rounded-2xl flex items-center justify-center text-sm font-bold" style={{ background: "linear-gradient(135deg, #2563EB, #7C3AED)", color: "#fff" }}>{iv.candidate.split(" ").map(n => n[0]).join("")}</div>
              <div className="flex-1">
                <p style={{ color: "#fff", fontWeight: 600 }}>{iv.candidate}</p>
                <p style={{ color: "#C4C4C4", fontSize: "0.8rem" }}>{iv.role}</p>
                <p style={{ color: "#C4C4C4", fontSize: "0.75rem", marginTop: "0.25rem" }} className="flex items-center gap-1"><Clock size={12}/>{iv.date} às {iv.time} · {iv.type}</p>
              </div>
              <div className="flex flex-col items-end gap-2">
                <span className="px-3 py-1 rounded-full text-xs" style={{ background: iv.status === "Confirmada" ? "rgba(16,185,129,0.15)" : "rgba(245,158,11,0.15)", color: iv.status === "Confirmada" ? "#10b981" : "#F59E0B" }}>{iv.status}</span>
                <button className="px-3 py-1 rounded-xl text-xs font-semibold text-white" style={{ background: "linear-gradient(135deg, #2563EB, #7C3AED)" }}>Entrar na Call</button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="p-6 rounded-2xl text-center" style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)" }}>
          <Calendar size={48} style={{ color: "#C4C4C4", margin: "0 auto 1rem" }} />
          <p style={{ color: "#fff", fontWeight: 600, marginBottom: "0.5rem" }}>Visualização de Calendário</p>
          <p style={{ color: "#C4C4C4", fontSize: "0.875rem" }}>3 entrevistas agendadas para esta semana</p>
          <div className="grid grid-cols-7 gap-1 mt-4">
            {["Seg", "Ter", "Qua", "Qui", "Sex", "Sáb", "Dom"].map((d, i) => (
              <div key={d} className="aspect-square rounded-xl flex flex-col items-center justify-center" style={{ background: [0, 2, 4].includes(i) ? "rgba(124,58,237,0.15)" : "rgba(255,255,255,0.02)", border: [0, 2, 4].includes(i) ? "1px solid rgba(124,58,237,0.3)" : "1px solid rgba(255,255,255,0.04)" }}>
                <span style={{ color: "#C4C4C4", fontSize: "0.65rem" }}>{d}</span>
                {[0, 2, 4].includes(i) && <span style={{ color: "#7C3AED", fontSize: "0.6rem", marginTop: "2px" }}>●</span>}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function AIRecruitmentSection() {
  return (
    <div className="max-w-2xl">
      <h2 style={{ color: "#fff", fontSize: "1.25rem", fontWeight: 700, marginBottom: "0.5rem" }}>IA de Recrutamento</h2>
      <p style={{ color: "#C4C4C4", fontSize: "0.875rem", marginBottom: "1.5rem" }}>Ferramentas de IA para acelerar e qualificar seu processo seletivo</p>
      {[
        { icon: Brain, color: "#7C3AED", title: "Ranking de Candidatos", desc: "Nossa IA analisa e ranqueia os candidatos automaticamente por compatibilidade com a vaga, experiência e habilidades.", action: "Ver ranking" },
        { icon: Sparkles, color: "#2563EB", title: "Resumo Automático de Currículos", desc: "Receba um resumo conciso e estruturado de cada currículo, destacando os pontos mais relevantes para sua vaga.", action: "Gerar resumos" },
        { icon: Star, color: "#F59E0B", title: "Análise de Compatibilidade", desc: "Score detalhado mostrando o percentual de compatibilidade entre o candidato e os requisitos da vaga.", action: "Analisar" },
        { icon: Edit, color: "#10b981", title: "Descrição Automática de Vagas", desc: "Gere descrições profissionais e atrativas para suas vagas com apenas o título e nível da posição.", action: "Gerar descrição" },
      ].map((feat, i) => (
        <div key={i} className="flex gap-4 p-5 rounded-2xl mb-3" style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)" }}>
          <div className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: `${feat.color}20` }}>
            <feat.icon size={20} style={{ color: feat.color }} />
          </div>
          <div className="flex-1">
            <p style={{ color: "#fff", fontWeight: 600, fontSize: "0.875rem", marginBottom: "0.25rem" }}>{feat.title}</p>
            <p style={{ color: "#C4C4C4", fontSize: "0.8rem", lineHeight: 1.6, marginBottom: "0.75rem" }}>{feat.desc}</p>
            <button className="px-4 py-1.5 rounded-xl text-xs font-semibold" style={{ background: `${feat.color}20`, border: `1px solid ${feat.color}40`, color: feat.color }}>{feat.action}</button>
          </div>
        </div>
      ))}
    </div>
  );
}

function CompanyMessagesSection() {
  const [msg, setMsg] = useState("");
  const chats = [
    { name: "Ana Silva", avatar: "AS", last: "Ótimo, posso na quinta às 10h", time: "10:45", unread: 1 },
    { name: "Bruno Costa", avatar: "BC", last: "Muito obrigado pela oportunidade!", time: "Ontem", unread: 0 },
  ];
  const [messages] = useState([
    { from: "them", text: "Olá! Vi que meu perfil foi aprovado para a próxima etapa.", time: "10:20" },
    { from: "me", text: "Olá Ana! Sim, ficamos impressionados com sua experiência. Podemos agendar uma entrevista?", time: "10:35" },
    { from: "them", text: "Claro! Estou disponível quarta ou quinta-feira.", time: "10:40" },
    { from: "me", text: "Perfeito! Que tal quinta-feira às 10h por videochamada?", time: "10:42" },
    { from: "them", text: "Ótimo, posso na quinta às 10h", time: "10:45" },
  ]);

  return (
    <div className="flex gap-4 h-[600px]">
      <div className="w-56 flex-shrink-0 flex flex-col rounded-2xl overflow-hidden" style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)" }}>
        <div className="p-4 border-b" style={{ borderColor: "rgba(255,255,255,0.06)" }}>
          <p style={{ color: "#fff", fontWeight: 600, fontSize: "0.875rem" }}>Mensagens</p>
        </div>
        {chats.map((c, i) => (
          <button key={i} className="flex items-center gap-3 p-3 text-left border-b" style={{ background: i === 0 ? "rgba(37,99,235,0.1)" : "transparent", borderColor: "rgba(255,255,255,0.04)" }}>
            <div className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0" style={{ background: "linear-gradient(135deg, #7C3AED, #2563EB)", color: "#fff" }}>{c.avatar}</div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between">
                <p style={{ color: "#fff", fontSize: "0.75rem", fontWeight: 600 }}>{c.name}</p>
                <p style={{ color: "#C4C4C4", fontSize: "0.6rem" }}>{c.time}</p>
              </div>
              <p style={{ color: "#C4C4C4", fontSize: "0.68rem", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{c.last}</p>
            </div>
            {c.unread > 0 && <span className="w-4 h-4 rounded-full text-xs flex items-center justify-center" style={{ background: "#2563EB", color: "#fff" }}>{c.unread}</span>}
          </button>
        ))}
      </div>
      <div className="flex-1 flex flex-col rounded-2xl overflow-hidden" style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)" }}>
        <div className="flex items-center gap-3 p-4 border-b" style={{ borderColor: "rgba(255,255,255,0.06)" }}>
          <div className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold" style={{ background: "linear-gradient(135deg, #7C3AED, #2563EB)", color: "#fff" }}>AS</div>
          <p style={{ color: "#fff", fontWeight: 600, fontSize: "0.875rem" }}>Ana Silva</p>
        </div>
        <div className="flex-1 p-4 overflow-y-auto flex flex-col gap-3">
          {messages.map((m, i) => (
            <div key={i} className={`flex ${m.from === "me" ? "justify-end" : "justify-start"}`}>
              <div className="max-w-[80%] px-4 py-2.5 rounded-2xl text-sm" style={{ background: m.from === "me" ? "linear-gradient(135deg, #2563EB, #7C3AED)" : "rgba(255,255,255,0.06)", color: "#fff" }}>
                {m.text}
                <p style={{ color: "rgba(255,255,255,0.5)", fontSize: "0.6rem", marginTop: "4px", textAlign: "right" }}>{m.time}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="p-4 border-t flex gap-2" style={{ borderColor: "rgba(255,255,255,0.06)" }}>
          <input value={msg} onChange={e => setMsg(e.target.value)} placeholder="Digite uma mensagem..." className="flex-1 px-4 py-2.5 rounded-xl text-sm outline-none" style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)", color: "#fff" }} />
          <button className="px-4 py-2.5 rounded-xl text-sm font-semibold text-white" style={{ background: "linear-gradient(135deg, #2563EB, #7C3AED)" }}>Enviar</button>
        </div>
      </div>
    </div>
  );
}

function ReportsSection() {
  return (
    <div>
      <h2 style={{ color: "#fff", fontSize: "1.25rem", fontWeight: 700, marginBottom: "1.5rem" }}>Relatórios</h2>
      <div className="grid sm:grid-cols-2 gap-4 mb-6">
        {[
          { label: "Taxa de Conversão", value: "8.4%", desc: "Candidatos → Entrevistas", trend: "+2.1%", color: "#10b981" },
          { label: "Tempo Médio de Contratação", value: "18 dias", desc: "Da publicação à contratação", trend: "-3 dias", color: "#7C3AED" },
          { label: "Taxa de Aceitação", value: "72%", desc: "Ofertas aceitas", trend: "+5%", color: "#2563EB" },
          { label: "NPS de Candidatos", value: "87", desc: "Satisfação com o processo", trend: "+4", color: "#F59E0B" },
        ].map((m, i) => (
          <div key={i} className="p-5 rounded-2xl" style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)" }}>
            <p style={{ color: "#C4C4C4", fontSize: "0.75rem" }}>{m.label}</p>
            <p style={{ color: "#fff", fontSize: "2rem", fontWeight: 800, letterSpacing: "-0.03em", margin: "0.25rem 0" }}>{m.value}</p>
            <div className="flex items-center gap-2">
              <span style={{ color: m.color, fontSize: "0.75rem", fontWeight: 600 }}>{m.trend}</span>
              <span style={{ color: "#C4C4C4", fontSize: "0.7rem" }}>{m.desc}</span>
            </div>
          </div>
        ))}
      </div>
      <div className="p-5 rounded-2xl" style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)" }}>
        <p style={{ color: "#fff", fontWeight: 600, fontSize: "0.875rem", marginBottom: "1rem" }}>Candidatos por Semana</p>
        <ResponsiveContainer width="100%" height={200}>
          <BarChart data={weekData}>
            <XAxis dataKey="day" tick={{ fill: "#C4C4C4", fontSize: 11 }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fill: "#C4C4C4", fontSize: 11 }} axisLine={false} tickLine={false} />
            <Tooltip contentStyle={{ background: "#111827", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 8, color: "#fff", fontSize: 12 }} />
            <Bar dataKey="candidatos" fill="#7C3AED" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

function CompanySettingsSection() {
  return (
    <div className="max-w-xl">
      <h2 style={{ color: "#fff", fontSize: "1.25rem", fontWeight: 700, marginBottom: "1.5rem" }}>Configurações da Empresa</h2>
      <div className="p-6 rounded-2xl mb-4" style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)" }}>
        <div className="flex items-center gap-4 mb-6">
          <div className="w-16 h-16 rounded-2xl flex items-center justify-center text-xl font-bold" style={{ background: "linear-gradient(135deg, #2563EB, #7C3AED)", color: "#fff" }}>TC</div>
          <div>
            <p style={{ color: "#fff", fontWeight: 700, fontSize: "1.1rem" }}>TechCorp</p>
            <p style={{ color: "#10b981", fontSize: "0.75rem" }}>● Plano Pro — R$149,90/mês</p>
            <p style={{ color: "#C4C4C4", fontSize: "0.75rem" }}>CNPJ: 12.345.678/0001-90</p>
          </div>
        </div>
        {[{ label: "Site", value: "techcorp.com.br" }, { label: "Setor", value: "Tecnologia" }, { label: "Tamanho", value: "51–200 funcionários" }, { label: "Cidade", value: "São Paulo, SP" }].map((f, i) => (
          <div key={i} className="flex items-center justify-between py-3 border-b last:border-0" style={{ borderColor: "rgba(255,255,255,0.06)" }}>
            <span style={{ color: "#C4C4C4", fontSize: "0.875rem" }}>{f.label}</span>
            <span style={{ color: "#fff", fontSize: "0.875rem" }}>{f.value}</span>
          </div>
        ))}
      </div>
      <button className="w-full py-3 rounded-xl text-sm font-semibold text-white" style={{ background: "linear-gradient(135deg, #7C3AED, #2563EB)" }}>Salvar alterações</button>
    </div>
  );
}
