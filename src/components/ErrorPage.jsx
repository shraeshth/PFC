import React from 'react';
import { Camera, Home, RefreshCw } from 'lucide-react';

const ErrorPage = ({ error, resetError }) => {
  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center px-8">
      <div className="max-w-2xl w-full text-center space-y-8">
        {/* Icon */}
        <div className="relative">
          <div className="w-24 h-24 mx-auto border-2 border-white/20 rounded-full flex items-center justify-center">
            <Camera size={40} className="text-gray-400" />
          </div>
          <div className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 rounded-full flex items-center justify-center">
            <span className="text-xs">!</span>
          </div>
        </div>

        {/* Error Message */}
        <div className="space-y-4">
          <h1 className="text-4xl md:text-5xl font-light">
            Frame Not Found
          </h1>
          <p className="text-gray-400 text-lg leading-relaxed max-w-lg mx-auto">
            Looks like this shot didn't develop properly. Let's get you back to capturing moments.
          </p>
        </div>

        {/* Error Details */}
        {error && (
          <div className="bg-gray-900/30 border border-white/10 rounded-xl p-4 text-left max-w-md mx-auto">
            <p className="text-sm text-gray-500 font-mono">
              {error.message || "Something went wrong"}
            </p>
          </div>
        )}

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <button
            onClick={() => window.location.href = '/'}
            className="flex items-center gap-2 bg-white text-black px-6 py-3 rounded-xl font-medium hover:bg-gray-100 transition-colors"
          >
            <Home size={18} />
            Back to Home
          </button>
          
          {resetError && (
            <button
              onClick={resetError}
              className="flex items-center gap-2 border border-white/20 px-6 py-3 rounded-xl hover:bg-white/5 transition-colors"
            >
              <RefreshCw size={18} />
              Try Again
            </button>
          )}
        </div>

        {/* Footer */}
        <div className="pt-8 border-t border-white/10">
          <p className="text-gray-500 text-sm">
            Photography Club • Capturing moments, creating memories
          </p>
        </div>
      </div>
    </div>
  );
};

// Error Boundary Component
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Photography Club Error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <ErrorPage 
          error={this.state.error}
          resetError={() => this.setState({ hasError: false, error: null })}
        />
      );
    }

    return this.props.children;
  }
}

export { ErrorPage, ErrorBoundary };
export default ErrorPage;