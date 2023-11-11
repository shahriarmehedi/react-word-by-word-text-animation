import { motion, useInView, useAnimation, Variant } from "framer-motion";
import { useEffect, useRef } from "react";


const defaultAnimations = {
    hidden: {
        opacity: 0,
        x: 0,
    },
    visible: {
        opacity: 1,
        x: 0,
        transition: {
            duration: 0.4,
        },
    },
};


export const AnimatedText = ({
    text,
    el: Wrapper = "p",
    className,
    once,
    repeatDelay,
    delay,
    animation = defaultAnimations,
}) => {
    const controls = useAnimation();
    const textArray = Array.isArray(text) ? text : [text];
    const ref = useRef(null);
    const isInView = useInView(ref, { amount: 0.5 });

    useEffect(() => {
        let timeout;
        const show = () => {
            // show after delay (if any)
            setTimeout(() => {
                controls.start("visible");
            }, delay);
            if (repeatDelay) {
                timeout = setTimeout(async () => {
                    await controls.start("hidden");
                    controls.start("visible");
                }, repeatDelay);
            }
        };

        if (isInView) {
            show();
        } else {
            controls.start("hidden");
        }

        return () => clearTimeout(timeout);
    }, [isInView]);

    return (
        <Wrapper className={className}>
            <span className="sr-only">{textArray.join(" ")}</span>
            <motion.span
                ref={ref}
                initial="hidden"
                animate={controls}
                variants={{
                    visible: { transition: { staggerChildren: 0.3 }, once },
                    hidden: {},
                }}
                aria-hidden
            >
                {textArray.map((line, lineIndex) => (
                    <span className="block" key={`${line}-${lineIndex}`}>
                        {line.split(" ").map((word, wordIndex) => (
                            <motion.span
                                className="inline-block"
                                key={`${word}-${wordIndex}`}
                                variants={animation}
                            >
                                {/* {word.split("").map((char, charIndex) => (
                    <motion.span
                      key={`${char}-${charIndex}`}
                      className="inline-block"
                      variants={animation}
                    >
                      {char}
                    </motion.span>
                  ))} */}
                                {word}
                                <span className="inline-block">&nbsp;</span>
                            </motion.span>
                        ))}
                    </span>
                ))}
            </motion.span>
        </Wrapper>
    );
};