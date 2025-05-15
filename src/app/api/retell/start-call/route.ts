import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  const { agent_id } = await req.json();

  if (!agent_id) {
    return NextResponse.json({ error: 'Missing agent_id' }, { status: 400 });
  }

  const RETELL_API_KEY = process.env.RETELL_API_KEY;
  if (!RETELL_API_KEY) {
    return NextResponse.json({ error: 'Missing RETELL_API_KEY in environment' }, { status: 500 });
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
      return NextResponse.json({ error: data.message || 'Failed to create web call' }, { status: response.status });
    }

    return NextResponse.json({ access_token: data.access_token });
  } catch (error) {
    console.error('Retell API call failed:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
