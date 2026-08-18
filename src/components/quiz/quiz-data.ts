export type Choice = "A" | "B";

export interface Question {
  id: number;
  prompt: string;
  a: string;
  b: string;
}

export const questions: Question[] = [
  {
    id: 1,
    prompt: "Quando você não está na empresa, o que acontece com as decisões do dia a dia?",
    a: "Ficam paradas esperando você voltar ou responder no WhatsApp.",
    b: "A equipe decide dentro do combinado e te atualiza depois.",
  },
  {
    id: 2,
    prompt: "Quando algo dá errado, qual é a primeira reação do time?",
    a: "Explicar por que não foi culpa deles.",
    b: "Trazer o problema e uma proposta de solução.",
  },
  {
    id: 3,
    prompt: "Como sua equipe reage quando você propõe uma mudança?",
    a: "Aceitam em silêncio e a execução vai morrendo pelo caminho.",
    b: "Questionam, ajustam e assumem a mudança como delas.",
  },
  {
    id: 4,
    prompt: "Quem leva os problemas reais até você?",
    a: "Você quase sempre descobre tarde, por terceiros.",
    b: "As pessoas te contam cedo, mesmo quando é desconfortável.",
  },
  {
    id: 5,
    prompt: "O que faz a equipe entregar no prazo?",
    a: "Sua cobrança e seu acompanhamento constante.",
    b: "O combinado e o padrão que já está instalado no time.",
  },
  {
    id: 6,
    prompt: "Se você pede algo fora da rotina, o que você recebe?",
    a: "Exatamente o que foi pedido — nada além disso.",
    b: "O que foi pedido e um cuidado extra que ninguém mandou fazer.",
  },
  {
    id: 7,
    prompt: "Como as pessoas falam de você quando você não está por perto?",
    a: "Você não faz ideia — e prefere não saber.",
    b: "Você tem sinais claros de que te usam como referência.",
  },
];

export interface Result {
  key: "obedecido" | "transicao" | "seguido";
  title: string;
  headline: string;
  body: string[];
  cta: string;
  waMessage: string;
}

export function computeResult(answers: Choice[]): Result {
  const b = answers.filter((x) => x === "B").length;
  if (b <= 2) {
    return {
      key: "obedecido",
      title: "Você é obedecido",
      headline: "Sua equipe cumpre. Mas não segue.",
      body: [
        "As tarefas saem, mas dependem da sua presença, da sua cobrança e da sua energia. Você virou o teto do próprio time.",
        "O sintoma mais claro: quando você não está na sala, a entrega cai — não por má vontade, mas porque o padrão está em você e não no time.",
        "Esse padrão não muda com discurso motivacional. Muda com conduta repetida: como você decide, como comunica, como corrige e como aparece.",
      ],
      cta: "O workshop foi desenhado exatamente para esse cenário",
      waMessage:
        "Olá, Ester! Fiz o teste no site e o resultado foi OBEDECIDO. Quero falar sobre o workshop.",
    };
  }
  if (b <= 4) {
    return {
      key: "transicao",
      title: "Zona de transição",
      headline: "Parte do time segue. Parte só cumpre.",
      body: [
        "Você já construiu confiança com algumas pessoas — e com outras a relação ainda é de obediência. Isso cria dois times dentro do mesmo time.",
        "Normalmente o travamento está em um ponto só: clareza do combinado, consistência do feedback ou coerência entre o que se cobra e o que se pratica.",
        "É o cenário com o melhor retorno por hora investida: pequenos ajustes de conduta viram resultado rápido.",
      ],
      cta: "Vamos mapear exatamente onde trava",
      waMessage:
        "Olá, Ester! Fiz o teste no site e o resultado foi ZONA DE TRANSIÇÃO. Quero mapear onde trava.",
    };
  }
  return {
    key: "seguido",
    title: "Você é seguido",
    headline: "Sua equipe entrega mesmo quando você não está.",
    body: [
      "Você tem o indicador que não dá para fingir: disposição espontânea. As pessoas fazem além do pedido porque acreditam no padrão, não porque temem a cobrança.",
      "O risco desse estágio é outro: o padrão vive na sua figura e não está documentado. Se você sair, ele sai com você.",
      "O próximo passo é transformar sua conduta em método replicável para os outros líderes da operação.",
    ],
    cta: "Leve esse padrão para os outros líderes",
    waMessage:
      "Olá, Ester! Fiz o teste no site e o resultado foi SEGUIDO. Quero levar isso para os líderes da minha equipe.",
  };
}
