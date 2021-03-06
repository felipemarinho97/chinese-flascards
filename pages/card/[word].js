import Typography from "antd/lib/typography";
import Tag from "antd/lib/tag";
import Tabs from "antd/lib/tabs";
import Layout from "antd/lib/layout";
import Card from "antd/lib/card";
import Divider from "antd/lib/divider";
import React from "react";
import TraductibleSentence from "../../components/TraductibleSentence";
import Sentences from "../../components/Sentences";
import UsefulLinks from "../../components/UsefulLinks";
import CardFront from "../../components/CardFront";
import DefaultErrorPage from "next/error";
import Head from "next/head";
import wordsList from "./../api/words-only.json";
import ReactVisibilitySensor from "react-visibility-sensor";

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
          <ReactVisibilitySensor>
            {({ isVisible }) =>
              isVisible ? (
                <UsefulLinks word={simplified} />
              ) : (
                <div>Loading...</div>
              )
            }
          </ReactVisibilitySensor>

          <br />
          <br />
          <br />
          <br />
        </Card>
      </Content>
      <Footer style={{ textAlign: "center" }}>
        <form
          action="https://www.paypal.com/donate"
          method="post"
          target="_top"
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
            border="0"
            name="submit"
            title="PayPal - The safer, easier way to pay online!"
            alt="Donate with PayPal button"
          />
          <img
            alt=""
            border="0"
            src="https://www.paypal.com/en_BR/i/scr/pixel.gif"
            width="1"
            height="1"
          />
        </form>
        <Divider />
        <Text>Developed with ❤️ by </Text>
        <Link target="_blank" href="https://github.com/felipemarinho97">
          Felipe Marinho
        </Link>
      </Footer>
    </Layout>
  );
};

export async function getStaticPaths() {
  // Call an external API endpoint to get posts
  // const res = await fetch(`${API_ROOT}/api/words`);

  // const wordsList = await res.json();

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
