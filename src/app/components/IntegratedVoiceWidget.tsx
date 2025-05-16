'use client';

import { useEffect, useRef, useState } from 'react';
import { RetellWebClient } from 'retell-client-js-sdk';
import VoiceWaveform from './lovable/VoiceWaveform.js';
import VoiceControls from './lovable/VoiceControls.js';
import { IFrameCommunication } from '../utils/IFrameCommunication';

interface IntegratedVoiceWidgetProps {
  title?: string;
  description?: string;
  primaryColor?: string;
  companyName?: string;
}

export default function IntegratedVoiceWidget({
  title = "SEE HOW IT WORKS",
  description = "Click below to talk to Sophie, our AI sales agent, and learn how she could help your business.",
  primaryColor = "bg-sales-ape-pink hover:bg-sales-ape-pink-hover",
  companyName = "SalesAPE.ai"
}: IntegratedVoiceWidgetProps) {
  const retellClientRef = useRef<RetellWebClient | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isAgentTalking, setIsAgentTalking] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [audioLevel, setAudioLevel] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const animationFrameRef = useRef<number | null>(null);
  
  // Use this to track if the component is mounted
  const [isMounted, setIsMounted] = useState(false);
  
  // Set isMounted to true after initial render
  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Function to calculate audio level from audio samples
  const calculateAudioLevel = (audioData: Float32Array) => {
    let sum = 0;
    for (let i = 0; i < audioData.length; i++) {
      sum += Math.abs(audioData[i]);
    }
    // Return a value between 0 and 1
    return Math.min(1, sum / audioData.length / 0.2);
  };

  // Simulate audio level changes when no audio data is available
  const simulateAudioLevel = () => {
    if (!isPlaying) return;
    
    if (isAgentTalking) {
      // More activity when agent is talking
      const baseLevel = 0.3;
      const randomVariation = Math.random() * 0.7;
      setAudioLevel(baseLevel + randomVariation);
    } else {
      // Less activity when agent is not talking
      const baseLevel = 0.05;
      const randomVariation = Math.random() * 0.15;
      setAudioLevel(baseLevel + randomVariation);
    }
    
    animationFrameRef.current = requestAnimationFrame(simulateAudioLevel);
  };

  // Initialize Retell client - only run on client side after mounting
  useEffect(() => {
    if (!isMounted) return;
    
    const client = new RetellWebClient();
    retellClientRef.current = client;

    client.on('call_started', () => {
      console.log('✅ Call started');
      setIsPlaying(true);
      
      // Start audio level simulation
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      animationFrameRef.current = requestAnimationFrame(simulateAudioLevel);
      
      // Notify parent window that call has started
      IFrameCommunication.sendMessage('demoStarted', { timestamp: new Date().toISOString() });
      
      // Update iframe height after the UI changes
      setTimeout(() => {
        if (containerRef.current) {
          const height = containerRef.current.offsetHeight;
          IFrameCommunication.requestResize(height);
        }
      }, 100);
    });
    
    client.on('call_ended', () => {
      console.log('❌ Call ended');
      setIsPlaying(false);
      setIsAgentTalking(false);
      setIsMuted(false);
      
      // Stop audio level simulation
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
        animationFrameRef.current = null;
      }
      
      // Notify parent window that call has ended
      IFrameCommunication.sendMessage('demoEnded', { timestamp: new Date().toISOString() });
      
      // Update iframe height after the UI changes
      setTimeout(() => {
        if (containerRef.current) {
          const height = containerRef.current.offsetHeight;
          IFrameCommunication.requestResize(height);
        }
      }, 100);
    });
    
    // Add event handlers for agent talking status
    client.on('agent_start_talking', () => {
      console.log('🗣️ Agent started talking');
      setIsAgentTalking(true);
    });
    
    client.on('agent_stop_talking', () => {
      console.log('🤐 Agent stopped talking');
      setIsAgentTalking(false);
    });
    
    // Handle audio data if available
    client.on('audio', (audioData: Float32Array) => {
      const level = calculateAudioLevel(audioData);
      setAudioLevel(level);
    });
    
    client.on('error', (err: unknown) => {
      console.error('⚠️ Retell error:', err);
      setError('Retell call failed. Check console for details.');
      setIsPlaying(false);
      setIsAgentTalking(false);
      
      // Stop audio level simulation
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
        animationFrameRef.current = null;
      }
      
      // Notify parent window about error
      IFrameCommunication.sendMessage('error', { 
        error: err instanceof Error ? err.message : 'Unknown error'
      });
    });

    return () => {
      client.stopCall();
      
      // Clean up animation frame
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
        animationFrameRef.current = null;
      }
    };
  }, [isMounted]); // Only run after mounting

  // Clean up animation frame on unmount
  useEffect(() => {
    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
        animationFrameRef.current = null;
      }
    };
  }, []);

  // Start call with Retell
  const startDemo = async () => {
    setLoading(true);
    setError(null);

    try {
      const res = await fetch('/api/retell/start-call', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ agent_id: "agent_2686a29d5e0c39474bf6a1ebc9" }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Failed to get access token');
      }

      await retellClientRef.current?.startCall({
        accessToken: data.access_token,
        emitRawAudioSamples: true, // Enable audio samples for animation
      });
      
      // The UI state will be updated by the call_started event handler
    } catch (err: any) {
      console.error('Error starting call:', err);
      setError(err.message || 'Unexpected error');
      setIsPlaying(false);
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };

  // Toggle mute
  const toggleMute = () => {
    if (retellClientRef.current) {
      if (isMuted) {
        retellClientRef.current.unmute();
      } else {
        retellClientRef.current.mute();
      }
      setIsMuted(!isMuted);
      
      // Notify parent window of mute state
      IFrameCommunication.sendMessage(isMuted ? 'demoUnmuted' : 'demoMuted', {
        timestamp: new Date().toISOString()
      });
    }
  };

  // Stop the call
  const stopDemo = () => {
    retellClientRef.current?.stopCall();
    // The UI state will be updated by the call_ended event handler
  };

  // Update iframe height when content changes
  useEffect(() => {
    if (!isMounted) return;
    
    if (containerRef.current) {
      const height = containerRef.current.offsetHeight;
      IFrameCommunication.requestResize(height);
    }
  }, [isPlaying, isMounted]);

  return (
    <div ref={containerRef} className="voice-widget p-4 max-w-md mx-auto">
      <div className="shadow-lg border-0 rounded-lg bg-black text-white p-5">
        <div className="mb-5">
          <h2 className="text-2xl font-bold text-white mb-2 anton-font">
            {title}
          </h2>
          <p className="text-white/90 dm-sans text-sm">
            {description}
          </p>
        </div>
        
        <div>
          {!isPlaying ? (
            <button 
              className={`w-full py-6 text-2xl ${primaryColor} text-white rounded-md anton-font`} 
              onClick={startDemo}
              disabled={loading}
            >
              {loading ? 'STARTING...' : 'START VOICE DEMO'}
            </button>
          ) : (
            <div className="space-y-4">
              <div className="bg-zinc-900 p-4 rounded-lg">
                <p className="text-center mb-5 dm-sans">
                  {isMuted ? (
                    <span className="text-white anton-font">MICROPHONE MUTED</span>
                  ) : (
                    <span className="text-sales-ape-pink font-medium">
                      {isAgentTalking ? 'Sophie is speaking...' : 'Listening...'}
                    </span>
                  )}
                </p>
                {isMounted && (
                  <VoiceWaveform 
                    isActive={isPlaying} 
                    isSpeaking={isAgentTalking} 
                    audioLevel={audioLevel}
                  />
                )}
                <VoiceControls
                  onMute={toggleMute}
                  onStop={stopDemo}
                  isMuted={isMuted}
                />
              </div>
            </div>
          )}
        </div>
        
        <div className="mt-4 flex justify-between text-xs text-white/70 dm-sans">
          <p>
            Make sure your browser can access your mic
          </p>
          {isPlaying && (
            <p className="text-sales-ape-pink">
              API Connection: Active
            </p>
          )}
        </div>
        
        {error && <p className="text-red-500 mt-2 dm-sans">{error}</p>}
      </div>
    </div>
  );
}