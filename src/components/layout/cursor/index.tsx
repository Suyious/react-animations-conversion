import gsap from "gsap";
import { useEffect, useRef } from "react";

const Cursor = () => {

    const cursor = useRef<HTMLDivElement>(null);

    useEffect(() => {

        const cursorMoveListener = ({ x, y }: MouseEvent) => {
            gsap.to(cursor.current, {
                transform: `translate(calc(${x}px + 50%), calc(${y}px + 50%))`
            });
        }
        const cursorEnterListener = () => gsap.to(cursor.current, { opacity: 1 });
        const cursorLeaveListener = () => gsap.to(cursor.current, { opacity: 0 });

        document.addEventListener("mousemove", cursorMoveListener);
        document.addEventListener("mouseenter", cursorEnterListener);
        document.addEventListener("mouseleave", cursorLeaveListener);

        return () => {
            document.removeEventListener("mousemove", cursorMoveListener);
            document.removeEventListener("mouseenter", cursorEnterListener);
            document.removeEventListener("mouseleave", cursorLeaveListener);
        }
    })

    return (
        <div ref={cursor} className="fixed z-[100] -top-4 -left-4 rounded-full pointer-events-none bg-accent w-4 h-4"/>
    )
}

export default Cursor;