import { useRef, useState } from "react";
import { gsap, useGSAP, MOTION_OK } from "@/lib/gsap";
import { revealLines } from "@/lib/animations";
import { trabalhos, tons } from "@/content/site";
import { Arrow } from "./ui";

/**
 * Lista de clientes em letras grandes. No desktop, um card colorido segue o cursor
 * e mostra a área de cada cliente; os outros nomes apagam. Cada linha já tem o
 * `slug` da futura página do cliente.
 */
export default function Trabalhos() {
  const ref = useRef<HTMLElement>(null);
  const [atual, setAtual] = useState<number | null>(null);

  const { contextSafe } = useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        revealLines(ref.current!);
        gsap.from("[data-nome]", {
          yPercent: 105,
          duration: 1.4,
          stagger: 0.07,
          ease: "expo.out",
          scrollTrigger: { trigger: "[data-lista]", start: "top 85%", once: true },
        });
        gsap.from("[data-linha]", {
          scaleX: 0,
          transformOrigin: "left",
          duration: 1.4,
          stagger: 0.07,
          ease: "power3.inOut",
          scrollTrigger: { trigger: "[data-lista]", start: "top 85%", once: true },
        });
      });

      // Card que acompanha o cursor (só onde existe mouse).
      mm.add("(hover: hover) and (min-width: 900px)", () => {
        const card = ref.current!.querySelector<HTMLElement>("[data-card]")!;
        gsap.set(card, { xPercent: 12, yPercent: -55, scale: 0, autoAlpha: 0 });
        const x = gsap.quickTo(card, "x", { duration: 0.6, ease: "power3" });
        const y = gsap.quickTo(card, "y", { duration: 0.6, ease: "power3" });
        const r = gsap.quickTo(card, "rotation", { duration: 0.8, ease: "power3" });
        let lastX = 0;
        const move = (e: PointerEvent) => {
          const box = ref.current!.getBoundingClientRect();
          x(e.clientX - box.left);
          y(e.clientY - box.top);
          r(gsap.utils.clamp(-8, 8, (e.clientX - lastX) * 0.4));
          lastX = e.clientX;
        };
        ref.current!.addEventListener("pointermove", move);
        return () => ref.current?.removeEventListener("pointermove", move);
      });
    },
    { scope: ref },
  );

  const mostrar = contextSafe((i: number | null) => {
    setAtual(i);
    if (!window.matchMedia("(hover: hover) and (min-width: 900px)").matches) return;
    gsap.to("[data-card]", { scale: i === null ? 0 : 1, autoAlpha: i === null ? 0 : 1, duration: 0.5, ease: "expo.out", overwrite: "auto" });
    gsap.to("[data-nome]", {
      opacity: (k) => (i === null || k === i ? 1 : 0.25),
      x: (k) => (k === i ? 24 : 0),
      duration: 0.6,
      ease: "expo.out",
      overwrite: "auto",
    });
  });

  const t = atual === null ? null : trabalhos[atual];

  return (
    <section ref={ref} id="trabalhos" data-dark className="relative z-10 overflow-hidden bg-ink py-[clamp(110px,12vw,200px)] text-mint-soft">
      <div className="mx-auto w-[min(100%-8vw,1440px)]">
        <div className="flex items-end justify-between gap-8">
          <h2 data-reveal className="max-w-[20ch] font-display text-[clamp(44px,5.6vw,96px)] leading-[0.95] font-normal tracking-[-0.035em]">
            Quem já criou <em className="font-light text-mint">com a gente</em>
          </h2>
          <p className="hidden shrink-0 text-[12px] tracking-[0.35em] text-sage uppercase md:block">
            {String(trabalhos.length).padStart(2, "0")} marcas
          </p>
        </div>

        <ul data-lista className="mt-[clamp(56px,7vw,110px)]" onPointerLeave={() => mostrar(null)}>
          {trabalhos.map((c, i) => (
            <li key={c.slug} data-cliente={c.slug} className="relative" onPointerEnter={() => mostrar(i)}>
              <span data-linha className="absolute inset-x-0 top-0 h-px bg-mint/15" />
              <div className="flex items-center justify-between gap-6 py-[clamp(14px,1.6vw,24px)] max-sm:flex-col max-sm:items-start max-sm:gap-2">
                <div className="overflow-hidden">
                  <h3 data-nome className="font-display text-[clamp(40px,6.4vw,112px)] leading-[1] font-light tracking-[-0.035em]">
                    {c.cliente}
                  </h3>
                </div>
                <span className="flex shrink-0 items-center gap-3 text-[12px] tracking-[0.3em] text-sage uppercase">
                  <span className={`size-2 rounded-full ${tons[c.tom].split(" ")[0]}`} />
                  <span>{c.area}</span>
                </span>
              </div>
            </li>
          ))}
        </ul>
      </div>

      <div
        data-card
        aria-hidden="true"
        className={`pointer-events-none invisible absolute top-0 left-0 z-20 hidden aspect-[3/4] w-[clamp(220px,20vw,300px)] flex-col justify-between rounded-[var(--radius-card)] p-6 shadow-[0_30px_60px_rgba(0,0,0,0.35)] min-[900px]:flex ${
          t ? tons[t.tom] : "bg-mint text-ink"
        }`}
      >
        <span className="text-[11px] tracking-[0.3em] uppercase opacity-70">{t?.area}</span>
        <div>
          <p className="font-display text-[clamp(30px,2.6vw,42px)] leading-[0.95] tracking-[-0.03em]">{t?.cliente}</p>
          <p className="mt-4 flex items-center gap-2 text-[13px] opacity-70">
            Case em breve <Arrow className="size-3.5" />
          </p>
        </div>
      </div>
    </section>
  );
}
