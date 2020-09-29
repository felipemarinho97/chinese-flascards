import { Badge, Button, Card } from "antd";
import HanziWord from "./HanziWord";
import { PlayButton } from "./Sentences";
import { EyeOutlined, HighlightOutlined } from "@ant-design/icons";

export const Quiz = ({ onClick }) => {
  return (
    <Button
      shape="circle"
      size="small"
      icon={<HighlightOutlined />}
      onClick={onClick}
    ></Button>
  );
};

export const Animate = ({ onClick }) => {
  return (
    <Button
      shape="circle"
      size="small"
      icon={<EyeOutlined />}
      onClick={onClick}
    ></Button>
  );
};

class CardFront extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      animate: false,
      quiz: false,
    };

    this.onAnimationComplete = this.onAnimationComplete.bind(this);
    this.onAnimate = this.onAnimate.bind(this);
    this.onQuizStart = this.onQuizStart.bind(this);
    this.onQuizComplete = this.onQuizComplete.bind(this);
  }

  onAnimate() {
    this.setState({ animate: true });
  }

  onAnimationComplete() {
    this.setState({ animate: false });
  }

  onQuizStart() {
    this.setState({ quiz: true });
  }

  onQuizComplete() {
    this.setState({ quiz: false });
  }

  render() {
    const { word, frequency } = this.props;
    const { animate, quiz } = this.state;
    const audioLink = `https://pinyin-word-api.vercel.app/api/audio/pod/${encodeURI(
      word
    )}`;

    return (
      <Badge.Ribbon style={{ margin: "8px" }} text={`Rank: ${frequency}`}>
        <Card
          style={{ margin: "8px" }}
          actions={[
            <PlayButton link={audioLink} />,
            <Animate onClick={this.onAnimate} />,
            <Quiz onClick={this.onQuizStart} />,
          ]}
        >
          <HanziWord
            word={word}
            animate={animate}
            quiz={quiz}
            onAnimationComplete={this.onAnimationComplete}
            onQuizComplete={this.onQuizComplete}
          />
        </Card>
      </Badge.Ribbon>
    );
  }
}

export default CardFront;
