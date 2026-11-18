// Todos os textos do site. Edite aqui, não nos componentes.

export const contato = {
  whatsapp: "https://wa.me/5551992302215?text=" + encodeURIComponent("Olá, Puna! Vim pelo site e quero conversar sobre a minha marca."),
  email: "mailto:atendimento@punastudios.com",
  instagram: "https://www.instagram.com/punastudios/",
};

export const nav = [
  { href: "#servicos", label: "O que fazemos" },
  { href: "#trabalhos", label: "Clientes" },
  { href: "#contato", label: "Contato" },
];

export const faixa = ["Branding", "Conteúdo", "Performance", "Planejamento"];

export const manifesto = "Marca não é logo. É o que as pessoas sentem quando lembram de você.";

export const servicos = [
  { nome: "Branding", frase: "Cara própria, do logo ao tom de voz.", tom: "mint" },
  { nome: "Conteúdo", frase: "Vídeo e social com gente de verdade.", tom: "ink" },
  { nome: "Performance", frase: "Atenção que vira resultado.", tom: "sand" },
  { nome: "Planejamento", frase: "O mapa antes do movimento.", tom: "sage" },
] as const;

// TODO antes de publicar: confirmar com cada cliente se o nome pode aparecer no site.
// TODO: trocar "Cliente de casamentos" pelo nome real.
export const trabalhos = [
  { cliente: "FR Consórcio", area: "Performance", tom: "mint" },
  { cliente: "Cliente de casamentos", area: "Branding", tom: "sand" },
  { cliente: "Brasa Mind", area: "Conteúdo", tom: "ink" },
  { cliente: "AXEN Gestão", area: "Conteúdo", tom: "sage" },
  { cliente: "Bravos", area: "Planejamento", tom: "mint" },
  { cliente: "Moinhos Fitness", area: "Performance", tom: "ink" },
  { cliente: "Paloma Ferreira", area: "Planejamento", tom: "sand" },
  { cliente: "Thallys Varella", area: "Conteúdo", tom: "sage" },
] as const;

export const tons = {
  mint: "bg-mint text-ink",
  ink: "bg-ink text-mint",
  sand: "bg-sand text-ink",
  sage: "bg-sage text-ink",
} as const;
