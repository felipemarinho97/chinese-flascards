import Space from "antd/lib/space";
import Typography from "antd/lib/typography";
import Spin from "antd/lib/spin";

const { Text, Title, Link } = Typography;

class UsefulLinks extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      links: [],
      loading: true,
    };
  }

  componentDidMount() {
    const { word } = this.props;

    this.fetchLinks(word);
  }

  fetchLinks(word) {
    fetch(`https://pinyin-word-api.vercel.app/api/links/${word}`)
      .then((res) => res.json())
      .then((data) => {
        this.setState({ links: data, loading: false });
      })
      .catch(() => this.fetchLinks(word));
  }

  render() {
    const { links, loading } = this.state;

    if (loading) {
      return (
        <>
          <Title level={4}>Useful Links</Title>
          <div style={{ textAlign: "center" }}>
            <Spin />
          </div>
        </>
      );
    }

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
