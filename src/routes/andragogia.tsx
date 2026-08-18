import { createFileRoute } from "@tanstack/react-router";
import { Nav, Footer } from "@/components/landing/sections";
import { WhatsappFab } from "@/components/landing/WhatsappFab";
import { Button } from "@/components/ui/button";
import { ArrowRight, MessageCircle, Check } from "lucide-react";
import { buildWhatsappUrl } from "@/lib/contact";
import img0487 from "@/assets/IMG_0487.jpg.asset.json";

const OG_IMAGE = `https://www.esterzen.com${img0487.url}`;
const TITLE = "Andragogia: o que é e como aplicar no treinamento de líderes | Ester Zen";
const DESC =
  "Andragogia é o estudo de como o adulto aprende. Entenda os 6 princípios de Malcolm Knowles, a diferença para a pedagogia e como aplicar em treinamentos de liderança que mudam comportamento.";
const waMsg =
  "Olá, Ester! Vim pela página sobre andragogia e quero falar sobre um treinamento para a minha equipe.";

const principios = [
  {
    t: "1. Necessidade de saber",
    d: "O adulto quer entender por que precisa aprender aquilo antes de se dedicar. Sem o porquê, ele participa por educação — e esquece na segunda-feira.",
  },
  {
    t: "2. Autoconceito e autonomia",
    d: "Adulto se vê como responsável pelas próprias escolhas. Treinamento que trata gente experiente como aluno gera resistência silenciosa.",
  },
  {
    t: "3. Experiência como base",
    d: "Ele já viveu o problema. A experiência dele é o principal material do treinamento — ignorá-la é desperdiçar o melhor conteúdo da sala.",
  },
  {
    t: "4. Prontidão para aprender",
    d: "O adulto aprende o que resolve algo que já dói agora: um conflito no time, uma meta que não fecha, um talento pedindo demissão.",
  },
  {
    t: "5. Aprendizagem centrada em problemas",
    d: "Não se aprende por tópico, se aprende por situação. O conteúdo precisa chegar vestido de caso real, não de teoria.",
  },
  {
    t: "6. Motivação interna",
    d: "Certificado e obrigação movem presença. O que move mudança é ficar melhor no que a pessoa já se orgulha de fazer.",
  },
];

const comparativo = [
  ["Quem conduz a aprendizagem", "O professor decide o caminho", "O adulto co-decide o caminho"],
  ["Papel da experiência", "Pouca experiência prévia", "A experiência é o principal recurso"],
  ["Motivo para aprender", "Vai precisar no futuro", "Precisa resolver algo agora"],
  ["Organização do conteúdo", "Por matéria e sequência", "Por problema e aplicação"],
  ["Motivação", "Externa: nota, aprovação", "Interna: competência, reconhecimento"],
];

export const Route = createFileRoute("/andragogia")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESC },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESC },
      { property: "og:type", content: "article" },
      { property: "og:url", content: "https://www.esterzen.com/andragogia" },
      { property: "og:image", content: OG_IMAGE },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:image", content: OG_IMAGE },
    ],
    links: [{ rel: "canonical", href: "https://www.esterzen.com/andragogia" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Article",
          headline: "Andragogia: o que é e como aplicar no treinamento de líderes",
          description: DESC,
          image: OG_IMAGE,
          author: { "@type": "Person", name: "Ester Zen" },
          publisher: { "@type": "Person", name: "Ester Zen" },
          mainEntityOfPage: "https://www.esterzen.com/andragogia",
        }),
      },
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: [
            {
              "@type": "Question",
              name: "O que é andragogia?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "Andragogia é o campo que estuda como o adulto aprende. O termo foi usado pela primeira vez em 1833 por Alexander Kapp e popularizado por Malcolm Knowles nos anos 1970, que descreveu seis princípios: necessidade de saber, autonomia, experiência prévia, prontidão, foco em problemas e motivação interna.",
              },
            },
            {
              "@type": "Question",
              name: "Qual a diferença entre andragogia e pedagogia?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "Na pedagogia o professor decide o caminho e o conteúdo é organizado por matéria, para uso futuro. Na andragogia o adulto co-decide o caminho, a experiência dele é o principal recurso e o conteúdo se organiza por problemas que ele precisa resolver agora.",
              },
            },
            {
              "@type": "Question",
              name: "Como aplicar andragogia em treinamento de liderança?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "Comece pelo problema real do líder, use os casos que ele já vive, reduza exposição teórica, garanta prática em sala e termine com um compromisso escrito de conduta com prazo e acompanhamento no trabalho.",
              },
            },
            {
              "@type": "Question",
              name: "Andragogia funciona para equipes operacionais?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "Sim. Quanto menos tempo a pessoa passa em sala de aula, mais importante é partir da experiência dela e trabalhar com situações do próprio turno, em vez de conceito abstrato.",
              },
            },
          ],
        }),
      },
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: [
            { "@type": "ListItem", position: 1, name: "Início", item: "https://www.esterzen.com/" },
            { "@type": "ListItem", position: 2, name: "Andragogia", item: "https://www.esterzen.com/andragogia" },
          ],
        }),
      },
    ],
  }),
  component: AndragogiaPage,
});

