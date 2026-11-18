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

        // Entrada com molejo: o logo "quica" ao chegar.
        gsap
          .timeline({ defaults: { ease: "power4.out" } })
          .fromTo("[data-window-in]", { clipPath: "inset(100% 0% 0% 0%)" }, { clipPath: "inset(0% 0% 0% 0%)", duration: 1.4, ease: "power3.inOut" })
          .from("[data-window-in] [data-pattern]", { scale: 1.25, duration: 2 }, 0)
          .from("[data-logo-in]", { yPercent: 60, scale: 0.85, autoAlpha: 0, duration: 1.4, ease: "elastic.out(1, 0.6)" }, 0.5)
          .from("[data-small]", { yPercent: 120, autoAlpha: 0, duration: 0.9, stagger: 0.1 }, 0.7)
          .from("[data-simbolo-in]", { y: 120, rotation: -40, scale: 0.4, autoAlpha: 0, duration: 1.6, ease: "elastic.out(1, 0.5)" }, 0.8)
          .from("[data-cta-in]", { scale: 0.4, rotation: -60, autoAlpha: 0, duration: 1.1, ease: "back.out(2)" }, 1.1);

        // Padrão deslizando e símbolo balançando: a página nunca fica parada.
        gsap.to("[data-pattern]", { xPercent: -50, duration: 60, ease: "none", repeat: -1 });
        gsap.to("[data-simbolo-in]", { rotation: 8, y: -10, duration: 2.4, ease: "sine.inOut", yoyo: true, repeat: -1, delay: 2.4 });

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
          .to("[data-type]", { scale: mobile ? 0.94 : 0.84, yPercent: -8, duration: 1 }, 0)
          .to("[data-simbolo]", { scale: 1.3, yPercent: 15, rotation: 20, duration: 1 }, 0)
          .to("[data-cta]", { autoAlpha: 0, y: 35, duration: 0.3 }, 0);

        gsap.to("[data-simbolo-drift]", {
          yPercent: 30,
          ease: "none",
          scrollTrigger: { trigger: document.getElementById("faixa"), start: "top bottom", end: "top top", scrub: 1 },
        });
      });
    },
    { scope: ref },
  );

  return (
    <section ref={ref} id="inicio" aria-label="Puna Studios" className="relative z-20 h-svh min-h-[640px]">
      <div data-window className="hero-window absolute inset-0">
        <div data-window-in className="absolute inset-0 overflow-hidden bg-mint">
          <div data-pattern className="absolute inset-y-[-6%] left-0 flex w-[400%] text-sage/45 will-change-transform">
            <Padrao className="h-full w-1/2" />
            <Padrao className="h-full w-1/2" />
          </div>
        </div>
      </div>

      <div data-type className="absolute top-[14%] left-[6%] z-10 w-[88%] text-center max-md:top-[20%] max-md:left-[5%] max-md:w-[90%]">
        <div className="overflow-hidden">
          <p data-small className="inline-block rounded-full bg-ink px-5 py-2 font-display text-[clamp(15px,1.4vw,22px)] font-medium text-mint">
            estúdio criativo local ✦ POA
          </p>
        </div>
        <div data-logo-in className="mt-[1.6vw]">
          <h1 className="text-ink">
            <Palavra className="mx-auto w-[min(100%,74svh)]" />
          </h1>
        </div>
      </div>

      <div data-simbolo className="pointer-events-none absolute top-[66%] left-1/2 z-20 w-[min(8vw,120px)] -translate-x-1/2 max-md:top-[60%] max-md:w-[18vw]">
        <div data-simbolo-drift>
          <div data-simbolo-in className="text-ink">
            <Simbolo className="w-full" />
          </div>
        </div>
      </div>

      <div data-cta className="absolute bottom-[8%] left-[6%] z-30">
        <div data-cta-in>
          <CircleLink href="#trabalhos">
            ver
            <br />
            clientes
          </CircleLink>
        </div>
      </div>
    </section>
  );
}
