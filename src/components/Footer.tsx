import { useRef } from "react";
import { gsap, useGSAP, MOTION_OK } from "@/lib/gsap";
import { revealLines } from "@/lib/animations";
import { contato, nav } from "@/content/site";
import { Logo, Padrao } from "./Brand";
import { PillLink } from "./ui";

const canais = [
  ["WhatsApp", contato.whatsapp],
  ["E-mail", contato.email],
  ["Instagram", contato.instagram],
];

export default function Footer() {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      gsap.matchMedia().add(MOTION_OK, () => {
        revealLines(ref.current!);
        gsap.from("[data-col]", {
          y: 55,
          autoAlpha: 0,
          duration: 1,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: { trigger: "[data-cols]", start: "top 92%", once: true },
        });
        gsap.fromTo(
          "[data-footer-bg]",
          { xPercent: 0 },
          { xPercent: -12, ease: "none", scrollTrigger: { trigger: ref.current, start: "top bottom", end: "bottom bottom", scrub: 1.2 } },
        );
      });
    },
    { scope: ref },
  );

  return (
    <footer ref={ref} id="contato" data-dark className="relative z-10 min-h-[clamp(760px,56vw,1040px)] overflow-hidden bg-clay text-paper-soft">
      <div data-footer-bg className="absolute inset-y-0 left-0 flex w-[300%] text-night/15">
        <Padrao className="h-full w-1/3" />
        <Padrao className="h-full w-1/3" />
        <Padrao className="h-full w-1/3" />
      </div>
      <div className="absolute inset-0 bg-gradient-to-t from-clay via-clay/70 to-clay/20" />

      <div className="relative mx-auto flex min-h-[inherit] w-[min(100%-8vw,1700px)] flex-col justify-between pt-[clamp(120px,11vw,210px)] pb-10">
        <div className="text-center">
          <p className="text-[13px] tracking-[0.3em] uppercase opacity-80">Support your local studio®</p>
          <h2 data-reveal className="mx-auto mt-6 max-w-[18ch] font-editorial text-[clamp(44px,5.6vw,104px)] leading-[0.95] font-light tracking-[-0.045em]">
            Vamos construir a sua marca de perto
          </h2>
          <div className="mt-12">
            <PillLink href={contato.whatsapp} tone="light">
              Conversar com a Puna
            </PillLink>
          </div>
        </div>

        <div className="mt-24">
          <div data-cols className="grid grid-cols-2 gap-x-6 gap-y-10 md:grid-cols-3 md:gap-16">
            <div data-col className="flex flex-col items-start gap-1.5">
              <h3 className="mb-3 font-editorial text-[clamp(22px,1.8vw,30px)] font-light">Contato</h3>
              {canais.map(([label, href]) => (
                <a key={label} href={href} {...(href.startsWith("http") ? { target: "_blank", rel: "noopener" } : {})} data-hover="nudge" className="text-[clamp(14px,1.05vw,17px)] opacity-85 hover:opacity-100">
                  {label}
                </a>
              ))}
            </div>
            <div data-col className="flex flex-col items-start gap-1.5">
              <h3 className="mb-3 font-editorial text-[clamp(22px,1.8vw,30px)] font-light">Estúdio</h3>
              {nav.slice(0, 4).map((l) => (
                <a key={l.href} href={l.href} data-hover="nudge" className="text-[clamp(14px,1.05vw,17px)] opacity-85 hover:opacity-100">
                  {l.label}
                </a>
              ))}
            </div>
            <div data-col className="col-span-2 flex flex-col items-start gap-1.5 md:col-span-1">
              <h3 className="mb-3 font-editorial text-[clamp(22px,1.8vw,30px)] font-light">Onde estamos</h3>
              <p className="text-[clamp(14px,1.05vw,17px)] opacity-85">Porto Alegre, RS</p>
              <p className="text-[clamp(14px,1.05vw,17px)] opacity-85">Atendemos marcas de todo o Brasil</p>
            </div>
          </div>

          <div className="mt-16 flex flex-col justify-between gap-6 border-t border-paper-soft/25 pt-8 text-xs opacity-75 md:flex-row md:items-center">
            <Logo className="w-24" />
            <p>Puna Studios · {new Date().getFullYear()} · Todos os direitos reservados</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
