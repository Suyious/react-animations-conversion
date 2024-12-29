# Animations using GSAP

November 11, 2024 I am recreating  https://conversion.framer.media/ in React with GSAP. I am using this site because it has minimal animations but seems to touch multiple common use-cases in animations and should be a good starting project.

## Text Animations

For creating text animations like text appearing word by word or character by character, we need to split the text into multiple span tags in order to animate them seperately with stagger. For this, I created a separate component that splits the text into spans and then we can use a ref on this element to target each of the spans and animate them.

We can use the `useRef` hook to store an array of elements as shown below:

```tsx
const headingRef = useRef<(HTMLSpanElement | null)[]>([]);

{"This is a sample string"}.map((word, i) => (
	<span ref={r => headingRef.current[i] = r} key={i}>{word}</span>
))
```

Now this can be used to create a component to split the string.

```tsx
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
```

Now, we can apply gsap animations on the array of elements with stagger to create the text animation.

```tsx
  useGSAP(() => {
    gsap.timeline().from(headingRef.current, {
      opacity: 0,
      filter: "blur(10px)",
      duration: 1,
      stagger: 0.1,
      delay: -2,
    }).from(
    /*...*/
    )
  }, [])

```

## Marquee Animation

A Marquee is a container with text or elements flowing vertically infinitely without any external input. To achieve this infinite animation, I created a `Marquee` component that takes it an array of elements as children and uses gsap to make the elements flow. The component has options to change the speed of the marquee with the `duration` prop.

I have added the `children` twice inside the component to make sure the elements do not flow out of the marquee. I repeatedly translate the elements to half of it’s full width. Note that the container surrounding the children has a `w-max`, which makes sure it takes the maximum width that it’s content needs. The easing is linear so that the marquee flows without any acceleration.

```tsx
type MarqueeProps = {
    children: React.ReactNode[],
    width?: string,
    duration?: number,
}

const Marquee = ({ children, width = "1080px", duration = 50 }: MarqueeProps) => {

    const array = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        gsap.timeline().from(array.current, {
            transform: "translateX(calc(-50% - 2em))",
            repeat: -1,
            duration,
            delay: -2,
            ease: "linear"
        })
    }, [])

    return (
        <div className="py-16 m-auto overflow-hidden relative" style={{ width }}>
            <div className="absolute z-10 top-0 left-0 h-full w-1/12 bg-gradient-to-r from-background to-transparent"></div>
            <div ref={array} className="flex gap-16 w-max h-full flex-nowrap">
                {children}
                {children}
            </div>
            <div className="absolute z-10 top-0 right-0 h-full w-1/12 bg-gradient-to-l from-background to-transparent"></div>
        </div>
    )
}
```

## Smooth Scroll (Lenis)

Using the Lenis library to activate smooth scrolling on the page. This is an easy solution to achieve a smooth scroll that just needs a one-liner.

```tsx
useEffect(() => {
  new Lenis({ autoRaf: true, duration: 1.2, });
}, [])
```

## Cursor Animation

To have a custom cursor following the mouse on the site, I created this `Cursor` component. It just used DOM event listeners `mouseenter`, `mouseleave` and `mousemove` to achieve a custom cursor by tracking the mouse. The actual cursor is simply a `fixed` positioned div, whose position is calculated and set using these event listeners. Note that the cursor needs to have a `pointer-events-none`  to make sure the cursor does not itself gets clicked.

```tsx
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
```

## Gradient Blops

Gradient Blops or simply HTML Blops are UI elements that incorporate gradients and blur to create glow effects on the page. 

Here, I have created a `Blop` component to achieve this. This component takes a array of `CSSProperties`  which can be mapped to the blops to be created. Each blop formed has some default styles which are overridden by the CSSProperties.

```tsx
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
```

To use the `Blop`  component, the `elements` array needs to be passed as follows. The array with generally incude a `background`  of solid color or any kind of gradient, be it `linear`, `radial` , or `conic` as in this case. Other properties like `borderRadius` and blur can also be overridden.

```tsx
<Blop elements={[
  { background: "conic-gradient(from 0deg at 50% 50%, #ff0000 0deg, hsl(354, 100%, 50%) 54deg, #00a6ff 106deg, #4797ff 162deg, #04f 252deg, #ff8000 306deg, hsl(0, 100%, 50%) 360deg)", width: "25em", height: "25em", borderRadius: "50%", filter: "blur(70px)"},
  { background: "conic-gradient(from 0deg at 50% 50%, #ffd9ad 0deg, #139ce5 180deg, #fd864d 360deg)", width: "18em", height: "18em", borderRadius: "50%", filter: "blur(32px)"},
]}/>
```

## Parallax Scroll

A Parallax Scroll is an effect created when different elements of a page move at different speeds, leading to a feeling of depth and three-dimensions. 

To achieve this effect, I used GSAP’s `ScrollTrigger` functionality, which has a property `scrub` which allows to animate elements on a page based on the scroll behaviour. Note that we need to register the ScrollTrigger as a plugin before we can use it on our page.

```tsx
gsap.registerPlugin(ScrollTrigger) 

gsap.timeline({
  scrollTrigger: {
    trigger: containerRef.current,
    start: "top top",
    end: "bottom top",
    scrub: 1,
  }
}).to(elementRef.current, {
  y: -100 // Speed
}).to(...)
```