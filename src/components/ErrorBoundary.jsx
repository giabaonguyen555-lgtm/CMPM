import { Component } from "react";
import { Link } from "react-router-dom";
import { RefreshCw } from "lucide-react";
import Button from "./ui/Button";

function DefaultFallback({ onRetry }) {
  return (
    <main className="container flex min-h-[60vh] items-center justify-center py-16">
      <section
        className="w-full max-w-xl rounded-2xl border border-slate-200 bg-white p-8 text-center shadow-sm md:p-12"
        role="alert"
      >
        <p className="text-xs font-semibold uppercase tracking-[.25em] text-slate-400">
          Something went wrong
        </p>
        <h1 className="mt-4 text-3xl font-extrabold tracking-tight text-slate-900">
          This page could not be loaded.
        </h1>
        <p className="mx-auto mt-4 max-w-md text-sm leading-6 text-slate-500">
          An unexpected error interrupted the page. Try again, or return to the
          guide to keep exploring Hanoi.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Button type="button" onClick={onRetry} variant="secondary">
            <RefreshCw size={15} aria-hidden="true" />
            Try again
          </Button>
          <Button as={Link} to="/">
            Back to explore
          </Button>
        </div>
      </section>
    </main>
  );
}

export default class ErrorBoundary extends Component {
  state = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // Keep the boundary useful in production while preserving the full error for diagnostics.
    console.error("Unhandled application error", error, errorInfo);
  }

  componentDidUpdate(previousProps) {
    if (this.state.hasError && previousProps.resetKey !== this.props.resetKey) {
      this.setState({ hasError: false });
    }
  }

  retry = () => {
    this.setState({ hasError: false });
  };

  render() {
    if (!this.state.hasError) return this.props.children;

    if (typeof this.props.fallback === "function") {
      return this.props.fallback({ retry: this.retry });
    }

    return <DefaultFallback onRetry={this.retry} />;
  }
}
