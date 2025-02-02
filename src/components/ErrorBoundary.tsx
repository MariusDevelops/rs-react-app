import { Component, ErrorInfo, ReactNode } from 'react';

interface ErrorBoundaryProps {
  readonly fallback: ReactNode;
  readonly children: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
}

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  static getDerivedStateFromError() {
    return { hasError: true };
  }

  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = {
      hasError: false,
    };
  }

  shouldComponentUpdate(
    nextProps: ErrorBoundaryProps,
    nextState: ErrorBoundaryState
  ) {
    const { hasError } = this.state;
    const { children, fallback } = this.props;

    return (
      nextState.hasError !== hasError ||
      nextProps.children !== children ||
      nextProps.fallback !== fallback
    );
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    this.logErrorToService(error, errorInfo);
  }

  logErrorToService(error: Error, errorInfo: ErrorInfo) {
    console.error('Error caught by ErrorBoundary:', error, errorInfo);
  }

  render() {
    const { hasError } = this.state;
    const { fallback, children } = this.props;

    if (hasError) {
      return fallback;
    }
    return children;
  }
}

export default ErrorBoundary;
