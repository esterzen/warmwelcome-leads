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
  {
    slug: "ia-comeca-no-onboarding",
    titulo: "Você treinaria a IA como treina a sua equipe?",
    descricao:
      "Um agente de IA precisa do mesmo que um funcionário novo: função, regras e informação escrita. Por que a IA começa no onboarding da equipe.",
    data: "2026-11-06",
    tema: "IA na liderança",
    blocos: [
      { p: "Toda vez que alguém me pergunta como fazer a IA atender bem o cliente, eu devolvo outra pergunta: como você treinou a pessoa que atende hoje?" },
      { p: "Porque é a mesma coisa. Um atendente novo precisa saber qual é a função dele, o que pode e o que não pode, onde está a informação, quais perguntas mais aparecem e como vai ser acompanhado. Um agente de IA precisa exatamente disso. Nem mais, nem menos." },
      { p: "A diferença é que a pessoa ainda se vira com o que ouviu no corredor. A IA não. Ela só sabe o que estiver escrito." },
      { p: "Na Oh My Bread, o treinamento morava na cabeça de algumas pessoas. Escrevemos tudo: procedimentos, produtos, a venda passo a passo. Organizamos num portal que a equipe acessa pelo celular, com uma trilha de 7 etapas. É exatamente esse material que um agente de IA precisa para responder bem. Escreve uma vez, serve para os dois." },
      { p: "Por isso eu digo que a IA começa no onboarding. Quem já tem a integração da equipe escrita está a um passo de ter um agente que responde bem. Quem ainda não tem já sabe qual é a primeira tarefa." },
      { p: "Para esta semana: escreva o que um funcionário novo precisa saber no primeiro dia. Uma página. Ela vai servir para a próxima pessoa que você contratar, e para a IA também." },
    ],
  },
  {
    slug: "hospitalidade-e-o-que-o-cliente-sente",
    titulo: "Atendimento resolve o pedido. Hospitalidade faz o cliente voltar",
    descricao:
      "Um café por conta da casa, escondido embaixo do pires. Por que hospitalidade não é brinde: é a experiência pensada a partir do cliente.",
    data: "2026-11-09",
    tema: "Liderança comercial",
    blocos: [
      { p: "Pedi um café e, quando levantei a xícara, tinha um adesivo no pires: “Esse café é por nossa conta. Parabéns.”" },
      { p: "Não era meu aniversário. Não tinha cadastro, cupom, nada. Foi aleatório. E eu saí de lá contando para todo mundo, inclusive para você agora." },
      { p: "Isso é hospitalidade. Não é o café de graça. É alguém ter pensado no momento em que eu ia descobrir aquilo. É uma experiência pensada a partir do cliente, não do caixa." },
      { p: "Atendimento é o que você faz. Hospitalidade é o que o cliente sente. Dá para atender certo e mesmo assim o cliente ir embora sem nada para contar." },
      { p: "E não custa caro. Custa pensar." },
      { p: "Para esta semana: reúna a equipe e pergunte em que momento da visita o seu cliente poderia ter uma surpresa boa. Escolham um. Façam." },
      { p: "Atendimento resolve o pedido. Hospitalidade faz o cliente voltar, e trazer alguém junto." },
    ],
  },
  {
    slug: "acao-sem-informacao",
    titulo: "Ação sem informação é festa sem convite",
    descricao:
      "A empresa prepara a ação e esquece de preparar o cliente. Como informar do ponto de vista do cliente: o que ele ganha por estar ali naquele dia.",
    data: "2026-11-16",
    tema: "Liderança comercial",
    blocos: [
      { p: "No mesmo café, a vitrine estava linda. Doces de Halloween feitos à mão: aranhas de brigadeiro, abóboras, lápides de chocolate. Trabalho caprichado." },
      { p: "E eu só descobri porque estava lá. Até tinha um story anunciando o Halloween, com foto linda. Mas falava do café, não de mim. Não dizia por que eu deveria ir." },
      { p: "Esse é um dos erros que eu mais vejo nas empresas: preparam a ação, investem, se dedicam, e esquecem de preparar o cliente. A ação acontece do ponto de vista do negócio: “temos doces de Halloween”. O cliente nem sabe que existe, nem por que deveria ir." },
      { p: "Informar não é anunciar o produto. É contar o que o cliente ganha por estar ali naquele dia. “Temos doces temáticos” fala do meu negócio. “Traga as crianças no sábado à tarde: elas escolhem a aranha mais assustadora e você toma o seu café em paz” fala do cliente." },
      { p: "O conceito é simples: o cliente no meio, não o meu negócio no meio." },
      { p: "Para a próxima ação: antes de produzir, escreva numa frase o que o cliente ganha por ir e quando ele vai ficar sabendo. Se a frase falar da sua empresa, reescreva." },
      { p: "Ação sem informação é festa sem convite." },
    ],
  },
  {
    slug: "ia-executa-lider-decide",
    titulo: "A IA executa. Quem decide o que é certo é você",
    descricao:
      "Antes do sistema, a decisão: quem faz, quando, o que é erro e o que é exceção. Por que IA na empresa é assunto de liderança.",
    data: "2026-11-13",
    tema: "IA na liderança",
    blocos: [
      { p: "A IA executa. Quem decide o que é certo ainda é você." },
      { p: "Tem muito empresário esperando que a IA resolva o que a liderança ainda não decidiu. Qual pedido tem prioridade? O que é atraso? Quando a loja pode pedir fora do dia? Se ninguém decidiu, a ferramenta também não sabe." },
      { p: "Na Oh My Bread, antes do painel existir, a gente sentou para responder justamente isso: quem faz o pedido de insumos, até que horas, o que conta como erro, o que é exceção e quem aprova a exceção. Foi a parte mais importante do trabalho, e não teve nada de tecnologia. Foi decisão de liderança." },
      { p: "Com a regra escrita, o painel ficou simples. Ele organiza os pedidos e mostra o que está fora do combinado. A equipe não precisa interpretar nada, porque o critério já está ali." },
      { p: "Por isso eu digo que IA na empresa é assunto de liderança. A ferramenta acelera o critério que já existe. Se o critério é claro, ela deixa tudo mais leve. Se ninguém decidiu, ela só repete a dúvida mais rápido." },
      { p: "Para esta semana: escolha uma situação que sempre gera a pergunta “e agora, o que eu faço?” na sua equipe. Escreva a resposta: quem decide, em que caso e o que é exceção. Essa página vale para a sua equipe hoje e para qualquer sistema amanhã." },
    ],
  },
];

// Só aparecem no site os artigos com data de hoje ou anterior (horário de Brasília).
export function publicados(agora: Date = new Date()) {
  const hoje = new Date(agora.getTime() - 3 * 3600 * 1000).toISOString().slice(0, 10);
  return artigos.filter((a) => a.data <= hoje);
}

export function formatarData(iso: string) {
  const [a, m, d] = iso.split("-").map(Number);
  const meses = ["janeiro", "fevereiro", "março", "abril", "maio", "junho", "julho", "agosto", "setembro", "outubro", "novembro", "dezembro"];
  return `${d} de ${meses[m - 1]} de ${a}`;
}
