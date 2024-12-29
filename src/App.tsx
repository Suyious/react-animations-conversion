import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useEffect, useRef } from "react";
import Navigation from "./components/layout/navigation";
import SplitIntoSpans from "./components/utils/splitIntoSpans";
import Lenis from "lenis";
import { marqueecards } from "./data/marquee";
import Marquee from "./components/layout/marquee";
import Cursor from "./components/layout/cursor";
import Logo from "./icons/logo";
import Blop from "./components/elements/blop";
import { ScrollTrigger } from "gsap/ScrollTrigger";

function App() {

  const headingRef = useRef<(HTMLSpanElement | null)[]>([]);
  const subHeadingRef = useRef<(HTMLSpanElement | null)[]>([]);
  const buttonsRef = useRef<HTMLDivElement | null>(null);
  const heroRef = useRef<HTMLDivElement | null>(null);
  const blopRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    new Lenis({ autoRaf: true, duration: 1.2, });
  }, [])

  useGSAP(() => {

    const blurIntoViewTween = {
      opacity: 0,
      filter: "blur(10px)",
    }

    gsap.timeline().from(buttonsRef.current, {
      opacity: 0,
      duration: 2,
      stagger: 0.1,
      delay: 1, 
    }).from(headingRef.current, {
      ...blurIntoViewTween,
      duration: 1,
      stagger: 0.1,
      delay: -2,
    }).from(subHeadingRef.current, {
      ...blurIntoViewTween,
      duration: 0.5,
      stagger: 0.05,
      delay: -1,
    })

    gsap.registerPlugin(ScrollTrigger) 

    gsap.timeline({
      scrollTrigger: {
        trigger: heroRef.current,
        start: "top top",
        end: "bottom top",
        scrub: 1,
      }
    }).to(blopRef.current, {
      y: -100
    })
  }, [])

  return (
    <div className="bg-background w-full min-h-screen pt-[10em] text-foreground font-[Satoshi]">
      <Cursor/>

      <Navigation
        logo={<Logo/>}
        links={[
          { text: "About", link: "", ariaLabel: "Learn more about us" },
          { text: "Blog", link: "", ariaLabel: "Visit Our Blog" },
          { text: "Services", link: "", ariaLabel: "Explore Our Services" },
          { text: "Process", link: "", ariaLabel: "View Our Processes" },
          { text: "Pages", link: "", ariaLabel: "Other Pages on this site" },
        ]}
      />

      <div ref={heroRef} className="overflow-hidden">
        <section className="relative z-10 flex flex-col items-center">
          <div className="max-w-[min(50em,88vw)] text-center">
            <h1 className="text-[2.3em] lg:text-[5em] font-[500] leading-[1.1em]">
              <SplitIntoSpans className={(word) => word === "scale" ? "font-[Instrument-Serif]": ""} ref={headingRef}>
                Ready to scale your brand with paid ads?
              </SplitIntoSpans>
            </h1>
            <div className="w-10/12 m-auto">
              <p className="pt-4 text-md lg:text-xl text-foreground-secondary font-[500]">
                <SplitIntoSpans ref={subHeadingRef}>
                  If you want to achieve ground-breaking growth with increased sales and profitability with paid ads, then you're in the right place.
                </SplitIntoSpans>
              </p>
            </div>
            <div ref={buttonsRef} className="pt-8 font-[500]">
              <button className="px-4 py-2 rounded-xl bg-accent mr-4 transition-shadow duration-300 ease-in-out hover:shadow-primary cursor-pointer">Book a call</button>
              <button className="px-4 py-2 rounded-xl transition-shadow duration-300 ease-in-out hover:shadow-secondary cursor-pointer">Learn More</button>
            </div>
          </div>
        </section>

        <div className="relative h-[18em]">
          <div ref={blopRef} className="absolute w-full -bottom-[10em] h-[18em]">
            <Blop elements={[
              { background: "conic-gradient(from 0deg at 50% 50%, #ff0000 0deg, hsl(354, 100%, 50%) 54deg, #00a6ff 106deg, #4797ff 162deg, #04f 252deg, #ff8000 306deg, hsl(0, 100%, 50%) 360deg)",
                width: "25em", maxWidth: "70vw", height: "auto", aspectRatio: "1", borderRadius: "50%", filter: "blur(70px)"},
              { background: "conic-gradient(from 0deg at 50% 50%, #ffd9ad 0deg, #139ce5 180deg, #fd864d 360deg)",
                width: "18em", maxWidth: "60vw", height: "auto", aspectRatio: "1", borderRadius: "50%", filter: "blur(32px)"},
              { background: "conic-gradient(from 0deg at 50% 50%, #ffd9ad 0deg, #139ce5 180deg, #fd864d 360deg)",
                width: "18em", maxWidth: "60vw", height: "auto", aspectRatio: "1", borderRadius: "50%", filter: "blur(32px)", mixBlendMode: "overlay"},
            ]}/>
          </div>
        </div>

        <section className="relative pt-16">
          <div className="absolute z-[5] blur-md w-full h-full top-0 bg-black"></div>
          <div className="relative z-10 flex gap-16 w-[1080px] max-w-[90vw] m-auto overflow-hidden">
            <Marquee>
              {marqueecards.map((card, i) => (
                <div key={i} className="h-[2.5em]">{card}</div>
              ))}
            </Marquee>
          </div>
          <div className="absolute z-[5] w-full h-1/5 bottom-0 bg-black"></div>
        </section>
      </div>

      <section className="h-screen"></section>
    </div>
  )
}

export default App