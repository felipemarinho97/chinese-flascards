// API Configuration
export const API_ROOT = "https://chinese-flashcards.felipemarinho.vercel.app";
// export const API_ROOT = "http://localhost:3000";

export const languages = {
  ar: "Arabic",
  bg: "Bulgarian", 
  cs: "Czech",
  da: "Danish",
  de: "German",
  el: "Greek",
  en: "English",
  es: "Spanish",
  et: "Estonian",
  fi: "Finnish",
  fr: "French",
  hu: "Hungarian",
  id: "Indonesian",
  it: "Italian",
  ja: "Japanese",
  ko: "Korean",
  lt: "Lithuanian",
  lv: "Latvian",
  nb: "Norwegian (Bokmål)",
  nl: "Dutch",
  pl: "Polish",
  pt: "Portuguese",
  ro: "Romanian",
  ru: "Russian",
  sk: "Slovak",
  sl: "Slovenian",
  sv: "Swedish",
  tr: "Turkish",
  uk: "Ukrainian",
  zh: "Chinese"
};

export const HSK_LEVELS = [
  { label: "HSK 1", value: 1 },
  { label: "HSK 2", value: 2 },
  { label: "HSK 3", value: 3 },
  { label: "HSK 4", value: 4 },
  { label: "HSK 5", value: 5 },
  { label: "HSK 6", value: 6 },
  { label: "Non-HSK*", value: 0 },
];

export const DEFAULT_FILTER_STATE = {
  filter: false,
  higher: 0,
  smaller: 25000,
  hsk: [1],
  target: "none",
};
