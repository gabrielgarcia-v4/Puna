import { useRef } from "react";
import { gsap, useGSAP, MOTION_OK } from "@/lib/gsap";
import { revealLines } from "@/lib/animations";
import { Simbolo } from "./Brand";

// Adesivos que flutuam em volta da frase e reagem ao scroll em velocidades diferentes.
const adesivos = [
  { texto: "feito em POA", pos: "top-[12%] left-[5%]", estilo: "-rotate-6 bg-mint", vel: -30 },
  { texto: "sem enrolação", pos: "top-[16%] right-[6%]", estilo: "rotate-3 bg-sand", vel: -55 },
  { texto: "com dado", pos: "bottom-[14%] left-[12%]", estilo: "rotate-6 bg-sage", vel: -20 },
  { texto: "criativo de verdade", pos: "bottom-[10%] right-[10%]", estilo: "-rotate-3 bg-mint", vel: -45 },
];

export default function Intro() {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      gsap.matchMedia().add(MOTION_OK, () => {
        revealLines(ref.current!);
        gsap.from("[data-adesivo]", {
          scale: 0,
          rotation: -30,
          duration: 1,
          stagger: 0.12,
          ease: "back.out(2.2)",
          scrollTrigger: { trigger: ref.current, start: "top 70%", once: true },
        });
        gsap.utils.toArray<HTMLElement>("[data-float]").forEach((el) =>
          gsap.to(el, {
            yPercent: Number(el.dataset.float),
            ease: "none",
            scrollTrigger: { trigger: ref.current, start: "top bottom", end: "bottom top", scrub: 1 },
          }),
        );
        gsap.to("[data-intro-simbolo]", {
          rotation: 180,
          ease: "none",
          scrollTrigger: { trigger: ref.current, start: "top bottom", end: "bottom top", scrub: 1 },
        });
      });
    },
    { scope: ref },
  );

  return (
    <section ref={ref} id="estudio" className="relative z-10 overflow-hidden py-[clamp(140px,16vw,260px)]">
      <div data-float="-60" className="pointer-events-none absolute top-[18%] left-1/2 w-[min(46vw,560px)] -translate-x-1/2 text-mint">
        <div data-intro-simbolo>
          <Simbolo className="w-full" />
        </div>
      </div>

      <h2
        data-reveal
        className="relative mx-auto w-[min(100%-8vw,1100px)] text-center font-display text-[clamp(44px,7vw,120px)] leading-[0.95] font-semibold tracking-[-0.03em]"
      >
        Marcas com cara própria. Feitas de perto.
      </h2>

      {adesivos.map((a) => (
        <div key={a.texto} data-float={a.vel} className={`absolute ${a.pos} max-md:hidden`}>
          <span
            data-adesivo
            className={`block rounded-full border-2 border-ink px-5 py-2.5 font-display text-[clamp(16px,1.4vw,22px)] font-semibold shadow-[0_6px_0_#2c3224] ${a.estilo}`}
          >
            {a.texto}
          </span>
        </div>
      ))}
    </section>
  );
}
