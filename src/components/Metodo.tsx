import { useRef } from "react";
import { gsap, useGSAP, MOTION_OK } from "@/lib/gsap";
import { revealLines } from "@/lib/animations";
import { metodo } from "@/content/site";
import { PillLink } from "./ui";

export default function Metodo() {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      gsap.matchMedia().add(MOTION_OK, () => {
        revealLines(ref.current!);
        gsap.utils.toArray<HTMLElement>("[data-passo]").forEach((el) => {
          gsap
            .timeline({ scrollTrigger: { trigger: el, start: "top 88%", once: true } })
            .from(el.querySelector("[data-passo-line]"), { scaleX: 0, transformOrigin: "left", duration: 1.2, ease: "power3.inOut" })
            .from(el.querySelectorAll("[data-passo-in]"), { y: 40, autoAlpha: 0, duration: 1, stagger: 0.08, ease: "power3.out" }, 0.2);
        });
        gsap.from("[data-pill]", {
          scale: 0.86,
          y: 24,
          autoAlpha: 0,
          duration: 0.9,
          ease: "back.out(1.6)",
          scrollTrigger: { trigger: "[data-pill]", start: "top 92%", once: true },
        });
      });
    },
    { scope: ref },
  );

  return (
    <section ref={ref} id="metodo" className="relative z-10 bg-paper-soft py-[clamp(100px,11vw,190px)]">
      <div className="mx-auto w-[min(100%-8vw,1440px)]">
        <div className="grid gap-8 md:grid-cols-2 md:items-end">
          <h2 data-reveal className="font-editorial text-[clamp(44px,6vw,96px)] leading-[0.92] font-light tracking-[-0.045em]">
            Método antes de <em className="text-clay">gosto</em>
          </h2>
          <p className="max-w-md text-[clamp(15px,1.3vw,20px)] leading-relaxed text-ink/75 md:justify-self-end">
            Todo projeto passa pelas mesmas quatro etapas. Elas deixam a criação ousada sem deixar o resultado na sorte.
          </p>
        </div>

        <ol className="mt-[clamp(56px,7vw,120px)]">
          {metodo.map((m, i) => (
            <li key={m.fase} data-passo className="relative grid gap-4 py-[clamp(26px,3vw,44px)] md:grid-cols-[120px_1fr_1.3fr] md:items-baseline md:gap-10">
              <span data-passo-line className="absolute inset-x-0 top-0 h-px bg-ink/25" />
              <span data-passo-in className="font-editorial text-[clamp(22px,2vw,32px)] text-clay italic">
                0{i + 1}
              </span>
              <h3 data-passo-in className="font-editorial text-[clamp(34px,3.6vw,60px)] leading-none font-light tracking-[-0.03em]">
                {m.fase}
              </h3>
              <p data-passo-in className="max-w-[46ch] text-[clamp(15px,1.2vw,19px)] leading-relaxed text-ink/75">
                {m.texto}
              </p>
            </li>
          ))}
        </ol>

        <div data-pill className="mt-[clamp(56px,6vw,100px)] text-center">
          <PillLink href="#contato">Quero começar pelo diagnóstico</PillLink>
        </div>
      </div>
    </section>
  );
}
