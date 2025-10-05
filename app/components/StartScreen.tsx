interface StartScreenProps {
  onStart: () => void
  isLoading: boolean
  onSettingsClick: () => void
}

export default function StartScreen({ onStart, isLoading, onSettingsClick }: StartScreenProps) {
  return (
    <div style={{ 
      minHeight: '100vh',
      backgroundColor: '#000000',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '2rem',
      fontFamily: 'system-ui, -apple-system, sans-serif'
    }}>
      <div style={{ 
        textAlign: 'center',
        maxWidth: '600px',
        color: 'white'
      }}>
        {/* Simple Monochrome Icon */}
        <div style={{ marginBottom: '3rem' }}>
          <div style={{
            display: 'inline-block',
            backgroundColor: '#1a1a1a',
            borderRadius: '50%',
            padding: '2rem',
            border: '1px solid #333333'
          }}>
            <span style={{ 
              fontSize: '3rem',
              filter: 'grayscale(100%) brightness(0.8)'
            }}>🧮</span>
          </div>
        </div>

        {/* Clean Title */}
        <h1 style={{
          fontSize: 'clamp(2rem, 6vw, 3rem)',
          fontWeight: '300',
          marginBottom: '1rem',
          lineHeight: '1.2',
          color: '#ffffff',
          padding: '0 1rem'
        }}>
          Ready to solve<br />
          <span style={{ fontWeight: '600' }}>some math?</span>
        </h1>

        {/* Simple Description */}
        <p style={{
          fontSize: 'clamp(0.9rem, 3vw, 1.1rem)',
          color: '#cccccc',
          marginBottom: '2rem',
          lineHeight: '1.6',
          maxWidth: '500px',
          margin: '0 auto 2rem auto',
          padding: '0 1rem'
        }}>
          Test your Primary 5 math skills with AI-generated problems that adapt to your learning pace
        </p>

        {/* Button Container */}
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '1rem',
          justifyContent: 'center',
          alignItems: 'center',
          marginBottom: '2rem',
          width: '100%',
          padding: '0 1rem'
        }}>
          {/* Start Learning Button */}
          <button
            onClick={onStart}
            disabled={isLoading}
            style={{
              backgroundColor: isLoading ? '#333333' : '#ffffff',
              color: isLoading ? '#666666' : '#000000',
              border: 'none',
              padding: '1rem 2rem',
              fontSize: 'clamp(1rem, 4vw, 1.1rem)',
              fontWeight: '500',
              borderRadius: '8px',
              cursor: isLoading ? 'not-allowed' : 'pointer',
              transition: 'all 0.2s ease',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              width: '100%',
              maxWidth: '300px',
              justifyContent: 'center'
            }}
            onMouseEnter={(e) => {
              if (!isLoading) {
                e.currentTarget.style.backgroundColor = '#f0f0f0';
              }
            }}
            onMouseLeave={(e) => {
              if (!isLoading) {
                e.currentTarget.style.backgroundColor = '#ffffff';
              }
            }}
          >
            {isLoading ? (
              <>
                <div style={{
                  width: '16px',
                  height: '16px',
                  border: '2px solid #666666',
                  borderTop: '2px solid transparent',
                  borderRadius: '50%',
                  animation: 'spin 1s linear infinite'
                }}></div>
                Loading...
              </>
            ) : (
              <>
                Start Learning
                <span style={{ fontSize: '1.2rem' }}>→</span>
              </>
            )}
          </button>

          {/* Settings Button */}
          <button
            onClick={onSettingsClick}
            disabled={isLoading}
            style={{
              backgroundColor: isLoading ? '#333333' : 'gray',
              color: isLoading ? '#666666' : 'white',
              border: '1px solid #555555',
              padding: '1rem 2rem',
              fontSize: 'clamp(1rem, 4vw, 1.1rem)',
              fontWeight: '500',
              borderRadius: '8px',
              cursor: isLoading ? 'not-allowed' : 'pointer',
              transition: 'all 0.2s ease',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              width: '100%',
              maxWidth: '300px',
              justifyContent: 'center'
            }}
            onMouseEnter={(e) => {
              if (!isLoading) {
                e.currentTarget.style.backgroundColor = '#333333';
                e.currentTarget.style.color = '#ffffff';
                e.currentTarget.style.borderColor = '#666666';
              }
            }}
            onMouseLeave={(e) => {
              if (!isLoading) {
                e.currentTarget.style.backgroundColor = 'transparent';
                e.currentTarget.style.color = '#cccccc';
                e.currentTarget.style.borderColor = '#555555';
              }
            }}
          >
            ⚙️ Settings
          </button>
        </div>

        {/* Simple Feature List */}
        <div style={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'center',
          gap: '1rem',
          fontSize: '0.9rem',
          color: '#888888'
        }}>
          <span>⚡ AI-Powered</span>
          <span>🎓 Primary 5 Level</span>
          <span>💡 Instant Feedback</span>
          <span>🚀 Adaptive Learning</span>
        </div>

        {/* Subtle Footer */}
        <div style={{
          marginTop: '2rem',
          fontSize: '0.8rem',
          color: '#666666'
        }}>
          Ready to begin your math journey
        </div>
      </div>

      <style jsx>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  )
}
