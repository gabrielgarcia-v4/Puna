import { useRef } from "react";
import { gsap, SplitText, useGSAP, MOTION_OK } from "@/lib/gsap";
import { manifesto } from "@/content/site";
import { Padrao } from "./Brand";

export default function Manifesto() {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      gsap.matchMedia().add(MOTION_OK, () => {
        // As palavras "acendem" conforme a leitura avança com o scroll.
        SplitText.create("[data-manifesto]", {
          type: "words",
          autoSplit: true,
          onSplit: (self) =>
            gsap.fromTo(
              self.words,
              { opacity: 0.15, yPercent: 20 },
              {
                opacity: 1,
                yPercent: 0,
                stagger: 0.1,
                ease: "none",
                scrollTrigger: { trigger: "[data-manifesto]", start: "top 80%", end: "bottom 45%", scrub: 1 },
              },
            ),
        });
        gsap.fromTo(
          "[data-manifesto-bg]",
          { xPercent: 0 },
          { xPercent: -25, ease: "none", scrollTrigger: { trigger: ref.current, start: "top bottom", end: "bottom top", scrub: 1 } },
        );
      });
    },
    { scope: ref },
  );

  return (
    <section ref={ref} id="manifesto" className="relative z-10 overflow-hidden bg-mint py-[clamp(120px,14vw,240px)]">
      <div data-manifesto-bg className="pointer-events-none absolute inset-y-0 left-0 flex w-[300%] text-sage/35">
        <Padrao className="h-full w-1/3" />
        <Padrao className="h-full w-1/3" />
        <Padrao className="h-full w-1/3" />
      </div>
      <p
        data-manifesto
        className="relative mx-auto w-[min(100%-8vw,1200px)] text-center font-display text-[clamp(40px,6.4vw,112px)] leading-[1] font-semibold tracking-[-0.03em]"
      >
        {manifesto}
      </p>
    </section>
  );
}
