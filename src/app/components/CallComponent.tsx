'use client';

import { useEffect, useRef, useState } from 'react';
import { RetellWebClient } from 'retell-client-js-sdk';

export default function CallComponent() {
  const retellClientRef = useRef<RetellWebClient | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const client = new RetellWebClient();
    retellClientRef.current = client;

    client.on('call_started', () => console.log('✅ Call started'));
    client.on('call_ended', () => console.log('❌ Call ended'));
    client.on('error', (err: unknown) => {
      console.error('⚠️ Retell error:', err);
      setError('Retell call failed. Check console for details.');
    });

    return () => {
      client.stopCall();
    };
  }, []);

  const startCall = async () => {
    setLoading(true);
    setError(null);

    try {
      const res = await fetch('/api/retell/start-call', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ agent_id: "agent_2686a29d5e0c39474bf6a1ebc9" }), // <-- replace with your actual agent ID
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Failed to get access token');
      }

      await retellClientRef.current?.startCall({
        accessToken: data.access_token,
      });
    } catch (err: any) {
      console.error('Error starting call:', err);
      setError(err.message || 'Unexpected error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4">
   
      <button
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
        onClick={startCall}
        disabled={loading}
      >
        {loading ? 'Starting Call...' : 'Click here'}
      </button>
      {error && <p className="text-red-600 mt-2">{error}</p>}
    </div>
  );
}
