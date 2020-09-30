import { SoundOutlined } from "@ant-design/icons";
import { Button, List, Space, Tag, Typography } from "antd";
import { API_ROOT } from "./constants";

const { Text, Title } = Typography;

export const PlayButton = ({ link }) => {
  if (link == null) return <></>;
  let audio;
  try {
    audio = new Audio(link);
  } catch {}

  function onClick() {
    audio.play();
  }

  return (
    <Button
      type="primary"
      shape="circle"
      size="middle"
      icon={<SoundOutlined />}
      onClick={onClick}
    ></Button>
  );
};

function color(level) {
  switch (level) {
    case "Newbie":
      return "cyan";
    case "Elementary":
      return "blue";
    case "Intermediate":
      return "gold";
    case "Pre-Intermediate":
      return "purple";
    case "Upper-Intermediate":
      return "orange";
    case "Advanced":
      return "red";
    default:
      break;
  }
}

class Sentences extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      sentences: [],
    };
  }

  componentDidMount() {
    const { word } = this.props;

    fetch(`https://pinyin-word-api.vercel.app/api/sentences/${encodeURI(word)}`)
      .then((res) => res.json())
      .then((res) => res.sort((a, b) => a.pinyin.length - b.pinyin.length))
      .then((sentences) => {
        this.setState({ sentences });
      });
  }

  render() {
    const { sentences } = this.state;

    return (
      <div>
        <Title level={4}>Sentences</Title>
        <List
          pagination={{ pageSize: 6 }}
          loading={sentences.length == 0}
          dataSource={sentences}
          renderItem={(item) => (
            <List.Item
              actions={[
                <PlayButton
                  link={
                    API_ROOT + "/api/audio/" + encodeURIComponent(item.audio)
                  }
                />,
              ]}
            >
              <Space direction="vertical">
                <Text style={{ fontSize: "large" }}>{item.hanzi}</Text>
                <Text type="success">{item.pinyin}</Text>
                <Text type="secondary"> {item.translation} </Text>
                <List.Item.Meta
                  description={
                    <Tag color={color(item.level)}>{item.level}</Tag>
                  }
                />
              </Space>
            </List.Item>
          )}
        />
      </div>
    );
  }
}
export default Sentences;
