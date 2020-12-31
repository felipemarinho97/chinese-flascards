import {
  Button,
  Card,
  Checkbox,
  Divider,
  Input,
  InputNumber,
  Select,
} from "antd";
import Form from "antd/lib/form";
import Layout from "antd/lib/layout";
import Typography from "antd/lib/typography";
import { useState } from "react";
import languages from "../components/languages";

const { Link, Text, Title } = Typography;
const { Content, Footer } = Layout;

function renderLanguagOptions() {
  return Object.entries(languages).map((entry) => (
    <Select.Option value={entry[0]}>{entry[1]}</Select.Option>
  ));
}
const optionsWithDisabled = [
  { label: "HSK 1", value: 1 },
  { label: "HSK 2", value: 2 },
  { label: "HSK 3", value: 3 },
  { label: "HSK 4", value: 4 },
  { label: "HSK 5", value: 5 },
  { label: "HSK 6", value: 6 },
  { label: "Non-HSK", value: 0 },
];

const state = {
  filter: false,
  higher: 0,
  smaller: 2500,
  hsk: [],
  target: "None",
};

function genQuery() {
  let qs = "";
  if (state.filter) {
    qs += `rank_higher=${state.higher}&`;
    qs += `rank_lesser=${state.smaller}&`;
  }
  if (state.target !== "None") qs += `target=${state.target}&`;
  qs += state.hsk.map((v) => `hsk=${v}`).join("&");
  return qs.length !== 0 ? `?${qs}` : qs;
}

const downloadFile = () => {
  window.location.href =
    "https://anki-deck-generator.felipemarinho.vercel.app/api/deck" +
    genQuery();
};

export default function Home() {
  const [filter, setFilter] = useState(state.filter);

  return (
    <Layout>
      <Content>
        <Card>
          <Title>Generate your deck</Title>
          <Form>
            <Form.Item
              label={
                <>
                  <Checkbox
                    size="small"
                    value={filter}
                    onChange={(e) => {
                      let _new = !filter;
                      setFilter(_new);
                      state.filter = _new;
                    }}
                  />
                  {" Frequency filter "}
                </>
              }
            >
              <Input.Group>
                {"From "}
                <InputNumber
                  disabled={!filter}
                  size="large"
                  min={0}
                  defaultValue={state.higher}
                  placeholder="Greater than"
                  onChange={(n) => {
                    state.higher = n;
                  }}
                />
                {" to "}
                <InputNumber
                  disabled={!filter}
                  size="large"
                  min={1}
                  defaultValue={state.smaller}
                  placeholder="Smaller than"
                  onChange={(n) => {
                    state.smaller = n;
                  }}
                />
                {" most frequent words."}
              </Input.Group>
            </Form.Item>
            <Form.Item label="Word sets to include">
              <Checkbox.Group
                onChange={(e) => {
                  state.hsk = [...e];
                }}
                options={optionsWithDisabled}
                defaultValue={["Non-HSK"]}
              />
            </Form.Item>
            <Form.Item label={"Translate Language"}>
              <Select
                defaultValue="none"
                onChange={(e) => {
                  state.target = e;
                }}
              >
                <Select.Option value="none">None</Select.Option>
                {renderLanguagOptions()}
              </Select>
            </Form.Item>
            <Form.Item>
              <Button type="primary" onClick={downloadFile}>
                Download
              </Button>
            </Form.Item>
          </Form>
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
}
