import { CSSProperties } from "react";

export default function Blop({ elements, className = "" } : { elements: CSSProperties[], className?: string }) {
    return (
        <div className={`relative w-full h-full ${className}`}>
            {elements.map((element, index) => (
                <div className="absolute w-[10em] h-[10em] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-[50%] blur-2xl"
                    style={element} key={index}
                ></div>
            ))}
        </div>
    )
}