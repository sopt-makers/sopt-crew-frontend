import { Component, ReactElement, ReactNode } from 'react';

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}
interface ParentComponentProps {
  className?: string;
  children: ReactNode;
}

export type RejectedFallbackFuncType = ({ error, reset }: { error: Error | null; reset: () => void }) => ReactElement;

interface Props extends ParentComponentProps {
  renderFallback: RejectedFallbackFuncType;
  resetKey?: string[];
  [x: string]: unknown;
}

class ErrorBoundary extends Component<Props, ErrorBoundaryState> {
  initState: ErrorBoundaryState = { hasError: false, error: null };

  constructor(props: Props) {
    super(props);
    this.state = this.initState;
    this.resetErrorBoundary = this.resetErrorBoundary.bind(this);
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }

  componentDidUpdate(prevProps: Props) {
    if (!this.state.hasError == null) return;
    if (prevProps.resetKey !== this.props.resetKey) {
      this.resetErrorBoundary();
    }
  }

  componentDidCatch(error: Error) {
    console.log(error);
  }

  resetErrorBoundary() {
    this.setState(this.initState);
  }

  render() {
    const { children, renderFallback } = this.props;
    const { hasError, error } = this.state;

    if (hasError) {
      return renderFallback({
        error,
        reset: this.resetErrorBoundary,
      });
    }

    return children;
  }
}

export default ErrorBoundary;
