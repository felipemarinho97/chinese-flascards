import Button from "antd/lib/button";
import Badge from "antd/lib/badge";
import Card from "antd/lib/card";
import HanziWord from "./HanziWord";
import { PlayButton } from "./Sentences";
import EyeOutlined from "@ant-design/icons/EyeOutlined";
import HighlightOutlined from "@ant-design/icons/HighlightOutlined";

export const Quiz = ({ onClick }) => {
  return (
    <Button
      type="primary"
      shape="circle"
      size="middle"
      icon={<HighlightOutlined />}
      onClick={onClick}
    ></Button>
  );
};

export const Animate = ({ onClick }) => {
  return (
    <Button
      type="primary"
      shape="circle"
      size="middle"
      icon={<EyeOutlined />}
      onClick={onClick}
    ></Button>
  );
};

class CardFront extends React.Component {
  audio;

  constructor(props) {
    super(props);

    this.state = {
      animate: false,
      quiz: false,
      link: `https://pinyin-word-api.vercel.app/api/audio/pod/${encodeURI(
        props.word
      )}`,
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
    this.playAudio();
  }

  componentDidMount() {
    const { link } = this.state;

    try {
      this.audio = new Audio(link);
      this.playAudio();
    } catch {}
  }

  playAudio() {
    try {
      this.audio.play();
    } catch {}
  }

  render() {
    const { word, frequency } = this.props;
    const { animate, quiz, link } = this.state;

    return (
      <Badge.Ribbon
        style={{ margin: "8px" }}
        text={`Rank: ${frequency ? frequency : "N/A"}`}
      >
        <Card
          style={{ margin: "8px" }}
          actions={[
            <PlayButton link={link} />,
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
