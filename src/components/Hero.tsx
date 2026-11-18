import { useRef } from "react";
import { gsap, useGSAP, MOTION_OK } from "@/lib/gsap";
import { Padrao, Palavra, Simbolo } from "./Brand";

// Janela que se abre até ocupar a tela (mesma mecânica do hero da LP Jacuzzi).
const WINDOW_FULL = "polygon(0% 0%, 50% 0%, 100% 0%, 100% 100%, 0% 100%, 0% 0%)";

export default function Hero() {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add({ motion: MOTION_OK, mobile: "(max-width: 700px)" }, (ctx) => {
        const { motion, mobile } = ctx.conditions as { motion: boolean; mobile: boolean };
        if (!motion) return;

        // Entrada lenta, como uma respiração.
        gsap
          .timeline({ defaults: { ease: "expo.out" } })
          .fromTo("[data-window-in]", { clipPath: "inset(100% 0% 0% 0%)" }, { clipPath: "inset(0% 0% 0% 0%)", duration: 2, ease: "power3.inOut" })
          .from("[data-window-in] [data-pattern]", { scale: 1.3, duration: 2.6 }, 0)
          .from("[data-logo-in]", { yPercent: 30, autoAlpha: 0, duration: 2 }, 0.6)
          .from("[data-small]", { y: 24, autoAlpha: 0, duration: 1.4, stagger: 0.15 }, 1)
          .from("[data-simbolo-in]", { y: 100, autoAlpha: 0, duration: 2.2 }, 0.9);

        // O padrão desliza devagar e o símbolo "respira".
        gsap.to("[data-pattern]", { xPercent: -50, duration: 90, ease: "none", repeat: -1 });
        gsap.to("[data-simbolo-in]", { scale: 1.06, duration: 4, ease: "sine.inOut", yoyo: true, repeat: -1, delay: 3 });

        gsap
          .timeline({
            defaults: { ease: "none" },
            scrollTrigger: {
              trigger: ref.current,
              start: "top top",
              end: () => `+=${window.innerHeight * 0.9}`,
              pin: true,
              scrub: 1.4,
              invalidateOnRefresh: true,
            },
          })
          .to("[data-window]", { clipPath: WINDOW_FULL, duration: 1 }, 0)
          .to("[data-type]", { scale: mobile ? 0.94 : 0.84, yPercent: -6, duration: 1 }, 0)
          .to("[data-simbolo]", { scale: 0.85, yPercent: 8, duration: 1 }, 0);

        gsap.to("[data-simbolo-drift]", {
          yPercent: 20,
          ease: "none",
          scrollTrigger: { trigger: document.getElementById("faixa"), start: "top bottom", end: "top top", scrub: 1.4 },
        });
      });
    },
    { scope: ref },
  );

  return (
    <section ref={ref} id="inicio" aria-label="Puna Studios" className="relative z-20 h-svh min-h-[640px]">
      <div data-window className="hero-window absolute inset-0">
        <div data-window-in className="absolute inset-0 overflow-hidden bg-mint">
          <div data-pattern className="absolute inset-y-[-6%] left-0 flex w-[400%] text-sage/20 will-change-transform">
            <Padrao className="h-full w-1/2" />
            <Padrao className="h-full w-1/2" />
          </div>
        </div>
      </div>

      <div data-type className="absolute top-[15%] left-[6%] z-10 w-[88%] text-center max-md:top-[22%] max-md:left-[5%] max-md:w-[90%]">
        <p data-small className="font-display text-[clamp(20px,2.2vw,36px)] leading-none text-ink italic">
          estúdio criativo
        </p>
        <div data-logo-in className="mt-[1.6vw]">
          <h1 className="text-ink">
            <Palavra className="mx-auto w-[min(100%,72svh)]" />
          </h1>
        </div>
        <p data-small className="mt-5 text-[clamp(11px,0.9vw,14px)] tracking-[0.35em] text-ink/70 uppercase">
          Branding · Conteúdo · Performance — Porto Alegre
        </p>
      </div>

      <div data-simbolo className="pointer-events-none absolute top-[68%] left-1/2 z-20 w-[min(6vw,92px)] -translate-x-1/2 max-md:top-[62%] max-md:w-[15vw]">
        <div data-simbolo-drift>
          <div data-simbolo-in className="text-ink">
            <Simbolo className="w-full" />
          </div>
        </div>
      </div>
    </section>
  );
}
