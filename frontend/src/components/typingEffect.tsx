'use client';

import { animate, useMotionValue, useTransform, motion } from 'framer-motion';
import { useState, useEffect } from 'react';

const TypingEffect: React.FC<{
  delay?: number;
  text: string;
  style?: React.CSSProperties;
  className?: string;
  handleAnimationComplete?: () => void;
}> = ({ text, style, className, handleAnimationComplete, delay }) => {
  const count = useMotionValue(0);

  const rounded = useTransform(count, (latest) => Math.round(latest));

  const displayText = useTransform(rounded, (latest) => text.slice(0, latest));

  const [animationCompleted, setAnimationCompleted] = useState(false);

  useEffect(() => {
    const controls = animate(count, text.length, {
      type: 'tween',
      ease: 'easeInOut',
      duration: 1.5,
      delay,
      onUpdate: (latest) => {
        setAnimationCompleted(true);
      },
      onComplete: () => {
        if (handleAnimationComplete) {
          handleAnimationComplete();
        }
      },
    });

    return controls.stop;
  }, []);

  return (
    <>
      <motion.span
        className={`${className} ${animationCompleted ? 'animation-completed' : ''}text-4xl font-bold text-black`}
        style={{ ...style }}
      >
        {displayText}
      </motion.span>
      <motion.span
        animate={{ opacity: 0 }}
        className="text-white"
        transition={{
          repeat: Infinity,
          duration: 0.5,
        }}
      >
        |
      </motion.span>
    </>
  );
};

export default TypingEffect;
