import { NextResponse } from 'next/server';
import { getWordsList } from '@/lib/words';

export async function GET() {
  try {
    const words = getWordsList();
    return NextResponse.json(words);
  } catch (error) {
    console.error('Error fetching words:', error);
    return NextResponse.json(
      { error: 'Failed to fetch words' },
      { status: 500 }
    );
  }
}
