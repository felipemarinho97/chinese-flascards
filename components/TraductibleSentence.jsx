import { TranslationOutlined } from "@ant-design/icons";
import { Button, Typography } from "antd";

const { Text } = Typography;

class TraductibleSentence extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      Traduction: null,
    };

    this.fillTraduction = this.fillTraduction.bind(this);
  }

  componentDidMount() {
    this.setState({
      Traduction: (
        <Button
          class="traduction-btn"
          type="primary"
          shape="circle"
          size="small"
          icon={<TranslationOutlined />}
          onClick={this.fillTraduction}
        ></Button>
      ),
    });
  }

  fillTraduction() {
    const { sentence } = this.props;

    fetch(
      `https://gtranslate-api.vercel.app/api/translate?text=${encodeURI(
        sentence
      )}&text=&to=pt`
    )
      .then((res) => res.json())
      .then((tran) => {
        console.log(tran);
        const Traduction = <Text type="secondary">{tran[0]}</Text>;
        this.setState({ Traduction });
      });
  }

  render() {
    const { sentence, i } = this.props;
    const { Traduction } = this.state;

    return (
      <div style={{ display: "flex" }}>
        <span>{i}.&nbsp;</span>
        <span className="traductible-sentence" onClick={this.fillTraduction}>
          <Text>{sentence}</Text>
        </span>
        {Traduction}
      </div>
    );
  }
}
export default TraductibleSentence;
