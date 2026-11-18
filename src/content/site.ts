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
  { nome: "Branding", frase: "Cara própria, do logo ao tom de voz.", itens: ["Posicionamento", "Identidade visual", "Tom de voz"], tom: "mint" },
  { nome: "Conteúdo", frase: "Vídeo e social com gente de verdade.", itens: ["Reels e vídeo", "Social media", "Design"], tom: "ink" },
  { nome: "Performance", frase: "Atenção que vira resultado.", itens: ["Mídia paga", "Funil e CRM", "Relatórios"], tom: "sand" },
  { nome: "Planejamento", frase: "O mapa antes do movimento.", itens: ["Diagnóstico", "Benchmarking", "Playbooks"], tom: "sage" },
] as const;

// TODO antes de publicar: confirmar com cada cliente se o nome pode aparecer no site.
// `area` é o segmento do cliente (aparece no card do hover).
// `slug` já reserva o endereço da página de cada cliente (ex.: /clientes/fr-consorcio), que ainda será criada.
export const trabalhos = [
  { cliente: "FR Consórcio", slug: "fr-consorcio", area: "Consórcio", tom: "mint" },
  { cliente: "Casamentos", slug: "casamentos", area: "Eventos", tom: "sand" },
  { cliente: "Brasamind", slug: "brasamind", area: "Evento de networking", tom: "sage" },
  { cliente: "AXEN Gestão", slug: "axen-gestao", area: "Contabilidade", tom: "mint" },
  { cliente: "Bravos", slug: "bravos", area: "Futebol americano", tom: "sand" },
  { cliente: "Paloma Ferreira", slug: "paloma-ferreira", area: "Marca pessoal", tom: "sage" },
  { cliente: "Brasa Nobre", slug: "brasa-nobre", area: "Hamburgueria", tom: "mint" },
  { cliente: "The Bronx", slug: "the-bronx", area: "Barbearia", tom: "sand" },
  { cliente: "Bux Coffee", slug: "bux-coffee", area: "Cafeteria", tom: "sage" },
] as const;

export const tons = {
  mint: "bg-mint text-ink",
  ink: "bg-ink text-mint-soft",
  sand: "bg-sand text-ink",
  sage: "bg-sage text-ink",
} as const;
