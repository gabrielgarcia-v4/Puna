// Todos os textos do site. Edite aqui, não nos componentes.

export const contato = {
  whatsapp: "https://wa.me/5551992302215?text=" + encodeURIComponent("Olá, Puna! Vim pelo site e quero conversar sobre a minha marca."),
  email: "mailto:atendimento@punastudios.com",
  instagram: "https://www.instagram.com/punastudios/",
};

export const nav = [
  { href: "#manifesto", label: "Manifesto" },
  { href: "#servicos", label: "O que fazemos" },
  { href: "#metodo", label: "Método" },
  { href: "#trabalhos", label: "Trabalhos" },
  { href: "#contato", label: "Contato" },
];

export const manifesto =
  "Marca não é logo. É o que as pessoas sentem quando ninguém está vendendo. A Puna junta estratégia, criação e performance para que essa sensação vire lembrança, e a lembrança vire resultado.";

export const servicos = [
  {
    nome: "Branding",
    resumo: "Identidade e direção criativa para marcas que querem ter cara própria.",
    itens: ["Posicionamento e big idea", "Identidade visual", "Tom de voz", "Manual de marca"],
    tom: "clay",
  },
  {
    nome: "Conteúdo",
    resumo: "Produção audiovisual e social media com cara de gente de verdade.",
    itens: ["Linha editorial", "Reels e vídeo", "Carrosséis e design", "Gestão de perfil"],
    tom: "ink",
  },
  {
    nome: "Performance",
    resumo: "Mídia e growth para transformar atenção em resultado.",
    itens: ["Mídia paga", "Funil e CRM", "Leitura de dados", "Relatórios de decisão"],
    tom: "taupe",
  },
  {
    nome: "Planejamento",
    resumo: "O mapa antes do movimento: diagnóstico, prioridades e calendário.",
    itens: ["Diagnóstico de marca", "Benchmarking", "Playbooks de 30 a 90 dias", "Plano de ação"],
    tom: "night",
  },
] as const;

export const metodo = [
  {
    fase: "Escutar",
    texto: "Entrevista de marca, leitura de números e de concorrentes. Antes de criar, entender onde a marca está e o que ela quer.",
  },
  {
    fase: "Posicionar",
    texto: "Uma ideia que organiza tudo. Se uma peça não defende, prova ou desdobra essa ideia, ela não entra.",
  },
  {
    fase: "Criar",
    texto: "Identidade, conteúdo e campanhas produzidos em ritmo de estúdio: com estoque, nunca no zero.",
  },
  {
    fase: "Ler e ajustar",
    texto: "Dado decide o próximo passo, não o gosto. Toda semana se mede, todo mês se corta o que não funcionou.",
  },
];

// TODO antes de publicar: confirmar com cada cliente se o nome pode aparecer no site.
export const trabalhos = [
  { cliente: "Brasa Mind", entrega: "Vídeo e cortes de evento", area: "Conteúdo" },
  { cliente: "AXEN Gestão", entrega: "Carrosséis de conteúdo fiscal", area: "Conteúdo" },
  { cliente: "Bravos", entrega: "Playbook, planejamento de Instagram e apresentação", area: "Planejamento" },
  { cliente: "Moinhos Fitness", entrega: "Plano de campanha e relatórios de mídia", area: "Performance" },
  { cliente: "Paloma Ferreira", entrega: "Estratégia de growth para marca pessoal", area: "Planejamento" },
  { cliente: "Thallys Varella", entrega: "Plano de 30 dias de conteúdo", area: "Planejamento" },
];
