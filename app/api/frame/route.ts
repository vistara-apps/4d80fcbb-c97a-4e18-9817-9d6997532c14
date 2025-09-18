import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    
    // Handle frame interactions
    const { untrustedData } = body;
    const buttonIndex = untrustedData?.buttonIndex;

    let responseHtml = '';

    switch (buttonIndex) {
      case 1: // Create Market
        responseHtml = `
          <!DOCTYPE html>
          <html>
            <head>
              <meta property="fc:frame" content="vNext" />
              <meta property="fc:frame:image" content="${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/api/og?action=create" />
              <meta property="fc:frame:button:1" content="Back to Markets" />
              <meta property="fc:frame:post_url" content="${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/api/frame" />
              <title>Create Market - CreatorCoin Predict</title>
            </head>
            <body>
              <h1>Create a new prediction market</h1>
            </body>
          </html>
        `;
        break;
      
      case 2: // View Markets
      default:
        responseHtml = `
          <!DOCTYPE html>
          <html>
            <head>
              <meta property="fc:frame" content="vNext" />
              <meta property="fc:frame:image" content="${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/api/og?action=markets" />
              <meta property="fc:frame:button:1" content="Create Market" />
              <meta property="fc:frame:button:2" content="Stake Now" />
              <meta property="fc:frame:post_url" content="${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/api/frame" />
              <title>Markets - CreatorCoin Predict</title>
            </head>
            <body>
              <h1>Active Prediction Markets</h1>
            </body>
          </html>
        `;
        break;
    }

    return new NextResponse(responseHtml, {
      headers: {
        'Content-Type': 'text/html',
      },
    });
  } catch (error) {
    console.error('Frame API error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function GET() {
  const html = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta property="fc:frame" content="vNext" />
        <meta property="fc:frame:image" content="${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/api/og" />
        <meta property="fc:frame:button:1" content="Create Market" />
        <meta property="fc:frame:button:2" content="View Markets" />
        <meta property="fc:frame:post_url" content="${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/api/frame" />
        <title>CreatorCoin Predict</title>
      </head>
      <body>
        <h1>CreatorCoin Predict</h1>
        <p>Build instant prediction markets with your community's token</p>
      </body>
    </html>
  `;

  return new NextResponse(html, {
    headers: {
      'Content-Type': 'text/html',
    },
  });
}
