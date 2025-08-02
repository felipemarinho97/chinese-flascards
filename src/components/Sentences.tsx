'use client';

import { useState, useEffect } from 'react';
import { List, Typography, Tag, Space, Button } from 'antd';
import { SoundOutlined } from '@ant-design/icons';

const { Text, Title } = Typography;

interface SentenceItem {
  hanzi: string;
  pinyin: string;
  translation: string;
  level: string;
  audio?: string;
}

interface SentencesProps {
  word: string;
}

const PlayButton = ({ audioUrl }: { audioUrl?: string }) => {
  if (!audioUrl) return null;

  const handlePlay = () => {
    try {
      const audio = new Audio(audioUrl);
      audio.play();
    } catch (error) {
      console.error('Error playing audio:', error);
    }
  };

  return (
    <Button
      type="primary"
      shape="circle"
      size="middle"
      icon={<SoundOutlined />}
      onClick={handlePlay}
    />
  );
};

function getLevelColor(level: string): string {
  switch (level) {
    case "Newbie":
      return "cyan";
    case "Elementary":
      return "blue";
    case "Intermediate":
      return "gold";
    case "Pre-Intermediate":
      return "purple";
    case "Upper-Intermediate":
      return "orange";
    case "Advanced":
      return "red";
    default:
      return "default";
  }
}

export default function Sentences({ word }: SentencesProps) {
  const [sentences, setSentences] = useState<SentenceItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchSentences = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(
          `https://pinyin-word-api.vercel.app/api/sentences/${encodeURIComponent(word)}`
        );
        const data = await response.json();
        
        // Sort by hanzi length as in the original
        const sortedSentences = data.sort((a: SentenceItem, b: SentenceItem) => 
          a.hanzi.length - b.hanzi.length
        );
        
        setSentences(sortedSentences);
      } catch (error) {
        console.error('Error fetching sentences:', error);
      } finally {
        setIsLoading(false);
      }
    };

    if (word) {
      fetchSentences();
    }
  }, [word]);

  const getAudioLink = (item: SentenceItem): string | undefined => {
    return item.audio 
      ? `/api/audio/${encodeURIComponent(item.audio)}`
      : undefined;
  };

  return (
    <div>
      <Title level={4}>Sentences</Title>
      <List
        pagination={{ pageSize: 6 }}
        loading={isLoading}
        dataSource={sentences}
        renderItem={(item) => (
          <List.Item
            actions={[<PlayButton audioUrl={getAudioLink(item)} />]}
          >
            <Space direction="vertical">
              <Text style={{ fontSize: "large" }}>{item.hanzi}</Text>
              <Text type="success">{item.pinyin}</Text>
              <Text type="secondary">{item.translation}</Text>
              <List.Item.Meta
                description={
                  <Tag color={getLevelColor(item.level)}>{item.level}</Tag>
                }
              />
            </Space>
          </List.Item>
        )}
      />
    </div>
  );
}
