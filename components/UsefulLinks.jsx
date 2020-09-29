import { Space, Typography } from "antd";

const { Text, Title, Link } = Typography;

class UsefulLinks extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      links: [],
    };
  }

  componentDidMount() {
    const { word } = this.props;

    fetch(`https://pinyin-word-api.vercel.app/api/links/${word}`)
      .then((res) => res.json())
      .then((data) => {
        this.setState({ links: data });
      });
  }

  render() {
    const { links } = this.state;

    return (
      <>
        <Title level={4}>Useful Links</Title>
        <Space direction="vertical">
          {Object.keys(links).map((k) => (
            <Link target="_blank" href={links[k]}>
              {k}
            </Link>
          ))}
        </Space>
      </>
    );
  }
}
export default UsefulLinks;
