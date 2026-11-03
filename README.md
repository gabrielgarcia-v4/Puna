# Puna Studios — site

Site institucional da Puna, construído sobre a mesma base da LP de SPAs Jacuzzi (`D:\cLAUDE\jacuzzi-lovable`).

Stack: Vite, React, TypeScript, Tailwind CSS v4, GSAP (ScrollTrigger, SplitText) e Lenis.

## Regra de animação (herdada da LP Jacuzzi)

- Scroll: uma única instância do Lenis (`src/components/SmoothScroll.tsx`).
- Movimento: sempre GSAP, importado de `src/lib/gsap.ts`. Animação de scroll com ScrollTrigger dentro de `useGSAP`.
- Hovers com movimento: atributo `data-hover` (`src/components/HoverEffects.tsx`).
- Respeitar `prefers-reduced-motion` com `gsap.matchMedia()`.

## Onde fica cada coisa

- `src/content/site.ts` — todos os textos: manifesto, serviços, método, trabalhos e contato.
- `src/components/` — uma seção por arquivo (Hero, Intro, Manifesto, Servicos, Metodo, Trabalhos, Footer).
- `src/components/Brand.tsx` — logo, palavra, símbolo e padrão como máscaras (a cor vem de `text-*`).
- `public/brand/` — SVGs/PNG extraídos do `LOGOPUNA.pdf`.
- `src/index.css` — paleta da marca (areia, oliva, terracota, taupe) e fontes.

## Pendências antes de publicar

- Confirmar com cada cliente se o nome pode aparecer na seção Trabalhos.
- Revisar os textos (manifesto, intro e método foram escritos a partir do Playbook 90 Dias e do vídeo da Puna).

## Rodar localmente

```bash
npm install
npm run dev
```
