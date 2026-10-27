import { createFileRoute } from "@tanstack/react-router";
import { Nav, Footer } from "@/components/landing/sections";
import { WhatsappFab } from "@/components/landing/WhatsappFab";
import { ArrowRight } from "lucide-react";
import { publicados, formatarData } from "@/lib/artigos";

const TITLE = "Artigos sobre liderança, vendas e IA na gestão | Ester Zen";
const DESC =
  "Textos de Ester Zen sobre liderança e gestão de equipes, liderança comercial e IA aplicada aos processos da liderança na pequena e média empresa.";
const URL = "https://www.esterzen.com/artigos";

export const Route = createFileRoute("/artigos/")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESC },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESC },
      { property: "og:type", content: "website" },
      { property: "og:url", content: URL },
    ],
    links: [{ rel: "canonical", href: URL }],
  }),
  component: ArtigosPage,
});

function ArtigosPage() {
  const lista = [...publicados()].sort((a, b) => b.data.localeCompare(a.data));
  return (
    <div className="dark min-h-screen bg-background text-foreground">
      <Nav />
      <main>
        <section className="pt-32 md:pt-40 pb-12">
          <div className="mx-auto max-w-3xl px-5 md:px-10">
            <p className="text-xs uppercase tracking-[0.3em] text-primary mb-6">Artigos</p>
            <h1 className="text-4xl md:text-6xl leading-[1.02] text-balance">
              Comportamento, relacionamento e resultado
            </h1>
            <p className="mt-6 text-lg text-muted-foreground leading-relaxed">
              Liderança de equipes, liderança comercial e IA nos processos da liderança, a partir do que acontece no balcão, na reunião e na rotina da empresa.
            </p>
          </div>
        </section>
        <section className="pb-24">
          <div className="mx-auto max-w-3xl px-5 md:px-10 space-y-5">
            {lista.map((a) => (
              <a
                key={a.slug}
                href={`/artigos/${a.slug}`}
                className="block rounded-2xl border border-border bg-card p-7 hover:border-primary/60 transition-colors"
              >
                <p className="text-xs uppercase tracking-widest text-primary mb-3">
                  {a.tema} · {formatarData(a.data)}
                </p>
                <h2 className="text-2xl md:text-3xl mb-3">{a.titulo}</h2>
                <p className="text-muted-foreground leading-relaxed">{a.descricao}</p>
                <span className="mt-5 inline-flex items-center gap-2 text-sm text-primary">
                  Ler o artigo <ArrowRight className="h-4 w-4" />
                </span>
              </a>
            ))}
          </div>
        </section>
      </main>
      <Footer />
      <WhatsappFab />
    </div>
  );
}
