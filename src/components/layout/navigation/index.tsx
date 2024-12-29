import { useGSAP } from "@gsap/react";
import { useRef, useState } from "react";
import gsap from "gsap";

type NavigationProps = {
  logo?: React.ReactNode,
  links?: {
    text: string,
    link: string,
    ariaLabel: string,
  }[]
}

export default function Navigation({ logo = "Logo here", links = [] }: NavigationProps) {

  const navRef = useRef<HTMLElement>(null);
  const [menuOpen, setMenuOpen] = useState(false);

  useGSAP(() => {
    gsap.from(navRef.current, {
      top: "-5em",
      duration: 1,
    })
  }, []);

  return (
    <nav ref={navRef} className="fixed z-[99] top-0 w-full lg:w-max lg:top-6 lg:left-[50%] lg:-translate-x-[50%] lg:rounded-lg border-solid border-[1px] border-[#ffffff1a] bg-[#0d0d0d80] backdrop-blur-[10px] overflow-hidden" role="navigation">
      <div className="flex gap-4 px-6 py-4 justify-between items-center">
        <div className="logo">
          <a href="/" aria-label="Home">
            { logo }
          </a>
        </div>
        <div className="hidden lg:block text-sm font-medium tracking-[-0.02em]">
          <ul className="flex gap-1">
            { links.map((link => (
              <li className="rounded-lg transition-all duration-300 ease-in-out py-1 px-4 hover:bg-background-hover"><a href={link.link} aria-label={link.ariaLabel}>{link.text}</a></li>
            ))) }
          </ul>
        </div>
        <div className="hidden lg:block text-sm font-medium tracking-[-0.02em]">
          <a href="#" className="bg-accent px-3 py-[0.6em] rounded-xl transition-shadow duration-300 ease-in-out hover:shadow-primary" aria-label="Schedule a call with us">Book a call</a>
        </div>
        <div onClick={() => setMenuOpen(p => !p)} className="lg:hidden">
          <button className="">menu</button>
        </div>
      </div>
      <div className="text-sm transition-all duration-500 ease-in-out" style={{ height: menuOpen ? "18em" : "0" }}>
          <ul className="flex flex-col mb-4">
            { links.map((link => (
              <li className="transition-all font-[500] duration-300 ease-in-out py-2 px-4 hover:bg-background-hover"><a href={link.link} aria-label={link.ariaLabel}>{link.text}</a></li>
            ))) }
          </ul>
          <button className="text-sm w-full px-4 font-medium tracking-[-0.02em]">
            <a href="#" className="bg-accent block w-full px-3 py-[0.6em] rounded-xl transition-shadow duration-300 ease-in-out hover:shadow-primary" aria-label="Schedule a call with us">Book a call</a>
          </button>
      </div>
    </nav>
  )
}