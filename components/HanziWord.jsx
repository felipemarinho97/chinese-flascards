import Hanzi from "./Hanzi";

class HanziWord extends React.Component {
  constructor(props) {
    super(props);
    this.state = { width: 360, currentAnimating: 0, currentQuiz: 0 };
    this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
    this.onAnimateCharComplete = this.onAnimateCharComplete.bind(this);
    this.onQuizCharComplete = this.onQuizCharComplete.bind(this);
  }

  componentDidMount() {
    this.updateWindowDimensions();
    window.addEventListener("resize", this.updateWindowDimensions);
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.updateWindowDimensions);
  }

  updateWindowDimensions() {
    this.setState({ width: window.innerWidth });
  }

  onAnimateCharComplete(i) {
    const { word, onAnimationComplete } = this.props;
    const { currentAnimating } = this.state;

    if (i == word.length - 1) {
      onAnimationComplete();
      this.setState({ currentAnimating: 0 });
    } else {
      this.setState({ currentAnimating: currentAnimating + 1 });
    }
  }

  onQuizCharComplete(i) {
    const { word, onQuizComplete } = this.props;
    const { currentQuiz } = this.state;

    if (i == word.length - 1) {
      onQuizComplete();
      this.setState({ currentQuiz: 0 });
    } else {
      this.setState({ currentQuiz: currentQuiz + 1 });
    }
  }

  render() {
    const { word, animate, quiz } = this.props;
    const { currentAnimating, currentQuiz } = this.state;
    const hanzis = word.split("");
    const hanziSize =
      (this.state.width - 120) / (hanzis.length == 1 ? 2 : hanzis.length);

    return (
      <div
        style={{
          display: `flex`,
          textAlign: "center",
          marginTop: "1rem",
          marginBottom: "1rem",
        }}
      >
        {hanzis.map((h, i) => {
          return (
            <Hanzi
              animate={animate && i == currentAnimating}
              quiz={quiz && i == currentQuiz}
              onAnimateComplete={() => this.onAnimateCharComplete(i)}
              onQuizComplete={() => this.onQuizCharComplete(i)}
              width={hanziSize}
              height={hanziSize}
              padding={0}
              word={h}
            />
          );
        })}
      </div>
    );
  }
}
export default HanziWord;
