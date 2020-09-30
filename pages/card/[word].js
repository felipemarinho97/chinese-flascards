import { Card, Layout, Tabs, Tag, Typography } from "antd";
import React from "react";
import { API_ROOT } from "../../components/constants";
import TraductibleSentence from "../../components/TraductibleSentence";
import Sentences from "../../components/Sentences";
import UsefulLinks from "../../components/UsefulLinks";
import CardFront from "../../components/CardFront";
import words from "../api/words.json";

const { Text, Link } = Typography;
const { Content, Footer } = Layout;
const { TabPane } = Tabs;

function renderTabPanes(entries) {
  const keys = Object.keys(entries);

  return keys.map((k, i) => {
    const entry = entries[k];

    return (
      <TabPane tab={entry.pinyinWithAccent} key={i}>
        {entry.definitions.map((d, i) => (
          <TraductibleSentence i={i + 1} sentence={d} />
        ))}
      </TabPane>
    );
  });
}

const Word = (props) => {
  const { simplified, frequencyRank, hsk, entries } = props.word;

  return (
    <Layout>
      <Content>
        <Card title={<CardFront word={simplified} frequency={frequencyRank} />}>
          <Tabs
            defaultActiveKey="0"
            size="large"
            tabBarExtraContent={{ right: <Tag>HSK {hsk}</Tag> }}
          >
            {renderTabPanes(entries)}
          </Tabs>
          <br />
          <Sentences word={simplified} />
          <br />
          <UsefulLinks word={simplified} />
          <br />
          <br />
          <br />
          <br />
        </Card>
      </Content>
      <Footer>
        <Text>Desenvolvido com ❤️ por </Text>
        <Link target="_blank" href="https://github.com/felipemarinho97">
          Felipe Marinho
        </Link>
      </Footer>
    </Layout>
  );
};

export async function getStaticPaths() {
  // Call an external API endpoint to get posts
  const wordsList = words.map((w) => w.simplified);

  // Get the paths we want to pre-render based on posts
  const paths = wordsList.map((w) => `/card/${encodeURI(w)}`);

  // We'll pre-render only these paths at build time.
  // { fallback: false } means other routes should 404.
  return { paths, fallback: false };
}

export async function getStaticProps({ params }) {
  const res = await fetch(
    `${API_ROOT}/api/words?value=${encodeURI(params.word)}`
  );
  const word = await res.json();

  // Pass data to the page via props
  return { props: { word } };
}

export default Word;
