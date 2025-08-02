import type { Metadata } from 'next';
import { AntdRegistry } from '@ant-design/nextjs-registry';
import { ConfigProvider } from 'antd';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Chinese Flashcards',
  description: 'Learn Chinese with interactive flashcards and HSK vocabulary',
};

const theme = {
  token: {
    colorPrimary: '#d4544a',
    colorSuccess: '#52c41a',
    colorWarning: '#faad14',
    colorError: '#ff4d4f',
    colorInfo: '#1677ff',
    borderRadius: 8,
    wireframe: false,
  },
  components: {
    Layout: {
      headerBg: '#ffffff',
      bodyBg: '#f5f5f5',
    },
    Card: {
      borderRadiusLG: 12,
    },
    Button: {
      borderRadius: 8,
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AntdRegistry>
          <ConfigProvider theme={theme}>
            {children}
          </ConfigProvider>
        </AntdRegistry>
      </body>
    </html>
  );
}
