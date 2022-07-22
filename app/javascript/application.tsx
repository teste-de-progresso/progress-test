import React from "react";
import { createRoot } from "react-dom/client";
import { ApolloContext } from "./contexts/ApolloContext";

const App = () => {
  return (
    <ApolloContext>
      <div>Hello, Rails 7!</div>
    </ApolloContext>
  );
};

const container = document.getElementById("app");

if (container) {
  const root = createRoot(container);

  root.render(<App />);
}
