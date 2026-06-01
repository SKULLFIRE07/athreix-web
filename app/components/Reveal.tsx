"use client";

import { motion, type Variants } from "motion/react";
import { type ReactNode } from "react";

type Direction = "up" | "down" | "left" | "right" | "none";

const offsetFor = (d: Direction) => {
  switch (d) {
    case "up": return { y: 40, x: 0 };
    case "down": return { y: -40, x: 0 };
    case "left": return { y: 0, x: 40 };
    case "right": return { y: 0, x: -40 };
    default: return { y: 0, x: 0 };
  }
};

export default function Reveal({
  children,
  delay = 0,
  duration = 0.8,
  direction = "up",
  className = "",
  amount = 0.2,
  once = true,
}: {
  children: ReactNode;
  delay?: number;
  duration?: number;
  direction?: Direction;
  className?: string;
  amount?: number;
  once?: boolean;
}) {
  const off = offsetFor(direction);
  const variants: Variants = {
    hidden: { opacity: 0, ...off, filter: "blur(8px)" },
    visible: {
      opacity: 1,
      y: 0,
      x: 0,
      filter: "blur(0px)",
      transition: {
        duration,
        delay,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, amount }}
      variants={variants}
    >
      {children}
    </motion.div>
  );
}

import React from "react";

export function RevealWord({
  text,
  className = "",
  delay = 0,
}: {
  text: string;
  className?: string;
  delay?: number;
}) {
  const words = text.split(" ");
  return (
    <span className={`inline-flex flex-wrap ${className}`}>
      {words.map((w, i) => (
        <React.Fragment key={i}>
          <span className="inline-block overflow-hidden align-bottom">
            <motion.span
              className="inline-block"
              initial={{ y: "110%", opacity: 0 }}
              whileInView={{ y: "0%", opacity: 1 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{
                duration: 0.9,
                delay: delay + i * 0.08,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              {w}
            </motion.span>
          </span>
          {i < words.length - 1 ? <span className="inline-block w-[0.25em]">&nbsp;</span> : null}
        </React.Fragment>
      ))}
    </span>
  );
}
