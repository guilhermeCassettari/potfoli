'use client';
import Image from 'next/image';
import Button from './button';
import ImpactPhrase from './impactPrhare';
import TypingEffect from './typingEffect';
import { useEffect, useState } from 'react';
import { AnimationSequence, useAnimate } from 'framer-motion';
import useHomeAnimation from '@/hooks/useHomeAnimation';

const HomePage: React.FC<{ srcImage: string; impact_phrase: string }> = ({
  srcImage,
  impact_phrase,
}) => {
  const [impactComplete, setImpactComplete] = useState(false);

  const scope = useHomeAnimation(true);

  const handleAnimationComplete = () => {
    setTimeout(() => {
      setImpactComplete(true);
    }, 2500);
  };

  return (
    <div ref={scope}>
      <ImpactPhrase
        prase={impact_phrase}
        handlePhraseComplete={handleAnimationComplete}
      />

      <div
        className="home-page__container flex grow justify-between items-center border-white border-2 rounded-lg p-5"
        style={{ width: '0px', height: '0px', opacity: '0' }}
      >
        <div>
          <TypingEffect
            delay={6}
            className="text-white text-xl"
            text={'<Guilherme Cassettari Developer />'}
          />
          <div className="flex flex-col items-center  justify-center gap-4">
            <Button
              style={{
                width: '0px',
                height: '0px',
                border: '0px',
                opacity: '0',
              }}
              className="home-page__button-recrutier"
            >
              Sou Recrutador
            </Button>
            <Button
              className="home-page__button-freela"
              style={{
                // width: '0px',
                // height: '0px',
                border: '0px',
                opacity: '0',
              }}
            >
              Quero Freela
            </Button>
            <Button
              className="home-page__button-curious"
              style={{
                // width: '0px',
                // height: '0px',
                border: '0px',
                opacity: '0',
              }}
            >
              Sou Curioso
            </Button>
          </div>
        </div>
        <Image
          className="home-page__image opacity-0 scale-0"
          src={srcImage}
          alt="Imagem"
          width={300}
          height={300}
        />
      </div>
    </div>
  );
};

export default HomePage;
