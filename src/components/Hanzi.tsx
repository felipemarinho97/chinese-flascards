'use client';

import { useEffect, useRef } from 'react';
import HanziWriter from 'hanzi-writer';

interface HanziProps {
  character: string;
  animate?: boolean;
  quiz?: boolean;
  onAnimationComplete?: () => void;
  onQuizComplete?: () => void;
  size?: number;
}

export default function Hanzi({ 
  character, 
  animate = false, 
  quiz = false, 
  onAnimationComplete,
  onQuizComplete,
  size = 100 
}: HanziProps) {
  const writerRef = useRef<HanziWriter | null>(null);
  const targetRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!targetRef.current) return;

    // Clear previous writer
    if (writerRef.current) {
      writerRef.current = null;
    }

    // Clear the target element
    targetRef.current.innerHTML = '';

    try {
      writerRef.current = HanziWriter.create(targetRef.current, character, {
        width: size,
        height: size,
        padding: 5,
        strokeAnimationSpeed: 1,
        delayBetweenStrokes: 200,
        strokeColor: '#d4544a',
        radicalColor: '#f5576c',
        highlightColor: '#f093fb',
        outlineColor: '#e0e0e0',
        drawingColor: '#333',
        showCharacter: true,
        showOutline: true,
        showHintAfterMisses: 3,
      });
    } catch (error) {
      console.error('Error creating HanziWriter:', error);
    }

    return () => {
      if (writerRef.current) {
        writerRef.current = null;
      }
    };
  }, [character, size]);

  useEffect(() => {
    if (!writerRef.current) return;

    if (animate) {
      writerRef.current.animateCharacter({
        onComplete: () => {
          onAnimationComplete?.();
        }
      });
    }
  }, [animate, onAnimationComplete]);

  useEffect(() => {
    if (!writerRef.current) return;

    if (quiz) {
      writerRef.current.quiz({
        onComplete: () => {
          onQuizComplete?.();
        },
        onMistake: () => {
          // Optional: handle mistakes
        }
      });
    }
  }, [quiz, onQuizComplete]);

  return (
    <div 
      ref={targetRef} 
      className="hanzi-character"
      style={{ 
        width: size, 
        height: size,
        display: 'inline-block'
      }}
    />
  );
}