function AndragogiaPage() {
  return (
    <div className="dark min-h-screen bg-background text-foreground">
      <Nav />
      <main>
        <section className="pt-32 md:pt-40 pb-12">
          <div className="mx-auto max-w-4xl px-5 md:px-10">
            <p className="text-xs uppercase tracking-[0.3em] text-primary mb-6">Aprendizagem de adultos</p>
            <h1 className="text-4xl md:text-6xl leading-[1.05] text-balance">
              Andragogia: por que <span className="italic text-primary">adulto não aprende</span> como criança
            </h1>
            <p className="mt-7 text-lg text-muted-foreground leading-relaxed">
              Andragogia é o estudo de como o adulto aprende. Na prática, é o que separa o treinamento que virou
              conversa de corredor do treinamento que mudou o comportamento do líder na segunda-feira. Aqui estão os
              seis princípios, a diferença para a pedagogia e o que isso muda no desenho de um treinamento de liderança.
            </p>
          </div>
        </section>

        <section className="pb-16">
          <div className="mx-auto max-w-4xl px-5 md:px-10">
            <h2 className="text-3xl md:text-4xl leading-tight text-balance mb-4">O que é andragogia</h2>
            <div className="space-y-4 text-foreground/90 leading-relaxed">
              <p>
                O termo apareceu em 1833, com o educador alemão Alexander Kapp, e ganhou corpo nos anos 1970 com{" "}
                <strong>Malcolm Knowles</strong>, que sistematizou a diferença entre ensinar crianças e formar adultos.
                Pedagogia vem de <em>paidós</em> (criança); andragogia vem de <em>andrós</em> (homem adulto).
              </p>
              <p>
                A tese é simples: o adulto chega com bagagem, com autonomia e com pressa. Ele não aprende para usar
                depois — aprende para resolver algo que já está custando caro. Quando o treinamento ignora isso, a sala
                fica educada, aplaude no final e não muda nada.
              </p>
            </div>
          </div>
        </section>

        <section className="py-16 border-t border-border/50">
          <div className="mx-auto max-w-5xl px-5 md:px-10">
            <h2 className="text-3xl md:text-4xl leading-tight text-balance mb-8">
              Os 6 princípios da andragogia (Knowles)
            </h2>
            <div className="grid md:grid-cols-2 gap-5">
              {principios.map((p) => (
                <div key={p.t} className="rounded-2xl border border-border bg-card p-6">
                  <h3 className="text-lg mb-2">{p.t}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{p.d}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-16 border-t border-border/50">
          <div className="mx-auto max-w-4xl px-5 md:px-10">
            <h2 className="text-3xl md:text-4xl leading-tight text-balance mb-8">Andragogia x pedagogia</h2>
            <div className="overflow-x-auto rounded-2xl border border-border">
              <table className="w-full text-left text-sm">
                <thead className="bg-surface/60">
                  <tr>
                    <th className="p-4 font-normal text-muted-foreground uppercase tracking-widest text-xs">Aspecto</th>
                    <th className="p-4 font-normal text-muted-foreground uppercase tracking-widest text-xs">Pedagogia</th>
                    <th className="p-4 font-normal text-muted-foreground uppercase tracking-widest text-xs">Andragogia</th>
                  </tr>
                </thead>
                <tbody>
                  {comparativo.map((row) => (
                    <tr key={row[0]} className="border-t border-border align-top">
                      <td className="p-4 text-foreground/90">{row[0]}</td>
                      <td className="p-4 text-muted-foreground">{row[1]}</td>
                      <td className="p-4 text-muted-foreground">{row[2]}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        <section className="py-16 border-t border-border/50">
          <div className="mx-auto max-w-4xl px-5 md:px-10">
            <h2 className="text-3xl md:text-4xl leading-tight text-balance mb-6">
              Como a andragogia aparece no meu workshop
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-8">
              O workshop <a href="/metodo" className="text-primary underline underline-offset-4">O Líder Que a Equipe Segue</a>{" "}
              é desenhado sobre esses princípios — por isso ele não termina em conteúdo, termina em um Plano de Conduta
              escrito por cada líder.
            </p>
            <div className="space-y-4">
              {[
                "Começa pelo problema que dói: a equipe que não entrega quando o líder não está na sala.",
                "Usa os casos que os próprios líderes trazem, não estudos de caso genéricos de outra empresa.",
                "Reduz exposição teórica e aumenta o tempo de prática, discussão e decisão em sala.",
                "Termina com compromisso escrito: qual conduta muda, a partir de quando e como será verificada.",
                "Prevê acompanhamento depois, porque adulto consolida no trabalho, não no auditório.",
              ].map((p) => (
                <p key={p} className="flex gap-3 text-foreground/90 leading-relaxed">
                  <Check className="h-5 w-5 text-primary shrink-0 mt-1" />
                  <span>{p}</span>
                </p>
              ))}
            </div>
            <div className="mt-10 flex flex-col sm:flex-row gap-3">
              <Button asChild size="lg" className="gap-2">
                <a href={buildWhatsappUrl(waMsg)} target="_blank" rel="noopener noreferrer">
                  <MessageCircle className="h-4 w-4" /> Falar sobre um treinamento
                </a>
              </Button>
              <Button asChild size="lg" variant="outline" className="gap-2">
                <a href="/teste-de-lideranca">
                  Fazer o teste de liderança <ArrowRight className="h-4 w-4" />
                </a>
              </Button>
            </div>
          </div>
        </section>

        <section className="py-16 border-t border-border/50 pb-24">
          <div className="mx-auto max-w-4xl px-5 md:px-10">
            <h2 className="text-3xl md:text-4xl leading-tight text-balance mb-8">Perguntas frequentes</h2>
            <div className="space-y-6">
              {[
                {
                  q: "Andragogia e heutagogia são a mesma coisa?",
                  a: "Não. A heutagogia é um passo adiante: o próprio aprendiz define o que, quando e como aprender, com autonomia quase total. A andragogia ainda pressupõe um facilitador que estrutura o percurso junto com o adulto.",
                },
                {
                  q: "Andragogia serve para equipes operacionais?",
                  a: "Sim, e com ainda mais razão. Quanto menos tempo a pessoa passa em sala, mais o conteúdo precisa partir da rotina real do turno dela.",
                },
                {
                  q: "Como medir se o treinamento funcionou?",
                  a: "Pelo comportamento observável depois: disposição espontânea da equipe, problemas avisados antes de estourarem e decisões tomadas sem o líder na sala. Reação e nota de satisfação medem a experiência, não a mudança.",
                },
              ].map((f) => (
                <div key={f.q} className="rounded-2xl border border-border bg-card p-6">
                  <h3 className="text-lg mb-2">{f.q}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{f.a}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <WhatsappFab />
    </div>
  );
}
