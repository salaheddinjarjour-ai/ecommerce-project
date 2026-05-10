import React from 'react';

interface State {
  hasError: boolean;
  error: Error | null;
  errorInfo: React.ErrorInfo | null;
}

export class ErrorBoundary extends React.Component<{ children: React.ReactNode }, State> {
  constructor(props: { children: React.ReactNode }) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error: Error): Partial<State> {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    this.setState({ errorInfo });
    console.error('[ErrorBoundary] Caught error:', error, errorInfo);
  }

  handleReload = () => {
    this.setState({ hasError: false, error: null, errorInfo: null });
    window.location.reload();
  };

  render() {
    if (!this.state.hasError) return this.props.children;

    return (
      <div style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'linear-gradient(135deg, #f0f4ff 0%, #f8fafc 100%)',
        fontFamily: 'system-ui, -apple-system, sans-serif',
        padding: '20px',
      }}>
        <div style={{
          maxWidth: '480px',
          width: '100%',
          background: 'white',
          borderRadius: '28px',
          padding: '52px 44px',
          boxShadow: '0 24px 80px rgba(0,0,0,0.08), 0 4px 16px rgba(0,0,0,0.04)',
          textAlign: 'center',
        }}>
          {/* Icon */}
          <div style={{
            width: '80px',
            height: '80px',
            background: '#fff1f2',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 28px',
            fontSize: '36px',
          }}>⚠️</div>

          {/* Heading */}
          <h1 style={{
            fontSize: '24px',
            fontWeight: '800',
            color: '#0f172a',
            margin: '0 0 12px',
            letterSpacing: '-0.02em',
          }}>Something went wrong</h1>

          <p style={{
            fontSize: '15px',
            color: '#64748b',
            lineHeight: '1.7',
            margin: '0 0 36px',
          }}>
            We hit an unexpected error. This has been logged.
            Please try refreshing the page — it usually fixes the issue.
          </p>

          {/* Reload button */}
          <button
            onClick={this.handleReload}
            style={{
              background: '#0452C8',
              color: 'white',
              border: 'none',
              borderRadius: '14px',
              padding: '14px 36px',
              fontSize: '15px',
              fontWeight: '700',
              cursor: 'pointer',
              transition: 'background 0.2s, transform 0.1s',
              display: 'inline-block',
            }}
            onMouseEnter={e => (e.currentTarget.style.background = '#0341a3')}
            onMouseLeave={e => (e.currentTarget.style.background = '#0452C8')}
            onMouseDown={e => (e.currentTarget.style.transform = 'scale(0.97)')}
            onMouseUp={e => (e.currentTarget.style.transform = 'scale(1)')}
          >
            🔄 Reload Page
          </button>

          {/* Collapsible error details */}
          {this.state.error && (
            <details style={{ marginTop: '28px', textAlign: 'left' }}>
              <summary style={{
                cursor: 'pointer',
                color: '#94a3b8',
                fontSize: '11px',
                fontWeight: '700',
                textTransform: 'uppercase',
                letterSpacing: '0.08em',
                userSelect: 'none',
              }}>
                Error details
              </summary>
              <pre style={{
                marginTop: '12px',
                padding: '16px',
                background: '#fef2f2',
                borderRadius: '12px',
                border: '1px solid #fecaca',
                fontSize: '11px',
                color: '#dc2626',
                overflow: 'auto',
                whiteSpace: 'pre-wrap',
                wordBreak: 'break-all',
                lineHeight: '1.5',
                maxHeight: '200px',
              }}>
                {this.state.error.toString()}
                {this.state.errorInfo?.componentStack}
              </pre>
            </details>
          )}
        </div>
      </div>
    );
  }
}
