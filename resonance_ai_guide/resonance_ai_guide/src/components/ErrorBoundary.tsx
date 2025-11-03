import React, { Component, ErrorInfo, ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error:', error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-pastel-gradient flex items-center justify-center p-4">
          <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-candy max-w-md w-full text-center">
            <i className="fa fa-exclamation-triangle text-6xl text-candy-orange mb-4"></i>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Oops! Something went wrong</h2>
            <p className="text-gray-600 mb-6">
              We encountered an unexpected error. Please refresh the page to try again.
            </p>
            <button
              onClick={() => window.location.reload()}
              className="bg-candy-gradient text-white px-6 py-3 rounded-full font-semibold shadow-candy hover:shadow-lg transition-all duration-300 transform hover:scale-105"
            >
              <i className="fa fa-refresh mr-2"></i>
              Refresh Page
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;