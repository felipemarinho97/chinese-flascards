import { Card, Layout, Tabs } from "antd";
import React from "react";
import { API_ROOT } from "../../components/constants";
import TraductibleSentence from "../../components/TraductibleSentence";
import Sentences from "../../components/Sentences";
import UsefulLinks from "../../components/UsefulLinks";
import CardFront from "../../components/CardFront";

const { Content } = Layout;
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
          <h3>HSK {hsk}</h3>
          <h2>Definitions</h2>
          <Tabs defaultActiveKey="0" size="large">
            {renderTabPanes(entries)}
          </Tabs>
          <br />
          <Sentences word={simplified} />
          <br />
          <UsefulLinks word={simplified} />
        </Card>
      </Content>
    </Layout>
  );
};

export async function getServerSideProps({ params }) {
  const res = await fetch(
    `${API_ROOT}/api/words?value=${encodeURI(params.word)}`
  );
  const word = await res.json();

  // Pass data to the page via props
  return { props: { word } };
}

export default Word;
