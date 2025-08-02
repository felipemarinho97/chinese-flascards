'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { Layout, Card, Tag, Tabs, Typography, Divider, Space, Spin } from 'antd';
import { HomeOutlined } from '@ant-design/icons';
import NextLink from 'next/link';
import CardFront from '@/components/CardFront';
import Sentences from '@/components/Sentences';
import UsefulLinks from '@/components/UsefulLinks';
import { getWordByCharacter, type WordData } from '@/lib/words';

import TraductibleSentence from '@/components/TraductibleSentence';

const { Content, Footer } = Layout;
const { Title, Text, Link } = Typography;

function PronunciationTab({ 
  pinyin, 
  definitions 
}: { 
  pinyin: string; 
  definitions: string[] 
}) {
  return (
    <div>
      <div style={{ marginBottom: 16 }}>
        <Text className="pronunciation-text" style={{ fontSize: '1.2em' }}>
          {pinyin}
        </Text>
      </div>
      {definitions.map((definition, i) => (
        <TraductibleSentence 
          key={i} 
          sentence={definition} 
          index={i + 1} 
        />
      ))}
    </div>
  );
}

export default function WordPage() {
  const params = useParams();
  const word = params?.word as string;
  const [wordData, setWordData] = useState<WordData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!word) {
      setError('No word specified');
      setLoading(false);
      return;
    }

    const fetchWordData = async () => {
      try {
        const decodedWord = decodeURIComponent(word);
        const data = await getWordByCharacter(decodedWord);
        
        if (!data) {
          setError('Word not found');
        } else {
          setWordData(data);
        }
      } catch (err) {
        setError('Error loading word data');
        console.error('Error:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchWordData();
  }, [word]);

  if (loading) {
    return (
      <Layout style={{ minHeight: '100vh', background: '#f5f5f5' }}>
        <Content style={{ 
          display: 'flex', 
          justifyContent: 'center', 
          alignItems: 'center',
          minHeight: '100vh'
        }}>
          <Spin size="large" />
        </Content>
      </Layout>
    );
  }

  if (error || !wordData) {
    return (
      <Layout style={{ minHeight: '100vh', background: '#f5f5f5' }}>
        <Content className="content-wrapper">
          <Card style={{ textAlign: 'center', maxWidth: 500, margin: '0 auto', marginTop: 100 }}>
            <Title level={3} type="danger">
              {error || 'Word not found'}
            </Title>
            <Link href="/">
              <Text>← Back to Home</Text>
            </Link>
          </Card>
        </Content>
      </Layout>
    );
  }

  const { simplified, rank, hsk, entries } = wordData;

  const tabItems = entries.map((entry, index) => ({
    key: index.toString(),
    label: entry.pinyin,
    children: (
      <PronunciationTab 
        pinyin={entry.pinyin} 
        definitions={entry.definitions} 
      />
    ),
  }));

  return (
    <Layout style={{ minHeight: '100vh', background: '#f5f5f5' }}>
      <Content className="content-wrapper">
        <div style={{ marginBottom: 24 }}>
          <Link href="/">
            <Space>
              <HomeOutlined />
              <Text>Back to Generator</Text>
            </Space>
          </Link>
        </div>

        <div style={{ maxWidth: 800, margin: '0 auto' }}>
          <CardFront 
            word={simplified}
            rank={rank}
            hsk={hsk}
          />

          <Card 
            style={{ 
              marginTop: 24,
              borderRadius: 16,
              boxShadow: '0 4px 16px rgba(0, 0, 0, 0.1)'
            }}
            title={
              <Space>
                <Title level={4} style={{ margin: 0 }}>
                  Definitions & Pronunciations
                </Title>
                {rank && (
                  <Tag color="blue">
                    Frequency Rank: #{rank.toLocaleString()}
                  </Tag>
                )}
                {hsk && hsk > 0 && (
                  <Tag color="red">
                    HSK Level {hsk}
                  </Tag>
                )}
              </Space>
            }
          >
            <Tabs
              items={tabItems}
              size="large"
              style={{ minHeight: 200 }}
            />
            
            <div style={{ marginTop: 24 }}>
              <Sentences word={simplified} />
            </div>
            
            <div style={{ marginTop: 24 }}>
              <UsefulLinks word={simplified} />
            </div>
          </Card>
        </div>
      </Content>

      <Footer style={{ textAlign: 'center', background: '#f5f5f5' }}>
        <Divider />
        <Text>Desenvolvido com ❤️ por </Text>
        <Link href="https://github.com/felipemarinho97" target="_blank">
          Felipe Marinho
        </Link>
      </Footer>
    </Layout>
  );
}
