import { NextResponse } from 'next/server';

// Define allowed origins
const allowedOrigins = [
  'https://wjdslater.github.io',
  'http://localhost:3000',  // For local development
];

// Helper function to handle CORS
function corsHeaders(origin: string) {
  return {
    'Access-Control-Allow-Origin': origin,
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization, X-Requested-With',
    'Access-Control-Allow-Credentials': 'true',
    'Access-Control-Max-Age': '86400',
  };
}

// Handle OPTIONS requests (preflight)
export async function OPTIONS(req: Request) {
  const origin = req.headers.get('origin') || '';
  
  // Check if the origin is allowed
  if (allowedOrigins.includes(origin)) {
    return new NextResponse(null, {
      status: 204,
      headers: corsHeaders(origin),
    });
  }
  
  return new NextResponse(null, { status: 204 });
}

export async function POST(req: Request) {
  // Handle CORS
  const origin = req.headers.get('origin') || '';
  const headers = allowedOrigins.includes(origin) ? corsHeaders(origin) : {};
  
  try {
    const { agent_id } = await req.json();

    if (!agent_id) {
      return NextResponse.json({ error: 'Missing agent_id' }, { status: 400, headers });
    }

    const RETELL_API_KEY = process.env.RETELL_API_KEY;
    if (!RETELL_API_KEY) {
      return NextResponse.json({ error: 'Missing RETELL_API_KEY in environment' }, { status: 500, headers });
    }

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
