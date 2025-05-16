// Simplest possible widget page
export default function WidgetPage() {
  return (
    <div style={{ padding: '20px', border: '1px solid #ccc', borderRadius: '8px', maxWidth: '600px', margin: '20px auto' }}>
      <h1>Widget Page</h1>
      <p>This is a simple Next.js widget page.</p>
      <button 
        style={{ 
          background: '#0070f3', 
          color: 'white', 
          border: 'none', 
          padding: '8px 16px', 
          borderRadius: '4px',
          cursor: 'pointer'
        }}
        onClick={() => alert('Widget button clicked!')}
      >
        Test Widget
      </button>
    </div>
  );
}