import words from './words-only.json';

export interface WordEntry {
  simplified: string;
  traditional?: string;
  pinyin: string;
  definitions: string[];
}

export interface WordData {
  simplified: string;
  rank: number;
  hsk: number;
  entries: WordEntry[];
}

export interface FilterParams {
  filter: boolean;
  higher: number;
  smaller: number;
  hsk: number[];
  target: string;
}

// Fetch word data from the external API (same as original)
export async function getWordByCharacter(character: string): Promise<WordData | null> {
  try {
    const response = await fetch(
      `https://pinyin-word-api.vercel.app/api/lookup/${encodeURIComponent(character)}`
    );
    
    if (!response.ok) {
      return null;
    }
    
    const data = await response.json();
    
    if (data.message) {
      return null; // Word not found
    }
    
    return {
      simplified: data.simplified,
      rank: data.rank || 0,
      hsk: data.hsk || 0,
      entries: data.entries || []
    };
  } catch (error) {
    console.error('Error fetching word data:', error);
    return null;
  }
}

export function generateQuery(params: FilterParams): string {
  let qs = "";
  if (params.filter) {
    qs += `rank_higher=${params.higher}&`;
    qs += `rank_lesser=${params.smaller}&`;
  }
  if (params.target !== "none") qs += `target=${params.target}&`;
  qs += params.hsk.map((v) => `hsk=${v}`).join("&");
  return qs.length !== 0 ? `?${qs}` : qs;
}

export function getWordsList(): string[] {
  return words;
}
