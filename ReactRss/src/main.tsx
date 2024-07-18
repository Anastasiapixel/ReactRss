import ReactDOM from 'react-dom/client';
import SearchApp from './App';
import ErrorBoundary from './components/errorBoundary';
import './index.css';

const rootElement = document.getElementById('root');

if (rootElement) {
  const root = ReactDOM.createRoot(rootElement);

  root.render(
    <>
      <ErrorBoundary>
        <SearchApp />
      </ErrorBoundary>
    </>,
  );
}
