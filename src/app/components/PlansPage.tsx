import { CheckCircle2, Zap, Building2, Crown } from "lucide-react";

interface PlansPageProps {
  onNavigate: (page: string) => void;
}

const candidatePlans = [
  {
    name: "Gratuito",
    price: "R$0",
    period: "",
    desc: "Para quem está começando",
    icon: Zap,
    color: "#C4C4C4",
    features: [
      "Criar perfil profissional",
      "Currículo online básico",
      "Candidatar-se a vagas",
      "Alertas de vagas (3/mês)",
      "5 candidaturas/mês",
    ],
    cta: "Começar grátis",
    popular: false,
  },
  {
    name: "Pro",
    price: "R$29,90",
    period: "/mês",
    desc: "Para quem quer se destacar",
    icon: Crown,
    color: "#7C3AED",
    features: [
      "Tudo do plano Gratuito",
      "Candidaturas ilimitadas",
      "Alertas ilimitados",
      "Análise de currículo por IA",
      "Currículo premium (5 modelos)",
      "Badge 'Candidato Verificado'",
      "Prioridade nas buscas",
      "Suporte prioritário",
    ],
    cta: "Assinar Pro",
    popular: true,
  },
];

const companyPlans = [
  {
    name: "Básico",
    price: "R$49,90",
    period: "/mês",
    desc: "Para PMEs e startups",
    icon: Building2,
    color: "#2563EB",
    features: [
      "3 vagas ativas simultâneas",
      "100 candidatos/mês",
      "Filtros básicos",
      "Dashboard básico",
      "Suporte por email",
    ],
    cta: "Assinar Básico",
    popular: false,
  },
  {
    name: "Pro",
    price: "R$149,90",
    period: "/mês",
    desc: "Para empresas em crescimento",
    icon: Crown,
    color: "#7C3AED",
    features: [
      "10 vagas ativas simultâneas",
      "Candidatos ilimitados",
      "Ranking por IA",
      "Banco de talentos",
      "Sistema de entrevistas",
      "Mensagens integradas",
      "Relatórios avançados",
      "Suporte prioritário",
    ],
    cta: "Assinar Pro",
    popular: true,
  },
  {
    name: "Empresarial",
    price: "R$499,90",
    period: "/mês",
    desc: "Para grandes corporações",
    icon: Crown,
    color: "#9333EA",
    features: [
      "Vagas ilimitadas",
      "Candidatos ilimitados",
      "IA avançada de recrutamento",
      "API de integração",
      "Multi-usuário / equipes",
      "SLA garantido 99.9%",
      "Gerente de conta dedicado",
      "Onboarding personalizado",
    ],
    cta: "Falar com vendas",
    popular: false,
  },
];

function PlanCard({ plan, onNavigate }: { plan: typeof candidatePlans[0] | typeof companyPlans[0], onNavigate: (p: string) => void }) {
  return (
    <div
      className="relative p-6 rounded-2xl flex flex-col transition-all duration-300 hover:scale-[1.02]"
      style={{
        background: plan.popular ? "rgba(124,58,237,0.08)" : "rgba(255,255,255,0.03)",
        border: plan.popular ? "1px solid rgba(124,58,237,0.4)" : "1px solid rgba(255,255,255,0.08)",
      }}
    >
      {plan.popular && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full text-xs font-bold" style={{ background: "linear-gradient(135deg, #7C3AED, #2563EB)", color: "#fff" }}>
          Mais popular
        </div>
      )}

      <div className="flex items-center gap-3 mb-4">
        <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: `${plan.color}20` }}>
          <plan.icon size={20} style={{ color: plan.color }} />
        </div>
        <div>
          <p style={{ color: "#fff", fontWeight: 700, fontSize: "1rem" }}>{plan.name}</p>
          <p style={{ color: "#C4C4C4", fontSize: "0.72rem" }}>{plan.desc}</p>
        </div>
      </div>

      <div className="mb-6">
        <span style={{ color: "#fff", fontSize: "2rem", fontWeight: 800, letterSpacing: "-0.03em" }}>{plan.price}</span>
        <span style={{ color: "#C4C4C4", fontSize: "0.875rem" }}>{plan.period}</span>
      </div>

      <ul className="flex flex-col gap-2.5 flex-1 mb-6">
        {plan.features.map((f, i) => (
          <li key={i} className="flex items-center gap-2.5 text-sm" style={{ color: "#C4C4C4" }}>
            <CheckCircle2 size={14} style={{ color: "#10b981", flexShrink: 0 }} />
            {f}
          </li>
        ))}
      </ul>

      <button
        onClick={() => onNavigate("register")}
        className="w-full py-3 rounded-xl font-semibold text-sm transition-all hover:opacity-90"
        style={{
          background: plan.popular ? "linear-gradient(135deg, #7C3AED, #2563EB)" : "rgba(255,255,255,0.06)",
          color: "#fff",
          border: plan.popular ? "none" : "1px solid rgba(255,255,255,0.1)",
        }}
      >
        {plan.cta}
      </button>
    </div>
  );
}

export function PlansPage({ onNavigate }: PlansPageProps) {
  return (
    <div className="min-h-screen pt-24 pb-16" style={{ background: "#09090B" }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold mb-4 border" style={{ background: "rgba(124,58,237,0.12)", borderColor: "rgba(124,58,237,0.3)", color: "#A78BFA" }}>
            <Crown size={12} /> Planos e Preços
          </div>
          <h1 style={{ color: "#fff", fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 800 }}>Invista na sua carreira ou contratação</h1>
          <p className="mt-3 max-w-xl mx-auto" style={{ color: "#C4C4C4" }}>Planos flexíveis para candidatos e empresas de todos os tamanhos. Comece grátis e evolua quando precisar.</p>
        </div>

        {/* Candidate plans */}
        <div className="mb-16">
          <h2 className="mb-6" style={{ color: "#fff", fontWeight: 700, fontSize: "1.25rem" }}>Para Candidatos</h2>
          <div className="grid sm:grid-cols-2 max-w-2xl gap-4">
            {candidatePlans.map((p, i) => <PlanCard key={i} plan={p} onNavigate={onNavigate} />)}
          </div>
        </div>

        {/* Company plans */}
        <div>
          <h2 className="mb-6" style={{ color: "#fff", fontWeight: 700, fontSize: "1.25rem" }}>Para Empresas</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {companyPlans.map((p, i) => <PlanCard key={i} plan={p} onNavigate={onNavigate} />)}
          </div>
        </div>

        {/* FAQ */}
        <div className="mt-16 max-w-2xl mx-auto">
          <h2 className="text-center mb-8" style={{ color: "#fff", fontWeight: 700, fontSize: "1.25rem" }}>Perguntas frequentes</h2>
          {[
            { q: "Posso cancelar a qualquer momento?", a: "Sim! Não há fidelidade. Você pode cancelar quando quiser e continua com acesso até o fim do período pago." },
            { q: "Os planos incluem suporte?", a: "Todos os planos têm suporte. Planos pagos têm suporte prioritário com tempo de resposta menor." },
            { q: "Posso mudar de plano?", a: "Sim! Você pode fazer upgrade ou downgrade do seu plano a qualquer momento." },
          ].map((item, i) => (
            <div key={i} className="mb-3 p-5 rounded-2xl" style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)" }}>
              <p style={{ color: "#fff", fontWeight: 600, marginBottom: "0.5rem" }}>{item.q}</p>
              <p style={{ color: "#C4C4C4", fontSize: "0.875rem" }}>{item.a}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
