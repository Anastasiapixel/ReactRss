import ReactDOM from "react-dom/client";
import SearchApp from "./App";
import "./index.css";
import { Component } from "react";

const rootElement = document.getElementById("root");

const root = ReactDOM.createRoot(rootElement);
class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
    console.log(error);
    
  }
  componentDidCatch(error, info) {
    logErrorToMyService(error, info.componentStack);
  }
    render() {
    if (this.state.hasError) {
      return this.props.fallback;
    }
    return this.props.children;
  }
}

root.render(
 <ErrorBoundary fallback={<h1>Something went wrong</h1>}>
<SearchApp />
 </ErrorBoundary>
);
