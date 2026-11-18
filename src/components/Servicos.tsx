import { useRef, useState } from "react";
import { gsap, useGSAP, MOTION_OK } from "@/lib/gsap";
import { revealLines } from "@/lib/animations";
import { servicos, tons } from "@/content/site";

const DESKTOP = "(min-width: 900px)";
const ABERTO = 3.4;

/**
 * Quatro painéis de cor sólida lado a lado. No desktop, o painel em foco se abre
 * (acordeão) e os outros viram faixas com o nome na vertical. No celular, todos abertos.
 */
export default function Servicos() {
  const ref = useRef<HTMLElement>(null);
  const [ativo, setAtivo] = useState(0);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        revealLines(ref.current!);
        gsap.from("[data-painel]", {
          clipPath: "inset(100% 0% 0% 0% round 22px)",
          duration: 1.6,
          stagger: 0.12,
          ease: "power4.inOut",
          scrollTrigger: { trigger: "[data-paineis]", start: "top 85%", once: true },
        });
      });
    },
    { scope: ref },
  );

  // Abre o painel ativo e fecha os outros.
  useGSAP(
    () => {
      gsap.matchMedia().add(DESKTOP, () => {
        const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        const d = reduce ? 0 : 0.9;
        gsap.utils.toArray<HTMLElement>("[data-painel]").forEach((el, i) => {
          const open = i === ativo;
          gsap.to(el, { flexGrow: open ? ABERTO : 1, duration: d, ease: "expo.out", overwrite: "auto" });
          gsap.to(el.querySelector("[data-aberto]"), {
            autoAlpha: open ? 1 : 0,
            y: open ? 0 : 20,
            duration: open ? d * 0.9 : d * 0.3,
            delay: open ? d * 0.25 : 0,
            ease: "power3.out",
            overwrite: "auto",
          });
          gsap.to(el.querySelector("[data-fechado]"), { autoAlpha: open ? 0 : 1, duration: d * 0.4, overwrite: "auto" });
        });
      });
    },
    { scope: ref, dependencies: [ativo] },
  );

  return (
    <section ref={ref} id="servicos" className="relative z-10 py-[clamp(110px,12vw,200px)]">
      <div className="mx-auto w-[min(100%-8vw,1600px)]">
        <div className="mb-[clamp(40px,5vw,80px)] flex items-end justify-between gap-8">
          <h2 data-reveal className="font-display text-[clamp(44px,5.6vw,96px)] leading-[0.95] font-normal tracking-[-0.035em]">
            O que a gente <em className="font-light">faz</em>
          </h2>
          <p className="hidden text-[12px] tracking-[0.35em] text-ink/60 uppercase md:block">04 frentes</p>
        </div>

        <ol data-paineis className="flex flex-col gap-3 min-[900px]:h-[min(68vh,600px)] min-[900px]:flex-row">
          {servicos.map((s, i) => (
            <li
              key={s.nome}
              data-painel
              onMouseEnter={() => setAtivo(i)}
              onFocus={() => setAtivo(i)}
              tabIndex={0}
              aria-label={`${s.nome}: ${s.frase}`}
              className={`relative min-w-0 cursor-pointer overflow-hidden rounded-[var(--radius-card)] outline-none focus-visible:ring-2 focus-visible:ring-ink focus-visible:ring-offset-4 min-[900px]:flex-1 ${tons[s.tom]}`}
            >
              {/* Fechado (só desktop): número no topo e nome na vertical. */}
              <div data-fechado className="absolute inset-0 hidden flex-col justify-between p-6 min-[900px]:flex">
                <span className="font-display text-xl italic opacity-60">0{i + 1}</span>
                <span className="font-display text-[clamp(28px,2.4vw,40px)] leading-none font-light whitespace-nowrap [writing-mode:vertical-rl] rotate-180">
                  {s.nome}
                </span>
              </div>

              {/* Aberto: conteúdo completo. */}
              <div data-aberto className="flex h-full flex-col justify-between gap-16 p-[clamp(26px,2.8vw,48px)] min-[900px]:invisible min-[900px]:w-[min(46vw,640px)] min-[900px]:opacity-0">
                <span className="font-display text-xl italic opacity-60">0{i + 1}</span>
                <div>
                  <h3 className="font-display text-[clamp(48px,5.4vw,96px)] leading-[0.9] font-normal tracking-[-0.035em]">{s.nome}</h3>
                  <p className="mt-4 max-w-[28ch] text-[clamp(16px,1.3vw,20px)] leading-snug opacity-80">{s.frase}</p>
                  <ul className="mt-8 flex flex-wrap gap-2">
                    {s.itens.map((item) => (
                      <li key={item} className="rounded-full border border-current/30 px-4 py-1.5 text-[13px] tracking-wide">
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
