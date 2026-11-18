import { useRef } from "react";
import { gsap, useGSAP, MOTION_OK } from "@/lib/gsap";
import { revealLines } from "@/lib/animations";
import { servicos, tons } from "@/content/site";
import { Padrao } from "./Brand";

export default function Servicos() {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => revealLines(ref.current!));

      // Desktop: os arcos deslizam na horizontal com a seção fixa; o padrão de cada um corre por dentro.
      mm.add(`${MOTION_OK} and (min-width: 900px)`, () => {
        const track = ref.current!.querySelector<HTMLElement>("[data-track]")!;
        const distance = () => Math.max(0, track.scrollWidth - window.innerWidth);

        const slide = gsap.to(track, {
          x: () => -distance(),
          ease: "none",
          scrollTrigger: { trigger: "[data-pin]", start: "top top", end: () => `+=${distance()}`, pin: true, scrub: 1.4, invalidateOnRefresh: true },
        });

        gsap.utils.toArray<HTMLElement>("[data-arco-padrao]").forEach((el) =>
          gsap.fromTo(
            el,
            { xPercent: -10 },
            { xPercent: 0, ease: "none", scrollTrigger: { trigger: el.closest("li"), containerAnimation: slide, start: "left right", end: "right left", scrub: true } },
          ),
        );
      });

      mm.add(`${MOTION_OK} and (max-width: 899px)`, () => {
        gsap.utils.toArray<HTMLElement>("[data-servico]").forEach((el) =>
          gsap.from(el, { y: 60, autoAlpha: 0, duration: 1.6, ease: "expo.out", scrollTrigger: { trigger: el, start: "top 90%", once: true } }),
        );
      });
    },
    { scope: ref },
  );

  return (
    <section ref={ref} id="servicos" className="relative z-10">
      <div data-pin className="flex min-h-svh flex-col justify-center overflow-hidden pt-28 pb-14">
        <div className="mx-auto mb-12 flex w-[min(100%-8vw,1700px)] items-end justify-between gap-8">
          <h2 data-reveal className="font-display text-[clamp(44px,5.6vw,96px)] leading-[0.95] font-normal tracking-[-0.035em]">
            O que a gente <em className="font-light">faz</em>
          </h2>
          <p className="hidden text-[12px] tracking-[0.35em] text-ink/60 uppercase md:block">04 frentes</p>
        </div>

        <ol data-track className="flex flex-col gap-10 px-[4vw] min-[900px]:w-max min-[900px]:flex-row min-[900px]:gap-[2.4vw]">
          {servicos.map((s, i) => (
            <li key={s.nome} data-servico className="flex flex-col gap-6 min-[900px]:w-[min(24vw,380px)]">
              <div className={`relative aspect-[4/5] overflow-hidden rounded-t-[999px] rounded-b-[var(--radius-card)] ${tons[s.tom]}`}>
                <div data-arco-padrao className="absolute inset-y-0 left-0 flex w-[260%] opacity-20">
                  <Padrao className="h-full w-1/2" />
                  <Padrao className="h-full w-1/2" />
                </div>
              </div>
              <div className="flex items-baseline gap-4">
                <span className="font-display text-xl text-sage italic">0{i + 1}</span>
                <div>
                  <h3 className="font-display text-[clamp(32px,2.8vw,48px)] leading-none font-normal tracking-[-0.02em]">{s.nome}</h3>
                  <p className="mt-3 max-w-[26ch] text-[15px] leading-relaxed text-ink/70">{s.frase}</p>
                </div>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
