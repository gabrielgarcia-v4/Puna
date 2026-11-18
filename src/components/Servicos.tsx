import { useRef } from "react";
import { gsap, useGSAP, MOTION_OK } from "@/lib/gsap";
import { revealLines } from "@/lib/animations";
import { servicos, tons } from "@/content/site";
import { Simbolo } from "./Brand";

export default function Servicos() {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => revealLines(ref.current!));

      // Desktop: os cards deslizam na horizontal com a seção fixa; o símbolo de cada um gira junto.
      mm.add(`${MOTION_OK} and (min-width: 900px)`, () => {
        const track = ref.current!.querySelector<HTMLElement>("[data-track]")!;
        const distance = () => Math.max(0, track.scrollWidth - window.innerWidth);

        const slide = gsap.to(track, {
          x: () => -distance(),
          ease: "none",
          scrollTrigger: { trigger: "[data-pin]", start: "top top", end: () => `+=${distance()}`, pin: true, scrub: 1.2, invalidateOnRefresh: true },
        });

        gsap.utils.toArray<HTMLElement>("[data-servico-simbolo]").forEach((el, i) =>
          gsap.fromTo(
            el,
            { rotation: i % 2 ? 40 : -40, scale: 0.7 },
            {
              rotation: i % 2 ? -20 : 20,
              scale: 1,
              ease: "none",
              scrollTrigger: { trigger: el.closest("li"), containerAnimation: slide, start: "left right", end: "right left", scrub: true },
            },
          ),
        );
      });

      mm.add(`${MOTION_OK} and (max-width: 899px)`, () => {
        gsap.utils.toArray<HTMLElement>("[data-servico]").forEach((el) =>
          gsap.from(el, { y: 80, rotation: 4, autoAlpha: 0, duration: 1.2, ease: "back.out(1.4)", scrollTrigger: { trigger: el, start: "top 90%", once: true } }),
        );
      });
    },
    { scope: ref },
  );

  return (
    <section ref={ref} id="servicos" className="relative z-10">
      <div data-pin className="flex min-h-svh flex-col justify-center overflow-hidden py-14">
        <h2
          data-reveal
          className="mx-auto mb-12 w-[min(100%-8vw,1700px)] font-display text-[clamp(44px,6vw,104px)] leading-[0.95] font-semibold tracking-[-0.03em]"
        >
          O que a gente faz
        </h2>

        <ol data-track className="flex flex-col gap-6 px-[4vw] min-[900px]:w-max min-[900px]:flex-row min-[900px]:gap-[2vw]">
          {servicos.map((s, i) => (
            <li
              key={s.nome}
              data-servico
              className={`relative flex min-h-[440px] flex-col justify-between overflow-hidden rounded-[var(--radius-card)] p-[clamp(26px,2.6vw,44px)] min-[900px]:h-[min(64vh,620px)] min-[900px]:w-[min(32vw,500px)] ${tons[s.tom]}`}
            >
              <span className="font-display text-[clamp(18px,1.4vw,22px)] font-semibold opacity-60">0{i + 1}</span>
              <div data-servico-simbolo className="pointer-events-none absolute top-[6%] right-[-10%] w-[48%] opacity-20">
                <Simbolo className="w-full" />
              </div>
              <div className="relative">
                <h3 className="font-display text-[clamp(44px,4.2vw,76px)] leading-[0.95] font-semibold tracking-[-0.03em]">{s.nome}</h3>
                <p className="mt-4 max-w-[22ch] text-[clamp(16px,1.3vw,20px)] leading-snug opacity-80">{s.frase}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
