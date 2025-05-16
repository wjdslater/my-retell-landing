'use client';

import { useEffect, useState } from 'react';
import IntegratedVoiceWidget from '../components/IntegratedVoiceWidget';

export default function WidgetPage() {
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => {
    setMounted(true);
  }, []);
  
  if (!mounted) {
    return (
      <div className="widget-page" style={{ 
        background: 'transparent',
        padding: 0,
        margin: 0,
        width: '100%',
        height: '400px',
        overflow: 'hidden'
      }}>
        <div className="flex items-center justify-center h-full">
          <p>Loading widget...</p>
        </div>
      </div>
    );
  }
  
  return (
    <div className="widget-page" style={{ 
      background: 'transparent',
      padding: 0,
      margin: 0,
      width: '100%',
      overflow: 'hidden'
    }}>
      <IntegratedVoiceWidget />
    </div>
  );
}