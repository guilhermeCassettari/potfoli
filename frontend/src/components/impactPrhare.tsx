'use client';
import { motion, Variants } from 'framer-motion';
import { useState } from 'react';
import TypingEffect from './typingEffect';

const container: Variants = {
  hidden: {
    height: '0%',
    display: 'none',
    transition: {
      when: 'afterChildren',
      staggerDirection: -1,
      staggerChildren: 0.3,
      ease: 'easeInOut',
    },
  },
  show: {
    display: 'block',
    height: '100%',
    transition: { duration: 0.3, staggerChildren: 0.3, ease: 'easeInOut' },
  },
};

const item: Variants = {
  hidden: {
    height: '0%',
  },
  show: { height: '100%' },
};

const ImpactPhrase: React.FC<{
  prase: string;
  handlePhraseComplete?: () => void;
}> = ({ prase, handlePhraseComplete }) => {
  const [isHidden, setIsHidden] = useState(false);
  const [showPrase, setShowPrase] = useState(false);

  const handleAnimationComplete = () => {
    setIsHidden(true);
    setShowPrase(false);

    if (handlePhraseComplete) {
      handlePhraseComplete();
    }
  };

  const handleShowPrhase = () => {
    setShowPrase(!showPrase);
  };

  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate={isHidden ? 'hidden' : 'show'}
      className="h-full w-full bg-white absolute top-0 right-0 z-10"
    >
      <motion.div variants={item} className="absolute w-full bg-black" />
      <motion.div variants={item} className="absolute w-full bg-white" />
      <motion.div variants={item} className="absolute w-full bg-black" />
      <motion.div variants={item} className="absolute w-full bg-white" />
      <motion.div variants={item} className="absolute w-full bg-black" />
      <motion.div
        variants={item}
        className="absolute w-full bg-white"
        onAnimationComplete={handleShowPrhase}
      />
      <motion.div
        variants={{
          hidden: {
            display: 'none',
          },
          show: {
            display: 'block',
          },
        }}
        transition={{ duration: 0 }}
        className="h-full absolute"
        onAnimationComplete={handleShowPrhase}
      />
      {showPrase ? (
        <TypingEffect
          text={prase}
          style={{
            zIndex: 100,
            position: 'relative',
          }}
          handleAnimationComplete={handleAnimationComplete}
        />
      ) : null}
    </motion.div>
  );
};

export default ImpactPhrase;
