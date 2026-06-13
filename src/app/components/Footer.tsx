import { Logo } from "./Logo";
import { Twitter, Linkedin, Instagram, Github, Youtube } from "lucide-react";

interface FooterProps {
  onNavigate: (page: string) => void;
}

export function Footer({ onNavigate }: FooterProps) {
  const links = {
    Plataforma: ["Vagas", "Empresas", "Candidatos", "Planos", "Blog"],
    Candidatos: ["Criar currículo", "Buscar vagas", "Alertas", "Recursos de carreira"],
    Empresas: ["Publicar vagas", "Banco de talentos", "Planos empresariais", "API"],
    NextVaga: ["Sobre nós", "Carreiras", "Contato", "Imprensa"],
    Legal: ["Termos de uso", "Privacidade", "Cookies", "Segurança"],
  };

  const socials = [
    { icon: Twitter, label: "Twitter" },
    { icon: Linkedin, label: "LinkedIn" },
    { icon: Instagram, label: "Instagram" },
    { icon: Github, label: "GitHub" },
    { icon: Youtube, label: "YouTube" },
  ];

  return (
    <footer style={{ background: "#09090B", borderTop: "1px solid rgba(255,255,255,0.06)" }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-8 mb-12">
          {/* Brand */}
          <div className="col-span-2 sm:col-span-3 lg:col-span-1">
            <Logo size={28} showText className="mb-4" />
            <p style={{ color: "#C4C4C4", fontSize: "0.8rem", lineHeight: 1.7, maxWidth: "200px" }}>
              Conectando talentos e empresas com tecnologia e inteligência artificial.
            </p>
            <div className="flex gap-3 mt-4">
              {socials.map(s => (
                <button key={s.label} className="w-8 h-8 rounded-lg flex items-center justify-center transition-all hover:bg-white/10" style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)" }}>
                  <s.icon size={14} style={{ color: "#C4C4C4" }} />
                </button>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(links).map(([title, items]) => (
            <div key={title}>
              <p style={{ color: "#fff", fontWeight: 600, fontSize: "0.8rem", marginBottom: "1rem", textTransform: "uppercase", letterSpacing: "0.05em" }}>{title}</p>
              <ul className="flex flex-col gap-2">
                {items.map(item => (
                  <li key={item}>
                    <button
                      onClick={() => onNavigate("landing")}
                      style={{ color: "#C4C4C4", fontSize: "0.8rem", textAlign: "left" }}
                      className="hover:text-white transition-colors"
                    >
                      {item}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-8 border-t" style={{ borderColor: "rgba(255,255,255,0.06)" }}>
          <p style={{ color: "#C4C4C4", fontSize: "0.75rem" }}>
            © 2024 NextVaga. Todos os direitos reservados.
          </p>
          <div className="flex items-center gap-1.5">
            <div className="w-2 h-2 rounded-full" style={{ background: "#10b981" }} />
            <span style={{ color: "#C4C4C4", fontSize: "0.75rem" }}>Todos os sistemas operacionais — 99.9% uptime</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
