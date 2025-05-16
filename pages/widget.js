import dynamic from 'next/dynamic';

// Import your widget component dynamically
const WidgetComponent = dynamic(() => import('../src/app/widget/page'), {
  ssr: false // Disable server-side rendering if needed
});

export default function WidgetPage() {
  return <WidgetComponent />;
}