import { useState } from "react";
import { Search, MapPin, Briefcase, DollarSign, Filter, Bookmark, Share2, ExternalLink, Clock, Building2, Star, ChevronDown, X, SlidersHorizontal } from "lucide-react";

interface Job {
  id: number;
  title: string;
  company: string;
  logo: string;
  location: string;
  modality: string;
  level: string;
  salary: string;
  tags: string[];
  description: string;
  benefits: string[];
  posted: string;
  match: number;
  featured?: boolean;
}

const JOBS: Job[] = [
  { id: 1, title: "Senior React Developer", company: "TechCorp", logo: "TC", location: "São Paulo, SP", modality: "Remoto", level: "Sênior", salary: "R$15k–R$20k", tags: ["React", "TypeScript", "Node.js", "AWS"], description: "Buscamos um desenvolvedor React sênior para liderar o desenvolvimento do nosso produto SaaS B2B.", benefits: ["VR/VA", "Plano de saúde", "Home office", "Stock options"], posted: "2h", match: 95, featured: true },
  { id: 2, title: "Product Designer UX/UI", company: "Inovação SA", logo: "IS", location: "Rio de Janeiro, RJ", modality: "Híbrido", level: "Pleno", salary: "R$8k–R$12k", tags: ["Figma", "Design System", "Pesquisa", "Prototipagem"], description: "Oportunidade para designer apaixonado em criar experiências que fazem a diferença.", benefits: ["Plano de saúde", "VR", "Gympass", "Educação"], posted: "5h", match: 88 },
  { id: 3, title: "Data Scientist", company: "StartupBR", logo: "SB", location: "Brasília, DF", modality: "Remoto", level: "Sênior", salary: "R$18k–R$25k", tags: ["Python", "ML", "TensorFlow", "SQL"], description: "Trabalhe com dados em escala para resolver problemas complexos de negócio.", benefits: ["Home office", "Stock options", "Plano premium", "Curso"], posted: "1d", match: 82 },
  { id: 4, title: "DevOps Engineer", company: "CloudBrasil", logo: "CB", location: "Porto Alegre, RS", modality: "Remoto", level: "Pleno", salary: "R$12k–R$16k", tags: ["Kubernetes", "Docker", "AWS", "Terraform"], description: "Buscamos engenheiro DevOps para expandir nossa infraestrutura cloud.", benefits: ["VR/VA", "Plano de saúde", "Educação", "PLR"], posted: "2d", match: 79 },
  { id: 5, title: "Fullstack Developer", company: "FinTech ABC", logo: "FA", location: "São Paulo, SP", modality: "Presencial", level: "Júnior", salary: "R$4k–R$7k", tags: ["Vue.js", "Python", "PostgreSQL", "Docker"], description: "Vaga para desenvolvedor fullstack iniciante com vontade de crescer numa fintech.", benefits: ["VR/VA", "Plano de saúde", "PLR", "Treinamentos"], posted: "3d", match: 71 },
  { id: 6, title: "Backend Engineer (Go)", company: "MicroServ", logo: "MS", location: "Curitiba, PR", modality: "Híbrido", level: "Sênior", salary: "R$20k–R$28k", tags: ["Go", "gRPC", "Kafka", "PostgreSQL"], description: "Construa serviços de alta performance com Go e arquitetura de microsserviços.", benefits: ["Salário top de mercado", "Home office", "Stock", "Saúde premium"], posted: "4d", match: 76 },
];

interface JobSearchProps {
  onNavigate: (page: string) => void;
}

