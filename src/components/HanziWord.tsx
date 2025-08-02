'use client';

import { useState, useCallback } from 'react';
import Hanzi from './Hanzi';

interface HanziWordProps {
  word: string;
  animate?: boolean;
  quiz?: boolean;
  onAnimationComplete?: () => void;
  onQuizComplete?: () => void;
  size?: number;
}

export default function HanziWord({ 
  word, 
  animate = false, 
  quiz = false, 
  onAnimationComplete,
  onQuizComplete,
  size = 100 
}: HanziWordProps) {
  const [currentAnimating, setCurrentAnimating] = useState(0);
  const [currentQuiz, setCurrentQuiz] = useState(0);

  const handleAnimateCharComplete = useCallback((index: number) => {
    if (index === word.length - 1) {
      onAnimationComplete?.();
      setCurrentAnimating(0);
    } else {
      setCurrentAnimating(index + 1);
    }
  }, [word.length, onAnimationComplete]);

  const handleQuizCharComplete = useCallback((index: number) => {
    if (index === word.length - 1) {
      onQuizComplete?.();
      setCurrentQuiz(0);
    } else {
      setCurrentQuiz(index + 1);
    }
  }, [word.length, onQuizComplete]);

  return (
    <div className="hanzi-container">
      <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '8px' }}>
        {word.split('').map((char, index) => (
          <Hanzi
            key={`${char}-${index}`}
            character={char}
            animate={animate && index === currentAnimating}
            quiz={quiz && index === currentQuiz}
            onAnimationComplete={() => handleAnimateCharComplete(index)}
            onQuizComplete={() => handleQuizCharComplete(index)}
            size={size}
          />
        ))}
      </div>
    </div>
  );
}
