'use client';
import Image from 'next/image';
import Button from './button';
import ImpactPhrase from './impactPrhare';
import TypingEffect from './typingEffect';
import { useEffect, useState } from 'react';
import { AnimationSequence, useAnimate } from 'framer-motion';
import useHomeAnimation from '@/hooks/useHomeAnimation';
import { motion } from 'framer-motion';

const HomePage: React.FC<{ srcImage: string; impact_phrase: string }> = ({
  srcImage,
  impact_phrase,
}) => {
  const [impactComplete, setImpactComplete] = useState(true);

  // const scope = useHomeAnimation(true);

  const handleAnimationComplete = () => {
    setTimeout(() => {
      setImpactComplete(true);
    }, 2500);
  };

  return (
    <motion.div
      className="col-start-2 col-end-6"
      // ref={scope}
    >
      <ImpactPhrase
        prase={impact_phrase}
        handlePhraseComplete={handleAnimationComplete}
      />

      <motion.div className="home-page__container flex grow justify-between items-center h-[37.5rem] w-full">
        <motion.div>
          <motion.div className="min-h-[55px] ">
            <TypingEffect
              textCss="text-white text-2xl font-bold "
              text={'Implementações Full Stack para decolar seu projeto'}
              cursor={true}
            />
          </motion.div>
          <motion.div className="flex flex-col items-start justify-between h-[224px] mt-16">
            <Button className="home-page__button-recrutier">
              Tech Recrutier
            </Button>
            <Button className="home-page__button-freela">Quero Freela</Button>
            <Button className="home-page__button-curious">Sou Curioso</Button>
          </motion.div>
        </motion.div>
        <Image
          className="home-page__image col-start-4"
          src={srcImage}
          alt="Imagem"
          width={470}
          height={470}
        />
      </motion.div>
    </motion.div>
  );
};

export default HomePage;
