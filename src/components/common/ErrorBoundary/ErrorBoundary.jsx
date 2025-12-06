import { Component } from 'react';
import PropTypes from 'prop-types';

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null
    };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Error caught by boundary:', error, errorInfo);
    this.setState({
      error,
      errorInfo
    });

    // You can also log the error to an error reporting service here
    // logErrorToService(error, errorInfo);
  }

  handleReset = () => {
    this.setState({
      hasError: false,
      error: null,
      errorInfo: null
    });
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-light-gray p-4">
          <div className="max-w-2xl w-full bg-white rounded-lg shadow-xl p-8 border-t-4 border-red">
            <div className="text-center mb-6">
              <svg
                className="mx-auto h-16 w-16 text-red mb-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                />
              </svg>
              <h1 className="text-3xl font-bold text-black mb-2">
                Oops! Something went wrong
              </h1>
              <p className="text-gray mb-6">
                We're sorry for the inconvenience. An unexpected error occurred.
              </p>
            </div>

            {process.env.NODE_ENV === 'development' && this.state.error && (
              <div className="mb-6 bg-light-gray p-4 rounded border border-border">
                <h3 className="font-bold text-sm mb-2 text-red">Error Details:</h3>
                <pre className="text-xs overflow-auto max-h-40 text-black">
                  {this.state.error.toString()}
                </pre>
                {this.state.errorInfo && (
                  <details className="mt-2">
                    <summary className="cursor-pointer text-sm font-semibold text-gray">
                      Component Stack
                    </summary>
                    <pre className="text-xs mt-2 overflow-auto max-h-40 text-black">
                      {this.state.errorInfo.componentStack}
                    </pre>
                  </details>
                )}
              </div>
            )}

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={this.handleReset}
                className="px-6 py-3 bg-primary text-white font-semibold rounded hover:bg-primary-dark transition-colors"
              >
                Try Again
              </button>
              <button
                onClick={() => (window.location.href = '/')}
                className="px-6 py-3 bg-white text-primary border-2 border-primary font-semibold rounded hover:bg-light-gray transition-colors"
              >
                Go to Homepage
              </button>
            </div>

            <div className="mt-8 text-center text-sm text-gray">
              <p>If this problem persists, please contact our support team.</p>
              <p className="mt-2">
                Email:{' '}
                <a href="mailto:support@gocourier.com" className="text-primary hover:underline">
                  support@gocourier.com
                </a>
              </p>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

ErrorBoundary.propTypes = {
  children: PropTypes.node.isRequired
};

export default ErrorBoundary;
