import words from "./words-only.json";

export default (req, res) => {
  res.statusCode = 200;
  res.json(words);
};
