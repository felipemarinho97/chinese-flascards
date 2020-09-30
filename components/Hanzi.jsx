import HanziWriter from "hanzi-writer";

class Hanzi extends React.Component {
  writer;

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const { word } = this.props;

    this.writer = HanziWriter.create(word + "-container", word, this.props);
  }

  componentDidUpdate(prevProps) {
    const {
      word,
      animate,
      onAnimateComplete,
      quiz,
      onQuizComplete,
    } = this.props;

    if (prevProps.width !== this.props.width) {
      document.getElementById(word + "-container").innerHTML = "";
      this.writer = HanziWriter.create(word + "-container", word, this.props);
    }

    if (animate) {
      this.writer.animateCharacter({ onComplete: onAnimateComplete });
    }

    if (quiz) {
      this.writer.quiz({ onComplete: onQuizComplete });
    }
  }

  render() {
    const { word, width, height } = this.props;

    return (
      <div
        className="hanzi-container"
        style={{ margin: "auto", width, height }}
        id={word + "-container"}
      ></div>
    );
  }
}
export default Hanzi;
