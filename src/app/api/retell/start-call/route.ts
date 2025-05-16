import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  // Add CORS headers
  const headers = {
    'Access-Control-Allow-Origin': 'https://wjdslater.github.io',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
  };

  const { agent_id } = await req.json();

  if (!agent_id) {
    return NextResponse.json({ error: 'Missing agent_id' }, { status: 400, headers });
  }

  const RETELL_API_KEY = process.env.RETELL_API_KEY;
  if (!RETELL_API_KEY) {
    return NextResponse.json({ error: 'Missing RETELL_API_KEY in environment' }, { status: 500, headers });
  }

  try {
    const response = await fetch('https://api.retellai.com/v2/create-web-call', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${RETELL_API_KEY}`,
      },
      body: JSON.stringify({ agent_id }),
    });

    const data = await response.json();

    if (!response.ok) {
      console.error('Retell API responded with error:', data);
      return NextResponse.json({ error: data.message || 'Failed to create web call' }, { status: response.status, headers });
    }

    return NextResponse.json({ access_token: data.access_token }, { headers });
  } catch (error) {
    console.error('Retell API call failed:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500, headers });
  }
}

// Add this export to handle OPTIONS requests
export async function OPTIONS(req: Request) {
  return new NextResponse(null, {
    status: 204,
    headers: {
      'Access-Control-Allow-Origin': 'https://wjdslater.github.io',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    },
  });
}
