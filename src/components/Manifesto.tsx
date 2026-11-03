import { useRef } from "react";
import { gsap, SplitText, useGSAP, MOTION_OK } from "@/lib/gsap";
import { manifesto } from "@/content/site";
import { Simbolo } from "./Brand";

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
                stagger: 0.08,
                ease: "none",
                scrollTrigger: { trigger: "[data-manifesto]", start: "top 80%", end: "bottom 50%", scrub: 1 },
              },
            ),
        });
        gsap.from("[data-flame]", {
          rotation: -25,
          y: 40,
          autoAlpha: 0,
          duration: 2,
          ease: "expo.out",
          scrollTrigger: { trigger: ref.current, start: "top 75%", once: true },
        });
      });
    },
    { scope: ref },
  );

  return (
    <section ref={ref} id="manifesto" className="relative z-10 mx-auto w-[min(100%-8vw,1240px)] pt-[clamp(140px,16vw,260px)] pb-[clamp(90px,10vw,170px)] text-center">
      <div data-flame className="mx-auto mb-10 w-9 text-clay">
        <Simbolo className="w-full" />
      </div>
      <p data-manifesto className="font-editorial text-[clamp(32px,4.2vw,72px)] leading-[1.08] font-light tracking-[-0.02em]">
        {manifesto}
      </p>
    </section>
  );
}
