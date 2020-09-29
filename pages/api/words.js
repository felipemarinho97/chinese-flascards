import words from "./words.json";

export default (req, res) => {
  const { value } = req.query;

  res.statusCode = 200;
  res.json(words.filter((w) => w.simplified === value)[0]);
};
