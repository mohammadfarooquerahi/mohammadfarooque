import React from "react";

export class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error("ErrorBoundary caught an error:", error, errorInfo);
  }

  handleReset = () => {
    this.setState({ hasError: false, error: null });
    window.location.href = "/";
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="error-boundary-screen wrap">
          <div className="error-boundary-card">
            <span className="error-pill">System Recovery</span>
            <h1 className="error-title">SOMETHING UNEXPECTED OCCURRED</h1>
            <p className="error-desc">
              Don't worry — our graceful error recovery caught this issue. You can restore your session or return to the home page with a single click.
            </p>
            {this.state.error && (
              <pre className="error-log">
                {this.state.error.toString()}
              </pre>
            )}
            <div className="error-actions">
              <button className="btn-fill" onClick={this.handleReset}>
                <span>Reset &amp; Return Home</span>
              </button>
              <button
                className="btn-border"
                onClick={() => this.setState({ hasError: false, error: null })}
              >
                <span>Try Recovering View</span>
              </button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
