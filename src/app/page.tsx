'use client';

import { useState } from 'react';
import { 
  Button, 
  Card, 
  Checkbox, 
  Form, 
  Input, 
  InputNumber, 
  Select, 
  Layout, 
  Typography, 
  Divider,
  Space
} from 'antd';
import { DownloadOutlined } from '@ant-design/icons';
import { languages, HSK_LEVELS, DEFAULT_FILTER_STATE } from '@/lib/constants';
import { generateQuery, type FilterParams } from '@/lib/words';

const { Title, Text, Link } = Typography;
const { Content, Footer } = Layout;

export default function Home() {
  const [filterState, setFilterState] = useState<FilterParams>(DEFAULT_FILTER_STATE);
  const [form] = Form.useForm();

  const handleFrequencyFilterChange = (checked: boolean) => {
    setFilterState(prev => ({ ...prev, filter: checked }));
  };

  const handleHSKChange = (values: number[]) => {
    setFilterState(prev => ({ ...prev, hsk: values }));
  };

  const handleTargetLanguageChange = (value: string) => {
    setFilterState(prev => ({ ...prev, target: value }));
  };

  const handleRangeChange = (field: 'higher' | 'smaller', value: number | null) => {
    if (value !== null) {
      setFilterState(prev => ({ ...prev, [field]: value }));
    }
  };

  const handleDownload = () => {
    const query = generateQuery(filterState);
    const url = `https://anki-deck-generator.felipemarinho.vercel.app/api/deck${query}`;
    window.open(url, '_blank');
  };

  const renderLanguageOptions = () => {
    return Object.entries(languages).map(([code, name]) => (
      <Select.Option key={code} value={code}>
        {name}
      </Select.Option>
    ));
  };

  return (
    <Layout className="main-container">
      <Content className="content-wrapper">
        <Card 
          style={{ 
            maxWidth: 800, 
            margin: '0 auto',
            borderRadius: 16,
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.12)'
          }}
        >
          <div style={{ textAlign: 'center', marginBottom: 32 }}>
            <Title level={1} style={{ color: '#d4544a', marginBottom: 8 }}>
              Chinese Flashcards Generator
            </Title>
            <Text type="secondary" style={{ fontSize: '1.1em' }}>
              Create customized Anki decks for Chinese vocabulary learning
            </Text>
          </div>

          <Form
            form={form}
            layout="vertical"
            size="large"
          >
            <Form.Item
              label={
                <Space>
                  <Checkbox
                    checked={filterState.filter}
                    onChange={(e) => handleFrequencyFilterChange(e.target.checked)}
                  />
                  <span>Frequency Filter</span>
                </Space>
              }
            >
              <Space.Compact style={{ width: '100%' }}>
                <Input
                  addonBefore="From"
                  style={{ width: '50%' }}
                  placeholder="0"
                  disabled
                />
                <InputNumber
                  disabled={!filterState.filter}
                  min={0}
                  defaultValue={filterState.higher}
                  placeholder="Greater than"
                  onChange={(value) => handleRangeChange('higher', value)}
                  style={{ width: '25%' }}
                />
                <Input
                  addonBefore="to"
                  style={{ width: '25%' }}
                  placeholder="25000"
                  disabled
                />
                <InputNumber
                  disabled={!filterState.filter}
                  min={1}
                  defaultValue={filterState.smaller}
                  placeholder="Smaller than"
                  onChange={(value) => handleRangeChange('smaller', value)}
                  style={{ width: '25%' }}
                />
              </Space.Compact>
              <div style={{ marginTop: 8 }}>
                <Text type="secondary" style={{ fontSize: 'small' }}>
                  1.6Mi+ most frequent words
                </Text>
              </div>
            </Form.Item>

            <Form.Item label="Word sets to include">
              <Checkbox.Group
                options={HSK_LEVELS}
                defaultValue={[1]}
                onChange={handleHSKChange}
              />
              <div style={{ marginTop: 8 }}>
                <Text type="secondary" style={{ fontSize: 'small' }}>
                  (*) Due to huge dataset, checking Non-HSK without "Frequency filter" enabled could cause problems.
                </Text>
              </div>
            </Form.Item>

            <Form.Item label="Translation Language">
              <Select
                defaultValue="none"
                onChange={handleTargetLanguageChange}
                placeholder="Select a language"
              >
                <Select.Option value="none">None</Select.Option>
                {renderLanguageOptions()}
              </Select>
            </Form.Item>

            <Form.Item>
              <Button
                type="primary"
                size="large"
                icon={<DownloadOutlined />}
                onClick={handleDownload}
                block
                style={{ 
                  height: 48,
                  borderRadius: 8,
                  fontSize: '1.1em',
                  fontWeight: 600
                }}
              >
                Download Anki Deck
              </Button>
            </Form.Item>
          </Form>
        </Card>
      </Content>

      <Footer style={{ textAlign: 'center', background: 'transparent', color: 'white' }}>
        <form
          action="https://www.paypal.com/donate"
          method="post"
          target="_top"
          style={{ marginBottom: 16 }}
        >
          <input type="hidden" name="cmd" value="_donations" />
          <input type="hidden" name="business" value="EWUJPGYC5LKVG" />
          <input
            type="hidden"
            name="item_name"
            value="Support the application development"
          />
          <input type="hidden" name="currency_code" value="BRL" />
          <input
            type="image"
            src="https://www.paypalobjects.com/en_US/i/btn/btn_donateCC_LG.gif"
            name="submit"
            title="PayPal - The safer, easier way to pay online!"
            alt="Donate with PayPal button"
            style={{ border: 0 }}
          />
        </form>
        
        <Divider style={{ borderColor: 'rgba(255, 255, 255, 0.3)' }} />
        
        <Text style={{ color: 'white' }}>
          Developed with ❤️ by{' '}
          <Link 
            href="https://github.com/felipemarinho97" 
            target="_blank"
            style={{ color: '#ffd700' }}
          >
            Felipe Marinho
          </Link>
        </Text>
      </Footer>
    </Layout>
  );
}
