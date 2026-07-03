import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Dialog, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { Checkbox } from "@/components/ui/checkbox";
import { ArrowLeft, ArrowRight, Mail, Sparkles } from "lucide-react";
import { QUIZ_QUESTIONS, computeResult, type QuizResult } from "./quiz-data";
import { buildMailtoUrl, buildWhatsappUrl } from "@/lib/contact";

type Step = "intro" | "questions" | "lead" | "result";

const leadSchema = z.object({
  nome: z.string().trim().min(2, "Informe seu nome").max(100),
  email: z.string().trim().email("Email inválido").max(255),
  telefone: z
    .string()
    .trim()
    .min(10, "WhatsApp inválido")
    .max(20)
    .regex(/^[\d\s()+\-]+$/, "Use apenas números"),
  empresa: z.string().trim().max(120).optional().or(z.literal("")),
  consent: z.literal(true, { errorMap: () => ({ message: "É necessário autorizar" }) }),
});
type LeadData = z.infer<typeof leadSchema>;

export function QuizDialog({ open, onOpenChange }: { open: boolean; onOpenChange: (v: boolean) => void }) {
  const [step, setStep] = useState<Step>("intro");
  const [idx, setIdx] = useState(0);
  const [answers, setAnswers] = useState<Array<"A" | "B" | null>>(Array(QUIZ_QUESTIONS.length).fill(null));
  const [result, setResult] = useState<QuizResult | null>(null);
  const [lead, setLead] = useState<LeadData | null>(null);

  const form = useForm<LeadData>({
    resolver: zodResolver(leadSchema),
    defaultValues: { nome: "", email: "", telefone: "", empresa: "", consent: false as unknown as true },
  });

  const reset = () => {
    setStep("intro");
    setIdx(0);
    setAnswers(Array(QUIZ_QUESTIONS.length).fill(null));
    setResult(null);
    setLead(null);
    form.reset();
  };

  const handleClose = (v: boolean) => {
    onOpenChange(v);
    if (!v) setTimeout(reset, 200);
  };

  const answer = (key: "A" | "B") => {
    const next = [...answers];
    next[idx] = key;
    setAnswers(next);
    if (idx < QUIZ_QUESTIONS.length - 1) {
      setTimeout(() => setIdx(idx + 1), 150);
    } else {
      setTimeout(() => setStep("lead"), 150);
    }
  };

  const onSubmitLead = (data: LeadData) => {
    setLead(data);
    setResult(computeResult(answers));
    setStep("result");

    // Fire lead capture: mailto to Ester + open WhatsApp with lead summary
    const countA = answers.filter((x) => x === "A").length;
    const countB = answers.filter((x) => x === "B").length;
    const summary = [
      `Novo lead do teste 'Sua equipe te segue?'`,
      ``,
      `Nome: ${data.nome}`,
      `Email: ${data.email}`,
      `WhatsApp: ${data.telefone}`,
      data.empresa ? `Empresa: ${data.empresa}` : null,
      ``,
      `Resultado: ${countA} A / ${countB} B`,
      `Respostas: ${answers.map((a, i) => `${i + 1}${a ?? "-"}`).join(" ")}`,
    ]
      .filter(Boolean)
      .join("\n");

    // Notify Ester by email (fires in same click chain via new tab; will not open user's mail client visibly)
    try {
      const link = document.createElement("a");
      link.href = buildMailtoUrl("Novo lead do teste — " + data.nome, summary);
      link.rel = "noopener noreferrer";
      link.click();
    } catch {
      /* noop */
    }
  };

  const goBack = () => {
    if (step === "questions" && idx > 0) setIdx(idx - 1);
    else if (step === "lead") setStep("questions");
  };

  const currentQ = QUIZ_QUESTIONS[idx];
  const progress = step === "intro" ? 0 : step === "result" ? 100 : ((idx + (step === "lead" ? 1 : 0)) / QUIZ_QUESTIONS.length) * 100;

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="max-w-2xl bg-card border-border p-0 overflow-hidden max-h-[92vh] overflow-y-auto">
        <div className="p-6 md:p-10">
          <DialogTitle className="sr-only">Teste: sua equipe te segue ou te obedece?</DialogTitle>
          <DialogDescription className="sr-only">7 perguntas em 2 minutos</DialogDescription>

          {step !== "intro" && step !== "result" && (
            <div className="mb-6">
              <div className="flex items-center justify-between text-xs uppercase tracking-widest text-muted-foreground mb-2">
                <span>{step === "questions" ? `Pergunta ${idx + 1} de ${QUIZ_QUESTIONS.length}` : "Quase lá"}</span>
                <button onClick={goBack} className="inline-flex items-center gap-1 hover:text-foreground">
                  <ArrowLeft className="h-3 w-3" /> voltar
                </button>
              </div>
              <Progress value={progress} className="h-1" />
            </div>
          )}

          {step === "intro" && (
            <div className="animate-fade-up">
              <p className="text-xs uppercase tracking-[0.2em] text-primary">O Teste · 7 perguntas</p>
              <h2 className="mt-3 text-3xl md:text-4xl leading-tight text-balance">
                Sua equipe te segue —<br />
                <span className="italic text-primary">ou te obedece?</span>
              </h2>
              <p className="mt-5 text-muted-foreground leading-relaxed">
                Quase todo líder acha que está liderando. Muitos estão apenas sendo obedecidos — e a diferença só aparece quando você não está na sala.
              </p>
              <p className="mt-4 text-sm text-muted-foreground">
                <strong className="text-foreground">Como fazer:</strong> responda com o que a sua equipe FAZ hoje — não com o que você gostaria.
              </p>
              <div className="mt-8 flex items-center gap-4">
                <Button size="lg" onClick={() => setStep("questions")} className="gap-2">
                  Começar o teste <ArrowRight className="h-4 w-4" />
                </Button>
                <span className="text-xs text-muted-foreground">≈ 2 minutos</span>
              </div>
            </div>
          )}

          {step === "questions" && currentQ && (
            <div key={currentQ.id} className="animate-fade-up">
              <h3 className="text-2xl md:text-3xl leading-snug text-balance">{currentQ.prompt}</h3>
              <div className="mt-8 grid gap-3">
                {currentQ.options.map((opt) => {
                  const selected = answers[idx] === opt.key;
                  return (
                    <button
                      key={opt.key}
                      onClick={() => answer(opt.key)}
                      className={`text-left rounded-lg border p-5 transition-all hover:border-primary hover:bg-primary/5 ${
                        selected ? "border-primary bg-primary/10" : "border-border bg-secondary/40"
                      }`}
                    >
                      <div className="flex items-start gap-4">
                        <span className="font-display text-lg text-primary shrink-0 w-6">{opt.key}</span>
                        <span className="text-foreground leading-relaxed">{opt.label}</span>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {step === "lead" && (
            <div className="animate-fade-up">
              <p className="text-xs uppercase tracking-[0.2em] text-primary">Falta um passo</p>
              <h3 className="mt-2 text-2xl md:text-3xl text-balance">Para onde envio seu resultado?</h3>
              <p className="mt-3 text-sm text-muted-foreground">
                Você recebe o diagnóstico agora e uma leitura mais profunda por WhatsApp.
              </p>

              <form onSubmit={form.handleSubmit(onSubmitLead)} className="mt-6 space-y-4">
                <div>
                  <Label htmlFor="nome">Nome</Label>
                  <Input id="nome" {...form.register("nome")} className="mt-1.5" placeholder="Seu nome" />
                  {form.formState.errors.nome && (
                    <p className="text-xs text-destructive mt-1">{form.formState.errors.nome.message}</p>
                  )}
                </div>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" {...form.register("email")} className="mt-1.5" placeholder="voce@empresa.com" />
                    {form.formState.errors.email && (
                      <p className="text-xs text-destructive mt-1">{form.formState.errors.email.message}</p>
                    )}
                  </div>
                  <div>
                    <Label htmlFor="telefone">WhatsApp</Label>
                    <Input id="telefone" {...form.register("telefone")} className="mt-1.5" placeholder="(47) 99999-0000" />
                    {form.formState.errors.telefone && (
                      <p className="text-xs text-destructive mt-1">{form.formState.errors.telefone.message}</p>
                    )}
                  </div>
                </div>
                <div>
                  <Label htmlFor="empresa">Empresa ou entidade (opcional)</Label>
                  <Input id="empresa" {...form.register("empresa")} className="mt-1.5" placeholder="Nome da organização" />
                </div>
                <label className="flex items-start gap-3 text-sm text-muted-foreground pt-2 cursor-pointer">
                  <Checkbox
                    checked={form.watch("consent") as unknown as boolean}
                    onCheckedChange={(v) => form.setValue("consent", (v === true) as unknown as true, { shouldValidate: true })}
                    className="mt-0.5"
                  />
                  <span>Autorizo receber o resultado e conteúdos da Ester Zen sobre liderança.</span>
                </label>
                {form.formState.errors.consent && (
                  <p className="text-xs text-destructive">{form.formState.errors.consent.message as string}</p>
                )}
                <Button type="submit" size="lg" className="w-full gap-2 mt-2">
                  Ver meu resultado <Sparkles className="h-4 w-4" />
                </Button>
              </form>
            </div>
          )}

          {step === "result" && result && lead && (
            <ResultScreen result={result} leadName={lead.nome} onRestart={reset} />
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}

function ResultScreen({ result, leadName, onRestart }: { result: QuizResult; leadName: string; onRestart: () => void }) {
  const waMessage = `Olá, Ester! Sou ${leadName}. Acabei de fazer o teste e meu resultado foi: ${result.title}. ${result.ctaMessageHint}`;
  return (
    <div className="animate-fade-up">
      <p className="text-xs uppercase tracking-[0.2em] text-primary">Seu resultado · {result.label}</p>
      <h3 className="mt-3 text-3xl md:text-4xl text-balance">
        <span className="italic text-primary">{result.title}</span>
      </h3>
      <p className="mt-5 text-muted-foreground leading-relaxed text-lg">{result.body}</p>

      <div className="mt-8 flex flex-col sm:flex-row gap-3">
        <Button asChild size="lg" className="gap-2">
          <a href={buildWhatsappUrl(waMessage)} target="_blank" rel="noopener noreferrer">
            {result.ctaLabel}
          </a>
        </Button>
        <Button asChild size="lg" variant="outline" className="gap-2">
          <a
            href={buildMailtoUrl(
              `Resultado do teste — ${leadName}`,
              `Olá, Ester!\n\nMeu resultado foi: ${result.title}\n\n${result.body}\n\n${result.ctaMessageHint}`,
            )}
          >
            <Mail className="h-4 w-4" /> Receber por email
          </a>
        </Button>
      </div>

      <button onClick={onRestart} className="mt-8 text-xs uppercase tracking-widest text-muted-foreground hover:text-foreground">
        Refazer o teste
      </button>
    </div>
  );
}
