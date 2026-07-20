import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import {
  ArrowRight,
  Check,
  Clock,
  Users,
  MessageCircle,
  ShieldCheck,
  TrendingUp,
  Instagram,
  Youtube,
  Mail,
  Quote,
} from "lucide-react";
import { buildWhatsappUrl, CONTACT_EMAIL } from "@/lib/contact";

import imgHero from "@/assets/IMG_0582.jpg.asset.json";
import img0442 from "@/assets/IMG_0442.jpg.asset.json";
import img0527 from "@/assets/IMG_0527.jpg.asset.json";
import img0551 from "@/assets/IMG_0551.jpg.asset.json";
import img0565 from "@/assets/IMG_0565.jpg.asset.json";
import img0688 from "@/assets/IMG_0688.jpg.asset.json";

const heroWa = "Olá, Ester! Vim pelo site — quero conversar sobre uma palestra/workshop.";

export function Nav() {
  return (
    <nav className="fixed top-0 inset-x-0 z-30 backdrop-blur-md bg-background/70 border-b border-border/50">
      <div className="mx-auto max-w-7xl px-5 md:px-10 h-16 flex items-center justify-between">
        <a href="#top" className="font-display text-lg tracking-tight">
          Ester Zen<span className="text-primary">.</span>
        </a>
        <div className="hidden md:flex items-center gap-8 text-sm text-muted-foreground">
          <a href="/metodo" className="hover:text-foreground transition-colors">Método</a>
          <a href="/#programas" className="hover:text-foreground transition-colors">Programas</a>
          <a href="/#bastidores" className="hover:text-foreground transition-colors">Bastidores</a>
          <a href="/#faq" className="hover:text-foreground transition-colors">FAQ</a>
          <a href="/#contato" className="hover:text-foreground transition-colors">Contato</a>
        </div>
        <Button asChild size="sm" className="gap-2">
          <a href={buildWhatsappUrl(heroWa)} target="_blank" rel="noopener noreferrer">
            <MessageCircle className="h-3.5 w-3.5" /> Falar agora
          </a>
        </Button>
      </div>
    </nav>
  );
}

