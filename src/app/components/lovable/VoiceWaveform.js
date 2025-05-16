import React from 'react';

export default function VoiceWaveform(props) {
  const { 
    isActive, 
    isSpeaking = false,
    audioLevel = 0,
    barCount = 12 
  } = props;
  
  // State to track time offset for consistent animation
  const [timeOffset] = React.useState(() => Math.floor(Math.random() * 10000));
  
  // Function to get dynamic bar heights based on audio level and speaking state
  const getBarHeight = (index) => {
    if (!isActive) return 4;
    
    // Base height affected by audio level (ranges from 4px to 40px)
    const maxHeight = isSpeaking ? 40 : 20;
    const baseHeight = 4 + (audioLevel * (maxHeight - 4));
    
    // Add wave effect based on position
    const position = index / barCount;
    
    // Use a consistent time offset for the animation
    const now = Date.now();
    const wave = Math.sin(position * Math.PI * 2 + ((now + timeOffset) / 150)) * 0.5 + 0.5;
    
    // Combine base height with wave effect
    // When speaking, wave has more effect; when listening, more subtle
    const waveInfluence = isSpeaking ? 0.7 : 0.3;
    const heightWithWave = baseHeight * (1 - waveInfluence) + (baseHeight * wave * waveInfluence);
    
    // Return height without random factor to avoid hydration errors
    return Math.floor(heightWithWave);
  };
  
  return (
    <div className="waveform-container flex justify-center items-end h-16 gap-2" aria-hidden="true">
      {Array.from({ length: barCount }).map((_, index) => {
        // Calculate color based on position (yellow to pink gradient)
        const position = index / (barCount - 1); // 0 to 1
        
        // Gradient from APE AI Yellow (#FAFC75) to SalesAPE Pink (#F724DE)
        // R: 250→247, G: 252→36, B: 117→222
        const r = Math.floor(250 - (position * 3));
        const g = Math.floor(252 - (position * 216));
        const b = Math.floor(117 + (position * 105));
        
        return (
          <div
            key={index}
            className="waveform-bar w-1.5 md:w-2 rounded-full transition-height"
            style={{ 
              height: `${getBarHeight(index)}px`,
              transition: 'height 100ms ease-out',
              transitionDelay: `${index * 15}ms`,
              backgroundColor: `rgb(${r}, ${g}, ${b})`,
            }}
          />
        );
      })}
    </div>
  );
}