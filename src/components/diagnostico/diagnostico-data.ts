export interface Etapa {
  titulo: string;
  perguntas: string[];
  recomendacao: string;
}

export const etapas: Etapa[] = [
  {
    titulo: "Posicionamento",
    perguntas: [
      "Consigo dizer em uma frase para quem é meu negócio.",
      "Minha diferença passa no teste do concorrente: o vizinho não poderia usar a mesma frase.",
      'Meu perfil fala com um cliente principal, e não com "todos os públicos".',
      "Tenho provas visíveis do que digo: depoimentos, bastidores, resultados.",
    ],
    recomendacao:
      "Defina o cliente principal e aplique o teste do concorrente à sua frase de diferença. Sem isso, a bio e o conteúdo não têm do que falar.",
  },
  {
    titulo: "Bio e vitrine",
    perguntas: [
      "Minha bio diz o que faço, para quem e com qual diferença.",
      "Minha bio informa onde estou e como comprar.",
      "Tenho 3 posts fixados: quem somos, uma prova e como comprar.",
      "Meus destaques mostram produtos ou serviços, como comprar, clientes e bastidores.",
    ],
    recomendacao:
      "Reescreva a bio no formato 'Faço X para Y, com Z', inclua onde você está e como comprar, e fixe três posts: quem somos, uma prova e como comprar.",
  },
  {
    titulo: "Conteúdo",
    perguntas: [
      "Tenho 3 ou 4 pilares de conteúdo definidos.",
      "Na semana, publico conteúdos com funções diferentes: atrair, provar e ofertar.",
      "O cliente reconhece meus posts sem ler o nome: tom e visual são consistentes.",
      "Publiquei no feed nos últimos 7 dias.",
    ],
    recomendacao:
      "Defina 3 ou 4 pilares e monte a semana mínima: um post para atrair, um para provar e um para ofertar.",
  },
  {
    titulo: "Conversa e atendimento",
    perguntas: [
      "Respondo as mensagens no mesmo turno em que chegam.",
      "Quando perguntam o preço, respondo com contexto e uma pergunta, não só com o número.",
      "Tenho respostas-padrão para as 3 perguntas que mais chegam.",
      "Toda conversa termina com uma proposta de próximo passo.",
    ],
    recomendacao:
      "Escreva respostas-padrão para as três perguntas mais frequentes, sempre com contexto, uma pergunta e um próximo passo.",
  },
  {
    titulo: "Pós-venda e medição",
    perguntas: [
      "Faço contato com o cliente depois da compra.",
      "Peço depoimento ao cliente satisfeito.",
      "Transformo depoimentos em conteúdo.",
      "Sei quantas vendas do último mês vieram das redes sociais.",
    ],
    recomendacao:
      "Crie um contato fixo depois da compra, peça depoimento a todo cliente satisfeito e registre de onde veio cada venda.",
  },
];

export const opcoes = [
  { label: "Sim", valor: 2 },
  { label: "Em parte", valor: 1 },
  { label: "Não", valor: 0 },
] as const;

export function faixaDe(total: number): { titulo: string; texto: string } {
  if (total <= 16) {
    return {
      titulo: "Perfil sem posicionamento",
      texto:
        "O perfil existe, mas ainda não diz para quem é nem por que você. Comece pelo bloco mais fraco.",
    };
  }
  if (total <= 30) {
    return {
      titulo: "Posicionamento parcial",
      texto: "Há base, mas a venda se perde em pontos específicos. Corrija primeiro o bloco mais fraco.",
    };
  }
  return {
    titulo: "Perfil posicionado",
    texto: "A estrutura está sólida. O ganho agora está em consistência e medição.",
  };
}
