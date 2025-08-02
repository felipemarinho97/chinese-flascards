'use client';

import { useState, useEffect } from 'react';
import { Space, Typography, Spin } from 'antd';

const { Text, Title, Link } = Typography;

interface UsefulLinksProps {
  word: string;
}

interface Links {
  [key: string]: string;
}

export default function UsefulLinks({ word }: UsefulLinksProps) {
  const [links, setLinks] = useState<Links>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLinks = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          `https://pinyin-word-api.vercel.app/api/links/${encodeURIComponent(word)}`
        );
        const data = await response.json();
        setLinks(data);
      } catch (error) {
        console.error('Error fetching links:', error);
        // Retry logic as in original
        setTimeout(() => fetchLinks(), 2000);
      } finally {
        setLoading(false);
      }
    };

    if (word) {
      fetchLinks();
    }
  }, [word]);

  if (loading) {
    return (
      <>
        <Title level={4}>Useful Links</Title>
        <div style={{ textAlign: "center" }}>
          <Spin />
        </div>
      </>
    );
  }

  return (
    <>
      <Title level={4}>Useful Links</Title>
      <Space direction="vertical">
        {Object.entries(links).map(([name, url]) => (
          <Link key={name} target="_blank" href={url}>
            {name}
          </Link>
        ))}
      </Space>
    </>
  );
}
