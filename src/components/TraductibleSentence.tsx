'use client';

import { useState, useEffect } from 'react';
import { Button, Typography } from 'antd';
import { TranslationOutlined } from '@ant-design/icons';

const { Text } = Typography;

interface TraductibleSentenceProps {
  sentence: string;
  index: number;
}

export default function TraductibleSentence({ sentence, index }: TraductibleSentenceProps) {
  const [translation, setTranslation] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleTranslate = async () => {
    if (translation) {
      // If already translated, show/hide translation
      setTranslation(null);
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch(
        `https://gtranslate-api.vercel.app/api/translate?text=${encodeURIComponent(
          sentence
        )}&to=en`
      );
      const data = await response.json();
      setTranslation(data[0] || 'Translation not available');
    } catch (error) {
      console.error('Error translating:', error);
      setTranslation('Translation failed');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="traductible-sentence" style={{ marginBottom: 12 }}>
      <div style={{ display: 'flex', alignItems: 'flex-start', gap: 8 }}>
        <Text strong>{index}.</Text>
        <div style={{ flex: 1 }}>
          <div 
            className="definition-text" 
            onClick={handleTranslate}
            style={{ cursor: 'pointer' }}
          >
            <Text>{sentence}</Text>
          </div>
          {translation && (
            <div style={{ marginTop: 4 }}>
              <Text type="secondary">{translation}</Text>
            </div>
          )}
        </div>
        <Button
          type="primary"
          shape="circle"
          size="small"
          icon={<TranslationOutlined />}
          onClick={handleTranslate}
          loading={isLoading}
          title="Translate"
        />
      </div>
    </div>
  );
}
