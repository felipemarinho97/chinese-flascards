import TranslationOutlined from "@ant-design/icons/TranslationOutlined";
import Button from "antd/lib/button";
import Typography from "antd/lib/typography";

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
    if (this.getTargetLanguage() !== null)
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

  getTargetLanguage() {
    const params = new URL(location.href).searchParams;
    const target = params.get('translate');

    return target
  }

  fillTraduction() {
    const { sentence } = this.props;

    const target = this.getTargetLanguage()

    if (target == null) return

    fetch(
      `https://gtranslate-api.vercel.app/api/translate?text=${encodeURI(
        sentence
      )}&text=&to=${target}`
    )
      .then((res) => res.json())
      .then((tran) => {
        console.log(tran);
        const Traduction = <Text type="secondary">{tran[0]}</Text>;
        this.setState({ Traduction });
      });
  }

  render() {
    const { sentence, i, type } = this.props;
    const { Traduction } = this.state;

    const NumberCount = i != null ? (<span>{i}.&nbsp;</span>) : ''

    return (
      <div style={{ display: "flex" }}>
        {NumberCount}
        <span className="traductible-sentence" onClick={this.fillTraduction}>
          <Text type={type}>{sentence}</Text>
        </span>
        {Traduction}
      </div>
    );
  }
}
export default TraductibleSentence;
