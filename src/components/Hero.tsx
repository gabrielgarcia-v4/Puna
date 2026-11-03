import { useRef } from "react";
import { gsap, useGSAP, MOTION_OK } from "@/lib/gsap";
import { Padrao, Palavra, Simbolo } from "./Brand";
import { CircleLink } from "./ui";

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

        // Entrada
        gsap
          .timeline({ defaults: { ease: "power4.out" } })
          .fromTo("[data-window-in]", { clipPath: "inset(100% 0% 0% 0%)" }, { clipPath: "inset(0% 0% 0% 0%)", duration: 1.5, ease: "power3.inOut" })
          .from("[data-window-in] [data-pattern]", { scale: 1.25, duration: 2 }, 0)
          .from("[data-logo-in]", { yPercent: 40, autoAlpha: 0, duration: 1.4 }, 0.45)
          .from("[data-small]", { yPercent: 120, autoAlpha: 0, duration: 1, stagger: 0.1 }, 0.7)
          .from("[data-simbolo-in]", { yPercent: 30, rotation: -12, autoAlpha: 0, duration: 1.8, ease: "expo.out" }, 0.75)
          .from("[data-cta-in]", { scale: 0.6, rotation: -30, autoAlpha: 0, duration: 1, ease: "back.out(1.6)" }, 1.1);

        // O padrão desliza devagar dentro da janela, como uma chama viva.
        gsap.to("[data-pattern]", { xPercent: -50, duration: 60, ease: "none", repeat: -1 });

        // Scroll: hero fixo enquanto a janela abre, o logo encolhe e clareia e o símbolo desce.
        gsap
          .timeline({
            defaults: { ease: "none" },
            scrollTrigger: {
              trigger: ref.current,
              start: "top top",
              end: () => `+=${window.innerHeight * 0.8}`,
              pin: true,
              scrub: 1,
              invalidateOnRefresh: true,
            },
          })
          .to("[data-window]", { clipPath: WINDOW_FULL, duration: 1 }, 0)
          .to("[data-type]", { scale: mobile ? 0.94 : 0.82, yPercent: -8, duration: 1 }, 0)
          .to("[data-type] [data-tint]", { color: "#ede4d3", duration: 0.7 }, 0.15)
          .to("[data-simbolo]", { scale: 0.8, yPercent: 10, duration: 1 }, 0)
          .to("[data-cta]", { autoAlpha: 0, y: 35, duration: 0.3 }, 0);

        gsap.to("[data-simbolo-drift]", {
          yPercent: 22,
          ease: "none",
          scrollTrigger: { trigger: document.getElementById("estudio"), start: "top bottom", end: "top top", scrub: 1 },
        });
      });
    },
    { scope: ref },
  );

  return (
    <section ref={ref} id="inicio" aria-label="Puna Studios" className="relative z-20 h-svh min-h-[640px]">
      <div data-window className="hero-window absolute inset-0">
        <div data-window-in className="absolute inset-0 overflow-hidden bg-clay">
          <div data-pattern className="absolute inset-y-[-6%] left-0 flex w-[400%] text-night/20 will-change-transform">
            <Padrao className="h-full w-1/2" />
            <Padrao className="h-full w-1/2" />
          </div>
          <div className="absolute inset-0 bg-gradient-to-b from-night/10 via-transparent to-night/30" />
        </div>
      </div>

      <div data-type className="absolute top-[13%] left-[6%] z-10 w-[88%] text-center max-md:top-[20%] max-md:left-[5%] max-md:w-[90%]">
        <div className="overflow-hidden">
          <p data-small data-tint className="font-editorial text-[clamp(20px,2.4vw,40px)] leading-none tracking-[-0.03em] text-ink italic">
            estúdio criativo local
          </p>
        </div>
        <div data-logo-in className="mt-[1.2vw]">
          <h1 data-tint className="text-ink">
            <Palavra className="mx-auto w-[min(100%,72svh)]" />
          </h1>
        </div>
        <div className="overflow-hidden">
          <p data-small data-tint className="mt-4 text-[clamp(11px,1vw,15px)] tracking-[0.3em] text-ink uppercase">
            Branding · Conteúdo · Performance — Porto Alegre
          </p>
        </div>
      </div>

      <div data-simbolo className="pointer-events-none absolute top-[69%] left-1/2 z-20 w-[min(7vw,104px)] -translate-x-1/2 max-md:top-[64%] max-md:w-[16vw]">
        <div data-simbolo-drift>
          <div data-simbolo-in className="text-ink drop-shadow-[0_30px_30px_rgba(24,24,20,0.3)]">
            <Simbolo className="w-full" />
          </div>
        </div>
      </div>

      <div data-cta className="absolute bottom-[8%] left-[6%] z-30">
        <div data-cta-in>
          <CircleLink href="#trabalhos" variant="outline">
            VER
            <br />
            TRABALHOS
          </CircleLink>
        </div>
      </div>
    </section>
  );
}
