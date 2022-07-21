import React from 'react';
import { createRoot } from 'react-dom/client';

const container = document.getElementById('app');

const App = () => {
  return (<div>Hello, Rails 7!</div>)
}

if (container) {
  const root = createRoot(container); // createRoot(container!) if you use TypeScript

  root.render(<App />);
}