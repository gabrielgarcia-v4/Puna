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
      });

      // Card que acompanha o cursor (só onde existe mouse).
      mm.add("(hover: hover) and (min-width: 900px)", () => {
        const card = ref.current!.querySelector<HTMLElement>("[data-card]")!;
        gsap.set(card, { scale: 0, autoAlpha: 0 });
        const x = gsap.quickTo(card, "x", { duration: 0.6, ease: "power3" });
        const y = gsap.quickTo(card, "y", { duration: 0.6, ease: "power3" });
        const r = gsap.quickTo(card, "rotation", { duration: 0.8, ease: "power3" });
        let lastX = 0;
        const GAP = 28;
        const move = (e: PointerEvent) => {
          const box = ref.current!.getBoundingClientRect();
          const w = card.offsetWidth;
          const h = card.offsetHeight;
          const px = e.clientX - box.left;
          const py = e.clientY - box.top;
          // Fica à direita do cursor; perto da borda direita, troca de lado. Nunca sai da seção.
          const left = px + GAP + w > box.width - 16 ? px - GAP - w : px + GAP;
          x(left);
          y(gsap.utils.clamp(16, box.height - h - 16, py - h / 2));
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
      opacity: (k) => (i === null || k === i ? 1 : 0.22),
      y: (k) => (k === i ? -6 : 0),
      duration: 0.6,
      ease: "expo.out",
      overwrite: "auto",
    });
  });

  const t = atual === null ? null : trabalhos[atual];

  return (
    <section ref={ref} id="trabalhos" data-dark className="relative z-10 overflow-hidden bg-ink py-[clamp(100px,10vw,170px)] text-mint-soft">
      <div className="mx-auto grid w-[min(100%-8vw,1440px)] gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,2fr)] lg:gap-[6vw]">
        <div className="flex flex-col justify-between gap-8">
          <h2 data-reveal className="font-display text-[clamp(40px,4.4vw,76px)] leading-[0.95] font-normal tracking-[-0.035em]">
            Quem já criou <em className="font-light text-mint">com a gente</em>
          </h2>
          <p className="text-[12px] tracking-[0.35em] text-sage uppercase">{String(trabalhos.length).padStart(2, "0")} marcas · e contando</p>
        </div>

        {/* Nomes em fluxo contínuo, como um texto; cada um tem o slug da futura página. */}
        <ul data-lista className="flex flex-wrap items-baseline gap-x-[0.3em] gap-y-1 text-[clamp(32px,4.2vw,68px)] leading-[1.15]" onPointerLeave={() => mostrar(null)}>
          {trabalhos.map((c, i) => (
            <li key={c.slug} data-cliente={c.slug} className="flex items-baseline gap-x-[0.3em]" onPointerEnter={() => mostrar(i)}>
              <span className="overflow-hidden pb-[0.12em]">
                <span data-nome className="inline-block cursor-default font-display font-light tracking-[-0.03em] whitespace-nowrap">
                  {c.cliente}
                  <sup className="ml-1 align-super font-sans text-[0.22em] tracking-[0.2em] text-sage">{String(i + 1).padStart(2, "0")}</sup>
                </span>
              </span>
              {i < trabalhos.length - 1 && (
                <span aria-hidden="true" className="font-display font-light text-sage/50">
                  /
                </span>
              )}
            </li>
          ))}
        </ul>
      </div>

      <div
        data-card
        aria-hidden="true"
        className={`pointer-events-none invisible absolute top-0 left-0 z-20 hidden aspect-[3/4] w-[clamp(200px,16vw,250px)] flex-col justify-between rounded-[var(--radius-card)] p-6 shadow-[0_30px_60px_rgba(0,0,0,0.35)] min-[900px]:flex ${
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
