import { FC, useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useDelayHover } from 'shared/lib/hooks/useDelayHover';
import { ANIMATION_DURATION } from 'shared/consts/animate';
import styles from './Title.module.css';
export interface TitleProps {
  children: React.ReactNode;
  text: string;
}

type ObjStyles = {
  top?: number | string;
  right?: number | string;
  left?: number | string;
  marginRight?: string;
  marginLeft?: string;
};

export const Title: FC<TitleProps> = ({ children, text }) => {
  const { isShow, onMouseEnter, onMouseLeave, onMouseMove } = useDelayHover(false, 200);
  const [objStyles, setObjStyles] = useState<ObjStyles>({});
  const titleRef = useRef<HTMLDivElement | null>(null);
  const titleTextRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const $title = titleRef.current;
    const $text = titleTextRef.current;
    if (!$title || !$text) return;

    const bodyRect = document.body.getBoundingClientRect();
    const titleRect = $title.getBoundingClientRect();
    const textRect = $text.getBoundingClientRect();
    const objStyles: ObjStyles = {};
    const TEXT_MARGIN = 8;

    objStyles.top = objStyles.top = titleRect.height + TEXT_MARGIN;

    const isRight = () => $title.offsetLeft + textRect.width / 2 > bodyRect.width;
    const isLeft = () => textRect.width / 2 > $title.offsetLeft;
    const isTop = () => $title.offsetTop + titleRect.height + textRect.height > bodyRect.height;

    if (isRight()) {
      objStyles.right = 0;
      objStyles.left = 'initial';
    }

    if (isLeft()) {
      objStyles.left = 0;
      objStyles.right = 'initial';
    }

    if (isTop()) {
      objStyles.top = -textRect.height - TEXT_MARGIN;
    }

    if (!isRight() && !isLeft()) {
      objStyles.left = titleRect.width / 2 - textRect.width / 2;
    }

    setObjStyles(objStyles);
  }, [isShow]);

  return (
    <div
      ref={titleRef}
      onMouseEnter={onMouseEnter}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      className={styles.title}
    >
      {children}

      <AnimatePresence>
        {isShow && (
          <motion.div
            style={objStyles}
            ref={titleTextRef}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: ANIMATION_DURATION }}
            className={styles.title_text}
          >
            {text}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
