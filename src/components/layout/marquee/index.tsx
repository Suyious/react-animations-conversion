import { useGSAP } from "@gsap/react"
import gsap from "gsap";
import { useRef } from "react";

type MarqueeProps = {
    children: React.ReactNode[],
    width?: string,
    duration?: number,
}

const Marquee = ({ children, width = "100%", duration = 50 }: MarqueeProps) => {

    const array = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        gsap.timeline().from(array.current, {
            opacity: 0,
            duration: 2
        }).from(array.current, {
            transform: "translateX(calc(-50% - 2em))",
            repeat: -1,
            duration,
            delay: -2,
            ease: "linear"
        })
    }, [])

    return (
        <div className="py-16 m-auto overflow-hidden relative" style={{ width }}>
            <div className="absolute z-10 top-0 left-0 h-full w-2/12 lg:w-1/12 bg-gradient-to-r from-background to-transparent"></div>
            <div ref={array} className="flex gap-16 w-max h-full flex-nowrap">
                {children}
                {children}
            </div>
            <div className="absolute z-10 top-0 right-0 h-full w-2/12 lg:w-1/12 bg-gradient-to-l from-background to-transparent"></div>
        </div>
    )
}

export default Marquee;