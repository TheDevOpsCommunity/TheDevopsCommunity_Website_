"use client";
import { useEffect } from "react";
import { motion, stagger, useAnimate } from "motion/react";
import { cn } from "@/lib/utils";

export const TextGenerateEffect = ({
  words,
  className,
  filter = true,
  duration = 0.5,
  onComplete,
}: {
  words: string;
  className?: string;
  filter?: boolean;
  duration?: number;
  onComplete?: () => void;
}) => {
  const [scope, animate] = useAnimate();
  const wordsArray = words.split(" ");
  useEffect(() => {
    animate(
      "span",
      {
        opacity: 1,
        filter: filter ? "blur(0px)" : "none",
      },
      {
        duration: duration ? duration : 1,
        delay: stagger(0.2),
        onComplete: () => {
          if (onComplete) onComplete();
        },
      }
    );
  }, [animate, duration, filter, onComplete]);

  const renderWords = () => {
    return (
      <motion.div ref={scope} className={cn("inline-block", className)}>
        {wordsArray.map((word, idx) => {
          return (
            <motion.span
              key={word + idx}
              className="inline-block opacity-0"
              style={{
                filter: filter ? "blur(10px)" : "none",
              }}
            >
              {word}
              {idx < wordsArray.length - 1 && <span className="inline-block w-2" />}
            </motion.span>
          );
        })}
      </motion.div>
    );
  };

  return renderWords();
};
