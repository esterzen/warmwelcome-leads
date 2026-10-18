// Artigos do blog. Cada artigo é o texto aprovado pela Ester (o mesmo do LinkedIn),
// em blocos simples: parágrafo ou lista numerada.

export type Bloco = { p: string } | { ol: string[] };

export interface Artigo {
  slug: string;
  titulo: string;
  descricao: string;
  data: string; // AAAA-MM-DD
  tema: "Liderança" | "Liderança comercial" | "IA na liderança";
  blocos: Bloco[];
}

export const artigos: Artigo[] = [
  {
    slug: "ia-nao-e-prompt",
    titulo: "IA não é prompt bem feito",
    descricao:
      "O prompt não é o problema: a empresa ainda não sabe o que pedir. O caminho que a Oh My Bread fez antes de abrir qualquer ferramenta de IA.",
    data: "2026-10-17",
    tema: "IA na liderança",
    blocos: [
      { p: "Toda semana eu vejo alguém achando que IA é só prompt bem feito e isso gera uma bela legenda de rede social. Vou te contar que é tudo, menos isso." },
      { p: "E aí vem a pergunta que quase ninguém está fazendo: o que você quer que a IA faça, exatamente?" },
      { p: "Quase sempre a resposta é vaga, rasa, \"exigindo\" pouco do que essa ferramenta realmente pode fazer: “Organizar os pedidos.” “Ajudar no atendimento.” “Melhorar as vendas.”" },
      { p: "O prompt não é o problema. A empresa ainda não sabe o que pedir. Ela nem sabe que pode pedir, na verdade." },
      { p: "Triagem de currículo com pontuação de candidato de acordo com a necessidade da empresa, programa gamificado de treinamento, acompanhamento de tarefas, melhoria na execução de cada trabalho, acompanhamento de dados estratégicos e mais um universo de coisas para facilitar a vida da equipe." },
      { p: "Na Oh My Bread, rede de 20 lojas, os pedidos de insumos, os consumos e os treinamentos corriam por grupo de WhatsApp e planilha. Antes de abrir qualquer ferramenta, fizemos o caminho inteiro:" },
      {
        ol: [
          "Qual problema se repete toda semana.",
          "Como ele é feito hoje, passo a passo, e por quem.",
          "Qual é a regra: quem faz, quando, o que é erro, o que é exceção.",
        ],
      },
      { p: "Só então veio a construção. Depois, o teste com dado real. Hoje está tudo num painel no celular, e a equipe usou desde o primeiro dia, porque o painel nasceu da rotina que ela já fazia. Sem papel, sem sofrimento, tudo concentrado, facilitando o onboarding da equipe, o acompanhamento e os indicadores." },
      { p: "O prompt foi a parte mais curta do trabalho." },
      { p: "Para esta semana: escolha uma tarefa que se repete na sua empresa e escreva como ela é feita hoje. Sem IA. Se não conseguir escrever, a próxima tarefa é de liderança, não de tecnologia." },
    ],
  },
];

export function formatarData(iso: string) {
  const [a, m, d] = iso.split("-").map(Number);
  const meses = ["janeiro", "fevereiro", "março", "abril", "maio", "junho", "julho", "agosto", "setembro", "outubro", "novembro", "dezembro"];
  return `${d} de ${meses[m - 1]} de ${a}`;
}
