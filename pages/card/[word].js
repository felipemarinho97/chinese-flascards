import Typography from "antd/lib/typography";
import Tag from "antd/lib/tag";
import Tabs from "antd/lib/tabs";
import Layout from "antd/lib/layout";
import Card from "antd/lib/card";
import React from "react";
import { API_ROOT } from "../../components/constants";
import TraductibleSentence from "../../components/TraductibleSentence";
import Sentences from "../../components/Sentences";
import UsefulLinks from "../../components/UsefulLinks";
import CardFront from "../../components/CardFront";
import DefaultErrorPage from "next/error";
import Head from "next/head";

const { Text, Link } = Typography;
const { Content, Footer } = Layout;
const { TabPane } = Tabs;

export const fetcher = (...args) => fetch(...args).then((res) => res.json());

function renderTabPanes(entries) {
  return entries.map((entry, i) => {
    return (
      <TabPane tab={entry.pinyin} key={i}>
        {entry.definitions.map((d, i) => (
          <TraductibleSentence i={i + 1} sentence={d} />
        ))}
      </TabPane>
    );
  });
}

const Word = (props) => {
  if (!props.word) return <></>;
  if (props.word.message != null)
    return (
      <>
        <Head>
          <meta name="robots" content="noindex" />
        </Head>
        <DefaultErrorPage statusCode={404} />
      </>
    );

  const { simplified, rank: frequencyRank, hsk, entries } = props.word;

  return (
    <Layout>
      <Content>
        <Card title={<CardFront word={simplified} frequency={frequencyRank} />}>
          <Tabs
            defaultActiveKey="0"
            size="large"
            tabBarExtraContent={{ right: <Tag>HSK {hsk ? hsk : "N/A"}</Tag> }}
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
  const res = await fetch(`${API_ROOT}/api/words`);

  const wordsList = await res.json();

  // Get the paths we want to pre-render based on posts
  const paths = wordsList.map((w) => `/card/${encodeURI(w)}`);

  // We'll pre-render only these paths at build time.
  // { fallback: false } means other routes should 404.
  return { paths, fallback: true };
}

export async function getStaticProps({ params }) {
  const res = await fetch(
    `https://pinyin-word-api.vercel.app/api/lookup/${encodeURI(params.word)}`
  );
  const word = await res.json();

  // Pass data to the page via props
  return { props: { word, params } };
}

export default Word;
