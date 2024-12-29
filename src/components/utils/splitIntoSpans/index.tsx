import { forwardRef } from "react";

type SplitItoSpanProps = {
    children: string,
    separator?: string,
    className?: (word?: string, i?: number) => string,
}

const SplitIntoSpans = forwardRef<(HTMLSpanElement | null)[], SplitItoSpanProps>(({ children, separator = " ", className = () => "" }: SplitItoSpanProps, ref) => {
    return children.split(separator).map((word, i) => (
        <span
            ref={r => { if (ref && "current" in ref && ref.current) ref.current[i] = r }}
            key={i} className={className(word, i)} >{word} </span>
    ))
})

export default SplitIntoSpans;