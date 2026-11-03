import { useRef } from "react";
import { gsap, useGSAP, MOTION_OK } from "@/lib/gsap";
import { revealLines } from "@/lib/animations";
import { servicos } from "@/content/site";
import { Padrao } from "./Brand";

const tons = {
  clay: "bg-clay text-paper-soft",
  ink: "bg-ink text-paper-soft",
  taupe: "bg-taupe text-ink",
  night: "bg-night text-paper",
} as const;

export default function Servicos() {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => revealLines(ref.current!));

      // Desktop: os serviços deslizam na horizontal com a seção fixa.
      mm.add(`${MOTION_OK} and (min-width: 900px)`, () => {
        const track = ref.current!.querySelector<HTMLElement>("[data-track]")!;
        const distance = () => Math.max(0, track.scrollWidth - window.innerWidth);

        const slide = gsap.to(track, {
          x: () => -distance(),
          ease: "none",
          scrollTrigger: { trigger: "[data-pin]", start: "top top", end: () => `+=${distance()}`, pin: true, scrub: 1.2, invalidateOnRefresh: true },
        });

        gsap.utils.toArray<HTMLElement>("[data-servico-pattern]").forEach((el) =>
          gsap.fromTo(
            el,
            { xPercent: -12 },
            { xPercent: 0, ease: "none", scrollTrigger: { trigger: el.parentElement, containerAnimation: slide, start: "left right", end: "right left", scrub: true } },
          ),
        );
      });

      mm.add(`${MOTION_OK} and (max-width: 899px)`, () => {
        gsap.utils.toArray<HTMLElement>("[data-servico]").forEach((el) =>
          gsap.from(el, { y: 60, autoAlpha: 0, duration: 1.4, ease: "expo.out", scrollTrigger: { trigger: el, start: "top 88%", once: true } }),
        );
      });
    },
    { scope: ref },
  );

  return (
    <section ref={ref} id="servicos" className="relative z-10 border-t border-line">
      <div data-pin className="flex min-h-svh flex-col justify-center overflow-hidden py-14">
        <div className="mx-auto mb-12 flex w-[min(100%-8vw,1700px)] items-end justify-between gap-8">
          <h2 data-reveal className="font-editorial text-[clamp(40px,5vw,84px)] leading-[0.95] font-light tracking-[-0.03em]">
            O que fazemos
            <br />
            <em className="text-clay">de ponta a ponta</em>
          </h2>
          <p className="hidden max-w-xs text-[15px] leading-relaxed text-ink/65 md:block">
            Quatro frentes que conversam entre si. Dá para começar por uma e crescer para as outras quando fizer sentido.
          </p>
        </div>

        <ol data-track className="flex flex-col gap-6 px-[4vw] min-[900px]:w-max min-[900px]:flex-row min-[900px]:gap-[2vw]">
          {servicos.map((s, i) => (
            <li
              key={s.nome}
              data-servico
              className={`relative flex min-h-[420px] flex-col justify-between overflow-hidden rounded-[var(--radius-card)] p-[clamp(24px,2.4vw,40px)] min-[900px]:h-[min(62vh,600px)] min-[900px]:w-[min(30vw,480px)] ${tons[s.tom]}`}
            >
              <div data-servico-pattern className="pointer-events-none absolute inset-x-0 -bottom-[10%] flex h-[45%] w-[220%] opacity-[0.14]">
                <Padrao className="h-full w-1/2" />
                <Padrao className="h-full w-1/2" />
              </div>
              <div className="relative">
                <span className="font-editorial text-xl italic opacity-70">0{i + 1}</span>
                <h3 className="mt-2 font-editorial text-[clamp(40px,3.6vw,64px)] leading-none font-light tracking-[-0.03em]">{s.nome}</h3>
                <p className="mt-5 max-w-[30ch] text-[clamp(15px,1.15vw,18px)] leading-relaxed opacity-85">{s.resumo}</p>
              </div>
              <ul className="relative mt-10 flex flex-col border-t border-current/25 text-[15px]">
                {s.itens.map((item) => (
                  <li key={item} className="border-b border-current/25 py-3">
                    {item}
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
