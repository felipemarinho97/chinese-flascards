'use client';

import { useState, useRef } from 'react';
import { Button, Card, Badge, Space } from 'antd';
import { EyeOutlined, EditOutlined, SoundOutlined } from '@ant-design/icons';
import HanziWord from './HanziWord';

interface CardFrontProps {
  word: string;
  rank?: number;
  hsk?: number;
}

export default function CardFront({ word, rank, hsk }: CardFrontProps) {
  const [animate, setAnimate] = useState(false);
  const [quiz, setQuiz] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  const handleAnimationComplete = () => {
    setAnimate(false);
  };

  const handleQuizComplete = () => {
    setQuiz(false);
  };

  const handleAnimate = () => {
    setAnimate(true);
    setQuiz(false);
  };

  const handleQuiz = () => {
    setQuiz(true);
    setAnimate(false);
  };

  const handlePlayAudio = async () => {
    if (isPlaying) return;
    
    setIsPlaying(true);
    try {
      const audioUrl = `https://pinyin-word-api.vercel.app/api/audio/pod/${encodeURIComponent(word)}`;
      
      if (audioRef.current) {
        audioRef.current.src = audioUrl;
        await audioRef.current.play();
      }
    } catch (error) {
      console.error('Error playing audio:', error);
    } finally {
      setIsPlaying(false);
    }
  };

  return (
    <Card 
      className="word-card"
      title={
        <Space>
          <span style={{ fontSize: '1.5em', fontWeight: 'bold' }}>{word}</span>
          {rank && (
            <Badge 
              count={`#${rank}`} 
              className="frequency-badge"
              style={{ backgroundColor: '#667eea' }}
            />
          )}
          {hsk && hsk > 0 && (
            <Badge 
              count={`HSK ${hsk}`} 
              className="hsk-badge"
              style={{ backgroundColor: '#f5576c' }}
            />
          )}
        </Space>
      }
      extra={
        <Space>
          <Button
            type="primary"
            shape="circle"
            icon={<SoundOutlined />}
            onClick={handlePlayAudio}
            loading={isPlaying}
            className="card-action-button"
            title="Play pronunciation"
          />
          <Button
            type="primary"
            shape="circle"
            icon={<EyeOutlined />}
            onClick={handleAnimate}
            className="card-action-button"
            title="Animate strokes"
          />
          <Button
            type="primary"
            shape="circle"
            icon={<EditOutlined />}
            onClick={handleQuiz}
            className="card-action-button"
            title="Practice writing"
          />
        </Space>
      }
      style={{ minHeight: '300px' }}
    >
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center',
        minHeight: '200px',
        padding: '20px'
      }}>
        <HanziWord
          word={word}
          animate={animate}
          quiz={quiz}
          onAnimationComplete={handleAnimationComplete}
          onQuizComplete={handleQuizComplete}
          size={120}
        />
      </div>
      
      <audio 
        ref={audioRef}
        onEnded={() => setIsPlaying(false)}
        onError={() => setIsPlaying(false)}
      />
    </Card>
  );
}
