import { useRef } from "react";
import { gsap, useGSAP, MOTION_OK } from "@/lib/gsap";
import { revealLines } from "@/lib/animations";

export default function Intro() {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      gsap.matchMedia().add(MOTION_OK, () => {
        revealLines(ref.current!);
        gsap.from("p", {
          y: 30,
          autoAlpha: 0,
          duration: 1,
          stagger: 0.12,
          ease: "power3.out",
          scrollTrigger: { trigger: "[data-intro-copy]", start: "top 88%", once: true },
        });
      });
    },
    { scope: ref },
  );

  return (
    <section ref={ref} id="estudio" className="relative z-10 mx-auto w-[min(100%-8vw,1440px)] border-b border-line pt-[clamp(110px,14vw,220px)] pb-[clamp(60px,7vw,110px)]">
      <h2 data-reveal className="max-w-[17ch] font-editorial text-[clamp(44px,6vw,96px)] leading-[0.92] font-light tracking-[-0.045em]">
        Um estúdio local para marcas que querem ser <em className="text-clay">lembradas</em>
      </h2>
      <div data-intro-copy className="mt-[clamp(32px,4vw,60px)] grid max-w-5xl gap-8 text-[clamp(15px,1.3vw,20px)] leading-relaxed text-ink/80 md:grid-cols-2 md:gap-[14%]">
        <p>
          A Puna nasceu em Porto Alegre para fazer o trabalho que fica no meio do caminho entre a agência de branding e a
          agência de performance: marca com posição clara, conteúdo com cara de gente e mídia que presta contas.
        </p>
        <p>
          Trabalhamos perto, em ritmo de estúdio. Poucas marcas por vez, estratégia escrita antes de qualquer peça e
          números na mesa toda semana.
        </p>
      </div>
    </section>
  );
}
