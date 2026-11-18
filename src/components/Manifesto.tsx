import { useRef } from "react";
import { gsap, SplitText, useGSAP, MOTION_OK } from "@/lib/gsap";
import { manifesto } from "@/content/site";

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
              { opacity: 0.14 },
              {
                opacity: 1,
                stagger: 0.1,
                ease: "none",
                scrollTrigger: { trigger: "[data-manifesto]", start: "top 80%", end: "bottom 45%", scrub: 1 },
              },
            ),
        });
      });
    },
    { scope: ref },
  );

  return (
    <section ref={ref} id="manifesto" className="relative z-10 overflow-hidden bg-mint py-[clamp(130px,15vw,250px)]">
      <p
        data-manifesto
        className="relative mx-auto w-[min(100%-8vw,1150px)] text-center font-display text-[clamp(38px,5.6vw,96px)] leading-[1.05] font-light tracking-[-0.03em]"
      >
        {manifesto}
      </p>
    </section>
  );
}