export function Hero() {
  return (
    <section id="top" className="relative min-h-[100svh] flex items-end overflow-hidden pt-16 grain">
      <div className="absolute inset-0">
        <img
          src={imgHero.url}
          alt="Ester Zen palestrando"
          width={1600}
          height={2000}
          fetchPriority="high"
          decoding="async"
          className="w-full h-full object-cover object-[70%_center] md:object-[60%_center]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/85 to-background/40" />
        <div className="absolute inset-0 bg-gradient-to-r from-background/95 via-background/60 to-transparent" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-5 md:px-10 py-16 md:py-24 w-full">
        <div className="max-w-3xl animate-fade-up">
          <p className="text-xs uppercase tracking-[0.3em] text-primary mb-6">
            Ester Zen · Comportamento & Resultado
          </p>
          <h1 className="text-5xl md:text-7xl lg:text-8xl leading-[0.95] text-balance">
            Sua equipe te <span className="italic text-primary">segue</span>
            <span className="block text-muted-foreground/70">— ou apenas te obedece?</span>
          </h1>
          <p className="mt-8 text-lg md:text-xl text-muted-foreground max-w-2xl leading-relaxed">
            Palestras e workshops de liderança comportamental para líderes que precisam parar de ser o teto do próprio time — e virar o padrão que a equipe segue quando eles não estão na sala.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row gap-4">
            <Button asChild size="lg" className="gap-2 text-base">
              <a href="#programas">
                Ver programas <ArrowRight className="h-4 w-4" />
              </a>
            </Button>
            <Button asChild size="lg" variant="outline" className="gap-2 text-base">
              <a href={buildWhatsappUrl(heroWa)} target="_blank" rel="noopener noreferrer">
                <MessageCircle className="h-4 w-4" /> Falar no WhatsApp
              </a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}

export function Authority() {
  const items = [
    "20+ anos em gestão comercial e liderança",
    "Credenciada SEBRAE SC · PR · SP · RJ",
    "Foco no único KPI que não dá pra fingir: disposição espontânea da equipe",
  ];
  return (
    <section aria-labelledby="authority-heading" className="border-y border-border bg-surface/50">
      <div className="mx-auto max-w-7xl px-5 md:px-10 py-8">
        <h2 id="authority-heading" className="sr-only">Credenciais e autoridade</h2>
        <ul className="flex flex-wrap items-center justify-center gap-x-10 gap-y-4 text-sm text-muted-foreground">
          {items.map((it) => (
            <li key={it} className="inline-flex items-center gap-2">
              <ShieldCheck className="h-4 w-4 text-primary shrink-0" />
              <span>{it}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export function Manifesto() {
  return (
    <section className="relative py-24 md:py-36">
      <div className="mx-auto max-w-5xl px-5 md:px-10">
        <p className="text-xs uppercase tracking-[0.3em] text-primary mb-8">O ponto cego da liderança</p>
        <h2 className="text-4xl md:text-6xl leading-tight text-balance">
          O problema não é a equipe cansada.<br />
          <span className="text-muted-foreground/70">É a equipe que</span>{" "}
          <span className="italic text-primary">não entrega</span>{" "}
          <span className="text-muted-foreground/70">quando você não está na sala.</span>
        </h2>
        <div className="mt-10 grid md:grid-cols-2 gap-8 text-lg leading-relaxed">
          <p className="text-muted-foreground">
            A diferença só aparece quando você não está: decisões que ficam paradas, erros que só chegam quando já viraram crise, reuniões em que todo mundo concorda — sempre. Ser obedecido tem um custo silencioso: <span className="text-foreground">você vira o teto do time</span>.
          </p>
          <div className="rounded-2xl border border-primary/30 bg-primary/5 p-6">
            <p className="text-xs uppercase tracking-widest text-primary mb-3">O único KPI que não dá pra fingir</p>
            <p className="text-foreground/90">
              <span className="font-display text-2xl text-foreground">Disposição espontânea da equipe.</span><br />
              <span className="text-muted-foreground">O que a equipe faz sem você pedir. É a única medida real de que ela te segue — e não só te obedece.</span>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export function ProgramCompare() {
  const wa = (t: string) =>
    buildWhatsappUrl(`Olá, Ester! Tenho interesse em ${t}. Podemos conversar?`);

  return (
    <section id="programas" className="py-24 md:py-32 relative">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent" />
      <div className="mx-auto max-w-7xl px-5 md:px-10">
        <div className="max-w-3xl">
          <p className="text-xs uppercase tracking-[0.3em] text-primary mb-4">Programas principais</p>
          <h2 className="text-4xl md:text-6xl leading-tight text-balance">
            Dois formatos.<br />
            <span className="text-muted-foreground/70">Uma mesma virada de chave.</span>
          </h2>
          <p className="mt-6 text-lg text-muted-foreground max-w-2xl">
            Cada programa é desenhado para gerar retorno mensurável — em produtividade, retenção e velocidade de decisão.
          </p>
        </div>

        <div className="mt-14 grid md:grid-cols-2 gap-6">
          {/* Palestra */}
          <article className="group relative rounded-3xl border border-border bg-gradient-to-b from-card to-surface p-8 md:p-10 flex flex-col shadow-2xl shadow-black/40 transition-all hover:border-primary/50 hover:-translate-y-1">
            <div className="flex items-center gap-3 text-xs uppercase tracking-widest text-primary">
              <Clock className="h-3.5 w-3.5" /> 50–60 min · plateia aberta
            </div>
            <h3 className="mt-4 text-3xl md:text-4xl leading-tight text-foreground">
              Palestra<br /><span className="italic text-primary">"O líder que a equipe segue"</span>
            </h3>
            <p className="mt-5 text-foreground/80 leading-relaxed">
              Uma provocação direta sobre a diferença entre ser obedecido e ser seguido — com histórias reais de gestão, dados de comportamento e um convite: sair da sala sabendo exatamente onde o seu padrão está travando o time.
            </p>

            <div className="mt-6 rounded-xl border border-primary/30 bg-primary/5 p-5">
              <p className="text-xs uppercase tracking-widest text-primary mb-3 inline-flex items-center gap-2">
                <TrendingUp className="h-3.5 w-3.5" /> ROI para quem contrata
              </p>
              <ul className="space-y-2 text-sm text-foreground/90">
                <li>→ Evento com <strong>NPS acima de 90</strong> e engajamento sustentado</li>
                <li>→ Conteúdo que <strong>vira pauta interna</strong> por semanas depois</li>
                <li>→ Posiciona a entidade como quem <strong>traz debate de verdade</strong></li>
              </ul>
            </div>

            <ul className="mt-6 space-y-3 text-sm text-foreground/90">
              {[
                "O custo invisível de ser 'só obedecido'",
                "As 4 condutas diárias de quem é seguido",
                "Como ler os sinais que sua equipe já dá",
                "Ideal para congressos, convenções e eventos de entidades",
              ].map((i) => (
                <li key={i} className="flex gap-3">
                  <Check className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                  <span>{i}</span>
                </li>
              ))}
            </ul>
            <div className="mt-8 pt-6 border-t border-border">
              <Button asChild size="lg" className="w-full gap-2">
                <a href={wa("a palestra 'O líder que a equipe segue'")} target="_blank" rel="noopener noreferrer">
                  Levar para minha equipe <ArrowRight className="h-4 w-4" />
                </a>
              </Button>
            </div>
          </article>

          {/* Workshop */}
          <article className="group relative rounded-3xl border-2 border-primary/60 bg-gradient-to-br from-primary/15 via-card to-card p-8 md:p-10 flex flex-col shadow-2xl shadow-primary/10 transition-all hover:-translate-y-1">
            <span className="absolute -top-3 left-8 bg-primary text-primary-foreground text-[10px] uppercase tracking-widest px-3 py-1 rounded-full font-semibold">
              Transformação profunda
            </span>
            <div className="flex items-center gap-3 text-xs uppercase tracking-widest text-primary">
              <Users className="h-3.5 w-3.5" /> 3–4 horas · turma fechada
            </div>
            <h3 className="mt-4 text-3xl md:text-4xl leading-tight text-foreground">
              Workshop<br /><span className="italic text-primary">"Como se tornar o líder que a equipe segue"</span>
            </h3>
            <p className="mt-5 text-foreground/85 leading-relaxed">
              Vai além da provocação: 5 etapas práticas em que cada líder mapeia o próprio padrão, identifica onde trava a equipe e sai com um <strong className="text-foreground">Plano de Conduta</strong> — um contrato pessoal do que vai mudar já na próxima segunda-feira.
            </p>

            <div className="mt-6 rounded-xl border border-primary/40 bg-primary/10 p-5">
              <p className="text-xs uppercase tracking-widest text-primary mb-3 inline-flex items-center gap-2">
                <TrendingUp className="h-3.5 w-3.5" /> ROI para quem contrata
              </p>
              <ul className="space-y-2 text-sm text-foreground/90">
                <li>→ <strong>Menos gargalo no gestor:</strong> decisões que hoje travam voltam a andar</li>
                <li>→ <strong>Retenção de talento:</strong> ataca a causa nº 1 de saída — chefe, não empresa</li>
                <li>→ <strong>Compliance NR-1:</strong> ativo aceito no plano de riscos psicossociais</li>
                <li>→ <strong>Entregável tangível:</strong> Plano de Conduta por líder, mensurável em 30/60/90 dias</li>
              </ul>
            </div>

            <ul className="mt-6 space-y-3 text-sm text-foreground/90">
              {[
                "Diagnóstico individual do padrão de liderança",
                "5 etapas guiadas com exercícios em dupla",
                "Plano de Conduta como entregável tangível",
                "Ideal para in-company, núcleos e turmas de líderes",
              ].map((i) => (
                <li key={i} className="flex gap-3">
                  <Check className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                  <span>{i}</span>
                </li>
              ))}
            </ul>
            <div className="mt-8 pt-6 border-t border-primary/20">
              <Button asChild size="lg" className="w-full gap-2">
                <a href={wa("o workshop 'Como se tornar o líder que a equipe segue'")} target="_blank" rel="noopener noreferrer">
                  Quero o workshop na minha empresa <ArrowRight className="h-4 w-4" />
                </a>
              </Button>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}

export function Gallery() {
  const shots = [img0688, img0527, img0442, img0551, img0565, imgHero];
  return (
    <section id="bastidores" className="py-24 md:py-32 bg-surface/40">
      <div className="mx-auto max-w-7xl px-5 md:px-10">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-primary mb-4">Bastidores</p>
            <h2 className="text-4xl md:text-5xl leading-tight text-balance">Do palco à sala de treinamento.</h2>
          </div>
          <p className="text-muted-foreground max-w-md">
            Empresas, entidades, cooperativas e associações que já colocaram a liderança em pauta.
          </p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
          {shots.map((s, i) => (
            <div
              key={s.url}
              className={`relative overflow-hidden rounded-lg bg-surface ${
                i === 0 || i === 3 ? "col-span-2 row-span-2 aspect-square" : "aspect-[4/5]"
              }`}
            >
              <img
                src={s.url}
                alt="Ester Zen em palestra"
                loading="lazy"
                className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/40 to-transparent pointer-events-none" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function ProgramsGrid() {
  const programs = [
    {
      tag: "Vendas",
      title: "Vendas que constroem relação",
      body: "Método para times comerciais venderem mais sem perder a confiança do cliente. Foco em comportamento de vendedor consultivo e recorrência.",
    },
    {
      tag: "Atendimento",
      title: "Atendimento & Experiência",
      body: "Transformar o atendimento em vantagem competitiva. Padrões de conduta, jornada do cliente e recuperação de crises.",
    },
    {
      tag: "Mulheres",
      title: "Marca & Mulheres Empreendedoras",
      body: "Programas específicos para mulheres à frente do próprio negócio: posicionamento, autoridade e sustentação da marca pessoal.",
    },
  ];
  return (
    <section className="py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-5 md:px-10">
        <div className="max-w-3xl">
          <p className="text-xs uppercase tracking-[0.3em] text-primary mb-4">Outros programas</p>
          <h2 className="text-4xl md:text-5xl leading-tight text-balance">
            Comportamento como resultado —{" "}
            <span className="text-muted-foreground/70">em várias frentes.</span>
          </h2>
        </div>
        <div className="mt-14 grid md:grid-cols-3 gap-6">
          {programs.map((p) => (
            <article key={p.title} className="rounded-2xl border border-border bg-card p-8 transition-colors hover:border-primary/40">
              <p className="text-xs uppercase tracking-widest text-primary">{p.tag}</p>
              <h3 className="mt-3 text-2xl leading-tight">{p.title}</h3>
              <p className="mt-4 text-muted-foreground leading-relaxed">{p.body}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export function ForWhom() {
  const items = [
    { t: "Entidades", d: "Sindicatos, associações e cooperativas que buscam palestras de alto impacto para associados e congressos." },
    { t: "Empresas", d: "In-company para times de liderança de média e alta gestão — do C-level a coordenadores." },
    { t: "Líderes individuais", d: "Empreendedores e executivos que sentem que o time depende demais deles para andar." },
  ];
  return (
    <section className="py-20 border-y border-border bg-surface/40">
      <div className="mx-auto max-w-7xl px-5 md:px-10">
        <p className="text-xs uppercase tracking-[0.3em] text-primary mb-6">Para quem é</p>
        <h2 className="text-3xl md:text-4xl leading-tight text-balance mb-10">Feito para três perfis.</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {items.map((i) => (
            <div key={i.t}>
              <h3 className="text-2xl">{i.t}</h3>
              <p className="mt-3 text-muted-foreground leading-relaxed">{i.d}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Faq() {
  const items = [
    {
      q: "A Ester atende fora de Santa Catarina?",
      a: "Sim. Palestras e workshops são realizados em todo o Brasil. Deslocamento e hospedagem são combinados no orçamento.",
    },
    {
      q: "Qual o tamanho ideal de turma para o workshop?",
      a: "O formato roda muito bem com grupos de 15 a 40 líderes. Turmas maiores são possíveis mediante ajuste de dinâmica.",
    },
    {
      q: "O workshop ajuda no cumprimento da NR-1?",
      a: "Sim. O conteúdo endereça diretamente riscos psicossociais ligados à liderança e é um ativo aceito no plano de ação da NR-1.",
    },
    {
      q: "Qual o prazo para agendar?",
      a: "Recomendamos com pelo menos 30 dias de antecedência. Datas em alta estação (novembro/dezembro e março) costumam fechar cedo.",
    },
    {
      q: "Vocês emitem certificado?",
      a: "Sim, para todos os participantes do workshop, com carga horária e conteúdo programático.",
    },
  ];
  return (
    <section id="faq" className="py-24 md:py-32">
      <div className="mx-auto max-w-4xl px-5 md:px-10">
        <p className="text-xs uppercase tracking-[0.3em] text-primary mb-4">Perguntas frequentes</p>
        <h2 className="text-4xl md:text-5xl leading-tight text-balance mb-12">Dúvidas que costumam aparecer.</h2>
        <Accordion type="single" collapsible className="w-full">
          {items.map((it, i) => (
            <AccordionItem key={it.q} value={`i-${i}`} className="border-border">
              <AccordionTrigger className="text-left text-lg font-normal font-display hover:no-underline">
                {it.q}
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground leading-relaxed">{it.a}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}

export function Footer() {
  return (
    <footer className="border-t border-border bg-surface/60 py-14">
      <div className="mx-auto max-w-7xl px-5 md:px-10 grid md:grid-cols-3 gap-10">
        <div>
          <p className="font-display text-2xl">Ester Zen<span className="text-primary">.</span></p>
          <p className="mt-2 text-sm text-muted-foreground">Comportamento & Resultado</p>
        </div>
        <div className="text-sm space-y-2">
          <p className="text-muted-foreground uppercase tracking-widest text-xs mb-3">Contato</p>
          <p>
            <a href={buildWhatsappUrl("Olá, Ester!")} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 hover:text-primary transition-colors">
              <MessageCircle className="h-4 w-4" /> WhatsApp (47) 99254-3200
            </a>
          </p>
          <p>
            <a href={`mailto:${CONTACT_EMAIL}`} className="inline-flex items-center gap-2 hover:text-primary transition-colors">
              <Mail className="h-4 w-4" /> {CONTACT_EMAIL}
            </a>
          </p>
        </div>
        <div className="text-sm space-y-2">
          <p className="text-muted-foreground uppercase tracking-widest text-xs mb-3">Redes</p>
          <p>
            <a href="https://instagram.com/esterzen" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 hover:text-primary transition-colors">
              <Instagram className="h-4 w-4" /> @esterzen
            </a>
          </p>
          <p>
            <a href="https://www.youtube.com/@aesterzen" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 hover:text-primary transition-colors">
              <Youtube className="h-4 w-4" /> @aesterzen
            </a>
          </p>
        </div>
      </div>
      <div className="mx-auto max-w-7xl px-5 md:px-10 mt-10 pt-6 border-t border-border/50 text-xs text-muted-foreground text-center">
        © {new Date().getFullYear()} Ester Zen · Todos os direitos reservados
      </div>
    </footer>
  );
}

export function Testimonials() {
  const items = [
    {
      quote: "Eu tinha opiniões sobre atendimento e sobre cliente beeeem diferente. Ela realmente te dá solução pra tudo. Ela é espetacular.",
      who: "Participante · workshop in-company",
    },
    {
      quote: "Que voz! Foi a primeira coisa que percebi quando entrei na sala. Você é muito espontânea e autêntica — e tudo que falou foi extremamente valioso.",
      who: "Líder na plateia · após palestra",
    },
    {
      quote: "Foi ótima… insights e percepções bem pontuais. Vou te acompanhar por aqui.",
      who: "Participante · palestra de liderança",
    },
    {
      quote: "Equipe só me mandou áudios e texto dizendo que tu é muito boaaaa.",
      who: "Contratante · devolutiva pós-evento",
    },
    {
      quote: "Sensacional! Muito bom ouvir pessoas competentes.",
      who: "Participante · convenção",
    },
    {
      quote: "Sim, gostei muito da sua palestra! Sucesso!",
      who: "Participante · congresso",
    },
  ];
  return (
    <section className="py-24 md:py-32 relative">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent" />
      <div className="mx-auto max-w-7xl px-5 md:px-10">
        <div className="max-w-3xl mb-14">
          <p className="text-xs uppercase tracking-[0.3em] text-primary mb-4">O que dizem depois</p>
          <h2 className="text-4xl md:text-5xl leading-tight text-balance">
            Mensagens reais.<br />
            <span className="text-muted-foreground/70">Chegam antes do próximo convite.</span>
          </h2>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {items.map((t) => (
            <figure
              key={t.quote}
              className="rounded-2xl border border-border bg-card p-7 flex flex-col gap-5 transition-colors hover:border-primary/40"
            >
              <Quote className="h-5 w-5 text-primary" />
              <blockquote className="text-foreground/90 leading-relaxed">
                "{t.quote}"
              </blockquote>
              <figcaption className="mt-auto text-xs uppercase tracking-widest text-muted-foreground">
                {t.who}
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
