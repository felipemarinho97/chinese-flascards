import { NextRequest, NextResponse } from 'next/server';

export async function GET(
  request: NextRequest,
  { params }: { params: { link: string } }
) {
  try {
    const { link } = params;
    
    if (!link) {
      return NextResponse.json(
        { error: 'Link parameter is required' },
        { status: 400 }
      );
    }

    // Proxy the audio request to the external service
    const audioUrl = `https://pinyin-word-api.vercel.app/api/audio/pod/${encodeURIComponent(link)}`;
    
    const response = await fetch(audioUrl);
    
    if (!response.ok) {
      return NextResponse.json(
        { error: 'Audio not found' },
        { status: 404 }
      );
    }

    const arrayBuffer = await response.arrayBuffer();
    
    return new NextResponse(arrayBuffer, {
      headers: {
        'Content-Type': response.headers.get('Content-Type') || 'audio/mpeg',
        'Cache-Control': 'public, max-age=86400', // Cache for 24 hours
      },
    });
  } catch (error) {
    console.error('Error fetching audio:', error);
    return NextResponse.json(
      { error: 'Failed to fetch audio' },
      { status: 500 }
    );
  }
}
