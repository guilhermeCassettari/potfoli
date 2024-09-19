'use client';

import { animate, useMotionValue, useTransform, motion } from 'framer-motion';
import { useState, useEffect } from 'react';

const TypingEffect: React.FC<{
  delay?: number;
  text: string;
  containerCss?: string;
  textCss?: string;
  style?: React.CSSProperties;
  cursor?: boolean;
  handleAnimationComplete?: () => void;
}> = ({
  text,
  style,
  textCss,
  containerCss,
  handleAnimationComplete,
  cursor = false,
  delay,
}) => {
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
    <div className={`${containerCss}`}>
      <motion.span className={`${textCss}`} style={{ ...style }}>
        {displayText}
      </motion.span>
      {cursor && (
        <motion.span
          animate={{ opacity: 0 }}
          className={`${textCss}`}
          transition={{
            repeat: Infinity,
            duration: 0.5,
          }}
        >
          {' |'}
        </motion.span>
      )}
    </div>
  );
};

export default TypingEffect;
