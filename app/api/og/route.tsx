import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const action = searchParams.get('action') || 'default';

    // Generate SVG image based on action
    let svg = '';

    switch (action) {
      case 'create':
        svg = `
          <svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" style="stop-color:#1a1b3a"/>
                <stop offset="50%" style="stop-color:#2d1b69"/>
                <stop offset="100%" style="stop-color:#1a1b3a"/>
              </linearGradient>
            </defs>
            <rect width="1200" height="630" fill="url(#bg)"/>
            <text x="600" y="200" text-anchor="middle" fill="white" font-size="48" font-weight="bold">Create Market</text>
            <text x="600" y="280" text-anchor="middle" fill="#a0a0a0" font-size="24">Launch your prediction market</text>
            <circle cx="600" cy="400" r="60" fill="#3b82f6" opacity="0.2"/>
            <text x="600" y="415" text-anchor="middle" fill="#3b82f6" font-size="36">+</text>
          </svg>
        `;
        break;
      
      case 'markets':
        svg = `
          <svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" style="stop-color:#1a1b3a"/>
                <stop offset="50%" style="stop-color:#2d1b69"/>
                <stop offset="100%" style="stop-color:#1a1b3a"/>
              </linearGradient>
            </defs>
            <rect width="1200" height="630" fill="url(#bg)"/>
            <text x="600" y="150" text-anchor="middle" fill="white" font-size="48" font-weight="bold">Active Markets</text>
            <rect x="200" y="200" width="300" height="150" rx="12" fill="rgba(255,255,255,0.1)"/>
            <rect x="650" y="200" width="300" height="150" rx="12" fill="rgba(255,255,255,0.1)"/>
            <text x="350" y="240" text-anchor="middle" fill="white" font-size="18">Market 1</text>
            <text x="800" y="240" text-anchor="middle" fill="white" font-size="18">Market 2</text>
            <text x="350" y="320" text-anchor="middle" fill="#22c55e" font-size="24">65%</text>
            <text x="800" y="320" text-anchor="middle" fill="#ef4444" font-size="24">45%</text>
          </svg>
        `;
        break;
      
      default:
        svg = `
          <svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" style="stop-color:#1a1b3a"/>
                <stop offset="50%" style="stop-color:#2d1b69"/>
                <stop offset="100%" style="stop-color:#1a1b3a"/>
              </linearGradient>
            </defs>
            <rect width="1200" height="630" fill="url(#bg)"/>
            <text x="600" y="200" text-anchor="middle" fill="white" font-size="56" font-weight="bold">CreatorCoin Predict</text>
            <text x="600" y="280" text-anchor="middle" fill="#a0a0a0" font-size="28">Build instant prediction markets</text>
            <text x="600" y="320" text-anchor="middle" fill="#a0a0a0" font-size="28">with your community's token</text>
            <circle cx="500" cy="450" r="40" fill="#22c55e" opacity="0.3"/>
            <circle cx="600" cy="450" r="40" fill="#3b82f6" opacity="0.3"/>
            <circle cx="700" cy="450" r="40" fill="#ef4444" opacity="0.3"/>
            <text x="600" y="540" text-anchor="middle" fill="#3b82f6" font-size="20">Powered by Base</text>
          </svg>
        `;
        break;
    }

    return new NextResponse(svg, {
      headers: {
        'Content-Type': 'image/svg+xml',
        'Cache-Control': 'public, max-age=3600',
      },
    });
  } catch (error) {
    console.error('OG image generation error:', error);
    return NextResponse.json({ error: 'Failed to generate image' }, { status: 500 });
  }
}
