import { AnimationSequence, useAnimate } from 'framer-motion';
import { useEffect } from 'react';

export default function useHomeAnimation(isEnter: boolean) {
  const [scope, animate] = useAnimate();

  useEffect(() => {
    const animations: AnimationSequence = isEnter
      ? [
          [
            '.home-page__container',
            { width: '800px', height: '400px', scale: 1, opacity: 1 },
            {
              ease: 'easeInOut',
              duration: 1,
              type: 'spring',
              stiffness: 100,
              delay: 6,
            },
          ],
          [
            '.home-page__image',
            {
              opacity: 1,
              scale: 1,
            },
            {
              ease: 'easeInOut',
              duration: 1,
              type: 'spring',
              stiffness: 100,
            },
          ],
          [
            '.home-page__button-recrutier',
            {
              width: '100%',
              height: '60px',
              opacity: 1,
            },
            {
              ease: 'easeInOut',
            },
          ],
          [
            '.home-page__button-freela',
            {
              width: '100%',
              height: '60px',
              opacity: 1,
            },
            {
              ease: 'easeInOut',
            },
          ],
          [
            '.home-page__button-curious',
            {
              width: '100%',
              height: '60px',
              opacity: 1,
            },
            {
              ease: 'easeInOut',
            },
          ],
        ]
      : [
          [
            '.home-page__image',
            {
              opacity: 1,
              scale: 1,
            },
            { ease: 'easeInOut', duration: 1 },
          ],
        ];

    animate(animations);
  }, [isEnter]);
  return scope;
}
