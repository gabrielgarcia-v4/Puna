import { useRef } from "react";
import { gsap, useGSAP, MOTION_OK } from "@/lib/gsap";
import { revealLines } from "@/lib/animations";
import { Simbolo } from "./Brand";

export default function Intro() {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      gsap.matchMedia().add(MOTION_OK, () => {
        revealLines(ref.current!);
        // O símbolo gira devagar atrás da frase, como um mandala.
        gsap.fromTo(
          "[data-intro-simbolo]",
          { rotation: -40, scale: 0.85 },
          { rotation: 40, scale: 1.05, ease: "none", scrollTrigger: { trigger: ref.current, start: "top bottom", end: "bottom top", scrub: 1.6 } },
        );
        gsap.from("[data-intro-sub]", {
          y: 24,
          autoAlpha: 0,
          duration: 1.4,
          ease: "expo.out",
          scrollTrigger: { trigger: "[data-intro-sub]", start: "top 90%", once: true },
        });
      });
    },
    { scope: ref },
  );

  return (
    <section ref={ref} id="estudio" className="relative z-10 overflow-hidden py-[clamp(150px,17vw,280px)]">
      <div className="pointer-events-none absolute inset-0 grid place-items-center">
        <div data-intro-simbolo className="w-[min(30vw,360px)] text-mint/70 max-md:w-[56vw]">
          <Simbolo className="w-full" />
        </div>
      </div>

      <h2
        data-reveal
        className="relative mx-auto w-[min(100%-8vw,1000px)] text-center font-display text-[clamp(44px,6.4vw,112px)] leading-[0.98] font-normal tracking-[-0.035em]"
      >
        Marcas com cara própria, feitas <em className="font-light">de perto</em>.
      </h2>
      <p data-intro-sub className="relative mt-8 text-center text-[clamp(11px,0.9vw,14px)] tracking-[0.35em] text-ink/60 uppercase">
        Estratégia · Criação · Performance
      </p>
    </section>
  );
}
