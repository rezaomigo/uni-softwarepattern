import React, { Component, ErrorInfo, ReactNode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

class RootErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error in RootErrorBoundary:', error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div style={{ padding: '24px', direction: 'rtl', fontFamily: 'Tahoma, sans-serif' }}>
          <div style={{ backgroundColor: '#fff1f2', border: '1px solid #fecdd3', borderRadius: '12px', padding: '20px' }}>
            <h2 style={{ color: '#9f1239', margin: '0 0 10px 0', fontSize: '18px' }}>
              خطای بارگذاری در سامانه پاسخگویی دانشگاهی
            </h2>
            <p style={{ color: '#4c0519', fontSize: '14px', lineHeight: '1.6' }}>
              متأسفانه در پردازش رابط کاربری مشکلی رخ داده است:
            </p>
            <pre style={{ backgroundColor: '#881337', color: '#ffe4e6', padding: '12px', borderRadius: '8px', fontSize: '12px', overflowX: 'auto', direction: 'ltr' }}>
              {this.state.error?.message || String(this.state.error)}
            </pre>
            <button
              onClick={() => window.location.reload()}
              style={{ marginTop: '16px', padding: '8px 16px', backgroundColor: '#e11d48', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold' }}
            >
              تلاش مجدد و بارگذاری صفحه
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

const rootElement = document.getElementById('root');
if (rootElement) {
  createRoot(rootElement).render(
    <React.StrictMode>
      <RootErrorBoundary>
        <App />
      </RootErrorBoundary>
    </React.StrictMode>
  );
}