export function JobSearch({ onNavigate }: JobSearchProps) {
  const [search, setSearch] = useState("");
  const [city, setCity] = useState("");
  const [activeModality, setActiveModality] = useState<string[]>([]);
  const [activeLevel, setActiveLevel] = useState<string[]>([]);
  const [savedJobs, setSavedJobs] = useState<number[]>([]);
  const [selectedJob, setSelectedJob] = useState<Job | null>(JOBS[0]);
  const [showFilters, setShowFilters] = useState(false);

  const modalities = ["Remoto", "Híbrido", "Presencial"];
  const levels = ["Júnior", "Pleno", "Sênior"];

  const toggleFilter = (arr: string[], setArr: (v: string[]) => void, val: string) => {
    setArr(arr.includes(val) ? arr.filter(x => x !== val) : [...arr, val]);
  };

  const filtered = JOBS.filter(j => {
    const matchSearch = !search || j.title.toLowerCase().includes(search.toLowerCase()) || j.company.toLowerCase().includes(search.toLowerCase()) || j.tags.some(t => t.toLowerCase().includes(search.toLowerCase()));
    const matchCity = !city || j.location.toLowerCase().includes(city.toLowerCase()) || j.modality.toLowerCase().includes(city.toLowerCase());
    const matchModality = !activeModality.length || activeModality.includes(j.modality);
    const matchLevel = !activeLevel.length || activeLevel.includes(j.level);
    return matchSearch && matchCity && matchModality && matchLevel;
  });

  const modalityColor: Record<string, string> = { Remoto: "#10b981", Híbrido: "#F59E0B", Presencial: "#2563EB" };
  const levelColor: Record<string, string> = { Júnior: "#06b6d4", Pleno: "#7C3AED", Sênior: "#9333EA" };

  return (
    <div className="min-h-screen pt-16" style={{ background: "#09090B" }}>
      {/* Header search */}
      <div className="border-b py-6 px-4" style={{ background: "rgba(255,255,255,0.02)", borderColor: "rgba(255,255,255,0.06)" }}>
        <div className="max-w-7xl mx-auto">
          <h1 className="mb-4" style={{ color: "#fff", fontSize: "1.5rem", fontWeight: 700 }}>Encontre sua próxima vaga</h1>
          <div className="flex flex-col sm:flex-row gap-2">
            <div className="flex items-center gap-2 flex-1 px-4 py-2.5 rounded-xl" style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)" }}>
              <Search size={16} style={{ color: "#C4C4C4" }} />
              <input placeholder="Cargo, empresa ou tecnologia..." value={search} onChange={e => setSearch(e.target.value)} className="flex-1 bg-transparent outline-none text-sm" style={{ color: "#fff" }} />
              {search && <button onClick={() => setSearch("")}><X size={14} style={{ color: "#C4C4C4" }} /></button>}
            </div>
            <div className="flex items-center gap-2 flex-1 px-4 py-2.5 rounded-xl" style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)" }}>
              <MapPin size={16} style={{ color: "#C4C4C4" }} />
              <input placeholder="Cidade ou modalidade..." value={city} onChange={e => setCity(e.target.value)} className="flex-1 bg-transparent outline-none text-sm" style={{ color: "#fff" }} />
            </div>
            <button onClick={() => setShowFilters(!showFilters)} className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm transition-all" style={{ background: showFilters ? "rgba(124,58,237,0.2)" : "rgba(255,255,255,0.05)", border: showFilters ? "1px solid rgba(124,58,237,0.4)" : "1px solid rgba(255,255,255,0.08)", color: "#fff" }}>
              <SlidersHorizontal size={16} /> Filtros
            </button>
          </div>

          {/* Filters */}
          {showFilters && (
            <div className="mt-3 flex flex-wrap gap-4">
              <div className="flex items-center gap-2 flex-wrap">
                <span style={{ color: "#C4C4C4", fontSize: "0.75rem", fontWeight: 500 }}>Modalidade:</span>
                {modalities.map(m => (
                  <button key={m} onClick={() => toggleFilter(activeModality, setActiveModality, m)} className="px-3 py-1 rounded-full text-xs transition-all" style={{ background: activeModality.includes(m) ? `${modalityColor[m]}20` : "rgba(255,255,255,0.05)", border: activeModality.includes(m) ? `1px solid ${modalityColor[m]}60` : "1px solid rgba(255,255,255,0.08)", color: activeModality.includes(m) ? modalityColor[m] : "#C4C4C4" }}>{m}</button>
                ))}
              </div>
              <div className="flex items-center gap-2 flex-wrap">
                <span style={{ color: "#C4C4C4", fontSize: "0.75rem", fontWeight: 500 }}>Nível:</span>
                {levels.map(l => (
                  <button key={l} onClick={() => toggleFilter(activeLevel, setActiveLevel, l)} className="px-3 py-1 rounded-full text-xs transition-all" style={{ background: activeLevel.includes(l) ? `${levelColor[l]}20` : "rgba(255,255,255,0.05)", border: activeLevel.includes(l) ? `1px solid ${levelColor[l]}60` : "1px solid rgba(255,255,255,0.08)", color: activeLevel.includes(l) ? levelColor[l] : "#C4C4C4" }}>{l}</button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="flex gap-6">
          {/* Job list */}
          <div className="w-full lg:w-2/5 flex flex-col gap-3">
            <p style={{ color: "#C4C4C4", fontSize: "0.8rem" }}>{filtered.length} vagas encontradas</p>
            {filtered.map(job => (
              <div
                key={job.id}
                onClick={() => setSelectedJob(job)}
                className="p-4 rounded-2xl cursor-pointer transition-all"
                style={{
                  background: selectedJob?.id === job.id ? "rgba(124,58,237,0.1)" : "rgba(255,255,255,0.03)",
                  border: selectedJob?.id === job.id ? "1px solid rgba(124,58,237,0.4)" : "1px solid rgba(255,255,255,0.06)",
                }}
              >
                {job.featured && (
                  <div className="flex items-center gap-1 mb-2">
                    <Star size={10} fill="#F59E0B" color="#F59E0B" />
                    <span style={{ color: "#F59E0B", fontSize: "0.65rem", fontWeight: 600 }}>DESTAQUE</span>
                  </div>
                )}
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center text-xs font-bold flex-shrink-0" style={{ background: "linear-gradient(135deg, #7C3AED, #2563EB)", color: "#fff" }}>{job.logo}</div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <p style={{ color: "#fff", fontWeight: 600, fontSize: "0.875rem" }}>{job.title}</p>
                      <button onClick={e => { e.stopPropagation(); setSavedJobs(s => s.includes(job.id) ? s.filter(x => x !== job.id) : [...s, job.id]); }}>
                        <Bookmark size={14} fill={savedJobs.includes(job.id) ? "#7C3AED" : "none"} color={savedJobs.includes(job.id) ? "#7C3AED" : "#C4C4C4"} />
                      </button>
                    </div>
                    <p style={{ color: "#C4C4C4", fontSize: "0.75rem" }}>{job.company}</p>
                    <div className="flex flex-wrap items-center gap-2 mt-2">
                      <span style={{ color: "#C4C4C4", fontSize: "0.65rem" }} className="flex items-center gap-1"><MapPin size={10}/>{job.location}</span>
                      <span className="px-2 py-0.5 rounded-full text-xs" style={{ background: `${modalityColor[job.modality]}20`, color: modalityColor[job.modality] }}>{job.modality}</span>
                      <span className="px-2 py-0.5 rounded-full text-xs" style={{ background: `${levelColor[job.level]}20`, color: levelColor[job.level] }}>{job.level}</span>
                    </div>
                    <div className="flex items-center justify-between mt-2">
                      <span style={{ color: "#10b981", fontSize: "0.75rem", fontWeight: 600 }}>{job.salary}</span>
                      <div className="flex items-center gap-1.5">
                        <div className="w-12 h-1.5 rounded-full bg-white/10">
                          <div className="h-full rounded-full" style={{ width: `${job.match}%`, background: "linear-gradient(90deg, #7C3AED, #2563EB)" }} />
                        </div>
                        <span style={{ color: "#A78BFA", fontSize: "0.65rem", fontWeight: 600 }}>{job.match}%</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex flex-wrap gap-1 mt-3">
                  {job.tags.slice(0, 3).map(tag => (
                    <span key={tag} className="px-2 py-0.5 rounded-md text-xs" style={{ background: "rgba(255,255,255,0.05)", color: "#C4C4C4", border: "1px solid rgba(255,255,255,0.06)" }}>{tag}</span>
                  ))}
                  {job.tags.length > 3 && <span className="px-2 py-0.5 rounded-md text-xs" style={{ color: "#C4C4C4" }}>+{job.tags.length - 3}</span>}
                </div>
                <p style={{ color: "#C4C4C4", fontSize: "0.65rem", marginTop: "0.5rem" }} className="flex items-center gap-1"><Clock size={10}/>{job.posted} atrás</p>
              </div>
            ))}
          </div>

          {/* Job detail */}
          {selectedJob && (
            <div className="hidden lg:block flex-1 rounded-2xl p-8 sticky top-20 self-start max-h-[calc(100vh-6rem)] overflow-y-auto" style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)" }}>
              <div className="flex items-start justify-between mb-6">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-2xl flex items-center justify-center text-sm font-bold" style={{ background: "linear-gradient(135deg, #7C3AED, #2563EB)", color: "#fff" }}>{selectedJob.logo}</div>
                  <div>
                    <h2 style={{ color: "#fff", fontSize: "1.25rem", fontWeight: 700 }}>{selectedJob.title}</h2>
                    <p style={{ color: "#C4C4C4", fontSize: "0.875rem" }}>{selectedJob.company} · {selectedJob.location}</p>
                  </div>
                </div>
                <button onClick={() => setSavedJobs(s => s.includes(selectedJob.id) ? s.filter(x => x !== selectedJob.id) : [...s, selectedJob.id])} className="p-2 rounded-xl transition-all hover:bg-white/5">
                  <Bookmark size={18} fill={savedJobs.includes(selectedJob.id) ? "#7C3AED" : "none"} color={savedJobs.includes(selectedJob.id) ? "#7C3AED" : "#C4C4C4"} />
                </button>
              </div>

              <div className="flex flex-wrap gap-2 mb-6">
                <span className="px-3 py-1 rounded-full text-xs" style={{ background: `${modalityColor[selectedJob.modality]}20`, color: modalityColor[selectedJob.modality] }}>{selectedJob.modality}</span>
                <span className="px-3 py-1 rounded-full text-xs" style={{ background: `${levelColor[selectedJob.level]}20`, color: levelColor[selectedJob.level] }}>{selectedJob.level}</span>
                <span className="px-3 py-1 rounded-full text-xs" style={{ background: "rgba(16,185,129,0.15)", color: "#10b981" }}>{selectedJob.salary}</span>
                <span className="px-3 py-1 rounded-full text-xs flex items-center gap-1" style={{ background: "rgba(124,58,237,0.15)", color: "#A78BFA" }}><Star size={10}/>{selectedJob.match}% match</span>
              </div>

              <p style={{ color: "#C4C4C4", fontSize: "0.875rem", lineHeight: 1.8 }} className="mb-6">{selectedJob.description}</p>

              <div className="mb-6">
                <p style={{ color: "#fff", fontWeight: 600, fontSize: "0.875rem", marginBottom: "0.75rem" }}>Tecnologias</p>
                <div className="flex flex-wrap gap-2">
                  {selectedJob.tags.map(tag => (
                    <span key={tag} className="px-3 py-1 rounded-lg text-xs" style={{ background: "rgba(124,58,237,0.1)", color: "#A78BFA", border: "1px solid rgba(124,58,237,0.2)" }}>{tag}</span>
                  ))}
                </div>
              </div>

              <div className="mb-8">
                <p style={{ color: "#fff", fontWeight: 600, fontSize: "0.875rem", marginBottom: "0.75rem" }}>Benefícios</p>
                <div className="grid grid-cols-2 gap-2">
                  {selectedJob.benefits.map(b => (
                    <div key={b} className="flex items-center gap-2">
                      <div className="w-4 h-4 rounded-full flex items-center justify-center" style={{ background: "rgba(16,185,129,0.2)" }}>
                        <svg width="8" height="8" viewBox="0 0 8 8" fill="none"><path d="M1.5 4L3.5 6L6.5 2" stroke="#10b981" strokeWidth="1.5" strokeLinecap="round"/></svg>
                      </div>
                      <span style={{ color: "#C4C4C4", fontSize: "0.78rem" }}>{b}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex gap-3">
                <button onClick={() => onNavigate("candidate-dashboard")} className="flex-1 py-3 rounded-xl font-semibold text-white text-sm transition-all hover:opacity-90" style={{ background: "linear-gradient(135deg, #7C3AED, #2563EB)" }}>
                  Candidatar-se
                </button>
                <button className="p-3 rounded-xl transition-all hover:bg-white/5" style={{ border: "1px solid rgba(255,255,255,0.1)" }}>
                  <Share2 size={16} style={{ color: "#C4C4C4" }} />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
