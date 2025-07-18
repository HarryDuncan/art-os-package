import React, { Component, ErrorInfo, ReactNode } from "react";

interface ErrorBoundaryProps {
  children: ReactNode;
  fallback?: ReactNode;
  onError?: (error: Error, errorInfo: ErrorInfo) => void;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error?: Error;
}

export class ErrorBoundary extends Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Scene Error Boundary caught an error:", error, errorInfo);

    if (this.props.onError) {
      this.props.onError(error, errorInfo);
    }
  }

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            height: "100vh",
            width: "100vw",
            backgroundColor: "#1a1a1a",
            color: "#ffffff",
            fontFamily: "Arial, sans-serif",
            padding: "20px",
            textAlign: "center",
          }}
        >
          <div
            style={{
              backgroundColor: "#2a2a2a",
              padding: "30px",
              borderRadius: "8px",
              border: "1px solid #444",
              maxWidth: "500px",
            }}
          >
            <h2 style={{ margin: "0 0 20px 0", color: "#ff6b6b" }}>
              Scene Error
            </h2>
            <p style={{ margin: "0 0 15px 0", lineHeight: "1.5" }}>
              Something went wrong while rendering the scene. This could be due
              to:
            </p>
            <ul
              style={{
                textAlign: "left",
                margin: "0 0 20px 0",
                paddingLeft: "20px",
                lineHeight: "1.5",
              }}
            >
              <li>Invalid scene configuration</li>
              <li>Missing or corrupted assets</li>
              <li>WebGL compatibility issues</li>
              <li>Browser limitations</li>
            </ul>
            {this.state.error && (
              <details
                style={{
                  marginTop: "20px",
                  textAlign: "left",
                  backgroundColor: "#333",
                  padding: "15px",
                  borderRadius: "4px",
                  fontSize: "12px",
                }}
              >
                <summary style={{ cursor: "pointer", marginBottom: "10px" }}>
                  Error Details
                </summary>
                <pre
                  style={{
                    margin: 0,
                    whiteSpace: "pre-wrap",
                    wordBreak: "break-word",
                    color: "#ff6b6b",
                  }}
                >
                  {this.state.error.message}
                </pre>
              </details>
            )}
            <button
              onClick={() => window.location.reload()}
              style={{
                marginTop: "20px",
                padding: "10px 20px",
                backgroundColor: "#4a90e2",
                color: "white",
                border: "none",
                borderRadius: "4px",
                cursor: "pointer",
                fontSize: "14px",
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.backgroundColor = "#357abd";
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.backgroundColor = "#4a90e2";
              }}
              onFocus={(e) => {
                e.currentTarget.style.backgroundColor = "#357abd";
              }}
              onBlur={(e) => {
                e.currentTarget.style.backgroundColor = "#4a90e2";
              }}
            >
              Reload Page
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
