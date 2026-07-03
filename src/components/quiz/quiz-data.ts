export type QuizQuestion = {
  id: number;
  prompt: string;
  options: { key: "A" | "B"; label: string }[];
};

export const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: 1,
    prompt: "O que a sua equipe faz quando você não está?",
    options: [
      { key: "A", label: "Segura as decisões e espera você voltar." },
      { key: "B", label: "Mantém o ritmo e o padrão — com ou sem você na sala." },
    ],
  },
  {
    id: 2,
    prompt: "Quando alguém erra, o que acontece primeiro?",
    options: [
      { key: "A", label: "O erro é escondido — você descobre depois, e por fora." },
      { key: "B", label: "A pessoa te conta antes de você descobrir." },
    ],
  },
  {
    id: 3,
    prompt: "Como os problemas chegam até você?",
    options: [
      { key: "A", label: "Quando já viraram crise — grandes e caros." },
      { key: "B", label: "Enquanto ainda são pequenos — a equipe traz cedo." },
    ],
  },
  {
    id: 4,
    prompt: "Quando você dá uma opinião na reunião…",
    options: [
      { key: "A", label: "Todo mundo concorda. Sempre." },
      { key: "B", label: "Alguém discorda com argumento — e se sente seguro para isso." },
    ],
  },
  {
    id: 5,
    prompt: "As decisões do dia a dia…",
    options: [
      { key: "A", label: "Passam todas por você — sem sua palavra, nada anda." },
      { key: "B", label: "Andam sem você, dentro de critérios que a equipe conhece." },
    ],
  },
  {
    id: 6,
    prompt: "Quando você delega uma entrega…",
    options: [
      { key: "A", label: "Ela volta várias vezes: “só confirma uma coisa…”" },
      { key: "B", label: "A pessoa assume do início ao fim — e responde por ela." },
    ],
  },
  {
    id: 7,
    prompt: "Se você saísse 15 dias de férias, sem celular…",
    options: [
      { key: "A", label: "Alguma coisa travaria — ou quebraria." },
      { key: "B", label: "Tudo seguiria — e você sabe exatamente por quê." },
    ],
  },
];

export type QuizResultKey = "obedecido" | "transicao" | "seguido";

export type QuizResult = {
  key: QuizResultKey;
  label: string;
  title: string;
  body: string;
  ctaLabel: string;
  ctaMessageHint: string;
};

export const QUIZ_RESULTS: Record<QuizResultKey, QuizResult> = {
  obedecido: {
    key: "obedecido",
    label: "5 ou mais A",
    title: "Sua equipe te obedece",
    body: "Sua equipe faz porque você manda. Não é defeito de caráter: é um padrão de comportamento — seu — que tem custo: você virou o teto do time.",
    ctaLabel: "Falar sobre o workshop",
    ctaMessageHint: "Quero conversar sobre o workshop 'Como se tornar o líder que a equipe segue'.",
  },
  transicao: {
    key: "transicao",
    label: "Misto",
    title: "Você está na zona de transição",
    body: "Em algumas situações você é seguido; em outras, só obedecido. As perguntas em que marcou A mostram exatamente onde seu comportamento trava a equipe.",
    ctaLabel: "Falar com a Ester",
    ctaMessageHint: "Quero mapear onde meu comportamento está travando a equipe.",
  },
  seguido: {
    key: "seguido",
    label: "5 ou mais B",
    title: "Sua equipe te segue",
    body: "Sua equipe faz porque acredita em você. O desafio agora é sustentar: ser seguido não é conquista permanente, é conduta diária.",
    ctaLabel: "Ver formatos para a minha equipe",
    ctaMessageHint: "Quero levar a palestra/workshop para minha equipe ou entidade.",
  },
};

export function computeResult(answers: Array<"A" | "B" | null>): QuizResult {
  const a = answers.filter((x) => x === "A").length;
  const b = answers.filter((x) => x === "B").length;
  if (a >= 5) return QUIZ_RESULTS.obedecido;
  if (b >= 5) return QUIZ_RESULTS.seguido;
  return QUIZ_RESULTS.transicao;
}
